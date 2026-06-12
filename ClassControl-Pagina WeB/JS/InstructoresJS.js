/* ============================================================
   ClassControl — Gestión de Instructores
   InstructoresJS.js  (Bootstrap 5 + DataTables)
   ============================================================ */

'use strict';

/* ══════════════════════════════════════════════════
   1. DATOS INICIALES
══════════════════════════════════════════════════ */
let instructores = [
  { id: 1, nombres: 'Carlos Alberto', apellidos: 'Gómez Ruiz',    cedula: '1.020.304.050', correo: 'carlos.gomez@sena.edu.co', telefono: '3001234567', area: 'Tecnología',   rol: 'Instructor',    estado: 'Activo'   },
  { id: 2, nombres: 'Ana María',      apellidos: 'Rodríguez',     cedula: '52.637.485',    correo: 'ana.rod@sena.edu.co',      telefono: '3109876543', area: 'Gestión',      rol: 'Administrador', estado: 'Activo'   },
  { id: 3, nombres: 'Luis Fernando',  apellidos: 'Pérez',         cedula: '1.098.765.432', correo: 'luis.perez@sena.edu.co',   telefono: '3205551234', area: 'Matemáticas',  rol: 'Instructor',    estado: 'Inactivo' },
  { id: 4, nombres: 'Martha Lucía',   apellidos: 'Sánchez',       cedula: '32.456.789',    correo: 'martha.san@sena.edu.co',   telefono: '3156789012', area: 'Idiomas',      rol: 'Instructor',    estado: 'Activo'   },
  { id: 5, nombres: 'Roberto Carlos', apellidos: 'Díaz Mora',     cedula: '79.543.210',    correo: 'roberto.diaz@sena.edu.co', telefono: '3012223344', area: 'Tecnología',   rol: 'Instructor',    estado: 'Activo'   },
  { id: 6, nombres: 'Sandra Milena',  apellidos: 'Torres',        cedula: '43.210.987',    correo: 'sandra.torres@sena.edu.co',telefono: '3187654321', area: 'Transversal',  rol: 'Coordinador',   estado: 'Activo'   },
];

let nextId      = 7;
let idAEliminar = null;

/* ══════════════════════════════════════════════════
   NOTA: El archivo usa $(document).ready() en lugar
   de DOMContentLoaded para garantizar que jQuery y
   DataTables estén completamente cargados antes de
   inicializar la tabla.
══════════════════════════════════════════════════ */

/* ══════════════════════════════════════════════════
   2. COLORES DE AVATAR (por área)
══════════════════════════════════════════════════ */
const COLORES_AVATAR = {
  'Tecnología':  { bg: '#dbeafe', text: '#1e40af' },
  'Idiomas':     { bg: '#dcfce7', text: '#166534' },
  'Matemáticas': { bg: '#ffedd5', text: '#9a3412' },
  'Transversal': { bg: '#f0fdf4', text: '#15803d' },
  'Gestión':     { bg: '#fef9c3', text: '#854d0e' },
};

function getColorAvatar(area) {
  return COLORES_AVATAR[area] || { bg: '#e2e8f0', text: '#475569' };
}

function getIniciales(nombres, apellidos) {
  const n = nombres?.trim().split(' ')[0]?.[0]?.toUpperCase() || '';
  const a = apellidos?.trim().split(' ')[0]?.[0]?.toUpperCase() || '';
  return n + a;
}

/* ══════════════════════════════════════════════════
   3. BOOTSTRAP MODAL INSTANCES
══════════════════════════════════════════════════ */
let bsModalInst, bsModalDetalle, bsModalEliminar;
let dtInstance = null;

