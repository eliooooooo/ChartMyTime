<?php 
session_start();

// Connexion à la base de données
require_once __DIR__ . '/utils/connexion.php';
$pdo = connexion();

// Si l'utilisateur est connecté
if (isset($_SESSION['user'])){
    $is_connected = true;
} else {
    $is_connected = false;
}

// Appel des différents modèles
foreach (glob('app/models/*.php') as $filename) {
    include_once $filename;
}

// Initialisation de Twig
require_once __DIR__ . '/utils/twig.php';

// test de la connexion à la base de données
// $sqlGenerator = new SqlGenerator($pdo);
// $user = $sqlGenerator->select('User');
// var_dump($user);

// Premier controlleur (redirige vers les controlleurs concernés)
// Appel des différents contrôleurs
// Obtenir l'URI demandée
// Pour chaque URI, on récupère la route et on la découpe en paramètres (page, action, id) avec chacun leur valeur
// Découper l'URI en deux parties (avant et après le ?)
$request_uri = explode('?', $_SERVER['REQUEST_URI'], 2);
// var_dump($request_uri);

//Initialisation des variables
$action = 'read';

// Si il y a une partie après le ?
if (isset($request_uri[1])) {
    // Si il y a plusieurs paramètres
    if (explode('&', $request_uri[1])) {
        // Découper les paramètres
        $route = explode('&', $request_uri[1]);
        // var_dump($route);
        // Pour chaque paramètre, on récupère la route et on la découpe en paramètres (page, action, id) avec chacun leur valeur
        foreach ($route as $key) {
            $tmp_route = explode('=', $key);
            if ($tmp_route[0] == 'action') {
                $action = $tmp_route[1];
                // var_dump($action);
            }
        }
    }
}
$request_uri = ltrim($request_uri[0], '/');
// var_dump($request_uri);

// test du controleur
// $request_uri = "user";

include_once __DIR__ . '/app/controller/ControllerBase.php';
include_once __DIR__ . '/app/controller/ErrorController.php';

// Si l'URI est vide (c'est-à-dire que nous sommes à la racine), afficher la page d'accueil
if (empty($request_uri) || $request_uri == '/') {
    $controller = new ControllerBase();
    echo $controller->render('components/calendar.html.twig', []);
} else {
    $className = ucfirst($request_uri);
    $controllerName = $className . 'Controller';
    $controllerPath = './app/controller/' . $controllerName . '.php';
    // var_dump($controllerPath);

    if (file_exists($controllerPath)) {
        require $controllerPath;
        $controller = new $controllerName();

        try {
            $controller->$action();
        } catch (Exception $e) {
            // Décommenter pour afficher les erreurs
            echo $e->getMessage();
            var_dump($e->getTrace());
            $errorController = new ErrorController();
            $errorController->notFound();
        } catch (Error $e) {
            // Décommenter pour afficher les erreurs
            echo $e->getMessage();
            var_dump($e->getTrace());
            $errorController = new ErrorController();
            $errorController->notFound();
        }
    } else {
        $errorController = new ErrorController();
        $errorController->notFound();
    }
}