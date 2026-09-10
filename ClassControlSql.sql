-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: switchback.proxy.rlwy.net    Database: railway
-- ------------------------------------------------------
-- Server version	9.4.0

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

--
-- Dumping data for table `actividades`
--

LOCK TABLES `actividades` WRITE;
/*!40000 ALTER TABLE `actividades` DISABLE KEYS */;
INSERT INTO `actividades` VALUES (1,3101001,'Levantamiento de requisitos','Identificar y documentar los requisitos funcionales y no funcionales del sistema',1),(2,3101002,'Diseño de base de datos','Diseñar el modelo entidad-relación y la estructura de la base de datos',2),(3,3101003,'Implementación del backend','Construir servicios REST para gestionar usuarios y fichas',3),(4,3101004,'Pruebas funcionales','Ejecutar pruebas funcionales y registrar los resultados',3),(5,3101005,'Documentación técnica','Elaborar la documentación técnica del sistema',6),(6,3101006,'Diseño de Moda','Diseñar y aprender funcionalidades de moda',2),(7,3101007,'Desarrollo IA','Diseñar chatbots',1),(9,20,'Taller de Speaking','Practica del hablado del ingles',1),(10,3618106,'Mecanismo y conexiones','Manejo de artefactos',4),(12,1,'Desarrollo de base','Desarrollar algo',5),(14,4,'Tallercito','Recocha',1);
/*!40000 ALTER TABLE `actividades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `ambientes`
--

LOCK TABLES `ambientes` WRITE;
/*!40000 ALTER TABLE `ambientes` DISABLE KEYS */;
INSERT INTO `ambientes` VALUES (1,'Ambiente de Software 201',30,1,'Disponible'),(2,'Laboratorio de Sistemas 202',25,1,'Disponible'),(3,'Aula de Desarrollo 203',30,1,'Disponible'),(4,'Sala de Informática 301',35,2,'Disponible'),(5,'Laboratorio de Programación 302',25,2,'Disponible'),(6,'Area de Moda 303',30,2,'Disponible'),(7,'Ambiente de Musica',25,2,'Mantenimiento'),(9,'Lab 24',30,1,'Disponible'),(10,'Salón 150 - Moda sostenible',30,1,'Disponible'),(11,'Salón 220',25,3,'Disponible'),(12,'Ambiente 218',27,3,'Disponible'),(14,'lab 7',30,1,'Mantenimiento');
/*!40000 ALTER TABLE `ambientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `competencias`
--

LOCK TABLES `competencias` WRITE;
/*!40000 ALTER TABLE `competencias` DISABLE KEYS */;
INSERT INTO `competencias` VALUES (1,220505186,'Analizar requisitos de adsi',1),(2,220501013,'Diseñar el sistema de información',1),(3,220501014,'Construir el sistema de información',1),(4,220601501,'Gestionar el talento humano',2),(5,220601502,'Ejecutar procesos de selección',2),(6,220501015,'Desarrollar aplicaciones de software',3),(7,220501017,'Desarrollo de moda',2),(8,220501090,'Desarrollo AI y Videojuegos',7),(11,50881512,'estrcutura react',1);
/*!40000 ALTER TABLE `competencias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `estado`
--

LOCK TABLES `estado` WRITE;
/*!40000 ALTER TABLE `estado` DISABLE KEYS */;
INSERT INTO `estado` VALUES (1,'Activo',1),(2,'Inactivo',1),(3,'En ejecución',2),(4,'Finalizada',2),(5,'Pendiente',2),(6,'Programada',3),(7,'Cancelada',3);
/*!40000 ALTER TABLE `estado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `etapa`
--

LOCK TABLES `etapa` WRITE;
/*!40000 ALTER TABLE `etapa` DISABLE KEYS */;
INSERT INTO `etapa` VALUES (1,'Lectiva'),(3,'Lectiva y productiva'),(2,'Productiva');
/*!40000 ALTER TABLE `etapa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `ficha`
--

LOCK TABLES `ficha` WRITE;
/*!40000 ALTER TABLE `ficha` DISABLE KEYS */;
INSERT INTO `ficha` VALUES (1,'2876543','2026-01-19','2027-01-15',30,1,1,1,2,2,1,1),(2,'2876544','2026-01-01','2026-12-18',25,2,2,1,2,1,1,1),(3,'2876545','2026-02-02','2027-02-05',28,3,3,3,2,3,3,3),(4,'2876546','2026-03-09','2026-12-18',24,4,1,2,1,2,1,1),(5,'2876547','2025-08-01','2027-08-15',30,5,3,1,2,2,1,1),(6,'2876570','2025-08-12','2027-08-31',30,2,3,1,1,1,1,1),(7,'3171084','2025-03-20','2027-07-20',30,1,1,1,3,1,1,1),(8,'2598457','2026-08-29','2028-11-02',30,8,1,3,1,3,1,1),(9,'2545224','2026-08-21','2028-10-04',30,8,3,3,2,1,1,3),(10,'2545632','2026-08-21','2028-10-04',30,1,1,3,1,3,5,3);
/*!40000 ALTER TABLE `ficha` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `jornada`
--

LOCK TABLES `jornada` WRITE;
/*!40000 ALTER TABLE `jornada` DISABLE KEYS */;
INSERT INTO `jornada` VALUES (1,'Diurna'),(2,'Tarde'),(3,'Noche');
/*!40000 ALTER TABLE `jornada` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `modalidad`
--

LOCK TABLES `modalidad` WRITE;
/*!40000 ALTER TABLE `modalidad` DISABLE KEYS */;
INSERT INTO `modalidad` VALUES (1,'Presencial'),(2,'Virtual'),(3,'Mixto');
/*!40000 ALTER TABLE `modalidad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `nivel_formacion`
--

LOCK TABLES `nivel_formacion` WRITE;
/*!40000 ALTER TABLE `nivel_formacion` DISABLE KEYS */;
INSERT INTO `nivel_formacion` VALUES (1,'Técnico'),(2,'Tecnólogo'),(3,'Especialización tecnológica');
/*!40000 ALTER TABLE `nivel_formacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `permisos`
--

LOCK TABLES `permisos` WRITE;
/*!40000 ALTER TABLE `permisos` DISABLE KEYS */;
INSERT INTO `permisos` VALUES (1,'Consultar usuarios'),(2,'Crear usuarios'),(3,'Actualizar usuarios'),(4,'Eliminar usuarios'),(5,'Consultar fichas'),(6,'Crear fichas'),(7,'Actualizar fichas'),(8,'Eliminar fichas'),(9,'Consultar programación'),(10,'Crear programación'),(11,'Actualizar programación'),(12,'Cancelar programación');
/*!40000 ALTER TABLE `permisos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `programacion_instructores`
--

LOCK TABLES `programacion_instructores` WRITE;
/*!40000 ALTER TABLE `programacion_instructores` DISABLE KEYS */;
INSERT INTO `programacion_instructores` VALUES (1,'Clase de análisis de requisitos','2026-07-21','2026-08-14','LUN','07:00:00','11:00:00',1,2,1,3,6,1),(2,'Taller de modelado de datos','2026-07-21','2026-08-14','MAR','13:00:00','17:00:00',1,2,2,3,6,2),(3,'Práctica de backend','2026-07-21','2026-08-14','MIE','07:00:00','11:00:00',1,2,3,3,6,1),(4,'Laboratorio de pruebas','2026-07-21','2026-08-14','JUE','13:00:00','17:00:00',1,2,4,3,6,3),(5,'Documentación del proyecto','2026-07-21','2026-08-14','VIE','07:00:00','10:00:00',3,2,5,3,6,5),(6,'','2026-08-17','2026-08-21','MAR','06:00:00','14:00:00',5,11,6,4,1,6),(7,'','2026-08-24','2026-08-28','LUN','07:00:00','10:00:00',5,1,6,4,1,6),(9,'','2026-08-24','2026-08-24','LUN','06:30:00','12:30:00',7,2,1,4,3,2),(10,'','2026-08-27','2026-08-27','VIE','06:30:00','12:30:00',2,2,6,4,6,6),(11,'','2026-08-29','2028-01-06','VIE','10:00:00','13:00:00',10,10,1,4,1,4),(12,'no hay','2026-08-21','2026-09-21','MAR','10:00:00','13:00:00',1,2,12,4,1,12),(13,'ninguna','2026-08-21','2026-08-11','MAR','09:45:00','00:45:00',9,2,12,4,2,7),(14,'','2026-08-24','2026-08-24','LUN','06:00:00','12:00:00',1,21,1,3,1,2),(16,'','2026-08-24','2026-08-28','LUN','07:00:00','10:00:00',3,1,12,2,1,7),(17,'','2026-08-24','2026-08-28','LUN','07:00:00','10:00:00',8,21,12,2,1,2),(18,'','2026-09-01','2026-09-01','MAR','06:00:00','10:00:00',8,21,12,2,6,2);
/*!40000 ALTER TABLE `programacion_instructores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `programas`
--

LOCK TABLES `programas` WRITE;
/*!40000 ALTER TABLE `programas` DISABLE KEYS */;
INSERT INTO `programas` VALUES (1,228106,'Análisis y Desarrollo de Software'),(2,228102,'Gestión del Talento Humano'),(3,233104,'Programación de Software'),(4,226234,'Sistemas Teleinformáticos'),(5,228105,'Desarrollo de Moda'),(6,228107,'Mecatronica'),(7,228190,'Desarrollo de AI'),(8,228191,'Análisis de AI'),(10,349813,'Robótica');
/*!40000 ALTER TABLE `programas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `reportes`
--

LOCK TABLES `reportes` WRITE;
/*!40000 ALTER TABLE `reportes` DISABLE KEYS */;
INSERT INTO `reportes` VALUES (2,'Ambiente en mantenimiento por corriente eléctrica',NULL,'ambiente',21,5,'atendido','Nuevo ambiente - 218',3,'2026-08-24 01:29:15','2026-08-24 01:34:44'),(5,'ambiente ocupado','Está ocupado por otra ficha','ambiente',2,NULL,'atendido','Revisado, nuevo ambiente 218',3,'2026-08-24 12:10:43','2026-08-24 12:11:32'),(7,'Falla computadores','se dañaron 5 laptos','equipo',2,7,'atendido','Recibido: Tecnico mandado',3,'2026-08-25 22:07:18','2026-08-25 22:08:02');
/*!40000 ALTER TABLE `reportes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `restablecer_token`
--

LOCK TABLES `restablecer_token` WRITE;
/*!40000 ALTER TABLE `restablecer_token` DISABLE KEYS */;
INSERT INTO `restablecer_token` VALUES (11,3,'a0ac53003d1d39b8d1104d89183d9ed71044863fcb6073fa11b6b80d8ae6d5c4','2026-08-28 02:57:20',1,'2026-08-28 02:27:20'),(12,3,'f9ad79f7ffb05c483c3dfd86171f6bce3f369b766e1faa17f40510df8370d97c','2026-08-28 02:58:10',1,'2026-08-28 02:28:09'),(13,3,'9afbe3a49f0553a33cdcddc81aa161adb802ffeef092c0dcf1e528ac885dda9a','2026-08-28 03:08:24',1,'2026-08-28 02:38:23'),(14,3,'e08826a6a1c846a70a24f44dbfbf526457f644cfe6674a7dec649906d8760961','2026-08-28 03:10:58',1,'2026-08-28 02:40:57'),(15,3,'afc659519c254230cba0a3c172634aaf2979370479c9095c5d260590a24dcf31','2026-08-28 03:18:15',1,'2026-08-28 02:48:15');
/*!40000 ALTER TABLE `restablecer_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `resultado_aprendizaje`
--

LOCK TABLES `resultado_aprendizaje` WRITE;
/*!40000 ALTER TABLE `resultado_aprendizaje` DISABLE KEYS */;
INSERT INTO `resultado_aprendizaje` VALUES (1,240101001,'Especificar requisitos del software',1),(2,240101002,'Modelar la solución informática',2),(3,240101003,'Implementar componentes del software',3),(4,240101004,'Validar el funcionamiento de la aplicación',3),(5,240101005,'Documentar la solución desarrollada',6);
/*!40000 ALTER TABLE `resultado_aprendizaje` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (3,'Administrador'),(2,'Aprendiz'),(4,'Coordinador'),(1,'Instructor');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `roles_has_permisos`
--

LOCK TABLES `roles_has_permisos` WRITE;
/*!40000 ALTER TABLE `roles_has_permisos` DISABLE KEYS */;
INSERT INTO `roles_has_permisos` VALUES (1,1),(2,1),(3,1),(4,1),(3,2),(1,3),(3,3),(4,3),(3,4),(1,5),(2,5),(3,5),(4,5),(3,6),(4,6),(1,7),(3,7),(4,7),(3,8),(1,9),(2,9),(3,9),(4,9),(1,10),(3,10),(4,10),(1,11),(3,11),(4,11),(3,12);
/*!40000 ALTER TABLE `roles_has_permisos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `sede`
--

LOCK TABLES `sede` WRITE;
/*!40000 ALTER TABLE `sede` DISABLE KEYS */;
INSERT INTO `sede` VALUES (1,'Centro de Manufactura Textil y del Cuero'),(4,'chapinero'),(3,'Sede Alterna'),(2,'Sede Principal');
/*!40000 ALTER TABLE `sede` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tipo_documento`
--

LOCK TABLES `tipo_documento` WRITE;
/*!40000 ALTER TABLE `tipo_documento` DISABLE KEYS */;
INSERT INTO `tipo_documento` VALUES (1,'Cédula de Ciudadanía'),(3,'Cédula de Extranjería'),(4,'Pasaporte'),(2,'Tarjeta de Identidad');
/*!40000 ALTER TABLE `tipo_documento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tipo_estado`
--

LOCK TABLES `tipo_estado` WRITE;
/*!40000 ALTER TABLE `tipo_estado` DISABLE KEYS */;
INSERT INTO `tipo_estado` VALUES (1,'Estado de ficha'),(2,'Estado de actividad'),(3,'Estado de programación');
/*!40000 ALTER TABLE `tipo_estado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tipo_vinculacion`
--

LOCK TABLES `tipo_vinculacion` WRITE;
/*!40000 ALTER TABLE `tipo_vinculacion` DISABLE KEYS */;
INSERT INTO `tipo_vinculacion` VALUES (3,'Contratista'),(1,'Laboral'),(4,'planta'),(2,'Prestación de servicios');
/*!40000 ALTER TABLE `tipo_vinculacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `trimestre`
--

LOCK TABLES `trimestre` WRITE;
/*!40000 ALTER TABLE `trimestre` DISABLE KEYS */;
INSERT INTO `trimestre` VALUES (1,1,'Primer trimestre','2026-01-19','2026-04-17'),(2,2,'Segundo trimestre','2026-04-20','2026-07-17'),(3,3,'Tercer trimestre','2026-07-21','2026-10-16'),(4,4,'Cuarto trimestre','2026-10-19','2027-01-15'),(5,2,'trimestre 5','2026-08-21','2026-08-21');
/*!40000 ALTER TABLE `trimestre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Camiloa','Hurtado','1120956066','2007-10-14','camilohurtado1120956066@gmail.com','3001966387','','camilohurtado1120956066@gmail.com','','','$2a$10$2TGzfY0HyjR555y5edU31evLvxoS.rFlsYKAknYRFU3fNeizz02b6','2026-08-11',0,'2026-11-09',1,1,3,NULL),(2,'Laura','Martínez','1002456789','1995-04-12','laura.martinez@classcontrol.test','3005551002','','laura.martinez@classcontrol.test','','Análisis y Desarrollo de Software','$2a$10$2TGzfY0HyjR555y5edU31evLvxoS.rFlsYKAknYRFU3fNeizz02b6','2026-08-13',1,'2027-02-13',1,1,3,NULL),(3,'Andrés','Gómez','1009876543','1990-09-21','classcontrol312@gmail.com','3015551002','Carrera 15 #80-20','andres.admin','','','$2a$10$CAFMM8gfJhEwQCJ9qUv.SutAXUy.LSOSqntS3zfsDjoDpbvH9AiNK','2026-08-13',1,'2027-02-13',3,1,1,NULL),(4,'Valentina','Rojas','1012345678','1993-02-08','valentina.rojas@classcontrol.test','3025551003','','valentina.rojas@classcontrol.test','','Administración de Empresas','$2a$10$2TGzfY0HyjR555y5edU31evLvxoS.rFlsYKAknYRFU3fNeizz02b6','2026-08-13',1,'2027-02-13',4,1,3,NULL),(5,'Juan','Pérez','1001234567','2004-06-15','juan.perez@classcontrol.test','3035551004','Carrera 7 #34-11','juan.aprendiz','Bachiller','Desarrollo de Software','$2a$10$2TGzfY0HyjR555y5edU31evLvxoS.rFlsYKAknYRFU3fNeizz02b6','2026-08-13',1,'2027-02-13',2,2,2,7),(7,'Daniel','Castro','1018765432','2003-11-03','daniel.castro@classcontrol.test','3055551006','Carrera 30 #10-44','daniel.aprendiz','Bachiller','Sistemas Teleinformáticos','$2a$10$2TGzfY0HyjR555y5edU31evLvxoS.rFlsYKAknYRFU3fNeizz02b6','2026-08-13',1,'2027-02-13',2,2,2,NULL),(8,'Sofía','Ramírez','1003344556','2004-08-19','sofia.ramirez@classcontrol.test','3065551007','Calle 63 #18-52','sofia.aprendiz','Bachiller','Análisis y Desarrollo de Software','$2a$10$2TGzfY0HyjR555y5edU31evLvxoS.rFlsYKAknYRFU3fNeizz02b6','2026-08-13',1,'2027-02-13',2,2,2,NULL),(9,'Stiven','Ramirez','12324575890','2005-09-21','arrozconpollitooo@gmail.com','32036423423','','arrozconpollitooo@gmail.com','','adso pro','$2a$10$2TGzfY0HyjR555y5edU31evLvxoS.rFlsYKAknYRFU3fNeizz02b6','2026-08-14',1,'2026-11-12',3,1,3,NULL),(10,'Paola','Camargo','1234867890','2000-08-06','paola.camargo@gmail.com','1234567891','Carrera 15 c 35-09','paolacamargo','doctorado','Ingeniero','$2a$10$2TGzfY0HyjR555y5edU31evLvxoS.rFlsYKAknYRFU3fNeizz02b6','2026-08-14',1,'2026-11-12',1,1,1,NULL),(11,'Juan Sebastian','Rojas Guiza','1077577717','2007-10-17','rojasguizaj@gmail.com','3052239389','Cra 7 #17-57','aragan','doctorado','Profesor de Ingles','$2a$10$EGDhbAFK8N2Rmz/RoGke3uvmNVd7ZBsT6Dznw7E2zY3qqCBSqFiRe','2026-08-14',1,'2026-11-12',1,1,1,NULL),(12,'Juan Alberto','Perez Castro','24125324','2006-08-16','tafava9949@luhupo.com','3254854585','calle 13','jperez','tecnologo','ADSO','$2a$10$2TGzfY0HyjR555y5edU31evLvxoS.rFlsYKAknYRFU3fNeizz02b6','2026-08-16',1,'2026-11-14',2,1,1,NULL),(13,'Claudia','Perez','123456789012','2006-06-14','claudia@gmail.com','123456789','CLL 13S #20-01','claudiap','especializacion','Ingeniero','$2a$10$2TGzfY0HyjR555y5edU31evLvxoS.rFlsYKAknYRFU3fNeizz02b6','2026-08-16',1,'2026-11-14',1,1,1,NULL),(17,'rodri','hernandez','1232084934','2000-01-09','rodri3defe@gmail.com','3450389489834','cll90sur 40 noresere','rodrixs','Tecnologo','trabajo videovisual','$2a$10$2TGzfY0HyjR555y5edU31evLvxoS.rFlsYKAknYRFU3fNeizz02b6','2026-08-18',1,'2026-11-16',2,1,1,NULL),(18,'Jesus','Rojas','52456984','2006-08-21','jewiva7357@archifun.com','542645242','calle 13','jesus','tecnologo','Analista y desarrollador de software','$2a$10$2TGzfY0HyjR555y5edU31evLvxoS.rFlsYKAknYRFU3fNeizz02b6','2026-08-21',1,'2026-11-19',2,1,1,NULL),(21,'Juan Carlos','Hernández','123465345734','1999-02-01','Carlos@sena.edu.co','30019932743','Calle 23# 14G','carlosinstructor','tecnologo','Gestión administrativa','$2a$10$2TGzfY0HyjR555y5edU31evLvxoS.rFlsYKAknYRFU3fNeizz02b6','2026-08-22',1,'2026-11-20',1,1,1,NULL);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `vinculacion_laboral`
--

LOCK TABLES `vinculacion_laboral` WRITE;
/*!40000 ALTER TABLE `vinculacion_laboral` DISABLE KEYS */;
INSERT INTO `vinculacion_laboral` VALUES (1,'Contrato laboral','CL-2026-001','2026-01-10','2026-12-31',2),(2,'Contrato laboral','CL-2026-002','2026-01-10','2026-12-31',3),(3,'Prestación de servicios','PS-2026-014','2026-02-01','2026-12-15',4);
/*!40000 ALTER TABLE `vinculacion_laboral` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-08-29 16:15:45
