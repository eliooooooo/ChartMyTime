<?php 

class Workspace {
    public $id;
    public $name;
    public $user;

    public function getAttributes()
    {
        return get_object_vars($this);
    }

    public function read($id)
    {
        $pdo = connexion();
        $SqlGenerator = new SqlGenerator($pdo);

        $workspace = $SqlGenerator->select('Workspace', '*', 'id = ' . $id);

        return $workspace;
    }

    public function readDay($id)
    {
        $pdo = connexion();
        $SqlGenerator = new SqlGenerator($pdo);

        $days = $SqlGenerator->select('Day', 'id, date, time, editDate, comments', 'workspace = ' . $id);
        header('X-Json-Data: ' . trim(json_encode($days)));

        return trim(json_encode($days));
    }

    function createDefault($user_id){
        if($_SESSION == false){
            echo "<p class='notification'>You must be logged in to access your own workspaces.</p>";
            $this->render('page/login.html.twig');
        } else {
            $workspace = new Workspace();
            $workspace->name = "Workspace 1";
            $workspace->user = $user_id;
            $workspaceNumber = $workspace->getWorkspaceByUser($user_id);
            if($workspaceNumber >= 8) {
                $_SESSION['notification'] = "<p class='notification'>You have reached the maximum number of workspaces for a user (8).</p>";
                header('Location: ' . $_SERVER['HTTP_REFERER']);
            } else {
                $id = $workspace->create();
                echo "<p class='notification success'>The workspace has been created</p>";
                $data = $this->read($id);
            }
        }
    }

    public function create(){
        $pdo = connexion();
        $SqlGenerator = new SqlGenerator($pdo);

        $SqlGenerator->insert('Workspace', [
            'user' => $this->user,
            'name' => $this->name
        ]);

        return $pdo->lastInsertId();
    }

    public function delete($id){
        $pdo = connexion();
        $SqlGenerator = new SqlGenerator($pdo);

        $SqlGenerator->delete('Workspace', 'id = '.$id);
    }

    public function getWorkspaceByUser($id){
        $pdo = connexion();
        $SqlGenerator = new SqlGenerator($pdo);
        
        $results = $SqlGenerator->select('Workspace', '*', 'user ='.$id);
        return count($results);
    }
}