<?php

function connexion()
{
    $pdo = new PDO('mysql:host=database;dbname=elioooftime;charset=utf8', 'lamp', 'root');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);

    if ($pdo) {
        return $pdo;
    } else {
        echo '<p>Erreur de connexion</p>';
        exit;
    }
}