// Usamos $(document).ready() para garantizar que jQuery y DataTables
// estén disponibles antes de inicializar la tabla.
$(document).ready(function () {
  bsModalInst     = new bootstrap.Modal(document.getElementById('modal-instructor'));
  bsModalDetalle  = new bootstrap.Modal(document.getElementById('modal-detalle'));
  bsModalEliminar = new bootstrap.Modal(document.getElementById('modal-eliminar'));

  initDataTable();      // crea la instancia dt vacía
  renderTableData();    // carga las filas
  renderMetricas();
  initFiltros();
  initFormEvents();
  initDeleteEvents();
  initDarkMode();
  initSidebarToggle();

  // Exportar CSV
  document.getElementById('btn-descargar')?.addEventListener('click', exportarCSV);

  // Nuevo Instructor button: también resetea el form antes de abrir
  document.getElementById('btn-nuevo-instructor')?.addEventListener('click', () => abrirModalNuevo());

  // Reset form cuando el modal de crear/editar se cierra
  document.getElementById('modal-instructor')?.addEventListener('hidden.bs.modal', () => {
    document.getElementById('inst-id').value = '';
    document.getElementById('form-instructor')?.reset();
    document.querySelectorAll('#form-instructor .is-invalid').forEach(el => el.classList.remove('is-invalid'));
    document.getElementById('modal-titulo').textContent = 'Nuevo Instructor';
  });
});

/* ══════════════════════════════════════════════════
   4. DATATABLES INIT
══════════════════════════════════════════════════ */
function initDataTable() {
  // DataTables requiere jQuery: usamos $('#id').DataTable()
  dtInstance = $('#instructores-table').DataTable({
    dom: '<"d-none"f>rt<"d-flex align-items-center justify-content-between px-3 py-2 border-top"ip>',
    language: {
      info:         'Mostrando _START_–_END_ de _TOTAL_ instructor(es)',
      infoEmpty:    'Sin instructores disponibles',
      infoFiltered: '(filtrados de _MAX_ totales)',
      emptyTable:   'No se encontraron instructores con los filtros aplicados.',
      paginate:     { previous: '‹', next: '›' },
    },
    pageLength: 10,
    ordering:   true,
    responsive: true,
    autoWidth:  false,
    columnDefs: [
      { orderable: false, targets: 6 }, // Acciones
    ],
  });

  // Delegación de eventos en el tbody (funciona con filas dinámicas de DataTables)
  $('#instructores-table tbody').on('click', '.btn-ver',      function() { verDetalle(parseInt(this.dataset.id, 10)); });
  $('#instructores-table tbody').on('click', '.btn-editar',   function() { abrirModalEditar(parseInt(this.dataset.id, 10)); });
  $('#instructores-table tbody').on('click', '.btn-eliminar', function() { abrirModalEliminar(parseInt(this.dataset.id, 10)); });
}

/* ══════════════════════════════════════════════════
   5. RENDER
══════════════════════════════════════════════════ */
function renderTableData(lista = instructores) {
  if (!dtInstance) return;

  dtInstance.clear();

  lista.forEach(i => {
    const col  = getColorAvatar(i.area);
    const inic = getIniciales(i.nombres, i.apellidos);
    const inac = i.estado === 'Inactivo';

    dtInstance.row.add([
      /* Instructor */
      `<div class="d-flex align-items-center gap-2${inac ? ' opacity-50' : ''}">
        <div class="cc-avatar-ini" style="background:${col.bg};color:${col.text}">${inic}</div>
        <div>
          <p class="cc-inst-name mb-0">${i.nombres}</p>
          <p class="cc-inst-apellido mb-0">${i.apellidos}</p>
        </div>
       </div>`,
      /* Cédula */
      `<span class="cc-inst-cedula">${i.cedula}</span>`,
      /* Correo */
      `<span class="cc-inst-correo">${i.correo}</span>`,
      /* Área */
      `<span class="cc-area-badge">${i.area}</span>`,
      /* Rol */
      badgeRol(i.rol),
      /* Estado */
      badgeEstado(i.estado),
      /* Acciones */
      `<div class="cc-action-group d-flex justify-content-end gap-1">
        <button class="cc-inst-btn cc-inst-btn--ver btn-ver"      data-id="${i.id}" title="Ver perfil">
          <span class="material-symbols-outlined" style="font-size:1.2rem">visibility</span>
        </button>
        <button class="cc-inst-btn cc-inst-btn--editar btn-editar"  data-id="${i.id}" title="Editar">
          <span class="material-symbols-outlined" style="font-size:1.2rem">edit_note</span>
        </button>
        <button class="cc-inst-btn cc-inst-btn--borrar btn-eliminar" data-id="${i.id}" title="Eliminar">
          <span class="material-symbols-outlined" style="font-size:1.2rem">person_remove</span>
        </button>
       </div>`,
    ]);
  });

  dtInstance.draw();
}

