/**
 * FichasJS.js — ClassControl
 *
 * - Data store en memoria (sustituir por API en producción)
 * - DataTables con idioma ES y filtros externos
 * - CRUD completo: crear, ver detalle, editar, eliminar
 * - Modales Bootstrap 5
 * - Toasts Bootstrap 5
 * - Dark mode con localStorage
 * - Sidebar toggle móvil
 */

'use strict';

/* ══════════════════════════════════════════
   1. DATA STORE
══════════════════════════════════════════ */
const fichas = [
  {
    id: 1, codigo: '2560342',
    programa: 'Análisis y Desarrollo de Software',
    nivel: 'Tecnólogo', sede: 'Sede Central',
    fechaInicio: '2024-01-02', fechaFin: '2025-12-15',
    modalidad: 'Presencial', aprendices: 28,
    estado: 'Activa', notas: '',
  },
  {
    id: 2, codigo: '2451980',
    programa: 'Gestión Contable y Financiera',
    nivel: 'Técnico', sede: 'Sede Norte',
    fechaInicio: '2023-06-15', fechaFin: '2024-06-14',
    modalidad: 'Virtual', aprendices: 45,
    estado: 'En proceso', notas: '',
  },
  {
    id: 3, codigo: '2304112',
    programa: 'Mantenimiento de Motores Diesel',
    nivel: 'Técnico', sede: 'Centro Industrial',
    fechaInicio: '2022-02-20', fechaFin: '2023-02-19',
    modalidad: 'Presencial', aprendices: 22,
    estado: 'Finalizada', notas: '',
  },
  {
    id: 4, codigo: '2670221',
    programa: 'Producción Multimedia',
    nivel: 'Tecnólogo', sede: 'Sede Central',
    fechaInicio: '2024-05-10', fechaFin: '2026-05-09',
    modalidad: 'Distancia', aprendices: 32,
    estado: 'Activa', notas: '',
  },
  {
    id: 5, codigo: '2789045',
    programa: 'Ciberseguridad Empresarial',
    nivel: 'Tecnólogo', sede: 'Sede Central',
    fechaInicio: '2024-08-01', fechaFin: '2026-07-31',
    modalidad: 'Presencial', aprendices: 20,
    estado: 'Activa', notas: '',
  },
  {
    id: 6, codigo: '2399871',
    programa: 'Diseño Gráfico Digital',
    nivel: 'Técnico', sede: 'Sede Norte',
    fechaInicio: '2023-03-01', fechaFin: '2024-02-28',
    modalidad: 'Virtual', aprendices: 35,
    estado: 'Finalizada', notas: '',
  },
];

let nextId = fichas.length + 1;


/* ══════════════════════════════════════════
   2. UTILIDADES
══════════════════════════════════════════ */
function formatDate(iso) {
  if (!iso) return '—';
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
}

function modalidadChip(mod) {
  const map = {
    Presencial: { cls: 'cc-chip-presencial', icon: 'bi-house'         },
    Virtual:    { cls: 'cc-chip-virtual',    icon: 'bi-laptop'         },
    Distancia:  { cls: 'cc-chip-distancia',  icon: 'bi-person-walking' },
  };
  const m = map[mod] ?? { cls: 'cc-chip-presencial', icon: 'bi-question' };
  return `<span class="cc-chip ${m.cls}"><i class="bi ${m.icon}"></i>${mod}</span>`;
}

function estadoBadge(est) {
  const map = {
    'Activa':     'cc-badge-activa',
    'En proceso': 'cc-badge-proceso',
    'Finalizada': 'cc-badge-finalizada',
  };
  return `<span class="cc-badge ${map[est] ?? 'cc-badge-proceso'}">${est}</span>`;
}


/* ══════════════════════════════════════════
   3. DATATABLES — INIT
══════════════════════════════════════════ */
let dataTable;

