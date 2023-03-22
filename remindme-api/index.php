<?php
    if(isset($_POST['name']) && isset($_POST['date']) && isset($_POST['delete'])) {
        $name = $_POST['name'];
        $date = $_POST['date'];
        $delete = $_POST['delete'];

        if($delete == "false") {
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
        else {
            $name = $_POST['name'];
            $date = $_POST['date'];
    
            $connection = new mysqli('localhost','root','p@ssw0rd013459','remindme_prd');
    
            $sql = "CALL sp_delete_tb_cad_reminder ('$name', '$date')";
            $connection->set_charset('utf8');
    
            $result = $connection->query($sql);
        }
    }
?>