/* ══════════════════════════════════════════════════
   6. MÉTRICAS
══════════════════════════════════════════════════ */
function renderMetricas() {
  const total   = instructores.length;
  const activos = instructores.filter(i => i.estado === 'Activo').length;
  const insts   = instructores.filter(i => i.rol === 'Instructor').length;
  const admins  = instructores.filter(i => i.rol !== 'Instructor').length;

  const datos = [
    { label: 'Total Personal', valor: total,   borde: '#38a800', col: 'col-6 col-xl-3' },
    { label: 'Activos',        valor: activos,  borde: '#38a800', col: 'col-6 col-xl-3' },
    { label: 'Instructores',   valor: insts,    borde: '#1e40af', col: 'col-6 col-xl-3' },
    { label: 'Admin / Coord.', valor: admins,   borde: '#7c3aed', col: 'col-6 col-xl-3' },
  ];

  const metricas = document.getElementById('metricas');
  if (!metricas) return;

  metricas.innerHTML = datos.map(d => `
    <div class="${d.col}">
      <div class="cc-metrica-card" style="border-left-color:${d.borde}">
        <p class="cc-metrica-label">${d.label}</p>
        <p class="cc-metrica-valor">${d.valor}</p>
      </div>
    </div>`).join('');
}

/* ══════════════════════════════════════════════════
   7. HTML HELPERS
══════════════════════════════════════════════════ */
function badgeRol(rol) {
  const cls = {
    'Instructor':    'cc-rol-badge--instructor',
    'Administrador': 'cc-rol-badge--administrador',
    'Coordinador':   'cc-rol-badge--coordinador',
  }[rol] ?? 'cc-rol-badge--instructor';
  return `<span class="cc-rol-badge ${cls}">${rol}</span>`;
}

function badgeEstado(estado) {
  const activo = estado === 'Activo';
  return `<span class="cc-inst-status ${activo ? 'activo' : 'inactivo'}">
    <span class="dot"></span>${estado}
  </span>`;
}

/* ══════════════════════════════════════════════════
   8. FILTROS REACTIVOS
══════════════════════════════════════════════════ */
function initFiltros() {
  const filtroBusqueda = document.getElementById('filtro-busqueda');
  const filtroRol      = document.getElementById('filtro-rol');
  const filtroEstado   = document.getElementById('filtro-estado');
  const formFiltros    = document.getElementById('form-filtros');

  const aplicar = () => {
    const busq   = (filtroBusqueda?.value ?? '').trim().toLowerCase();
    const rol    = filtroRol?.value ?? '';
    const estado = filtroEstado?.value ?? '';

    const lista = instructores.filter(i => {
      const nombre = `${i.nombres} ${i.apellidos}`.toLowerCase();
      return (!busq   || nombre.includes(busq) || i.cedula.includes(busq) || i.correo.toLowerCase().includes(busq))
          && (!rol    || i.rol === rol)
          && (!estado || i.estado === estado);
    });

    renderTableData(lista);
  };

  [filtroBusqueda, filtroRol, filtroEstado].forEach(el => el?.addEventListener('input', aplicar));

  formFiltros?.addEventListener('submit', e => { e.preventDefault(); aplicar(); });
  formFiltros?.addEventListener('reset',  () => setTimeout(() => renderTableData(), 0));
}

