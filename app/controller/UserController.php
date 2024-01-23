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
        $this->render('/page/register.html.twig');
    }
}