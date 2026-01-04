## Milestone 1: The “Digital Paper”
Interactive Prototype

**Goal:** Replace the pen-and-paper form with a reactive PWA interface that handles calculations and generates PDF.
- **Core Tasks:**
	- Build the **Dynamic Form** (Client Info, Amenities, Event Services, Fees).
	- Build the **Contract Preview** (a clean, non-editable view of the agreement).
	- 
- **Outcome:** Staff can use the app on a tablet/phone to generate a professional PDF instead of writing it by hand.

---
## Milestone 2: The “Persistence” Layer (Internal Caching)
**Goal:** Solve the “storage” problem locally so staff can access past contracts on their specific device.
- **Core Tasks:**
	- Implement **Browser Storage (LocalStorage/IndexedDB)** logic.
	- Create a **”Drafts/History” Dashboard** to view previously created contracts on that device.
	- Add **”Edit/Update” functionality** for existing local records.
	- Add a simple **Search Bar** to filter local contracts by client name.
- **Outcome:** A functional “Island” app. No server needed yet, but the “retrieval” and “modification” problems are solved for the individual user.

---
## Milestone 3: The “Source of Truth” (Centralized API & DB)
**Goal:** Move from individual device storage to a shared office database so everyone sees the same data.
- **Core Tasks:**
	- Develop the **Relational Database** and **Backend API**.
	- Create a **”Sync/Upload” button** to push local browser data to the cloud.
	- Implement **User Authentication** (Staff Login).
	- Centralized **Search & Indexing**.
- **Outcome:** The “Centralized Management System” is live. Data is now secure, shared, and backed up.

---
## Milestone 4: The “Resort-Ready” PWA (Offline-First Optimization)
**Goal:** Refine the system by adding offline capability.
- **Core Tasks:**
	- Convert the app into a **PWA** (Installable on Home Screen).
	- Implement **Background Sync** (automatic upload when Wi-Fi is detected).
	- Add **Conflict Resolution** Logic (handling cases where two people edit the same contract).
	- Optimize for **Low-Bandwidth** (minimal data transfer).
	- **Offline Indicator UI:** Add visual cues (e.g., a green checkmark or a red “Sync Pending” icon) so staff know exactly which contracts are safe in the cloud and which are only on their phone.
- **Outcome:** A seamless "Local-First" experience where staff never have to worry about internet bars; the app manages the data integrity silently in the background.
