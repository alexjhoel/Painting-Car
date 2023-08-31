<?php
include("connect.php");
$data = array();

if(isset($_POST["ip1"])){
    
    $query = "UPDATE config SET value='".$_POST["ip1"]."' WHERE id='ip1';";
    
    mysqli_query($con,$query);

    $query = "UPDATE config SET value='".$_POST["ip2"]."' WHERE id='ip2'";

    mysqli_query($con,$query);
}else{
    $query = "SELECT * FROM config";
    $result = mysqli_query($con,$query);
    while ($row = mysqli_fetch_array($result)) {
        $data[$row["id"]] = $row["value"];
    }
}

echo json_encode($data);
