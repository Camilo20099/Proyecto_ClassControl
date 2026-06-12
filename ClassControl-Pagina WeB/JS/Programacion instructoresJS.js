/* ============================================================
   ClassControl — Programación de Instructores
   Programacion_instructoresJS.js
   Bootstrap 5 + DataTables 1.13
   ============================================================ */

"use strict";

/* ── Data store (in-memory) ──────────────────────────────── */
const SLOT_TIMES = ["07:00 AM", "10:00 AM", "02:00 PM"];
const DAYS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

const COLOR_LABELS = {
  green:  "Área Técnica",
  blue:   "Idiomas",
  orange: "Matemáticas",
  purple: "Transversales",
};

let schedule = [
  { id: 1, subject: "Programación Web",       instructor: "Juan Pérez",    ficha: "2501234", ambiente: "201",      day: 0, slot: 0, color: "green"  },
  { id: 2, subject: "Inglés Técnico",          instructor: "Martha Ruiz",   ficha: "2501236", ambiente: "105",      day: 2, slot: 0, color: "blue"   },
  { id: 3, subject: "Análisis de Datos",       instructor: "Maria Soto",    ficha: "2501235", ambiente: "202",      day: 1, slot: 1, color: "orange" },
  { id: 4, subject: "Lógica de Programación",  instructor: "Carlos Díaz",   ficha: "2501237", ambiente: "Lab 3",   day: 3, slot: 1, color: "green"  },
  { id: 5, subject: "Ética Integral",          instructor: "Carlos Ruiz",   ficha: "2501236", ambiente: "105",      day: 2, slot: 2, color: "purple" },
  { id: 6, subject: "Taller Práctico",         instructor: "Roberto Díaz",  ficha: "2501238", ambiente: "Taller A", day: 4, slot: 2, color: "green"  },
];

let nextId = schedule.length + 1;
let editingId = null;

/* ── Bootstrap instances ─────────────────────────────────── */
let bsModal;
let bsToast;
let dtInstance;

/* ── DOM refs ────────────────────────────────────────────── */
const calendarBody   = document.getElementById("calendar-body");
const calendarView   = document.getElementById("calendar-view");
const listView       = document.getElementById("list-view");
const btnViewCal     = document.getElementById("btn-view-calendar");
const btnViewList    = document.getElementById("btn-view-list");
const btnNew         = document.getElementById("btn-new");
const btnDelete      = document.getElementById("btn-delete");
const form           = document.getElementById("scheduling-form");
const modalTitle     = document.getElementById("modal-title");
const searchInput    = document.getElementById("search-input");
const btnDark        = document.getElementById("btn-dark-toggle");
const btnSidebarToggle = document.getElementById("btn-sidebar-toggle");
const sidebar        = document.getElementById("sidebar");
const toastEl        = document.getElementById("toast");
const toastBody      = document.getElementById("toast-body");

/* ── Init ────────────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  bsModal = new bootstrap.Modal(document.getElementById("schedulingModal"));
  bsToast = new bootstrap.Toast(toastEl, { delay: 3000 });

  renderCalendar(schedule);
  initDataTable();
  bindEvents();
});

/* ── Calendar rendering ──────────────────────────────────── */
function renderCalendar(data = schedule) {
  calendarBody.innerHTML = "";

  SLOT_TIMES.forEach((time, slotIdx) => {
    // Time slot row
    const row = document.createElement("div");
    row.className = "cc-slot-row";

    // Time label
    const timeCell = document.createElement("div");
    timeCell.className = "cc-time-label";
    timeCell.textContent = time;
    row.appendChild(timeCell);

    // Day columns
    DAYS.forEach((_, dayIdx) => {
      const cell = document.createElement("div");
      cell.className = "cc-slot-cell";

      const entry = data.find(e => e.day === dayIdx && e.slot === slotIdx);
      if (entry) {
        cell.innerHTML = buildCardHTML(entry);
        cell.querySelector(".schedule-card").addEventListener("click", () => openEditModal(entry.id));
      }
      row.appendChild(cell);
    });

    calendarBody.appendChild(row);

    // Receso after first slot
    if (slotIdx === 0) calendarBody.appendChild(buildRecesoRow());
  });
}

