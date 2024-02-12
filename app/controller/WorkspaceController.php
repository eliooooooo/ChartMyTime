<?php 

Class WorkspaceController extends ControllerBase {

    function read($id){
        if($_SESSION == false){
            echo "<p class='notification'>You must be logged in to access your own workspaces.</p>";
        } else {
            $workspace = new Workspace();
            $workspace = $workspace->read($id);

            if (count($workspace) > 0) {
                echo $this->render('components/calendar.html.twig', ['workspace' => $workspace]);
            } else {
                echo "<p class='notification' >This workspace does not exist</p>";
                echo $this->render('errors/404.html.twig', []);
            }
        }
    }

    function create(){
        if($_SESSION == false){
            echo "<p class='notification'>You must be logged in to access your own workspaces.</p>";
        } else {
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                $workspace = new Workspace();
                $workspace->name = $_POST['name'];
                $workspace->user = $_SESSION['user_id'];
                $workspace->create();
                echo "<p class='notification success'>The workspace has been created</p>";
                echo $this->render('components/calendar.html.twig');
            }
        }
    }

    function update(){
        $this->render('/components/calendar.html.twig');
    }

    function delete(){
        $this->render('/components/calendar.html.twig');
    }
}