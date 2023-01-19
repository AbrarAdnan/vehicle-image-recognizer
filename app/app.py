from fastai.vision.all import *
import gradio as gr

# import pathlib
# temp = pathlib.PosixPath
# pathlib.PosixPath = pathlib.WindowsPath

vehicle_labels = (
    'ATV',
    'Airplane',
    'Ambulance',
    'Armored Tank',
    'Autorickshaw',
    'Bicycle',
    'Boat',
    'Buggy',
    'Bulldozer',
    'Cargo Ship',
    'Cargo Truck',
    'Crane',
    'Excavator',
    'Ferry',
    'Helicopter',
    'Hot Air Baloon',
    'Microbus',
    'Monster Truck',
    'Motorcycle',
    'Multi Purpose Vehicle',
    'Ocean Liner',
    'Police Car',
    'Private Car',
    'Rickshaw',
    'SUV',
    'Sail Boat',
    'Semi Truck',
    'Sports Car',
    'Steam Roller',
    'Train',
    'Transport Bus',
    'Truck',
    'Yacht'
)

model = load_learner('vehicle-recognizer-v2.pkl')

def recognize_image(image):
    pred, idx, probs = model.predict(image)
    return dict(zip(vehicle_labels, map(float, probs)))

image = gr.inputs.Image(shape=(192,192))
label = gr.outputs.Label(num_top_classes=5)
examples = [
    'image1.jpg',
    'image2.jpg',
    'image3.jpg',
    'image4.jpg'
    ]

iface = gr.Interface(fn=recognize_image, inputs=image, outputs=label, examples=examples)
iface.launch(inline=False)