function buildCardHTML(entry) {
  return `
    <div class="schedule-card schedule-card--${entry.color}" data-id="${entry.id}">
      <h4>${escapeHtml(entry.subject)}</h4>
      <p><strong>Inst:</strong> ${escapeHtml(entry.instructor)}</p>
      <div class="sc-meta">
        <span><span class="material-symbols-outlined">fingerprint</span> Ficha: ${escapeHtml(entry.ficha)}</span>
        <span><span class="material-symbols-outlined">room</span> Amb: ${escapeHtml(entry.ambiente)}</span>
      </div>
    </div>`;
}

function buildRecesoRow() {
  const row = document.createElement("div");
  row.className = "cc-receso-row";
  row.innerHTML = `
    <div class="cc-receso-label">Receso</div>
    <div class="cc-receso-line"></div>`;
  return row;
}

/* ── DataTable (list view) ───────────────────────────────── */
function initDataTable() {
  dtInstance = $("#schedule-table").DataTable({
    data: scheduleToTableData(schedule),
    columns: [
      { data: "subject"    },
      { data: "instructor" },
      { data: "day"        },
      { data: "slot"       },
      { data: "ficha"      },
      { data: "ambiente"   },
      { data: "area",      orderable: false },
      { data: "actions",   orderable: false },
    ],
    language: {
      url: "https://cdn.datatables.net/plug-ins/1.13.8/i18n/es-ES.json",
    },
    pageLength: 10,
    dom: "<'row mb-3'<'col-sm-6'l><'col-sm-6 d-flex justify-content-end'f>>" +
         "<'row'<'col-12'tr>>" +
         "<'row mt-3'<'col-sm-5'i><'col-sm-7 d-flex justify-content-end'p>>",
    drawCallback: bindEditButtons,
  });
}

function scheduleToTableData(data) {
  return data.map(e => ({
    subject:    escapeHtml(e.subject),
    instructor: escapeHtml(e.instructor),
    day:        DAYS[e.day] ?? "—",
    slot:       SLOT_TIMES[e.slot] ?? "—",
    ficha:      escapeHtml(e.ficha),
    ambiente:   escapeHtml(e.ambiente),
    area:       `<span class="cc-pill cc-pill--${e.color}">${COLOR_LABELS[e.color]}</span>`,
    actions:    `<button class="btn btn-sm btn-outline-secondary py-0 px-2 btn-edit-row" data-id="${e.id}">
                   <span class="material-symbols-outlined cc-icon-sm">edit</span>
                 </button>`,
    _id:        e.id,
  }));
}

function reloadDataTable() {
  if (!dtInstance) return;
  dtInstance.clear();
  dtInstance.rows.add(scheduleToTableData(schedule));
  dtInstance.draw();
}

function bindEditButtons() {
  document.querySelectorAll(".btn-edit-row").forEach(btn => {
    btn.addEventListener("click", () => openEditModal(Number(btn.dataset.id)));
  });
}

/* ── Modal helpers ───────────────────────────────────────── */
function openNewModal() {
  editingId = null;
  modalTitle.textContent = "Nueva Programación";
  form.reset();
  form.classList.remove("was-validated");
  btnDelete.classList.add("d-none");
  bsModal.show();
}

function openEditModal(id) {
  const entry = schedule.find(e => e.id === id);
  if (!entry) return;

  editingId = id;
  modalTitle.textContent = "Editar Programación";
  btnDelete.classList.remove("d-none");
  form.classList.remove("was-validated");

  document.getElementById("field-subject").value    = entry.subject;
  document.getElementById("field-instructor").value = entry.instructor;
  document.getElementById("field-ficha").value      = entry.ficha;
  document.getElementById("field-ambiente").value   = entry.ambiente;
  document.getElementById("field-day").value        = entry.day;
  document.getElementById("field-slot").value       = entry.slot;
  document.getElementById("field-color").value      = entry.color;

  bsModal.show();
}

