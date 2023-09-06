DROP USER IF EXISTS 'paintingUser'@'localhost';
CREATE USER 'paintingUser'@'localhost' IDENTIFIED BY 'painting2539';

GRANT ALL PRIVILEGES ON *.* TO 'paintingUser'@'localhost';

FLUSH PRIVILEGES;

DROP DATABASE `painting`;
CREATE Database `painting`;
USE `painting`;

DROP TABLE IF EXISTS `config`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `config` (
  `id` varchar(20) NOT NULL,
  `value` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `config`
--

LOCK TABLES `config` WRITE;
/*!40000 ALTER TABLE `config` DISABLE KEYS */;
INSERT INTO `config` VALUES ('ip1','192.168.0.102:81'),('ip2','192.168.0.100:8080');
/*!40000 ALTER TABLE `config` ENABLE KEYS */;
UNLOCK TABLES;

DROP TABLE IF EXISTS `colors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `colors` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `value` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `config`
--

LOCK TABLES `colors` WRITE;
/*!40000 ALTER TABLE `colors` DISABLE KEYS */;
INSERT INTO `colors` (`value`,`name`) VALUES ('black','Negro');
INSERT INTO `colors` (`value`,`name`) VALUES ('crimson','Rojo');
INSERT INTO `colors` (`value`,`name`) VALUES ('cornflowerblue','Azul');
/*!40000 ALTER TABLE `colors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `connections`
--

DROP TABLE IF EXISTS `connections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `connections` (
  `ip` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL DEFAULT '',
  `authorized` tinyint(1) NOT NULL DEFAULT 0,
  `colorId` INT NOT NULL DEFAULT 1,
  `colorTime` varchar(50) NOT NULL,
  `connectionTime` datetime NOT NULL,
  
  PRIMARY KEY (`ip`),
  FOREIGN KEY (`colorId`) REFERENCES `colors`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
--
-- Dumping data for table `connections`
--

LOCK TABLES `connections` WRITE;
/*!40000 ALTER TABLE `connections` DISABLE KEYS */;
/*!40000 ALTER TABLE `connections` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`id`,`password`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('admin','2539');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

