<?php 

class Workspace {
    public $id;
    public $name;
    public $user;
    public $target;
    public $date;
    public $color;

    public function getAttributes()
    {
        return get_object_vars($this);
    }

    static function read($id)
    {
        $pdo = connexion();
        $SqlGenerator = new SqlGenerator($pdo);

        $workspace = $SqlGenerator->select('workspace', '*', 'id = ' . $id);

        if (count($workspace) > 0) {
            return $workspace;
        } else {
            echo "This workspace does not exist";
            Locatio('index.php');
        }
    }
}