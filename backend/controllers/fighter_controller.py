from flask import request, jsonify
from services.fighter_service import search_fighters_by_id, search_fighters_by_name, get_fighter_division
from services.dynamic_calc_stat import get_fighter_stats_percentiles_dynamically


## controller for searching for a fighter
def search_fighter_controller():
    name = request.args.get("name")  # will have name arg
    fighters = search_fighters_by_name(name)
    return jsonify(fighters)

## controller for getting a fighter division
def get_fighter_division_controller(fighter_id):
    fighter_division = get_fighter_division(fighter_id)
    return jsonify(fighter_division)


## controller for getting a fighter stats
def get_fighter_stats_controller(fighter_id):
    division = request.args.get("division")
    last_n_years = request.args.get("years")
    
    fighter_stats = get_fighter_stats_percentiles_dynamically(fighter_id, division, int(last_n_years))

    return jsonify(fighter_stats)


## controller for getting a fighter personal metrics by searching with an id
def search_fighters_by_id_controller(fighter_id):
    
    fighter_stats = search_fighters_by_id(fighter_id)

    return jsonify(fighter_stats)







'''

def get_fighter_round_stats_controller(fighter_id):
    fighter_round_stats = get_fighter_round_stats(fighter_id)
    return jsonify(fighter_round_stats)

'''
