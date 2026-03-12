# 🏛️ Civic Avatar Platform 

*A "Trust-by-Design" AI communications network for the India Innovates 2026 Hackathon.*

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/fastapi-109989?style=for-the-badge&logo=FASTAPI&logoColor=white)](https://fastapi.tiangolo.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![HeyGen API](https://img.shields.io/badge/HeyGen-API-purple?style=for-the-badge)](https://heygen.com/)

---

## 📖 The Problem
Municipalities and state governments face significant challenges in citizen communication:
1. **Multilingual Accessibility:** India requires dynamic, real-time translations across dozens of dialects.
2. **Trust & Verification:** In the age of deepfakes, citizens struggle to verify official government communications.
3. **Scale:** Human operators cannot handle 24/7 concurrent inquiries during crisis events or major policy rollouts.

## 💡 Our Solution
The **Civic Avatar Platform** is a full-stack, WebRTC-enabled dashboard that deploys **verifiable, photorealistic AI avatars** as a single source of truth for citizen interactions. It provides a secure touchpoint capable of handling live municipal inquiries across multiple dialects with built-in cryptographic trust markers.

### ✨ Key Features

*   📺 **Townhall Broadcast View:** A public-facing interface where an interactive, live AI avatar (powered by the HeyGen Streaming API) broadcasts announcements and hosts live Q&A. The AI pulls verified answers from official strategy documents with explicitly cited sources.
*   🎛️ **Adhikari Command Center:** A master dashboard for officials to visually prioritize queue hold times, manage active escalations, and monitor system performance.
*   ⚙️ **Dynamic Avatar Configuration:** An interactive settings module allowing operators to adjust the Avatar's "Behavior Configurations" (e.g., Response Formality, Cognitive Load, Regional Dialect Focus) and UI Appearance directly from the browser.
*   🔐 **C2PA Trust Stack Integration:** Simulated cryptographic tracking ensures all avatar outputs are marked and visually verified as "Official Synthetic Media."

---

## 🛠️ Technical Architecture

This project is separated into a robust backend API and a dynamic frontend UI:

*   **Frontend Data & Streaming:** React + Vite, styled with TailwindCSS. Integrates the `@heygen/streaming-avatar` SDK for real-time, low-latency WebRTC video connections.
*   **Backend Logic:** Python FastAPI utilizing SQLAlchemy and SQLite for persistent storage of configuration states, grievance queues, and provenance logs. Serves as a secure proxy to generate HeyGen access tokens.
*   **Design Generation:** Initial UI components scaffolded using Google's GenAI 'Stitch' Application framework.

---

## 🚀 How to Run Locally

You must run both the Frontend and Backend servers simultaneously to experience the full platform.

### 1. Start the Backend API (FastAPI)
The backend manages the database, mocked NLP endpoints, and secure token generation for the avatar stream.

```bash
cd backend
python -m venv venv

# Activate virtual environment
# Windows: .\venv\Scripts\activate
# Mac/Linux: source venv/bin/activate

pip install -r requirements.txt
python -m uvicorn main:app --port 8000 --reload
```
*The Backend API will launch at `http://localhost:8000`. You can view interactive API documentation at `http://localhost:8000/docs`.*

### 2. Start the Frontend UI (React/Vite)
Open a **new terminal window**. The frontend requires the backend to be running to fetch its HeyGen API token and database statuses.

```bash
cd frontend
npm install
npm run dev
```
*The Frontend Dashboard will launch at `http://localhost:5173`.*

---


