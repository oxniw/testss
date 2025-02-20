from flask import Flask,jsonify,request
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
#import os
#base_dir = os.getcwd()
#env = os.path.join(base_dir, 'backend','database', 'key.env')
#load_dotenv(env)
#
from pymongo.server_api import ServerApi
#uri = os.getenv("URL")
client = MongoClient("mongodb+srv://oo6139116:830S2fDSdoPPRVqT@cluster0.usbw7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", server_api=ServerApi('1'))
db = client["myfirst"]
usersdata = db["usersdatatest"]
usersnameandpassword = db["usersnameandpasswordtest"]
usersname = db["usersnametest"]
userandwin = db["userandwintest"]

startdat={
        "sources": {
            "money": 100,
            "win":0,
            "winstreak":0}
}
app = Flask(__name__)
CORS(app, origins="*")

def checkpassword(password:str,storewhy):
    c=True
    #if len(password)<8 or len(password)>20:
    #    storewhy.append("password must be at least 8 characters")
    #    c=False
    #if not any(char in "1234567890" for char in password):
    #    storewhy.append("password must have number at least 1 character")
    #    c=False
    #if not any(char.isupper() for char in password):
    #    storewhy.append("password must uppercase 1 character")
    #    c=False
    #if not any(char.islower() for char in password):
    #    storewhy.append("password must lowercase 1 character")
    #    c=False
    #if not any(char in "!@#$%^&*()-_=+[{]};:,<.>/?~`" for char in password):
    #    storewhy.append("password must have special character at least 1 character")
    #    c=False
    return c,storewhy
def checkusername(username:str,storewhy:any):
    d = None
    if len(username.split(" ")) <= 1:
        d = True
        return d,storewhy
    else:
        d = False
        storewhy.append("username must not have space")
        return d,storewhy
def exits(username:str,storewhy:any):
    d = None
    if usersname.find_one({"username": username}) is None:
        d = True
        return d,storewhy
    else:
        d = False
        storewhy.append("username already exists")
        return d,storewhy
@app.route("/api/v1",methods=["GET", "POST"])
def signin():
    if request.method == "POST":
        data = request.json
        myusername = data["username"]
        mypassword = data["password"]
        storewhy = []
        ok,storewhy = checkpassword(myusername,storewhy)
        oks,storewhy = checkusername(myusername,storewhy)
        okss,storewhy = exits(myusername,storewhy)
        if okss and ok and oks:
            userandwin.insert_one({"win":{myusername:0,"c":"c","username":myusername}})
            usersname.insert_one({"username": myusername})
            usersnameandpassword.insert_one({myusername:mypassword})
            usersdata.insert_one({myusername:startdat})
            return jsonify({"message":"ok", "data":usersdata.find_one({myusername:{"$exists":True}})[myusername],"name":f"{myusername}"})
        else:
            if not oks or not ok or not okss:
                return jsonify({"message":"notok","why":storewhy})
@app.route("/api/v2",methods=["GET", "POST"])
def login():
    if request.method == "POST":
        data = request.json
        myusername = data["username"]
        mypassword = data["password"]
        checkusername = None
        checkusername = usersname.find_one({"username": myusername})
        if checkusername is not None:
            checkpassword = None
            checkpassword = usersnameandpassword.find_one({myusername:mypassword})
            if checkpassword is not None:
                return jsonify({"message":"ok","data":usersdata.find_one({myusername:{"$exists":True}})[myusername],"name":f"{myusername}"})
            else:
                return jsonify({"message":"notok","why":"password incorrect or username incorrect"})
        else:
            return jsonify({"message":"notok","why":"username incorrect"})
@app.route("/api/v3",methods=["GET", "POST"])
def re():
    if request.method == "POST":
        data = request.json
        myusername = data["username"]
        checkusername = None
        checkusername = usersname.find_one({"username": myusername})
        if checkusername is not None:
            userdata = usersdata.find_one({myusername:{"$exists":True}})[myusername]
            return jsonify({"data":userdata,"message":"ok","name":myusername})
        else:
            return jsonify({"message":"notok"})
@app.route("/api/v4",methods=["GET", "POST"])
def resetGame():
    if request.method == "POST":
        data = request.json
        myusername = data["username"]
        score = data["score"]
        checkusername = None
        checkusername = usersname.find_one({"username": myusername})
        if checkusername is not None:
            userdata = usersdata.find_one({myusername:{"$exists":True}})[myusername]
            sources = userdata["sources"]
            sources["money"] = 100
            sources["win"] += score
            filter_condition = {f"{myusername}.sources.money": int(100)}
            update_query = {"$set": {f"{myusername}.sources.win": int(sources["win"])}}
            update_query1 = {"$set": {f"win.{myusername}": int(sources["win"])}}
            filter_condition1 = {f"win.username": f"{myusername}"}
            usersdata.update_one(filter_condition, update_query)
            userandwin.update_one(filter_condition1,update_query1)
            if True:
                oldscore = sources["winstreak"]
                if score > oldscore:
                    update_query1 = {"$set": {f"{myusername}.sources.winstreak": int(score)}}
                    usersdata.update_one(filter_condition, update_query1)
            return jsonify({"message":"ok"})
@app.route("/api/v5",methods=["GET", "POST"])
def leaderboard():
    if request.method == "POST":
        d = []
        for i in userandwin.find():
            s = [i["win"]["username"],i["win"][i["win"]["username"]]]
            d.append(s)
        d.sort(key=lambda x: x[1], reverse=True)
        d = [[rank + 1, name, score] for rank, (name, score) in enumerate(d)]
        return jsonify({"leader":d})
@app.route("/")  # Root route
def home():
    return "Flask App is Running!", 200

if __name__ == "__main__":
    app.run()

if __name__ == "__main__":
    #app.run(debug=True,port=8080,host='0.0.0.0')
    app.run(debug=True)