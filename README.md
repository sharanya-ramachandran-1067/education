# Education

Progress Preschool and Daycare is a starter scaffold for a custom preschool and daycare operations app.

It is not a generic CRM. The structure is focused on day-to-day school work such as admissions, classroom operations, teacher management, fee tracking, parent communication, and handbook content.

## What this scaffold includes

- A simple app shell with sidebar navigation and a top bar
- MVP sections for Dashboard, Enquiries, Students, Fees, Teachers, Announcements, Calendar, Parent Portal, Handbook, and Settings
- Reusable UI building blocks for stat cards, empty states, and module headers
- Mock data, shared types, and schema placeholders for future persistence
- In-app notification placeholders and structure that is ready to expand into Zoho Cliq later
- A clean, non-technical-friendly visual layout for school staff

## Stack

This scaffold uses **Next.js with the App Router and TypeScript**.

That makes it easy to:

- run locally with very little setup
- expand one module at a time
- swap mock data for a real backend later
- adapt the project to Zoho Catalyst or another serverless deployment target

## Project structure

- `src/app` - routes and page-level layout
- `src/components` - reusable UI components
- `src/lib` - types, mock data, and small utilities
- `src/data` - schema placeholders for MVP tables
- `src/styles` - shared global styles

## Current module scaffold

- Dashboard
- Enquiries
- Students
- Fees
- Teachers
- Announcements
- Calendar
- Parent Portal
- Handbook
- Settings

## Product decisions already reflected here

- Teachers have a dedicated module
- The Parent Portal is part of the initial navigation
- In-app notifications are included in the scaffold
- Zoho Cliq is planned for a later integration step
- WhatsApp is intentionally not required for version 1

## Getting started

```bash
npm install
npm run dev
```

Open `http://localhost:3000` and you will be redirected to the dashboard.

## Suggested next steps

1. Replace mock data with a real data layer
2. Build the Enquiries and Admissions workflow
3. Expand Students and Teachers into full records screens
4. Add fee receipts and parent-facing fee history
5. Add announcement publishing and notification actions
6. Connect future internal notifications to Zoho Cliq if needed

## Notes for expansion

The mock data and schema placeholders are intentionally isolated so each module can be upgraded independently without changing the whole app shell.
