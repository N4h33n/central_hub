# 471 CentralHub Project: How to setup

We decided to use flask for backend work since we already had experience using it from prior hackathons.
We were not able to host the database as most options we saw required pricing, so we created a mysqldump
which is currently stored in the database folder.

1) Open the finaldbdump.sql using mysql and run it and it should automatically create the centralhub
   database. Every table has been populated with some values, but further work can be done through our frontend.
2) for flask, ensure flask is installed along with all dependencies listed in the import statements in the routes.py.
   also make sure, in the get_db_connection() function at the top, the password is set to the password you set up
   your mysql with. We just used default "password" for security reasons
   run.py and __init__.py files. To run the flask app, in the centralhub folder, in a terminal type:
   python run.py
   the flask app should automatically run on http://localhost:5000/
   No need to access this directly
3) once the flask app is running, on a new terminal, after ensuring react dependencies are installed (our frontend makes use of react), in the centralhub folder type:
   npm start
   the react app should automatically start in http://localhost:3000/ and open the webpage automatically
   in some cases, if the port 3000 is busy, there will be a message on the terminal informing you so and it will take
   you to a different port. Note this down and change the host_url variable in routes.py and __init__.py accordingly
4) There are two end users, the student login and the admin login. only one priviledged user has access to the admin login currently.
   all passwords stored for both end users are hashed using sha256.
   Admin login is to make manipulating the database for the admins much easier and faster and nicer to visualize.
5) currently, (for your convinence we are mentioning this) admin email is set to admin@ucalgary.ca and password is set to password.
   If you want to log in as a student, an example valid student login is naheen.kabir@ucalgary.ca and password is password
6) As an admin, you can view all the current research, course, club and student info and add new values accordingly. Our system assumes any new data to be added would be sent to the admin via email requests in a real-life scenario, upon which if the admin approves it they can add it to the database.
7) As a student, there is mostly only priviledge to view what is common sense to be public information for a university student
   plus the student's own personal details. The student can only manipulate their own password and fields such as address or phone which wouldnt affect anything else in the database. They can also self-enroll and leave clubs, which we thought would be pretty harmless.
8) SQL injections have been taken care of by using parametrized input to all queries in the flask app.
9) NOTE!!!!! in case you are viewing the github, the latest final branch is 'combined', not main
10) enjoy :)   
