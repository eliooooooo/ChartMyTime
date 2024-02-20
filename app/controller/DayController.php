<?php

Class DayController extends ControllerBase {

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

    function delete($id){
        if (!isset($_SESSION['is_connected']) || $_SESSION['is_connected'] == false) {
            $_SESSION['notification'] = "<p class='notification'>You must be logged in to access your own workspaces.</p>";
            $this->render('page/login.html.twig');
        } else {
            $day = new Day();
            $day->delete($id);
            $_SESSION['notification'] = "<p class='notification success'>The day has been deleted</p>";
            header('Location: ' . $_SERVER['HTTP_REFERER']);
        }
    }
}