$(document).ready(function () {

  // Llenar tbody antes de inicializar DataTables
  renderAllRows();

  dataTable = $('#tabla-fichas').DataTable({
    language: {
      url: 'https://cdn.datatables.net/plug-ins/1.13.8/i18n/es-ES.json',
    },
    pageLength: 8,
    order: [],
    columnDefs: [{ orderable: false, targets: -1 }],
    dom: '<"d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3"lf>t<"d-flex justify-content-between align-items-center flex-wrap gap-2 mt-3"ip>',
  });

  // Búsqueda desde el input externo del header
  document.getElementById('search-input')?.addEventListener('input', function () {
    dataTable.search(this.value).draw();
  });

  // Filtros externos por columna (estado, modalidad, sede)
  $.fn.dataTable.ext.search.push(function (settings, data) {
    if (settings.nTable.id !== 'tabla-fichas') return true;

    const estado    = document.getElementById('filter-estado')?.value    || '';
    const modalidad = document.getElementById('filter-modalidad')?.value || '';
    const sede      = document.getElementById('filter-sede')?.value      || '';

    // data[x] es el texto plano de cada columna (0-indexed)
    // col 5 = Estado, col 3 = Modalidad, col 1 = Programa+meta (contiene sede)
    const okEstado    = !estado    || data[5].includes(estado);
    const okModalidad = !modalidad || data[3].includes(modalidad);
    const okSede      = !sede      || data[1].includes(sede);

    return okEstado && okModalidad && okSede;
  });

  ['filter-estado', 'filter-modalidad', 'filter-sede'].forEach(id => {
    document.getElementById(id)?.addEventListener('change', () => dataTable.draw());
  });
});


/* ══════════════════════════════════════════
   4. RENDERIZADO DE FILAS
══════════════════════════════════════════ */
function renderAllRows() {
  const tbody = document.getElementById('fichas-tbody');
  if (!tbody) return;
  tbody.innerHTML = fichas.map(rowHTML).join('');
  attachRowEvents();
}

function rowHTML(f) {
  return `
    <tr data-id="${f.id}">
      <td class="cc-ficha-codigo">${f.codigo}</td>
      <td>
        <div class="cc-prog-name">${f.programa}</div>
        <div class="cc-prog-meta">${f.nivel} • ${f.sede}</div>
      </td>
      <td class="text-center">
        <div class="cc-fecha-main">${formatDate(f.fechaInicio)}</div>
        <div class="cc-fecha-sub">a ${formatDate(f.fechaFin)}</div>
      </td>
      <td>${modalidadChip(f.modalidad)}</td>
      <td class="text-center fw-bold">${f.aprendices}</td>
      <td>${estadoBadge(f.estado)}</td>
      <td class="text-end">
        <div class="d-flex justify-content-end gap-1">
          <button class="cc-row-btn cc-view"   data-view="${f.id}" title="Ver detalle">
            <i class="bi bi-eye"></i>
          </button>
          <button class="cc-row-btn cc-edit"   data-edit="${f.id}" title="Editar">
            <i class="bi bi-pencil"></i>
          </button>
          <button class="cc-row-btn cc-delete" data-del="${f.id}"  title="Eliminar">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </td>
    </tr>`;
}

function attachRowEvents() {
  document.querySelectorAll('[data-view]').forEach(btn =>
    btn.addEventListener('click', () => openDetail(+btn.dataset.view)));
  document.querySelectorAll('[data-edit]').forEach(btn =>
    btn.addEventListener('click', () => openEdit(+btn.dataset.edit)));
  document.querySelectorAll('[data-del]').forEach(btn =>
    btn.addEventListener('click', () => openConfirm(+btn.dataset.del)));
}

/* Refresca la tabla completa tras un cambio en el array */
function refreshTable() {
  if (dataTable) {
    dataTable.clear().destroy();
  }
  renderAllRows();
  dataTable = $('#tabla-fichas').DataTable({
    language: { url: 'https://cdn.datatables.net/plug-ins/1.13.8/i18n/es-ES.json' },
    pageLength: 8,
    order: [],
    columnDefs: [{ orderable: false, targets: -1 }],
    dom: '<"d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3"lf>t<"d-flex justify-content-between align-items-center flex-wrap gap-2 mt-3"ip>',
  });
}


/* ══════════════════════════════════════════
   5. MODAL — NUEVA / EDITAR FICHA
══════════════════════════════════════════ */
const formModalEl = document.getElementById('modal-form');
const formModal   = formModalEl ? new bootstrap.Modal(formModalEl) : null;
const fichaForm   = document.getElementById('ficha-form');
const formTitle   = document.getElementById('form-modal-title');
const btnFormDel  = document.getElementById('btn-form-delete');

let editingId = null;

document.getElementById('btn-new-ficha')?.addEventListener('click', openNew);

function openNew() {
  editingId = null;
  if (formTitle) formTitle.innerHTML = '<i class="bi bi-file-earmark-plus me-2"></i>Nueva Ficha';
  fichaForm?.reset();
  fichaForm?.classList.remove('was-validated');
  btnFormDel?.classList.add('d-none');
  formModal?.show();
}

