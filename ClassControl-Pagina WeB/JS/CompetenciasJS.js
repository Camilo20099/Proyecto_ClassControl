/* ============================================================
   CompetenciasJS.js — ClassControl
   CRUD + filtros reactivos + paginación + métricas + CSV
   Migrado a Bootstrap 5 modals · Toast CSS puro
   XSS-safe · Alt+N · sidebar toggle móvil
   ============================================================ */

'use strict';

/* ──────────────────────────────────────────
   1. DATOS INICIALES
────────────────────────────────────────── */
let competencias = [
  { id: 1, codigo: '220501096',
    descripcion: 'Gestionar la información de acuerdo con los requerimientos del cliente y políticas de la organización.',
    programa: 'ADSO', estado: 'Activo', horas: 96 },
  { id: 2, codigo: '240201501',
    descripcion: 'Interactuar en contextos sociales de acuerdo con principios éticos y de cultura de paz.',
    programa: 'Transversal', estado: 'Activo', horas: 40 },
  { id: 3, codigo: '220501103',
    descripcion: 'Diseñar la solución de software de acuerdo con procedimientos y requisitos técnicos.',
    programa: 'ADSO', estado: 'Inactivo', horas: 120 },
  { id: 4, codigo: '210601026',
    descripcion: 'Procesar datos de acuerdo con procedimiento técnico y metodología estadística.',
    programa: 'Gestión', estado: 'Activo', horas: 80 },
  { id: 5, codigo: '281105014',
    descripcion: 'Desarrollar contenidos digitales interactivos de acuerdo con requerimientos del cliente.',
    programa: 'Multimedia', estado: 'Activo', horas: 88 },
  { id: 6, codigo: '220501046',
    descripcion: 'Construir los componentes de software de acuerdo con el diseño del sistema de información.',
    programa: 'ADSO', estado: 'Activo', horas: 132 },
  { id: 7, codigo: '240201528',
    descripcion: 'Utilizar herramientas tecnológicas de acuerdo con los requerimientos del proceso y el contexto.',
    programa: 'Transversal', estado: 'Inactivo', horas: 30 },
];

let nextId       = 8;
let paginaActual = 1;
const POR_PAGINA = 5;
let idAEliminar  = null;

/* ──────────────────────────────────────────
   2. SELECTORES
────────────────────────────────────────── */
const tbodyComp      = document.getElementById('tbody-competencias');
const contadorEl     = document.getElementById('contador-competencias');
const paginacionEl   = document.getElementById('paginacion');
const metricasEl     = document.getElementById('metricas');
const resumenCargaEl = document.getElementById('resumen-carga');

const formFiltros    = document.getElementById('form-filtros');
const filtroBusqueda = document.getElementById('filtro-busqueda');
const filtroPrograma = document.getElementById('filtro-programa');
const filtroEstado   = document.getElementById('filtro-estado');

const formComp       = document.getElementById('form-competencia');
const modalTituloEl  = document.getElementById('modal-titulo');
const compId         = document.getElementById('comp-id');
const compCodigo     = document.getElementById('comp-codigo');
const compDescripcion= document.getElementById('comp-descripcion');
const compPrograma   = document.getElementById('comp-programa');
const compEstado     = document.getElementById('comp-estado');
const compHoras      = document.getElementById('comp-horas');

const btnNueva          = document.getElementById('btn-nueva-competencia');
const btnDescargar      = document.getElementById('btn-descargar');
const btnGenerarReporte = document.getElementById('btn-generar-reporte');
const btnConfirmarElim  = document.getElementById('btn-confirmar-eliminar');

const toastEl   = document.getElementById('toast');
const toastMsg  = document.getElementById('toast-msg');
const toastIcon = document.getElementById('toast-icon');

/* Bootstrap modals */
const bsModalComp    = new bootstrap.Modal(document.getElementById('modal-competencia'));
const bsModalDetalle = new bootstrap.Modal(document.getElementById('modal-detalle'));
const bsModalElim    = new bootstrap.Modal(document.getElementById('modal-eliminar'));

/* Sidebar toggle móvil */
document.getElementById('btnSidebarToggle')?.addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('open');
});

