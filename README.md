# 🔊 Lynacon – The Voice of TSTC

**Lynacon** is Texas State Technical College's in-house text-to-speech (TTS) platform, built using open-source technologies to empower education, accessibility, and community engagement. Inspired by the legacy of Connally Hall and named as a subtle anagram tribute, Lynacon delivers natural-sounding audio from user-input text—right from the web.

---

## 🎯 Features

- 🌐 Web-based text input
- 🎧 Downloadable `.wav` file generation
- 🧠 Powered by [Coqui TTS](https://github.com/coqui-ai/TTS)
- 🏛️ Branded for TSTC with institutional colors and logo
- 💸 Built to reduce licensing costs and support internal + external use

---

## 🛠️ Tech Stack

- **Frontend:** React (with TSTC branding)
- **Backend:** Flask or FastAPI (Python)
- **TTS Engine:** Coqui AI with pretrained models (`Tacotron2-DDC`, `HiFi-GAN`)
- **Hosting:** Can be self-hosted or deployed on Render, Vercel, or similar

---

## 🚀 Getting Started

### 1. Clone the Repo
```bash
git clone https://github.com/TSTC-Tech/Lynacon.git
cd Lynacon
