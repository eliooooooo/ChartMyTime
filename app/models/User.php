<?php

class User {
    // Propriétés
    private $id;
    private $username;
    private $email;
    private $password;

    // Constructeur
    public function __construct($id = null, $username = null, $email = null, $password = null) {
        $this->id = $id;
        $this->username = $username;
        $this->email = $email;
        $this->password = $password;
    }

    public function create() {
        $pdo = connexion();
        $sqlGenerator = new SqlGenerator($pdo);

        $sql = $sqlGenerator->insert('User', [
            'username' => $this->username,
            'email' => $this->email,
            'password' => $this->password,
        ]);
        $this->id = $pdo->lastInsertId();
    }

    public function findByEmail($email){
        $pdo = connexion();
        $sqlGenerator = new SqlGenerator($pdo);

        $user = $sqlGenerator->select('User', '*', 'email = ' . $pdo->quote($email));

        if ($user) {
            return true;
        } else {
            return false;
        }
    }

    public function getByEmail($email){
        $pdo = connexion();
        $sqlGenerator = new SqlGenerator($pdo);

        $user = $sqlGenerator->select('User', '*', 'email = ' . $pdo->quote($email));

        if($user){
            return $user;
        }   
    }

    public static function getById(PDO $db, $id) {
    }

    public function update(PDO $db) {
    }

    public function delete(PDO $db) {
    }
}