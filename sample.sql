
-- Table: Sample Fighter Data with 3 Fighters

CREATE TABLE public.fighters (
    fighter_id text NOT NULL,
    first_name text,
    last_name text,
    nickname text,
    height numeric,
    weight numeric,
    reach numeric,
    stance text,
    wins integer DEFAULT 0,
    losses integer DEFAULT 0,
    draws integer DEFAULT 0
);


-- Sample fighters data
INSERT INTO fighters (fighter_id, first_name, last_name, nickname, height, weight, reach, stance, wins, losses, draws) VALUES
('ab2a4b5e04dc5fe9','Alvin','Hines','Goozie',74,265,74,'Orthodox',7,1,0),
('07f72a2a7591b409','Jon','Jones','Bones',76,248,84,'Orthodox',28,1,0),
('93fe7332d16c6ad9','Tom','Aaron','None',NULL,155,NULL,'Unknown',5,3,0);


-- Table: round_stats: with 2 fights, 1 for jones, 1 for hines (5 round, 3 round)

CREATE TABLE public.round_stats (
    fight_id text NOT NULL,
    fighter_id text NOT NULL,
    fight_date text,
    method text,
    round_ended integer,
    time_ended numeric,
    time_format integer,
    referee text,
    division text,
    fight_round integer NOT NULL,
    knockdown numeric,
    total_strikes_attempted numeric,
    takedown_attempted numeric,
    submission_attempted numeric,
    reversals numeric,
    control_time numeric,
    significant_strikes_attempted numeric,
    head_significant_strikes_attempted numeric,
    body_significant_strikes_attempted numeric,
    leg_significant_strikes_attempted numeric,
    distance_significant_strikes_attempted numeric,
    clinch_significant_strikes_attempted numeric,
    ground_significant_strikes_attempted numeric,
    total_rounds numeric,
    body_significant_strikes_landed numeric,
    total_strikes_landed numeric,
    significant_strikes_landed numeric,
    takedown_landed numeric,
    leg_significant_strikes_landed numeric,
    distance_significant_strikes_landed numeric,
    clinch_significant_strikes_landed numeric,
    ground_significant_strikes_landed numeric,
    head_significant_strikes_landed numeric,
    round_minutes numeric,
    not_decision numeric
);
INSERT INTO round_stats (
    fight_id, fighter_id, fight_date, method, round_ended, time_ended, time_format,
    referee, division, fight_round, knockdown, total_strikes_attempted, takedown_attempted,
    submission_attempted, reversals, control_time, significant_strikes_attempted,
    head_significant_strikes_attempted, body_significant_strikes_attempted,
    leg_significant_strikes_attempted, distance_significant_strikes_attempted,
    clinch_significant_strikes_attempted, ground_significant_strikes_attempted,
    total_rounds, body_significant_strikes_landed, total_strikes_landed,
    significant_strikes_landed, takedown_landed, leg_significant_strikes_landed,
    distance_significant_strikes_landed, clinch_significant_strikes_landed,
    ground_significant_strikes_landed, head_significant_strikes_landed, round_minutes, not_decision
)
VALUES
(
    '043172689e415438','25f9a5f3e8a52618','2025-06-28','Unanimous',3,5,5,
    'Herb Dean','Heavyweight',3,0,67,0,0,0,0,
    67,60,3,4,67,0,0,3,1,43,43,0,4,43,0,0,38,5,0
),
(
    '043172689e415438','25f9a5f3e8a52618','2025-06-28','Unanimous',3,5,5,
    'Herb Dean','Heavyweight',1,0,55,0,0,0,0,
    55,48,2,5,52,3,0,3,1,32,32,0,5,31,1,0,26,5,0
),
(
    '043172689e415438','ab2a4b5e04dc5fe9','2025-06-28','Unanimous',3,5,5,
    'Herb Dean','Heavyweight',3,0,108,4,0,0,0,
    108,88,16,4,107,1,0,3,11,40,40,0,3,39,1,0,26,5,0
),
(
    '043172689e415438','ab2a4b5e04dc5fe9','2025-06-28','Unanimous',2,5,5,
    'Herb Dean','Heavyweight',2,0,69,4,0,0,0,
    69,62,6,1,69,0,0,3,4,17,17,0,1,17,0,0,12,5,0
),
(
    '043172689e415438','ab2a4b5e04dc5fe9','2025-06-28','Unanimous',1,5,5,
    'Herb Dean','Heavyweight',1,0,83,2,0,0,0.083,
    82,74,7,1,80,2,0,3,6,26,25,1,1,24,1,0,18,5,0
),
(
    '043172689e415438','25f9a5f3e8a52618','2025-06-28','Unanimous',2,5,5,
    'Herb Dean','Heavyweight',2,0,60,0,0,0,0,
    60,52,2,6,60,0,0,3,1,37,37,0,6,37,0,0,30,5,0
),
(
    '05c8aeb2806be99c','50db8711c70196cd','2016-04-23','Unanimous',5,5,5,
    'Herb Dean','Light Heavyweight',1,0,32,0,0,0,0,
    31,16,7,8,30,1,0,5,3,13,12,0,5,11,1,0,4,5,0
),
(
    '05c8aeb2806be99c','50db8711c70196cd','2016-04-23','Unanimous',5,5,5,
    'Herb Dean','Light Heavyweight',2,0,39,0,0,0,0,
    39,30,3,6,28,11,0,5,2,17,17,0,3,10,7,0,12,5,0
),
(
    '05c8aeb2806be99c','50db8711c70196cd','2016-04-23','Unanimous',5,5,5,
    'Herb Dean','Light Heavyweight',3,0,40,0,0,0,0,
    40,31,6,3,39,1,0,5,2,11,11,0,2,10,1,0,7,5,0
),
(
    '05c8aeb2806be99c','50db8711c70196cd','2016-04-23','Unanimous',5,5,5,
    'Herb Dean','Light Heavyweight',4,0,12,0,0,0,0,
    12,6,3,3,12,0,0,5,2,6,6,0,3,6,0,0,1,5,0
),
(
    '05c8aeb2806be99c','50db8711c70196cd','2016-04-23','Unanimous',5,5,5,
    'Herb Dean','Light Heavyweight',5,0,38,0,0,0,0,
    38,30,4,4,34,4,0,5,3,11,11,0,3,9,2,0,5,5,0
),
(
    '05c8aeb2806be99c','07f72a2a7591b409','2016-04-23','Unanimous',5,5,5,
    'Herb Dean','Light Heavyweight',1,0,26,1,0,0,0.067,
    26,7,9,10,23,3,0,5,7,13,13,0,5,11,2,0,1,5,0
),
(
    '05c8aeb2806be99c','07f72a2a7591b409','2016-04-23','Unanimous',2,5,5,
    'Herb Dean','Light Heavyweight',2,0,30,1,0,0,0.233,
    28,10,4,14,21,7,0,5,4,20,18,0,10,13,5,0,4,5,0
),
(
    '05c8aeb2806be99c','07f72a2a7591b409','2016-04-23','Unanimous',3,5,5,
    'Herb Dean','Light Heavyweight',3,0,46,0,0,0,0.017,
    46,12,8,26,44,2,0,5,6,30,30,0,19,29,1,0,5,5,0
),
(
    '05c8aeb2806be99c','07f72a2a7591b409','2016-04-23','Unanimous',5,5,5,
    'Herb Dean','Light Heavyweight',5,0,31,1,0,0,1.217,
    28,14,3,11,22,5,1,5,3,21,18,1,9,15,2,1,6,5,0
),
(
    '05c8aeb2806be99c','07f72a2a7591b409','2016-04-23','Unanimous',4,5,5,
    'Herb Dean','Light Heavyweight',4,0,30,2,0,0,2.367,
    29,20,5,4,10,1,18,5,4,27,26,2,3,8,1,17,19,5,0
);


