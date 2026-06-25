/* ===========================
   ClassControl — Pagina_PrincipalJS.js
   Bootstrap 5 + Chart.js
   =========================== */

"use strict";

/* ══════════════════════════════════════════════════
   INIT on DOMContentLoaded
══════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  initDarkMode();
  initSidebarToggle();
  initSearch();
  initProgressBars();
  animateCounters();
  initOcupacionChart();
});

/* ══════════════════════════════════════════════════
   DARK MODE  (data-bs-theme on <html>)
══════════════════════════════════════════════════ */
function initDarkMode() {
  const toggle = document.getElementById("dark-toggle");
  const html   = document.documentElement;

  const saved = localStorage.getItem("cc-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(saved ? saved === "dark" : prefersDark);

  toggle?.addEventListener("click", () => {
    const isDark = html.getAttribute("data-bs-theme") !== "dark";
    applyTheme(isDark);
    localStorage.setItem("cc-theme", isDark ? "dark" : "light");
  });
}

function applyTheme(isDark) {
  document.documentElement.setAttribute("data-bs-theme", isDark ? "dark" : "light");
  const icon = document.querySelector("#dark-toggle .material-symbols-outlined");
  if (icon) icon.textContent = isDark ? "light_mode" : "dark_mode";
}

/* ══════════════════════════════════════════════════
   SIDEBAR TOGGLE (mobile)
══════════════════════════════════════════════════ */
function initSidebarToggle() {
  const toggle  = document.getElementById("sidebar-toggle");
  const sidebar = document.getElementById("cc-sidebar");
  toggle?.addEventListener("click", () => sidebar?.classList.toggle("open"));
}

/* ══════════════════════════════════════════════════
   LIVE SEARCH (filters DataTable or table rows)
══════════════════════════════════════════════════ */
function initSearch() {
  const input = document.getElementById("search-input");
  if (!input) return;

  input.addEventListener("input", () => {
    const q = input.value.toLowerCase().trim();

    // If DataTables is present on the page use its API
    if (window.$ && $.fn && $.fn.dataTable) {
      $(".dataTable").each(function () {
        $(this).DataTable().search(q).draw();
      });
      return;
    }

    // Fallback: plain row filtering
    document.querySelectorAll("tbody tr[data-searchable]").forEach(row => {
      row.style.display = !q || row.textContent.toLowerCase().includes(q) ? "" : "none";
    });
  });
}

/* ══════════════════════════════════════════════════
   PROGRESS BARS (animate on load)
══════════════════════════════════════════════════ */
function initProgressBars() {
  document.querySelectorAll(".progress-bar[data-width]").forEach(bar => {
    bar.style.width = "0%";
    requestAnimationFrame(() => {
      setTimeout(() => { bar.style.width = bar.dataset.width; }, 120);
    });
  });
}

/* ══════════════════════════════════════════════════
   COUNTER ANIMATION
══════════════════════════════════════════════════ */
function animateCounters() {
  document.querySelectorAll("[data-count]").forEach(el => {
    const target   = parseInt(el.dataset.count, 10);
    const duration = 800;
    const step     = target / (duration / 16);
    let current    = 0;
    const timer    = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = Math.round(current).toString().padStart(2, "0");
      if (current >= target) clearInterval(timer);
    }, 16);
  });
}

/* ══════════════════════════════════════════════════
   CHART.JS — Ocupación de Ambientes
══════════════════════════════════════════════════ */
const chartDatasets = {
  "Esta semana": [60, 85, 70, 95, 40, 20],
  "Hoy":         [0,  0,  0,  0,  72,  0],
};

function initOcupacionChart() {
  const canvas = document.getElementById("ocupacionChart");
  if (!canvas || !window.Chart) return;

  const primaryColor = "#38a800";

  const chart = new Chart(canvas, {
    type: "bar",
    data: {
      labels: ["LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB"],
      datasets: [{
        label: "Ocupación (%)",
        data: chartDatasets["Esta semana"],
        backgroundColor: "rgba(56,168,0,.22)",
        hoverBackgroundColor: primaryColor,
        borderRadius: 4,
        borderSkipped: false,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: ctx => ` ${ctx.parsed.y}%`,
          },
        },
      },
      scales: {
        y: {
          min: 0, max: 100,
          ticks: {
            callback: v => v + "%",
            font: { family: "'DM Sans', sans-serif", size: 11 },
            color: "#64748b",
          },
          grid: { color: "rgba(0,0,0,.05)" },
        },
        x: {
          ticks: {
            font: { family: "'DM Sans', sans-serif", size: 11, weight: "700" },
            color: "#64748b",
          },
          grid: { display: false },
        },
      },
    },
  });

  // Week selector
  document.getElementById("chart-select")?.addEventListener("change", e => {
    const vals = chartDatasets[e.target.value] ?? chartDatasets["Esta semana"];
    chart.data.datasets[0].data = vals;
    chart.update();
  });
}

/* ══════════════════════════════════════════════════
   TOAST
══════════════════════════════════════════════════ */
function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `cc-toast ${type}`;
  toast.innerHTML = `
    <span class="material-symbols-outlined" style="font-size:1.1rem">
      ${type === "success" ? "check_circle" : "error"}
    </span>
    <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("hide");
    toast.addEventListener("animationend", () => toast.remove(), { once: true });
  }, 3500);
}

/* ══════════════════════════════════════════════════
   BOOTSTRAP FORM VALIDATION (modals)
   — triggers on submit of any .needs-validation form
══════════════════════════════════════════════════ */
document.querySelectorAll("form[novalidate]").forEach(form => {
  form.addEventListener("submit", e => {
    if (!form.checkValidity()) {
      e.preventDefault();
      e.stopPropagation();
      showToast("Completa los campos requeridos", "error");
    }
    form.classList.add("was-validated");
  });
});
