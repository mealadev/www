---
layout: docs
title: Overview & Concepts
description: How Meala standardizes heterogeneous UAV telemetry into SQL-queryable Apache Parquet datasets.
---

## Why Meala Exists

Small UAV engineering teams often lose critical flight logs across personal laptops, overwritten SD cards, and unindexed cloud folders. When an aircraft experiences an intermittent failure—such as an electrolytic capacitor losing capacitance at `-20°C`—manually opening hundreds of binary logs one by one is slow and error-prone.

Meala solves this by separating **flight summary metadata** from **high-frequency time-series streams**:

1. **Summary Metadata (PostgreSQL / SQLite):** One row per flight containing vehicle ID, battery UID, pilot, firmware Git hash, controller parameters (`JSONB`), anomaly flags, and historical takeoff weather.
2. **Normalized Telemetry (Apache Parquet):** Every log (`.bin`, `.ulg`, `.tlog`, `.bbl`) is converted into a standardized Pandas DataFrame and saved as a compressed `.parquet` file—reducing storage size by 70–85% and enabling millisecond slice loading.

## Next Steps

* **[Self-Hosted Server Quickstart](/docs/self-hosted/):** Deploy the multi-user Docker Compose stack for your team.
* **[Jupyter & Python Quickstart](/docs/jupyter/):** Run local SQLite + Parquet flight forensics in VS Code or JupyterLab.
* **[Canonical Parquet Schema](/docs/schema/):** View the standardized column names and SI units shared across autopilot stacks.
