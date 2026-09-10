-- ============================================================
-- SCRIPT CORREGIDO - ClassControl (solo estructura)
-- Orden de creacion ajustado para respetar dependencias de
-- llaves foraneas (InnoDB exige que la tabla referenciada exista)
-- ============================================================

-- Seleccionar la base de datos a usar
CREATE DATABASE IF NOT EXISTS `ClassControl`;
USE `ClassControl`;

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Eliminamos tablas en orden inverso (hijas primero) para evitar errores de FK
DROP TABLE IF EXISTS `vinculacion_laboral`;
DROP TABLE IF EXISTS `restablecer_token`;
DROP TABLE IF EXISTS `reportes`;
DROP TABLE IF EXISTS `roles_has_permisos`;
DROP TABLE IF EXISTS `programacion_instructores`;
DROP TABLE IF EXISTS `actividades`;
DROP TABLE IF EXISTS `ficha`;
DROP TABLE IF EXISTS `usuarios`;
DROP TABLE IF EXISTS `ambientes`;
DROP TABLE IF EXISTS `resultado_aprendizaje`;
DROP TABLE IF EXISTS `competencias`;
DROP TABLE IF EXISTS `etapa`;
DROP TABLE IF EXISTS `estado`;
DROP TABLE IF EXISTS `trimestre`;
DROP TABLE IF EXISTS `programas`;
DROP TABLE IF EXISTS `permisos`;
DROP TABLE IF EXISTS `roles`;
DROP TABLE IF EXISTS `sede`;
DROP TABLE IF EXISTS `nivel_formacion`;
DROP TABLE IF EXISTS `modalidad`;
DROP TABLE IF EXISTS `jornada`;
DROP TABLE IF EXISTS `tipo_vinculacion`;
DROP TABLE IF EXISTS `tipo_documento`;
DROP TABLE IF EXISTS `tipo_estado`;

