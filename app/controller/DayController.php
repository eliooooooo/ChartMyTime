<?php

Class DayController extends ControllerBase {

    function create() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            if (isset($_POST['time']) && preg_match("/^([0-9]+)[hH]([0-9]*)$/i", $_POST['time'], $matches)) {
                $hours = intval($matches[1]);
                $minutes = isset($matches[2]) && $matches[2] !== "" ? floatval($matches[2]) : 0;
                $time = ($hours * 60 + $minutes) / 60.0;

                if ($time < 0 || $time > 24) {
                    $_SESSION['notification'] = "<p class='notification'>Daily time must be between 0 and 24 hours.</p>";
                    header('Location: ' . $_SERVER['HTTP_REFERER']);
                } else if ($minutes < 0 || $minutes > 60) {
                    $_SESSION['notification'] = "<p class='notification'>The minutes must be between 0 and 60.</p>";
                    header('Location: ' . $_SERVER['HTTP_REFERER']);
                } else {
                    $day = new Day();
                    $day->Date = $_POST['date'];
                    $day->Workspace = $_POST['workspace'];
                    $day->Time = $time;
                    $day->Comments = $_POST['comments'];

                    $day->create();
                    $_SESSION['notification'] = "<p class='notification success'>The day has been updated</p>";
                    header('Location: ' . $_SERVER['HTTP_REFERER']);
                }
            } else {
                $_SESSION['notification'] = "<p class='notification'>Invalid time format. Use the format 'h:m', e.g. '1h30' or '1h'.</p>";
                header('Location: ' . $_SERVER['HTTP_REFERER']);
            }
        }
    }

    function update($id) {
        if (!isset($_SESSION['is_connected']) || $_SESSION['is_connected'] == false) {
            $_SESSION['notification'] = "<p class='notification'>You must be logged in to access your own workspaces.</p>";
            $this->render('page/login.html.twig');
        } else {
            if($_SERVER['REQUEST_METHOD'] === 'POST') {
                if (isset($_POST['time']) && preg_match("/^([0-9]+)[hH]([0-9]*)$/i", $_POST['time'], $matches)) {
                    $hours = intval($matches[1]);
                    $minutes = isset($matches[2]) && $matches[2] !== "" ? floatval($matches[2]) : 0;
                    $time = ($hours * 60 + $minutes) / 60.0;
    
                    if ($time < 0 || $time > 24) {
                        $_SESSION['notification'] = "<p class='notification'>Daily time must be between 0 and 24 hours.</p>";
                        header('Location: ' . $_SERVER['HTTP_REFERER']);
                    } else if ($minutes < 0 || $minutes > 60) {
                        $_SESSION['notification'] = "<p class='notification'>The minutes must be between 0 and 60.</p>";
                        header('Location: ' . $_SERVER['HTTP_REFERER']);
                    } else {
                        $day = new Day();
                        $day->Date = $_POST['date'];
                        $day->Workspace = $_POST['workspace'];
                        $day->Time = $time;
                        $day->Comments = $_POST['comments'];
    
                        $day->update($id);
                        $_SESSION['notification'] = "<p class='notification success'>The day has been updated</p>";
                        header('Location: ' . $_SERVER['HTTP_REFERER']);
                    }
                } else {
                    $_SESSION['notification'] = "<p class='notification'>Invalid time format. Use the format 'h:m', e.g. '1h30' or '1h'.</p>";
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