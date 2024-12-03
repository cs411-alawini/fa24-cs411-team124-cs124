from google.cloud.sql.connector import Connector

connector = Connector()

def getconn():
    conn = connector.connect(
        "cs124s-mealmaker:us-central1:mealmaker-sql-2",
        "pymysql",
        user="root",
        password="cs124-cs411",
        db="meals",
        ip_type="public"
    )
    return conn