function openEdit(id) {
  const f = fichas.find(x => x.id === id);
  if (!f) return;

  detailModal?.hide();          // cierra detalle si estaba abierto
  editingId = id;

  if (formTitle) formTitle.innerHTML = '<i class="bi bi-pencil me-2"></i>Editar Ficha';
  fichaForm?.classList.remove('was-validated');
  btnFormDel?.classList.remove('d-none');

  document.getElementById('f-codigo').value     = f.codigo;
  document.getElementById('f-programa').value   = f.programa;
  document.getElementById('f-nivel').value      = f.nivel;
  document.getElementById('f-sede').value       = f.sede;
  document.getElementById('f-modalidad').value  = f.modalidad;
  document.getElementById('f-inicio').value     = f.fechaInicio;
  document.getElementById('f-fin').value        = f.fechaFin;
  document.getElementById('f-aprendices').value = f.aprendices;
  document.getElementById('f-estado').value     = f.estado;
  document.getElementById('f-notas').value      = f.notas ?? '';

  formModal?.show();
}

fichaForm?.addEventListener('submit', e => {
  e.preventDefault();

  const codigo   = document.getElementById('f-codigo').value.trim();
  const programa = document.getElementById('f-programa').value.trim();

  if (!codigo || !programa) {
    fichaForm.classList.add('was-validated');
    showToast('Completa los campos obligatorios.', 'error');
    return;
  }

  const data = {
    codigo,
    programa,
    nivel:       document.getElementById('f-nivel').value,
    sede:        document.getElementById('f-sede').value,
    modalidad:   document.getElementById('f-modalidad').value,
    fechaInicio: document.getElementById('f-inicio').value,
    fechaFin:    document.getElementById('f-fin').value,
    aprendices:  parseInt(document.getElementById('f-aprendices').value) || 0,
    estado:      document.getElementById('f-estado').value,
    notas:       document.getElementById('f-notas').value.trim(),
  };

  if (editingId !== null) {
    const idx = fichas.findIndex(x => x.id === editingId);
    if (idx > -1) fichas[idx] = { id: editingId, ...data };
    showToast('Ficha actualizada correctamente ✓');
  } else {
    fichas.push({ id: nextId++, ...data });
    showToast('Ficha creada correctamente ✓');
  }

  formModal?.hide();
  fichaForm.classList.remove('was-validated');
  refreshTable();
});

btnFormDel?.addEventListener('click', () => {
  formModal?.hide();
  openConfirm(editingId);
});

formModalEl?.addEventListener('hidden.bs.modal', () => {
  fichaForm?.reset();
  fichaForm?.classList.remove('was-validated');
});


/* ══════════════════════════════════════════
   6. MODAL — DETALLE (solo lectura)
══════════════════════════════════════════ */
const detailModalEl = document.getElementById('modal-detail');
const detailModal   = detailModalEl ? new bootstrap.Modal(detailModalEl) : null;
const detailContent = document.getElementById('detail-content');
const btnDetailEdit = document.getElementById('btn-detail-edit');

let viewingId = null;

function openDetail(id) {
  const f = fichas.find(x => x.id === id);
  if (!f) return;
  viewingId = id;

  const iconMap = { Presencial: 'bi-house', Virtual: 'bi-laptop', Distancia: 'bi-person-walking' };
  const icon    = iconMap[f.modalidad] ?? 'bi-question';

  detailContent.innerHTML = `
    <div class="cc-detail-row">
      <span class="cc-detail-label">Código</span>
      <span class="cc-detail-value cc-mono">${f.codigo}</span>
    </div>
    <div class="cc-detail-row">
      <span class="cc-detail-label">Programa de Formación</span>
      <span class="cc-detail-value">${f.programa}</span>
    </div>
    <div class="cc-detail-row">
      <span class="cc-detail-label">Nivel</span>
      <span class="cc-detail-value">${f.nivel}</span>
    </div>
    <div class="cc-detail-row">
      <span class="cc-detail-label">Sede</span>
      <span class="cc-detail-value">${f.sede}</span>
    </div>
    <div class="row g-0">
      <div class="col-6 cc-detail-row pe-3">
        <span class="cc-detail-label">Fecha Inicio</span>
        <span class="cc-detail-value">${formatDate(f.fechaInicio)}</span>
      </div>
      <div class="col-6 cc-detail-row">
        <span class="cc-detail-label">Fecha Fin</span>
        <span class="cc-detail-value">${formatDate(f.fechaFin)}</span>
      </div>
    </div>
    <div class="cc-detail-row">
      <span class="cc-detail-label">Modalidad</span>
      <span class="cc-detail-value">
        <i class="bi ${icon} me-1"></i>${f.modalidad}
      </span>
    </div>
    <div class="cc-detail-row">
      <span class="cc-detail-label">N.º Aprendices</span>
      <span class="cc-detail-value">${f.aprendices}</span>
    </div>
    <div class="cc-detail-row">
      <span class="cc-detail-label">Estado</span>
      <span class="cc-detail-value">${estadoBadge(f.estado)}</span>
    </div>
    ${f.notas ? `
    <div class="cc-detail-row">
      <span class="cc-detail-label">Notas</span>
      <span class="cc-detail-value text-muted">${f.notas}</span>
    </div>` : ''}
  `;

  detailModal?.show();
}

