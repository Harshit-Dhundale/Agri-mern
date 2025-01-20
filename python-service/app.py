from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import os
from functions import img_predict, get_diseases_classes, get_crop_recommendation, get_fertilizer_recommendation
from custom_json_encoder import CustomJSONEncoder  # Import the custom encoder

app = Flask(__name__)
app.json_encoder = CustomJSONEncoder  # Set the custom encoder to handle JSON serialization
app.config['UPLOAD_FOLDER'] = 'uploads'

@app.route('/predict_crop', methods=['POST'])
def predict_crop():
    data = request.get_json()
    predictions = get_crop_recommendation(data['features'])
    return jsonify(predictions)

@app.route('/predict_fertilizer', methods=['POST'])
def predict_fertilizer():
    data = request.get_json()
    predictions = get_fertilizer_recommendation(data['num_features'], data['cat_features'])
    return jsonify(predictions)

@app.route('/predict_disease', methods=['POST'])
def predict_disease():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    crop = request.form['crop']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file:
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        prediction = img_predict(file_path, crop)
        result = get_diseases_classes(crop, prediction)
        return jsonify({'prediction': result})

if __name__ == '__main__':
    app.run(port=5001, debug=True)
