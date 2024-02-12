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