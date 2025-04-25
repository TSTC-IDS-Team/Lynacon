# Use the official Python 3.11 slim image
FROM python:3.11-slim

# Install system & build dependencies
RUN apt-get update \
 && apt-get install -y --no-install-recommends \
      git \
      build-essential \
      python3-dev \
      ffmpeg \
      libsndfile1-dev \
      libsox-dev \
      libsox-fmt-all \
	  espeak-ng \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy & install Python dependencies
COPY requirements.txt .
RUN pip install --upgrade pip \
 && pip install --no-cache-dir -r requirements.txt

# Copy your FastAPI app
COPY . .

# Ensure outputs folder exists
RUN mkdir -p outputs

# Expose the port that FastAPI listens on
EXPOSE 8000

# Launch Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