-- 1. TABLAS SIN DEPENDENCIAS -------------------------------------------------
CREATE TABLE `tipo_estado` (
  `id_tipo_estado` int NOT NULL,
  `descripcion` varchar(45) NOT NULL,
  PRIMARY KEY (`id_tipo_estado`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `tipo_documento` (
  `id_tipo_Documento` int NOT NULL AUTO_INCREMENT,
  `descripcion_Tipo_Doc` varchar(45) NOT NULL,
  PRIMARY KEY (`id_tipo_Documento`),
  UNIQUE KEY `descripcion_TipoDoc_UNIQUE` (`descripcion_Tipo_Doc`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `tipo_vinculacion` (
  `id_tipo_vinculacion` int NOT NULL AUTO_INCREMENT,
  `descripcion_vinculacion` varchar(45) NOT NULL,
  PRIMARY KEY (`id_tipo_vinculacion`),
  UNIQUE KEY `descripcion_vinculacion_UNIQUE` (`descripcion_vinculacion`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `jornada` (
  `id_jornada` int NOT NULL AUTO_INCREMENT,
  `descripcion_Jornada` varchar(45) NOT NULL,
  PRIMARY KEY (`id_jornada`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `modalidad` (
  `id_modalidad` int NOT NULL AUTO_INCREMENT,
  `descripcion_Modalidad` varchar(45) NOT NULL,
  PRIMARY KEY (`id_modalidad`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `nivel_formacion` (
  `id_nivel_formacion` int NOT NULL AUTO_INCREMENT,
  `descripcion_Nivel_Formacion` varchar(45) NOT NULL,
  PRIMARY KEY (`id_nivel_formacion`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `sede` (
  `id_sede` int NOT NULL AUTO_INCREMENT,
  `nombre_sede` varchar(45) NOT NULL,
  PRIMARY KEY (`id_sede`),
  UNIQUE KEY `nombre_sede_UNIQUE` (`nombre_sede`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `roles` (
  `id_roles` int NOT NULL AUTO_INCREMENT,
  `descripcion_Roles` varchar(45) NOT NULL,
  PRIMARY KEY (`id_roles`),
  UNIQUE KEY `descripcion_Roles_UNIQUE` (`descripcion_Roles`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `permisos` (
  `id_permisos` int NOT NULL,
  `descripcion_permisos` varchar(45) NOT NULL,
  PRIMARY KEY (`id_permisos`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `programas` (
  `idProgramas` int NOT NULL AUTO_INCREMENT,
  `codigo_programa` int NOT NULL,
  `nombre_programa` varchar(45) NOT NULL,
  PRIMARY KEY (`idProgramas`),
  UNIQUE KEY `codigo_programa_UNIQUE` (`codigo_programa`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `trimestre` (
  `id_trimestre` int NOT NULL AUTO_INCREMENT,
  `num_trimestre` int NOT NULL,
  `descripcion` varchar(45) NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL,
  PRIMARY KEY (`id_trimestre`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 2. TABLAS DE NIVEL 1 (1 dependencia) ----------------------------------------
CREATE TABLE `estado` (
  `id_estado` int NOT NULL AUTO_INCREMENT,
  `descripcion_Estado` varchar(45) NOT NULL,
  `Tipo_Estado_id_tipo_estado` int NOT NULL,
  PRIMARY KEY (`id_estado`),
  KEY `fk_Estado_Tipo_Estado1_idx` (`Tipo_Estado_id_tipo_estado`),
  CONSTRAINT `fk_Estado_Tipo_Estado1` FOREIGN KEY (`Tipo_Estado_id_tipo_estado`) REFERENCES `tipo_estado` (`id_tipo_estado`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `etapa` (
  `id_etapa` int NOT NULL AUTO_INCREMENT,
  `descripcion_Etapa` varchar(45) NOT NULL,
  PRIMARY KEY (`id_etapa`),
  UNIQUE KEY `descripcion_Etapa_UNIQUE` (`descripcion_Etapa`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `competencias` (
  `id_competencias` int NOT NULL AUTO_INCREMENT,
  `codigo_Competencias` int NOT NULL,
  `descripcion_Competencias` varchar(45) NOT NULL,
  `Programas_idProgramas` int NOT NULL,
  PRIMARY KEY (`id_competencias`),
  UNIQUE KEY `codigoCompetencias_UNIQUE` (`codigo_Competencias`),
  KEY `fk_Competencias_Programas1_idx` (`Programas_idProgramas`),
  CONSTRAINT `fk_Competencias_Programas1` FOREIGN KEY (`Programas_idProgramas`) REFERENCES `programas` (`idProgramas`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 3. TABLAS DE NIVEL 2 ---------------------------------------------------------
CREATE TABLE `resultado_aprendizaje` (
  `id_resultado_aprendizaje` int NOT NULL AUTO_INCREMENT,
  `codigo_ResultadoAp` int NOT NULL,
  `descripcion_Resul` varchar(45) NOT NULL,
  `Competencias_id_competencias` int NOT NULL,
  PRIMARY KEY (`id_resultado_aprendizaje`),
  UNIQUE KEY `codigoResultadoAp_UNIQUE` (`codigo_ResultadoAp`),
  KEY `fk_Resultado_aprendizaje_Competencias1_idx` (`Competencias_id_competencias`),
  CONSTRAINT `fk_Resultado_aprendizaje_Competencias1` FOREIGN KEY (`Competencias_id_competencias`) REFERENCES `competencias` (`id_competencias`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `ambientes` (
  `id_ambientes` int NOT NULL AUTO_INCREMENT,
  `descripcion_Ambiente` varchar(45) NOT NULL,
  `capacidad` int NOT NULL,
  `Sede_id_sede` int NOT NULL,
  `Estado_Ambiente` varchar(20) NOT NULL DEFAULT 'Disponible',
  PRIMARY KEY (`id_ambientes`),
  UNIQUE KEY `descripcion_Ambiente_UNIQUE` (`descripcion_Ambiente`),
  KEY `fk_Ambientes_Sede1_idx` (`Sede_id_sede`),
  CONSTRAINT `fk_Ambientes_Sede1` FOREIGN KEY (`Sede_id_sede`) REFERENCES `sede` (`id_sede`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `usuarios` (
  `id_usuarios` int NOT NULL AUTO_INCREMENT,
  `nombres` varchar(45) NOT NULL,
  `apellidos` varchar(45) NOT NULL,
  `identificacion` varchar(45) NOT NULL,
  `fecha_Nacimiento` date NOT NULL,
  `correo` varchar(45) NOT NULL,
  `telefono` varchar(45) NOT NULL,
  `direccion` varchar(45) NOT NULL,
  `username` varchar(45) NOT NULL,
  `nivel_Educativo` varchar(45) NOT NULL,
  `profesion` varchar(45) NOT NULL,
  `clave` varchar(255) NOT NULL,
  `fecha_Creacion` date NOT NULL,
  `activo` tinyint(1) NOT NULL,
  `fecha_ExpiracionContraseña` date NOT NULL,
  `Roles_id_roles` int NOT NULL,
  `Tipo_Documento_id_tipo_Documento` int NOT NULL,
  `Tipo_vinculacion_id_tipo_vinculacion` int NOT NULL,
  `Ficha_id_ficha` int DEFAULT NULL,
  PRIMARY KEY (`id_usuarios`),
  UNIQUE KEY `identificacion_UNIQUE` (`identificacion`),
  UNIQUE KEY `correo_UNIQUE` (`correo`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  KEY `fk_Usuarios_Roles_idx` (`Roles_id_roles`),
  KEY `fk_Usuarios_Tipo_Documento1_idx` (`Tipo_Documento_id_tipo_Documento`),
  KEY `fk_Usuarios_Tipo_vinculacion1_idx` (`Tipo_vinculacion_id_tipo_vinculacion`),
  KEY `fk_usuarios_ficha` (`Ficha_id_ficha`),
  CONSTRAINT `fk_Usuarios_Roles` FOREIGN KEY (`Roles_id_roles`) REFERENCES `roles` (`id_roles`),
  CONSTRAINT `fk_Usuarios_Tipo_Documento1` FOREIGN KEY (`Tipo_Documento_id_tipo_Documento`) REFERENCES `tipo_documento` (`id_tipo_Documento`),
  CONSTRAINT `fk_Usuarios_Tipo_vinculacion1` FOREIGN KEY (`Tipo_vinculacion_id_tipo_vinculacion`) REFERENCES `tipo_vinculacion` (`id_tipo_vinculacion`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 4. TABLAS DE NIVEL 3 ---------------------------------------------------------
CREATE TABLE `ficha` (
  `id_ficha` int NOT NULL AUTO_INCREMENT,
  `codigo_ficha` varchar(45) NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL,
  `cantidad_aprendices` int NOT NULL,
  `Programas_idProgramas` int NOT NULL,
  `Jornada_id_jornada` int NOT NULL,
  `Modalidad_id_modalidad` int NOT NULL,
  `Nivel_formacion_id_nivel_formacion` int NOT NULL,
  `Sede_id_sede` int NOT NULL,
  `Estado_id_estado` int NOT NULL,
  `Etapa_id_etapa` int NOT NULL,
  PRIMARY KEY (`id_ficha`),
  KEY `fk_Ficha_Programas1_idx` (`Programas_idProgramas`),
  KEY `fk_Ficha_Jornada1_idx` (`Jornada_id_jornada`),
  KEY `fk_Ficha_Modalidad1_idx` (`Modalidad_id_modalidad`),
  KEY `fk_Ficha_Nivel_formacion1_idx` (`Nivel_formacion_id_nivel_formacion`),
  KEY `fk_Ficha_Sede1_idx` (`Sede_id_sede`),
  KEY `fk_Ficha_Estado1_idx` (`Estado_id_estado`),
  KEY `fk_Ficha_Etapa1_idx` (`Etapa_id_etapa`),
  CONSTRAINT `fk_Ficha_Estado1` FOREIGN KEY (`Estado_id_estado`) REFERENCES `estado` (`id_estado`),
  CONSTRAINT `fk_Ficha_Etapa1` FOREIGN KEY (`Etapa_id_etapa`) REFERENCES `etapa` (`id_etapa`),
  CONSTRAINT `fk_Ficha_Jornada1` FOREIGN KEY (`Jornada_id_jornada`) REFERENCES `jornada` (`id_jornada`),
  CONSTRAINT `fk_Ficha_Modalidad1` FOREIGN KEY (`Modalidad_id_modalidad`) REFERENCES `modalidad` (`id_modalidad`),
  CONSTRAINT `fk_Ficha_Nivel_formacion1` FOREIGN KEY (`Nivel_formacion_id_nivel_formacion`) REFERENCES `nivel_formacion` (`id_nivel_formacion`),
  CONSTRAINT `fk_Ficha_Programas1` FOREIGN KEY (`Programas_idProgramas`) REFERENCES `programas` (`idProgramas`),
  CONSTRAINT `fk_Ficha_Sede1` FOREIGN KEY (`Sede_id_sede`) REFERENCES `sede` (`id_sede`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `actividades` (
  `id_actividades` int NOT NULL AUTO_INCREMENT,
  `codigo_Actividad` int NOT NULL,
  `nombre_Act` varchar(100) NOT NULL,
  `descripcion` varchar(200) NOT NULL,
  `Resultado_aprendizaje_id_resultado_aprendizaje` int NOT NULL,
  PRIMARY KEY (`id_actividades`),
  UNIQUE KEY `codigoActividad_UNIQUE` (`codigo_Actividad`),
  KEY `fk_Actividades_Resultado_aprendizaje1_idx` (`Resultado_aprendizaje_id_resultado_aprendizaje`),
  CONSTRAINT `fk_Actividades_Resultado_aprendizaje1` FOREIGN KEY (`Resultado_aprendizaje_id_resultado_aprendizaje`) REFERENCES `resultado_aprendizaje` (`id_resultado_aprendizaje`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 5. TABLAS DE NIVEL 4 (dependencias multiples) --------------------------------
CREATE TABLE `roles_has_permisos` (
  `Roles_id_roles` int NOT NULL,
  `Permisos_id_permisos` int NOT NULL,
  PRIMARY KEY (`Roles_id_roles`,`Permisos_id_permisos`),
  KEY `fk_Roles_has_Permisos_Permisos1_idx` (`Permisos_id_permisos`),
  KEY `fk_Roles_has_Permisos_Roles1_idx` (`Roles_id_roles`),
  CONSTRAINT `fk_Roles_has_Permisos_Permisos1` FOREIGN KEY (`Permisos_id_permisos`) REFERENCES `permisos` (`id_permisos`),
  CONSTRAINT `fk_Roles_has_Permisos_Roles1` FOREIGN KEY (`Roles_id_roles`) REFERENCES `roles` (`id_roles`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `restablecer_token` (
  `id_token` int NOT NULL AUTO_INCREMENT,
  `Usuarios_id_usuarios` int NOT NULL,
  `token_hash` char(64) NOT NULL,
  `expira_en` datetime NOT NULL,
  `usado` tinyint(1) NOT NULL DEFAULT '0',
  `fecha_creacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_token`),
  KEY `idx_tok_hash` (`token_hash`),
  KEY `idx_tok_usuario` (`Usuarios_id_usuarios`),
  CONSTRAINT `fk_tok_usuario` FOREIGN KEY (`Usuarios_id_usuarios`) REFERENCES `usuarios` (`id_usuarios`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `reportes` (
  `id_reportes` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(120) NOT NULL,
  `descripcion` text,
  `tipo` varchar(30) NOT NULL DEFAULT 'ambiente',
  `Usuarios_id_usuarios` int NOT NULL COMMENT 'Quien reporta',
  `Ambientes_id_ambientes` int DEFAULT NULL,
  `estado` varchar(20) NOT NULL DEFAULT 'pendiente',
  `respuesta_admin` varchar(255) DEFAULT NULL,
  `atendido_por` int DEFAULT NULL,
  `fecha_creacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_atencion` datetime DEFAULT NULL,
  PRIMARY KEY (`id_reportes`),
  KEY `fk_rep_usuario` (`Usuarios_id_usuarios`),
  KEY `fk_rep_ambiente` (`Ambientes_id_ambientes`),
  KEY `fk_rep_atendido` (`atendido_por`),
  CONSTRAINT `fk_rep_ambiente` FOREIGN KEY (`Ambientes_id_ambientes`) REFERENCES `ambientes` (`id_ambientes`) ON DELETE SET NULL,
  CONSTRAINT `fk_rep_atendido` FOREIGN KEY (`atendido_por`) REFERENCES `usuarios` (`id_usuarios`) ON DELETE SET NULL,
  CONSTRAINT `fk_rep_usuario` FOREIGN KEY (`Usuarios_id_usuarios`) REFERENCES `usuarios` (`id_usuarios`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `vinculacion_laboral` (
  `id_vinculacion_Laboral` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(45) NOT NULL,
  `numero_Contrato` varchar(45) NOT NULL,
  `fecha_Inicio` date NOT NULL,
  `fecha_Fin` date NOT NULL,
  `Usuarios_id_usuarios` int NOT NULL,
  PRIMARY KEY (`id_vinculacion_Laboral`),
  UNIQUE KEY `numeroContrato_UNIQUE` (`numero_Contrato`),
  KEY `fk_VinculacionLaboral_Usuarios1_idx` (`Usuarios_id_usuarios`),
  CONSTRAINT `fk_VinculacionLaboral_Usuarios1` FOREIGN KEY (`Usuarios_id_usuarios`) REFERENCES `usuarios` (`id_usuarios`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 6. TABLA DE NIVEL 5 (todas las dependencias) ---------------------------------
CREATE TABLE `programacion_instructores` (
  `id_programacion_Instructores` int NOT NULL AUTO_INCREMENT,
  `Observaciones` varchar(45) NOT NULL,
  `fecha_inicial_Prog` date NOT NULL,
  `fecha_fin_Prog` date NOT NULL,
  `dias_Semana` enum('LUN','MAR','MIE','JUE','VIE','SAB') NOT NULL,
  `hora_inicio` time NOT NULL,
  `hora_fin` time NOT NULL,
  `Ficha_id_ficha` int NOT NULL,
  `Usuarios_id_usuarios` int NOT NULL,
  `Ambientes_id_ambientes` int NOT NULL,
  `Trimestre_id_trimestre` int NOT NULL,
  `Estado_id_estado` int NOT NULL,
  `Actividades_id_actividades` int NOT NULL,
  PRIMARY KEY (`id_programacion_Instructores`),
  UNIQUE KEY `id_programacion_Instructores_UNIQUE` (`id_programacion_Instructores`),
  KEY `fk_Programacion_Instructores_Ficha1_idx` (`Ficha_id_ficha`),
  KEY `fk_Programacion_Instructores_Usuarios1_idx` (`Usuarios_id_usuarios`),
  KEY `fk_Programacion_Instructores_Ambientes1_idx` (`Ambientes_id_ambientes`),
  KEY `fk_Programacion_Instructores_Trimestre1_idx` (`Trimestre_id_trimestre`),
  KEY `fk_Programacion_Instructores_Estado1_idx` (`Estado_id_estado`),
  KEY `fk_Programacion_Instructores_Actividades1_idx` (`Actividades_id_actividades`),
  CONSTRAINT `fk_Programacion_Instructores_Actividades1` FOREIGN KEY (`Actividades_id_actividades`) REFERENCES `actividades` (`id_actividades`),
  CONSTRAINT `fk_Programacion_Instructores_Ambientes1` FOREIGN KEY (`Ambientes_id_ambientes`) REFERENCES `ambientes` (`id_ambientes`),
  CONSTRAINT `fk_Programacion_Instructores_Estado1` FOREIGN KEY (`Estado_id_estado`) REFERENCES `estado` (`id_estado`),
  CONSTRAINT `fk_Programacion_Instructores_Ficha1` FOREIGN KEY (`Ficha_id_ficha`) REFERENCES `ficha` (`id_ficha`),
  CONSTRAINT `fk_Programacion_Instructores_Trimestre1` FOREIGN KEY (`Trimestre_id_trimestre`) REFERENCES `trimestre` (`id_trimestre`),
  CONSTRAINT `fk_Programacion_Instructores_Usuarios1` FOREIGN KEY (`Usuarios_id_usuarios`) REFERENCES `usuarios` (`id_usuarios`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed

-- ============================================================
-- NOTA: Para cargar DATOS usa ClassControlSql.sql DESPUÉS de
-- ejecutar este script. Orden recomendado:
--   1) ClassControl_create_corregido.sql   (estructura)
--   2) ClassControlSql.sql                 (datos)
-- ============================================================
