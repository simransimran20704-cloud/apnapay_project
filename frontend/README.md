# 💳 PayEase - Modern Digital Wallet & Payment Platform Frontend

A high-performance, modern FinTech web application designed for the **PayEase** Spring Boot microservices backend. Built with **React 19**, **Vite**, **Tailwind CSS v4**, and **Lucide Icons**.

---

## 🚀 Quick Start

### 1. Install Dependencies & Start Dev Server
```bash
cd frontend
npm install
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

---

## 🔌 Microservices Backend Architecture & Ports

The frontend is configured to communicate with the Spring Boot microservices:

| Microservice | Default Port | Key Endpoints | Responsibilities |
|---|---|---|---|
| **API Gateway** | `8080` | `/auth/**`, `/customer/**`, `/transaction/**` | Central reverse proxy routing & filter handling |
| **Auth Service** | `8081` | `/auth/otp/send`, `/auth/otp/verify`, `/auth/mpin/set`, `/auth/login`, `/auth/otp/test` | 6-digit OTP delivery, BCrypt hashed MPIN, JWT authentication |
| **Customer Service** | `8082` | `/customer/register`, `/customer/profile` | Onboarding, customer KYC profile, unique customer ID generator |
| **Transaction Service** | `8083` | `/transaction/balance`, `/transaction/send`, `/transaction/wallet/topup`, `/transaction/history` | Double-entry ledger, balance query, P2P money transfers, top-up |

---

## ✨ Key Features & Flow

### 1. 🔐 Authentication & Onboarding
- **Multi-step Signup**:
  - Step 1: Enters Name, Mobile Number, Email. Calls `/customer/register` and `/auth/otp/send`.
  - Step 2: 6-digit OTP verification with convenient **Auto-fill** button (captures the OTP directly from the API response for seamless local testing).
  - Step 3: Sets 4-digit security MPIN (calls `/auth/mpin/set`).
- **Secure Login**:
  - Log in using 10-digit mobile number and 4-digit MPIN.
  - Generates and stores JWT token in `Bearer` format.
  - Quick **1-Click Demo Login** button for instant testing (`9876543210` / `1234`).

### 2. 💳 Digital Wallet Dashboard
- **Interactive Virtual Card**:
  - Iridescent metallic card design with EMV chip graphic.
  - Real-time balance display in INR (₹) with reveal/hide toggle.
  - 1-click copy button for Customer ID (`CUST-xxxxxxxx`).
  - Refresh button with live spin animation.
- **Financial Stats Overview**:
  - Dynamic calculation of **Total Inflow** (Credits & Top-ups).
  - Dynamic calculation of **Total Outflow** (Money sent).
  - Total transaction counter with 100% synchronized passbook status.

### 3. 💸 Send Money (P2P Transfer)
- Recipient mobile number input with **Quick Contacts** chips.
- Amount in INR with instant pills (`+₹100`, `+₹500`, `+₹1000`, `+₹2000`).
- Optional transaction remarks (e.g., "Dinner share", "Rent").
- **Security Confirmation Layer**: Asks for 4-digit MPIN before debiting the wallet.
- Instant transaction receipt popup with reference ID and print option.

### 4. ➕ Add Money / Top-Up Wallet
- Custom or quick amount selection (`₹500`, `₹1000`, `₹2000`, `₹5000`).
- Multiple payment channels:
  - **UPI / Instant QR** (Google Pay, PhonePe, Paytm, BHIM)
  - **Net Banking** (HDFC, SBI, ICICI, Axis Bank)
  - **Debit / Credit Cards** (Visa, Mastercard, RuPay)
- Instant wallet balance refresh upon successful top-up.

### 5. 📱 Dynamic Receive QR Code
- Generates high-resolution vector QR code containing customer details and UPI ID (`<mobile>@payease`).
- 1-click button to copy UPI payment identifier to clipboard.

### 6. 📜 Passbook & Ledger
- Filter transactions by **All**, **Sent (Debits)**, and **Received (Credits)**.
- Search filter by transaction ID, counterparty, and remarks.
- **CSV Export**: Download full account statements with one click.
- Click any transaction item to inspect the printable digital receipt.

### 7. ⚙️ Smart Architecture & Mode Switcher
Click the **Gear / Settings** icon in the navbar to choose:
- **API Gateway Mode**: Routes all requests through `http://localhost:8080`.
- **Direct Microservice Ports Mode**: Calls ports `8081`, `8082`, `8083` directly.
- **Demo / Mock Mode**: Test the complete UI, send money, top-up, and inspect history without needing MySQL or Java running!
- **Test Connection Button**: Checks live backend health (`/auth/otp/test`) in real-time.
