import os
import logging
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
from dotenv import load_dotenv
from functions import img_predict, get_diseases_classes, get_crop_recommendation, get_fertilizer_recommendation
from custom_json_encoder import CustomJSONEncoder

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)

app = Flask(__name__)
CORS(app)
app.json_encoder = CustomJSONEncoder
app.config['UPLOAD_FOLDER'] = os.getenv('UPLOAD_FOLDER', 'uploads')
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # Limit file size to 16MB

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
    app.run(port=os.getenv('PORT', 5001), debug=os.getenv('DEBUG', True))
