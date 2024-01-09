<?php 

// Initialisation de Twig
require_once __DIR__ . '/vendor/autoload.php';
function init_twig()
{
    // Indique le répertoire ou sont placés les modèles (templates)
    $loader = new \Twig\Loader\FilesystemLoader('./app/views');

    // Crée un nouveau moteur Twig
    $twig = new \Twig\Environment($loader, ['debug' => true]);
    $twig->addExtension(new \Twig\Extension\DebugExtension());

    // Renvoie le moteur
    return $twig;
}
$twig = init_twig();

echo $twig->render('index.html.twig',  [
    'title' => 'Home',
    'content' => 'Hello World!'
]);