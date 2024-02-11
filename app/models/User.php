<?php

class User {
    private $id;
    public $color;
    private $username;
    private $email;
    private $password;

    public function __construct($id = null, $color = null, $username = null, $email = null, $password = null) {
        $this->id = $id;
        $this->color = $color;
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
            'color' => '#63CDE9',
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
    public function updatePassword($psw){
        $pdo = connexion();
        $sqlGenerator = new SqlGenerator($pdo);

        $sqlGenerator->update('User',
        ['password' => password_hash($psw, PASSWORD_DEFAULT)],
        "id = ". $_SESSION['user_id']);
    }

    /**
     * Permet de mettre à jour la couleur de l'utilisateur
     */
    public function updateColor($color){
        $pdo = connexion();
        $sqlGenerator = new SqlGenerator($pdo);

        $sqlGenerator->update('User',
        ['color' => $color],
        "id = ". $_SESSION['user_id']);
    }
}