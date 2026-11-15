---
layout: docs
title: Jupyter & Python Toolkit
description: Run offline SQLite + Apache Parquet telemetry analysis in VS Code or JupyterLab.
---

## Installation

```bash
git clone https://github.com/mealadev/meala-jupyter.git
cd meala-jupyter
pip install -r requirements.txt
```

For real binary autopilot parsing (in addition to `.csv` and synthetic demo logs), install:

```bash
pip install pymavlink pyulog
```

## Example Workflow

```python
import sqlite3
import pandas as pd

conn = sqlite3.connect("meala_flights.db")

# 1. Query metadata across thousands of flights in milliseconds
cold_flights = pd.read_sql_query(
    "SELECT flight_id, vehicle_uid, ambient_temp_c, min_battery_v, parquet_path "
    "FROM flights WHERE ambient_temp_c <= -15.0",
    conn
)

# 2. Load only matching Parquet telemetry streams into Pandas
df_ts = pd.read_parquet(cold_flights.iloc[0]["parquet_path"])
print(df_ts[["timestamp_ms", "vbat_v", "climb_rate_mps", "vibe_z"]].head())
```
