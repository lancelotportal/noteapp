from flask import Flask,request
import sqlite3
import uuid

DATABASE = "C:/Users/porta/Desktop/note_app/backend/database/notes.db"

app = Flask(__name__)

@app.route('/programming_languages', methods=['GET'])
def list_programming_languages():
     return {"programming_languages":list(in_memory_datastore.values())}

def get_db():
    return sqlite3.connect(DATABASE)


#conn = get_db()
#conn.execute('CREATE TABLE notes (id INTEGER, title TEXT, body TEXT, lastModified TEXT)')

@app.route('/add_notes', methods=['GET'])
def add_notes():
    try:
        id = request.args.get("id")
        title = request.args.get("title")
        body = request.args.get("body")
        lastModified = request.args.get("lastModified")

        print("OK1")

        con = get_db()

        print("OK2")

        cursor = con.cursor()

        print("okFDP")

        cursor.execute("INSERT INTO notes (id,title,body,lastModified) VALUES (?,?,?,?)"
        , (id,title,body,lastModified))

        print("OK3")

        con.commit()

        print("OK4")
        msg = "Note successfully added to the database"
    except:
        con.rollback()
        msg = "Error : try again"

    finally:
        con.close()
        return {"Message from API": msg}

@app.route('/list_notes', methods=['GET'])
def list_notes():

    try:
        con = get_db()
        con.row_factory = sqlite3.Row

        cursor = con.cursor()
        cursor.execute("SELECT * FROM notes")

        rows = cursor.fetchall()

        print(rows)

        msg = "Successfully read all notes"

    except:
        con.rollback()
        msg = "Error listing notes"
    finally:
        result = [[],[],[],[]]
        for row in rows:
            result[0].append(row["id"])
            result[1].append(row["title"])
            result[2].append(row["body"])
            result[3].append(row["lastModified"])

        return {"Message": msg, "id":result[0], "title":result[1], "body":result[2],         "lastModified":result[3]}
        con.close()

if __name__ == '__main__':
    app.run()