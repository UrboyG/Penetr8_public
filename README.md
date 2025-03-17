🔐 Penetr8 – Secure Your Website, Empower Your Future

**Penetr8** is a **web-based Static Application Security Testing (SAST)** platform designed to help developers at **Chiang Mai University (CMU)** detect and fix source code vulnerabilities **before launching to production**.

With no installation required, users can simply log in, upload their source code, and instantly receive an intuitive vulnerability report powered by SonarQube and other open-source tools.

> 📍 Version: `492.3.25`  
> 🌐 Live: [http://penetr8.pimandek.ac.th:3000/]
---

## 🎯 Who is Penetr8 for?

- CMU developers (students & faculty) 
- Academic projects involving website/app development
- Anyone seeking a beginner-friendly way to test code securely

---

## 🚀 Features at a Glance

✅ **No setup required** – 100% web-based  
🔐 Login via Google for personalized scan history  
📤 Upload your source code archive (`.zip`)  
- 🔍 Supports multiple languages:  
- &nbsp;&nbsp;&nbsp;&nbsp; `Python`, `Java`, `C#`,`HTML`,`CSS`, `JavaScript`,`Docker`,`PHP`, `TypeScript`, `Ruby`, `Kotlin`, `GO`, `Kotlin` and more!
+ 🔍 Supports a wide range of languages – see the full list here:  
+ [📘 Supported Languages in SonarQube 10.6](https://docs.sonarsource.com/sonarqube-server/10.6/analyzing-source-code/languages/overview/)  
📊 Auto-generated dashboards with vulnerability statistics  
📄 Past scan access and downloadable PDF reports

---

## 🧪 How It Works

1. **Visit** the platform and log in with your Google account.
2. **Upload** your `.zip` project (e.g., JS, Python, PHP).
3. **Submit** for scan.
4. **Review results** — vulnerabilities are visualized by:
   - Severity (High, Medium, Low)
   - Fix difficulty (Easy, Medium, Hard)
   - Issue type (Security, Reliability, Maintainability)
5. **Download** the report or track it later in the "Past Scan" section.

---

## 🖥️ Server-Side Environment

Penetr8 runs on a secure university-managed infrastructure with the following stack:

| Component         | Tool / Framework     | Version        |
|------------------ |----------------------|----------------|
| Frontend          | Vite.js + React.js   | ^4.x           |
| Backend           | Elysia.js (Bun)      | ^0.7.x         |
| Runtime           | Bun                  | 1.1.38         |
| ORM               | Prisma               | 5.20.0         |
| Database          | PostgreSQL           | 11.x           |
| Static Analysis   | SonarQube            | 10.6.0         |

---

## 🖼️ Screenshots

### 📌 Homepage  
![Homepage](./screenshots/home.png)

### 📂 Upload & Assessment  
![Upload](./screenshots/upload.png)

### 📈 Vulnerability Results  
![Results](./screenshots/results.png)

### 📜 Past Scans  
![History](./screenshots/history.png)

### 🔐 Login Page  
![Login](./screenshots/Login.png)

---

## 🔒 What We Check For

- Insecure coding patterns
- Hardcoded secrets and passwords
- OWASP Top 10 vulnerabilities
- Code maintainability issues
- Misconfigurations

---

## 📄 License

MIT License © 2025 Penetr8 Project – Chiang Mai University

---

## 🧑‍💻 For Developers & Contributors

We welcome open-source contributions to improve **Penetr8** — a SAST (Static Application Security Testing) platform designed for secure code analysis and education.

### ⚙️ Local Development Setup

Follow these steps to set up the project locally:

---

### 1. 🚀 Clone the Repository

```bash
git clone https://github.com/UrboyG/Penetr8_public.git
cd Penetr8_public
```

---

### 2. 📦 Install Frontend Dependencies (Vite + npm)

```bash
cd penetr8
npm install
```

This installs Vite and all frontend dependencies.

---

### 3. ⚙️ Install Backend Dependencies (Elysia.js + Bun)

```bash
cd ../backend
bun install
```

This installs all backend dependencies defined in `bunfig.toml` and `package.json`.

---

### 4. 🔐 Set Up Environment Variables

Create your own `.env` files in both `penetr8/` and `backend/` folders, based on `.env.example`.

#### ✅ Example for `penetr8/.env`
```env
VITE_API_URL=http://localhost:8080
```

#### ✅ Example for `backend/.env`
```env
DATABASE_URL=postgresql://user:password@localhost:5432/your_db
JWT_SECRET=your_jwt_secret
```

> 💡 Make sure PostgreSQL is running locally with the right database and credentials.

---

### 5. 🧪 Run the Full Stack App

From the project root:

```bash
npm install concurrently --save-dev # Run this once if not already installed
npm run dev
```

This will:
- Start the **frontend** on `http://localhost:3000`
- Start the **backend API** on `http://localhost:8080`
- Launch **Prisma Studio** at `http://localhost:5555`

---

### 📝 Notes

- Backend runs on **Elysia.js** with **Bun**
- Frontend uses **Vite**
- Prisma schema is in `backend/prisma/schema.prisma`
- Sensitive, private, or student-specific data/code has been removed from this public repo
- Make sure to create and configure your own `.env` files

---

🙌 Happy contributing!
  
## 🤝 Contributors

- **Lead Developer:** Sittipat Palawooth and Suwichada Pongkanmoon
- **Project Manager and Documentation:** Teewara Kaphaek and Chayayos Inpracha 
- **Project Supervisor:** Prof.Dr. Sasin Janpuangtong
- **Supported by:** The Department of Computer engineering, Chiang Mai University

---

## 📬 Contact Us

📧 Email: `penetr8.sast@gmail.com`  
🌐 Website: (http://penetr8.pimandek.ac.th:3000/))

---

