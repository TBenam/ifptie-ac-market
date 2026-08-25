# Bagisto Backend Integration & Deployment Guide

This directory contains the Docker configuration and setup guides to run the **Bagisto Commerce Engine** (Laravel-based) for the IFPTIE AC Market Headless e-Commerce platform.

## Quickstart (Docker Deployment)

To run Bagisto locally or on a VPS (DigitalOcean / AWS / Linode):

1. Make sure **Docker** and **Docker Compose** are installed.
2. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
3. Start the containers:
   ```bash
   docker-compose up -d
   ```
4. Access the Bagisto Admin Panel at:
   - **URL**: `http://localhost:8000/admin`
   - **Default Admin Credentials**:
     - Email: `admin@example.com`
     - Password: `adminpassword`

## Headless API & Storefront Connection

The Next.js storefront connects to Bagisto via REST / GraphQL Headless APIs.

In your `storefront/.env.local`, set:
```env
NEXT_PUBLIC_BAGISTO_API_URL=http://localhost:8000/api/v1
```

## Features Supported Out-of-the-Box
- **Catalog Management**: Products, Categories, Attributes, Variants.
- **Inventory Control**: Real-time stock tracking across multiple warehouses.
- **Payment Methods**: Cash on Delivery (COD), Stripe, PayPal, Custom Gateways.
- **Orders & Customers**: Order tracking, status updates, customer accounts, and guest checkout.