/* ──────────────────────────────────────────
   3. UTILIDADES
────────────────────────────────────────── */
function escHtml(str) {
  return String(str ?? '')
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

/* ──────────────────────────────────────────
   4. BADGES
────────────────────────────────────────── */
const BADGE_PROGRAMA = {
  'ADSO':        'badge-adso',
  'Multimedia':  'badge-multimedia',
  'Gestión':     'badge-gestion',
  'Transversal': 'badge-transversal',
};

function badgePrograma(prog) {
  const cls = BADGE_PROGRAMA[prog] ?? 'badge-transversal';
  return `<span class="cc-badge ${cls}">${escHtml(prog)}</span>`;
}

function badgeEstado(estado) {
  if (estado === 'Activo') {
    return `<span class="cc-estado-activo"><span class="cc-dot"></span>Activo</span>`;
  }
  return `<span class="cc-estado-inactivo"><span class="cc-dot"></span>Inactivo</span>`;
}

/* ──────────────────────────────────────────
   5. MÉTRICAS
────────────────────────────────────────── */
function renderMetricas() {
  const total     = competencias.length;
  const activas   = competencias.filter(c => c.estado === 'Activo').length;
  const inactivas = competencias.filter(c => c.estado === 'Inactivo').length;
  const sinHoras  = competencias.filter(c => !c.horas).length;

  const datos = [
    { label: 'Total',      valor: total,     borde: 'var(--cc-primary)' },
    { label: 'Activas',    valor: activas,   borde: 'var(--cc-primary)' },
    { label: 'Inactivas',  valor: inactivas, borde: '#94a3b8' },
    { label: 'Sin horas',  valor: sinHoras,  borde: 'var(--cc-warning)' },
  ];

  metricasEl.innerHTML = datos.map(d => `
    <div class="col-6 col-md-3">
      <div class="cc-metric" style="border-left-color:${d.borde}">
        <div class="cc-metric-label">${d.label}</div>
        <div class="cc-metric-value">${d.valor}</div>
      </div>
    </div>`).join('');

  if (resumenCargaEl) {
    resumenCargaEl.textContent =
      `Hay ${inactivas} competencia${inactivas !== 1 ? 's' : ''} inactiva${inactivas !== 1 ? 's' : ''} y ${sinHoras} sin horas asignadas para el próximo trimestre.`;
  }
}

/* ──────────────────────────────────────────
   6. FILTRADO
────────────────────────────────────────── */
function filtrar() {
  const busq   = filtroBusqueda.value.trim().toLowerCase();
  const prog   = filtroPrograma.value;
  const estado = filtroEstado.value;

  return competencias.filter(c =>
    (!busq   || c.codigo.toLowerCase().includes(busq) || c.descripcion.toLowerCase().includes(busq)) &&
    (!prog   || c.programa === prog) &&
    (!estado || c.estado === estado)
  );
}

/* ──────────────────────────────────────────
   7. RENDER TABLA
────────────────────────────────────────── */
function renderTabla() {
  const filtradas = filtrar();
  const total     = filtradas.length;
  const totalPags = Math.max(1, Math.ceil(total / POR_PAGINA));

  if (paginaActual > totalPags) paginaActual = totalPags;

  const inicio = (paginaActual - 1) * POR_PAGINA;
  const pagina = filtradas.slice(inicio, inicio + POR_PAGINA);

  if (pagina.length === 0) {
    tbodyComp.innerHTML = `
      <tr class="cc-empty-row">
        <td colspan="6">
          <span class="material-symbols-outlined cc-empty-icon">search_off</span>
          No se encontraron competencias con los filtros aplicados.
        </td>
      </tr>`;
  } else {
    tbodyComp.innerHTML = pagina.map(crearFila).join('');
  }

  const desde = total === 0 ? 0 : inicio + 1;
  const hasta  = Math.min(inicio + POR_PAGINA, total);
  contadorEl.textContent =
    `Mostrando ${desde}–${hasta} de ${total} competencia${total !== 1 ? 's' : ''}`;

  renderPaginacion(totalPags);
  renderMetricas();
}

function crearFila(c) {
  return `
  <tr data-id="${c.id}">
    <td><span class="cc-code">${escHtml(c.codigo)}</span></td>
    <td><div class="cc-desc-truncada">${escHtml(c.descripcion)}</div></td>
    <td>${badgePrograma(c.programa)}</td>
    <td class="text-center fw-semibold">${c.horas ?? '—'}</td>
    <td>${badgeEstado(c.estado)}</td>
    <td class="text-end">
      <div class="action-btns d-flex justify-content-end gap-1">
        <button class="cc-btn-icon cc-btn-icon-view btn-ver" data-id="${c.id}" title="Ver detalle">
          <span class="material-symbols-outlined">visibility</span>
        </button>
        <button class="cc-btn-icon cc-btn-icon-edit btn-editar" data-id="${c.id}" title="Editar">
          <span class="material-symbols-outlined">edit</span>
        </button>
        <button class="cc-btn-icon cc-btn-icon-del btn-eliminar" data-id="${c.id}" title="Eliminar">
          <span class="material-symbols-outlined">delete</span>
        </button>
      </div>
    </td>
  </tr>`;
}

/* ──────────────────────────────────────────
   8. PAGINACIÓN
────────────────────────────────────────── */
function renderPaginacion(totalPags) {
  paginacionEl.innerHTML = '';

  paginacionEl.appendChild(
    crearBtnNav('chevron_left', paginaActual === 1, () => { paginaActual--; renderTabla(); })
  );

  calcularRango(paginaActual, totalPags).forEach(item => {
    if (item === '...') {
      const ell = document.createElement('span');
      ell.className = 'cc-page-ellipsis'; ell.textContent = '…';
      paginacionEl.appendChild(ell);
    } else {
      const btn = document.createElement('button');
      btn.className   = `cc-page-btn${item === paginaActual ? ' active' : ''}`;
      btn.textContent = item;
      btn.addEventListener('click', () => { paginaActual = item; renderTabla(); });
      paginacionEl.appendChild(btn);
    }
  });

  paginacionEl.appendChild(
    crearBtnNav('chevron_right', paginaActual === totalPags, () => { paginaActual++; renderTabla(); })
  );
}

function crearBtnNav(icon, disabled, handler) {
  const btn = document.createElement('button');
  btn.className = 'cc-page-btn'; btn.disabled = disabled;
  btn.innerHTML = `<span class="material-symbols-outlined" style="font-size:1rem">${icon}</span>`;
  btn.addEventListener('click', handler);
  return btn;
}

function calcularRango(actual, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const s = new Set([1, total, actual]);
  if (actual > 1)     s.add(actual - 1);
  if (actual < total) s.add(actual + 1);
  const sorted = [...s].sort((a, b) => a - b);
  const result = [];
  sorted.forEach((n, i) => {
    if (i > 0 && n - sorted[i-1] > 1) result.push('...');
    result.push(n);
  });
  return result;
}

/* ──────────────────────────────────────────
   9. MODAL CREAR / EDITAR
────────────────────────────────────────── */
function abrirModalNuevo() {
  modalTituloEl.textContent = 'Nueva Competencia';
  formComp.reset();
  compId.value = '';
  limpiarValidacion();
  bsModalComp.show();
}

function abrirModalEditar(id) {
  const c = competencias.find(x => x.id === id);
  if (!c) return;
  modalTituloEl.textContent = 'Editar Competencia';
  compId.value          = c.id;
  compCodigo.value      = c.codigo;
  compDescripcion.value = c.descripcion;
  compPrograma.value    = c.programa;
  compEstado.value      = c.estado;
  compHoras.value       = c.horas ?? '';
  limpiarValidacion();
  bsModalComp.show();
}

document.getElementById('modal-competencia').addEventListener('hidden.bs.modal', () => {
  formComp.reset(); limpiarValidacion();
});

/* ──────────────────────────────────────────
   10. VALIDACIÓN
────────────────────────────────────────── */
function validar() {
  let ok = true;
  [compCodigo, compDescripcion, compPrograma, compEstado].forEach(campo => {
    if (!campo.value.trim()) {
      campo.classList.add('is-invalid'); campo.classList.remove('is-valid'); ok = false;
    } else {
      campo.classList.remove('is-invalid'); campo.classList.add('is-valid');
    }
  });
  return ok;
}

function limpiarValidacion() {
  [compCodigo, compDescripcion, compPrograma, compEstado, compHoras].forEach(c => {
    c.classList.remove('is-invalid', 'is-valid');
  });
}

/* ──────────────────────────────────────────
   11. GUARDAR
────────────────────────────────────────── */
formComp.addEventListener('submit', e => {
  e.preventDefault();
  if (!validar()) return;

  const id    = compId.value ? parseInt(compId.value, 10) : null;
  const datos = {
    codigo:      compCodigo.value.trim(),
    descripcion: compDescripcion.value.trim(),
    programa:    compPrograma.value,
    estado:      compEstado.value,
    horas:       compHoras.value ? parseInt(compHoras.value, 10) : null,
  };

  if (id) {
    const idx = competencias.findIndex(x => x.id === id);
    competencias[idx] = { ...competencias[idx], ...datos };
    mostrarToast('Competencia actualizada correctamente.', 'check_circle', 'var(--cc-primary)');
  } else {
    competencias.unshift({ id: nextId++, ...datos });
    paginaActual = 1;
    mostrarToast('Competencia creada correctamente.', 'check_circle', 'var(--cc-primary)');
  }

  bsModalComp.hide();
  renderTabla();
});

/* ──────────────────────────────────────────
   12. VER DETALLE (modal Bootstrap)
────────────────────────────────────────── */
function verDetalle(id) {
  const c = competencias.find(x => x.id === id);
  if (!c) return;

  const filas = [
    ['Código',      `<span class="cc-code">${escHtml(c.codigo)}</span>`],
    ['Programa',    badgePrograma(c.programa)],
    ['Estado',      badgeEstado(c.estado)],
    ['Horas',       c.horas ? `${c.horas} horas` : '—'],
    ['Descripción', escHtml(c.descripcion)],
  ];

  document.getElementById('detalle-titulo').textContent =
    `Competencia ${c.codigo}`;
  document.getElementById('detalle-contenido').innerHTML =
    filas.map(([label, val]) => `
      <div class="cc-detail-row">
        <span class="cc-detail-label">${label}</span>
        <span class="cc-detail-value">${val}</span>
      </div>`).join('');

  bsModalDetalle.show();
}

/* ──────────────────────────────────────────
   13. ELIMINAR
────────────────────────────────────────── */
function abrirModalEliminar(id) {
  idAEliminar = id;
  bsModalElim.show();
}

btnConfirmarElim.addEventListener('click', () => {
  competencias = competencias.filter(c => c.id !== idAEliminar);
  idAEliminar  = null;
  bsModalElim.hide();
  renderTabla();
  mostrarToast('Competencia eliminada.', 'delete', '#ef4444');
});

/* ──────────────────────────────────────────
   14. EXPORTAR CSV
────────────────────────────────────────── */
function exportarCSV() {
  const BOM      = '\uFEFF';
  const cabecera = ['Código', 'Descripción', 'Programa', 'Estado', 'Horas'];
  const filas    = competencias.map(c =>
    [c.codigo, `"${c.descripcion.replace(/"/g,'""')}"`, c.programa, c.estado, c.horas ?? ''].join(',')
  );
  const csv  = BOM + [cabecera.join(','), ...filas].join('\r\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url  = URL.createObjectURL(blob);
  const a    = Object.assign(document.createElement('a'), {
    href: url, download: 'competencias_classcontrol.csv'
  });
  document.body.appendChild(a); a.click();
  document.body.removeChild(a); URL.revokeObjectURL(url);
  mostrarToast('Reporte exportado correctamente.', 'download', '#3b82f6');
}

/* ──────────────────────────────────────────
   15. TOAST (CSS puro)
────────────────────────────────────────── */
let toastTimer = null;

function mostrarToast(msg, icon = 'check_circle', color = 'var(--cc-primary)') {
  toastMsg.textContent  = msg;
  toastIcon.textContent = icon;
  toastIcon.style.color = color;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 3200);
}

/* ──────────────────────────────────────────
   16. DELEGACIÓN EN TABLA
────────────────────────────────────────── */
tbodyComp.addEventListener('click', e => {
  const btnVer  = e.target.closest('.btn-ver');
  const btnEdit = e.target.closest('.btn-editar');
  const btnDel  = e.target.closest('.btn-eliminar');
  if (btnVer)  verDetalle(parseInt(btnVer.dataset.id, 10));
  if (btnEdit) abrirModalEditar(parseInt(btnEdit.dataset.id, 10));
  if (btnDel)  abrirModalEliminar(parseInt(btnDel.dataset.id, 10));
});

/* ──────────────────────────────────────────
   17. FILTROS REACTIVOS
────────────────────────────────────────── */
[filtroBusqueda, filtroPrograma, filtroEstado].forEach(el => {
  el.addEventListener('input', () => { paginaActual = 1; renderTabla(); });
});

formFiltros.addEventListener('reset', () => {
  setTimeout(() => { paginaActual = 1; renderTabla(); }, 0);
});

formFiltros.addEventListener('submit', e => {
  e.preventDefault(); paginaActual = 1; renderTabla();
});

/* ──────────────────────────────────────────
   18. EVENTOS BOTONES + ATAJOS
────────────────────────────────────────── */
btnNueva.addEventListener('click', abrirModalNuevo);
btnDescargar.addEventListener('click', exportarCSV);
btnGenerarReporte.addEventListener('click', exportarCSV);

document.addEventListener('keydown', e => {
  if (e.altKey && e.key === 'n') { e.preventDefault(); abrirModalNuevo(); }
});

/* ──────────────────────────────────────────
   19. INICIALIZACIÓN
────────────────────────────────────────── */
renderTabla();
