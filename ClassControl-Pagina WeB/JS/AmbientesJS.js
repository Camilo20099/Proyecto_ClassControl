/* ============================================================
   AmbientesJS.js — ClassControl
   CRUD + DataTables + Chart.js + Filtros externos
   Adaptado al sistema de diseño compartido (Bootstrap 5)
   Toast CSS puro (mismo patrón que Programas y Actividades)
   ============================================================ */

'use strict';

/* ──────────────────────────────────────────
   1. DATOS INICIALES
────────────────────────────────────────── */
const ambientes = [
  {
    id: 1,
    nombre: 'Ambiente 402',
    ubicacion: 'Torre A - Piso 4',
    sede: 'Sede Central',
    capacidad: 35,
    tipo: 'Aula Polivalente',
    estado: 'disponible',
    recursos: 'Video beam, tablero digital',
    observaciones: 'Disponible para formación transversal',
  },
  {
    id: 2,
    nombre: 'Laboratorio TIC 02',
    ubicacion: 'Bloque 2 - Piso 1',
    sede: 'Sede TIC',
    capacidad: 25,
    tipo: 'Laboratorio',
    estado: 'ocupado',
    recursos: '25 computadores, red cableada',
    observaciones: 'Reservado para desarrollo de software',
  },
  {
    id: 3,
    nombre: 'Auditorio Principal',
    ubicacion: 'Entrada Central',
    sede: 'Sede Central',
    capacidad: 120,
    tipo: 'Auditorio',
    estado: 'mantenimiento',
    recursos: 'Sonido, pantalla principal',
    observaciones: 'Revisión de sonido programada',
  },
  {
    id: 4,
    nombre: 'Taller de Automatización',
    ubicacion: 'Bloque Industrial',
    sede: 'Centro de Electricidad y Automatizacion',
    capacidad: 28,
    tipo: 'Taller',
    estado: 'disponible',
    recursos: 'PLC, bancos de trabajo',
    observaciones: '',
  },
  {
    id: 5,
    nombre: 'Ambiente Diseño 301',
    ubicacion: 'Piso 3',
    sede: 'Centro de Diseno y Metrologia',
    capacidad: 32,
    tipo: 'Aula Polivalente',
    estado: 'inhabilitado',
    recursos: 'Mesas colaborativas',
    observaciones: 'Pendiente adecuación eléctrica',
  },
];

let tablaAmbientes;
let chartAmbientes;
let deleteTargetId = null;

/* ──────────────────────────────────────────
   2. METADATOS DE ESTADO Y TIPO
────────────────────────────────────────── */
const estadoMeta = {
  disponible:    { texto: 'Disponible',    clase: 'status-disponible'    },
  ocupado:       { texto: 'Ocupado',       clase: 'status-ocupado'       },
  mantenimiento: { texto: 'Mantenimiento', clase: 'status-mantenimiento' },
  inhabilitado:  { texto: 'Inhabilitado',  clase: 'status-inhabilitado'  },
};

const tipoMeta = {
  'Laboratorio':      { clase: 'badge-lab',       icono: 'computer'       },
  'Aula Polivalente': { clase: 'badge-aula',      icono: 'cast_for_education' },
  'Auditorio':        { clase: 'badge-auditorio', icono: 'campaign'       },
  'Taller':           { clase: 'badge-taller',    icono: 'handyman'       },
};

/* ──────────────────────────────────────────
   3. UTILIDADES
────────────────────────────────────────── */
const $id = id => document.getElementById(id);

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;',
  }[c]));
}

