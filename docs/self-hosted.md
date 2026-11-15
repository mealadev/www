---
layout: docs
title: Self-Hosted Server Quickstart
description: Deploy Meala with Docker Compose on an on-premise server, NAS, or cloud VM.
---

## Prerequisites

* Docker Engine 24+ and Docker Compose v2
* At least 2 GB RAM and disk storage for raw binary logs + compressed Parquet files

## 1. Clone & Configure

```bash
git clone https://github.com/mealadev/meala.git
cd meala
cp .env.example .env
```

Edit `.env` to set your database credentials and organization ingestion API key (`ORG_API_KEY`).

## 2. Launch the Stack

```bash
docker compose up --build -d
```

This starts three containers:
* **`meala-web` (`http://localhost:8080`):** Multi-user web dashboard for uploading, filtering, and comparing flight logs.
* **`meala-api` (`http://localhost:8000`):** FastAPI ingestion and query service with Swagger docs at `/docs`.
* **`meala-postgres`:** PostgreSQL 16 database storing indexed flight rows and controller parameters.

## 3. Automated Hardware / CLI Upload

Any ground station script or onboard ESP32-S3 Wi-Fi bridge can push logs directly over HTTP:

```bash
curl -X POST http://localhost:8000/api/v1/flights/upload \
  -H "X-API-Key: your_org_api_key" \
  -F "file=@flight_042.bin" \
  -F "vehicle_uid=TailSitter-VTOL-01" \
  -F "battery_uid=BAT-6S-009" \
  -F "autopilot_type=ArduPilot" \
  -F "pilot=Brandon"
```
