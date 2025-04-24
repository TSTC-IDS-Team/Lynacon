# Use the official Python 3.11 slim image
FROM python:3.11-slim

# Install any system-level dependencies (e.g. espeak-ng, libsndfile)
RUN apt-get update \
 && apt-get install -y --no-install-recommends \
      espeak-ng \
      libsndfile1 \
 && rm -rf /var/lib/apt/lists/*

# Set working dir
WORKDIR /app

# Copy and install Python deps
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy your FastAPI app
COPY . .

# Make sure the outputs folder exists
RUN mkdir -p outputs

# Expose the port that FastAPI is listening on
EXPOSE 8000

# Launch Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
