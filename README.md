🌆 Astreya AI – The Living Pulse of Smart Cities

🔍 Problem Statement

Cities like Bengaluru produce enormous amounts of unstructured and noisy data every minute.

Information such as civic complaints, traffic disruptions, hyperlocal events, and social media content is:

Scattered across platforms

Siloed and repetitive

Becomes outdated within moments

🚀 Solution: Astreya AI
Astreya AI is a real-time, agentic, multimodal platform that listens, interprets, predicts, and acts on urban data streams.

💡 Key Capabilities

Multimodal Input

Accepts geo-tagged text, images, or videos from citizens

Analyzed by Gemini AI for visual and language understanding

Actionable Alerts

Synthesizes raw reports into meaningful insights

Example:

"🚧 Waterlogging reported near Indiranagar Metro — expect 20-min delays. Alternate route: 100ft Road."

Smart Map Dashboard

Live visual of events with clustering and severity tags

Dynamic filtering for categories like Traffic, Utilities, Social, etc.

Multilingual & Inclusive

Supports Kannada, Hindi, English, and more

Localized feeds and alerts based on user region and language

Mood Mapping

Tracks public sentiment across neighborhoods

Creates a visual mood pulse of the city

Predictive Intelligence

Learns from past patterns to forecast traffic jams, protest routes, etc.

Sends early warnings to users

Real-Time Routing to Authorities

Automatically routes complaints to appropriate agencies

e.g., Water issue → BWSSB, Road issue → BBMP

Tracks resolution timelines and updates citizens

👥 Stakeholders

For Citizens:

Easy issue reporting via chatbot or UI

Visual proof uploads (image/video)

Personalized and regional feed

Privacy-aware reporting options

Auto-updated alert notifications

For Government Agencies:

Live Firebase-powered dashboard

Smart filters: category, severity, location

Inter-agency routing of complaints

Tracks service-level agreements (SLAs) and citizen satisfaction

Trends and analytics for planning

🛠️ Tech Stack

Frontend: React + TypeScript + TailwindCSS

AI Engine: Gemini Pro Multimodal (Text, Image, Video)

Backend: Firebase Realtime DB, Cloud Functions

Utilities: Node.js, Vite, Jest, Cypress

📁 Folder Structure Overview

src/components/ – UI Components (MapDashboard, Header, etc.)

src/services/ – API integrations (Firebase, Gemini)

src/hooks/ – Custom hooks like useTranslation, useGeoLocation

src/constants.ts – Static keys and config values

src/types.ts – Type definitions (CityEvent, Location, User, etc.)

src/App.tsx – Main app logic

src/main.tsx – Entry point

⚙️ Setup Instructions

Clone the repository
git clone https://github.com/yourusername/astreya-ai.git

Navigate to frontend
cd Frontend

Install dependencies
npm install

Run the development server
npm run dev

Add your API keys in .env file (Firebase, Gemini, etc.)

