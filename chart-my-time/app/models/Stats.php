<?php

class Stats{
    public function read()
    {
        $pdo = connexion();
        $sqlGenerator = new SqlGenerator($pdo);

        $stats = $sqlGenerator->select('Day', '*', 'user_id = ' . $_SESSION['user_id']);
        return $stats;
    }
}