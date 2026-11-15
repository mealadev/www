---
layout: docs
title: Canonical Parquet Schema
description: Unified telemetry column definitions and SI units across ArduPilot, PX4, and INAV.
---

Every ingested log is normalized into the following canonical DataFrame schema before being written to `.parquet`:

| Column Name | Type | Units | ArduPilot Source | PX4 ULog Source |
| :--- | :--- | :--- | :--- | :--- |
| `timestamp_ms` | `float64` | milliseconds | `TimeUS / 1000` | `timestamp / 1000` |
| `lat` | `float64` | degrees | `GPS.Lat` | `vehicle_gps_position.lat` |
| `lon` | `float64` | degrees | `GPS.Lng` | `vehicle_gps_position.lon` |
| `alt_m` | `float32` | meters (AMSL) | `GPS.Alt` | `vehicle_gps_position.alt` |
| `roll_deg` | `float32` | degrees | `ATT.Roll` | `vehicle_attitude` (Euler) |
| `pitch_deg` | `float32` | degrees | `ATT.Pitch` | `vehicle_attitude` (Euler) |
| `yaw_deg` | `float32` | degrees | `ATT.Yaw` | `vehicle_attitude` (Euler) |
| `climb_rate_mps` | `float32` | m/s | `CTUN.CRate` | `vehicle_local_position.vz * -1` |
| `vbat_v` | `float32` | Volts | `BAT.Volt` | `battery_status.voltage_v` |
| `curr_a` | `float32` | Amps | `BAT.Curr` | `battery_status.current_a` |
| `vibe_z` | `float32` | m/s² | `VIBE.VibeZ` | `sensor_accel` variance |
| `throttle_pct` | `float32` | % (0–100) | `CTUN.ThO` | `actuator_controls` |