/* ══════════════════════════════════════════════════
   9. MODAL CREAR / EDITAR
══════════════════════════════════════════════════ */
function abrirModalNuevo() {
  document.getElementById('modal-titulo').textContent = 'Nuevo Instructor';
  document.getElementById('inst-id').value = '';
  document.getElementById('form-instructor')?.reset();
  limpiarErrores();
  bsModalInst.show();
}

function abrirModalEditar(id) {
  const i = instructores.find(x => x.id === id);
  if (!i) return;
  document.getElementById('modal-titulo').textContent   = 'Editar Instructor';
  document.getElementById('inst-id').value              = i.id;
  document.getElementById('inst-nombres').value         = i.nombres;
  document.getElementById('inst-apellidos').value       = i.apellidos;
  document.getElementById('inst-cedula').value          = i.cedula;
  document.getElementById('inst-correo').value          = i.correo;
  document.getElementById('inst-telefono').value        = i.telefono || '';
  document.getElementById('inst-area').value            = i.area;
  document.getElementById('inst-rol').value             = i.rol;
  document.getElementById('inst-estado').value          = i.estado;
  limpiarErrores();
  bsModalInst.show();
}

function initFormEvents() {
  document.getElementById('form-instructor')?.addEventListener('submit', e => {
    e.preventDefault();
    if (!validarForm()) { showToast('Completa los campos obligatorios.', 'error'); return; }

    const idVal = document.getElementById('inst-id').value;
    const datos = {
      nombres:   document.getElementById('inst-nombres').value.trim(),
      apellidos: document.getElementById('inst-apellidos').value.trim(),
      cedula:    document.getElementById('inst-cedula').value.trim(),
      correo:    document.getElementById('inst-correo').value.trim(),
      telefono:  document.getElementById('inst-telefono').value.trim(),
      area:      document.getElementById('inst-area').value,
      rol:       document.getElementById('inst-rol').value,
      estado:    document.getElementById('inst-estado').value,
    };

    if (idVal) {
      const idx = instructores.findIndex(x => x.id === parseInt(idVal, 10));
      if (idx > -1) instructores[idx] = { ...instructores[idx], ...datos };
      showToast('Instructor actualizado correctamente.');
    } else {
      instructores.unshift({ id: nextId++, ...datos });
      showToast('Instructor registrado correctamente.');
    }

    bsModalInst.hide();
    renderTableData();
    renderMetricas();
  });
}

/* ══════════════════════════════════════════════════
   10. VALIDACIÓN
══════════════════════════════════════════════════ */
function validarForm() {
  let ok = true;
  const requeridos = ['inst-nombres', 'inst-apellidos', 'inst-cedula', 'inst-correo', 'inst-area', 'inst-rol', 'inst-estado'];

  requeridos.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    const vacio = !el.value.trim();
    const correoInvalido = id === 'inst-correo' && !vacio && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value);
    const invalido = vacio || correoInvalido;
    el.classList.toggle('is-invalid', invalido);
    if (invalido) ok = false;
  });

  return ok;
}

function limpiarErrores() {
  document.querySelectorAll('#form-instructor .is-invalid').forEach(el => el.classList.remove('is-invalid'));
}

