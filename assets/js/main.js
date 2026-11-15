document.addEventListener("DOMContentLoaded", () => {
  // Mobile Navigation Toggle
  const navToggle = document.getElementById("navToggle");
  const siteNav = document.getElementById("siteNav");
  if (navToggle && siteNav) {
    navToggle.addEventListener("click", () => {
      siteNav.classList.toggle("open");
    });
  }

  // Interactive SQL Query Preview on Landing Page
  const sampleFlights = [
    { id: "FLT-2019-0114", vehicle: "TailSitter-01", stack: "ArduPilot", temp: -21.5, vbat: "19.1V", alert: true },
    { id: "FLT-2019-1219", vehicle: "TailSitter-01", stack: "ArduPilot", temp: -20.2, vbat: "19.4V", alert: true },
    { id: "FLT-2026-0208", vehicle: "TailSitter-02", stack: "PX4", temp: -17.0, vbat: "22.4V", alert: false },
    { id: "FLT-2026-0514", vehicle: "Mapper-Quad-04", stack: "ArduPilot", temp: 18.4, vbat: "14.3V", alert: false },
    { id: "FLT-2026-0822", vehicle: "FPV-Scout-07", stack: "INAV", temp: 27.1, vbat: "21.8V", alert: false }
  ];

  const presets = {
    cold: {
      sql: "SELECT flight_id, vehicle_uid, autopilot, ambient_temp_c, min_vbat\nFROM flights\nWHERE ambient_temp_c <= -15.0 AND had_alert = TRUE;",
      filter: f => f.temp <= -15.0 && f.alert
    },
    px4: {
      sql: "SELECT flight_id, vehicle_uid, autopilot, ambient_temp_c, min_vbat\nFROM flights\nWHERE autopilot = 'PX4' ORDER BY takeoff_time DESC;",
      filter: f => f.stack === "PX4"
    },
    all: {
      sql: "SELECT flight_id, vehicle_uid, autopilot, ambient_temp_c, min_vbat\nFROM flights\nORDER BY takeoff_time DESC LIMIT 5;",
      filter: () => true
    }
  };

  const sqlBox = document.getElementById("heroSqlOutput");
  const tbody = document.getElementById("heroTableBody");
  const presetBtns = document.querySelectorAll(".preset-btn");

  function renderPreset(key) {
    if (!sqlBox || !tbody || !presets[key]) return;
    sqlBox.textContent = presets[key].sql;
    const rows = sampleFlights.filter(presets[key].filter);
    tbody.innerHTML = rows.map(r => `
      <tr>
        <td><strong>${r.id}</strong></td>
        <td>${r.vehicle}</td>
        <td>${r.stack}</td>
        <td>${r.temp}°C</td>
        <td>${r.vbat}</td>
        <td><span class="${r.alert ? 'tag-alert' : 'tag-ok'}">${r.alert ? 'ALERT' : 'NOMINAL'}</span></td>
      </tr>
    `).join("");
  }

  presetBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      presetBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderPreset(btn.dataset.preset);
    });
  });

  renderPreset("cold");
});
