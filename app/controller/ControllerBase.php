<?php 

Class ControllerBase {

    protected $twig;

    public function __construct() {
        // Connexion à la base de données
        require_once __DIR__ . '/../../utils/connexion.php';     

        // Initialisation de Twig
        require_once __DIR__ . '/../../utils/twig.php';
        
        $this->twig = init_twig();
    }

    public function render($view, $params = []) {
        if (isset($_SESSION['is_connected'])){
            $params['is_connected'] = $_SESSION['is_connected'];
        }
        echo $this->twig->render($view, $params);
    }
}