# Akris Ping Pong Club - Official Web Portal
### Part of Radboud University

This repository contains the full-stack architecture for the **Akris Ping Pong Club** website. The project integrates a modern, highly interactive frontend with a specialized backend designed for automated competition tracking.

---

## 🚀 Project Overview

The application is designed to serve the Radboud University community, providing a seamless experience for club members to track their progress and stay updated on league results.

### **The Tech Stack**
* **Frontend:**
    * **TypeScript & React:** Providing a scalable and type-safe component architecture.
    * **Tailwind CSS:** For a clean, responsive, and utility-first design system.
    * **Framer Motion:** Powering advanced UI animations and smooth transitions.
* **Backend:**
    * **Automated Web Crawler:** A custom-built engine that retrieves real-time data on team standings and competition results from official league tables.

---

## 🛠️ Getting Started

Follow these instructions to set up the project locally for development and testing.

### **Prerequisites**
* **Node.js** (LTS version recommended)
* **npm** (comes with Node.js)

### **Local Setup**

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/stefanroman22/Akris.git](https://github.com/stefanroman22/Akris.git)
    cd Akris
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Locate or create a `.env.local` file in the root directory and add your Gemini API Key:
    ```env
    GEMINI_API_KEY=your_api_key_here
    ```

4.  **Launch the Development Server:**
    ```bash
    npm run dev
    ```
    The application will be accessible at [http://localhost:3000](http://localhost:3000).

---

## 📊 Data & Competition Tracking
The integrated backend crawler is a core feature of this platform. It eliminates the need for manual updates by automatically scraping competition data. This ensures that every time a user visits the site, they see the most accurate and up-to-date standings for Akris teams.

---

### **External Links**
* **AI Studio Integration:** [View App in AI Studio](https://ai.studio/apps/drive/1P9MJXTsN1R90wWS18ir1vkVoaPTV_jEc)

---

**Developed by Stefan Roman**