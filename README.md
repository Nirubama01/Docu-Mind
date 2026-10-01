# DocuMind — AI-Powered Document Intelligence (Frontend)

DocuMind is a modern, responsive document intelligence dashboard built for a 2-week academic project. It provides an intuitive interface for uploading documents (PDF, JPG, PNG, TXT), inspecting OCR-extracted metadata and entities, interacting via a ChatGPT-style conversational RAG interface with page citations, and comparing documents side-by-side to highlight variances.

---

## 🚀 Tech Stack

- **React 18** (Functional components, Hooks, Context API)
- **Vite 6** (Fast HMR development server and optimized build)
- **Tailwind CSS v3** (Modern SaaS design system, responsive layout, accessible contrast)
- **React Router v6** (Client-side routing with nested layouts)
- **Axios** (Pre-configured HTTP client ready for FastAPI integration)
- **Lucide React** (Clean, consistent iconography)

---

## 📁 Project Folder Structure

```
DocuMind/
├── public/
│   └── favicon.svg              # DocuMind branded vector favicon
├── src/
│   ├── api/
│   │   └── axiosClient.js       # Configured Axios instance with baseURL & interceptors
│   ├── components/
│   │   ├── common/              # Reusable UI primitives
│   │   │   ├── Badge.jsx        # Status & file type badges (Processed, Processing, Failed, PDF, etc.)
│   │   │   ├── Button.jsx       # Button variants (primary, secondary, outline, danger, ghost)
│   │   │   ├── Card.jsx         # Rounded card container with header & footer slots
│   │   │   ├── EmptyState.jsx   # Friendly empty/filtered results placeholder
│   │   │   ├── LoadingSpinner.jsx # Animated spinner and table skeletons
│   │   │   └── Modal.jsx        # Accessible dialog window with ESC / backdrop dismiss
│   │   ├── dashboard/
│   │   │   └── StatCard.jsx     # Summary cards with trends and icons
│   │   ├── layout/
│   │   │   ├── AppLayout.jsx    # Core shell with Sidebar, Navbar, and Outlet
│   │   │   ├── Navbar.jsx       # Header with global search, notifications, & user menu
│   │   │   └── Sidebar.jsx      # Left sidebar navigation with mobile drawer support
│   │   ├── documents/
│   │   │   ├── DocumentFilter.jsx # Status filter tabs with dynamic counts
│   │   │   └── DocumentTable.jsx  # Searchable & filterable documents table with actions
│   │   ├── upload/
│   │   │   ├── UploadZone.jsx   # Drag-and-drop dropzone with file type validation
│   │   │   └── UploadProgress.jsx # File list, progress bar, & simulated processing status
│   │   ├── chat/
│   │   │   ├── ChatMessage.jsx  # User & AI message bubbles with source citations
│   │   │   └── PromptSuggestions.jsx # Quick clickable prompt chips
│   │   └── compare/
│   │       └── ComparisonTable.jsx # Side-by-side entity table with variance highlighting
│   ├── context/
│   │   └── DocumentContext.jsx  # Global React Context for state, uploads, chat, & metrics
│   ├── data/
│   │   └── mockData.js          # Centralized realistic mock dataset
│   ├── pages/
│   │   ├── Dashboard.jsx        # Summary cards, quick upload shortcut, & recent documents
│   │   ├── Documents.jsx        # Searchable document repository with status tabs
│   │   ├── UploadDocument.jsx   # Drag-and-drop upload page with progress pipeline
│   │   ├── DocumentDetails.jsx  # Extracted entities, raw text, & document preview placeholder
│   │   ├── AskAI.jsx            # ChatGPT-style interface with document selector & citations
│   │   ├── CompareDocuments.jsx # Side-by-side Document A vs Document B comparison
│   │   ├── Settings.jsx         # User profile, OCR thresholds, & FastAPI endpoint config
│   │   ├── Login.jsx            # Clean login form with 1-click Reviewer Demo button
│   │   ├── Register.jsx         # Clean registration form with password confirmation
│   │   └── NotFound.jsx         # 404 route fallback
│   ├── App.jsx                  # Main routing definition and provider setup
│   ├── index.css                # Tailwind directives & custom scrollbars
│   └── main.jsx                 # React root entry point
├── index.html                   # HTML template with Inter typography
├── package.json                 # Dependencies and npm scripts
├── postcss.config.js            # PostCSS configuration
├── tailwind.config.js           # Tailwind configuration (brand palette & fonts)
├── vite.config.js               # Vite configuration (port 3000)
└── README.md
```

---

