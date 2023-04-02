from flask import Flask, render_template, request
import requests
app = Flask(__name__,static_url_path='/static')

@app.route('/',methods=['GET','POST'])
def index():
    if request.method == 'POST':
        input_image = request.files['image']
        print("python image")
        output = predict_genres(input_image)
        print(output)
        return render_template('index.html')
    else:
        return render_template('index.html') 

def predict_genres(input_image):
    response = requests.post("https://abrar-adnan-vehicle-recognizer.hf.space/run/predict", json={
    "data": [
    {
    "data": input_image
    }
    ]
    }).json()

    data = response["data"]
    return data


if __name__ == '__main__':
    app.run(debug=True)