-- Table: Fighter Metrics
CREATE TABLE public.fighter_metrics (
fighter_id text NOT NULL,
division text,
striking_output_on_feet_per_min numeric,
striking_efficiency_on_feet numeric,
striking_superiority_on_feet_per_min numeric,
takedown_attempt_commitment numeric,
takedown_efficiency numeric,
control_yield numeric,
aggression numeric,
striking_output_on_ground numeric,
striking_efficiency_on_ground numeric,
defensive_liability_strikes_on_feet numeric,
defensive_liability_strikes_on_ground numeric,
defensive_liability_takedowns numeric,
defensive_recovery_ground numeric,
outcome_volatility numeric
);

INSERT INTO public.fighter_metrics (
fighter_id, division, striking_output_on_feet_per_min, striking_efficiency_on_feet,
striking_superiority_on_feet_per_min, takedown_attempt_commitment, takedown_efficiency,
control_yield, aggression, striking_output_on_ground, striking_efficiency_on_ground,
defensive_liability_strikes_on_feet, defensive_liability_strikes_on_ground,
defensive_liability_takedowns, defensive_recovery_ground, outcome_volatility
) VALUES
('07f72a2a7591b409','Heavyweight',5.0151057401812689,0.73493975903614457831,1.148036253776435,0.1812688821752265861,1,0.29003021148036253776,0.0604229607250755287,2.7794561933534743,0.86956521739130434783,2.5377643504531722,0.0604229607250755287,0,1,0.1208459214501510574),
('07f72a2a7591b409','Light Heavyweight',6.4099926524614254,0.55066483264557542412,1.328434974283615,0.27920646583394562821,0.44210526315789473684,0.23433651726671565026,0.02939015429831006613,1.0139603232916973,0.75942028985507246377,2.201322556943424,0.01763409257898603968,0.00587803085966201323,0.98074944893460690669,0.03526818515797207935),
('ab2a4b5e04dc5fe9','Heavyweight',17.2666666666666667,0.31660231660231660232,-2,0.66666666666666666667,0.1,0.00553333333333333333,0,0,NULL,7.4666666666666667,0,0,1,0),
(
    '25f9a5f3e8a52618', 'Heavyweight', 6.7262693527014107, 0.56359102244389027431,
    1.2244829494942718, NULL, NULL, 0.02207424056896522804, 0, 0.16773739034168106413,
    0.6, 2.5663820722277203, 1.0567455591525907, 0.1341899122733448513,
    0.63181642820001006424, 0.06709495613667242565
),
(
    '50db8711c70196cd', 'Heavyweight', 4.574321623662122, 0.49514563106796116505,
    -1.5543811342541191, 0.22205444775058844429, 0.2, 0.06959186392503441844, 0,
    0, NULL, 3.8193365013101212, 0.13323266865035306657, 0.04441088955011768886,
    0.72984855886663409868, 0.04441088955011768886
),
(
    '50db8711c70196cd', 'Light Heavyweight', 5.5991990895187037, 0.4379732090856144438,
    -0.42067366485026952464, 0.19892320585942977522, 0.37704918032786885246,
    0.13435795089531747818, 0.03587139777792995947, 0.87395769131683901243,
    0.72761194029850746269, 2.8729728583960268, 0.41415159252700953201,
    0.10435315717215988208, 0.80798040769474092698, 0.0652207232325999263
);



