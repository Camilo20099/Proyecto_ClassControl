/* ============================================================
   ActividadesJS.js — ClassControl
   CRUD completo + filtros reactivos + paginación propia
   Migrado a Bootstrap 5 · Mejoras: modal detalle, XSS safe,
   CSV con BOM, atajo Alt+N, sidebar toggle móvil
   ============================================================ */

'use strict';

/* ──────────────────────────────────────────
   1. DATOS INICIALES
────────────────────────────────────────── */
let actividades = [
  {
    id: 1, codigo: 'ACT-001',
    nombre: 'Taller de Lógica de Programación',
    descripcion: 'Fundamentos de algoritmos y pseudocódigo básico.',
    ficha: '2503452', instructor: 'Juan Pérez', iniciales: 'JP',
    ambiente: 'Ambiente 102', dias: 'Lun - Mar',
    horaInicio: '07:00', horaFin: '12:00',
  },
  {
    id: 2, codigo: 'ACT-002',
    nombre: 'Desarrollo de Interfaces Web',
    descripcion: 'Maquetación avanzada con HTML5 y CSS Grid.',
    ficha: '2503452', instructor: 'Maria García', iniciales: 'MG',
    ambiente: 'Laboratorio 4', dias: 'Miércoles',
    horaInicio: '13:00', horaFin: '18:00',
  },
  {
    id: 3, codigo: 'ACT-003',
    nombre: 'Gestión de Bases de Datos',
    descripcion: 'Modelado relacional y sentencias SQL.',
    ficha: '2612980', instructor: 'Carlos Ruiz', iniciales: 'CR',
    ambiente: 'Ambiente 205', dias: 'Jue - Vie',
    horaInicio: '07:00', horaFin: '12:00',
  },
];

let nextId       = 4;
let paginaActual = 1;
const POR_PAGINA = 5;
let idAEliminar  = null;

/* ──────────────────────────────────────────
   2. SELECTORES DOM
────────────────────────────────────────── */
const tbodyActividades = document.getElementById('tbody-actividades');
const contadorEl       = document.getElementById('contador-actividades');
const paginacionEl     = document.getElementById('paginacion');

const formFiltros      = document.getElementById('form-filtros');
const filtroBusqueda   = document.getElementById('filtro-busqueda');
const filtroFicha      = document.getElementById('filtro-ficha');
const filtroInstructor = document.getElementById('filtro-instructor');
const filtroDia        = document.getElementById('filtro-dia');

const formActividad    = document.getElementById('form-actividad');
const modalTituloEl    = document.getElementById('modal-titulo');
const actividadId      = document.getElementById('actividad-id');
const actNombre        = document.getElementById('act-nombre');
const actDescripcion   = document.getElementById('act-descripcion');
const actFicha         = document.getElementById('act-ficha');
const actInstructor    = document.getElementById('act-instructor');
const actAmbiente      = document.getElementById('act-ambiente');
const actDias          = document.getElementById('act-dias');
const actHoraInicio    = document.getElementById('act-hora-inicio');
const actHoraFin       = document.getElementById('act-hora-fin');

const btnNuevaActividad = document.getElementById('btn-nueva-actividad');
const btnConfirmarElim  = document.getElementById('btn-confirmar-eliminar');

const toastEl   = document.getElementById('toast');
const toastMsg  = document.getElementById('toast-msg');
const toastIcon = document.getElementById('toast-icon');

/* Bootstrap modals (instanciados una vez) */
const bsModalActividad = new bootstrap.Modal(document.getElementById('modal-actividad'));
const bsModalEliminar  = new bootstrap.Modal(document.getElementById('modal-eliminar'));
const bsModalDetalle   = new bootstrap.Modal(document.getElementById('modal-detalle'));

/* Sidebar toggle móvil */
document.getElementById('btnSidebarToggle')?.addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('open');
});

/* ──────────────────────────────────────────
   3. UTILIDADES
────────────────────────────────────────── */
/** Genera iniciales desde nombre completo */
function getIniciales(nombre) {
  return nombre.split(' ').slice(0, 2).map(p => p[0]?.toUpperCase() ?? '').join('');
}

/** Genera el próximo código de actividad */
function generarCodigo() {
  const max = actividades.reduce((m, a) => {
    const n = parseInt(a.codigo.replace('ACT-', ''), 10);
    return n > m ? n : m;
  }, 0);
  return `ACT-${String(max + 1).padStart(3, '0')}`;
}

