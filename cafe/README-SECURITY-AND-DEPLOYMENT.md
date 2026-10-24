# BOBA Café — Security Hardening, Setup & Deployment Guide

This project is the complete, hardened rebuild of **BOBA Café**, designed for deployment at:
- **Customer Table Menu**: `https://jordanworld.co/cafe`
- **Staff Operations Portal (Apex)**: `https://jordanworld.co/cafe/apex`

---

## 1. Quick Setup for Your Brand New Supabase Project

You will be running this on a new Supabase project created specifically for BOBA.

### Step 1: Run the Database Setup Script
1. Open your Supabase SQL Editor directly: **[https://supabase.com/dashboard/project/neclbjxahygpwoicjbsn/sql/new](https://supabase.com/dashboard/project/neclbjxahygpwoicjbsn/sql/new)**
2. Open [`boba-supabase-setup.sql`](file:///c:/Users/work/Desktop/boba3/boba-supabase-setup.sql) in this directory.
3. Copy its **entire** contents, paste it into the Supabase SQL Editor, and click **Run** (`Ctrl+Enter`).
5. This automatically:
   - Provisions all 8 core tables: `boba_menu`, `boba_table_sessions`, `boba_order_rounds`, `boba_table_pins`, `boba_staff_pins`, `boba_staff_sessions`, `boba_table_qr_tokens`, `boba_rate_limits`.
   - Seeds the full BOBA menu with all 40+ dishes, images, prices, variants, categories, and tags.
   - Seeds default staff credentials:
     - **Staff PIN**: `777777`
     - **Manager PIN**: `111111`
   - Seeds tables 1 through 20 with table PINs and secure opaque QR tokens (`t1_...`, `t2_...`).
   - Defines all `SECURITY DEFINER` RPCs (`boba_place_order`, `boba_staff_login`, `boba_resolve_qr_token`, etc.).
   - Applies strict Row Level Security (RLS) blocking any direct anon writes.
   - Configures Supabase Realtime publication on `boba_table_sessions`, `boba_order_rounds`, and `boba_menu`.

---

## 2. Target Hosting & URL Routing

The app is built to handle hosting at `jordanworld.co/cafe`:

| URL | View | Description |
| :--- | :--- | :--- |
| `https://jordanworld.co/cafe` | Customer Menu | Guest landing / table menu. |
| `https://jordanworld.co/cafe/?t=t3_abc123` | Table Menu (Secure QR) | Resolves opaque token `t3_abc123` to Table 3. |
| `https://jordanworld.co/cafe/apex` | Staff Portal (Apex) | Live order dashboard, table manager, menu editor, and analytics. |

### Routing Configuration
- `vercel.json` is configured with clean rewrites:
  - `/cafe/apex` -> `/apex.html`
  - `/cafe` -> `/index.html`
  - `/boba/apex` -> `/apex.html`
  - `/boba` -> `/index.html`
  - `/apex` -> `/apex.html`
  - `/` -> `/index.html`
- Route detection in JavaScript automatically detects `/cafe/apex` or `/apex` or `window.__BOBA_APEX__` and switches into staff mode.
- QR code generation inside Apex uses `getGuestTableUrl()`, guaranteeing that printed or copied QR links point to `jordanworld.co/cafe/?t=token` and **never expose the staff `/apex` path**.

---

## 3. Security Hardening Summary

| Threat / Risk | How It Was Hardened in BOBA |
| :--- | :--- |
| **Anon Key DB Tampering** | **Row Level Security (RLS) Lockdown**: Anon write permissions are completely revoked. All order placements, round status updates, menu edits, and table clearing go strictly through Postgres `SECURITY DEFINER` RPCs. |
| **Weak Staff PIN Checking** | **Server-Side Token Auth**: Staff PINs are verified inside Postgres (`boba_staff_login`). Upon verification, Postgres generates a cryptographically random 32-byte token stored in `sessionStorage`. All administrative operations require a valid server session token. |
| **Brute Force Staff PINs** | Postgres enforces a 5-failed-attempt lockout (5 minutes) and rate limiting (max 15 attempts in 5 minutes). |
| **Guessable Table URLs (`?table=5`)** | **Opaque QR Tokens (`?t=secret`)**: Tables use random tokens like `?t=t5_9f8a2b...`. Staff can rotate tokens anytime in Apex to invalidate leaked URLs. Legacy `?table=5` remains supported as a backward-compatible fallback. |
| **Table OTP Brute Forcing** | `boba_place_order` rate-limits OTP attempts to 5 guesses per 5 minutes per session. Table OTPs are 6 digits. |
| **Client-Side Price Tampering** | All order items and variants are repriced server-side against the official `boba_menu` table in Postgres. Client discount percentages are capped strictly at 5%. |
| **Order Flooding / Spam** | Postgres throttles orders via `boba_rate_limits`: Max 10 orders per 60s per table, and max 5 orders per 60s per phone number. |
| **Customer PII Exposure** | In Apex, guest phone numbers are masked by default (`+91 ••••• •1234`) with a quick unmask toggle for staff. In customer order history, numbers are masked to protect dining party privacy. |

---

## 4. Product & UX Enhancements

- **Active Party Join Banner**: When a friend scans a table that already has an open session, a welcoming banner appears: *"Table X has an active party • Enter Code to Join"*.
- **Shared Table OTP**: Once joined, the OTP is stored on their device so any member of the party can see it in their header and invite other friends. Staff can also view the active OTP for any table on the Apex dashboard.
- **No Premature 2-Hour Logout**: Guests remain logged in for the duration of their dining session until the table is cleared by staff.
- **Instant Clear-Table Sync**: Connected via Supabase Realtime + 7-second background poll. When staff clears Table X in Apex, all open devices on Table X are instantly notified (*"Table bill was settled. Table X is now free. Thank you for dining with BOBA!"*) and their session resets cleanly without needing manual refresh.
- **Initial Menu Ready Out-of-the-Box**: `boba-supabase-setup.sql` automatically populates the complete BOBA catalog with classic milk teas, brown sugar boba, fruit teas, signatures, slushies, toppings, snacks (Taiyaki, mochi, poppers), and coffee.

---

## 5. File Inventory

- `index.html`: Customer menu application for `jordanworld.co/boba`.
- `apex.html`: Staff & manager portal for `jordanworld.co/boba/apex`.
- `boba-supabase-setup.sql`: Complete PostgreSQL database initialization script for your new Supabase project.
- `vercel.json`: Vercel rewrites configuration.
- `package.json` & `vite.config.js`: Vite build configuration.
