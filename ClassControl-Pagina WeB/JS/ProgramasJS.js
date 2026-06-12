/* ============================================================
   ProgramasJS.js — ClassControl
   CRUD completo + filtros reactivos + paginación propia
   + métricas dinámicas + descarga CSV
   Migrado a Bootstrap 5 (modales via bootstrap.Modal API)
   ============================================================ */

'use strict';

/* ──────────────────────────────────────────
   1. DATOS INICIALES
────────────────────────────────────────── */
let programas = [
  { id: 1, codigo: '228106', nombre: 'Análisis y Desarrollo de Software',                       nivel: 'Tecnólogo',        version: 102, estado: 'Activo'   },
  { id: 2, codigo: '524105', nombre: 'Sistemas Telemáticos',                                    nivel: 'Técnico',          version: 1,   estado: 'Activo'   },
  { id: 3, codigo: '123512', nombre: 'Gestión de Talento Humano',                               nivel: 'Especialización',  version: 12,  estado: 'Inactivo' },
  { id: 4, codigo: '228118', nombre: 'Programación de Aplicaciones para Dispositivos Móviles',  nivel: 'Técnico',          version: 3,   estado: 'Activo'   },
  { id: 5, codigo: '135001', nombre: 'Contabilización de Operaciones Comerciales y Financieras',nivel: 'Técnico',          version: 4,   estado: 'Activo'   },
  { id: 6, codigo: '623615', nombre: 'Diseño e Integración de Multimedia',                      nivel: 'Tecnólogo',        version: 1,   estado: 'Activo'   },
  { id: 7, codigo: '228185', nombre: 'Gestión de Redes de Datos',                               nivel: 'Tecnólogo',        version: 2,   estado: 'Inactivo' },
];

let nextId       = 8;
let paginaActual = 1;
const POR_PAGINA = 5;
let idAEliminar  = null;

/* ──────────────────────────────────────────
   2. SELECTORES
────────────────────────────────────────── */
const tbodyProgramas   = document.getElementById('tbody-programas');
const contadorEl       = document.getElementById('contador-programas');
const paginacionEl     = document.getElementById('paginacion');
const metricasEl       = document.getElementById('metricas');

const formFiltros      = document.getElementById('form-filtros');
const filtroBusqueda   = document.getElementById('filtro-busqueda');
const filtroNivel      = document.getElementById('filtro-nivel');
const filtroEstado     = document.getElementById('filtro-estado');

const formPrograma     = document.getElementById('form-programa');
const modalTituloEl    = document.getElementById('modal-titulo');
const progId           = document.getElementById('prog-id');
const progCodigo       = document.getElementById('prog-codigo');
const progNombre       = document.getElementById('prog-nombre');
const progNivel        = document.getElementById('prog-nivel');
const progVersion      = document.getElementById('prog-version');
const progEstado       = document.getElementById('prog-estado');

const btnNuevo         = document.getElementById('btn-nuevo-programa');
const btnDescargar     = document.getElementById('btn-descargar');
const btnConfirmarElim = document.getElementById('btn-confirmar-eliminar');

const toastEl          = document.getElementById('toast');
const toastMsg         = document.getElementById('toast-msg');
const toastIcon        = document.getElementById('toast-icon');

/* Bootstrap modals (instanciados una sola vez) */
const bsModalPrograma = new bootstrap.Modal(document.getElementById('modal-programa'));
const bsModalEliminar = new bootstrap.Modal(document.getElementById('modal-eliminar'));

/* Sidebar toggle (móvil) */
document.getElementById('btnSidebarToggle')?.addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('open');
});

/* ──────────────────────────────────────────
   3. MÉTRICAS
────────────────────────────────────────── */
const CONFIG_METRICA = {
  total:           { borde: 'var(--cc-primary)', etiqueta: 'Total Programas'  },
  Técnico:         { borde: '#00304D',           etiqueta: 'Técnicos'         },
  Tecnólogo:       { borde: '#0369a1',           etiqueta: 'Tecnólogos'       },
  Especialización: { borde: '#ea580c',           etiqueta: 'Especializaciones'},
};

function renderMetricas() {
  const datos = [
    { key: 'total',           valor: programas.length },
    { key: 'Técnico',         valor: programas.filter(p => p.nivel === 'Técnico').length },
    { key: 'Tecnólogo',       valor: programas.filter(p => p.nivel === 'Tecnólogo').length },
    { key: 'Especialización', valor: programas.filter(p => p.nivel === 'Especialización').length },
  ];

  metricasEl.innerHTML = datos.map(d => `
    <div class="col-6 col-md-3">
      <div class="cc-metric" style="border-left-color: ${CONFIG_METRICA[d.key].borde}">
        <div class="cc-metric-label">${CONFIG_METRICA[d.key].etiqueta}</div>
        <div class="cc-metric-value">${d.valor}</div>
      </div>
    </div>
  `).join('');
}

