from flask import Blueprint
from controllers.fighter_controller import search_fighter_controller, get_fighter_division_controller, get_fighter_stats_controller, search_fighters_by_id_controller


fighter_bp = Blueprint("fighter_bp", __name__)


## route for searching for fighter by name
@fighter_bp.route("/search", methods=["GET"])
def search():

    return search_fighter_controller()

## route for getting a fighter division
@fighter_bp.route("/<fighter_id>/division", methods=["GET"])
def fighter_division(fighter_id):
    
    return get_fighter_division_controller(fighter_id) 


## route for getting fighter stats
@fighter_bp.route("/<fighter_id>/stats", methods=["GET"])
def stats(fighter_id):
    
    return get_fighter_stats_controller(fighter_id)


## route for getting fighter metrics by fighter id
@fighter_bp.route("/<fighter_id>/metrics", methods=["GET"])
def metrics(fighter_id):
    return search_fighters_by_id_controller(fighter_id)


'''
@fighter_bp.route("/stats/<fighter_id>/round_stats", methods=["GET"])
def round_stats(fighter_id):
    return get_fighter_round_stats_controller(fighter_id)

'''