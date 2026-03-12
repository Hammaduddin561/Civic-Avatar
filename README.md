# Civic Avatar Platform 🏛️🤖

*A "Trust-by-Design" AI Communications Network built for the India Innovates 2026 Hackathon.*

## Overview
The Digital Democracy initiative requires a secure, citizen-centric touchpoint capable of handling live municipal inquiries across multiple dialects. The **Civic Avatar Platform** solves this by providing verifiable, photorealistic AI avatars for broadcasting, outreach, and 1:1 service. 

This repository contains the full-stack hackathon submission, consisting of:
1. **Frontend (React + Vite + Tailwind CSS):** A premium, dark-mode "Townhall Broadcast View" and an "Adhikari Operations Command Center" dashboard generated using Stitch.
2. **Backend (Python FastAPI):** A lightweight API simulating the NLP backend, RAG pipelines, C2PA provenance tracking, and human-in-the-loop escalation queues.

## Feature Architecture

*   **Townhall Mode:** Broadcasts announcements and hosts live Q&A. The AI avatar pulls verified answers from official strategy documents with explicitly cited sources.
*   **Adhikari Command Center:** A master dashboard for officials to visually prioritize queue hold times, adjust Avatar "Behavior Configurations" (e.g., Response Formality, Cognitive Load), and verify the cryptographic integrity of Neural Weights via "Provenance Logs."
*   **Trust Stack Integration:** Simulated C2PA standard tracking ensures outputs are marked as "Verified AI Responses."

## Technologies Used
*   **Frontend:** React (Vite), Tailwind CSS, Google Material Symbols (Icons).
*   **Backend:** Python 3, FastAPI, Uvicorn, Pydantic.
*   **Design Generation:** Google GenAI 'Stitch' Application for UI component rendering.

## How to Run Locally

This application contains 2 distinct services that must be run simultaneously.

### 1. Start the React Frontend
Open your terminal and navigate to the UI folder:

```bash
cd frontend
npm install
npm run dev
```
The Frontend will launch at **http://localhost:5173**.

### 2. Start the FastAPI Backend
Open a *second* terminal and navigate to the backend folder:

```bash
cd backend
python -m venv venv
# Activate virtual environment
# Windows: .\venv\Scripts\activate
# Mac/Linux: source venv/bin/activate
pip install -r requirements.txt
python -m uvicorn main:app --port 8000 --reload
```
The Backend APIs will launch at **http://localhost:8000**.
*(Note: You can view the automatic backend API documentation at `http://localhost:8000/docs`)*

## Hackathon Usage
Once both servers are running, switch between the **Townhall** and **Dashboard** states on the sidebar at `http://localhost:5173`. 
Typing an inquiry in the Townhall chatbox will successfully post to the `8000` port and return a simulated RAG response. The Command Center table logs are heavily mock-data driven and also natively fetched from the Python environment!
