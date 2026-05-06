-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: classcontrol
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

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
/*!40000 ALTER TABLE `actividades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `ambientes`
--

LOCK TABLES `ambientes` WRITE;
/*!40000 ALTER TABLE `ambientes` DISABLE KEYS */;
INSERT INTO `ambientes` VALUES (1,'Taller de Metalmecánica',25,1),(2,'Taller de Soldadura',20,1),(3,'Laboratorio de Metrología',18,1),(4,'Ambiente de Costura ADMD',30,2),(5,'Taller de Patronaje y Diseño ADMD',28,2),(6,'Laboratorio de Textiles ADMD',22,2),(7,'Laboratorio de Software ADSO - 101',25,3),(8,'Laboratorio de Software ADSO - 102',25,3),(9,'Sala de Producción Audiovisual',15,3);
/*!40000 ALTER TABLE `ambientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `competencias`
--

LOCK TABLES `competencias` WRITE;
/*!40000 ALTER TABLE `competencias` DISABLE KEYS */;
/*!40000 ALTER TABLE `competencias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `estado`
--

LOCK TABLES `estado` WRITE;
/*!40000 ALTER TABLE `estado` DISABLE KEYS */;
INSERT INTO `estado` VALUES (1,'Activo'),(2,'Inactivo'),(3,'En Proceso'),(4,'Cancelado'),(5,'Finalizado');
/*!40000 ALTER TABLE `estado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `etapa`
--

LOCK TABLES `etapa` WRITE;
/*!40000 ALTER TABLE `etapa` DISABLE KEYS */;
INSERT INTO `etapa` VALUES (3,'Inducción'),(1,'Lectiva'),(4,'Nivelación'),(2,'Productiva');
/*!40000 ALTER TABLE `etapa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `ficha`
--

LOCK TABLES `ficha` WRITE;
/*!40000 ALTER TABLE `ficha` DISABLE KEYS */;
INSERT INTO `ficha` VALUES (1,'2877150','2026-01-15','2027-06-30',28,1,1,1,2,3,1,1),(2,'2877151','2026-01-15','2027-06-30',25,1,2,2,2,3,3,1),(3,'2877152','2026-02-01','2027-07-31',30,2,1,1,1,2,1,1),(4,'2877153','2026-02-01','2027-07-31',26,2,2,1,1,2,3,2),(5,'2877154','2026-03-01','2027-08-31',20,3,1,1,2,1,1,1),(6,'2877155','2026-03-01','2027-08-31',18,5,3,1,2,1,1,1),(7,'2877156','2025-07-15','2026-12-31',22,4,2,1,1,3,5,2);
/*!40000 ALTER TABLE `ficha` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `jornada`
--

LOCK TABLES `jornada` WRITE;
/*!40000 ALTER TABLE `jornada` DISABLE KEYS */;
INSERT INTO `jornada` VALUES (1,'Mañana'),(2,'Tarde'),(3,'Noche');
/*!40000 ALTER TABLE `jornada` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `modalidad`
--

LOCK TABLES `modalidad` WRITE;
/*!40000 ALTER TABLE `modalidad` DISABLE KEYS */;
INSERT INTO `modalidad` VALUES (1,'Presencial'),(2,'Virtual');
/*!40000 ALTER TABLE `modalidad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `nivel_formacion`
--

LOCK TABLES `nivel_formacion` WRITE;
/*!40000 ALTER TABLE `nivel_formacion` DISABLE KEYS */;
INSERT INTO `nivel_formacion` VALUES (1,'Técnico Laboral'),(2,'Tecnólogo'),(3,'Auxiliar'),(4,'Especialización Tecnológica'),(5,'Operario Calificado');
/*!40000 ALTER TABLE `nivel_formacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `programacion_instructores`
--

LOCK TABLES `programacion_instructores` WRITE;
/*!40000 ALTER TABLE `programacion_instructores` DISABLE KEYS */;
INSERT INTO `programacion_instructores` VALUES (1,'ADSO 2877150 T1','2026-01-15','2026-04-06','LUN','07:00:00','12:00:00',1,1,7,1,1),(2,'ADSO 2877150 T1','2026-01-16','2026-04-07','MAR','07:00:00','12:00:00',1,1,7,1,1),(3,'ADSO 2877150 T1','2026-01-17','2026-04-08','MIE','07:00:00','12:00:00',1,1,7,1,1),(4,'ADSO 2877150 T1','2026-01-18','2026-04-09','JUE','07:00:00','12:00:00',1,1,7,1,1),(5,'ADSO 2877150 T1','2026-01-19','2026-04-10','VIE','07:00:00','12:00:00',1,1,7,1,1),(6,'ADSO 2877150 T2','2026-04-20','2026-07-13','LUN','07:00:00','12:00:00',1,1,7,2,1),(7,'ADSO 2877150 T2','2026-04-21','2026-07-14','MAR','07:00:00','12:00:00',1,1,7,2,1),(8,'ADSO 2877150 T2','2026-04-22','2026-07-08','MIE','07:00:00','12:00:00',1,1,7,2,1),(9,'ADSO 2877150 T2','2026-04-23','2026-07-09','JUE','07:00:00','12:00:00',1,1,7,2,1),(10,'ADSO 2877150 T2','2026-04-24','2026-07-10','VIE','07:00:00','12:00:00',1,1,7,2,1),(11,'Mecánica 2877154 T1','2026-03-01','2026-04-06','LUN','07:00:00','12:00:00',5,2,1,1,1),(12,'Mecánica 2877154 T1','2026-03-02','2026-04-07','MAR','07:00:00','12:00:00',5,2,1,1,1),(13,'Mecánica 2877154 T1','2026-03-03','2026-04-08','MIE','07:00:00','12:00:00',5,2,1,1,1),(14,'Mecánica 2877154 T1','2026-03-04','2026-04-09','JUE','07:00:00','12:00:00',5,2,1,1,1),(15,'Mecánica 2877154 T1','2026-03-05','2026-04-10','VIE','07:00:00','12:00:00',5,2,1,1,1),(16,'Mecánica 2877154 T2','2026-04-20','2026-07-06','LUN','07:00:00','12:00:00',5,2,2,2,1),(17,'Mecánica 2877154 T2','2026-04-21','2026-07-07','MAR','07:00:00','12:00:00',5,2,2,2,1),(18,'Mecánica 2877154 T2','2026-04-22','2026-07-08','MIE','07:00:00','12:00:00',5,2,2,2,1),(19,'Mecánica 2877154 T2','2026-04-23','2026-07-09','JUE','07:00:00','12:00:00',5,2,2,2,1),(20,'Mecánica 2877154 T2','2026-04-24','2026-07-10','VIE','07:00:00','12:00:00',5,2,2,2,1),(21,'ADSO 2877151 T1','2026-01-15','2026-04-06','LUN','13:00:00','18:00:00',2,4,8,1,1),(22,'ADSO 2877151 T1','2026-01-16','2026-04-07','MAR','13:00:00','18:00:00',2,4,8,1,1),(23,'ADSO 2877151 T1','2026-01-17','2026-04-08','MIE','13:00:00','18:00:00',2,4,8,1,1),(24,'ADSO 2877151 T1','2026-01-18','2026-04-09','JUE','13:00:00','18:00:00',2,4,8,1,1),(25,'ADSO 2877151 T1','2026-01-19','2026-04-10','VIE','13:00:00','18:00:00',2,4,8,1,1),(26,'Gestión 2877156 T1','2025-07-15','2025-10-06','LUN','13:00:00','18:00:00',7,6,9,1,5),(27,'Gestión 2877156 T1','2025-07-16','2025-10-07','MAR','13:00:00','18:00:00',7,6,9,1,5),(28,'Gestión 2877156 T1','2025-07-17','2025-10-08','MIE','13:00:00','18:00:00',7,6,9,1,5),(29,'Gestión 2877156 T1','2025-07-18','2025-10-09','JUE','13:00:00','18:00:00',7,6,9,1,5),(30,'Gestión 2877156 T1','2025-07-19','2025-10-10','VIE','13:00:00','18:00:00',7,6,9,1,5),(31,'Gestión 2877156 T2','2025-10-16','2026-01-05','LUN','13:00:00','18:00:00',7,6,9,2,5),(32,'Gestión 2877156 T2','2025-10-17','2026-01-06','MAR','13:00:00','18:00:00',7,6,9,2,5),(33,'Gestión 2877156 T2','2025-10-18','2026-01-07','MIE','13:00:00','18:00:00',7,6,9,2,5),(34,'Gestión 2877156 T2','2025-10-19','2026-01-08','JUE','13:00:00','18:00:00',7,6,9,2,5),(35,'Gestión 2877156 T2','2025-10-20','2026-01-09','VIE','13:00:00','18:00:00',7,6,9,2,5),(36,'Moda 2877152 T1','2026-02-01','2026-04-06','LUN','07:00:00','12:00:00',3,7,4,1,1),(37,'Moda 2877152 T1','2026-02-02','2026-04-07','MAR','07:00:00','12:00:00',3,7,4,1,1),(38,'Moda 2877152 T1','2026-02-03','2026-04-08','MIE','07:00:00','12:00:00',3,7,4,1,1),(39,'Moda 2877152 T1','2026-02-04','2026-04-09','JUE','07:00:00','12:00:00',3,7,4,1,1),(40,'Moda 2877152 T1','2026-02-05','2026-04-10','VIE','07:00:00','12:00:00',3,7,4,1,1),(41,'Moda 2877152 T2','2026-04-20','2026-07-06','LUN','07:00:00','12:00:00',3,7,4,2,1),(42,'Moda 2877152 T2','2026-04-21','2026-07-07','MAR','07:00:00','12:00:00',3,7,4,2,1),(43,'Moda 2877152 T2','2026-04-22','2026-07-08','MIE','07:00:00','12:00:00',3,7,4,2,1),(44,'Moda 2877152 T2','2026-04-23','2026-07-09','JUE','07:00:00','12:00:00',3,7,4,2,1),(45,'Moda 2877152 T2','2026-04-24','2026-07-10','VIE','07:00:00','12:00:00',3,7,4,2,1),(46,'Electrónica 2877155 T1','2026-03-01','2026-04-06','LUN','18:00:00','22:00:00',6,8,9,1,1),(47,'Electrónica 2877155 T1','2026-03-02','2026-04-07','MAR','18:00:00','22:00:00',6,8,9,1,1),(48,'Electrónica 2877155 T1','2026-03-03','2026-04-08','MIE','18:00:00','22:00:00',6,8,9,1,1),(49,'Electrónica 2877155 T1','2026-03-04','2026-04-09','JUE','18:00:00','22:00:00',6,8,9,1,1),(50,'Electrónica 2877155 T1','2026-03-05','2026-04-10','VIE','18:00:00','22:00:00',6,8,9,1,1),(51,'Electrónica 2877155 T2','2026-04-20','2026-07-06','LUN','18:00:00','22:00:00',6,8,9,2,1),(52,'Electrónica 2877155 T2','2026-04-21','2026-07-07','MAR','18:00:00','22:00:00',6,8,9,2,1),(53,'Electrónica 2877155 T2','2026-04-22','2026-07-08','MIE','18:00:00','22:00:00',6,8,9,2,1),(54,'Electrónica 2877155 T2','2026-04-23','2026-07-09','JUE','18:00:00','22:00:00',6,8,9,2,1),(55,'Electrónica 2877155 T2','2026-04-24','2026-07-10','VIE','18:00:00','22:00:00',6,8,9,2,1);
/*!40000 ALTER TABLE `programacion_instructores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `programas`
--

LOCK TABLES `programas` WRITE;
/*!40000 ALTER TABLE `programas` DISABLE KEYS */;
INSERT INTO `programas` VALUES (1,228106,'Análisis y Desarrollo de Software'),(2,621202,'Análisis y Desarrollo de Moda'),(3,623615,'Mecánica Industrial'),(4,122115,'Gestión Administrativa'),(5,233101,'Electrónica');
/*!40000 ALTER TABLE `programas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `resultado_aprendizaje`
--

LOCK TABLES `resultado_aprendizaje` WRITE;
/*!40000 ALTER TABLE `resultado_aprendizaje` DISABLE KEYS */;
/*!40000 ALTER TABLE `resultado_aprendizaje` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (3,'Administrador'),(2,'Aprendiz'),(1,'Instructor');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `sede`
--

LOCK TABLES `sede` WRITE;
/*!40000 ALTER TABLE `sede` DISABLE KEYS */;
INSERT INTO `sede` VALUES (3,'Sede Comunicaciones'),(1,'Sede Mecánica'),(2,'Sede Textiles');
/*!40000 ALTER TABLE `sede` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tipo_documento`
--

LOCK TABLES `tipo_documento` WRITE;
/*!40000 ALTER TABLE `tipo_documento` DISABLE KEYS */;
INSERT INTO `tipo_documento` VALUES (1,'Cédula de Ciudadanía'),(3,'Cédula de Extranjería'),(4,'Pasaporte'),(5,'Permiso Especial de Permanencia'),(2,'Tarjeta de Identidad');
/*!40000 ALTER TABLE `tipo_documento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tipo_vinculacion`
--

LOCK TABLES `tipo_vinculacion` WRITE;
/*!40000 ALTER TABLE `tipo_vinculacion` DISABLE KEYS */;
INSERT INTO `tipo_vinculacion` VALUES (3,'Formativa'),(4,'Laboral'),(1,'Planta'),(2,'Temporal');
/*!40000 ALTER TABLE `tipo_vinculacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `trimestre`
--

LOCK TABLES `trimestre` WRITE;
/*!40000 ALTER TABLE `trimestre` DISABLE KEYS */;
INSERT INTO `trimestre` VALUES (1,1,'Primer Trimestre 2026','2026-01-15','2026-04-15'),(2,2,'Segundo Trimestre 2026','2026-04-16','2026-07-15'),(3,3,'Tercer Trimestre 2026','2026-07-16','2026-10-15'),(4,4,'Cuarto Trimestre 2026','2026-10-16','2026-12-20'),(5,1,'Primer Trimestre 2027','2027-01-15','2027-04-15');
/*!40000 ALTER TABLE `trimestre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Camilo','Hurtado','1120956066','Camilohurtado1120956066@gmail.com','3001966387','kr 8f este','CamiloHurtado','Bachillerato tecnico','Ninguna','Camilo2007-',0,2,1,3);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `vinculacionlaboral`
--

LOCK TABLES `vinculacionlaboral` WRITE;
/*!40000 ALTER TABLE `vinculacionlaboral` DISABLE KEYS */;
/*!40000 ALTER TABLE `vinculacionlaboral` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-05 19:47:22
