from flask import Flask, request, jsonify, redirect,render_template
from flask_cors import CORS
from search_engine import searche

app = Flask(_name_)
CORS(app, resources={r"/": {"origins":""}})

@app.route('/')
def get():
    return render_template('index.html')

@app.route('/process_data', methods=['POST'])
def process_data():
    if request.method == 'POST':
        data = request.get_json()
        result = {"message": "Data received successfully", "data": data}
        print(result['data'])
        return jsonify({"message": "vanthruchu mapla"})
@app.route('/getuser',methods = ['POST'])
def user():
    if request.method == 'POST':
        d = request.get_json()
        res = {"message": "Data received successfully", "data": d}
        print(res['data'])
        b = res['data']
        print("welcome to the page "+b['name']+" "+b['email'])
        return jsonify({"message": "welcome to the page "+ b['name'] })

@app.route('/getdoctor',methods = ['POST'])
def doc():
    if request.method == 'POST':
        D = request.get_json()
        res = D
        result = searche(res['name'])
        return jsonify({"message": result})
        


if _name_ == '_main_':
    app.run(debug=True)
    