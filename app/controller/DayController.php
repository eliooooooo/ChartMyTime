<?php

Class DayController extends ControllerBase {

    function create() {
        if($_SESSION == false){
            echo "<p class='notification'>You must be logged in to access your own workspaces.</p>";
            $this->render('page/login.html.twig');
        } else {
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                var_dump(intval($_POST['time']));
                if (isset($_POST['date']) && isset($_POST['workspace']) && isset($_POST['time']) && $_POST['time'] != "" && $_POST['time'] != NULL){
                    if (intval($_POST['time']) < 0 && intval($_POST['time'] > 24)) {
                        $_SESSION['notification'] = "<p class='notification'>Daily time must be between 0 and 24 hours.</p>";
                        header('Location: ' . $_SERVER['HTTP_REFERER']);
                    } else {
                        $day = new Day();
                        $day->Date = $_POST['date'];
                        $day->Workspace = $_POST['workspace'];
                        $day->Time = intval($_POST['time']);
                        $day->Comments = $_POST['comments'];
    
                        $day->create();
                        $_SESSION['notification'] = "<p class='notification success'>The day has been updated</p>";
                        header('Location: ' . $_SERVER['HTTP_REFERER']);
                    }
                } else {
                    $_SESSION['notification'] = "<p class='notification'>You must fill the form fields</p>";
                    header('Location: ' . $_SERVER['HTTP_REFERER']);
                }
            }
        }
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