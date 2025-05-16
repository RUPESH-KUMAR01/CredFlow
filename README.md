# CredFlow

CredFlow is a digital wallet application built with Next.js and TypeScript that facilitates peer-to-peer money transfers and bank transactions.

## 🚀 Features

- **User Authentication**: Secure login and registration system
- **P2P Transfers**: Send and receive money between users
- **Bank Transactions**: Top-up your wallet from bank accounts
- **Transaction History**: View your recent transaction activities
- **Modern UI**: Clean and responsive user interface

## 📋 Project Structure

This project is organized as a monorepo using Turborepo with the following packages:

- `apps/user-app`: The main Next.js application for end users
- `apps/bankwebhook`: Service for handling bank transaction webhooks
- `packages/db`: Database schema and client
- `packages/ui`: Shared UI components

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript, Tailwind CSS
- **Backend**: Next.js API routes with server actions
- **Database**: Prisma ORM with PostgreSQL
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS
- **Build Tool**: Turborepo

## 🏗️ Project Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/RUPESH-KUMAR01/CredFlow.git
   cd CredFlow
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following:
   ```
   DATABASE_URL="postgresql://user:password@localhost:5432/credflow"
   NEXTAUTH_SECRET="your-secret"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. Initialize the database:
   ```
   cd packages/db
   npx prisma migrate deploy
   npx prisma generate
   ```
   This will run the existing migrations to set up your database and generate the Prisma client.

5. Start the applications (each needs to be started separately):

   For the User App:
   ```
   cd apps/user-app
   npm run dev
   ```
   The user application will be available at [http://localhost:3000](http://localhost:3000)

   For the Bank Webhook Service:
   ```
   cd apps/bankwebhook
   npm run dev
   ```
   The bank webhook service will run on a different port (usually 3001).
