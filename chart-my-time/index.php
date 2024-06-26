<?php 
session_set_cookie_params(0);
session_start();

// Appel des variables d'environnement
require_once __DIR__ . '/vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createUnsafeImmutable(__DIR__);
$dotenv->load();
$displayErrors = intval(getenv('DISPLAY_ERRORS'));
$devenv = getenv('ENV');

// Affichage des erreurs
ini_set('display_errors', $displayErrors);
ini_set('display_startup_errors', $displayErrors);
error_reporting(E_ALL);

// Connexion à la base de données
require_once __DIR__ . '/utils/connexion.php';
$pdo = connexion();

// Si l'utilisateur est connecté
if (isset($_SESSION['user'])){
    $_SESSION['is_connected'] = true;
} else {
    $_SESSION['is_connected'] = false;
}

// Affichager des notifications
if (isset($_SESSION['notification'])) {
    echo $_SESSION['notification'];
    unset($_SESSION['notification']);
}

// Appel des différents modèles
$rte = __DIR__ . '/app/models/*.php';
foreach (glob($rte) as $filename) {
    include_once $filename;
    // var_dump($filename);
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
$id = NULL;
$subdomain = NULL;

// Si il y a une partie après le ?
if (isset($request_uri[1])) {
    // Découper les paramètres
    $route = explode('&', $request_uri[1]);
    // var_dump($route);
    // Pour chaque paramètre, on récupère la route et on la découpe en paramètres (page, action, id) avec chacun leur valeur
    foreach ($route as $key) {
        $tmp_route = explode('=', $key);
        if ($tmp_route[0] == 'action') {
            $action = $tmp_route[1];
            // var_dump($action);
        } elseif ($tmp_route[0] == 'id') {
            $id = $tmp_route[1];
            // var_dump($id);
        }
    }
}
$request_uri = ltrim($request_uri[0], '/');
// var_dump($request_uri);

$uri_parts = preg_split('/[\/.]/', $request_uri);

// Si l'URI contient un sous-domaine
if (count($uri_parts) > 1) {
    $subdomain = $uri_parts[0];
    $request_uri = $uri_parts[1];
} else {
    $request_uri = $uri_parts[0];
}

// test du controleur
// $request_uri = "user";

include_once __DIR__ . '/app/controller/ControllerBase.php';
include_once __DIR__ . '/app/controller/ErrorController.php';

// Si l'URI est vide (c'est-à-dire que nous sommes à la racine), afficher la page d'accueil
if (empty($request_uri) || $request_uri == '/') {
    $controller = new ControllerBase();
    echo $controller->render('page/frontpage.html.twig', []);
} else if ($request_uri == "terms") {
    $controller = new ControllerBase();
    echo $controller->render('page/terms.html.twig', ['page' => 'terms']);
} else if ($request_uri == "legalInfos") {
    $controller = new ControllerBase();
    echo $controller->render('page/legal_notices.html.twig', ['page' => 'terms']);
} else if ($request_uri == "privacy") {
    $controller = new ControllerBase();
    echo $controller->render('page/privacy.html.twig', ['page' => 'terms']);
} else if ($request_uri == "stats") {
    $controller = new ControllerBase();
    echo $controller->render('page/stats.html.twig', []);
} else {
    $className = ucfirst($request_uri);
    $controllerName = $className . 'Controller';
    $controllerPath = __DIR__ . '/app/controller/' . $controllerName . '.php';

    if (file_exists($controllerPath)) {
        require $controllerPath;
        $controller = new $controllerName();

        if (method_exists($controller, $action)) {
            try {
                $controller->$action($id);
            } catch (Exception $e) {
                // Décommenter pour afficher les erreurs
                echo $e->getMessage();
                var_dump($e->getTrace());
                // $errorController = new ErrorController();
                // $errorController->notFound();
            } catch (Error $e) {
                // Décommenter pour afficher les erreurs
                echo $e->getMessage();
                var_dump($e->getTrace());
                // $errorController = new ErrorController();
                // $errorController->notFound();
            }
        } else {
            $errorController = new ErrorController();
            $errorController->notFound();
        }
    } else {
        $errorController = new ErrorController();
        $errorController->notFound();
    }
}