## 🛠️ How to Run the Frontend

### 1. Prerequisites
Make sure **Node.js (v18+)** and **npm** are installed on your machine.

### 2. Install Dependencies
Open your terminal in the project directory:
```bash
cd c:/DocuMind
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
The application will launch at:
```
http://localhost:3000/
```

### 4. Build for Production
To create an optimized production build:
```bash
npm run build
```
To preview the production build locally:
```bash
npm run preview
```

---

## 📄 Main Pages Overview

| Page | Route | Description |
|---|---|---|
| **Login** | `/login` | Authentication form with demo 1-click test login button |
| **Register** | `/register` | Registration form with name, email, password, and confirm password |
| **Dashboard** | `/` | Summary metric cards, recent documents table, quick action buttons |
| **Documents** | `/documents` | Searchable table of all documents with status filters (All, Processed, Processing, Failed) |
| **Upload Document** | `/upload` | Drag-and-drop file upload with format restrictions and simulated progress pipeline |
| **Document Details** | `/documents/:id` | Visual preview placeholder, extracted entities, raw OCR text, and Ask AI link |
| **Ask AI** | `/ask-ai` | ChatGPT-style interface with target document dropdown, suggested queries, and page-level source citations |
| **Compare Documents** | `/compare` | Side-by-side Document A vs Document B comparison with highlighted variances |
| **Settings** | `/settings` | User profile management, OCR confidence sliders, and FastAPI endpoint setup |

---

## 🧩 Reusable Components

- **`Sidebar.jsx`**: Left navigation bar highlighting the active route with responsive mobile drawer support and storage indicator.
- **`Navbar.jsx`**: Sticky top bar containing global document search (with `Ctrl + K`), quick upload CTA, notifications dropdown, and user menu.
- **`StatCard.jsx`**: Clean metric card displaying stat count, percentage trends, subtitle, and themed icons.
- **`DocumentTable.jsx`**: Reusable table component displaying document name, type badge, upload timestamp, status badge, and interactive actions (view details, ask AI, delete confirmation modal).
- **`DocumentFilter.jsx`**: Filter tabs with dynamic badges showing document counts per status.
- **`UploadZone.jsx`**: Drag-and-drop dropzone supporting PDF, JPG, PNG, TXT with validation warnings.
- **`UploadProgress.jsx`**: Selected files summary with size formatting, simulated progress bar, and completion badges.
- **`ChatMessage.jsx`**: User and AI chat bubbles with copy button and source citation badge (`Source: Invoice.pdf — Page 1`).
- **`ComparisonTable.jsx`**: Side-by-side reconciliation table that automatically detects and highlights differences between fields.
- **`Badge.jsx`**: Status badges (Processed, Processing, Failed) and file type badges (PDF, JPG, PNG, TXT).
- **`Button.jsx`**: Standardized button with primary, secondary, outline, danger, and ghost styles plus loading spinner.
- **`Modal.jsx`**: Accessible modal dialog with backdrop blur and keyboard ESC handling.
- **`EmptyState.jsx`**: Empty state placeholder for tables and search filters.

---

## 📊 Mock Data Storage

All realistic mock data is cleanly separated from UI logic in:
👉 `src/data/mockData.js`

It contains:
- **`MOCK_DOCUMENTS`**: Realistic records including `Invoice.pdf` (with itemized lines, GST, total ₹35,000), `Certificate.jpg`, `Report.txt`, `PurchaseOrder.pdf` (total ₹42,000), `Contract_Agreement.pdf` (Processing), and `Corrupted_Scan.png` (Failed).
- **`MOCK_STATISTICS`**: Ingestion metrics (total documents, processed count, questions asked, SLA latency).
- **`MOCK_CHAT_SESSIONS`**: Pre-configured conversational interactions with source citations (e.g., "What is the total invoice amount?" -> "The total invoice amount is ₹35,000." with `Source: Invoice.pdf — Page 1`).
- **`MOCK_COMPARISON_FIELDS`**: Key-value pairs for document comparison (Amount, Date, Customer, Vendor, Tax, Terms).
- **`MOCK_USER`**: Profile metadata for researcher Arun Kumar.

---

## 🔌 FastAPI Integration Readiness

DocuMind is structured to connect to a FastAPI backend in future phases:
- An Axios client is already initialized at `src/api/axiosClient.js` with base URL configuration (`http://localhost:8000/api/v1`) and request/response interceptors.
- State is centralized in `src/context/DocumentContext.jsx`, so swapping mock functions for actual FastAPI API calls can be done without modifying the presentation components.
