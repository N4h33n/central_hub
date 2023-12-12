from flask import render_template
from flask import Flask, request, jsonify, Blueprint
from flask_cors import cross_origin
import mysql.connector
from datetime import datetime, timedelta

routes = Blueprint('routes', __name__)
host_url = 'http://localhost:3002'

def get_db_connection():
    return mysql.connector.connect(
        host='localhost',
        user='root',
        password="*PASSworld*123",
        database='centralhub'
    )
    
def create_routes(app):

    @app.route('/api/adminlogin', methods = ['POST'])
    @cross_origin(origin=host_url, headers=['Content-Type', 'Authorization'])
    def admin_login():
        data = request.get_json()
        try:

            connection = get_db_connection()


            cursor = connection.cursor()


            query = "SELECT * from admin as A, faculty as F Where F.f_ucid = A.a_ucid and F.email = (%s) and A.passhash = (%s)"
            values = (data.get('email'), data.get('password'))
            cursor.execute(query, values)

            result = cursor.fetchone()

            if result:
                return jsonify({'success': True})
        
            else:
                return jsonify({'success': False})
            
        except mysql.connector.Error as e:
                print(f"Error: {e}")
        
        finally:
            cursor.close()
            connection.close()
    

    @app.route('/api/studentlist', methods = ['GET'])
    @cross_origin(origin=host_url, headers=['Content-Type', 'Authorization'])
    def student_list():
        
        try:
            connection = get_db_connection()

            cursor = connection.cursor()

            query = f"SELECT s_ucid, name, email, phone, address from STUDENT"
            cursor.execute(query)

            columns = [column[0] for column in cursor.description]
            result = [dict(zip(columns, row)) for row in cursor.fetchall()]

            return jsonify(result)
        
        except mysql.connector.Error as e:
            print(f"Error{e}")
        
        finally:
            cursor.close()
            connection.close()
            
    @app.route('/api/addstudent', methods = ['POST'])
    @cross_origin(origin=host_url, headers=['Content-Type', 'Authorization'])
    def addStudent():
        
        data = request.get_json()
        
        try:
            connection = get_db_connection()

            cursor = connection.cursor()

            query = "insert into STUDENT values (%s, %s, %s, %s, %s, %s, %s)"
            
            values = (data.get('ucid'), data.get('email'), data.get('telephone'), data.get('name'), data.get('address'), data.get('password'), data.get('a_ucid'))
            cursor.execute(query, values)
            
            connection.commit()
            
            return "True"
        
        except mysql.connector.Error as e:
                print(f"Error: {e}")

                return "False"
        finally:
            cursor.close()
            connection.close()
            
    @app.route('/api/removestudent', methods = ['POST'])
    @cross_origin(origin=host_url, headers=['Content-Type', 'Authorization'])
    def remove_student():
        
        data = request.get_json()
        
        try:
            connection = get_db_connection()

            cursor = connection.cursor()

            query = "delete from student where s_ucid = %s"
            
            values = (data.get('ucid'),)
            cursor.execute(query, values)
            
            connection.commit()
            
            return "True"
        
        except mysql.connector.Error as e:
                print(f"Error: {e}")

                return "False"
        finally:
            cursor.close()
            connection.close()
    
    @app.route('/api/studentinfo', methods = ['POST'])
    @cross_origin(origin=host_url, headers=['Content-Type', 'Authorization'])
    def student_info():
        data = request.get_json()
        
        try:
            connection = get_db_connection()

            cursor = connection.cursor()

            query = "SELECT C.courseno, C.coursename, C.semester from COURSE as C, STUDENT_ENROLLEDIN_COURSE as SC where SC.s_ucid = (%s) and SC.courseno = C.courseno"
            values = (data.get("ucid"),)
            cursor.execute(query, values)

            columns = [column[0] for column in cursor.description]
            result = [dict(zip(columns, row)) for row in cursor.fetchall()]

            return jsonify(result)
        
        except mysql.connector.Error as e:
            print(f"Error{e}")
            return jsonify({"error": "bruh"})
        
        finally:
            cursor.close()
            connection.close()
             
    @app.route('/api/studentlogin', methods = ['POST'])
    @cross_origin(origin=host_url, headers=['Content-Type', 'Authorization'])
    def student_login():
        data = request.get_json()
        
        try:
            connection = get_db_connection()

            cursor = connection.cursor()

            query = "SELECT * from STUDENT as S where S.email = (%s) and S.passhash = (%s)"
            values = (data.get("email"), data.get("password"))
            cursor.execute(query, values)

            
            result = cursor.fetchone()

            s_ucid = result[0]
            
            if result:
                return jsonify({'success': True, 'ucid': s_ucid})
        
            else:
                return jsonify({'success': False})
        
        except mysql.connector.Error as e:
            print(f"Error{e}")
        
        finally:
            cursor.close()
            connection.close()
              
    @app.route('/api/dashboardassignments', methods = ['POST'])
    @cross_origin(origin=host_url, headers=['Content-Type', 'Authorization'])
    def dashboard_assignments():
        data = request.get_json()
        
        try:
            connection = get_db_connection()

            cursor = connection.cursor()
            
            today = datetime.now()
            check_date = today + timedelta(weeks=2)

            query = "SELECT SA.courseno, SA.assignmentno, A.deadline, A.weight from STUDENT_DOES_ASSIGNMENT as SA, ASSIGNMENT as A where SA.s_ucid = (%s) and SA.courseno = A.courseno and SA.assignmentno = A.assignmentno and A.deadline <= (%s)"
            values = (data.get("ucid"), check_date)
            cursor.execute(query, values)

            columns = [column[0] for column in cursor.description]
            result = [dict(zip(columns, row)) for row in cursor.fetchall()]

            return jsonify(result)
        
        except mysql.connector.Error as e:
            print(f"Error{e}")
        
        finally:
            cursor.close()
            connection.close()
            
    @app.route('/api/dashboardexams', methods = ['POST'])
    @cross_origin(origin=host_url, headers=['Content-Type', 'Authorization'])
    def dashboard_exams():
        data = request.get_json()
        
        try:
            connection = get_db_connection()

            cursor = connection.cursor()
            
            today = datetime.now()
            check_date = today + timedelta(weeks=2)

            query = "SELECT SE.courseno, SE.examno, E.time, E.location, E.weight from STUDENT_TAKES_EXAM as SE, EXAM as E where SE.s_ucid = (%s) and SE.courseno = E.courseno and SE.examno = E.examno and E.time <= (%s)"
            values = (data.get("ucid"), check_date)
            cursor.execute(query, values)

            columns = [column[0] for column in cursor.description]
            result = [dict(zip(columns, row)) for row in cursor.fetchall()]

            return jsonify(result)
        
        except mysql.connector.Error as e:
            print(f"Error{e}")
        
        finally:
            cursor.close()
            connection.close()
            
    @app.route('/api/dashboardname', methods = ['POST'])
    @cross_origin(origin=host_url, headers=['Content-Type', 'Authorization'])
    def dashboard_name():
        data = request.get_json()
        
        try:
            connection = get_db_connection()

            cursor = connection.cursor()

            query = "SELECT S.name from STUDENT as S where S.s_ucid = (%s)"
            print(data.get("ucid"))
            values = (data.get("ucid"),)
            cursor.execute(query, values)

            columns = [column[0] for column in cursor.description]
            result = [dict(zip(columns, row)) for row in cursor.fetchall()]
            print(result)
            return jsonify(result)
        
        except mysql.connector.Error as e:
            print(f"Error{e}")
        
        finally:
            cursor.close()
            connection.close()

    @app.route('/api/studentinfodefault', methods = ['POST'])
    @cross_origin(origin=host_url, headers=['Content-Type', 'Authorization'])
    def student_info_default():
        data = request.get_json()
        
        try:
            connection = get_db_connection()

            cursor = connection.cursor()

            query = "SELECT S.name, S.email, S.s_ucid, s.phone, s.address, s.passhash from STUDENT as S where S.s_ucid = (%s)"
            values = (data.get("ucid"),)
            print(values)
            cursor.execute(query, values)

            columns = [column[0] for column in cursor.description]
            result = [dict(zip(columns, row)) for row in cursor.fetchall()]
            print(result)
            return jsonify(result)
        
        except mysql.connector.Error as e:
            print(f"Error{e}")
        
        finally:
            cursor.close()
            connection.close()
    
    @app.route('/api/updateinfo', methods = ['POST'])
    @cross_origin(origin=host_url, headers=['Content-Type', 'Authorization'])
    def update_info():
        data = request.get_json()
        print(data)
        
        try:
            connection = get_db_connection()

            cursor = connection.cursor()

            query = "update student set phone = %s, address = %s, passhash = %s where s_ucid = %s"
            values = (data.get("telephone"), data.get("address"), data.get("passhash"), data.get("ucid"))
            print(values)
            cursor.execute(query, values)
            
            connection.commit()
            

            return "True"

        except mysql.connector.Error as e:
            print(f"Error{e}")
            return "False"
        
        finally:
            cursor.close()
            connection.close()
    
            
    @app.route('/api/enrolledcourses', methods = ['POST'])
    @cross_origin(origin=host_url, headers=['Content-Type', 'Authorization'])
    def enrolled_courses():
        data = request.get_json()
        
        try:
            connection = get_db_connection()

            cursor = connection.cursor()
            
            
            # reference for "coalesce" used to replace null values with 0: https://365datascience.com/question/sum-for-columns-with-null-values/
            query = "select sc.courseno, c.coursename, (sum(coalesce(sa.grade, 0) * a.weight) + sum(coalesce(se.grade, 0) * e.weight)) as currentgrade from COURSE as c, STUDENT_ENROLLEDIN_COURSE as sc, STUDENT_DOES_ASSIGNMENT as sa, STUDENT_TAKES_EXAM as se, ASSIGNMENT as a, EXAM as e where sc.s_ucid = %s and sc.courseno = c.courseno and sa.courseno = c.courseno and se.courseno = c.courseno and a.courseno = c.courseno and sa.assignmentno = a.assignmentno and e.courseno = c.courseno and se.examno = e.examno group by sc.courseno, c.coursename"
            values = (data.get("ucid"),)
            cursor.execute(query, values)

            
            columns = [column[0] for column in cursor.description]
            result = [dict(zip(columns, row)) for row in cursor.fetchall()]
            print(result)

            return jsonify(result)
            
        except mysql.connector.Error as e:
                print(f"Error: {e}")

                return "False"
        finally:
            cursor.close()
            connection.close()
    
    @app.route('/api/explorecourses', methods = ['GET'])
    @cross_origin(origin=host_url, headers=['Content-Type', 'Authorization'])
    def explore_courses():
        
        
        try:
            connection = get_db_connection()

            cursor = connection.cursor()

            query = "SELECT c.courseno, c.coursename, c.semester, l.lectureno, f1.name as instructor, t.tutorialno, f2.name as ta, group_concat(cf.field separator ', ') as fields from COURSE as c, LECTURE as l, TUTORIAL as t, FACULTY as f1, FACULTY as f2, COURSE_FIELDS as cf where l.courseno = c.courseno and t.courseno = c.courseno and l.i_ucid = f1.f_ucid and t.t_ucid = f2.f_ucid and cf.courseno = c.courseno group by c.courseno, c.coursename, c.semester, l.lectureno, f1.name, t.tutorialno, f2.name"
            cursor.execute(query)

            columns = [column[0] for column in cursor.description]
            result = [dict(zip(columns, row)) for row in cursor.fetchall()]
            print(result)

            return jsonify(result)
        
        except mysql.connector.Error as e:
            print(f"Error{e}")
        
        finally:
            cursor.close()
            connection.close()
            
    @app.route('/api/filtercourses', methods = ['POST'])
    @cross_origin(origin=host_url, headers=['Content-Type', 'Authorization'])
    def filter_courses():
        
        data = request.get_json()
        
        conditions = []
        values = []
        
        try:
            connection = get_db_connection()

            cursor = connection.cursor()

            query = "SELECT c.courseno, c.coursename, c.semester, l.lectureno, f1.name as instructor, t.tutorialno, f2.name as ta, group_concat(cf.field separator ', ') as fields from COURSE as c, LECTURE as l, TUTORIAL as t, FACULTY as f1, FACULTY as f2, COURSE_FIELDS as cf where l.courseno = c.courseno and t.courseno = c.courseno and l.i_ucid = f1.f_ucid and t.t_ucid = f2.f_ucid and cf.courseno = c.courseno"
            
            if data.get("coursename") and data.get("coursename") != "":
                conditions.append("c.coursename like %s")
                values.append("%" + str(data.get("coursename")) + "%")
            
            if data.get("coursenumber") and data.get("coursenumber") != "":
                conditions.append("c.courseno like %s")
                values.append("%" + str(data.get("coursenumber")) + "%")
            
            if data.get("field") and data.get("field") != "":
                conditions.append("cf.field like %s")
                values.append("%" + str(data.get("field")) + "%")
            
            if data.get("instructor") and data.get("instructor") != "":
                conditions.append("f1.name like %s")
                values.append("%" + str(data.get("instructor")) + "%")
            
            if data.get("ta") and data.get("ta") != "":
                conditions.append("f2.name like %s")
                values.append("%" + str(data.get("ta")) + "%")
            
            
            
            print(conditions)
            print(values)
            
            if conditions:
                query += " and " + " and ".join(conditions)
                
            query += " group by c.courseno, c.coursename, c.semester, l.lectureno, f1.name, t.tutorialno, f2.name"
            
            print(query)
                
            cursor.execute(query, values)

            columns = [column[0] for column in cursor.description]
            result = [dict(zip(columns, row)) for row in cursor.fetchall()]
            print("filter")
            print(result)

            return jsonify(result)
            
        
        except mysql.connector.Error as e:
            print(f"Error{e}")
        
        finally:
            cursor.close()
            connection.close()
            
    @app.route('/api/enrolledecas', methods = ['POST'])
    @cross_origin(origin=host_url, headers=['Content-Type', 'Authorization'])
    def enrolled_ecas():
        data = request.get_json()
        
        try:
            connection = get_db_connection()

            cursor = connection.cursor()

            query = "select sc.clubname, sc.datejoined, group_concat(cf.field separator ', ') as fields, c.description, c.location, c.time from CLUB as c, STUDENT_MEMBEROF_CLUB as sc, CLUB_FIELDS as cf where sc.s_ucid = %s and sc.clubname = c.clubname group by sc.clubname, sc.datejoined, c.description, c.location, c.time"
            values = (data.get("ucid"),)
            print("enrolledeca")
            print(values)
            cursor.execute(query, values)

            columns = [column[0] for column in cursor.description]
            result = [dict(zip(columns, row)) for row in cursor.fetchall()]
            print(result)
            return jsonify(result)
            
        except mysql.connector.Error as e:
                print(f"Error: {e}")
                return jsonify({"error": "bruh"})

        finally:
            cursor.close()
            connection.close()
            
    @app.route('/api/joinclub', methods = ['POST'])
    @cross_origin(origin=host_url, headers=['Content-Type', 'Authorization'])
    def join_club():
        data = request.get_json()
        
        try:
            connection = get_db_connection()

            cursor = connection.cursor()
            
            today = datetime.now()

            query = "insert into student_memberof_club values (%s, %s, %s)"
            values = (data.get("ucid"), data.get("clubname"), today)
            print("joinclub")
            print(values)
            cursor.execute(query, values)

            connection.commit()
            

            return "True"
            
        except mysql.connector.Error as e:
                print(f"Error: {e}")
                return "False"

        finally:
            cursor.close()
            connection.close()  
            
    @app.route('/api/leaveclub', methods = ['POST'])
    @cross_origin(origin=host_url, headers=['Content-Type', 'Authorization'])
    def leave_club():
        data = request.get_json()
        
        try:
            connection = get_db_connection()

            cursor = connection.cursor()

            query = "delete from student_memberof_club where s_ucid = %s and clubname = %s"
            values = (data.get("ucid"), data.get("clubname"))
            print("leaveclub")
            print(values)
            cursor.execute(query, values)

            connection.commit()
            

            return "True"
            
        except mysql.connector.Error as e:
                print(f"Error: {e}")
                return "False"

        finally:
            cursor.close()
            connection.close()
            
    @app.route('/api/discoverecas', methods = ['GET'])
    @cross_origin(origin=host_url, headers=['Content-Type', 'Authorization'])
    def discover_ecas():
        
        try:
            connection = get_db_connection()

            cursor = connection.cursor()

            # reference for not duplicating rows for multivalued attribute field using group_concat: https://stackoverflow.com/questions/12095450/how-to-put-a-multivalued-attribute-in-one-column-in-a-query
            query = "SELECT c.clubname, group_concat(cf.field separator ', ') as fields, c.location, c.time, c.description from CLUB as c, CLUB_FIELDS as cf where cf.clubname = c.clubname group by c.clubname, c.location, c.time, c.description"
            cursor.execute(query)

            columns = [column[0] for column in cursor.description]
            result = [dict(zip(columns, row)) for row in cursor.fetchall()]
            print(result)

            return jsonify(result)
        
        except mysql.connector.Error as e:
            print(f"Error{e}")
            return jsonify({"error": "bruh"})
        
        finally:
            cursor.close()
            connection.close()
            
    @app.route('/api/filterecas', methods = ['POST'])
    @cross_origin(origin=host_url, headers=['Content-Type', 'Authorization'])
    def filterecas():
        
        data = request.get_json()
        print(data)
        try:
            connection = get_db_connection()

            cursor = connection.cursor()

            query = "SELECT c.clubname, group_concat(cf.field separator ', ') as fields, c.location, c.time, c.description from CLUB as c, CLUB_FIELDS as cf where cf.clubname = c.clubname"
            
            conditions = []
            values = []

            if data.get("clubname") and data.get("clubname") != "":
                conditions.append("c.clubname LIKE %s")
                values.append("%" + str(data.get("clubname")) + "%",)

            if data.get("field") and data.get("field") != "":
                conditions.append("cf.field LIKE %s")
                values.append("%" + str(data.get("field")) + "%",)

            if data.get("meetingtime") and data.get("meetingtime") != "":
                conditions.append("c.time LIKE %s")
                values.append("%" + str(data.get("meetingtime")) + "%",)

            if data.get("location") and data.get("location") != "":
                conditions.append("c.location LIKE %s")
                values.append("%" + str(data.get("location")) + "%")
                
            print(conditions)
            print(values)
            
            if conditions:
                query += " and " + " and ".join(conditions)
            
            query += " group by c.clubname, c.location, c.time, c.description"
                
            cursor.execute(query, values)

            columns = [column[0] for column in cursor.description]
            result = [dict(zip(columns, row)) for row in cursor.fetchall()]
            print(result)
            return jsonify(result)
        
        except mysql.connector.Error as e:
            print(f"Error{e}")
            return jsonify({"error": "bruh"})
        
        finally:
            cursor.close()
            connection.close()
            
    @app.route('/api/updatepersonalinfo', methods = ['POST'])
    @cross_origin(origin=host_url, headers=['Content-Type', 'Authorization'])
    def update_personal_info():
        data = request.get_json()
        print(data)
        
        try:
            connection = get_db_connection()

            cursor = connection.cursor()

            query = "update student set name = %s, email = %s, s_ucid = %s, phone = %s, address = %s, passhash = %s where s_ucid = %s"
            values = (data.get("name"), data.get("email"), data.get("ucid"), data.get("phone"), data.get("Address"), data.get("passhash"), data.get("olducid"))
            print(values)
            cursor.execute(query, values)
            
            connection.commit()
            

            return "True"
        
        except mysql.connector.Error as e:
            print(f"Error{e}")
            return "False"
        
        finally:
            cursor.close()
            connection.close()
    
    
    @app.route('/api/loadpersonalinfo', methods = ['POST'])
    @cross_origin(origin=host_url, headers=['Content-Type', 'Authorization'])
    def load_personal_info():
        data = request.get_json()
        
        try:
            connection = get_db_connection()

            cursor = connection.cursor()
            
            query = "select s.name, s.email, s.phone, s.address, s.passhash from STUDENT as s where s.s_ucid = %s"
            values = (data.get("olducid"),)
            
            cursor.execute(query, values)

            columns = [column[0] for column in cursor.description]
            result = [dict(zip(columns, row)) for row in cursor.fetchall()]
            print(result)

            return jsonify(result)
        
        except mysql.connector.Error as e:
            print(f"Error{e}")
            return jsonify({"error": "bruh"})
        
        finally:
            cursor.close()
            connection.close()
            
    @app.route('/api/assignmentcomponent', methods = ['POST'])
    @cross_origin(origin=host_url, headers=['Content-Type', 'Authorization'])
    def assignment_component():
        data = request.get_json()
        
        try:
            connection = get_db_connection()

            cursor = connection.cursor()

            query = "SELECT SA.courseno, SA.assignmentno, SA.grade, A.deadline, A.weight from STUDENT_DOES_ASSIGNMENT as SA, ASSIGNMENT as A where SA.s_ucid = (%s) and SA.courseno = A.courseno and SA.assignmentno = A.assignmentno and SA.courseno = %s"
            values = (data.get("ucid"), data.get("courseno"))
            cursor.execute(query, values)

            columns = [column[0] for column in cursor.description]
            result = [dict(zip(columns, row)) for row in cursor.fetchall()]

            return jsonify(result)
        
        except mysql.connector.Error as e:
            print(f"Error{e}")
        
        finally:
            cursor.close()
            connection.close()
            
    @app.route('/api/examcomponent', methods = ['POST'])
    @cross_origin(origin=host_url, headers=['Content-Type', 'Authorization'])
    def exam_component():
        data = request.get_json()
        print(data)
        try:
            connection = get_db_connection()

            cursor = connection.cursor()

            query = "SELECT SE.courseno, SE.examno, SE.grade, E.time, E.location, E.weight from STUDENT_TAKES_EXAM as SE, EXAM as E where SE.s_ucid = (%s) and SE.courseno = E.courseno and SE.examno = E.examno and SE.courseno = %s"
            values = (data.get("ucid"), data.get("courseno"))
            cursor.execute(query, values)

            columns = [column[0] for column in cursor.description]
            result = [dict(zip(columns, row)) for row in cursor.fetchall()]
            print(result)
            return jsonify(result)
        
        except mysql.connector.Error as e:
            print(f"Error{e}")
        
        finally:
            cursor.close()
            connection.close()
            
    @app.route('/api/enrolledresearch', methods = ['POST'])
    @cross_origin(origin=host_url, headers=['Content-Type', 'Authorization'])
    def enrolled_research():
        data = request.get_json()
        
        try:
            connection = get_db_connection()

            cursor = connection.cursor()
            
            # reference for not duplicating rows for multivalued attribute field using group_concat: https://stackoverflow.com/questions/12095450/how-to-put-a-multivalued-attribute-in-one-column-in-a-query
            query = "select sr.researchid, r.title, group_concat(rf.field separator ', ') as fields, sr.datejoined, f.name from RESEARCH as r, STUDENT_PARTICIPATESIN_RESEARCH as sr, RESEARCH_FIELDS as rf, RESEARCH_CONDUCTEDBY_PROFESSOR as rp, FACULTY as f where sr.s_ucid = %s and sr.researchid = r.researchid and rf.researchid = r.researchid and rp.researchid = sr.researchid and rp.r_ucid = f.f_ucid group by sr.researchid, r.title, sr.datejoined, f.name"
            values = (data.get("ucid"),)
            print("research")
            print(values)
            cursor.execute(query, values)

            columns = [column[0] for column in cursor.description]
            result = [dict(zip(columns, row)) for row in cursor.fetchall()]
            print(result)
            return jsonify(result)
            
        except mysql.connector.Error as e:
                print(f"Error: {e}")
                return jsonify({"error": "bruh"})

        finally:
            cursor.close()
            connection.close()
            
    @app.route('/api/pastresearch', methods = ['GET'])
    @cross_origin(origin=host_url, headers=['Content-Type', 'Authorization'])
    def past_research():
        
        try:
            connection = get_db_connection()

            cursor = connection.cursor()

            # reference for not duplicating rows for multivalued attribute field using group_concat: https://stackoverflow.com/questions/12095450/how-to-put-a-multivalued-attribute-in-one-column-in-a-query
            query = "select cr.researchid, r.title, group_concat(rf.field separator ', ') as fields, r.description, f.name from RESEARCH as r, COMPLETED_RESEARCH as cr, RESEARCH_FIELDS as rf, RESEARCH_CONDUCTEDBY_PROFESSOR as rp, FACULTY as f where cr.researchid = r.researchid and rf.researchid = r.researchid and rp.researchid = cr.researchid and rp.r_ucid = f.f_ucid group by cr.researchid, r.title, r.description, f.name"
            cursor.execute(query)

            columns = [column[0] for column in cursor.description]
            result = [dict(zip(columns, row)) for row in cursor.fetchall()]
            print(result)
            return jsonify(result)
            
        except mysql.connector.Error as e:
                print(f"Error: {e}")
                return jsonify({"error": "bruh"})

        finally:
            cursor.close()
            connection.close()
            
    @app.route('/api/exploreresearch', methods = ['GET'])
    @cross_origin(origin=host_url, headers=['Content-Type', 'Authorization'])
    def explore_research():
        
        try:
            connection = get_db_connection()

            cursor = connection.cursor()

            # reference for not duplicating rows for multivalued attribute field using group_concat: https://stackoverflow.com/questions/12095450/how-to-put-a-multivalued-attribute-in-one-column-in-a-query
            query = "SELECT onr.researchid, r.title, group_concat(rf.field separator ', ') as fields, f.name from ONGOING_RESEARCH as onr, RESEARCH as r, RESEARCH_CONDUCTEDBY_PROFESSOR as rp, RESEARCH_FIELDS as rf, FACULTY as f where onr.researchid = r.researchid and rf.researchid = r.researchid and rp.researchid = r.researchid and rp.r_ucid = f.f_ucid and r.researchid group by onr.researchid, r.title, f.name"
            cursor.execute(query)

            columns = [column[0] for column in cursor.description]
            result = [dict(zip(columns, row)) for row in cursor.fetchall()]
            print(result)

            return jsonify(result)
        
        except mysql.connector.Error as e:
            print(f"Error{e}")
            return jsonify({"error": "bruh"})
        
        finally:
            cursor.close()
            connection.close()
            
    @app.route('/api/filterresearch', methods = ['POST'])
    @cross_origin(origin=host_url, headers=['Content-Type', 'Authorization'])
    def filter_research():
        
        data = request.get_json()
        print(data)
        try:
            connection = get_db_connection()

            cursor = connection.cursor()

            query = "SELECT onr.researchid, r.title, group_concat(rf.field separator ', ') as fields, f.name from ONGOING_RESEARCH as onr, RESEARCH as r, RESEARCH_FIELDS as rf, RESEARCH_CONDUCTEDBY_PROFESSOR as rp, FACULTY as f where onr.researchid = r.researchid and rf.researchid = r.researchid and rp.researchid = r.researchid and rp.r_ucid = f.f_ucid"
            
            conditions = []
            values = []

            if data.get("researchid") and data.get("researchid") != "":
                conditions.append("r.researchid LIKE %s")
                values.append("%" + str(data.get("researchid")) + "%",)

            if data.get("field") and data.get("field") != "":
                conditions.append("rf.field LIKE %s")
                values.append("%" + str(data.get("field")) + "%",)

            if data.get("researchtitle") and data.get("researchtitle") != "":
                conditions.append("r.researchtitle LIKE %s")
                values.append("%" + str(data.get("researchtitle")) + "%",)

            if data.get("researchername") and data.get("researchername") != "":
                conditions.append("f.name LIKE %s")
                values.append("%" + str(data.get("researchername")) + "%")
                
            print(conditions)
            print(values)
            
            if conditions:
                query += " and " + " and ".join(conditions)
                
            query += " group by onr.researchid, r.title, f.name"
                
            cursor.execute(query, values)

            columns = [column[0] for column in cursor.description]
            result = [dict(zip(columns, row)) for row in cursor.fetchall()]
            print(result)
            return jsonify(result)
        
        except mysql.connector.Error as e:
            print(f"Error{e}")
            return jsonify({"error": "bruh"})
        
        finally:
            cursor.close()
            connection.close()
        
    @app.route('/api/enrolledcoursedetails', methods = ['POST'])
    @cross_origin(origin=host_url, headers=['Content-Type', 'Authorization'])
    def enrolled_course_details():
        data = request.get_json()
        
        try:
            connection = get_db_connection()

            cursor = connection.cursor()
            
            # reference for "coalesce" used to replace null values with 0: https://365datascience.com/question/sum-for-columns-with-null-values/
            # reference for not duplicating rows for multivalued attribute field using group_concat: https://stackoverflow.com/questions/12095450/how-to-put-a-multivalued-attribute-in-one-column-in-a-query 
            query = "select sc.courseno, c.coursename, c.description, group_concat(cf.field separator ', ') as fields, (sum(coalesce(sa.grade, 0) * a.weight) + sum(coalesce(se.grade, 0) * e.weight)) as currentgrade from COURSE as c, STUDENT_ENROLLEDIN_COURSE as sc, STUDENT_DOES_ASSIGNMENT as sa, STUDENT_TAKES_EXAM as se, ASSIGNMENT as a, EXAM as e, COURSE_FIELDS as cf where sc.s_ucid = %s and sc.courseno = %s and sc.courseno = c.courseno and sa.courseno = c.courseno and se.courseno = c.courseno and a.courseno = c.courseno and sa.assignmentno = a.assignmentno and e.courseno = c.courseno and se.examno = e.examno and cf.courseno = c.courseno group by sc.courseno, c.coursename, c.description"
            values = (data.get("ucid"), data.get("courseno"))
            cursor.execute(query, values)

            
            columns = [column[0] for column in cursor.description]
            result = [dict(zip(columns, row)) for row in cursor.fetchall()]
            print("COURSE")
            print(result)

            return jsonify(result)
            
        except mysql.connector.Error as e:
                print(f"Error: {e}")

                return "False"
        finally:
            cursor.close()
            connection.close()
    
    @app.route('/api/enrolledlecturedetails', methods = ['POST'])
    @cross_origin(origin=host_url, headers=['Content-Type', 'Authorization'])
    def enrolled_lecture_details():
        data = request.get_json()
        
        try:
            connection = get_db_connection()

            cursor = connection.cursor()

            query = "select sl.lectureno, l.time, l.location, f.name, f.f_ucid from STUDENT_ENROLLEDIN_LECTURE as sl, LECTURE as l, FACULTY as f where sl.s_ucid = %s and sl.courseno = %s and sl.courseno = l.courseno and sl.lectureno = l.lectureno and l.i_ucid = f.f_ucid"
            values = (data.get("ucid"), data.get("courseno"))
            print("lec")
            print(values)
            cursor.execute(query, values)

            columns = [column[0] for column in cursor.description]
            result = [dict(zip(columns, row)) for row in cursor.fetchall()]
            print(result)
            return jsonify(result)
            
        except mysql.connector.Error as e:
                print(f"Error: {e}")
                return jsonify({"error": "bruh"})

        finally:
            cursor.close()
            connection.close()
            
    @app.route('/api/enrolledtutorialdetails', methods = ['POST'])
    @cross_origin(origin=host_url, headers=['Content-Type', 'Authorization'])
    def enrolled_tutorial_details():
        data = request.get_json()
        
        try:
            connection = get_db_connection()

            cursor = connection.cursor()

            query = "select st.tutorialno, t.time, t.location, f.name, f.f_ucid from STUDENT_ENROLLEDIN_TUTORIAL as st, TUTORIAL as t, FACULTY as f where st.s_ucid = %s and st.courseno = %s and st.courseno = t.courseno and st.tutorialno = t.tutorialno and t.t_ucid = f.f_ucid"
            values = (data.get("ucid"), data.get("courseno"))
            print("tut")
            print(values)
            cursor.execute(query, values)

            columns = [column[0] for column in cursor.description]
            result = [dict(zip(columns, row)) for row in cursor.fetchall()]
            print(result)
            return jsonify(result)
            
        except mysql.connector.Error as e:
                print(f"Error: {e}")
                return jsonify({"error": "bruh"})

        finally:
            cursor.close()
            connection.close()
            
    @app.route('/api/enrolledassignmentdetails', methods = ['POST'])
    @cross_origin(origin=host_url, headers=['Content-Type', 'Authorization'])
    def enrolled_assignment_details():
        data = request.get_json()
        
        try:
            connection = get_db_connection()

            cursor = connection.cursor()

            query = "select sa.assignmentno, a.deadline, a.weight, sa.grade from STUDENT_DOES_ASSIGNMENT as sa, ASSIGNMENT as a where sa.s_ucid = %s and sa.courseno = %s and sa.courseno = a.courseno"
            values = (data.get("ucid"), data.get("courseno"))
            print("assignment")
            print(values)
            cursor.execute(query, values)

            columns = [column[0] for column in cursor.description]
            result = [dict(zip(columns, row)) for row in cursor.fetchall()]
            print(result)
            return jsonify(result)
            
        except mysql.connector.Error as e:
                print(f"Error: {e}")
                return jsonify({"error": "bruh"})

        finally:
            cursor.close()
            connection.close()
            
    @app.route('/api/enrolledexamdetails', methods = ['POST'])
    @cross_origin(origin=host_url, headers=['Content-Type', 'Authorization'])
    def enrolled_exam_details():
        data = request.get_json()
        
        try:
            connection = get_db_connection()

            cursor = connection.cursor()

            query = "select se.examno, e.time, e.location, e.weight, se.grade from STUDENT_TAKES_EXAM as se, EXAM as e where se.s_ucid = %s and se.courseno = %s and se.courseno = e.courseno"
            values = (data.get("ucid"), data.get("courseno"))
            print("exam")
            print(values)
            cursor.execute(query, values)

            columns = [column[0] for column in cursor.description]
            result = [dict(zip(columns, row)) for row in cursor.fetchall()]
            print(result)
            return jsonify(result)
            
        except mysql.connector.Error as e:
                print(f"Error: {e}")
                return jsonify({"error": "bruh"})

        finally:
            cursor.close()
            connection.close()

    @app.route('/api/facultyimage', methods = ['POST'])
    @cross_origin(origin=host_url, headers=['Content-Type', 'Authorization'])
    def faculty_image():
        data = request.get_json()
        
        try:
            connection = get_db_connection()

            cursor = connection.cursor()

            query = "select f.image from FACULTY as f where f.f_ucid = %s"
            values = (data.get("fucid"),)
            print("facultyimage")
            print(values)
            cursor.execute(query, values)

            columns = [column[0] for column in cursor.description]
            result = [dict(zip(columns, row)) for row in cursor.fetchall()]
            print(result)
            return jsonify(result)
            
        except mysql.connector.Error as e:
                print(f"Error: {e}")
                return jsonify({"error": "bruh"})

        finally:
            cursor.close()
            connection.close()
            
    @app.route('/api/coursedetails', methods = ['POST'])
    @cross_origin(origin=host_url, headers=['Content-Type', 'Authorization'])
    def course_details():
        data = request.get_json()
        
        try:
            connection = get_db_connection()

            cursor = connection.cursor()

            query = "SELECT c.courseno, c.coursename, c.semester, group_concat(distinct cf.field separator ', ') as fields, c.description, group_concat(distinct cp.prereq separator ', ') as prerequisites from COURSE as c, COURSE_FIELDS as cf, COURSE_PREREQS as cp where c.courseno = %s and cf.courseno = c.courseno and cp.courseno = c.courseno group by c.courseno, c.coursename, c.semester, c.description"
            values = (data.get("courseno"),)
            print("coursed")
            print(values)
            cursor.execute(query, values)

            columns = [column[0] for column in cursor.description]
            result = [dict(zip(columns, row)) for row in cursor.fetchall()]
            print(result)

            return jsonify(result)
        
        except mysql.connector.Error as e:
            print(f"Error{e}")
        
        finally:
            cursor.close()
            connection.close()
            
    @app.route('/api/lecturedetails', methods = ['POST'])
    @cross_origin(origin=host_url, headers=['Content-Type', 'Authorization'])
    def lecture_details():
        data = request.get_json()
        
        try:
            connection = get_db_connection()

            cursor = connection.cursor()

            query = "SELECT l.lectureno, l.location, l.time, l.i_ucid, f.name from COURSE as c, LECTURE as l, FACULTY as f where c.courseno = %s and l.courseno = c.courseno and l.i_ucid = f.f_ucid"
            values = (data.get("courseno"),)
            print(values)
            cursor.execute(query, values)

            columns = [column[0] for column in cursor.description]
            result = [dict(zip(columns, row)) for row in cursor.fetchall()]
            print(result)

            return jsonify(result)
        
        except mysql.connector.Error as e:
            print(f"Error{e}")
        
        finally:
            cursor.close()
            connection.close()
            
    @app.route('/api/tutorialdetails', methods = ['POST'])
    @cross_origin(origin=host_url, headers=['Content-Type', 'Authorization'])
    def tutorial_details():
        data = request.get_json()
        
        try:
            connection = get_db_connection()

            cursor = connection.cursor()

            query = "SELECT t.tutorialno, t.location, t.time, t.t_ucid, f.name from COURSE as c, TUTORIAL as t, FACULTY as f where c.courseno = %s and t.courseno = c.courseno and t.t_ucid = f.f_ucid"
            values = (data.get("courseno"),)
            print(values)
            cursor.execute(query, values)

            columns = [column[0] for column in cursor.description]
            result = [dict(zip(columns, row)) for row in cursor.fetchall()]
            print(result)

            return jsonify(result)
        
        except mysql.connector.Error as e:
            print(f"Error{e}")
        
        finally:
            cursor.close()
            connection.close()
            
    @app.route('/api/updateassignment', methods = ['POST'])
    @cross_origin(origin=host_url, headers=['Content-Type', 'Authorization'])
    def update_assignment():
        data = request.get_json()
        print(data)
        
        try:
            connection = get_db_connection()

            cursor = connection.cursor()

            query = "update student_does_assignment set grade = %s where s_ucid = %s and courseno = %s and assignmentno = %s"
            values = (data.get("grade"), data.get("ucid"), data.get("courseno"), data.get("assNo"))
            print(values)
            cursor.execute(query, values)
            
            connection.commit()
            

            return "True"

        except mysql.connector.Error as e:
            print(f"Error{e}")
            return "False"
        
        finally:
            cursor.close()
            connection.close()

    @app.route('/api/updateexam', methods = ['POST'])
    @cross_origin(origin=host_url, headers=['Content-Type', 'Authorization'])
    def update_exam():
        data = request.get_json()
        print(data)
        
        try:
            connection = get_db_connection()

            cursor = connection.cursor()

            query = "update student_takes_exam set grade = %s where s_ucid = %s and courseno = %s and examno = %s"
            values = (data.get("grade"), data.get("ucid"), data.get("courseno"), data.get("examNo"))
            print(values)
            cursor.execute(query, values)
            
            connection.commit()
            

            return "True"

        except mysql.connector.Error as e:
            print(f"Error{e}")
            return "False"
        
        finally:
            cursor.close()
            connection.close()
            
    @app.route('/api/addtocourse', methods = ['POST'])
    @cross_origin(origin=host_url, headers=['Content-Type', 'Authorization'])
    def add_to_course():
        
        data = request.get_json()
        
        try:
            connection = get_db_connection()

            cursor = connection.cursor()

            query = "insert into STUDENT_ENROLLEDIN_COURSE values (%s, %s, %s)"
            
            values = (data.get('ucid'), data.get('courseno'), data.get('aucid'))
            cursor.execute(query, values)
            
            connection.commit()
            
            query2 = "insert into STUDENT_ENROLLEDIN_LECTURE values (%s, %s, %s, %s)"
            values2 = (data.get('ucid'), data.get('courseno'), data.get('lecno'), data.get('aucid'))
            cursor.execute(query, values)
            
            connection.commit()
            
            query2 = "insert into STUDENT_ENROLLEDIN_TUTORIAL values (%s, %s, %s, %s)"
            values2 = (data.get('ucid'), data.get('courseno'), data.get('tutno'), data.get('aucid'))
            cursor.execute(query, values)
            
            connection.commit()
            
            return "True"
        
        except mysql.connector.Error as e:
                print(f"Error: {e}")

                return "False"
        finally:
            cursor.close()
            connection.close() 
            
    @app.route('/api/courselist', methods = ['GET'])
    @cross_origin(origin=host_url, headers=['Content-Type', 'Authorization'])
    def course_list():
        
        
        try:
            connection = get_db_connection()

            cursor = connection.cursor()

            query = "SELECT c.courseno, c.coursename, c.description, c.semester, group_concat(distinct cf.field separator ', ') as fields, group_concat(distinct cp.prereq separator ', ') as prerequisites from COURSE as c, COURSE_FIELDS as cf, COURSE_PREREQS as cp where cf.courseno = c.courseno and cp.courseno = c.courseno group by c.courseno, c.coursename, c.description, c.semester"
            cursor.execute(query)

            columns = [column[0] for column in cursor.description]
            result = [dict(zip(columns, row)) for row in cursor.fetchall()]
            print(result)

            return jsonify(result)
        
        except mysql.connector.Error as e:
            print(f"Error{e}")
        
        finally:
            cursor.close()
            connection.close()
            
    @app.route('/api/addcourse', methods = ['POST'])
    @cross_origin(origin=host_url, headers=['Content-Type', 'Authorization'])
    def add_course():
        
        data = request.get_json()
        print(data)
        try:
            connection = get_db_connection()

            cursor = connection.cursor()

            query = "insert into COURSE values (%s, %s, %s, %s, %s)"
            
            values = (data.get('courseNumber'), data.get('courseName'), data.get('nextSemesterOffered'), data.get('aucid'), data.get('courseDescription'),)
            print(values)
            cursor.execute(query, values)
            
            fields = data.get("courseFields").split(', ')
            print(fields)
            
            for field in fields:
                query2 = "insert into COURSE_FIELDS values (%s, %s, %s)"
                values2 = (data.get('courseNumber'), field, data.get("aucid"))
                cursor.execute(query2, values2)
            
            prereqs = data.get("coursePrerequisites").split(', ')
            print(prereqs)
            
            for prereq in prereqs:
                query3 = "insert into COURSE_PREREQS values (%s, %s, %s)"
                values3 = (data.get('courseNumber'), prereq, data.get("aucid"))
                cursor.execute(query3, values3)
                           
            connection.commit()
            
            return "True"
        
        except mysql.connector.Error as e:
                print(f"Error: {e}")

                return "False"
        finally:
            cursor.close()
            connection.close()
            
    @app.route('/api/pastresearchlist', methods = ['GET'])
    @cross_origin(origin=host_url, headers=['Content-Type', 'Authorization'])
    def past_research_list():
        
        
        try:
            connection = get_db_connection()

            cursor = connection.cursor()

            query = "SELECT cr.researchid, r.title, r.description, cr.datecompleted, group_concat(rf.field separator ', ') as fields from COMPLETED_RESEARCH as cr, RESEARCH as r, RESEARCH_FIELDS as rf where cr.researchid = r.researchid and rf.researchid = r.researchid group by cr.researchid, r.title, r.description, cr.datecompleted"
            cursor.execute(query)

            columns = [column[0] for column in cursor.description]
            result = [dict(zip(columns, row)) for row in cursor.fetchall()]
            print(result)

            return jsonify(result)
        
        except mysql.connector.Error as e:
            print(f"Error{e}")
        
        finally:
            cursor.close()
            connection.close()
            
    @app.route('/api/addpastresearch', methods = ['POST'])
    @cross_origin(origin=host_url, headers=['Content-Type', 'Authorization'])
    def add_past_research():
        
        data = request.get_json()
        print(data)
        try:
            connection = get_db_connection()

            cursor = connection.cursor()

            query = "insert into RESEARCH values (%s, %s, %s, %s)"
            
            values = (data.get('ResearchID'), data.get('Title'), data.get('Description'), data.get('aucid'))
            print(values)
            cursor.execute(query, values)
            
            fields = data.get("ResearchFields").split(', ')
            print(fields)
            
            for field in fields:
                query2 = "insert into RESEARCH_FIELDS values (%s, %s, %s)"
                values2 = (data.get('ResearchID'), field, data.get("aucid"))
                cursor.execute(query2, values2)
            
            query3 = "insert into COMPLETED_RESEARCH values (%s, %s)"
            values3 = (data.get("ResearchID"), data.get("DateCompleted"))
            cursor.execute(query3, values3)
                           
            connection.commit()
            
            return "True"
        
        except mysql.connector.Error as e:
                print(f"Error: {e}")

                return "False"
        finally:
            cursor.close()
            connection.close()
            
    @app.route('/api/currentresearchlist', methods = ['GET'])
    @cross_origin(origin=host_url, headers=['Content-Type', 'Authorization'])
    def current_research_list():
        
        
        try:
            connection = get_db_connection()

            cursor = connection.cursor()

            query = "SELECT onr.researchid, r.title, r.description, group_concat(rf.field separator ', ') as fields from ONGOING_RESEARCH as onr, RESEARCH as r, RESEARCH_FIELDS as rf where onr.researchid = r.researchid and rf.researchid = r.researchid group by onr.researchid, r.title, r.description"
            cursor.execute(query)

            columns = [column[0] for column in cursor.description]
            result = [dict(zip(columns, row)) for row in cursor.fetchall()]
            print(result)

            return jsonify(result)
        
        except mysql.connector.Error as e:
            print(f"Error{e}")
        
        finally:
            cursor.close()
            connection.close()
            
    @app.route('/api/addcurrentresearch', methods = ['POST'])
    @cross_origin(origin=host_url, headers=['Content-Type', 'Authorization'])
    def add_current_research():
        
        data = request.get_json()
        print(data)
        try:
            connection = get_db_connection()

            cursor = connection.cursor()

            query = "insert into RESEARCH values (%s, %s, %s, %s)"
            
            values = (data.get('ResearchID'), data.get('Title'), data.get('Description'), data.get('aucid'))
            print(values)
            cursor.execute(query, values)
            
            fields = data.get("ResearchFields").split(', ')
            print(fields)
            
            for field in fields:
                query2 = "insert into RESEARCH_FIELDS values (%s, %s, %s)"
                values2 = (data.get('ResearchID'), field, data.get("aucid"))
                cursor.execute(query2, values2)
            
            query3 = "insert into ONGOING_RESEARCH values (%s)"
            values3 = (data.get("ResearchID"),)
            cursor.execute(query3, values3)
                           
            connection.commit()
            
            return "True"
        
        except mysql.connector.Error as e:
                print(f"Error: {e}")

                return "False"
        finally:
            cursor.close()
            connection.close()
            
    @app.route('/api/addtoresearch', methods = ['POST'])
    @cross_origin(origin=host_url, headers=['Content-Type', 'Authorization'])
    def add_to_research():
        
        data = request.get_json()
        print(data)
        
        try:
            connection = get_db_connection()

            cursor = connection.cursor()
            
            today = datetime.now()

            query = "insert into STUDENT_PARTICIPATESIN_RESEARCH values (%s, %s, %s)"
            
            values = (data.get('ucid'), data.get('rid'), today)
            print(values)
            cursor.execute(query, values)
            
            connection.commit()
            
            return "True"
        
        except mysql.connector.Error as e:
                print(f"Error: {e}")

                return "False"
        finally:
            cursor.close()
            connection.close() 