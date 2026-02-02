from db import get_db_connection
import pandas as pd, numpy as np
import datetime



## Filters for fighter cumulative percentile stats based on a given period of time and based on a given division 
def get_fighter_stats_percentiles_dynamically(fighter_id, division, years):

    # query the right rows 
    query = "SELECT * FROM round_stats"

    conn = get_db_connection()
    curr = conn.cursor()

    curr.execute(query)
    rows = curr.fetchall()
    columns = [desc[0] for desc in curr.description]  # get column names
    curr.close()
    conn.close()



    fighter_stats = pd.DataFrame(rows, columns= columns)


    # filter for date to ensure data is up to date 
    fighter_stats['fight_date'] = pd.to_datetime(fighter_stats['fight_date'], errors='coerce')
    year = datetime.datetime.now().year
    year_mask = year - (fighter_stats['fight_date'].dt.year) <= years
    fighter_stats = fighter_stats[year_mask]
    fighter_stats = fighter_stats.drop(columns=['fight_date'])



    #merge fighter and opponent's stats to calculate fighter lifetime stats
    fighter_stats = fighter_stats.merge(fighter_stats, on = ['fight_id', 'fight_round'], suffixes=('_r', '_o'))
    fighter_stats = fighter_stats[fighter_stats['fighter_id_r'] != fighter_stats['fighter_id_o']]

    # seperate by each fighter and each division they fought at (stats for that fighter at that division)
    fighter_stats = fighter_stats.groupby(['fighter_id_r', 'division_r']).agg("sum")
    fighter_stats = fighter_stats.reset_index()
    fighter_stats = fighter_stats[fighter_stats['division_r'].str.lower() == division.lower()]


    # drop unnecessary columns

    columns_drop = ['time_ended_r', 'time_format_r', 'fight_round', 
                    'round_ended_o', 'time_ended_o']

    fighter_stats = fighter_stats.drop(columns_drop, axis=1)



    #calculate necessary stats

    fighter_stats['striking_output_on_feet_per_minute'] = (fighter_stats['distance_significant_strikes_attempted_r'] + fighter_stats['clinch_significant_strikes_attempted_r']) / fighter_stats['round_minutes_r']
    fighter_stats['striking_efficiency_on_feet'] = (fighter_stats['distance_significant_strikes_landed_r'] + fighter_stats['clinch_significant_strikes_landed_r']) / (fighter_stats['distance_significant_strikes_attempted_r'] + fighter_stats['clinch_significant_strikes_attempted_r']).replace(0, np.nan)
    fighter_stats['striking_superiority_on_feet_per_minute'] = ((fighter_stats['distance_significant_strikes_landed_r'] + fighter_stats['clinch_significant_strikes_landed_r']) - (fighter_stats['distance_significant_strikes_landed_o'] + fighter_stats['clinch_significant_strikes_landed_o'])) / fighter_stats['round_minutes_r']
    fighter_stats['takedown_attempt_commitment'] = fighter_stats['takedown_attempted_r'] / fighter_stats['round_minutes_r']
    fighter_stats['takedown_efficiency'] = fighter_stats['takedown_landed_r'] / fighter_stats['takedown_attempted_r'].replace(0, np.nan)
    fighter_stats['control_yield'] = fighter_stats['control_time_r'] / fighter_stats['round_minutes_r']
    fighter_stats['takedown_aggression'] = fighter_stats['submission_attempted_r'] / fighter_stats['round_minutes_r']
    fighter_stats['striking_output_on_ground'] = fighter_stats['ground_significant_strikes_attempted_r'] / fighter_stats['round_minutes_r']
    fighter_stats['striking_efficiency_on_ground'] = fighter_stats['ground_significant_strikes_landed_r'] / fighter_stats['ground_significant_strikes_attempted_r'].replace(0, np.nan)

    fighter_stats['defensive_liability_strikes_on_feet'] = (fighter_stats['distance_significant_strikes_landed_o'] + fighter_stats['clinch_significant_strikes_landed_o']) / fighter_stats['round_minutes_r']
    fighter_stats['defensive_liability_strikes_on_ground'] = fighter_stats['ground_significant_strikes_landed_o'] / fighter_stats['round_minutes_r']
    fighter_stats['defensive_liability_takedowns'] = fighter_stats['takedown_landed_o'] / fighter_stats['round_minutes_r']

    fighter_stats['defensive_recovery_ground'] = (fighter_stats['control_time_o'] / fighter_stats['round_minutes_r'])

    fighter_stats['outcome_volatility'] = fighter_stats['not_decision_r'] / fighter_stats['round_minutes_r']

    
    #drop rest of unnecessary

    drop_cols_unnecessary = ['time_format_o', 'round_ended_r', 'knockdown_r', 'total_strikes_attempted_r', 'takedown_attempted_r', 'submission_attempted_r', 'reversals_r', 'control_time_r', 'significant_strikes_attempted_r', 
                             'head_significant_strikes_attempted_r', 'body_significant_strikes_attempted_r', 'leg_significant_strikes_attempted_r', 'distance_significant_strikes_attempted_r', 
                             'clinch_significant_strikes_attempted_r', 'ground_significant_strikes_attempted_r', 'total_rounds_r', 'body_significant_strikes_landed_r', 'total_strikes_landed_r', 
                             'significant_strikes_landed_r', 'takedown_landed_r', 'leg_significant_strikes_landed_r', 'distance_significant_strikes_landed_r', 
                             'clinch_significant_strikes_landed_r', 'ground_significant_strikes_landed_r', 'head_significant_strikes_landed_r', 'round_minutes_r', 
                             'not_decision_r', 'knockdown_o', 'total_strikes_attempted_o', 'takedown_attempted_o', 'submission_attempted_o', 'reversals_o', 'control_time_o',
                               'significant_strikes_attempted_o', 'head_significant_strikes_attempted_o', 'body_significant_strikes_attempted_o', 'leg_significant_strikes_attempted_o', 
                               'distance_significant_strikes_attempted_o', 'clinch_significant_strikes_attempted_o', 'ground_significant_strikes_attempted_o', 'total_rounds_o', 
                               'body_significant_strikes_landed_o', 'total_strikes_landed_o', 'significant_strikes_landed_o', 'takedown_landed_o', 'leg_significant_strikes_landed_o',
                                 'distance_significant_strikes_landed_o', 'clinch_significant_strikes_landed_o', 'ground_significant_strikes_landed_o', 'head_significant_strikes_landed_o', 
                                 'not_decision_o', 'round_minutes_o', 'division_o',  'fight_id', 
                                'fighter_id_o', 'method_o', 'method_r', 'referee_o',  'referee_r',
                            ]

    fighter_stats = fighter_stats.drop(drop_cols_unnecessary, axis=1)


    # calculate percentiles for each stat by weight class
    exclude = ['fighter_id_r', 'fight_date_o', 'division_r', 'round_minutes_r', 'not_decision_r', 'round_minutes_o', 'not_decision_o']
    percentiles_to_calculate = [c for c in fighter_stats.columns if c not in exclude]

    ## to prevent weird data - need to see true efficiency: a fighter might fail a lot but be ranked higher than those who dont attempt any which would be bad
    only_include_attempts =  [
        'takedown_efficiency',
        'defensive_recovery_ground'
    ]

    for stat in percentiles_to_calculate:
        if stat in only_include_attempts:
            # Mask to only include fighters who attempted
            mask = fighter_stats[stat] > 0
            # Rank relative to others who attempted
            fighter_stats.loc[mask, stat + "_percentile"] = (
                (fighter_stats.loc[mask].groupby('division_r')[stat]
                .rank(method='average') - 1) / 
                (fighter_stats.loc[mask].groupby('division_r')[stat]
                .transform('count') - 1) * 100
            )
            # Fighters who didn't attempt get 0
            fighter_stats.loc[~mask, stat + "_percentile"] = 0
        else:
            # Rank everyone
            fighter_stats[stat + "_percentile"] = (
                (fighter_stats.groupby('division_r')[stat].rank(method='average') - 1) / 
                (fighter_stats.groupby('division_r')[stat].transform('count') - 1) * 100
            )


    #invert defensive percentiles for interpretability since it's confusing

    invert_for_interpretability= [
    'defensive_liability_strikes_on_feet',
    'defensive_liability_strikes_on_ground',
    'defensive_liability_takedowns',
    'defensive_recovery_ground']

    for stat in invert_for_interpretability:
        col = stat + "_percentile"
        inverted_col = stat + "_percentile_inverted"
        fighter_stats[inverted_col] = 100 - fighter_stats[col]


    # reset index and remove useless columns
    
    fighter_stats = fighter_stats.reset_index()
    drop_unnecessary_stats = ['striking_output_on_feet_per_minute', 'striking_efficiency_on_feet', 'striking_superiority_on_feet_per_minute', 
     'takedown_attempt_commitment', 'takedown_efficiency', 'control_yield', 'takedown_aggression', 'striking_output_on_ground', 'striking_efficiency_on_ground',
       'defensive_liability_strikes_on_feet', 'defensive_liability_strikes_on_ground','defensive_liability_takedowns', 'defensive_recovery_ground', 'outcome_volatility',
         'division_r', 'fighter_id_r', 'defensive_liability_strikes_on_feet_percentile','defensive_liability_strikes_on_ground_percentile', 
         'defensive_liability_takedowns_percentile', 'defensive_recovery_ground_percentile' ]
    

    #find correct fighter
    export = fighter_stats[(fighter_stats['fighter_id_r'] == fighter_id)]
    export = export.drop(drop_unnecessary_stats, axis=1)
    export = export.replace({np.nan: None})





        
    return export.to_dict(orient="records")



            

   
        
