<?php

// Initialisation de Twig
require_once './vendor/autoload.php';
function init_twig()
{
    // Indique le répertoire ou sont placés les modèles (templates)
    $loader = new \Twig\Loader\FilesystemLoader('./app/views');

    // Crée un nouveau moteur Twig
    $twig = new \Twig\Environment($loader, ['debug' => true, 'cache' => false]);
    $twig->addExtension(new \Twig\Extension\DebugExtension());

    // Renvoie le moteur
    return $twig;
}
$twig = init_twig();