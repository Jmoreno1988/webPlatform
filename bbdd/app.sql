-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         5.5.27 - MySQL Community Server (GPL)
-- SO del servidor:              Win32
-- HeidiSQL Versión:             9.1.0.4910
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Volcando estructura de base de datos para app
CREATE DATABASE IF NOT EXISTS `app` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `app`;


-- Volcando estructura para tabla app.games
CREATE TABLE IF NOT EXISTS `games` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idCreator` int(11) NOT NULL,
  `idFollow` int(11) NOT NULL,
  `nameCreator` varchar(50) NOT NULL,
  `nameFollow` varchar(50) NOT NULL,
  `type` varchar(50) NOT NULL,
  `turn` varchar(50) NOT NULL DEFAULT '1',
  `board` varchar(100) NOT NULL DEFAULT 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  `updatedAt` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla app.games: ~3 rows (aproximadamente)
/*!40000 ALTER TABLE `games` DISABLE KEYS */;
INSERT INTO `games` (`id`, `idCreator`, `idFollow`, `nameCreator`, `nameFollow`, `type`, `turn`, `board`, `updatedAt`, `createdAt`) VALUES
	(1, 10, 11, 'jose', 'bot', 'standard', '1', 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(3, 10, 12, 'jose', 'bot2', 'standard', '1', 'r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(4, 10, 14, 'jose', 'sara', 'standart', '1', 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR', '0000-00-00 00:00:00', '0000-00-00 00:00:00');
/*!40000 ALTER TABLE `games` ENABLE KEYS */;


-- Volcando estructura para tabla app.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `reputation` double DEFAULT '3',
  `wins` int(11) DEFAULT '0',
  `losses` int(11) DEFAULT '0',
  `stalemates` int(11) DEFAULT '0',
  `color` varchar(10) DEFAULT NULL,
  `updatedAt` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `userName` (`userName`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla app.users: ~6 rows (aproximadamente)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `userName`, `password`, `email`, `reputation`, `wins`, `losses`, `stalemates`, `color`, `updatedAt`, `createdAt`) VALUES
	(10, 'jose', 'jose', 'jose@gmail.com', 3, 0, 0, 0, NULL, '2016-11-05 21:34:13', '2016-11-05 21:34:13'),
	(11, 'bot', 'bot', 'bot@noexisto.com', 3, 0, 0, 0, NULL, '2016-11-05 21:36:11', '2016-11-05 21:36:11'),
	(12, 'bot2', 'bot2', 'bot2', 3, 0, 0, 0, NULL, '2016-11-05 21:58:38', '2016-11-05 21:58:38'),
	(13, '', '', '', 3, 0, 0, 0, NULL, '2016-11-05 22:09:27', '2016-11-05 22:09:27'),
	(14, 'sara', 'sara', 'sara@gmail.com', 3, 0, 0, 0, NULL, '2016-11-06 12:35:42', '2016-11-06 12:35:42'),
	(15, 'denis', 'denis', 'denis@gmail.com', 3, 0, 0, 0, NULL, '2016-11-07 18:11:42', '2016-11-07 18:11:42');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
