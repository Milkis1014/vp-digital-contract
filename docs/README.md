### Business Goal
- To make *Villa Prescilla Booking Contracts* **easier to create, store, access, and modify**.

### **Software Engineering Goal**
- (*New*) To design and develop a PWA that **automates contract generation** using Google Drive as a **centralized file-storage system**.

### Technical Objectives
| Business Need    | Engineering Objective                                                                                                    |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Easier to Create | Develop a logic-driven form interface that maps user inputs to **synchronized JSON data and PDF templates**.             |
| Easier to Store  | Implement a **folder-based storage architecture** using the Google Drive API to encapsulate each contract’s assets.      |
| Easier to Access | Build a **structured directory navigator** that organizes contracts by date and client name for quick manual retrieval.  |
| Easier to Modify | Create a **version logic** that saves new iterations of JSON and PDF files without overwriting the original audit trail. |

### Technical Architecture Overview
- **Frontend:** A responsive web interface for data entry and PDF Generation.
- **Backend:**  A file-based storage system for contract organization and version control using Google Drive.

### **Technical Stack**
- **Framework:** React 18 + Vite (configured as a Progressive Web App).
- **Deployment:** Netlify (Global CDN with automated HTTPS).
- **Security:** Google OAuth 2.0 (Identity-locked to resort domain or staff accounts).
- **Storage Engine:** Google Drive API (REST-based file-system database).
- **Data Schemas:** Standardized JSON (State) and High-Fidelity PDF (Output).
