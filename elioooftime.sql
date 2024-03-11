-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : database
-- Généré le : mer. 21 fév. 2024 à 09:09
-- Version du serveur : 5.7.29
-- Version de PHP : 7.4.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `elioooftime`
--

-- --------------------------------------------------------

--
-- Structure de la table `Day`
--

CREATE TABLE `Day` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL,
  `workspace` int(11) NOT NULL,
  `time` float NOT NULL,
  `editDate` datetime NOT NULL,
  `comments` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `Day`
--

INSERT INTO `Day` (`id`, `date`, `workspace`, `time`, `editDate`, `comments`) VALUES
(4, '2024-02-14', 2, 5, '2024-02-16 07:08:54', NULL),
(5, '2024-02-02', 2, 2, '2024-02-16 07:08:54', NULL),
(6, '2024-02-08', 2, 5, '2024-02-21 08:35:03', ''),
(7, '2024-02-16', 2, 2, '2024-02-21 08:35:21', ''),
(8, '2024-02-10', 2, 2, '2024-02-21 08:37:57', ''),
(9, '2024-02-01', 2, 2, '2024-02-21 08:40:38', ''),
(10, '2024-02-03', 2, 1.66667, '2024-02-21 08:41:13', ''),
(11, '2024-02-04', 2, 1.75, '2024-02-21 08:41:26', ''),
(12, '2024-02-09', 2, 3.61667, '2024-02-21 08:41:33', ''),
(13, '2024-02-05', 2, 3, '2024-02-21 08:43:04', 'test accents &é\"\'(-è_çà'),
(14, '2024-02-20', 2, 2.5, '2024-02-21 08:43:23', ''),
(15, '2024-02-27', 2, 1.03333, '2024-02-21 08:43:34', ''),
(16, '2024-02-29', 2, 2.48333, '2024-02-21 08:43:49', ''),
(17, '2024-02-24', 2, 2.3, '2024-02-21 08:45:20', ''),
(18, '2024-02-22', 2, 2.3, '2024-02-21 08:45:25', ''),
(19, '2024-02-18', 2, 2.3, '2024-02-21 08:46:26', ''),
(24, '2024-02-21', 2, 0.5, '2024-02-21 09:08:52', '');

-- --------------------------------------------------------

--
-- Structure de la table `User`
--

CREATE TABLE `User` (
  `id` int(11) NOT NULL,
  `username` varchar(30) NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `date` date NOT NULL,
  `color` varchar(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `User`
--

INSERT INTO `User` (`id`, `username`, `email`, `password`, `date`, `color`) VALUES
(4, 'Eliott', 'eliott.burkle@gmail.com', '$2y$10$o4XO5ib35pSD5ssbL60VI.D6tXaT7Ajw.R7QgGf.mCsuNC0u.a2Bq', '2024-02-12', 'D988B3');

-- --------------------------------------------------------

--
-- Structure de la table `Workspace`
--

CREATE TABLE `Workspace` (
  `id` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `Workspace`
--

INSERT INTO `Workspace` (`id`, `user`, `name`) VALUES
(2, 4, 'Workspace 1');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `Day`
--
ALTER TABLE `Day`
  ADD PRIMARY KEY (`id`),
  ADD KEY `workspace` (`workspace`);

--
-- Index pour la table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `Workspace`
--
ALTER TABLE `Workspace`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user` (`user`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `Day`
--
ALTER TABLE `Day`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT pour la table `User`
--
ALTER TABLE `User`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `Workspace`
--
ALTER TABLE `Workspace`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `Day`
--
ALTER TABLE `Day`
  ADD CONSTRAINT `Day_ibfk_1` FOREIGN KEY (`workspace`) REFERENCES `Workspace` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `Workspace`
--
ALTER TABLE `Workspace`
  ADD CONSTRAINT `Workspace_ibfk_1` FOREIGN KEY (`user`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
