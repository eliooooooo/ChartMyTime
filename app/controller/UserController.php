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
            if ($_POST['password'] != $_POST['confirm-password']) {
                echo "<p class='notification'>The passwords do not match</p>";
                $this->render('/page/login.html.twig');
            } else {
                // Récupération des données du formulaire
                $username = $_POST['username'];
                $email = $_POST['email'];
                $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

                // Vérification de l'existence de l'utilisateur
                $userExist = new User;
                if ($userExist->findByEmail($email)) {
                    echo "<p class='notification'>An account is already associated with this email address, try to login.</p>";
                    $this->render('/page/login.html.twig');
                } else {
                    $user = new User(null, $username, $email, $password);
                    
                    try {
                        $user->create();
                        echo "<p class='notification success'>Your account has been created</p>";
                        $this->render('/page/user.html.twig');
                    } catch (PDOException $e) {
                        echo "<p class='notification'>An error occurred while creating your account: " . $e->getMessage() . "</p>";
                        $this->render('/page/login.html.twig');
                    }
                }
            }
        } else {
            $this->render('/page/login.html.twig');
        }
    }
}