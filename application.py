from flask import Flask,render_template,request
import pandas as pd
import pickle


app = Flask(__name__)

cars = pd.read_csv('Cleaned cars.csv')
modelLR = pickle.load(open('LinearRegressionModel.pkl' , 'rb'))

@app.route('/')
def index():
    name = sorted(cars['name'].unique())
    company = sorted(cars['company'].unique())
    year = sorted(cars['year'].unique() , reverse=True)
    fuel_type =  sorted(cars['fuel_type'].unique())
    return render_template('index.html' , model = name , brand = company , year = year , fuel_type = fuel_type)

@app.route('/predict' , methods = ['POST'])

def predict():

    company = request.form.get('company')
    model = request.form.get('model')
    kms_driven = request.form.get('kms_driven')
    year = request.form.get('year')
    fuel_type = request.form.get('fuel_type')
    print(company , model , kms_driven , fuel_type , year)

    prediction = modelLR.predict(pd.DataFrame([[model,company,year,kms_driven,fuel_type]] , columns=['name','company' , 'year' , 'kms_driven' , 'fuel_type']))
    return str(round(prediction[0],2))
if __name__ == '__main__':
    app.run(debug=True)
