# CentralHub Project: How to setup

The database is in the form of a mysqldump which is currently stored in the database folder.

### Steps
1) After cloning the repository to your local computer, mount the finaldbdump.sql schema in mySql (from the database folder) and run it. This should automatically create the 
   centralhub
   database. Every table has been populated with some values, but further work can be done through our frontend.
2) Ensure flask is installed along with all the dependencies listed in the import statements inside routes.py.
   Also, make sure that in the get_db_connection() function at the top of routes.py, the password is set to the password you set up
   your mysql with. It is currently set to the dummy value "password" for security reasons. To run the flask app, open your terminal and run:
   python run.py
   The flask app should automatically run on http://localhost:5000/
   No need to access this directly
3) Ensure all react dependencies are installed (using npm i) and then run the react app (using npm start).
   The react app should automatically start in http://localhost:3000/ and open the webpage automatically.
   In some cases, if the port 3000 is busy, there will be a message on the terminal informing you so and it will take you to a different port. Note this down and change the 
   host_url variable in routes.py and __init__.py accordingly
4) There are two end users, the student login and the admin login. Only one priviledged user has access to the admin login currently. For testing purposes, you can access 
   the admin side using the email: "admin@ucalgary.ca" and password "password."
   All passwords stored for both end users are hashed using sha256.
   Admin login is to make manipulating the database for the admins much easier, faster, and nicer to visualize.
5) If you want to log in as a student, an example valid student login is naheen.kabir@ucalgary.ca with password "password."
6) As an admin, you can view all the current research, course, club and student info and add new values accordingly. Our system assumes any new data to be added would be 
   sent to the admin via email requests in a real-life scenario, upon which if the admin approves it they can add it to the database.
7) As a student, there is mostly only priviledge to view what is common sense to be public information for a university student
   as well as the student's own personal details. The student can only manipulate their own password and fields such as address or phone which wouldnt affect anything else 
   in the database. They can also self-enroll and leave clubs, which we thought would be pretty harmless.
8) SQL injections have been taken care of by using parametrized input to all queries in the flask app.
10) ENJOY :)   
