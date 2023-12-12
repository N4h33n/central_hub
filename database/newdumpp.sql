-- MySQL dump 10.13  Distrib 8.1.0, for macos12.6 (arm64)
--
-- Host: localhost    Database: centralhub
-- ------------------------------------------------------
-- Server version	8.0.32

DROP database if exists centralhub;
CREATE database centralhub;
use centralhub;

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ADMIN`
--

DROP TABLE IF EXISTS `ADMIN`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ADMIN` (
  `a_ucid` varchar(10) NOT NULL,
  `email` varchar(45) NOT NULL,
  `passhash` varchar(255) NOT NULL,
  PRIMARY KEY (`a_ucid`),
  UNIQUE KEY `Email_UNIQUE` (`email`),
  CONSTRAINT `a_ucid` FOREIGN KEY (`a_ucid`) REFERENCES `FACULTY` (`f_ucid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ADMIN`
--

LOCK TABLES `ADMIN` WRITE;
/*!40000 ALTER TABLE `ADMIN` DISABLE KEYS */;
INSERT INTO `ADMIN` VALUES ('100', 'admin@ucalgary.ca', 'password');
/*!40000 ALTER TABLE `ADMIN` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ASSIGNMENT`
--

DROP TABLE IF EXISTS `ASSIGNMENT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ASSIGNMENT` (
  `courseno` varchar(8) NOT NULL,
  `assignmentno` int NOT NULL,
  `deadline` datetime NOT NULL,
  `weight` float NOT NULL,
  `a_ucid` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`courseno`,`assignmentno`),
  UNIQUE KEY `assignmentno_UNIQUE` (`assignmentno`),
  KEY `a_ucid_a_idx` (`a_ucid`),
  CONSTRAINT `a_ucid_a` FOREIGN KEY (`a_ucid`) REFERENCES `ADMIN` (`a_ucid`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `courseno_a` FOREIGN KEY (`courseno`) REFERENCES `COURSE` (`courseno`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ASSIGNMENT`
--

LOCK TABLES `ASSIGNMENT` WRITE;
/*!40000 ALTER TABLE `ASSIGNMENT` DISABLE KEYS */;
INSERT INTO `ASSIGNMENT` VALUES ('CPSC 471',2,'2023-12-14 23:59:59',0.4,'00000001'),('CPSC 481',4,'2023-12-31 23:59:59',0.2,'00000001');
/*!40000 ALTER TABLE `ASSIGNMENT` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CLUB`
--

DROP TABLE IF EXISTS `CLUB`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CLUB` (
  `clubname` varchar(45) NOT NULL,
  `description` text,
  `location` varchar(10) DEFAULT NULL,
  `time` varchar(20) DEFAULT NULL,
  `a_ucid` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`clubname`),
  KEY `a_ucid_c_idx` (`a_ucid`),
  CONSTRAINT `a_ucid_c` FOREIGN KEY (`a_ucid`) REFERENCES `ADMIN` (`a_ucid`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CLUB`
--

LOCK TABLES `CLUB` WRITE;
/*!40000 ALTER TABLE `CLUB` DISABLE KEYS */;
INSERT INTO `CLUB` VALUES ('WICS','Women in computer science does coding or something','MSC 10','T 15:00','00000001');
/*!40000 ALTER TABLE `CLUB` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CLUB_FIELDS`
--

DROP TABLE IF EXISTS `CLUB_FIELDS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CLUB_FIELDS` (
  `clubname` varchar(45) NOT NULL,
  `field` varchar(20) NOT NULL,
  `a_ucid` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`clubname`,`field`),
  KEY `a_ucid_clf_idx` (`a_ucid`),
  CONSTRAINT `a_ucid_clf` FOREIGN KEY (`a_ucid`) REFERENCES `ADMIN` (`a_ucid`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `clubname_cf` FOREIGN KEY (`clubname`) REFERENCES `CLUB` (`clubname`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CLUB_FIELDS`
--

LOCK TABLES `CLUB_FIELDS` WRITE;
/*!40000 ALTER TABLE `CLUB_FIELDS` DISABLE KEYS */;
INSERT INTO `CLUB_FIELDS` VALUES ('WICS','coding','00000001'),('WICS','women','00000001');
/*!40000 ALTER TABLE `CLUB_FIELDS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `COMPLETED_RESEARCH`
--

DROP TABLE IF EXISTS `COMPLETED_RESEARCH`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `COMPLETED_RESEARCH` (
  `researchid` varchar(10) NOT NULL,
  `datecompleted` date NOT NULL,
  PRIMARY KEY (`researchid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `COMPLETED_RESEARCH`
--

LOCK TABLES `COMPLETED_RESEARCH` WRITE;
/*!40000 ALTER TABLE `COMPLETED_RESEARCH` DISABLE KEYS */;
INSERT INTO `COMPLETED_RESEARCH` VALUES ('1234','2022-12-24');
/*!40000 ALTER TABLE `COMPLETED_RESEARCH` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `COURSE`
--

DROP TABLE IF EXISTS `COURSE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `COURSE` (
  `courseno` varchar(8) NOT NULL,
  `coursename` varchar(100) NOT NULL,
  `semester` varchar(3) NOT NULL,
  `a_ucid` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`courseno`),
  UNIQUE KEY `coursename_UNIQUE` (`coursename`),
  KEY `a_ucid_co_idx` (`a_ucid`),
  CONSTRAINT `a_ucid_co` FOREIGN KEY (`a_ucid`) REFERENCES `ADMIN` (`a_ucid`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `COURSE`
--

LOCK TABLES `COURSE` WRITE;
/*!40000 ALTER TABLE `COURSE` DISABLE KEYS */;
INSERT INTO `COURSE` VALUES ('CPSC 471','Database','F23','00000001'),('CPSC 481','HCI','F24','00000001');
/*!40000 ALTER TABLE `COURSE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `COURSE_FIELDS`
--

DROP TABLE IF EXISTS `COURSE_FIELDS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `COURSE_FIELDS` (
  `courseno` varchar(8) NOT NULL,
  `field` varchar(20) NOT NULL,
  `a_ucid` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`courseno`,`field`),
  KEY `a_ucid_cf_idx` (`a_ucid`),
  CONSTRAINT `a_ucid_cf` FOREIGN KEY (`a_ucid`) REFERENCES `ADMIN` (`a_ucid`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `courseno_f` FOREIGN KEY (`courseno`) REFERENCES `COURSE` (`courseno`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `COURSE_FIELDS`
--

LOCK TABLES `COURSE_FIELDS` WRITE;
/*!40000 ALTER TABLE `COURSE_FIELDS` DISABLE KEYS */;
INSERT INTO `COURSE_FIELDS` VALUES ('CPSC 471','database','00000001'),('CPSC 481','HCI','00000001');
/*!40000 ALTER TABLE `COURSE_FIELDS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `COURSE_PREREQS`
--

DROP TABLE IF EXISTS `COURSE_PREREQS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `COURSE_PREREQS` (
  `courseno` varchar(8) NOT NULL,
  `prereq` varchar(8) NOT NULL,
  `a_ucid` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`courseno`,`prereq`),
  KEY `a_ucid_cp_idx` (`a_ucid`),
  CONSTRAINT `a_ucid_cp` FOREIGN KEY (`a_ucid`) REFERENCES `ADMIN` (`a_ucid`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `courseno_cp` FOREIGN KEY (`courseno`) REFERENCES `COURSE` (`courseno`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `COURSE_PREREQS`
--

LOCK TABLES `COURSE_PREREQS` WRITE;
/*!40000 ALTER TABLE `COURSE_PREREQS` DISABLE KEYS */;
INSERT INTO `COURSE_PREREQS` VALUES ('CPSC 471','CPSC 331','00000001'),('CPSC 471','CPSC 351','00000001'),('CPSC 481','CPSC 331','00000001');
/*!40000 ALTER TABLE `COURSE_PREREQS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `EXAM`
--

DROP TABLE IF EXISTS `EXAM`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `EXAM` (
  `courseno` varchar(8) NOT NULL,
  `examno` int NOT NULL,
  `location` varchar(10) NOT NULL,
  `time` datetime NOT NULL,
  `duration` time NOT NULL,
  `weight` float NOT NULL,
  `a_ucid` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`courseno`,`examno`),
  UNIQUE KEY `examno_UNIQUE` (`examno`),
  KEY `a_ucid_idx` (`a_ucid`),
  CONSTRAINT `a_ucid_e` FOREIGN KEY (`a_ucid`) REFERENCES `ADMIN` (`a_ucid`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `courseno_e` FOREIGN KEY (`courseno`) REFERENCES `COURSE` (`courseno`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `EXAM`
--

LOCK TABLES `EXAM` WRITE;
/*!40000 ALTER TABLE `EXAM` DISABLE KEYS */;
INSERT INTO `EXAM` VALUES ('CPSC 471',2,'ICT 221','2023-12-15 12:00:00','02:00:00',0.3,'00000001'),('CPSC 481',3,'MS 160','2023-12-30 13:00:00','01:30:00',0.5,'00000001');
/*!40000 ALTER TABLE `EXAM` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FACULTY`
--

DROP TABLE IF EXISTS `FACULTY`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `FACULTY` (
  `f_ucid` varchar(10) NOT NULL,
  `email` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`f_ucid`),
  UNIQUE KEY `F_UCID_UNIQUE` (`f_ucid`),
  UNIQUE KEY `Email_UNIQUE` (`email`),
  UNIQUE KEY `Image_UNIQUE` (`image`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FACULTY`
--

LOCK TABLES `FACULTY` WRITE;
/*!40000 ALTER TABLE `FACULTY` DISABLE KEYS */;
INSERT INTO `FACULTY` VALUES ('00000001','naheenkabir@gmail.com','Naheen Kabir',NULL),('1','ahmed@ucalgary.ca','Ahmed Al Marouf',NULL),('2','ehud@ucalgary.ca','Ehud Sharlin',NULL),('21','ali@a.com','Ali Ali',NULL),('22','kate@k.com','Kate Kate',NULL),('3','john@gmail.com','John Doe',NULL),('4','jane@gmail.com','Jane Doe',NULL),('100', 'admin@ucalgary.ca', 'Admin Ad', NULL);
/*!40000 ALTER TABLE `FACULTY` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `INSTRUCTOR`
--

DROP TABLE IF EXISTS `INSTRUCTOR`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `INSTRUCTOR` (
  `i_ucid` varchar(10) NOT NULL,
  PRIMARY KEY (`i_ucid`),
  CONSTRAINT `i_ucid` FOREIGN KEY (`i_ucid`) REFERENCES `PROFESSOR` (`p_ucid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `INSTRUCTOR`
--

LOCK TABLES `INSTRUCTOR` WRITE;
/*!40000 ALTER TABLE `INSTRUCTOR` DISABLE KEYS */;
INSERT INTO `INSTRUCTOR` VALUES ('1'),('2');
/*!40000 ALTER TABLE `INSTRUCTOR` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LECTURE`
--

DROP TABLE IF EXISTS `LECTURE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `LECTURE` (
  `courseno` varchar(8) NOT NULL,
  `lectureno` varchar(3) NOT NULL,
  `location` varchar(10) NOT NULL,
  `time` varchar(20) DEFAULT NULL,
  `i_ucid` varchar(10) DEFAULT NULL,
  `a_ucid` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`courseno`,`lectureno`),
  UNIQUE KEY `lectureno_UNIQUE` (`lectureno`),
  KEY `a_ucid_l_idx` (`a_ucid`),
  KEY `i_ucid_idx` (`i_ucid`),
  CONSTRAINT `a_ucid_l` FOREIGN KEY (`a_ucid`) REFERENCES `ADMIN` (`a_ucid`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `courseno_l` FOREIGN KEY (`courseno`) REFERENCES `COURSE` (`courseno`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `i_ucid_l` FOREIGN KEY (`i_ucid`) REFERENCES `INSTRUCTOR` (`i_ucid`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LECTURE`
--

LOCK TABLES `LECTURE` WRITE;
/*!40000 ALTER TABLE `LECTURE` DISABLE KEYS */;
INSERT INTO `LECTURE` VALUES ('CPSC 471','2','ICT 212','MW 13:00','1','00000001'),('CPSC 481','1','MS 360','WF 10:00','2','00000001');
/*!40000 ALTER TABLE `LECTURE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ONGOING_RESEARCH`
--

DROP TABLE IF EXISTS `ONGOING_RESEARCH`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ONGOING_RESEARCH` (
  `researchid` varchar(10) NOT NULL,
  PRIMARY KEY (`researchid`),
  CONSTRAINT `researchid` FOREIGN KEY (`researchid`) REFERENCES `RESEARCH` (`researchid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ONGOING_RESEARCH`
--

LOCK TABLES `ONGOING_RESEARCH` WRITE;
/*!40000 ALTER TABLE `ONGOING_RESEARCH` DISABLE KEYS */;
INSERT INTO `ONGOING_RESEARCH` VALUES ('5678');
/*!40000 ALTER TABLE `ONGOING_RESEARCH` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PROF_FIELDS`
--

DROP TABLE IF EXISTS `PROF_FIELDS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PROF_FIELDS` (
  `p_ucid` varchar(10) NOT NULL,
  `field` varchar(20) NOT NULL,
  `a_ucid` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`p_ucid`,`field`),
  KEY `a_ucid_pf_idx` (`a_ucid`),
  CONSTRAINT `a_ucid_pf` FOREIGN KEY (`a_ucid`) REFERENCES `ADMIN` (`a_ucid`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `p_ucid_pf` FOREIGN KEY (`p_ucid`) REFERENCES `PROFESSOR` (`p_ucid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PROF_FIELDS`
--

LOCK TABLES `PROF_FIELDS` WRITE;
/*!40000 ALTER TABLE `PROF_FIELDS` DISABLE KEYS */;
INSERT INTO `PROF_FIELDS` VALUES ('1','Database','00000001'),('1','SQL','00000001'),('2','HCI','00000001'),('2','WebDev','00000001'),('21','AI','00000001'),('22','NLP','00000001');
/*!40000 ALTER TABLE `PROF_FIELDS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PROFESSOR`
--

DROP TABLE IF EXISTS `PROFESSOR`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PROFESSOR` (
  `p_ucid` varchar(10) NOT NULL,
  `a_ucid` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`p_ucid`),
  KEY `a_ucid_idx` (`a_ucid`),
  CONSTRAINT `a_ucid_p` FOREIGN KEY (`a_ucid`) REFERENCES `ADMIN` (`a_ucid`),
  CONSTRAINT `p_ucid` FOREIGN KEY (`p_ucid`) REFERENCES `FACULTY` (`f_ucid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PROFESSOR`
--

LOCK TABLES `PROFESSOR` WRITE;
/*!40000 ALTER TABLE `PROFESSOR` DISABLE KEYS */;
INSERT INTO `PROFESSOR` VALUES ('1','00000001'),('2','00000001'),('21','00000001'),('22','00000001');
/*!40000 ALTER TABLE `PROFESSOR` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RESEARCH`
--

DROP TABLE IF EXISTS `RESEARCH`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `RESEARCH` (
  `researchid` varchar(10) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` text,
  `a_ucid` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`researchid`),
  KEY `a_ucid_idx` (`a_ucid`),
  CONSTRAINT `a_ucid_r` FOREIGN KEY (`a_ucid`) REFERENCES `ADMIN` (`a_ucid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RESEARCH`
--

LOCK TABLES `RESEARCH` WRITE;
/*!40000 ALTER TABLE `RESEARCH` DISABLE KEYS */;
INSERT INTO `RESEARCH` VALUES ('1234','AnimalAI','ai in animals','00000001'),('5678','DoggyNLP','teaching dogs nlp','00000001');
/*!40000 ALTER TABLE `RESEARCH` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RESEARCH_CONDUCTEDBY_PROFESSOR`
--

DROP TABLE IF EXISTS `RESEARCH_CONDUCTEDBY_PROFESSOR`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `RESEARCH_CONDUCTEDBY_PROFESSOR` (
  `researchid` varchar(10) NOT NULL,
  `r_ucid` varchar(10) NOT NULL,
  `a_ucid` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`researchid`,`r_ucid`),
  KEY `r_ucid_rp_idx` (`r_ucid`),
  KEY `a_ucid_rp_idx` (`a_ucid`),
  CONSTRAINT `a_ucid_rp` FOREIGN KEY (`a_ucid`) REFERENCES `ADMIN` (`a_ucid`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `r_ucid_rp` FOREIGN KEY (`r_ucid`) REFERENCES `RESEARCH_PROFESSOR` (`r_ucid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `researchid_rp` FOREIGN KEY (`researchid`) REFERENCES `RESEARCH` (`researchid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RESEARCH_CONDUCTEDBY_PROFESSOR`
--

LOCK TABLES `RESEARCH_CONDUCTEDBY_PROFESSOR` WRITE;
/*!40000 ALTER TABLE `RESEARCH_CONDUCTEDBY_PROFESSOR` DISABLE KEYS */;
INSERT INTO `RESEARCH_CONDUCTEDBY_PROFESSOR` VALUES ('1234','21','00000001'),('5678','22','00000001');
/*!40000 ALTER TABLE `RESEARCH_CONDUCTEDBY_PROFESSOR` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RESEARCH_FIELDS`
--

DROP TABLE IF EXISTS `RESEARCH_FIELDS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `RESEARCH_FIELDS` (
  `researchid` varchar(10) NOT NULL,
  `field` varchar(20) NOT NULL,
  `a_ucid` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`researchid`,`field`),
  KEY `a_ucid_rf_idx` (`a_ucid`),
  CONSTRAINT `a_ucid_rf` FOREIGN KEY (`a_ucid`) REFERENCES `ADMIN` (`a_ucid`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `researchid_rf` FOREIGN KEY (`researchid`) REFERENCES `RESEARCH` (`researchid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RESEARCH_FIELDS`
--

LOCK TABLES `RESEARCH_FIELDS` WRITE;
/*!40000 ALTER TABLE `RESEARCH_FIELDS` DISABLE KEYS */;
INSERT INTO `RESEARCH_FIELDS` VALUES ('1234','ai','00000001'),('1234','machine learning','00000001'),('5678','machine learning','00000001'),('5678','nlp','00000001');
/*!40000 ALTER TABLE `RESEARCH_FIELDS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RESEARCH_PROFESSOR`
--

DROP TABLE IF EXISTS `RESEARCH_PROFESSOR`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `RESEARCH_PROFESSOR` (
  `r_ucid` varchar(10) NOT NULL,
  PRIMARY KEY (`r_ucid`),
  CONSTRAINT `r_ucid` FOREIGN KEY (`r_ucid`) REFERENCES `PROFESSOR` (`p_ucid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RESEARCH_PROFESSOR`
--

LOCK TABLES `RESEARCH_PROFESSOR` WRITE;
/*!40000 ALTER TABLE `RESEARCH_PROFESSOR` DISABLE KEYS */;
INSERT INTO `RESEARCH_PROFESSOR` VALUES ('21'),('22');
/*!40000 ALTER TABLE `RESEARCH_PROFESSOR` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `STUDENT`
--

DROP TABLE IF EXISTS `STUDENT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `STUDENT` (
  `s_ucid` varchar(10) NOT NULL,
  `email` varchar(45) NOT NULL,
  `phone` varchar(10) DEFAULT NULL,
  `name` varchar(45) NOT NULL,
  `address` varchar(100) DEFAULT NULL,
  `passhash` varchar(255) NOT NULL,
  `a_ucid` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`s_ucid`),
  UNIQUE KEY `Email_UNIQUE` (`email`),
  UNIQUE KEY `Phone_UNIQUE` (`phone`),
  KEY `A_UCID_idx` (`a_ucid`),
  CONSTRAINT `a_ucid_s` FOREIGN KEY (`a_ucid`) REFERENCES `ADMIN` (`a_ucid`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `STUDENT`
--

LOCK TABLES `STUDENT` WRITE;
/*!40000 ALTER TABLE `STUDENT` DISABLE KEYS */;
INSERT INTO `STUDENT` VALUES ('30','naheen.kabir@ucalgary.ca','587','Naheen K','mom','yuh','00000001');
/*!40000 ALTER TABLE `STUDENT` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `STUDENT_DOES_ASSIGNMENT`
--

DROP TABLE IF EXISTS `STUDENT_DOES_ASSIGNMENT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `STUDENT_DOES_ASSIGNMENT` (
  `s_ucid` varchar(10) NOT NULL,
  `courseno` varchar(8) NOT NULL,
  `assignmentno` int NOT NULL,
  `grade` float DEFAULT NULL,
  `a_ucid` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`s_ucid`,`courseno`,`assignmentno`),
  KEY `courseno_sa_idx` (`courseno`),
  KEY `assignmentno_sa_idx` (`assignmentno`),
  KEY `a_ucid_sa_idx` (`a_ucid`),
  CONSTRAINT `a_ucid_sa` FOREIGN KEY (`a_ucid`) REFERENCES `ADMIN` (`a_ucid`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `assignmentno_sa` FOREIGN KEY (`assignmentno`) REFERENCES `ASSIGNMENT` (`assignmentno`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `courseno_sa` FOREIGN KEY (`courseno`) REFERENCES `ASSIGNMENT` (`courseno`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `s_ucid_sa` FOREIGN KEY (`s_ucid`) REFERENCES `STUDENT` (`s_ucid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `STUDENT_DOES_ASSIGNMENT`
--

LOCK TABLES `STUDENT_DOES_ASSIGNMENT` WRITE;
/*!40000 ALTER TABLE `STUDENT_DOES_ASSIGNMENT` DISABLE KEYS */;
INSERT INTO `STUDENT_DOES_ASSIGNMENT` VALUES ('30','CPSC 471',2,0.7,'00000001'),('30','CPSC 481',4,0.9,'00000001');
/*!40000 ALTER TABLE `STUDENT_DOES_ASSIGNMENT` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `STUDENT_ENROLLEDIN_COURSE`
--

DROP TABLE IF EXISTS `STUDENT_ENROLLEDIN_COURSE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `STUDENT_ENROLLEDIN_COURSE` (
  `s_ucid` varchar(10) NOT NULL,
  `courseno` varchar(8) NOT NULL,
  `grade` float DEFAULT NULL,
  `a_ucid` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`s_ucid`,`courseno`),
  KEY `a_ucid_sco_idx` (`a_ucid`),
  KEY `courseno_sc_idx` (`courseno`),
  CONSTRAINT `a_ucid_sco` FOREIGN KEY (`a_ucid`) REFERENCES `ADMIN` (`a_ucid`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `courseno_sc` FOREIGN KEY (`courseno`) REFERENCES `COURSE` (`courseno`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `s_ucid_sc` FOREIGN KEY (`s_ucid`) REFERENCES `STUDENT` (`s_ucid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `STUDENT_ENROLLEDIN_COURSE`
--

LOCK TABLES `STUDENT_ENROLLEDIN_COURSE` WRITE;
/*!40000 ALTER TABLE `STUDENT_ENROLLEDIN_COURSE` DISABLE KEYS */;
INSERT INTO `STUDENT_ENROLLEDIN_COURSE` VALUES ('30','CPSC 471',NULL,'00000001'),('30','CPSC 481',NULL,'00000001');
/*!40000 ALTER TABLE `STUDENT_ENROLLEDIN_COURSE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `STUDENT_ENROLLEDIN_LECTURE`
--

DROP TABLE IF EXISTS `STUDENT_ENROLLEDIN_LECTURE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `STUDENT_ENROLLEDIN_LECTURE` (
  `s_ucid` varchar(10) NOT NULL,
  `courseno` varchar(8) NOT NULL,
  `lectureno` varchar(3) NOT NULL,
  `a_ucid` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`s_ucid`,`courseno`,`lectureno`),
  KEY `lectureno_sl_idx` (`lectureno`),
  KEY `courseno_sl_idx` (`courseno`),
  KEY `a_ucid_sl_idx` (`a_ucid`),
  CONSTRAINT `a_ucid_sl` FOREIGN KEY (`a_ucid`) REFERENCES `ADMIN` (`a_ucid`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `courseno_sl` FOREIGN KEY (`courseno`) REFERENCES `STUDENT_ENROLLEDIN_COURSE` (`courseno`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `lectureno_sl` FOREIGN KEY (`lectureno`) REFERENCES `LECTURE` (`lectureno`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `s_ucid_sl` FOREIGN KEY (`s_ucid`) REFERENCES `STUDENT_ENROLLEDIN_COURSE` (`s_ucid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `STUDENT_ENROLLEDIN_LECTURE`
--

LOCK TABLES `STUDENT_ENROLLEDIN_LECTURE` WRITE;
/*!40000 ALTER TABLE `STUDENT_ENROLLEDIN_LECTURE` DISABLE KEYS */;
INSERT INTO `STUDENT_ENROLLEDIN_LECTURE` VALUES ('30','CPSC 471','2','00000001'),('30','CPSC 481','1','00000001');
/*!40000 ALTER TABLE `STUDENT_ENROLLEDIN_LECTURE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `STUDENT_ENROLLEDIN_TUTORIAL`
--

DROP TABLE IF EXISTS `STUDENT_ENROLLEDIN_TUTORIAL`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `STUDENT_ENROLLEDIN_TUTORIAL` (
  `s_ucid` varchar(10) NOT NULL,
  `courseno` varchar(8) NOT NULL,
  `tutorialno` varchar(3) NOT NULL,
  `a_ucid` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`s_ucid`,`courseno`,`tutorialno`),
  KEY `courseno_st_idx` (`courseno`),
  KEY `tutorialno_st_idx` (`tutorialno`),
  KEY `a_ucid_st_idx` (`a_ucid`),
  CONSTRAINT `a_ucid_st` FOREIGN KEY (`a_ucid`) REFERENCES `ADMIN` (`a_ucid`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `courseno_st` FOREIGN KEY (`courseno`) REFERENCES `STUDENT_ENROLLEDIN_COURSE` (`courseno`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `s_ucid_st` FOREIGN KEY (`s_ucid`) REFERENCES `STUDENT_ENROLLEDIN_COURSE` (`s_ucid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `tutorialno_st` FOREIGN KEY (`tutorialno`) REFERENCES `TUTORIAL` (`tutorialno`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `STUDENT_ENROLLEDIN_TUTORIAL`
--

LOCK TABLES `STUDENT_ENROLLEDIN_TUTORIAL` WRITE;
/*!40000 ALTER TABLE `STUDENT_ENROLLEDIN_TUTORIAL` DISABLE KEYS */;
INSERT INTO `STUDENT_ENROLLEDIN_TUTORIAL` VALUES ('30','CPSC 471','1','00000001'),('30','CPSC 481','4','00000001');
/*!40000 ALTER TABLE `STUDENT_ENROLLEDIN_TUTORIAL` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `STUDENT_MEMBEROF_CLUB`
--

DROP TABLE IF EXISTS `STUDENT_MEMBEROF_CLUB`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `STUDENT_MEMBEROF_CLUB` (
  `s_ucid` varchar(10) NOT NULL,
  `clubname` varchar(45) NOT NULL,
  `datejoined` date NOT NULL,
  PRIMARY KEY (`s_ucid`,`clubname`),
  KEY `clubname_sc_idx` (`clubname`),
  CONSTRAINT `clubname_sc` FOREIGN KEY (`clubname`) REFERENCES `CLUB` (`clubname`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `s_udic_sc` FOREIGN KEY (`s_ucid`) REFERENCES `STUDENT` (`s_ucid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `STUDENT_MEMBEROF_CLUB`
--

LOCK TABLES `STUDENT_MEMBEROF_CLUB` WRITE;
/*!40000 ALTER TABLE `STUDENT_MEMBEROF_CLUB` DISABLE KEYS */;
INSERT INTO `STUDENT_MEMBEROF_CLUB` VALUES ('30','WICS','2023-10-21');
/*!40000 ALTER TABLE `STUDENT_MEMBEROF_CLUB` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `STUDENT_PARTICIPATESIN_RESEARCH`
--

DROP TABLE IF EXISTS `STUDENT_PARTICIPATESIN_RESEARCH`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `STUDENT_PARTICIPATESIN_RESEARCH` (
  `s_ucid` varchar(10) NOT NULL,
  `researchid` varchar(10) NOT NULL,
  `datejoined` date DEFAULT NULL,
  PRIMARY KEY (`s_ucid`,`researchid`),
  KEY `researchid_sr_idx` (`researchid`),
  CONSTRAINT `researchid_sr` FOREIGN KEY (`researchid`) REFERENCES `RESEARCH` (`researchid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `s_ucid_sr` FOREIGN KEY (`s_ucid`) REFERENCES `STUDENT` (`s_ucid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `STUDENT_PARTICIPATESIN_RESEARCH`
--

LOCK TABLES `STUDENT_PARTICIPATESIN_RESEARCH` WRITE;
/*!40000 ALTER TABLE `STUDENT_PARTICIPATESIN_RESEARCH` DISABLE KEYS */;
INSERT INTO `STUDENT_PARTICIPATESIN_RESEARCH` VALUES ('30','5678','2023-12-10');
/*!40000 ALTER TABLE `STUDENT_PARTICIPATESIN_RESEARCH` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `STUDENT_TAKES_EXAM`
--

DROP TABLE IF EXISTS `STUDENT_TAKES_EXAM`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `STUDENT_TAKES_EXAM` (
  `s_ucid` varchar(10) NOT NULL,
  `courseno` varchar(8) NOT NULL,
  `examno` int NOT NULL,
  `grade` float DEFAULT NULL,
  `a_ucid` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`s_ucid`,`courseno`,`examno`),
  KEY `courseno_se_idx` (`courseno`),
  KEY `a_ucid_se_idx` (`a_ucid`),
  KEY `examno_se` (`examno`),
  CONSTRAINT `a_ucid_se` FOREIGN KEY (`a_ucid`) REFERENCES `ADMIN` (`a_ucid`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `courseno_se` FOREIGN KEY (`courseno`) REFERENCES `EXAM` (`courseno`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `examno_se` FOREIGN KEY (`examno`) REFERENCES `EXAM` (`examno`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `s_ucid_se` FOREIGN KEY (`s_ucid`) REFERENCES `STUDENT` (`s_ucid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `STUDENT_TAKES_EXAM`
--

LOCK TABLES `STUDENT_TAKES_EXAM` WRITE;
/*!40000 ALTER TABLE `STUDENT_TAKES_EXAM` DISABLE KEYS */;
INSERT INTO `STUDENT_TAKES_EXAM` VALUES ('30','CPSC 471',2,NULL,'00000001'),('30','CPSC 481',3,NULL,'00000001');
/*!40000 ALTER TABLE `STUDENT_TAKES_EXAM` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TA`
--

DROP TABLE IF EXISTS `TA`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TA` (
  `t_ucid` varchar(10) NOT NULL,
  `a_ucid` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`t_ucid`),
  KEY `a_ucid_t_idx` (`a_ucid`),
  CONSTRAINT `a_ucid_t` FOREIGN KEY (`a_ucid`) REFERENCES `ADMIN` (`a_ucid`),
  CONSTRAINT `t_ucid` FOREIGN KEY (`t_ucid`) REFERENCES `FACULTY` (`f_ucid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TA`
--

LOCK TABLES `TA` WRITE;
/*!40000 ALTER TABLE `TA` DISABLE KEYS */;
INSERT INTO `TA` VALUES ('3','00000001'),('4','00000001');
/*!40000 ALTER TABLE `TA` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TUTORIAL`
--

DROP TABLE IF EXISTS `TUTORIAL`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TUTORIAL` (
  `courseno` varchar(8) NOT NULL,
  `tutorialno` varchar(3) NOT NULL,
  `location` varchar(10) NOT NULL,
  `time` varchar(20) DEFAULT NULL,
  `t_ucid` varchar(10) DEFAULT NULL,
  `a_ucid` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`courseno`,`tutorialno`),
  UNIQUE KEY `tutorialno_UNIQUE` (`tutorialno`),
  KEY `t_ucid_t_idx` (`t_ucid`),
  KEY `a_ucid_tu_idx` (`a_ucid`),
  CONSTRAINT `a_ucid_tu` FOREIGN KEY (`a_ucid`) REFERENCES `ADMIN` (`a_ucid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `courseno_t` FOREIGN KEY (`courseno`) REFERENCES `COURSE` (`courseno`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `t_ucid_t` FOREIGN KEY (`t_ucid`) REFERENCES `TA` (`t_ucid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TUTORIAL`
--

LOCK TABLES `TUTORIAL` WRITE;
/*!40000 ALTER TABLE `TUTORIAL` DISABLE KEYS */;
INSERT INTO `TUTORIAL` VALUES ('CPSC 471','1','ICT 21','MW 14:00','3','00000001'),('CPSC 481','4','MS 112','WF 12:00','4','00000001');
/*!40000 ALTER TABLE `TUTORIAL` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-11 17:02:42
