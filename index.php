<?php 

// Connexion à la base de données
require_once __DIR__ . '/utils/connexion.php';

// Initialisation de Twig
require_once __DIR__ . '/utils/twig.php';


echo $twig->render('index.html.twig',  [
    'title' => 'Home',
    'content' => 'Hello World!'
]);