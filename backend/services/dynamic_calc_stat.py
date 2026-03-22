from db import get_db_connection, connection_pool
from datetime import date, timedelta


def get_fighter_stats_percentiles_dynamically(fighter_id, division, years):

    start_date = date.today() - timedelta(days=365 * years)

    query = """
    WITH

    -- filter the materialized view to the requested division + time window
    -- and aggregate each fighter's raw totals across all their rounds
    totals AS (
        SELECT
            fighter_id,
            SUM(dsa_r)  AS dsa,
            SUM(dsl_r)  AS dsl,
            SUM(csa_r)  AS csa,
            SUM(csl_r)  AS csl,
            SUM(tda_r)  AS tda,
            SUM(tdl_r)  AS tdl,
            SUM(suba_r) AS suba,
            SUM(ctrl_r) AS ctrl,
            SUM(gsa_r)  AS gsa,
            SUM(gsl_r)  AS gsl,
            SUM(mins_r) AS mins,
            SUM(nd_r)   AS nd,
            SUM(dsl_o)  AS dsl_opp,
            SUM(csl_o)  AS csl_opp,
            SUM(tdl_o)  AS tdl_opp,
            SUM(ctrl_o) AS ctrl_opp,
            SUM(gsl_o)  AS gsl_opp
        FROM fighter_fight_stats_mv
        WHERE fight_date::date >= %(start_date)s
          AND LOWER(division)  = LOWER(%(division)s)
        GROUP BY fighter_id
    ),

    -- ompute the 14 derived metrics
    -- NULLIF on every denominator for those not attempted
    metrics AS (
        SELECT
            fighter_id,

            (dsa + csa) / NULLIF(mins, 0)
                AS striking_output_on_feet_per_minute,

            (dsl + csl) / NULLIF(dsa + csa, 0)
                AS striking_efficiency_on_feet,

            ((dsl + csl) - (dsl_opp + csl_opp)) / NULLIF(mins, 0)
                AS striking_superiority_on_feet_per_minute,

            tda / NULLIF(mins, 0)
                AS takedown_attempt_commitment,

            tdl / NULLIF(tda, 0)
                AS takedown_efficiency,

            ctrl / NULLIF(mins, 0)
                AS control_yield,

            suba / NULLIF(mins, 0)
                AS takedown_aggression,

            gsa / NULLIF(mins, 0)
                AS striking_output_on_ground,

            gsl / NULLIF(gsa, 0)
                AS striking_efficiency_on_ground,

            (dsl_opp + csl_opp) / NULLIF(mins, 0)
                AS defensive_liability_strikes_on_feet,

            gsl_opp / NULLIF(mins, 0)
                AS defensive_liability_strikes_on_ground,

            tdl_opp / NULLIF(mins, 0)
                AS defensive_liability_takedowns,

            ctrl_opp / NULLIF(mins, 0)
                AS defensive_recovery_ground,

            nd / NULLIF(mins, 0)
                AS outcome_volatility

        FROM totals
    ),

    -- percentile rankings using PERCENT_RANK() * 100 
    --
    -- For takedown_efficiency and defensive_recovery_ground, only fighters with
    -- value > 0 are ranked among themselves, everyone else gets 0.
    percentiles AS (
        SELECT
            fighter_id,

            PERCENT_RANK() OVER (ORDER BY striking_output_on_feet_per_minute)      * 100
                AS striking_output_on_feet_per_minute_percentile,

            PERCENT_RANK() OVER (ORDER BY striking_efficiency_on_feet)              * 100
                AS striking_efficiency_on_feet_percentile,

            PERCENT_RANK() OVER (ORDER BY striking_superiority_on_feet_per_minute)  * 100
                AS striking_superiority_on_feet_per_minute_percentile,

            PERCENT_RANK() OVER (ORDER BY takedown_attempt_commitment)              * 100
                AS takedown_attempt_commitment_percentile,

            PERCENT_RANK() OVER (ORDER BY control_yield)                            * 100
                AS control_yield_percentile,

            PERCENT_RANK() OVER (ORDER BY takedown_aggression)                      * 100
                AS takedown_aggression_percentile,

            PERCENT_RANK() OVER (ORDER BY striking_output_on_ground)                * 100
                AS striking_output_on_ground_percentile,

            PERCENT_RANK() OVER (ORDER BY striking_efficiency_on_ground)            * 100
                AS striking_efficiency_on_ground_percentile,

            PERCENT_RANK() OVER (ORDER BY outcome_volatility)                       * 100
                AS outcome_volatility_percentile,

            -- defensive: ranked raw, inverted in final SELECT
            PERCENT_RANK() OVER (ORDER BY defensive_liability_strikes_on_feet)      * 100
                AS defensive_liability_strikes_on_feet_percentile,

            PERCENT_RANK() OVER (ORDER BY defensive_liability_strikes_on_ground)    * 100
                AS defensive_liability_strikes_on_ground_percentile,

            PERCENT_RANK() OVER (ORDER BY defensive_liability_takedowns)            * 100
                AS defensive_liability_takedowns_percentile,

            -- attempts-only: rank only fighters who have a non-zero value,
            -- everyone else gets 0. 
            CASE
                WHEN takedown_efficiency > 0 THEN
                    PERCENT_RANK() OVER (
                        ORDER BY CASE WHEN takedown_efficiency > 0
                                      THEN takedown_efficiency
                                      ELSE NULL END NULLS FIRST
                    ) * 100
                ELSE 0
            END AS takedown_efficiency_percentile,

            CASE
                WHEN defensive_recovery_ground > 0 THEN
                    PERCENT_RANK() OVER (
                        ORDER BY CASE WHEN defensive_recovery_ground > 0
                                      THEN defensive_recovery_ground
                                      ELSE NULL END NULLS FIRST
                    ) * 100
                ELSE 0
            END AS defensive_recovery_ground_percentile

        FROM metrics
    )

    -- invert defensive percentiles, filter to the requested fighter
    SELECT
        fighter_id,

        striking_output_on_feet_per_minute_percentile,
        striking_efficiency_on_feet_percentile,
        striking_superiority_on_feet_per_minute_percentile,
        takedown_attempt_commitment_percentile,
        takedown_efficiency_percentile,
        control_yield_percentile,
        takedown_aggression_percentile,
        striking_output_on_ground_percentile,
        striking_efficiency_on_ground_percentile,
        outcome_volatility_percentile,

        100 - defensive_liability_strikes_on_feet_percentile
            AS defensive_liability_strikes_on_feet_percentile_inverted,

        100 - defensive_liability_strikes_on_ground_percentile
            AS defensive_liability_strikes_on_ground_percentile_inverted,

        100 - defensive_liability_takedowns_percentile
            AS defensive_liability_takedowns_percentile_inverted,

        100 - defensive_recovery_ground_percentile
            AS defensive_recovery_ground_percentile_inverted

    FROM percentiles
    WHERE fighter_id = %(fighter_id)s
    """

    params = {
        'start_date': start_date,
        'division':   division,
        'fighter_id': fighter_id,
    }

    conn = get_db_connection()
    try:
        curr = conn.cursor()
        curr.execute(query, params)
        rows = curr.fetchall()
        columns = [desc[0] for desc in curr.description]
    finally:
        curr.close()
        connection_pool.putconn(conn)

    if not rows:
        return []

    return [dict(zip(columns, row)) for row in rows]