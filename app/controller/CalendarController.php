<?php 

class CalendarController extends ControllerBase {

    function __construct() {
        parent::__construct();
    }

    public function addTime() {
        
        if (isset($_POST['time'], $_POST['date'], $_POST['id'])) {
            $time = $_POST['time'];
            $date = $_POST['date'];
            $id = $_POST['id'];
            
            $day = new Day();
            $currentDay = $day->select('day', '*', 'date = ' . $date);

            if ($currentDay != null) {
                $time = $currentDay->time + $time;
                $currentDay->update('day', 'time = ' . $time, 'id = ' . $id);
            } else {
                $day->setAttributes($_POST);
                $newDayId = $day->create();
            }

            $this->render('components/calendar.html.twig', []);
        } else {
            echo '<span class="notification"> Veuillez renseigner les champs du formulaire </span>';
        }
    }
}