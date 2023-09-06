<?php 
include("./connect.php");

$query = "UPDATE connections SET colorId = ".$_POST["id"].", colorTime ='" . date('Y-m-d H:i:s')."' WHERE ip = '".$_SERVER["REMOTE_ADDR"]."'";
mysqli_query($con,$query);

echo "Success"; 
?>