/** Formatea horario legible */
function formatHorario(inicio, fin) {
  if (!inicio && !fin) return '—';
  if (!fin)            return inicio;
  return `${inicio} – ${fin}`;
}

/** Escapa HTML para prevenir XSS */
function escHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ──────────────────────────────────────────
   4. FILTRADO
────────────────────────────────────────── */
function filtrarActividades() {
  const busq  = filtroBusqueda.value.trim().toLowerCase();
  const ficha = filtroFicha.value;
  const instr = filtroInstructor.value;
  const dia   = filtroDia.value.toLowerCase();

  return actividades.filter(a =>
    (!busq  || a.nombre.toLowerCase().includes(busq)
            || a.codigo.toLowerCase().includes(busq)
            || (a.descripcion ?? '').toLowerCase().includes(busq)) &&
    (!ficha || a.ficha === ficha) &&
    (!instr || a.instructor === instr) &&
    (!dia   || (a.dias ?? '').toLowerCase().includes(dia))
  );
}

/* ──────────────────────────────────────────
   5. RENDER TABLA
────────────────────────────────────────── */
function renderTabla() {
  const filtradas = filtrarActividades();
  const total     = filtradas.length;
  const totalPags = Math.max(1, Math.ceil(total / POR_PAGINA));

  if (paginaActual > totalPags) paginaActual = totalPags;

  const inicio = (paginaActual - 1) * POR_PAGINA;
  const pagina = filtradas.slice(inicio, inicio + POR_PAGINA);

  if (pagina.length === 0) {
    tbodyActividades.innerHTML = `
      <tr class="cc-empty-row">
        <td colspan="7">
          <span class="material-symbols-outlined cc-empty-icon">search_off</span>
          No se encontraron actividades con los filtros aplicados.
        </td>
      </tr>`;
  } else {
    tbodyActividades.innerHTML = pagina.map(crearFila).join('');
  }

  const desde = total === 0 ? 0 : inicio + 1;
  const hasta  = Math.min(inicio + POR_PAGINA, total);
  contadorEl.textContent =
    `Mostrando ${desde}–${hasta} de ${total} actividad${total !== 1 ? 'es' : ''}`;

  renderPaginacion(totalPags);
}

function crearFila(a) {
  return `
  <tr data-id="${a.id}">
    <td><span class="cc-code">${escHtml(a.codigo)}</span></td>
    <td>
      <div class="fw-semibold">${escHtml(a.nombre)}</div>
      <div class="small text-muted text-truncate" style="max-width:240px">${escHtml(a.descripcion || '—')}</div>
    </td>
    <td>
      <span class="d-inline-flex align-items-center gap-1 text-muted small">
        <span class="material-symbols-outlined" style="font-size:.9rem">tag</span>${escHtml(a.ficha)}
      </span>
    </td>
    <td>
      <div class="d-flex align-items-center gap-2">
        <span class="cc-initials">${escHtml(a.iniciales)}</span>
        <span class="small">${escHtml(a.instructor)}</span>
      </div>
    </td>
    <td><span class="cc-badge-amb">${escHtml(a.ambiente)}</span></td>
    <td>
      <div class="small lh-sm">
        <div class="fw-medium">${escHtml(a.dias || '—')}</div>
        <div class="text-muted fst-italic">${escHtml(formatHorario(a.horaInicio, a.horaFin))}</div>
      </div>
    </td>
    <td class="text-end">
      <div class="action-btns d-flex justify-content-end gap-1">
        <button class="cc-btn-icon cc-btn-icon-view btn-ver" data-id="${a.id}" title="Ver detalle">
          <span class="material-symbols-outlined">visibility</span>
        </button>
        <button class="cc-btn-icon cc-btn-icon-edit btn-editar" data-id="${a.id}" title="Editar">
          <span class="material-symbols-outlined">edit</span>
        </button>
        <button class="cc-btn-icon cc-btn-icon-del btn-eliminar" data-id="${a.id}" title="Eliminar">
          <span class="material-symbols-outlined">delete</span>
        </button>
      </div>
    </td>
  </tr>`;
}

