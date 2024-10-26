<?php

class StatsController extends ControllerBase
{
    public function read(){
        $stats = new Stats();
        $stats = $stats->read();
        header('X-Json-Data: ' . trim(json_encode($stats)));
    }
}