/* ──────────────────────────────────────────
   4. FILTRADO
────────────────────────────────────────── */
function filtrarProgramas() {
  const busq   = filtroBusqueda.value.trim().toLowerCase();
  const nivel  = filtroNivel.value;
  const estado = filtroEstado.value;

  return programas.filter(p =>
    (!busq   || p.nombre.toLowerCase().includes(busq) || p.codigo.includes(busq)) &&
    (!nivel  || p.nivel === nivel) &&
    (!estado || p.estado === estado)
  );
}

/* ──────────────────────────────────────────
   5. BADGES
────────────────────────────────────────── */
const NIVEL_BADGE = {
  'Técnico':        'badge-tecnico',
  'Tecnólogo':      'badge-tecnologo',
  'Especialización':'badge-especializacion',
};

function badgeNivel(nivel) {
  const cls = NIVEL_BADGE[nivel] || 'badge-tecnico';
  return `<span class="cc-badge ${cls}"><span class="cc-badge-dot"></span>${escHtml(nivel)}</span>`;
}

function badgeEstado(estado) {
  const activo = estado === 'Activo';
  return `
    <span class="cc-badge ${activo ? 'badge-activo' : 'badge-inactivo'}">
      <span class="material-symbols-outlined" style="font-size:.85rem;font-variation-settings:'FILL' 1,'wght' 400,'GRAD' 0,'opsz' 20">
        ${activo ? 'check_circle' : 'cancel'}
      </span>
      ${escHtml(estado)}
    </span>`;
}

/* ──────────────────────────────────────────
   6. RENDER TABLA
────────────────────────────────────────── */
function renderTabla() {
  const filtrados  = filtrarProgramas();
  const total      = filtrados.length;
  const totalPags  = Math.max(1, Math.ceil(total / POR_PAGINA));

  if (paginaActual > totalPags) paginaActual = totalPags;

  const inicio = (paginaActual - 1) * POR_PAGINA;
  const pagina = filtrados.slice(inicio, inicio + POR_PAGINA);

  if (pagina.length === 0) {
    tbodyProgramas.innerHTML = `
      <tr class="cc-empty-row">
        <td colspan="6">
          <span class="material-symbols-outlined cc-empty-icon">search_off</span>
          No se encontraron programas con los filtros aplicados.
        </td>
      </tr>`;
  } else {
    tbodyProgramas.innerHTML = pagina.map(crearFila).join('');
  }

  const desde = total === 0 ? 0 : inicio + 1;
  const hasta = Math.min(inicio + POR_PAGINA, total);
  contadorEl.textContent =
    `Mostrando ${desde}–${hasta} de ${total} programa${total !== 1 ? 's' : ''}`;

  renderPaginacion(totalPags);
  renderMetricas();
}

function crearFila(p) {
  return `
  <tr data-id="${p.id}">
    <td><span class="cc-code">${escHtml(p.codigo)}</span></td>
    <td class="fw-semibold">${escHtml(p.nombre)}</td>
    <td>${badgeNivel(p.nivel)}</td>
    <td class="text-center fw-medium">${p.version}</td>
    <td>${badgeEstado(p.estado)}</td>
    <td class="text-end">
      <div class="action-btns d-flex justify-content-end gap-1">
        <button class="cc-btn-icon cc-btn-icon-edit btn-editar" data-id="${p.id}" title="Editar">
          <span class="material-symbols-outlined">edit</span>
        </button>
        <button class="cc-btn-icon cc-btn-icon-del btn-eliminar" data-id="${p.id}" title="Eliminar">
          <span class="material-symbols-outlined">delete</span>
        </button>
      </div>
    </td>
  </tr>`;
}

/* Escapa HTML para evitar XSS */
function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ──────────────────────────────────────────
   7. PAGINACIÓN
