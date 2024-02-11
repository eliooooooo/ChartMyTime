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

    public function getWorkspaces($id_user) {
        $pdo = connexion();
        $SqlGenerator = new SqlGenerator($pdo);

        $workspaces = $SqlGenerator->select('Workspace', '*', 'user = ' . $id_user);

        return $workspaces;
    }

    public function getUserColor($id_user) {
        $pdo = connexion();
        $SqlGenerator = new SqlGenerator($pdo);

        $user = $SqlGenerator->select('User', 'color', 'id = ' . $id_user);

        return $user[0]['color'];
    }

    public function render($view, $params = []) {
        if (isset($_SESSION['is_connected'])){
            $params['is_connected'] = $_SESSION['is_connected'];
        }

        if (isset($_SESSION['user_id'])){
            $params['workspaces'] = $this->getWorkspaces($_SESSION['user_id']);
            $params['user_color'] = $this->getUserColor($_SESSION['user_id']);
        }
        echo $this->twig->render($view, $params);
    }
}