/* ══════════════════════════════════════════════════
   11. VER DETALLE (Perfil)
══════════════════════════════════════════════════ */
function verDetalle(id) {
  const i = instructores.find(x => x.id === id);
  if (!i) return;

  const col  = getColorAvatar(i.area);
  const inic = getIniciales(i.nombres, i.apellidos);
  const iconModal = { Presencial: 'home', Virtual: 'laptop', Distancia: 'directions_walk' };

  document.getElementById('detalle-avatar').innerHTML = `
    <div class="cc-avatar-ini lg" style="background:${col.bg};color:${col.text}">${inic}</div>
    <div>
      <p class="fw-bold mb-0" style="font-size:1rem;">${i.nombres} ${i.apellidos}</p>
      <p class="mb-1" style="font-size:.82rem;color:var(--cc-muted);">${i.correo}</p>
      ${badgeRol(i.rol)}
    </div>`;

  document.getElementById('detalle-contenido').innerHTML = `
    <div class="cc-detail-row">
      <span class="cc-detail-label">Identificación</span>
      <span class="cc-detail-value mono">${i.cedula}</span>
    </div>
    <div class="cc-detail-row">
      <span class="cc-detail-label">Teléfono</span>
      <span class="cc-detail-value">${i.telefono || '—'}</span>
    </div>
    <div class="cc-detail-row">
      <span class="cc-detail-label">Área</span>
      <span class="cc-detail-value">${i.area}</span>
    </div>
    <div class="cc-detail-row">
      <span class="cc-detail-label">Estado</span>
      <span class="cc-detail-value">${badgeEstado(i.estado)}</span>
    </div>`;

  bsModalDetalle.show();
}

/* ══════════════════════════════════════════════════
   12. ELIMINAR
══════════════════════════════════════════════════ */
function abrirModalEliminar(id) {
  idAEliminar = id;
  bsModalEliminar.show();
}

function initDeleteEvents() {
  document.getElementById('btn-confirmar-eliminar')?.addEventListener('click', () => {
    instructores = instructores.filter(i => i.id !== idAEliminar);
    idAEliminar  = null;
    bsModalEliminar.hide();
    renderTableData();
    renderMetricas();
    showToast('Instructor eliminado.', 'error');
  });
}

/* ══════════════════════════════════════════════════
   13. EXPORTAR CSV
══════════════════════════════════════════════════ */
function exportarCSV() {
  const cabecera = ['Nombres', 'Apellidos', 'Cédula', 'Correo', 'Teléfono', 'Área', 'Rol', 'Estado'];
  const filas = instructores.map(i =>
    [i.nombres, i.apellidos, i.cedula, i.correo, i.telefono || '', i.area, i.rol, i.estado]
      .map(v => `"${String(v).replace(/"/g, '""')}"`)
      .join(',')
  );
  const csv  = [cabecera.join(','), ...filas].join('\n');
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' }); // BOM para Excel
  const url  = URL.createObjectURL(blob);
  const a    = Object.assign(document.createElement('a'), { href: url, download: 'instructores_classcontrol.csv' });
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('Reporte exportado correctamente.');
}

/* ══════════════════════════════════════════════════
   14. DARK MODE
══════════════════════════════════════════════════ */
function initDarkMode() {
  const toggle = document.getElementById('dark-toggle');
  const saved  = localStorage.getItem('cc-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(saved ? saved === 'dark' : prefersDark);

  toggle?.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-bs-theme') !== 'dark';
    applyTheme(isDark);
    localStorage.setItem('cc-theme', isDark ? 'dark' : 'light');
  });
}

function applyTheme(isDark) {
  document.documentElement.setAttribute('data-bs-theme', isDark ? 'dark' : 'light');
  const icon = document.querySelector('#dark-toggle .material-symbols-outlined');
  if (icon) icon.textContent = isDark ? 'light_mode' : 'dark_mode';
}

/* ══════════════════════════════════════════════════
   15. SIDEBAR TOGGLE (mobile)
══════════════════════════════════════════════════ */
function initSidebarToggle() {
  const toggle  = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('cc-sidebar');
  toggle?.addEventListener('click', () => sidebar?.classList.toggle('open'));
}

/* ══════════════════════════════════════════════════
   16. TOAST
══════════════════════════════════════════════════ */
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `cc-toast ${type}`;
  toast.innerHTML = `
    <span class="material-symbols-outlined" style="font-size:1.1rem">
      ${type === 'success' ? 'check_circle' : 'error'}
    </span>
    <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('hide');
    toast.addEventListener('animationend', () => toast.remove(), { once: true });
  }, 3500);
}
