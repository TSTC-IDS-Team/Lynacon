import os
from fastapi import FastAPI, Form
from fastapi.responses import FileResponse
from TTS.api import TTS
import uuid
from fastapi.middleware.cors import CORSMiddleware

# Fix espeak not being found
os.environ["PATH"] += os.pathsep + r"C:\Program Files\eSpeak NG"

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],        # or ["http://localhost:3000"] in dev
    allow_methods=["*"],
    allow_headers=["*"],
)



tts = TTS(model_name="tts_models/en/vctk/vits")
@app.get("/")
def read_root():
    return {"message": "Welcome to Lynacon, built by Travis Ashcraft and Casey Hicks."}

@app.post("/synthesize")
def synthesize(text: str = Form(...), speaker: str = Form("p225")):
    filename = f"{uuid.uuid4()}.wav"
    filepath = os.path.join("outputs", filename)

    tts.tts_to_file(text=text, file_path=filepath, speaker=speaker)
    return FileResponse(filepath, media_type="audio/wav", filename=filename)

@app.get("/speakers")
def list_speakers():
    return {"speakers": tts.speakers}
    
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))  # fallback for local dev
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=port,
        reload=bool(os.environ.get("DEV", False)),
    )   