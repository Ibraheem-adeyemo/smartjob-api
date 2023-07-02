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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `isVerified` tinyint(1) DEFAULT '0',
  `username` varchar(255) DEFAULT NULL,
  `credibility` enum('banned','active','susspend') DEFAULT 'active',
  `password` varchar(255) NOT NULL,
  `phoneNumber` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'Smith','Doe','bufurulasu-2080@yopmail.com',1,'Easy job','active','$2b$10$TKCUMYgg1JLjFRopWbeeRuryTt0jsBV1AXKSpOVkFbGbXS/.jrmK6','+2348140404040','2023-04-05 11:23:27','2023-04-05 11:23:27'),(3,'Abdullah','Isma\'el','koisaffoxaulau-5776@yopmail.com',0,NULL,'active','$2b$10$TKCUMYgg1JLjFRopWbeeRuryTt0jsBV1AXKSpOVkFbGbXS/.jrmK6','+2348140404040','2023-04-05 11:23:27','2023-04-05 11:23:27'),(4,'james','Isma\'el','koisaffoxaulau-57761@yopmail.com',0,NULL,'active','$2b$10$TKCUMYgg1JLjFRopWbeeRuryTt0jsBV1AXKSpOVkFbGbXS/.jrmK6','+2348140404040','2023-04-05 11:23:27','2023-04-05 11:23:27'),(5,'Abdullah','senior','koisaffoxaulau-57762@yopmail.com',1,NULL,'active','$2b$10$TKCUMYgg1JLjFRopWbeeRuryTt0jsBV1AXKSpOVkFbGbXS/.jrmK6','+2348140404040','2023-04-05 11:23:27','2023-04-05 11:23:27'),(6,'John','Doe','alt.yq-2o6e9fk21@yopmail.com',1,NULL,'active','$2b$10$TKCUMYgg1JLjFRopWbeeRuryTt0jsBV1AXKSpOVkFbGbXS/.jrmK6','+2347035853137','2023-04-05 11:23:27','2023-04-05 11:23:27'),(7,'Smith','Doe','bufurulasu-20801@yopmail.com',1,'Easy job2','active','$2b$10$TKCUMYgg1JLjFRopWbeeRuryTt0jsBV1AXKSpOVkFbGbXS/.jrmK6','+2348140404040','2023-04-05 11:23:27','2023-04-05 11:23:27'),(8,'Abdullah','Isma\'el','koisaffoxaulau-57763a@yopmail.com',0,NULL,'active','$2b$10$TKCUMYgg1JLjFRopWbeeRuryTt0jsBV1AXKSpOVkFbGbXS/.jrmK6','+2348140404040','2023-04-05 11:23:27','2023-04-05 11:23:27'),(9,'james','Isma\'el','koisaffoxaulau-57763b@yopmail.com',0,NULL,'active','$2b$10$TKCUMYgg1JLjFRopWbeeRuryTt0jsBV1AXKSpOVkFbGbXS/.jrmK6','+2348140404040','2023-04-05 11:23:27','2023-04-05 11:23:27'),(10,'Abdullah','senior','koisaffoxaulau-57763@yopmail.com',1,NULL,'active','$2b$10$TKCUMYgg1JLjFRopWbeeRuryTt0jsBV1AXKSpOVkFbGbXS/.jrmK6','+2348140404040','2023-04-05 11:23:27','2023-04-05 11:23:27'),(11,'John','Doe','alt.yq-2o6e9fk@yopmail.com',1,NULL,'active','$2b$10$TKCUMYgg1JLjFRopWbeeRuryTt0jsBV1AXKSpOVkFbGbXS/.jrmK6','+2347035853137','2023-04-05 11:23:27','2023-04-05 11:23:27'),(12,'Ice','Smith','alt.yq-2o6e9fk2@yopmail.com',1,NULL,'active','$2b$10$S27tYnR2b6hy9PzKcSKyYO2SGIronOvxr0vVhlKrDJOzVnNTcifQ6',NULL,'2023-04-06 17:54:33','2023-04-06 21:03:40');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-07 18:02:24
