# Jeevadeepti - Blood Donation Platform

Jeevadeepti is a dedicated blood donation web application developed for Yuvadeepti SMYM. It serves as a digital bridge between voluntary blood donors and those in critical need. The platform allows users to register as donors, search for donors by blood group and location, and view a directory of willing volunteers.

"Saving Lives Together"

---

## Features

### Public Users
* **Smart Search:** Instantly find blood donors by District and Blood Group.
* **Direct Contact:** View donor contact details to arrange donations immediately.
* **Responsive Design:** Fully optimized for mobile phones, tablets, and desktops.

### Donors
* **Easy Registration:** Simple form to join the life-saving network.
* **Privacy Focused:** Data is stored securely and used only for emergency purposes.

### Admin & Management
* **Bulk CSV Upload:** Administrators can upload existing donor lists (Excel/CSV) directly to the database.
* **Duplicate Detection:** The system automatically prevents duplicate phone numbers during bulk uploads.
* **District Mapping:** Automatic categorization of local donors (e.g., defaulted to Alappuzha/Muttar for specific survey data).

---

## Tech Stack

This project is built using modern web technologies to ensure speed, scalability, and maintainability.

* **Frontend:** React.js (Vite)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **Database:** Google Firebase Firestore (NoSQL)
* **Icons:** Lucide React
* **CSV Processing:** PapaParse
* **Deployment:** Netlify

---

## Project Structure

jeevadeepti/
├── public/              # Static assets (favicons, _redirects)
│   └── logo.png         # Project Logo
├── src/
│   ├── assets/          # Imported images and styles
│   ├── components/      # Reusable UI components (Navbar, Footer, Cards)
│   ├── pages/           # Main route pages
│   │   ├── Home.tsx
│   │   ├── Search.tsx
│   │   ├── Register.tsx
│   │   ├── Directory.tsx
│   │   └── AdminUpload.tsx  # Bulk upload utility
│   ├── firebase.ts      # Firebase configuration connection
│   ├── App.tsx          # Main Application & Routing
│   └── main.tsx         # Entry point
├── .gitignore           # Git ignore rules
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── tailwind.config.js   # Tailwind configuration
└── tsconfig.json        # TypeScript configuration

---

## Getting Started

Follow these steps to run the project locally on your machine.

### 1. Prerequisites
Ensure you have the following installed:
* Node.js (v16 or higher)
* Git

### 2. Clone the Repository
git clone https://github.com/YOUR_USERNAME/jeevadeepti.git
cd jeevadeepti

### 3. Install Dependencies
npm install

### 4. Configure Firebase
1. Create a project at the Firebase Console.
2. Create a Firestore Database.
3. Copy your web app configuration keys.
4. Update `src/firebase.ts` with your keys:

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "...",
  appId: "..."
};

### 5. Run the App
npm run dev

The app will open at http://localhost:5173.

---

## Admin Bulk Upload Guide

To upload a CSV file of donors (e.g., from a Youth Survey):

1. Navigate to: /admin-upload (e.g., http://localhost:5173/admin-upload).
2. Prepare your CSV: Ensure your file has headers like "Name", "Mobile number", and "Blood group".
3. Upload: Select the file.
4. Process:
   * The system currently hardcodes location to Muttar and District to Alappuzha for specific survey data uploads.
   * It will skip rows without valid phone numbers.
   * It will skip duplicates if the phone number already exists in the database.

---

## Deployment

The project is configured for seamless deployment on Netlify.

1. Connect your GitHub repository to Netlify.
2. Set the build command to: npm run build
3. Set the publish directory to: dist
4. Important: Ensure a `_redirects` file exists in the `public/` folder with the content `/* /index.html 200` to handle React Routing correctly.

---

## License

This project is developed for Yuvadeepti SMYM.
Copyright 2025 Jeevadeepti. All Rights Reserved.

Developers:
Libin Babu
