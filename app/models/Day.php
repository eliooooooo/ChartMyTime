<?php

class Day{
    // liste des attributs
    public $id;
    public $DayOfWeek;
    public $DayNumber;
    public $Date;
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

        $days = $SqlGenerator->select('Day', '*', 'workspace = ' . $id);
        echo json_encode($days);

        return json_encode($days);
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

        $SqlGenerator->delete('Day', 'id = ' . $id);
    }
}