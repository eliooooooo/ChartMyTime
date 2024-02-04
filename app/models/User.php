<?php

class User {
    private $id;
    private $username;
    private $email;
    private $password;

    public function __construct($id = null, $username = null, $email = null, $password = null) {
        $this->id = $id;
        $this->username = $username;
        $this->email = $email;
        $this->password = $password;
    }

    /**
     * Permet de lire les informations de l'utilisateur connecté
     */
    public function read() {
        $pdo = connexion();
        $sqlGenerator = new SqlGenerator($pdo);

        $user = $sqlGenerator->select('User', 'id, username, email, date', 'id = ' . $_SESSION['user_id']);
        return $user;
    }

    /**
     * Permet de créer un nouvel utilisateur
     */
    public function create() {
        $pdo = connexion();
        $sqlGenerator = new SqlGenerator($pdo);

        $sqlGenerator->insert('User', [
            'username' => $this->username,
            'email' => $this->email,
            'password' => password_hash($this->password, PASSWORD_DEFAULT),
            'date' => date('Y-m-d')
        ]);

        return $pdo->lastInsertId(); // Retourne l'ID de l'utilisateur nouvellement créé
    }

    /**
     * Permet de vérifier si un utilisateur existe déjà
     */
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

    /**
     * Permet de récupérer un utilisateur par son email
     */
    public function getByEmail($email){
        $pdo = connexion();
        $sqlGenerator = new SqlGenerator($pdo);

        $user = $sqlGenerator->select('User', '*', 'email = ' . $pdo->quote($email));

        if($user){
            return $user;
        }   
    }

    /**
     * Permet de récupérer un utilisateur par son ID
     */
    public function getById($id){
        $pdo = connexion();
        $sqlGenerator = new SqlGenerator($pdo);

        $user = $sqlGenerator->select('User', '*', 'id = ' . $id);

        if($user){
            return $user;
        }
    }

    /**
     * Permet de mettre à jour le mot de passe de l'utilisateur
     */
    public function updatePassword(){
        $pdo = connexion();
        $sqlGenerator = new SqlGenerator($pdo);

        $sqlGenerator->update('User',
        ['password' => password_hash($this->password, PASSWORD_DEFAULT)],
        "id = ". $_SESSION['user_id']);
    }
}