btnDetailEdit?.addEventListener('click', () => {
  if (viewingId !== null) openEdit(viewingId);
});


/* ══════════════════════════════════════════
   7. MODAL — CONFIRMAR ELIMINACIÓN
══════════════════════════════════════════ */
const confirmModalEl = document.getElementById('modal-confirm');
const confirmModal   = confirmModalEl ? new bootstrap.Modal(confirmModalEl) : null;
const confirmName    = document.getElementById('confirm-ficha-name');
const btnConfirmDel  = document.getElementById('btn-confirm-delete');

let deletingId = null;

function openConfirm(id) {
  const f = fichas.find(x => x.id === id);
  if (!f) return;
  deletingId = id;
  if (confirmName) confirmName.textContent = `${f.codigo} — ${f.programa}`;
  confirmModal?.show();
}

btnConfirmDel?.addEventListener('click', () => {
  const idx = fichas.findIndex(x => x.id === deletingId);
  if (idx > -1) fichas.splice(idx, 1);
  confirmModal?.hide();
  refreshTable();
  showToast('Ficha eliminada.', 'error');
});


/* ══════════════════════════════════════════
   8. TOASTS BOOTSTRAP 5
══════════════════════════════════════════ */
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const id   = 'toast-' + Date.now();
  const icon = type === 'success'
    ? 'bi-check-circle-fill text-success'
    : 'bi-exclamation-circle-fill text-danger';

  container.insertAdjacentHTML('beforeend', `
    <div id="${id}" class="toast align-items-center border-0 shadow-sm" role="alert">
      <div class="d-flex">
        <div class="toast-body d-flex align-items-center gap-2"
             style="font-family:'Plus Jakarta Sans',sans-serif;font-size:.875rem">
          <i class="bi ${icon}"></i>
          <span>${message}</span>
        </div>
        <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast"></button>
      </div>
    </div>`);

  const el    = document.getElementById(id);
  const toast = new bootstrap.Toast(el, { delay: 3500 });
  toast.show();
  el.addEventListener('hidden.bs.toast', () => el.remove());
}


/* ══════════════════════════════════════════
   9. DARK MODE
══════════════════════════════════════════ */
(function initDarkMode() {
  const btn  = document.getElementById('dark-toggle');
  const icon = document.getElementById('dark-icon');
  const html = document.documentElement;

  function applyTheme(dark) {
    html.classList.toggle('dark', dark);
    if (icon) icon.className = dark ? 'bi bi-sun' : 'bi bi-moon';
  }

  const saved      = localStorage.getItem('cc-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(saved ? saved === 'dark' : prefersDark);

  btn?.addEventListener('click', () => {
    const isDark = html.classList.toggle('dark');
    localStorage.setItem('cc-theme', isDark ? 'dark' : 'light');
    applyTheme(isDark);
  });
})();


/* ══════════════════════════════════════════
   10. SIDEBAR TOGGLE (móvil)
══════════════════════════════════════════ */
(function initSidebar() {
  const toggle  = document.getElementById('sidebarToggle');
  const sidebar = document.getElementById('cc-sidebar');
  const overlay = document.getElementById('sidebarOverlay');

  const open  = () => { sidebar?.classList.add('show');    overlay?.classList.add('show'); };
  const close = () => { sidebar?.classList.remove('show'); overlay?.classList.remove('show'); };

  toggle?.addEventListener('click', () =>
    sidebar?.classList.contains('show') ? close() : open());
  overlay?.addEventListener('click', close);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
})();
