<?php

Class UserController extends ControllerBase {

    /**
     * Permet de lire les informations de l'utilisateur connecté
     */
    function read(){
        if (!isset($_SESSION['is_connected']) || $_SESSION['is_connected'] == false) {
            $this->render('/page/login.html.twig');
        } else {
            $user = new User;
            $data = ["user" => $user->read()];
            $this->render('/page/user.html.twig', $data);
        }
    }

    /**
     * Permet de mettre à jour les informations de l'utilisateur connecté
     */
    function update(){
        if (!isset($_SESSION['is_connected']) || $_SESSION['is_connected'] == false) {
            $this->render('/page/login.html.twig');
        } else {
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                $currentPassword = $_POST['password'];
                $newPassword = $_POST['newPassword'];

                $user = new User;
                $user = $user->getById($_SESSION['user_id']);
                if (password_verify($currentPassword, $user[0]['password'])) {
                    if($newPassword != $_POST['confirmPassword']){
                        echo "<p class='notification'>The new passwords do not match</p>";
                        $this->render('/page/user.html.twig');
                    } elseif ($newPassword === $currentPassword) {
                        echo "<p class='notification'>The new password must be different from the current password</p>";
                        $this->render('/page/user.html.twig');
                    } else {
                        $user = new User;
                        $user->updatePassword($newPassword);
                        $params = ["user" => $user->read()];
                        echo "<p class='notification success'>Your password has been updated</p>";
                        $this->render('/page/user.html.twig', $params);
                    }
                } else {
                    $params = ["user" => $user->read()];
                    echo "<p class='notification'>The current password is incorrect</p>";
                    $this->render('/page/user.html.twig', $params);
                }
            }
        };
    }

    function updateColor(){
        if (!isset($_SESSION['is_connected']) || $_SESSION['is_connected'] == false) {
            $this->render('/page/login.html.twig');
        } else {
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                $color = $_POST['color'];

                $user = new User;
                $user->updateColor($color);
                $params = ["user" => $user->read()];
                echo "<p class='notification success'>Your color has been updated</p>";
                $this->render('/page/user.html.twig', $params);
            }
        }
    }

    function delete(){
        if (!isset($_SESSION['is_connected']) || $_SESSION['is_connected'] == false) {
            $this->render('/page/login.html.twig');
        } else {
            $user = new User;
            $user->delete($_SESSION['user']);
            unset($_SESSION['user']);
            unset($_SESSION['is_connected']);
            session_destroy();
    
            $is_connected = false;
            $this->render('/page/logout.html.twig', ['is_connected' => $is_connected]);
        }
        $this->render('/page/user.html.twig');
    }

    /**
     * Permet de se connecter
     */
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
                        $_SESSION['user_id'] = $currentUser[0]['id'];
                        $_SESSION['is_connected'] = true;
                        $data = ["user" => $userExist->read()];
                        echo "<p class='notification success'> Login successful! Welcome back. </p>";
                        $this->render('/page/user.html.twig', ['is_connected' => $_SESSION['is_connected'], 'user' => $data['user']]);
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

    /**
     * Permet de se déconnecter
     */
    function logout(){
        if (!isset($_SESSION['is_connected']) || $_SESSION['is_connected'] == false) {
            $this->render('/page/login.html.twig');
        } else {
            unset($_SESSION['user']);
            unset($_SESSION['is_connected']);
            session_destroy();
    
            $is_connected = false;
            $this->render('/page/logout.html.twig', ['is_connected' => $is_connected]);
        }
    }

    /**
     * Permet de s'inscrire
     */
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
                        // Vérification de l'existence de l'utilisateur
                        $userExist = new User;
                        if ($userExist->findByEmail($email)) {
                            echo "<p class='notification'>An account is already associated with this email address, try to login.</p>";
                            $this->render('/page/login.html.twig');
                        } else {
                            $user = new User(null, $username, $email, $password);
                            
                            try {
                                $user_id = $user->create();
                                echo "<p class='notification success'>Your account has been created</p>";
                                $_SESSION['user'] = $username;
                                $_SESSION['user_id'] = $user_id;
                                $_SESSION['is_connected'] = true;
                                $data = ["user" => $user->read()];
                                $this->render('/page/user.html.twig', ['is_connected' => $_SESSION['is_connected'], 'user' => $data['user']]);
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