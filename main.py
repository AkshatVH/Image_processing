from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from transformers import ViTFeatureExtractor, ViTForImageClassification
from PIL import Image
import traceback

app = Flask(__name__)
# Enable CORS with specific origins
CORS(app, resources={
    r"/predict": {
        "origins": ["http://localhost:5173", "http://localhost:4173"],
        "methods": ["POST"],
        "allow_headers": ["Content-Type"]
    }
})

# Ensure uploads directory exists
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

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
        confidence = float(logits.softmax(dim=-1).max().item())
        
        return {
            'label': model.config.id2label[predicted_class_idx],
            'confidence': round(confidence * 100, 2)  # Convert to percentage
        }
    except Exception as e:
        print(f"Prediction error: {str(e)}")
        print(traceback.format_exc())
        raise

@app.route('/predict', methods=['POST'])
def predict_route():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file uploaded'}), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400

        # Check file extension
        allowed_extensions = {'.jpg', '.jpeg', '.png', '.gif'}
        file_ext = os.path.splitext(file.filename)[1].lower()
        if file_ext not in allowed_extensions:
            return jsonify({'error': 'Invalid file type. Please upload an image.'}), 400

        try:
            # Save file with secure filename
            filename = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
            file.save(filename)
            
            # Get prediction
            result = predict(filename)
            
            return jsonify(result)
        finally:
            # Clean up - remove the uploaded file
            if os.path.exists(filename):
                os.remove(filename)
            
    except Exception as e:
        print(f"Error processing request: {str(e)}")
        print(traceback.format_exc())
        return jsonify({'error': 'Failed to process image'}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)