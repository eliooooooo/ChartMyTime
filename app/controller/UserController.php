<?php

Class UserController extends ControllerBase {

    function read(){
        $this->render('/page/user.html.twig');
    }

    function update(){
        $this->render('/page/user.html.twig');
    }

    function delete(){
        $this->render('/page/user.html.twig');
    }

    function login(){
        $this->render('/page/login.html.twig');
    }

    function logout(){
        $this->render('/page/logout.html.twig');
    }

    function register(){
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            // Récupération des données du formulaire
            $email = $_POST['email'];
            $password = $_POST['password'];
            $username = $_POST['username'];

            // Création de l'utilisateur
            $user = new User(null, $email, $username, $password);

            // Sauvegarde de l'utilisateur dans la base de données
            $user->create();

            // Redirection vers la page de connexion
            $this->render('/page/user.html.twig');
        } else {
            $this->render('/page/login.html.twig');
        }
    }
}