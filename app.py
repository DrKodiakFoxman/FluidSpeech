from flask import Flask, request, send_file, render_template
from TTS.api import TTS
import uuid
import os

app = Flask(__name__)

tts = TTS(model_name="tts_models/en/ljspeech/tacotron2-DDC", progress_bar=False, gpu=False)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/synthesize", methods=["POST"])
def synthesize():
    text = request.json.get("text")
    if not text:
        return {"error": "No text provided"}, 400

    filename = f"output_{uuid.uuid4().hex}.wav"
    tts.tts_to_file(text=text, file_path=filename)

    return send_file(filename, as_attachment=True, download_name="tts_output.wav")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
