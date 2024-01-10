<?php 
// Connexion à la base de données
require_once __DIR__ . '/utils/connexion.php';
$pdo = connexion();

// Initialisation de Twig
// require_once __DIR__ . '/utils/twig.php';

// Appel du contrôleur base
// require_once __DIR__ . '/app/controller/ControllerBase.php';

// test de la connexion à la base de données
// require_once __DIR__ . '/app/models/SqlGenerator.php';
$sqlGenerator = new SqlGenerator($pdo);
$user = $sqlGenerator->select('User');
var_dump($user);

// echo $twig->render('components/calendar.html.twig',  [
//     'title' => 'Home',
//     'content' => 'Hello World!'
// ]);