/* ── Form submit ─────────────────────────────────────────── */
form.addEventListener("submit", e => {
  e.preventDefault();
  form.classList.add("was-validated");

  const subject    = document.getElementById("field-subject").value.trim();
  const instructor = document.getElementById("field-instructor").value.trim();

  if (!subject || !instructor) {
    showToast("Por favor completa los campos requeridos.", "error");
    return;
  }

  const data = {
    subject,
    instructor,
    ficha:    document.getElementById("field-ficha").value.trim(),
    ambiente: document.getElementById("field-ambiente").value.trim(),
    day:      parseInt(document.getElementById("field-day").value),
    slot:     parseInt(document.getElementById("field-slot").value),
    color:    document.getElementById("field-color").value,
  };

  if (editingId !== null) {
    const idx = schedule.findIndex(e => e.id === editingId);
    if (idx > -1) schedule[idx] = { id: editingId, ...data };
    showToast("Programación actualizada ✓");
  } else {
    schedule.push({ id: nextId++, ...data });
    showToast("Programación creada ✓");
  }

  bsModal.hide();
  renderCalendar(schedule);
  reloadDataTable();
});

/* ── Delete ──────────────────────────────────────────────── */
btnDelete.addEventListener("click", () => {
  if (editingId === null) return;
  if (!confirm("¿Eliminar esta programación?")) return;

  schedule = schedule.filter(e => e.id !== editingId);
  bsModal.hide();
  renderCalendar(schedule);
  reloadDataTable();
  showToast("Programación eliminada.", "error");
});

/* ── View toggle ─────────────────────────────────────────── */
function activateView(view) {
  if (view === "calendar") {
    calendarView.classList.remove("d-none");
    listView.classList.add("d-none");
    btnViewCal.classList.add("active");
    btnViewList.classList.remove("active");
  } else {
    listView.classList.remove("d-none");
    calendarView.classList.add("d-none");
    btnViewList.classList.add("active");
    btnViewCal.classList.remove("active");
    // Resize DataTable columns after display
    if (dtInstance) dtInstance.columns.adjust().draw(false);
  }
}

/* ── Search ──────────────────────────────────────────────── */
function filterCalendar(query) {
  if (!query.trim()) return renderCalendar(schedule);
  const q = query.toLowerCase();
  renderCalendar(schedule.filter(e =>
    e.subject.toLowerCase().includes(q) ||
    e.instructor.toLowerCase().includes(q) ||
    e.ficha.includes(q)
  ));
}

/* ── Dark mode (Bootstrap native) ───────────────────────── */
function toggleDarkMode() {
  const html = document.documentElement;
  const current = html.getAttribute("data-bs-theme");
  html.setAttribute("data-bs-theme", current === "dark" ? "light" : "dark");
}

/* ── Toast ───────────────────────────────────────────────── */
function showToast(msg, type = "success") {
  toastBody.textContent = msg;
  toastEl.classList.remove("bg-success", "bg-danger");
  toastEl.classList.add(type === "error" ? "bg-danger" : "bg-success");
  bsToast.show();
}

/* ── Sidebar mobile ──────────────────────────────────────── */
function toggleSidebar() {
  sidebar.classList.toggle("is-open");
}

/* ── Utility: XSS-safe escape ────────────────────────────── */
function escapeHtml(str) {
  if (typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/* ── Bind events ─────────────────────────────────────────── */
function bindEvents() {
  btnNew.addEventListener("click", openNewModal);
  btnDelete.addEventListener("click", () => {}); // handled above
  btnViewCal.addEventListener("click",  () => activateView("calendar"));
  btnViewList.addEventListener("click", () => activateView("list"));
  searchInput.addEventListener("input",  e  => filterCalendar(e.target.value));
  if (btnDark) btnDark.addEventListener("click", toggleDarkMode);
  if (btnSidebarToggle) btnSidebarToggle.addEventListener("click", toggleSidebar);
  document.addEventListener("keydown", e => { if (e.key === "Escape") bsModal?.hide(); });
}
