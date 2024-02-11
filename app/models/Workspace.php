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

        $workspace = $SqlGenerator->select('Workspace', '*', 'id = ' . $id);

        return $workspace;
    }
}