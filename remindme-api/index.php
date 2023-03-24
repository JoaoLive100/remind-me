<?php
    if(isset($_POST['name']) && isset($_POST['date']) && isset($_POST['delete'])) {
        $name = $_POST['name'];
        $date = $_POST['date'];
        $delete = $_POST['delete'];

        $connection = new mysqli('localhost','root','p@ssw0rd013459','remindme_prd');
    
        $sql = "CALL sp_insert_tb_cad_reminder ('$name', '$date')";
        $connection->set_charset('utf8');

        $result = $connection->query($sql);
        
        $grouped_results = array();

        while ($row = $result->fetch_assoc()) {
            $date = $row['pDate'];
            $name = $row['pName'];

            if (!isset($grouped_results[$date])) {
                $grouped_results[$date] = array();
            }
            $grouped_results[$date][] = $name;
        }

        $json = json_encode($grouped_results);
        echo $json;
    }
    if(isset($_POST['tarefaB']) && isset($_POST['dataB']) && isset($_POST['deleteB'])) {
        $name = $_POST['tarefaB'];
        $date = $_POST['dataB'];
        $delete = $_POST['deleteB'];

        $connectionB = new mysqli('localhost','root','p@ssw0rd013459','remindme_prd');
        
        if ($date === '') {
            $sqlB = "CALL sp_delete_tb_cad_reminder ('$name', null)";
        }
        else {
            $sqlB = "CALL sp_delete_tb_cad_reminder ('$name', '$date')";
        }
        
        $connectionB->set_charset('utf8');

        $resultB = $connectionB->query($sqlB);

        $grouped_resultsB = array();

        while ($rowB = $resultB->fetch_assoc()) {
            $dateB = $rowB['pDate'];
            $nameB = $rowB['pName'];

            if (!isset($grouped_resultsB[$dateB])) {
                $grouped_resultsB[$dateB] = array();
            }
            $grouped_resultsB[$dateB][] = $nameB;
        }

        $jsonB = json_encode($grouped_resultsB);
        echo $jsonB;
    }
?>