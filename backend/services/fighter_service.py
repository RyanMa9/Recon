from db import get_db_connection


## Abstracted helper function to retrieve data from the database using a given query and given params or if not given default none
def fetch_from_db(query, columns, params=None):
    conn = get_db_connection()
    curr = conn.cursor()

    curr.execute(query, params)
    rows = curr.fetchall()
    
    curr.close()
    conn.close()

    return [dict(zip(columns, row)) for row in rows]
        


## Function to query database to search for a particular fighter name
def search_fighters_by_name(name):

    if not name:
        return []  # don't query DB if input is empty

    query = """
    SELECT
        fighter_id,
        CASE
            WHEN first_name IS NOT NULL THEN first_name || ' ' || last_name
            ELSE last_name
        END AS name,
        NULLIF(nickname, 'None') AS nickname,
        height,
        weight,
        reach,
        NULLIF(stance, 'Unknown') AS stance
    FROM fighters
    WHERE
        first_name ILIKE %(first_word)s 
        OR last_name ILIKE %(first_word)s 
        OR nickname ILIKE %(first_word)s  
        OR (first_name || ' ' || last_name) ILIKE %(full_name)s;
    """
    
    params = {
        "first_word": f"%{name.split()[0]}%",  # just the first word for faster partial match
        "full_name": f"%{name}%"               
    }

    columns = ["fighter_id", "name", "nickname",  "height", "weight", "reach", "stance"]

   
    return fetch_from_db(query, columns, params)

## Function to query database using fighter id to search for fighter divisions
def get_fighter_division(fighter_id):
    
    query = "SELECT division FROM fighter_metrics WHERE fighter_id = %s"

    params = (fighter_id,)

    columns = ["division"]


    return fetch_from_db(query, columns, params)


## Function to query database using fighter id to search for fighter personal metrics
def search_fighters_by_id(fighter_id):

    query = """
    SELECT
        fighter_id,
        CASE
            WHEN first_name IS NOT NULL THEN first_name || ' ' || last_name
            ELSE last_name
        END AS name,
        NULLIF(nickname, 'None') AS nickname,
        height,
        weight,
        reach,
        NULLIF(stance, 'Unknown') AS stance
    FROM fighters
    WHERE
        fighter_id = %s
    """

    params = (fighter_id,)

    columns = ["fighter_id", "name", "nickname",  "height", "weight", "reach", "stance"]

   
    return fetch_from_db(query, columns, params)



'''
## Function to query database using fighter id to search for fighter lifetime stats
def get_fighter_stats(fighter_id, division):
    conn = get_db_connection()
    curr = conn.cursor()

    query = "SELECT * FROM fighter_percentiles WHERE fighter_id = %s AND disivion = %s"
    params = (fighter_id, division)

    curr.execute(query, params)

    curr.close()
    conn.close()


 ## Function to query database using fighter id to search for fighter round stats
def get_fighter_round_stats(fighter_id):
    conn = get_db_connection()
    curr = conn.cursor()

    query = "SELECT * FROM round_metrics WHERE fighter_id = %s"


    curr.execute(query, (fighter_id,))


    curr.close()
    conn.close()

'''