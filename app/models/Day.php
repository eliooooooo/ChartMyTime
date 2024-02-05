<?php

class Day{
    // liste des attributs
    public $id;
    public $DayOfWeek;
    public $DayNumber;
    public $Month;
    public $Year;
    public $Time;
    public $Workspace;


    /**
     * Permet de récupérer les attributs de l'objet
     *
     * @return array
     */
    public function getAttributes()
    {
        return get_object_vars($this);
    }

    /**
     * Permet de lire un ou plusieurs jours
     *
     * @param $id
     * @return array
     */
    static function read($id = null)
    {
        $pdo = connexion();
        $SqlGenerator = new SqlGenerator($pdo);

        if ($id === null) {
            // Requête pour récupérer tous les jours
            $days = $SqlGenerator->select('day');

            // Retourner les jours
            return $days;
        } else {
            // Requête pour récupérer le jour spécifique
            $day = $SqlGenerator->select('day', '*', 'id = ' . $id);

            // Vérifier si le jours existe
            if (count($day) > 0) {
                return $day;
            } else {
                return "Ce jour n'existe pas";
            }
        }
    }

    /**
     * Permet de créer un jour
     *
     * @return void
     */
    function create()
    {
        $pdo = connexion();
        $SqlGenerator = new SqlGenerator($pdo);

        // Construction du tableau de données
        $data = [];
        foreach ($this->getAttributes() as $key => $value) {
            if (!empty($value)) {
                $data[$key] = $value;
            }
        }

        // Appel de la méthode insert de SqlGenerator
        $SqlGenerator->insert('day', $data);

        // Récupération de l'id
        $this->id = $pdo->lastInsertId();
    }

    /**
     * Permet de mettre à jour un jour
     *
     * @param $attributes
     * @return void
     */
    function setAttributes($attributes)
    {
        foreach ($attributes as $key => $value) {
            if (property_exists($this, $key)) {
                $this->$key = $value;
                if (empty($this->$key)) {
                    $this->$key = NULL;
                }
            }
        }
    }

    /**
     * Permet de supprimer un jour
     *
     * @param $id
     * @return void
     */
    static function delete($id)
    {
        $pdo = connexion();
        $SqlGenerator = new SqlGenerator($pdo);

        // Appel de la méthode delete de SqlGenerator
        $SqlGenerator->delete('day', 'id = ' . $id);
    }
}