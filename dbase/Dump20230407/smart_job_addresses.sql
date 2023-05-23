CREATE DATABASE  IF NOT EXISTS `smart_job` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `smart_job`;
-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: smart_job
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `addresses`
--

DROP TABLE IF EXISTS `addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `addresses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `country` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `subUrb` varchar(255) DEFAULT NULL,
  `street` varchar(255) DEFAULT NULL,
  `houseNumber` varchar(255) DEFAULT NULL,
  `location` point NOT NULL,
  `coordinate` varchar(255) NOT NULL,
  `longitude` float NOT NULL,
  `latitude` float NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int NOT NULL,
  `serviceId` int DEFAULT NULL,
  `jobId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Addresses_userId_foreign_idx` (`userId`),
  KEY `Addresses_serviceId_foreign_idx` (`serviceId`),
  KEY `Addresses_jobId_foreign_idx` (`jobId`),
  CONSTRAINT `Addresses_jobId_foreign_idx` FOREIGN KEY (`jobId`) REFERENCES `jobs` (`id`),
  CONSTRAINT `Addresses_serviceId_foreign_idx` FOREIGN KEY (`serviceId`) REFERENCES `services` (`id`),
  CONSTRAINT `Addresses_userId_foreign_idx` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `addresses`
--

LOCK TABLES `addresses` WRITE;
/*!40000 ALTER TABLE `addresses` DISABLE KEYS */;
INSERT INTO `addresses` VALUES (10,'Nigeria','Osun','iwo','Okeresi','','',_binary '\0\0\0\0\0\0\0���N�@M֨��@','4.182917 7.63333',4.18292,7.63333,'2023-04-05 11:41:50','2023-04-05 11:41:50',8,NULL,NULL),(11,'Nigeria','Osun','ode-omu','alusekere','','',_binary '\0\0\0\0\0\0\0D4��ؙ@n4��@\"@','4.40024 7.53345',12.0099,0.00987,'2023-04-05 11:41:50','2023-04-05 11:41:50',5,NULL,NULL),(12,'Nigeria','Osun','Ede','Okeresi','','',_binary '\0\0\0\0\0\0\0Ͻ�K��@��EB[\�@','4.43316 7.73277',12.0099,0.00987,'2023-04-05 11:41:50','2023-04-05 11:41:50',9,NULL,NULL),(13,'Nigeria','Osun','akoda','ileoba','','',_binary '\0\0\0\0\0\0\0�0\���\�@�AC�w@','4.44989 7.61623',12.0099,0.00987,'2023-04-05 11:41:50','2023-04-05 11:41:50',2,NULL,NULL),(14,'Nigeria','Osun','ife','OAUTH','','',_binary '\0\0\0\0\0\0\0pw\�n�@�Hh˹@','4.51634 7.52024',12.0099,0.00987,'2023-04-05 11:41:50','2023-04-05 11:41:50',7,NULL,NULL),(15,'Nigeria','Osun','abere','GRA','','',_binary '\0\0\0\0\0\0\0M֨�h@�@+0d�@','4.51993 7.73964',12.0099,7.73964,'2023-04-05 11:41:50','2023-04-05 11:41:50',3,NULL,NULL),(16,'Nigeria','Osun','ife','campus gate','','',_binary '\0\0\0\0\0\0\0Gr�\�@�x@\�@','4.52335 7.52036',12.0099,7.52036,'2023-04-05 11:41:50','2023-04-05 11:41:50',6,NULL,NULL),(17,'Nigeria','Osun','osogbo','oke-bale','','',_binary '\0\0\0\0\0\0\0�\Z�D�6@\�]K\�@','4.55367 7.77835',12.0099,7.77835,'2023-04-05 11:41:50','2023-04-05 11:41:50',4,NULL,NULL),(18,'Nigeria','Osun','ilesha','government college','','',_binary '\0\0\0\0\0\0\0�\Z�D�6@\�]K\�@','4.55367 7.77835',4.55367,7.77835,'2023-04-05 11:41:50','2023-04-05 11:41:50',10,NULL,NULL),(20,'nigeria','osun','oshogbo ','oke-bale',NULL,NULL,_binary '\0\0\0\0\0\0\0e\�/��6@J/�@','4.553665 7.778349',4.55367,7.77835,'2023-04-07 11:17:46','2023-04-07 11:17:46',12,25,NULL);
/*!40000 ALTER TABLE `addresses` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-07 18:02:53
