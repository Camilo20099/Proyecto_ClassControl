/* ═══════════════════════════════════════════════════════════════
   ClassControl — Bloque de catálogos (reemplaza el script inline
   al final de Pagina_Principal.jsp)
   ═══════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  /* ── Mapa: data-catalogo → Servlet ── */
  const SERVLET_MAP = {
    programa           : "RegistrarPrograma",
    sede               : "RegistrarSede",
    jornada            : "RegistrarJornada",
    modalidad          : "RegistrarModalidad",
    nivel              : "RegistrarNivel",
    etapa              : "RegistrarEtapa",
    estado             : "RegistrarEstado",
    tipoDocumento      : "RegistrarTipoDocumento",
    tipoVinculacion    : "RegistrarTipoVinculacion",
    rol                : "RegistrarRol",
    trimestre          : "RegistrarTrimestre",
    competencia        : "RegistrarCompetencia",
    resultado          : "RegistrarResultado",
    vinculacionLaboral : "RegistrarVinculacionLaboral",
    programacion       : "RegistrarProgramacion",
  };

  /* ── Mapa: data-catalogo → campos HTML del form ──
     Los `name` coinciden exactamente con lo que lee cada Servlet.
  ── */
  const FIELDS_MAP = {

    /* RegistrarRol → texto(request, "descripcion_Roles") */
    rol: `
      <div class="col-12">
        <label class="form-label">Descripción del rol *</label>
        <input name="descripcion_Roles" class="form-control"
               placeholder="ej. Instructor" required />
        <div class="invalid-feedback">Ingresa la descripción</div>
      </div>`,

    /* RegistrarSede → texto(request, "nombre_sede") */
    sede: `
      <div class="col-12">
        <label class="form-label">Nombre de la sede *</label>
        <input name="nombre_sede" class="form-control"
               placeholder="ej. Sede Centro" required />
        <div class="invalid-feedback">Ingresa el nombre de la sede</div>
      </div>`,

    /* RegistrarPrograma → entero("codigo_programa") + texto("nombre_programa") */
    programa: `
      <div class="col-5">
        <label class="form-label">Código *</label>
        <input name="codigo_programa" type="number" class="form-control"
               placeholder="ej. 228122" required />
        <div class="invalid-feedback">Ingresa el código</div>
      </div>
      <div class="col-7">
        <label class="form-label">Nombre del programa *</label>
        <input name="nombre_programa" class="form-control"
               placeholder="ej. Análisis y Desarrollo de Software" required />
        <div class="invalid-feedback">Ingresa el nombre</div>
      </div>`,

    /* RegistrarJornada → texto("descripcion_Jornada") */
    jornada: `
      <div class="col-12">
        <label class="form-label">Descripción de la jornada *</label>
        <input name="descripcion_Jornada" class="form-control"
               placeholder="ej. Diurna, Nocturna, Madrugada" required />
        <div class="invalid-feedback">Ingresa la descripción</div>
      </div>`,

    /* RegistrarModalidad → texto("descripcion_Modalidad") */
    modalidad: `
      <div class="col-12">
        <label class="form-label">Descripción de la modalidad *</label>
        <input name="descripcion_Modalidad" class="form-control"
               placeholder="ej. Presencial, Virtual, A distancia" required />
        <div class="invalid-feedback">Ingresa la descripción</div>
      </div>`,

    /* RegistrarNivel → texto("descripcion_Nivel_Formacion") */
    nivel: `
      <div class="col-12">
        <label class="form-label">Descripción del nivel *</label>
        <input name="descripcion_Nivel_Formacion" class="form-control"
               placeholder="ej. Técnico, Tecnólogo, Especialización" required />
        <div class="invalid-feedback">Ingresa la descripción</div>
      </div>`,

    /* RegistrarEtapa → texto("descripcion_Etapa") */
    etapa: `
      <div class="col-12">
        <label class="form-label">Descripción de la etapa *</label>
        <input name="descripcion_Etapa" class="form-control"
               placeholder="ej. Lectiva, Productiva" required />
        <div class="invalid-feedback">Ingresa la descripción</div>
      </div>`,

    /* RegistrarEstado → texto("descripcion_Estado") */
    estado: `
      <div class="col-12">
        <label class="form-label">Descripción del estado *</label>
        <input name="descripcion_Estado" class="form-control"
               placeholder="ej. Activo, Inactivo, En proceso" required />
        <div class="invalid-feedback">Ingresa la descripción</div>
      </div>`,

    /* RegistrarTipoDocumento → texto("descripcion_TipoDoc") */
    tipoDocumento: `
      <div class="col-12">
        <label class="form-label">Descripción del tipo de documento *</label>
        <input name="descripcion_TipoDoc" class="form-control"
               placeholder="ej. Cédula de ciudadanía, Tarjeta de identidad" required />
        <div class="invalid-feedback">Ingresa la descripción</div>
      </div>`,

    /* RegistrarTipoVinculacion → texto("descripcion_vinculacion") */
    tipoVinculacion: `
      <div class="col-12">
        <label class="form-label">Descripción del tipo de vinculación *</label>
        <input name="descripcion_vinculacion" class="form-control"
               placeholder="ej. Planta, Contratista, Hora cátedra" required />
        <div class="invalid-feedback">Ingresa la descripción</div>
      </div>`,

    /* RegistrarTrimestre → entero("num_trimestre") + texto("descripcion")
                           + fecha("fecha_inicio") + fecha("fecha_fin") */
    trimestre: `
      <div class="col-4">
        <label class="form-label">Número *</label>
        <input name="num_trimestre" type="number" min="1" max="6"
               class="form-control" placeholder="ej. 1" required />
        <div class="invalid-feedback">Ingresa el número</div>
      </div>
      <div class="col-8">
        <label class="form-label">Descripción *</label>
        <input name="descripcion" class="form-control"
               placeholder="ej. Trimestre 1 - 2025" required />
        <div class="invalid-feedback">Ingresa la descripción</div>
      </div>
      <div class="col-6">
        <label class="form-label">Fecha inicio *</label>
        <input name="fecha_inicio" type="date" class="form-control" required />
        <div class="invalid-feedback">Selecciona la fecha de inicio</div>
      </div>
      <div class="col-6">
        <label class="form-label">Fecha fin *</label>
        <input name="fecha_fin" type="date" class="form-control" required />
        <div class="invalid-feedback">Selecciona la fecha de fin</div>
      </div>`,

    /* RegistrarCompetencia → entero("codigoCompetencias")
                             + texto("descripcionCompetencias")
                             + entero("Programacion_Instructores_id_programacion_Instructores") */
    competencia: `
      <div class="col-5">
        <label class="form-label">Código *</label>
        <input name="codigoCompetencias" type="number" class="form-control"
               placeholder="ej. 210201501" required />
        <div class="invalid-feedback">Ingresa el código</div>
      </div>
      <div class="col-7">
        <label class="form-label">Descripción *</label>
        <input name="descripcionCompetencias" class="form-control"
               placeholder="ej. Construir soluciones de software" required />
        <div class="invalid-feedback">Ingresa la descripción</div>
      </div>
      <div class="col-12">
        <label class="form-label">ID Programación de instructor *</label>
        <input name="Programacion_Instructores_id_programacion_Instructores"
               type="number" class="form-control"
               placeholder="ID de la programación asociada" required />
        <div class="invalid-feedback">Ingresa el ID de la programación</div>
      </div>`,

    /* RegistrarResultado → entero("codigoResultadoAp")
                           + texto("descripcionResul")
                           + entero("Competencias_id_competencias") */
    resultado: `
      <div class="col-5">
        <label class="form-label">Código *</label>
        <input name="codigoResultadoAp" type="number" class="form-control"
               placeholder="ej. 2102015010101" required />
        <div class="invalid-feedback">Ingresa el código</div>
      </div>
      <div class="col-7">
        <label class="form-label">Descripción *</label>
        <input name="descripcionResul" class="form-control"
               placeholder="ej. Identificar requerimientos del sistema" required />
        <div class="invalid-feedback">Ingresa la descripción</div>
      </div>
      <div class="col-12">
        <label class="form-label">ID Competencia *</label>
        <input name="Competencias_id_competencias" type="number"
               class="form-control" placeholder="ID de la competencia asociada" required />
        <div class="invalid-feedback">Ingresa el ID de la competencia</div>
      </div>`,

    /* RegistrarVinculacionLaboral → texto("descripcion") + texto("numeroContrato")
                                    + fecha("fechaInicio") + fecha("fechaFin")
                                    + entero("Usuarios_id_usuarios")
       NOTA: el Servlet usa "fechaInicio"/"fechaFin" pero el INSERT usa
             "fechaInIcio"/"fechafin" — los names aquí deben coincidir con
             lo que el Servlet lee en request.getParameter().                */
    vinculacionLaboral: `
      <div class="col-12">
        <label class="form-label">Descripción *</label>
        <input name="descripcion" class="form-control"
               placeholder="ej. Contrato prestación de servicios" required />
        <div class="invalid-feedback">Ingresa la descripción</div>
      </div>
      <div class="col-12">
        <label class="form-label">Número de contrato *</label>
        <input name="numeroContrato" class="form-control"
               placeholder="ej. 2025-0342" required />
        <div class="invalid-feedback">Ingresa el número de contrato</div>
      </div>
      <div class="col-6">
        <label class="form-label">Fecha inicio *</label>
        <input name="fechaInicio" type="date" class="form-control" required />
        <div class="invalid-feedback">Selecciona la fecha de inicio</div>
      </div>
      <div class="col-6">
        <label class="form-label">Fecha fin *</label>
        <input name="fechaFin" type="date" class="form-control" required />
        <div class="invalid-feedback">Selecciona la fecha de fin</div>
      </div>
      <div class="col-12">
        <label class="form-label">ID Usuario *</label>
        <input name="Usuarios_id_usuarios" type="number" class="form-control"
               placeholder="ID del instructor o usuario" required />
        <div class="invalid-feedback">Ingresa el ID del usuario</div>
      </div>`,

    /* RegistrarProgramacion → textoOpcional("Observaciones")
                              + fecha("fecha_inicial_Prog") + fecha("fecha_fin_Prog")
                              + texto("diasSemana")
                              + hora("hora_inicio") + hora("hora_fin")
                              + entero("Ficha_id_ficha")
                              + entero("Usuarios_id_usuarios")
                              + entero("Ambientes_id_ambientes")
                              + entero("Actividades_id_actividades")
                              + entero("Trimestre_id_trimestre")
                              + entero("Estado_id_estado")  */
    programacion: `
      <div class="col-6">
        <label class="form-label">Fecha inicio *</label>
        <input name="fecha_inicial_Prog" type="date" class="form-control" required />
        <div class="invalid-feedback">Selecciona la fecha de inicio</div>
      </div>
      <div class="col-6">
        <label class="form-label">Fecha fin *</label>
        <input name="fecha_fin_Prog" type="date" class="form-control" required />
        <div class="invalid-feedback">Selecciona la fecha de fin</div>
      </div>
      <div class="col-6">
        <label class="form-label">Hora inicio *</label>
        <input name="hora_inicio" type="time" class="form-control" required />
        <div class="invalid-feedback">Ingresa la hora de inicio</div>
      </div>
      <div class="col-6">
        <label class="form-label">Hora fin *</label>
        <input name="hora_fin" type="time" class="form-control" required />
        <div class="invalid-feedback">Ingresa la hora de fin</div>
      </div>
      <div class="col-12">
        <label class="form-label">Días de la semana *</label>
        <input name="diasSemana" class="form-control"
               placeholder="ej. LUNES,MIERCOLES,VIERNES" required />
        <div class="invalid-feedback">Ingresa los días</div>
      </div>
      <div class="col-6">
        <label class="form-label">ID Ficha *</label>
        <input name="Ficha_id_ficha" type="number" class="form-control"
               placeholder="ID de la ficha" required />
        <div class="invalid-feedback">Ingresa el ID de la ficha</div>
      </div>
      <div class="col-6">
        <label class="form-label">ID Instructor *</label>
        <input name="Usuarios_id_usuarios" type="number" class="form-control"
               placeholder="ID del instructor" required />
        <div class="invalid-feedback">Ingresa el ID del instructor</div>
      </div>
      <div class="col-6">
        <label class="form-label">ID Ambiente *</label>
        <input name="Ambientes_id_ambientes" type="number" class="form-control"
               placeholder="ID del ambiente" required />
        <div class="invalid-feedback">Ingresa el ID del ambiente</div>
      </div>
      <div class="col-6">
        <label class="form-label">ID Actividad *</label>
        <input name="Actividades_id_actividades" type="number" class="form-control"
               placeholder="ID de la actividad" required />
        <div class="invalid-feedback">Ingresa el ID de la actividad</div>
      </div>
      <div class="col-6">
        <label class="form-label">ID Trimestre *</label>
        <input name="Trimestre_id_trimestre" type="number" class="form-control"
               placeholder="ID del trimestre" required />
        <div class="invalid-feedback">Ingresa el ID del trimestre</div>
      </div>
      <div class="col-6">
        <label class="form-label">ID Estado *</label>
        <input name="Estado_id_estado" type="number" class="form-control"
               value="1" required />
        <div class="invalid-feedback">Ingresa el ID del estado</div>
      </div>
      <div class="col-12">
        <label class="form-label">Observaciones</label>
        <textarea name="Observaciones" class="form-control" rows="2"
                  placeholder="Observaciones opcionales…"></textarea>
      </div>`,
  };

  /* ── Nodos del modal de catálogo ── */
  const form   = document.getElementById("form-crear-catalogo");
  const modal  = document.getElementById("modal-crear-catalogo");
  const title  = document.getElementById("title-crear-catalogo");
  const fields = document.getElementById("catalogo-fields");

  /* ── Listener en cada botón con data-catalogo ── */
  document.querySelectorAll("[data-catalogo]").forEach(btn => {
    btn.addEventListener("click", function () {
      const tipo    = this.dataset.catalogo;
      const servlet = SERVLET_MAP[tipo];
      const html    = FIELDS_MAP[tipo];

      if (!servlet || !html) {
        console.warn("ClassControl: tipo de catálogo no definido →", tipo);
        return;
      }

      /* 1. Actualizar action y título */
      form.action      = servlet;
      form.classList.remove("was-validated"); // limpiar validación anterior
      title.textContent = this.querySelector("strong")?.textContent ?? tipo;

      /* 2. Inyectar los campos */
      fields.innerHTML = html;

      /* 3. Cerrar el modal padre (selector de tabla) */
      bootstrap.Modal.getInstance(
        document.getElementById("modal-crear-registro")
      )?.hide();

      /* 4. Abrir el modal de catálogo */
      bootstrap.Modal.getOrCreateInstance(modal).show();
    });
  });

  /* ── Listener en botones Ficha / Actividad / Ambiente
        (usan data-bs-target pero no tienen toggle automático
         porque están dentro de otro modal) ── */
  document.querySelectorAll(".cc-create-item[data-bs-target]").forEach(btn => {
    btn.addEventListener("click", function () {
      const targetId = this.dataset.bsTarget;

      /* Cerrar el modal padre primero */
      bootstrap.Modal.getInstance(
        document.getElementById("modal-crear-registro")
      )?.hide();

      /* Pequeño delay para que Bootstrap termine el hide antes del show */
      setTimeout(() => {
        bootstrap.Modal.getOrCreateInstance(
          document.querySelector(targetId)
        ).show();
      }, 200);
    });
  });

})();
