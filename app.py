from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from google.cloud.sql.connector import Connector
import sqlalchemy

# initialize Python Connector object
connector = Connector()

# Python Connector database connection function
def getconn():
    conn = connector.connect(
        "cs124s-mealmaker:us-central1:mealmaker-sql-2",
        "pymysql",
        user="root",
        password="cs124-cs411",
        db="meals",
        ip_type="public"  # "private" for private IP
    )
    return conn
app = Flask(__name__)

# configure Flask-SQLAlchemy to use Python Connector
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://"
app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {
    "creator": getconn
}


# initialize the app with the extension
db = SQLAlchemy()
db.init_app(app)

test_select = sqlalchemy.text(
    "SELECT Title FROM Recipe LIMIT 9;",
)

@app.route('/', methods=['GET'])
def get_recipe_test():
    results = db.session.execute(test_select).fetchall()
    
    # Debug: Print raw results
    print("Raw results:", results)
    
    # Debug: Print the first row if it exists
    if results:
        print("First row:", results[0])
        print("First row keys:", results[0].keys())
        
    # Convert to list of dicts with all columns
    recipes = []
    for row in results:
        recipe_dict = {}
        for column in row.keys():
            recipe_dict[column.lower()] = row[column]
        recipes.append(recipe_dict)
        
    print("Processed recipes:", recipes)
    
    return jsonify({"recipes": recipes})


'''
from google.cloud.sql.connector import Connector
import sqlalchemy
import pymysql  

pymysql.install_as_MySQLdb()
# initialize Connector object
connector = Connector()

# function to return the database connection
def getconn() -> pymysql.connections.Connection:
    conn: pymysql.connections.Connection = connector.connect(
        "cs124s-mealmaker:us-central1:mealmaker-sql-2",
        "pymysql",
        user="root",
        password="cs124-cs411",
        db="meals"
    )
    return conn

# create connection pool
pool = sqlalchemy.create_engine(
    "mysql+pymysql://",
    creator=getconn,
)

select_top_1_recipe_stmt = sqlalchemy.text(
    "SELECT Title FROM Recipe LIMIT 2;",
)

with pool.connect() as db_conn:
    # insert into database
    #result = db_conn.execute(stmt, parameters={"id": "book1", "title": "Book One"})
    result = db_conn.execute(select_top_1_recipe_stmt).fetchall()
    # query database
    #result = db_conn.execute(sqlalchemy.text("SELECT * from my_table")).fetchall()

    # commit transaction (SQLAlchemy v2.X.X is commit as you go)
    db_conn.commit()

    # Do something with the results
    for row in result:
        print(row)

'''
print("finished run")