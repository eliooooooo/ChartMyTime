<?php

class User {
    // Propriétés
    private $id;
    private $email;
    private $username;
    private $password;

    // Constructeur
    public function __construct($id, $email, $password, $username) {
        $this->id = $id;
        $this->email = $email;
        $this->username = $username;
        $this->password = $password;
    }

    public function create() {
        $pdo = connexion();
        $sqlGenerator = new SqlGenerator($pdo);

        $sql = $sqlGenerator->insert('User', [
            'email' => $this->email,
            'password' => $this->password,
            'username' => $this->username,
        ]);
        $this->id = $pdo->lastInsertId();
    }

    public static function getById(PDO $db, $id) {
    }

    public function update(PDO $db) {
    }

    public function delete(PDO $db) {

    }
}