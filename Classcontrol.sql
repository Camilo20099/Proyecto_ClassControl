-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema ClassControl
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema ClassControl
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ClassControl` DEFAULT CHARACTER SET utf8 ;
USE `ClassControl` ;

-- -----------------------------------------------------
-- Table `ClassControl`.`Tipo_Documento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ClassControl`.`Tipo_Documento` (
  `id_tipo_Documento` INT NOT NULL AUTO_INCREMENT,
  `descripcion_TipoDoc` VARCHAR(400) NOT NULL,
  PRIMARY KEY (`id_tipo_Documento`));


-- -----------------------------------------------------
-- Table `ClassControl`.`Roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ClassControl`.`Roles` (
  `id_roles` INT NOT NULL AUTO_INCREMENT,
  `descripcion_Roles` VARCHAR(400) NOT NULL,
  PRIMARY KEY (`id_roles`));


-- -----------------------------------------------------
-- Table `ClassControl`.`Tipo_vinculacion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ClassControl`.`Tipo_vinculacion` (
  `id_tipo_vinculacion` INT NOT NULL AUTO_INCREMENT,
  `descripcion_vinculacion` VARCHAR(400) NOT NULL,
  PRIMARY KEY (`id_tipo_vinculacion`));


-- -----------------------------------------------------
-- Table `ClassControl`.`conteoHorasInstructor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ClassControl`.`conteoHorasInstructor` (
  `id_conteoHorasInstructor` INT NOT NULL AUTO_INCREMENT,
  `conteoHorasInstructorcol` VARCHAR(400) NOT NULL,
  PRIMARY KEY (`id_conteoHorasInstructor`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ClassControl`.`Programacion_Instructores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ClassControl`.`Programacion_Instructores` (
  `id_programacion_Instructores` INT NOT NULL AUTO_INCREMENT,
  `Observaciones` VARCHAR(400) NOT NULL,
  `fecha_inicial_Prog` VARCHAR(400) NOT NULL,
  `fecha_fin_Prog` VARCHAR(400) NOT NULL,
  `conteoHorasInstructor_id_conteoHorasInstructor` INT NOT NULL,
  PRIMARY KEY (`id_programacion_Instructores`),
  INDEX `fk_Programacion_Instructores_conteoHorasInstructor1_idx` (`conteoHorasInstructor_id_conteoHorasInstructor`),
  CONSTRAINT `fk_Programacion_Instructores_conteoHorasInstructor1`
    FOREIGN KEY (`conteoHorasInstructor_id_conteoHorasInstructor`)
    REFERENCES `ClassControl`.`conteoHorasInstructor` (`id_conteoHorasInstructor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ClassControl`.`Estado`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ClassControl`.`Estado` (
  `id_estado` INT NOT NULL AUTO_INCREMENT,
  `descripcion_Estado` VARCHAR(400) NOT NULL,
  PRIMARY KEY (`id_estado`));


-- -----------------------------------------------------
-- Table `ClassControl`.`Usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ClassControl`.`Usuarios` (
  `id_usuarios` INT NOT NULL AUTO_INCREMENT,
  `nombres` VARCHAR(400) NOT NULL,
  `apellidos` VARCHAR(400) NOT NULL,
  `identificacion` VARCHAR(400) NOT NULL,
  `correo` VARCHAR(400) NOT NULL,
  `telefono` VARCHAR(400) NOT NULL,
  `direccion` VARCHAR(400) NOT NULL,
  `username` VARCHAR(400) NOT NULL,
  `clave` VARCHAR(400) NOT NULL,
  `Tipo_Documento_id_tipo_Documento` INT NOT NULL,
  `Roles_id_roles` INT NOT NULL,
  `Tipo_vinculacion_id_tipo_vinculacion` INT NOT NULL,
  `Programacion_Instructores_id_programacion_Instructores` INT NOT NULL,
  `Estado_id_estado` INT NOT NULL,
  PRIMARY KEY (`id_usuarios`),
  INDEX `fk_Usuarios_Tipo_Documento1_idx` (`Tipo_Documento_id_tipo_Documento`),
  INDEX `fk_Usuarios_Roles1_idx` (`Roles_id_roles`),
  INDEX `fk_Usuarios_Tipo_vinculacion1_idx` (`Tipo_vinculacion_id_tipo_vinculacion`),
  INDEX `fk_Usuarios_Programacion_Instructores1_idx` (`Programacion_Instructores_id_programacion_Instructores`),
  INDEX `fk_Usuarios_Estado1_idx` (`Estado_id_estado`),
  CONSTRAINT `fk_Usuarios_Tipo_Documento1`
    FOREIGN KEY (`Tipo_Documento_id_tipo_Documento`)
    REFERENCES `ClassControl`.`Tipo_Documento` (`id_tipo_Documento`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Usuarios_Roles1`
    FOREIGN KEY (`Roles_id_roles`)
    REFERENCES `ClassControl`.`Roles` (`id_roles`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Usuarios_Tipo_vinculacion1`
    FOREIGN KEY (`Tipo_vinculacion_id_tipo_vinculacion`)
    REFERENCES `ClassControl`.`Tipo_vinculacion` (`id_tipo_vinculacion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Usuarios_Programacion_Instructores1`
    FOREIGN KEY (`Programacion_Instructores_id_programacion_Instructores`)
    REFERENCES `ClassControl`.`Programacion_Instructores` (`id_programacion_Instructores`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Usuarios_Estado1`
    FOREIGN KEY (`Estado_id_estado`)
    REFERENCES `ClassControl`.`Estado` (`id_estado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `ClassControl`.`Programas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ClassControl`.`Programas` (
  `id_programas` INT NOT NULL,
  `nombre_programa` VARCHAR(400) NOT NULL,
  PRIMARY KEY (`id_programas`));


-- -----------------------------------------------------
-- Table `ClassControl`.`Turnos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ClassControl`.`Turnos` (
  `id_turnos` INT NOT NULL AUTO_INCREMENT,
  `descripcionTurnos` VARCHAR(400) NOT NULL,
  `inicio_Turno` INT NOT NULL,
  `fin_Turno` INT NOT NULL,
  PRIMARY KEY (`id_turnos`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ClassControl`.`Jornada`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ClassControl`.`Jornada` (
  `id_jornada` INT NOT NULL AUTO_INCREMENT,
  `descripcion_Jornada` VARCHAR(400) NOT NULL,
  `Turnos_id_turnos` INT NOT NULL,
  PRIMARY KEY (`id_jornada`),
  INDEX `fk_Jornada_Turnos1_idx` (`Turnos_id_turnos`),
  CONSTRAINT `fk_Jornada_Turnos1`
    FOREIGN KEY (`Turnos_id_turnos`)
    REFERENCES `ClassControl`.`Turnos` (`id_turnos`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `ClassControl`.`Contenido_Tematico`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ClassControl`.`Contenido_Tematico` (
  `id_contenido_Tematico` INT NOT NULL AUTO_INCREMENT,
  `tema` VARCHAR(400) NOT NULL,
  PRIMARY KEY (`id_contenido_Tematico`));


-- -----------------------------------------------------
-- Table `ClassControl`.`Resultado_aprendizaje`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ClassControl`.`Resultado_aprendizaje` (
  `id_resultado_aprendizaje` INT NOT NULL AUTO_INCREMENT,
  `resultado` VARCHAR(400) NOT NULL,
  `horas` VARCHAR(400) NOT NULL,
  PRIMARY KEY (`id_resultado_aprendizaje`));


-- -----------------------------------------------------
-- Table `ClassControl`.`Competencias`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ClassControl`.`Competencias` (
  `id_competencias` INT NOT NULL AUTO_INCREMENT,
  `descripcionCompetencias` VARCHAR(400) NOT NULL,
  `Resultado_aprendizaje_id_resultado_aprendizaje` INT NOT NULL,
  PRIMARY KEY (`id_competencias`),
  INDEX `fk_Competencias_Resultado_aprendizaje1_idx` (`Resultado_aprendizaje_id_resultado_aprendizaje`),
  CONSTRAINT `fk_Competencias_Resultado_aprendizaje1`
    FOREIGN KEY (`Resultado_aprendizaje_id_resultado_aprendizaje`)
    REFERENCES `ClassControl`.`Resultado_aprendizaje` (`id_resultado_aprendizaje`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ClassControl`.`Actividades`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ClassControl`.`Actividades` (
  `id_actividades` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(400) NOT NULL,
  `descripcion` VARCHAR(400) NOT NULL,
  `hora_inicio` VARCHAR(400) NOT NULL,
  `hora_fin` VARCHAR(400) NOT NULL,
  `Contenido_Tematico_id_contenido_Tematico` INT NOT NULL,
  `Competencias_id_competencias` INT NOT NULL,
  PRIMARY KEY (`id_actividades`),
  INDEX `fk_Actividades_Contenido_Tematico1_idx` (`Contenido_Tematico_id_contenido_Tematico`),
  INDEX `fk_Actividades_Competencias1_idx` (`Competencias_id_competencias`),
  CONSTRAINT `fk_Actividades_Contenido_Tematico1`
    FOREIGN KEY (`Contenido_Tematico_id_contenido_Tematico`)
    REFERENCES `ClassControl`.`Contenido_Tematico` (`id_contenido_Tematico`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Actividades_Competencias1`
    FOREIGN KEY (`Competencias_id_competencias`)
    REFERENCES `ClassControl`.`Competencias` (`id_competencias`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `ClassControl`.`Dia`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ClassControl`.`Dia` (
  `id_dia` INT NOT NULL AUTO_INCREMENT,
  `descripcion_Dia` VARCHAR(400) NOT NULL,
  PRIMARY KEY (`id_dia`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ClassControl`.`orden_Dia`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ClassControl`.`orden_Dia` (
  `id_orden_Dia` INT NOT NULL AUTO_INCREMENT,
  `descripcion_Orden` VARCHAR(400) NOT NULL,
  PRIMARY KEY (`id_orden_Dia`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ClassControl`.`horas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ClassControl`.`horas` (
  `id_horas` INT NOT NULL AUTO_INCREMENT,
  `descripcion_Horas` VARCHAR(400) NOT NULL,
  PRIMARY KEY (`id_horas`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ClassControl`.`Ambientes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ClassControl`.`Ambientes` (
  `id_ambientes` INT NOT NULL AUTO_INCREMENT,
  `descripcion_Ambiente` VARCHAR(400) NOT NULL,
  PRIMARY KEY (`id_ambientes`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ClassControl`.`Horario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ClassControl`.`Horario` (
  `id_horario` INT NOT NULL,
  `hora_inicio` VARCHAR(400) NOT NULL,
  `hora_fin` VARCHAR(400) NOT NULL,
  `descripcion` VARCHAR(400) NOT NULL,
  `total_horas` VARCHAR(400) NOT NULL,
  `Dia_id_dia` INT NOT NULL,
  `orden_Dia_id_orden_Dia` INT NOT NULL,
  `horas_id_horas` INT NOT NULL,
  `Ambientes_id_ambientes` INT NOT NULL,
  PRIMARY KEY (`id_horario`),
  INDEX `fk_Horario_Dia1_idx` (`Dia_id_dia`),
  INDEX `fk_Horario_orden_Dia1_idx` (`orden_Dia_id_orden_Dia`),
  INDEX `fk_Horario_horas1_idx` (`horas_id_horas`),
  INDEX `fk_Horario_Ambientes1_idx` (`Ambientes_id_ambientes`),
  CONSTRAINT `fk_Horario_Dia1`
    FOREIGN KEY (`Dia_id_dia`)
    REFERENCES `ClassControl`.`Dia` (`id_dia`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Horario_orden_Dia1`
    FOREIGN KEY (`orden_Dia_id_orden_Dia`)
    REFERENCES `ClassControl`.`orden_Dia` (`id_orden_Dia`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Horario_horas1`
    FOREIGN KEY (`horas_id_horas`)
    REFERENCES `ClassControl`.`horas` (`id_horas`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Horario_Ambientes1`
    FOREIGN KEY (`Ambientes_id_ambientes`)
    REFERENCES `ClassControl`.`Ambientes` (`id_ambientes`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `ClassControl`.`Meses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ClassControl`.`Meses` (
  `id_meses` INT NOT NULL AUTO_INCREMENT,
  `descripcionMes` VARCHAR(400) NOT NULL,
  PRIMARY KEY (`id_meses`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ClassControl`.`Trimestre`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ClassControl`.`Trimestre` (
  `id_trimestre` INT NOT NULL AUTO_INCREMENT,
  `num_trimestre` VARCHAR(400) NOT NULL,
  `descripcion` VARCHAR(400) NOT NULL,
  `fecha_inicio` VARCHAR(400) NOT NULL,
  `fecha_fin` VARCHAR(400) NOT NULL,
  `Meses_id_meses` INT NOT NULL,
  PRIMARY KEY (`id_trimestre`),
  INDEX `fk_Trimestre_Meses1_idx` (`Meses_id_meses`),
  CONSTRAINT `fk_Trimestre_Meses1`
    FOREIGN KEY (`Meses_id_meses`)
    REFERENCES `ClassControl`.`Meses` (`id_meses`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `ClassControl`.`Sede`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ClassControl`.`Sede` (
  `id_sede` INT NOT NULL AUTO_INCREMENT,
  `nombre_sede` VARCHAR(400) NOT NULL,
  PRIMARY KEY (`id_sede`));


-- -----------------------------------------------------
-- Table `ClassControl`.`Etapa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ClassControl`.`Etapa` (
  `id_etapa` INT NOT NULL AUTO_INCREMENT,
  `descripcion_Etapa` VARCHAR(400) NOT NULL,
  PRIMARY KEY (`id_etapa`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ClassControl`.`Modalidad`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ClassControl`.`Modalidad` (
  `id_modalidad` INT NOT NULL AUTO_INCREMENT,
  `descripcion_Modalidad` VARCHAR(400) NOT NULL,
  PRIMARY KEY (`id_modalidad`));


-- -----------------------------------------------------
-- Table `ClassControl`.`Nivel_formacion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ClassControl`.`Nivel_formacion` (
  `id_nivel_formacion` INT NOT NULL AUTO_INCREMENT,
  `descripcion_Nivel_Formacion` VARCHAR(400) NOT NULL,
  PRIMARY KEY (`id_nivel_formacion`));


-- -----------------------------------------------------
-- Table `ClassControl`.`Ficha`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ClassControl`.`Ficha` (
  `id_ficha` INT NOT NULL AUTO_INCREMENT,
  `codigo_ficha` VARCHAR(400) NOT NULL,
  `fecha_inicio` VARCHAR(400) NOT NULL,
  `fecha_fin` VARCHAR(400) NOT NULL,
  `cantidad_aprendices` INT NOT NULL,
  `fecha_Inicio_EtapaProductiva` VARCHAR(400) NOT NULL,
  `Programas_id_programas` INT NOT NULL,
  `Estado_id_estado` INT NOT NULL,
  `Jornada_id_jornada` INT NOT NULL,
  `Actividades_id_actividades` INT NOT NULL,
  `Horario_id_horario` INT NOT NULL,
  `Trimestre_id_trimestre` INT NOT NULL,
  `Sede_id_sede` INT NOT NULL,
  `Etapa_id_etapa` INT NOT NULL,
  `Modalidad_id_modalidad` INT NOT NULL,
  `Nivel_formacion_id_nivel_formacion` INT NOT NULL,
  `Usuarios_id_usuarios` INT NOT NULL,
  PRIMARY KEY (`id_ficha`),
  INDEX `fk_Ficha_Programas1_idx` (`Programas_id_programas`),
  INDEX `fk_Ficha_Estado1_idx` (`Estado_id_estado`),
  INDEX `fk_Ficha_Jornada1_idx` (`Jornada_id_jornada`),
  INDEX `fk_Ficha_Actividades1_idx` (`Actividades_id_actividades`),
  INDEX `fk_Ficha_Horario1_idx` (`Horario_id_horario`),
  INDEX `fk_Ficha_Trimestre1_idx` (`Trimestre_id_trimestre`),
  INDEX `fk_Ficha_Sede1_idx` (`Sede_id_sede`),
  INDEX `fk_Ficha_Etapa1_idx` (`Etapa_id_etapa`),
  INDEX `fk_Ficha_Modalidad1_idx` (`Modalidad_id_modalidad`),
  INDEX `fk_Ficha_Nivel_formacion1_idx` (`Nivel_formacion_id_nivel_formacion`),
  INDEX `fk_Ficha_Usuarios1_idx` (`Usuarios_id_usuarios`),
  CONSTRAINT `fk_Ficha_Programas1`
    FOREIGN KEY (`Programas_id_programas`)
    REFERENCES `ClassControl`.`Programas` (`id_programas`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Ficha_Estado1`
    FOREIGN KEY (`Estado_id_estado`)
    REFERENCES `ClassControl`.`Estado` (`id_estado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Ficha_Jornada1`
    FOREIGN KEY (`Jornada_id_jornada`)
    REFERENCES `ClassControl`.`Jornada` (`id_jornada`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Ficha_Actividades1`
    FOREIGN KEY (`Actividades_id_actividades`)
    REFERENCES `ClassControl`.`Actividades` (`id_actividades`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Ficha_Horario1`
    FOREIGN KEY (`Horario_id_horario`)
    REFERENCES `ClassControl`.`Horario` (`id_horario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Ficha_Trimestre1`
    FOREIGN KEY (`Trimestre_id_trimestre`)
    REFERENCES `ClassControl`.`Trimestre` (`id_trimestre`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Ficha_Sede1`
    FOREIGN KEY (`Sede_id_sede`)
    REFERENCES `ClassControl`.`Sede` (`id_sede`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Ficha_Etapa1`
    FOREIGN KEY (`Etapa_id_etapa`)
    REFERENCES `ClassControl`.`Etapa` (`id_etapa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Ficha_Modalidad1`
    FOREIGN KEY (`Modalidad_id_modalidad`)
    REFERENCES `ClassControl`.`Modalidad` (`id_modalidad`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Ficha_Nivel_formacion1`
    FOREIGN KEY (`Nivel_formacion_id_nivel_formacion`)
    REFERENCES `ClassControl`.`Nivel_formacion` (`id_nivel_formacion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Ficha_Usuarios1`
    FOREIGN KEY (`Usuarios_id_usuarios`)
    REFERENCES `ClassControl`.`Usuarios` (`id_usuarios`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
