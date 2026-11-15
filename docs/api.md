---
layout: docs
title: REST API Reference
description: HTTP endpoints for log ingestion, SQL metadata filtering, and downsampled series retrieval.
---

All endpoints accept an optional `X-API-Key` header matching `ORG_API_KEY`.

### `POST /api/v1/flights/upload`
Multipart form upload that stores the raw log, generates a normalized `.parquet` file, enriches historical takeoff weather via Open-Meteo, and indexes summary metrics in PostgreSQL.

**Form Fields:**
* `file` (required): Binary or CSV flight log
* `vehicle_uid` (string): Airframe identifier
* `battery_uid` (string): Battery pack serial or CAN UID
* `autopilot_type` (string): `ArduPilot`, `PX4`, or `INAV`
* `pilot` (string): Pilot name
* `notes` (string): Flight or tuning notes

---

### `GET /api/v1/flights`
Returns filtered flight summary rows ordered by `takeoff_time DESC`.

**Query Parameters:**
* `autopilot_type`: Filter by stack (`ArduPilot`, `PX4`, `INAV`)
* `max_temp_c`: Maximum ambient temperature in °C (e.g., `-15`)
* `only_alerts`: Boolean (`true` to return only flights with voltage sag or EKF/vibration alerts)
* `q`: Case-insensitive text search across vehicle, pilot, and notes

---

### `GET /api/v1/flights/{flight_id}/series`
Returns downsampled JSON arrays (`t_sec`, `vbat_v`, `climb_rate_mps`, `throttle_pct`) from the flight's Parquet file for fast web plotting.
