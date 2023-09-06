<?php
include("./connect.php");


session_start();



$query = "SELECT * FROM connections WHERE ip='" . $_SERVER['REMOTE_ADDR'] . "'";
   $result = mysqli_query($con, $query);
   $showname = true;
   $ipStatus = false;
   if (mysqli_num_rows($result) > 0) {
      $showname = !isset($_SESSION["name"]);

      $query = "UPDATE connections SET connectionTime ='" . date('Y-m-d H:i:s') . "' WHERE ip='" . $_SERVER['REMOTE_ADDR'] . "'";

   } else {
      $query = "INSERT INTO connections(ip, authorized, connectionTime,colorTime) VALUES ('" . $_SERVER['REMOTE_ADDR'] . "', false,'" . date('Y-m-d H:i:s') . "','" . date('Y-m-d H:i:s') . "')";
      echo $query;
   }

   if(isset($_POST["name"])){
    
    $_SESSION["name"] = $_POST["name"];
    $query = "UPDATE connections SET name ='".$_POST["name"]."' WHERE ip='" . $_SERVER['REMOTE_ADDR'] . "'";
    header('Location: index.php');
   }

   if($showname){
    echo "
    <div style='position: absolute; top: 0; right:0; bottom: 0; left:0; background-color: rgba(168, 168, 168, 0.9);'>
    <div class='row'>
        <div class='col-md-6 col-10 mx-auto'>
            <h1>Por favor, escribe tu nombre</h1>    
            <h3>(Nos ayudará a identificarte)</h3>

            <form action='./requirename.php' method='POST'>
            <div class='form-group p-2'>
            <input class='form-control' type='text' name='name' id='username'
              placeholder='Escriba su nombre aquí' />
            </div>

          <div class='form-group p-2'>
          <button type='submit' class='btn btn-primary col-12'>Enviar</button>
          </div>
            </form>
        </div>
    </div>
    
    </div>";
   }

   mysqli_query($con, $query);
?>