from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from transformers import ViTFeatureExtractor, ViTForImageClassification
from PIL import Image

app = Flask(__name__)
# Enable CORS for all routes
CORS(app)

# Ensure uploads directory exists
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

model_name = "google/vit-base-patch16-224"
feature_extractor = ViTFeatureExtractor.from_pretrained(model_name)
model = ViTForImageClassification.from_pretrained(model_name)

def predict(image_path):
    try:
        image = Image.open(image_path)
        inputs = feature_extractor(images=image, return_tensors='pt')
        outputs = model(**inputs)
        logits = outputs.logits
        predicted_class_idx = logits.argmax(-1).item()
        return {
            'label': model.config.id2label[predicted_class_idx],
            'confidence': float(logits.softmax(dim=-1).max().item())
        }
    except Exception as e:
        print(f"Prediction error: {str(e)}")
        raise

@app.route('/predict', methods=['POST'])
def predict_route():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file part'}), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400

        if file:
            # Create a secure filename and save the file
            filename = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
            file.save(filename)
            
            # Get prediction
            result = predict(filename)
            
            # Clean up - remove the uploaded file
            os.remove(filename)
            
            return jsonify(result)
            
    except Exception as e:
        print(f"Error processing request: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy'}), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)