function escapeRegex(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/* ──────────────────────────────────────────
   4. RENDERERS DATATABLES
────────────────────────────────────────── */
function renderAmbiente(data, type, row) {
  if (type === 'filter' || type === 'sort') return `${row.nombre} ${row.ubicacion}`;
  const icono = tipoMeta[row.tipo]?.icono ?? 'meeting_room';
  return `
    <div class="ambiente-cell">
      <span class="ambiente-icon">
        <span class="material-symbols-outlined">${icono}</span>
      </span>
      <span>
        <span class="ambiente-name">${escapeHtml(row.nombre)}</span>
        <span class="ambiente-location">${escapeHtml(row.ubicacion)}</span>
      </span>
    </div>`;
}

function renderTipo(tipo, type) {
  if (type === 'filter' || type === 'sort') return tipo;
  const meta  = tipoMeta[tipo] ?? { clase: '', icono: 'label' };
  const icono = meta.icono;
  return `
    <span class="badge-soft ${meta.clase}">
      <span class="material-symbols-outlined" style="font-size:.9rem">${icono}</span>
      ${escapeHtml(tipo)}
    </span>`;
}

function renderEstado(estado, type) {
  const meta = estadoMeta[estado] ?? { texto: estado, clase: '' };
  if (type === 'filter' || type === 'sort') return meta.texto;
  return `<span class="status-pill ${meta.clase}">${escapeHtml(meta.texto)}</span>`;
}

function renderAcciones(id) {
  return `
    <span class="row-actions">
      <button class="btn btn-edit btn-edit-row" type="button" data-id="${id}"
              title="Editar" aria-label="Editar ambiente">
        <span class="material-symbols-outlined">edit</span>
      </button>
      <button class="btn btn-delete btn-delete-row" type="button" data-id="${id}"
              title="Eliminar" aria-label="Eliminar ambiente">
        <span class="material-symbols-outlined">delete</span>
      </button>
    </span>`;
}

/* ──────────────────────────────────────────
   5. DATATABLES
────────────────────────────────────────── */
function initDataTable() {
  tablaAmbientes = $('#tabla-ambientes').DataTable({
    data: ambientes,
    responsive: true,
    pageLength: 5,
    lengthMenu: [5, 10, 25],
    language: {
      emptyTable:    'No hay ambientes registrados',
      info:          'Mostrando _START_ a _END_ de _TOTAL_ ambientes',
      infoEmpty:     'Mostrando 0 ambientes',
      infoFiltered:  '(filtrado de _MAX_ ambientes)',
      lengthMenu:    'Ver _MENU_',
      loadingRecords:'Cargando...',
      processing:    'Procesando...',
      search:        'Buscar:',
      zeroRecords:   'No se encontraron ambientes',
      paginate: {
        first: 'Primero', last: 'Último',
        next: 'Siguiente', previous: 'Anterior',
      },
    },
    columns: [
      { data: null,       render: renderAmbiente },
      { data: 'sede',     render: escapeHtml },
      { data: 'capacidad', className: 'text-center',
        render: data => `${data} <span class="text-muted" style="font-size:.75rem">personas</span>` },
      { data: 'tipo',   render: renderTipo },
      { data: 'estado', render: renderEstado },
      { data: 'id', orderable: false, searchable: false,
        className: 'text-end', render: renderAcciones },
    ],
  });
}

function reloadTable() {
  tablaAmbientes.clear();
  tablaAmbientes.rows.add(ambientes);
  tablaAmbientes.draw();
}

function applyExternalFilters() {
  const sede   = $id('filter-sede').value;
  const tipo   = $id('filter-tipo').value;
  const estado = $id('filter-estado').value;

  tablaAmbientes
    .column(1).search(sede   ? `^${escapeRegex(sede)}$`   : '', true, false)
    .column(3).search(tipo   ? `^${escapeRegex(tipo)}$`   : '', true, false)
    .column(4).search(estado ? estadoMeta[estado].texto   : '', false, false)
    .draw();
}

/* ──────────────────────────────────────────
   6. ESTADÍSTICAS
────────────────────────────────────────── */
function updateStats() {
  $id('stat-total').textContent       = ambientes.length;
  $id('stat-capacidad').textContent   = ambientes.reduce((s, a) => s + Number(a.capacidad), 0);
  $id('stat-disponibles').textContent = ambientes.filter(a => a.estado === 'disponible').length;
  $id('stat-mantenimiento').textContent = ambientes.filter(a => a.estado === 'mantenimiento').length;
}

/* ──────────────────────────────────────────
   7. GRÁFICA CHART.JS (donut)
────────────────────────────────────────── */
function getChartData() {
  return Object.keys(estadoMeta).map(e => ambientes.filter(a => a.estado === e).length);
}

function initChart() {
  const ctx = $id('ambientesChart');
  if (!ctx) return;

  chartAmbientes = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: Object.values(estadoMeta).map(m => m.texto),
      datasets: [{
        data: getChartData(),
        backgroundColor: ['#38a800', '#f59e0b', '#94a3b8', '#ef4444'],
        borderWidth: 0,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '64%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            boxWidth: 12,
            font: { family: 'DM Sans', size: 12, weight: '600' },
          },
        },
      },
    },
  });
}

function updateChart() {
  if (!chartAmbientes) return;
  chartAmbientes.data.datasets[0].data = getChartData();
  chartAmbientes.update();
}

/* ──────────────────────────────────────────
   8. TOAST (CSS puro — mismo patrón que Programas/Actividades)
────────────────────────────────────────── */
let toastTimer = null;

const TOAST_VARIANTS = {
  success: { icon: 'check_circle',  color: 'var(--cc-primary)' },
  danger:  { icon: 'cancel',        color: '#ef4444'            },
  info:    { icon: 'info',          color: '#3b82f6'            },
  warning: { icon: 'warning',       color: '#f59e0b'            },
};

function showToast(message, variant = 'success') {
  const toastEl  = $id('toast');
  const msgEl    = $id('toast-msg');
  const iconEl   = $id('toast-icon');
  if (!toastEl || !msgEl || !iconEl) return;

  const v = TOAST_VARIANTS[variant] ?? TOAST_VARIANTS.success;
  msgEl.textContent  = message;
  iconEl.textContent = v.icon;
  iconEl.style.color = v.color;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 3200);
}

/* ──────────────────────────────────────────
   9. FORMULARIO HELPERS
────────────────────────────────────────── */
function resetForm() {
  const form = $id('form-ambiente');
  form.reset();
  form.classList.remove('was-validated');
  $id('amb-id').value = '';
  $id('ambienteModalLabel').textContent = 'Nuevo Ambiente';
}

