<p align="center">
  <img src="https://img.icons8.com/fluency/96/wallet.png" alt="ExpenseTracker Logo" width="80" />
</p>

<h1 align="center">💰 ExpenseTracker</h1>

<p align="center">
  A full-stack personal finance tracker built with the MERN stack.<br/>
  Track income, expenses, and visualize spending patterns — with dark mode, CSV exports, and responsive design.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js" alt="Node.js" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Chart.js-4-FF6384?style=flat-square&logo=chartdotjs" alt="Chart.js" />
  <img src="https://img.shields.io/badge/Styled_Components-💅-DB7093?style=flat-square" alt="Styled Components" />
</p>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 📊 **Interactive Dashboard** | Line chart (income vs expenses), doughnut chart (expense breakdown by category), stat cards with min/max ranges |
| 📜 **Transaction History** | Full transaction list with search, filter (All/Income/Expense), and multi-column sort |
| 💸 **Income & Expense CRUD** | Add, view, and delete income/expense entries with form validation |
| 📥 **CSV Export** | Export filtered transactions to CSV with summary totals — runs entirely client-side |
| 🌙 **Dark Mode** | Theme toggle with `localStorage` persistence and system preference detection |
| 📱 **Responsive Design** | Mobile-first hamburger navigation, stacking grids, and adaptive typography |
| 🔔 **Toast Notifications** | Color-coded success/error/warning feedback on all CRUD operations |
| 💱 **₹ Currency Formatting** | Indian Rupee formatting with `toLocaleString('en-IN')` throughout |

---

## 🛠️ Tech Stack

### Frontend
- **React 18** — Component-based UI with hooks (`useState`, `useEffect`, `useMemo`, `useContext`)
- **Styled Components** — CSS-in-JS with theme support for dark mode
- **Chart.js + react-chartjs-2** — Interactive line and doughnut charts
- **Axios** — HTTP client for API communication
- **React DatePicker** — Date input component

### Backend
- **Node.js + Express** — RESTful API server
- **MongoDB + Mongoose** — NoSQL database with schema validation
- **Helmet** — HTTP security headers
- **Morgan** — Request logging middleware
- **Express Rate Limit** — API abuse prevention (100 req/15min)
- **CORS** — Configurable origin whitelist via environment variables

---

## 📂 Project Structure

```
ExpenseTracker/
├── backend/
│   ├── app.js                 # Express server with middleware stack
│   ├── db/db.js               # MongoDB connection with error handling
│   ├── controllers/
│   │   ├── income.js          # Income CRUD handlers
│   │   └── expense.js         # Expense CRUD handlers
│   ├── models/
│   │   ├── incomeModel.js     # Mongoose income schema
│   │   └── expenseModel.js    # Mongoose expense schema
│   ├── routes/
│   │   └── transactions.js    # API route definitions
│   ├── .env.example           # Environment variable template
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── Components/
│   │   │   ├── Dashboard/     # Main analytics dashboard
│   │   │   ├── Chart/         # Line chart + Doughnut chart
│   │   │   ├── Transactions/  # Searchable transaction history
│   │   │   ├── Income/        # Income management
│   │   │   ├── Expenses/      # Expense management
│   │   │   ├── Navigation/    # Responsive sidebar with theme toggle
│   │   │   ├── Toast/         # Notification system
│   │   │   ├── Loader/        # Loading spinner
│   │   │   └── History/       # Recent transactions widget
│   │   ├── context/
│   │   │   ├── globalContext.js   # Global state (React Context API)
│   │   │   └── themeContext.js    # Dark mode state + persistence
│   │   ├── styles/
│   │   │   ├── GlobalStyle.js     # Global CSS with theme variables
│   │   │   ├── themes.js         # Light & dark theme tokens
│   │   │   └── Layouts.js        # Responsive layout components
│   │   └── utils/
│   │       ├── exportCSV.js      # Client-side CSV generation
│   │       ├── dateFormat.js     # Date formatting utility
│   │       ├── icons.js          # Icon components
│   │       └── menuItems.js      # Navigation menu config
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** ≥ 16
- **MongoDB Atlas** account (or local MongoDB instance)
- **npm** or **yarn**

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/ExpenseTracker.git
cd ExpenseTracker
```

### 2. Backend Setup

```bash
cd backend
npm install

# Create .env from the template
cp .env.example .env
# Edit .env with your MongoDB connection string
```

**Environment Variables:**

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGO_URL` | MongoDB Atlas connection string | *required* |
| `PORT` | Server port | `5000` |
| `ALLOWED_ORIGINS` | Comma-separated CORS origins | `http://localhost:3000` |
| `NODE_ENV` | `development` or `production` | `development` |

```bash
# Development (with hot-reload)
npm run dev

# Production
npm start
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

The app opens at `http://localhost:3000`.

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Health check — returns API status |
| `POST` | `/api/v1/add-income` | Create a new income entry |
| `GET` | `/api/v1/get-incomes` | Fetch all income entries |
| `DELETE` | `/api/v1/delete-income/:id` | Delete income by ID |
| `POST` | `/api/v1/add-expense` | Create a new expense entry |
| `GET` | `/api/v1/get-expenses` | Fetch all expense entries |
| `DELETE` | `/api/v1/delete-expense/:id` | Delete expense by ID |

**Request body example** (POST):
```json
{
  "title": "Freelance Project",
  "amount": 25000,
  "category": "freelancing",
  "description": "Web development project",
  "date": "2026-07-08",
  "type": "income"
}
```

---

## 🏗️ Architecture Highlights

- **Global State Management** — React Context API (`globalContext.js`) provides centralized state without Redux overhead
- **Theme System** — Dual-layer approach: CSS custom properties for broad styling + styled-components `ThemeProvider` for component-level theming
- **Error Handling** — Global Express error middleware + per-route try/catch + client-side toast notifications
- **Security** — Helmet headers, rate limiting, CORS whitelist, `.env` for secrets
- **Performance** — `useMemo` for expensive computations (transaction filtering/sorting), `React.memo` for Orb component

---

## 🌐 Deployment

The app is deployed on:
- **Backend**: [Render](https://render.com) — `https://expensetracker-qc7c.onrender.com`
- **Frontend**: Deploy to Vercel, Netlify, or Render Static

### Deploy Backend to Render
1. Connect your GitHub repository
2. Set **Build Command**: `npm install`
3. Set **Start Command**: `npm start`
4. Add environment variables (`MONGO_URL`, `ALLOWED_ORIGINS`, `NODE_ENV=production`)

### Deploy Frontend
1. Update the `BASE_URL` in `frontend/src/context/globalContext.js` to your backend URL
2. Run `npm run build` in the frontend directory
3. Deploy the `build/` folder to any static hosting provider

---

## 📄 License

This project is open source under the [ISC License](https://opensource.org/licenses/ISC).

---

<p align="center">
  Built with ❤️ by <strong>Dinesh</strong>
</p>
