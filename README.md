# vehicle-image-recognizer

An image classification model from data collection, cleaning, model training, deployment and API integration. <br/>
The model can classify 33 different types of vehicles <br/>
The types are following: <br/>

1.   ATV
2.   Airplane
3.   Ambulance
4.   Armored Tank
5.   Autorickshaw
6.   Bicycle
7.   Boat
8.   Buggy
9.   Bulldozer
10.  Cargo Ship
11.  Cargo Truck
12.  Crane
13.  Excavator
14.  Ferry
15.  Helicopter
16.  Hot Air Baloon
17.  Microbus
18.  Monster Truck
19.  Motorcycle
20.  Multi Purpose Vehicle
21.  Ocean Liner
22.  Police Car
23.  Private Car
24.  Rickshaw
25.  SUV
26.  Sail Boat
27.  Semi Truck
28.  Sports Car
29.  Steam Roller
30.  Train
31.  Transport Bus
32.  Truck
33.  Yacht

# Dataset Preparation
**Data Collection:** Downloaded from DuckDuckGo using exact term name and other related terms to get more varient data<br/>
**DataLoader:** Used fastai DataBlock API to set up the DataLoader. <br/>
**Data Augmentation:** fastai provides default data augmentation which operates in GPU. <br/>
Details can be found in `notebooks/data_prep.ipynb`

# Training and Data Cleaning
**Training:** Fine-tuned a resnet34 model for 5 epochs (1 time) and got upto ~90% accuracy. <br/>
**Data Cleaning:** This part took the highest time. Since I collected data from browser, there were many noises. Also, there were images that contained. I cleaned and updated data using fastai ImageClassifierCleaner. I cleaned the data each time after training or finetuning, except for the last time which was the final iteration of the model. <br/>

# Model Deployment
I deployed to model to HuggingFace Spaces Gradio App. The implementation can be found in `deployment` folder or [here](https://huggingface.co/spaces/abrar-adnan/vehicle-recognizer). <br/>
<img src = "deployment/gradio_app.png" width="700" height="350">

# API integration with GitHub Pages
The deployed model API is integrated [here](msi1427.github.io/Cap-Recognizer/) in GitHub Pages Website. Implementation and other details can be found in `docs` folder.
