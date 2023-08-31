<?php
include("connect.php");


session_start();


if(isset($_SESSION["username"])){
    $logged = true;
}else{
    $logged = false;
    if(isset($_POST["username"])){
        $query = "SELECT id FROM users WHERE id='".$_POST["username"]."' AND password ='".$_POST["password"]."'";
        $result = mysqli_query($con, $query);
        $logged = mysqli_num_rows($result) > 0;
        if($logged){
            $_SESSION["username"] = $_POST["username"];
        }
    }
}
?>

