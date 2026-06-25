/* ClassControl - Gestión de Usuarios (Bootstrap + DataTables + Chart.js) */

let users = [
  { id: 'CC-2024-001', name: 'Carlos Alberto Ruiz', email: 'c.ruiz@classcontrol.edu', role: 'Coordinador', status: 'Activo', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBeTCD1C9SARhaCgpJxiP_xBsKcYpQvcECk4FsPMU0MmzI4AnVh9W_tF8F7z6_1cInzXikJ8Qifrif82j0OOPlYPQ7wRbe8VR8fAnnEWn2pgzbJZId-MuLcgciyJHhKAXjYazsBFaqRoXL09opCdpFat-UtnVydT9grTD2TUedzzC09nszKiRjC5hCdMRFr2Yz5d264o-gcR0s39JMgcV54dooisbdK4mcJbmG_G-ZhS5RTF8z0Ne9RR8fodqm8Uui-Hu03O8Ybowc' },
  { id: 'CC-2024-042', name: 'Elena Sofia Mendez', email: 'e.mendez@classcontrol.edu', role: 'Instructor', status: 'Activo', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_PsDFACT_hecssaTMWB0OAWpYR_hBjtnlGLcjgGA9j9H99V_QMcYSht4K1zxuwX2SYRcuZRmevAyaBKI_J-vFROz1xA6VVbKhwHuUF2FiFrzrMnITfAd80Gre-tDasluvsHpmA96kRyle1-orajP9sGArThjsLQksV0madE3he27cs5sHkmhiLA3vsKMANM2XWyxzGyo3nFsrlvDEcPy72EXNuH7qW-NIa0Jb-FvfV3QPCLVbWNQWgChekXj0V20Y_8H87H-U0vk' },
  { id: 'CC-2024-015', name: 'Marcos Peña Giraldo', email: 'm.pena@classcontrol.edu', role: 'Admin', status: 'Inactivo', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDC917rFnf5IS1YhxjxKb33dmhr8VdYLUOQ9U9_idceS2DRUUrDOrSdS7sIm-TeOJBE6DnCqdaS_0PQiEiaTSMUSScjRJHhuCl1uLtgqI73pmxNomoMPilz1vO-0TtU04GfxS08ROJ69YdbmmAxXdqVk3eAfhRirnzeJPTOAOoa1bHDzfyGEtGVKGbQBlAtflW9xikuejQT1INuZzdy3gwa9KC9TcIIT-Z550Vqnm2tSgWI8jClt-FR_xMEBfo8Sjm8rWwfUuusurM' },
  { id: 'CC-2024-089', name: 'Diana María Ospina', email: 'd.ospina@classcontrol.edu', role: 'Instructor', status: 'Activo', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAe97YcW31Ku_Qzlkay_FOnLlrwoFp-aHedfBZtL1TRN5uPQ93euII37ihUgL8vnx0XD1k1hBA32F7vbVhlPyzzP78tWyjcmaMwyCmfO_EL1wabdjCtkuWpLMpCR6snZoixTBTagGgJNE-BW2nILWXb17inEoFs5Qx-bLWf3djED_raj8zW3ERUSj4qBXtDBap2g4L4TSQFTL7loq_RIKWV7crk50NmKMpKdc_MxzQjIcz7N7cXNT3e7X4z4TV9PKwfAo3upOj6Qc' }
];

let editingId = null;
let dataTable = null;
let roleChart = null;
let statusChart = null;

const userModalEl = document.getElementById('userModal');
const userModal = new bootstrap.Modal(userModalEl);
const toastEl = document.getElementById('appToast');
const appToast = new bootstrap.Toast(toastEl, { delay: 2500 });

function getInitials(name) {
  return name.split(' ').slice(0, 2).map(p => p[0]).join('').toUpperCase();
}

function avatarHTML(user) {
  if (user.avatar) {
    return `<img src="${user.avatar}" alt="avatar" class="rounded-circle" width="36" height="36" style="object-fit:cover;">`;
  }
  return `<div class="rounded-circle d-inline-flex align-items-center justify-content-center" style="width:36px;height:36px;background:#e8f5e0;color:#38a800;font-weight:700;">${getInitials(user.name)}</div>`;
}

function roleBadge(role) {
  const map = {
    Admin: 'bg-dark-subtle text-dark-emphasis',
    Coordinador: 'bg-info-subtle text-info-emphasis',
    Instructor: 'bg-success-subtle text-success-emphasis'
  };
  return `<span class="badge rounded-pill ${map[role] || 'bg-secondary-subtle text-secondary-emphasis'} badge-role">${role}</span>`;
}

function statusBadge(status) {
  if (status === 'Activo') return '<span class="badge text-bg-success">Activo</span>';
  return '<span class="badge text-bg-secondary">Inactivo</span>';
}

function rowTemplate(user) {
  return [
    `<div class="d-flex align-items-center gap-2">${avatarHTML(user)}<div><div class="fw-semibold">${user.name}</div><small class="text-muted">ID: ${user.id}</small></div></div>`,
    user.email,
    roleBadge(user.role),
    statusBadge(user.status),
    `<div class="text-end">
      <button class="btn btn-sm btn-outline-primary me-1" onclick="openEditModal('${user.id}')">Editar</button>
      <button class="btn btn-sm btn-outline-danger" onclick="deleteUser('${user.id}')">Eliminar</button>
    </div>`
  ];
}

function refreshTable() {
  if (!dataTable) return;
  dataTable.clear();
  users.forEach(u => dataTable.row.add(rowTemplate(u)));
  dataTable.draw();
  updateStats();
  updateCharts();
}

function updateStats() {
  const total = users.length;
  const active = users.filter(u => u.status === 'Activo').length;
  const inactive = total - active;
  const pct = total ? ((active / total) * 100).toFixed(1) : '0.0';

  document.getElementById('statTotal').textContent = total.toLocaleString('es-CO');
  document.getElementById('statActive').textContent = active.toLocaleString('es-CO');
  document.getElementById('statInactive').textContent = inactive.toLocaleString('es-CO');
  document.getElementById('statPct').textContent = `${pct}% de la nómina total`;
}

function countBy(list, field) {
  return list.reduce((acc, item) => {
    const key = item[field];
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
}

function updateCharts() {
  const roleCounts = countBy(users, 'role');
  const statusCounts = countBy(users, 'status');

  if (roleChart) {
    roleChart.data.labels = Object.keys(roleCounts);
    roleChart.data.datasets[0].data = Object.values(roleCounts);
    roleChart.update();
  }

  if (statusChart) {
    statusChart.data.labels = Object.keys(statusCounts);
    statusChart.data.datasets[0].data = Object.values(statusCounts);
    statusChart.update();
  }
}

function initCharts() {
  const roleCtx = document.getElementById('roleChart');
  const statusCtx = document.getElementById('statusChart');

  roleChart = new Chart(roleCtx, {
    type: 'doughnut',
    data: {
      labels: [],
      datasets: [{
        data: [],
        backgroundColor: ['#38a800', '#00304d', '#6ea8fe', '#ffc107']
      }]
    },
    options: { responsive: true, plugins: { legend: { position: 'bottom' } } }
  });

  statusChart = new Chart(statusCtx, {
    type: 'bar',
    data: {
      labels: [],
      datasets: [{ label: 'Usuarios', data: [], backgroundColor: ['#38a800', '#6c757d'] }]
    },
    options: {
      responsive: true,
      scales: { y: { beginAtZero: true, ticks: { precision: 0 } } },
      plugins: { legend: { display: false } }
    }
  });

  updateCharts();
}

function showToast(message, type = 'success') {
  const body = document.getElementById('appToastBody');
  toastEl.classList.remove('toast-success', 'toast-info', 'toast-error');
  body.textContent = message;
  if (type === 'error') toastEl.classList.add('toast-error');
  else if (type === 'info') toastEl.classList.add('toast-info');
  else toastEl.classList.add('toast-success');
  appToast.show();
}

function clearValidation() {
  const form = document.getElementById('userForm');
  form.classList.remove('was-validated');
  [...form.elements].forEach(el => {
    if (el.classList) el.classList.remove('is-invalid');
  });
}

function setInvalid(fieldId, message) {
  const field = document.getElementById(fieldId);
  field.classList.add('is-invalid');
  if (message) {
    const feedback = document.getElementById(`${fieldId}Feedback`);
    if (feedback) feedback.textContent = message;
  }
}

function validateForm() {
  clearValidation();
  const form = document.getElementById('userForm');

  const name = document.getElementById('fieldName').value.trim();
  const email = document.getElementById('fieldEmail').value.trim();
  const id = document.getElementById('fieldId').value.trim();
  const role = document.getElementById('fieldRole').value;
  const status = document.getElementById('fieldStatus').value;
  const password = document.getElementById('fieldPassword').value;

  let valid = true;

  if (name.length < 3) {
    setInvalid('fieldName');
    valid = false;
  }

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(email)) {
    setInvalid('fieldEmail', 'Correo electrónico no válido.');
    valid = false;
  } else {
    const dupEmail = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.id !== editingId);
    if (dupEmail) {
      setInvalid('fieldEmail', 'Este correo ya está registrado.');
      valid = false;
    }
  }

  if (!/^CC-\d{4}-\d{3}$/.test(id)) {
    setInvalid('fieldId', 'Formato: CC-AAAA-NNN (ej. CC-2024-001).');
    valid = false;
  } else {
    const dupId = users.find(u => u.id === id && u.id !== editingId);
    if (dupId) {
      setInvalid('fieldId', 'Este ID ya existe.');
      valid = false;
    }
  }

  if (!role) {
    setInvalid('fieldRole');
    valid = false;
  }

  if (!status) {
    setInvalid('fieldStatus');
    valid = false;
  }

  if (!editingId && password.length < 6) {
    setInvalid('fieldPassword', 'La contraseña debe tener al menos 6 caracteres.');
    valid = false;
  }

  if (!valid) form.classList.add('was-validated');
  return valid;
}

function openNewModal() {
  editingId = null;
  document.getElementById('userModalLabel').textContent = 'Nuevo Usuario';
  document.getElementById('submitUserBtn').textContent = 'Crear Usuario';
  document.getElementById('userForm').reset();
  clearValidation();
  userModal.show();
}

window.openEditModal = function (id) {
  const user = users.find(u => u.id === id);
  if (!user) return;

  editingId = id;
  document.getElementById('userModalLabel').textContent = 'Editar Usuario';
  document.getElementById('submitUserBtn').textContent = 'Guardar Cambios';

  document.getElementById('fieldName').value = user.name;
  document.getElementById('fieldEmail').value = user.email;
  document.getElementById('fieldId').value = user.id;
  document.getElementById('fieldRole').value = user.role;
  document.getElementById('fieldStatus').value = user.status;
  document.getElementById('fieldPassword').value = '';
  clearValidation();
  userModal.show();
};

window.deleteUser = function (id) {
  const user = users.find(u => u.id === id);
  if (!user) return;
  if (!window.confirm(`¿Eliminar a "${user.name}" (${user.id})?`)) return;

  users = users.filter(u => u.id !== id);
  refreshTable();
  showToast(`Usuario "${user.name}" eliminado.`, 'error');
};

function exportCSV() {
  const roleFilter = document.getElementById('filterRole').value;
  const statusFilter = document.getElementById('filterStatus').value;
  const search = document.getElementById('searchInput').value.trim().toLowerCase();

  const filtered = users.filter(u => {
    const mRole = !roleFilter || u.role === roleFilter;
    const mStatus = !statusFilter || u.status === statusFilter;
    const mSearch = !search || [u.id, u.name, u.email, u.role, u.status].join(' ').toLowerCase().includes(search);
    return mRole && mStatus && mSearch;
  });

  const rows = [['ID', 'Nombre', 'Correo', 'Rol', 'Estado'], ...filtered.map(u => [u.id, u.name, u.email, u.role, u.status])];
  const csv = rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `usuarios_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('Exportación CSV lista.', 'info');
}

function initDataTable() {
  dataTable = $('#usersTable').DataTable({
    data: users.map(rowTemplate),
    columns: [
      { title: 'Usuario' },
      { title: 'Correo' },
      { title: 'Rol' },
      { title: 'Estado' },
      { title: 'Acciones', orderable: false, searchable: false }
    ],
    pageLength: 5,
    lengthMenu: [5, 10, 25, 50],
    order: [[0, 'asc']],
    language: {
      search: 'Buscar:',
      lengthMenu: 'Mostrar _MENU_ registros',
      info: 'Mostrando _START_ a _END_ de _TOTAL_ usuarios',
      infoEmpty: 'Mostrando 0 a 0 de 0 usuarios',
      zeroRecords: 'No se encontraron usuarios',
      paginate: { first: 'Primero', last: 'Último', next: 'Siguiente', previous: 'Anterior' }
    }
  });

  $.fn.dataTable.ext.search.push(function (_, data) {
    const roleFilter = document.getElementById('filterRole').value;
    const statusFilter = document.getElementById('filterStatus').value;
    const roleText = $('<div>').html(data[2]).text().trim();
    const statusText = $('<div>').html(data[3]).text().trim();

    const roleOk = !roleFilter || roleText === roleFilter;
    const statusOk = !statusFilter || statusText === statusFilter;
    return roleOk && statusOk;
  });
}

function bindEvents() {
  document.getElementById('btnNewUser').addEventListener('click', openNewModal);

  document.getElementById('searchInput').addEventListener('input', function (e) {
    dataTable.search(e.target.value).draw();
  });

  document.getElementById('filterRole').addEventListener('change', function () {
    dataTable.draw();
  });

  document.getElementById('filterStatus').addEventListener('change', function () {
    dataTable.draw();
  });

  document.getElementById('btnExport').addEventListener('click', exportCSV);

  document.getElementById('userForm').addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validateForm()) return;

    const name = document.getElementById('fieldName').value.trim();
    const email = document.getElementById('fieldEmail').value.trim();
    const id = document.getElementById('fieldId').value.trim();
    const role = document.getElementById('fieldRole').value;
    const status = document.getElementById('fieldStatus').value;

    if (editingId) {
      const index = users.findIndex(u => u.id === editingId);
      users[index] = { ...users[index], name, email, id, role, status };
      showToast(`Usuario "${name}" actualizado correctamente.`, 'success');
    } else {
      users.unshift({ id, name, email, role, status, avatar: '' });
      showToast(`Usuario "${name}" creado correctamente.`, 'success');
    }

    userModal.hide();
    refreshTable();
  });

  userModalEl.addEventListener('hidden.bs.modal', () => {
    editingId = null;
    document.getElementById('userForm').reset();
    clearValidation();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initDataTable();
  bindEvents();
  initCharts();
  updateStats();
});