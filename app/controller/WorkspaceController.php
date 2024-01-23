<?php 

Class WorkspaceController extends ControllerBase {

    function read(){
        if($_SESSION == false){
            echo "<p class='notification'>You must be logged in to access your own workspaces.</p>";
        }
        $this->render('/components/calendar.html.twig');
    }

    function create(){
        $this->render('/components/calendar.html.twig');
    }

    function update(){
        $this->render('/components/calendar.html.twig');
    }

    function delete(){
        $this->render('/components/calendar.html.twig');
    }
}