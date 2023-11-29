from flask import render_template
from flask import Flask
import mysql.connector

def get_db_connection():
    return mysql.connector.connect(
        host='localhost',
        user='root',
        password='sQlprequelwoohoo7676',
        database='centralhub'
    )

# testing using dummy template test.html will change later
def create_routes(app):
    
    @app.route('/')
    def index():
        try:
            # Establish a database connection
            connection = get_db_connection()

            # Create a cursor
            cursor = connection.cursor()

            # Execute a test query
            cursor.execute('SELECT * from FACULTY')

            # Fetch the result
            result = cursor.fetchone()

            # Close the cursor and connection
            cursor.close()
            connection.close()

            # Pass the result to the template for rendering
            return render_template('test.html', result=result)

        except mysql.connector.Error as e:
            # Handle database connection errors
            return f"Database connection error: {e}"
    
