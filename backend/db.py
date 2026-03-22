from psycopg2 import pool
from config import DB_URL


connection_pool = pool.SimpleConnectionPool(
    minconn=1,
    maxconn=10,
    dsn=DB_URL
)

def get_db_connection():
    return connection_pool.getconn()