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
                $workspaceNumber = $workspace->getWorkspaceByUser($_SESSION['user_id']);
                if (strlen($workspace->name) > 50 || strlen($workspace->name) === 0){
                    echo "<p class='notification'>The workspace's name length must be between 0 and 50 character.</p>";
                    echo $this->render('components/calendar.html.twig');
                } elseif($workspaceNumber >= 8) {
                    echo "<p class='notification'>You have reached the maximum number of workspaces for a user (8).</p>";
                    echo $this->render('components/calendar.html.twig');
                } else {
                    $workspace->create();
                    echo "<p class='notification success'>The workspace has been created</p>";
                    echo $this->render('components/calendar.html.twig');
                }
            }
        }
    }

    function update(){
        $this->render('/components/calendar.html.twig');
    }

    function delete($id){
        if($_SESSION == false){
            echo "<p class='notification'>You must be logged in to access your own workspaces.</p>";
        } else {
            $workspace = new Workspace();
            $workspace->delete($id);
            echo "<p class='notification success'>The workspace has been deleted</p>";
            echo $this->render('page/frontpage.html.twig');
        }
    }
}