/* ──────────────────────────────────────────
   6. PAGINACIÓN
────────────────────────────────────────── */
function renderPaginacion(totalPags) {
  paginacionEl.innerHTML = '';

  paginacionEl.appendChild(
    crearBtnNav('chevron_left', paginaActual === 1, () => { paginaActual--; renderTabla(); })
  );

  calcularRango(paginaActual, totalPags).forEach(item => {
    if (item === '...') {
      const ell = document.createElement('span');
      ell.className   = 'cc-page-ellipsis';
      ell.textContent = '…';
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
  btn.className = 'cc-page-btn';
  btn.disabled  = disabled;
  btn.innerHTML = `<span class="material-symbols-outlined" style="font-size:1rem">${icon}</span>`;
  btn.addEventListener('click', handler);
  return btn;
}

function calcularRango(actual, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const rango  = new Set([1, total, actual]);
  if (actual > 1)     rango.add(actual - 1);
  if (actual < total) rango.add(actual + 1);
  const sorted = [...rango].sort((a, b) => a - b);
  const result = [];
  sorted.forEach((n, i) => {
    if (i > 0 && n - sorted[i - 1] > 1) result.push('...');
    result.push(n);
  });
  return result;
}

/* ──────────────────────────────────────────
   7. MODAL CREAR / EDITAR (Bootstrap 5)
────────────────────────────────────────── */
function abrirModalNuevo() {
  modalTituloEl.textContent = 'Nueva Actividad';
  formActividad.reset();
  actividadId.value = '';
  limpiarValidacion();
  bsModalActividad.show();
}

function abrirModalEditar(id) {
  const a = actividades.find(x => x.id === id);
  if (!a) return;
  modalTituloEl.textContent = 'Editar Actividad';
  actividadId.value    = a.id;
  actNombre.value      = a.nombre;
  actDescripcion.value = a.descripcion || '';
  actFicha.value       = a.ficha;
  actInstructor.value  = a.instructor;
  actAmbiente.value    = a.ambiente;
  actDias.value        = a.dias || '';
  actHoraInicio.value  = a.horaInicio || '';
  actHoraFin.value     = a.horaFin || '';
  limpiarValidacion();
  bsModalActividad.show();
}

/* Limpiar validación al cerrar */
document.getElementById('modal-actividad').addEventListener('hidden.bs.modal', () => {
  formActividad.reset();
  limpiarValidacion();
});

/* ──────────────────────────────────────────
   8. MODAL DETALLE (Bootstrap 5 — reemplaza alert)
────────────────────────────────────────── */
function verDetalle(id) {
  const a = actividades.find(x => x.id === id);
  if (!a) return;

  const filas = [
    ['Código',     a.codigo],
    ['Ficha',      a.ficha],
    ['Instructor', a.instructor],
    ['Ambiente',   a.ambiente],
    ['Días',       a.dias || '—'],
    ['Horario',    formatHorario(a.horaInicio, a.horaFin)],
    ['Descripción',a.descripcion || 'Sin descripción.'],
  ];

  document.getElementById('detalle-titulo').textContent = a.nombre;
  document.getElementById('detalle-body').innerHTML = filas.map(([label, val]) => `
    <div class="cc-detail-row">
      <span class="cc-detail-label">${escHtml(label)}</span>
      <span class="cc-detail-value">${escHtml(val)}</span>
    </div>`).join('');

  bsModalDetalle.show();
}

/* ──────────────────────────────────────────
   9. VALIDACIÓN (Bootstrap 5 nativa)
────────────────────────────────────────── */
function validarFormulario() {
  const requeridos = [actNombre, actFicha, actInstructor, actAmbiente];
  let valido = true;
  requeridos.forEach(campo => {
    if (!campo.value.trim()) {
      campo.classList.add('is-invalid');
      campo.classList.remove('is-valid');
      valido = false;
    } else {
      campo.classList.remove('is-invalid');
      campo.classList.add('is-valid');
    }
  });
  return valido;
}

function limpiarValidacion() {
  [actNombre, actFicha, actInstructor, actAmbiente].forEach(c => {
    c.classList.remove('is-invalid', 'is-valid');
  });
}

/* ──────────────────────────────────────────
   10. GUARDAR ACTIVIDAD
────────────────────────────────────────── */
formActividad.addEventListener('submit', e => {
  e.preventDefault();
  if (!validarFormulario()) return;

  const id       = actividadId.value ? parseInt(actividadId.value, 10) : null;
  const nombre   = actNombre.value.trim();
  const instrNom = actInstructor.value;

  const datos = {
    nombre,
    descripcion : actDescripcion.value.trim(),
    ficha       : actFicha.value,
    instructor  : instrNom,
    iniciales   : getIniciales(instrNom),
    ambiente    : actAmbiente.value.trim(),
    dias        : actDias.value.trim(),
    horaInicio  : actHoraInicio.value,
    horaFin     : actHoraFin.value,
  };

  if (id) {
    const idx = actividades.findIndex(x => x.id === id);
    actividades[idx] = { ...actividades[idx], ...datos };
    mostrarToast('Actividad actualizada correctamente.', 'check_circle', 'var(--cc-primary)');
  } else {
    actividades.unshift({ id: nextId++, codigo: generarCodigo(), ...datos });
    paginaActual = 1;
    mostrarToast('Actividad creada correctamente.', 'check_circle', 'var(--cc-primary)');
  }

  bsModalActividad.hide();
  renderTabla();
});

/* ──────────────────────────────────────────
   11. ELIMINAR ACTIVIDAD
────────────────────────────────────────── */
function abrirModalEliminar(id) {
  idAEliminar = id;
  bsModalEliminar.show();
}

btnConfirmarElim.addEventListener('click', () => {
  actividades = actividades.filter(a => a.id !== idAEliminar);
  idAEliminar = null;
  bsModalEliminar.hide();
  renderTabla();
  mostrarToast('Actividad eliminada.', 'delete', '#ef4444');
});

/* ──────────────────────────────────────────
   12. DESCARGA CSV
────────────────────────────────────────── */
function descargarCSV() {
  const BOM      = '\uFEFF';
  const cabecera = ['Código', 'Nombre', 'Ficha', 'Instructor', 'Ambiente', 'Días', 'Inicio', 'Fin'];
  const filas    = actividades.map(a =>
    [a.codigo, `"${a.nombre.replace(/"/g, '""')}"`, a.ficha, a.instructor, a.ambiente,
     a.dias, a.horaInicio, a.horaFin].join(',')
  );
  const csv  = BOM + [cabecera.join(','), ...filas].join('\r\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url  = URL.createObjectURL(blob);
  const a    = Object.assign(document.createElement('a'), {
    href: url, download: 'actividades_classcontrol.csv'
  });
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  mostrarToast('Reporte descargado.', 'download', '#3b82f6');
}

document.getElementById('btn-filtrar')?.closest('form');
/* Botón de descarga (si existe en el HTML) */
document.getElementById('btn-descargar')?.addEventListener('click', descargarCSV);

/* ──────────────────────────────────────────
   13. TOAST
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
   14. DELEGACIÓN DE EVENTOS EN TABLA
────────────────────────────────────────── */
tbodyActividades.addEventListener('click', e => {
  const btnVer  = e.target.closest('.btn-ver');
  const btnEdit = e.target.closest('.btn-editar');
  const btnDel  = e.target.closest('.btn-eliminar');
  if (btnVer)  verDetalle(parseInt(btnVer.dataset.id, 10));
  if (btnEdit) abrirModalEditar(parseInt(btnEdit.dataset.id, 10));
  if (btnDel)  abrirModalEliminar(parseInt(btnDel.dataset.id, 10));
});

/* ──────────────────────────────────────────
   15. FILTROS REACTIVOS
────────────────────────────────────────── */
[filtroBusqueda, filtroFicha, filtroInstructor, filtroDia].forEach(el => {
  el.addEventListener('input', () => { paginaActual = 1; renderTabla(); });
});

formFiltros.addEventListener('reset', () => {
  setTimeout(() => { paginaActual = 1; renderTabla(); }, 0);
});

formFiltros.addEventListener('submit', e => {
  e.preventDefault();
  paginaActual = 1;
  renderTabla();
});

/* ──────────────────────────────────────────
   16. ATAJOS DE TECLADO
────────────────────────────────────────── */
btnNuevaActividad.addEventListener('click', abrirModalNuevo);

document.addEventListener('keydown', e => {
  if (e.altKey && e.key === 'n') { e.preventDefault(); abrirModalNuevo(); }
});

/* ──────────────────────────────────────────
   17. INICIALIZACIÓN
────────────────────────────────────────── */
renderTabla();
