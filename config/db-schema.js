// -- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
//     --
//         -- Host: localhost    Database: boilerplate-database
// -- ------------------------------------------------------
//     -- Server version	5.7.19-log
// ​
// /*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
// /*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
// /*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
// /*!40101 SET NAMES utf8 */;
// /*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
// /*!40103 SET TIME_ZONE='+00:00' */;
// /*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
// /*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
// /*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
// /*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
// ​
// --
//     -- Table structure for table `users`
//     --
// ​
// DROP TABLE IF EXISTS `users`;
// /*!40101 SET @saved_cs_client     = @@character_set_client */;
// /*!40101 SET character_set_client = utf8 */;
// CREATE TABLE `users` (
//     `id` int(11) NOT NULL AUTO_INCREMENT,
//     `first_name` varchar(50) NOT NULL,
//     `last_name` varchar(50) NOT NULL,
//     `full_name` varchar(80) DEFAULT NULL,
//     `username` varchar(90) NOT NULL,
//     `email` varchar(200) NOT NULL,
//     `phone` varchar(200) NOT NULL,
//     `password` varchar(400) DEFAULT NULL,
//     `image` varchar(300) DEFAULT NULL,
//     `birth_date` date DEFAULT NULL,
//     `type` enum('user','admin') NOT NULL,
//     `email_verified` enum('0','1') DEFAULT '0',
//     `cell_verified` enum('0','1') DEFAULT '1',
//     `created_at` datetime DEFAULT NULL,
//     PRIMARY KEY (`id`),
//     UNIQUE KEY `email_UNIQUE` (`email`),
//     UNIQUE KEY `phone_UNIQUE` (`phone`)
// ) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;
// /*!40101 SET character_set_client = @saved_cs_client */;
// ​
// --
//     -- Dumping data for table `users`
//     --