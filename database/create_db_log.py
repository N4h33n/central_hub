import mysql.connector

connection = mysql.connector.connect(
    host= 'localhost',
    user='root',
    passwd='password'
)

cursor = connection.cursor()

cursor.execute("create database centralhub")

#check database was created
cursor.execute("show databases")
for db in cursor:
    print(db)