────────────────────────────────────────── */
function renderPaginacion(totalPags) {
  paginacionEl.innerHTML = '';

  // Prev
  const btnPrev = crearBtnNav('chevron_left', paginaActual === 1, () => { paginaActual--; renderTabla(); });
  paginacionEl.appendChild(btnPrev);

  // Páginas
  calcularRango(paginaActual, totalPags).forEach(item => {
    if (item === '...') {
      const ell = document.createElement('span');
      ell.className = 'cc-page-ellipsis';
      ell.textContent = '…';
      paginacionEl.appendChild(ell);
    } else {
      const btn = document.createElement('button');
      btn.className = `cc-page-btn${item === paginaActual ? ' active' : ''}`;
      btn.textContent = item;
      btn.addEventListener('click', () => { paginaActual = item; renderTabla(); });
      paginacionEl.appendChild(btn);
    }
  });

  // Next
  const btnNext = crearBtnNav('chevron_right', paginaActual === totalPags, () => { paginaActual++; renderTabla(); });
  paginacionEl.appendChild(btnNext);
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
  const rango = new Set([1, total, actual]);
  if (actual > 1) rango.add(actual - 1);
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
   8. MODAL CREAR / EDITAR (Bootstrap 5)
────────────────────────────────────────── */
function abrirModalNuevo() {
  modalTituloEl.textContent = 'Nuevo Programa';
  formPrograma.reset();
  progId.value = '';
  limpiarValidacion();
  bsModalPrograma.show();
}

function abrirModalEditar(id) {
  const p = programas.find(x => x.id === id);
  if (!p) return;
  modalTituloEl.textContent = 'Editar Programa';
  progId.value      = p.id;
  progCodigo.value  = p.codigo;
  progNombre.value  = p.nombre;
  progNivel.value   = p.nivel;
  progVersion.value = p.version;
  progEstado.value  = p.estado;
  limpiarValidacion();
  bsModalPrograma.show();
}

/* ──────────────────────────────────────────
   9. VALIDACIÓN (Bootstrap 5 nativa)
────────────────────────────────────────── */
function validarFormulario() {
  const campos = [progCodigo, progNombre, progNivel, progVersion, progEstado];
  let valido = true;

  campos.forEach(campo => {
    if (!campo.value.toString().trim()) {
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
  [progCodigo, progNombre, progNivel, progVersion, progEstado].forEach(c => {
    c.classList.remove('is-invalid', 'is-valid');
  });
}

/* ──────────────────────────────────────────
   10. GUARDAR
────────────────────────────────────────── */
formPrograma.addEventListener('submit', e => {
  e.preventDefault();
  if (!validarFormulario()) return;

  const id = progId.value ? parseInt(progId.value, 10) : null;
  const datos = {
    codigo  : progCodigo.value.trim(),
    nombre  : progNombre.value.trim(),
    nivel   : progNivel.value,
    version : parseInt(progVersion.value, 10),
    estado  : progEstado.value,
  };

  if (id) {
    const idx = programas.findIndex(x => x.id === id);
    programas[idx] = { ...programas[idx], ...datos };
    mostrarToast('Programa actualizado correctamente.', 'check_circle', 'var(--cc-primary)');
  } else {
    programas.unshift({ id: nextId++, ...datos });
    paginaActual = 1;
    mostrarToast('Programa creado correctamente.', 'check_circle', 'var(--cc-primary)');
  }

  bsModalPrograma.hide();
  renderTabla();
});

/* Limpiar validación al cerrar el modal */
document.getElementById('modal-programa').addEventListener('hidden.bs.modal', () => {
  formPrograma.reset();
  limpiarValidacion();
});

/* ──────────────────────────────────────────
   11. ELIMINAR
────────────────────────────────────────── */
function abrirModalEliminar(id) {
  idAEliminar = id;
  bsModalEliminar.show();
}

btnConfirmarElim.addEventListener('click', () => {
  programas = programas.filter(p => p.id !== idAEliminar);
  idAEliminar = null;
  bsModalEliminar.hide();
  renderTabla();
  mostrarToast('Programa eliminado.', 'delete', '#ef4444');
});

/* ──────────────────────────────────────────
   12. DESCARGA CSV
────────────────────────────────────────── */
btnDescargar.addEventListener('click', () => {
  const BOM      = '\uFEFF'; // UTF-8 BOM para compatibilidad Excel
  const cabecera = ['Código', 'Nombre', 'Nivel', 'Versión', 'Estado'];
  const filas    = programas.map(p =>
    [p.codigo, `"${p.nombre.replace(/"/g, '""')}"`, p.nivel, p.version, p.estado].join(',')
  );
  const csv  = BOM + [cabecera.join(','), ...filas].join('\r\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url  = URL.createObjectURL(blob);
  const a    = Object.assign(document.createElement('a'), { href: url, download: 'programas_classcontrol.csv' });
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  mostrarToast('Reporte descargado.', 'download', '#3b82f6');
});

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
   14. DELEGACIÓN EN TABLA
────────────────────────────────────────── */
tbodyProgramas.addEventListener('click', e => {
  const btnEdit = e.target.closest('.btn-editar');
  const btnDel  = e.target.closest('.btn-eliminar');
  if (btnEdit) abrirModalEditar(parseInt(btnEdit.dataset.id, 10));
  if (btnDel)  abrirModalEliminar(parseInt(btnDel.dataset.id, 10));
});

/* ──────────────────────────────────────────
   15. FILTROS REACTIVOS
────────────────────────────────────────── */
[filtroBusqueda, filtroNivel, filtroEstado].forEach(el => {
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
   16. ATAJO TECLADO  (Nuevo con Alt+N)
────────────────────────────────────────── */
btnNuevo.addEventListener('click', abrirModalNuevo);

document.addEventListener('keydown', e => {
  if (e.altKey && e.key === 'n') { e.preventDefault(); abrirModalNuevo(); }
});

/* ──────────────────────────────────────────
   17. INICIALIZACIÓN
────────────────────────────────────────── */
renderTabla();
