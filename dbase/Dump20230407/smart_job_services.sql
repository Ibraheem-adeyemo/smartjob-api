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
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services` (
  `id` int NOT NULL AUTO_INCREMENT,
  `workId` int DEFAULT NULL,
  `description` text NOT NULL,
  `location` int DEFAULT NULL,
  `expertLevel` enum('beginner','intermediate','advance','expert') NOT NULL,
  `yearsOfExperience` int NOT NULL,
  `banners` text NOT NULL,
  `video` varchar(255) DEFAULT NULL,
  `serviceType` int DEFAULT NULL,
  `status` enum('available','notavailable') DEFAULT NULL,
  `serviceCharges` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `workId` (`workId`),
  KEY `location` (`location`),
  KEY `serviceCharges` (`serviceCharges`),
  KEY `services_userId_foreign_idx` (`userId`),
  CONSTRAINT `services_ibfk_1` FOREIGN KEY (`workId`) REFERENCES `works` (`id`),
  CONSTRAINT `services_ibfk_2` FOREIGN KEY (`location`) REFERENCES `addresses` (`id`),
  CONSTRAINT `services_ibfk_3` FOREIGN KEY (`serviceCharges`) REFERENCES `charges` (`id`),
  CONSTRAINT `services_userId_foreign_idx` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES (2,1,'Am an experienced welder, who build a very strong and durable iron gate for modern building, as well as cupper gate, alluminium window and roofing.',NULL,'advance',4,'web banner2.avif',NULL,NULL,'available',NULL,'2023-04-06 07:37:31','2023-04-06 07:37:31',9),(3,3,'Am an experienced cleaner, who have over five yeasr of experience in cleaning. my cleaning expertise cut across residence, cooperate cleaning and general cleaning we also help people vacate apartment.',15,'expert',7,'successtrend.png','null',NULL,'available',NULL,'2023-04-06 16:47:41','2023-04-06 16:47:41',3),(4,2,'Am an experienced plumber, who have over five yeasr of experience in plumbing engineering. my expertise cut across residence plumbing construction and industrial piping and general plumbing you will be glad you employ my service.',15,'expert',7,'successtrend.png','null',NULL,'available',NULL,'2023-04-06 17:38:06','2023-04-06 17:38:06',3),(5,2,'Am an experienced plumber, who have over five yeasr of experience in plumbing engineering. my expertise cut across residence plumbing construction and industrial piping and general plumbing you will be glad you employ my service.',18,'expert',7,'successtrend.png','null',NULL,'available',NULL,'2023-04-06 17:42:04','2023-04-06 17:42:04',10),(25,2,'Am an experienced plumber, who have over five yeasr of experience in plumbing engineering. my expertise cut across residence plumbing construction and industrial piping and general plumbing you will be glad you employ my service.',20,'expert',7,'successtrend.png','null',NULL,'available',NULL,'2023-04-07 11:17:46','2023-04-07 11:17:46',12);
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-07 18:02:30
