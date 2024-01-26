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
        if (isset($_SESSION['is_connected']) && $_SESSION['is_connected'] == true) {
            $this->render('/page/user.html.twig', ['is_connected' => $_SESSION['is_connected']]);
        } else {
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                // Récupération des données du formulaire
                $email = $_POST['email'];
                $password = $_POST['password'];

                // Vérification de l'existence de l'utilisateur
                $userExist = new User;
                $user = $userExist->findByEmail($email);
                if ($user) {
                    $currentUser = $userExist->getByEmail($email);
                    if (password_verify($password, $currentUser[0]['password'])) {
                        $_SESSION['user'] = $currentUser[0]['username'];
                        $_SESSION['is_connected'] = true;
                        $this->render('/page/user.html.twig', ['is_connected' => $_SESSION['is_connected']]);
                    } else {
                        echo "<p class='notification'>The password is incorrect</p>";
                        $this->render('/page/login.html.twig');
                    }
                } else {
                    echo "<p class='notification'>No account is associated with this email address, try to register.</p>";
                    $this->render('/page/login.html.twig');
                }
            } else {
                $this->render('/page/login.html.twig');
            }
        }
    }

    function logout(){
        unset($_SESSION['user']);
        unset($_SESSION['is_connected']);
        session_destroy();

        $is_connected = false;
        $this->render('/page/logout.html.twig', ['is_connected' => $is_connected]);
    }

    function register(){
        if (isset($_SESSION['is_connected']) && $_SESSION['is_connected'] == true) {
            $this->render('/page/user.html.twig', ['is_connected' => $_SESSION['is_connected']]);
        } else {
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                if ($_POST['password'] != $_POST['confirm-password']) {
                    echo "<p class='notification'>The passwords do not match</p>";
                    $this->render('/page/login.html.twig');
                } else {
                    // Récupération des données du formulaire
                    $username = $_POST['username'];
                    $email = $_POST['email'];
                    $password = $_POST['password'];

                    // Vérification de la sécurité du mot de passe
                    if (strlen($password) < 8) {
                        echo "<p class='notification'>The password must be at least 8 characters long, must contain at least one uppercase letter, one lowercase letter and at least one number</p>";
                        $this->render('/page/login.html.twig', ['register' => true]);
                    } else if (!preg_match('/[A-Z]/', $password)) {
                        echo "<p class='notification'>The password must be at least 8 characters long, must contain at least one uppercase letter, one lowercase letter and at least one number</p>";
                        $this->render('/page/login.html.twig', ['register' => true]);
                    } else if (!preg_match('/[a-z]/', $password)) {
                        echo "<p class='notification'>The password must be at least 8 characters long, must contain at least one uppercase letter, one lowercase letter and at least one number</p>";
                        $this->render('/page/login.html.twig', ['register' => true]);
                    } else if (!preg_match('/[0-9]/', $password)) {
                        echo "<p class='notification'>The password must be at least 8 characters long, must contain at least one uppercase letter, one lowercase letter and at least one number</p>";
                        $this->render('/page/login.html.twig', ['register' => true]);
                    } else {
                        $password = password_hash($password, PASSWORD_DEFAULT);

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
                                $_SESSION['user'] = $username;
                                $_SESSION['is_connected'] = true;
                                $this->render('/page/user.html.twig', ['is_connected' => $_SESSION['is_connected']]);
                            } catch (PDOException $e) {
                                echo "<p class='notification'>An error occurred while creating your account: " . $e->getMessage() . "</p>";
                                $this->render('/page/login.html.twig');
                            }
                        }
                    }
                }
            } else {
                $this->render('/page/login.html.twig');
            }
        }
    }
}