# TrusLex
AI lawsuits are exploding across America — but the data is buried where no one can see it. We built Truslex to change that.

📂 Test Data

The testData/ folder contains raw dataset files used for development, testing, and validation of the TrusLex dashboard.
These files are derived from the Database of AI Litigation (DAIL) and include structured litigation records and secondary source references.

testData/
├── Case_Table_2026-Feb-21_1952.xlsv
└── Secondary_Source_Coverage_Table2026-Feb-21_2058.xlsv

### How to Run TrusLex: 
### 1️⃣ Clone the Repository:
git clone https://github.com/csam1997/TrusLex.git

Navigate into repository in Command Prompt
cd TrusLex 

### 2️⃣ Install Dependencies(Command Prompt):
npm install

### 3️⃣ Start the Application(Command Prompt):

After installing all dependencies, start the development server:
npm start

### 4️⃣ Copy the Localhost URL

Once the server starts successfully, the terminal will display a message similar to:
Local: http://localhost:3000/

### 5️⃣ Open in Your Web Browser

Paste the copied URL into your web browser:
http://localhost:3000/

You can now:
View the AI litigation dashboard
Explore state-level lawsuit data
Analyze industry trends
Interact with filters and visualizations
Examine litigation growth over time


__________________________________________________________________________________________________________________________________________
**🔎 TrusLex — AI Litigation Visibility Dashboard**

**AI lawsuits are exploding across the United States — but the data is buried in tables that nobody can easily read or explore.**  
TrusLex was built to bridge that gap by turning the *Database of AI Litigation (DAIL)* into an interactive, visual, and accessible platform.

The goal of this project is to make AI litigation data transparent and actionable for:
- **Policymakers** — to identify state-level litigation trends
- **Journalists** — to see which industries face the most legal AI challenges
- **Researchers** — to analyze patterns and trends over time
- **Civic tech developers & the public** — to gain visibility into how AI is impacting society

## 📊 Project Description

The TrusLex platform takes raw litigation data and transforms it into:
- Interactive trending maps and charts
- State-level case visualizations
- Time-series graphs of litigation growth
- Industry breakdowns of AI lawsuit frequency
- Filters for issue type, year, and state

## 🚀 Features

✔ Clean dashboard for AI litigation  
✔ Visual graphs and filters  
✔ State-wise trend analysis  
✔ Industry breakdown analysis  
✔ Prepared for expansion and enhancement

## 🧱 Tech Stack

## Tech Stack

| Component | Technology |
|---|---|
| Frontend UI | HTML / CSS / JavaScript |
| Data Loading | SheetJS (`xlsx`) |
| Data | XLSX uploads / local JSON map assets |
| Visualization | D3.js / Canvas / TopoJSON |
| Backend API | None |
| Deployment | GitHub Pages |