function setFormData(ambiente) {
  $id('amb-id').value            = ambiente.id;
  $id('amb-nombre').value        = ambiente.nombre;
  $id('amb-ubicacion').value     = ambiente.ubicacion;
  $id('amb-sede').value          = ambiente.sede;
  $id('amb-tipo').value          = ambiente.tipo;
  $id('amb-capacidad').value     = ambiente.capacidad;
  $id('amb-estado').value        = ambiente.estado;
  $id('amb-recursos').value      = ambiente.recursos ?? '';
  $id('amb-observaciones').value = ambiente.observaciones ?? '';
}

function getFormData() {
  return {
    nombre:        $id('amb-nombre').value.trim(),
    ubicacion:     $id('amb-ubicacion').value.trim(),
    sede:          $id('amb-sede').value,
    tipo:          $id('amb-tipo').value,
    capacidad:     Number($id('amb-capacidad').value),
    estado:        $id('amb-estado').value,
    recursos:      $id('amb-recursos').value.trim(),
    observaciones: $id('amb-observaciones').value.trim(),
  };
}

/* ──────────────────────────────────────────
   10. GUARDAR (crear / editar)
────────────────────────────────────────── */
function saveAmbiente(event) {
  event.preventDefault();
  const form = event.currentTarget;
  form.classList.add('was-validated');

  if (!form.checkValidity()) {
    showToast('Revise los campos requeridos.', 'danger');
    return;
  }

  const id   = Number($id('amb-id').value);
  const data = getFormData();

  if (id) {
    const index = ambientes.findIndex(a => a.id === id);
    if (index !== -1) ambientes[index] = { ...ambientes[index], ...data };
    showToast('Ambiente actualizado correctamente.', 'success');
  } else {
    const newId = Math.max(0, ...ambientes.map(a => a.id)) + 1;
    ambientes.push({ id: newId, ...data });
    showToast('Ambiente registrado correctamente.', 'success');
  }

  reloadTable();
  applyExternalFilters();
  updateStats();
  updateChart();
  bootstrap.Modal.getInstance($id('ambienteModal')).hide();
}

/* ──────────────────────────────────────────
   11. MODALES EDITAR / ELIMINAR
────────────────────────────────────────── */
function openEditModal(id) {
  const ambiente = ambientes.find(a => a.id === id);
  if (!ambiente) return;
  resetForm();
  setFormData(ambiente);
  $id('ambienteModalLabel').textContent = 'Editar Ambiente';
  bootstrap.Modal.getOrCreateInstance($id('ambienteModal')).show();
}

function openDeleteModal(id) {
  const ambiente = ambientes.find(a => a.id === id);
  if (!ambiente) return;
  deleteTargetId = id;
  $id('delete-msg').textContent =
    `¿Seguro que desea eliminar "${ambiente.nombre}"? Esta acción no se puede deshacer.`;
  bootstrap.Modal.getOrCreateInstance($id('deleteModal')).show();
}

function confirmDelete() {
  if (!deleteTargetId) return;
  const index  = ambientes.findIndex(a => a.id === deleteTargetId);
  const nombre = ambientes[index]?.nombre ?? 'Ambiente';
  if (index !== -1) ambientes.splice(index, 1);

  deleteTargetId = null;
  reloadTable();
  applyExternalFilters();
  updateStats();
  updateChart();
  bootstrap.Modal.getInstance($id('deleteModal')).hide();
  showToast(`"${nombre}" eliminado.`, 'info');
}

/* ──────────────────────────────────────────
   12. EVENTOS
────────────────────────────────────────── */
function wireEvents() {
  /* Filtros externos */
  ['filter-sede', 'filter-tipo', 'filter-estado'].forEach(id => {
    $id(id).addEventListener('change', applyExternalFilters);
  });

  /* Nuevo ambiente */
  $id('btn-nuevo').addEventListener('click', resetForm);

  /* Formulario submit */
  $id('form-ambiente').addEventListener('submit', saveAmbiente);

  /* Confirmar eliminar */
  $id('btn-confirmar-delete').addEventListener('click', confirmDelete);

  /* Delegación en tabla */
  $id('tabla-ambientes').addEventListener('click', event => {
    const editBtn   = event.target.closest('.btn-edit-row');
    const deleteBtn = event.target.closest('.btn-delete-row');
    if (editBtn)   openEditModal(Number(editBtn.dataset.id));
    if (deleteBtn) openDeleteModal(Number(deleteBtn.dataset.id));
  });

  /* Sidebar toggle (móvil) */
  $id('btnSidebarToggle')?.addEventListener('click', () => {
    $id('sidebar').classList.toggle('open');
  });

  /* Atajo Alt+N → nuevo ambiente */
  document.addEventListener('keydown', e => {
    if (e.altKey && e.key === 'n') {
      e.preventDefault();
      resetForm();
      bootstrap.Modal.getOrCreateInstance($id('ambienteModal')).show();
    }
  });
}

/* ──────────────────────────────────────────
   13. INICIALIZACIÓN
────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initDataTable();
  initChart();
  wireEvents();
  updateStats();
});
