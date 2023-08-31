<?php
include('connect.php');

// $con = mysqli_connect("localhost", "root", "", "notif");
//$_SERVER['REMOTE_ADDR']
/*if($_POST["view"] != '')
{
   $update_query = "UPDATE comments SET comment_status = 1 WHERE comment_status=0";
   mysqli_query($con, $update_query);
}*/

$data = "";

if (isset($_POST["getData"])) {
   //Admin get all the connections and configs


   $query = "SELECT * FROM connections";
   $result = mysqli_query($con, $query);

   $output = "";

   if (mysqli_num_rows($result) > 0) {
      while ($row = mysqli_fetch_array($result)) {
         $output .= '
         <tr>
         <td>' . $row["ip"] . '</td>
         <td>' . $row["time"] . '</td>
         <td>' . $row["authorized"] . '</td>
         <td>
         ';

         if($row["authorized"] == 0){
            $output .= '<a class="btn btn-danger" href="fetch.php?ip='.$row["ip"].'&enable=0">
               <i class="fas fa-check"></i>
            </a>';
         }else{
            $output .= '<a class="btn btn-success" href="fetch.php?ip='.$row["ip"].'&enable=1">
               <i class="fas fa-check"></i>
            </a>';
         }

         $output.='<a class="btn btn-danger" href="fetch.php?ip='.$row["ip"].'&delete=0">
         <i class="fas fa-trash"></i>
         </a>
         </td></tr>
         ';
      }
   }

   $data = array(
      'output' => $output,
   );
} else if (isset($_GET["enable"]) && isset($_GET["ip"])) 
{
   $query = "UPDATE connections SET authorized =";
   if($_GET["enable"] == 0){
      $query .= "true WHERE ip='";
   }else{
      $query .= "false WHERE ip='";
   }

   $query .= $_GET["ip"]."'";
   mysqli_query($con, $query);
   header("Location: admin.php");
}
else if (isset($_GET["delete"]) && isset($_GET["ip"]))
{
   $query = "DELETE FROM connections WHERE ip='" . $_GET["ip"] . "'";
   mysqli_query($con, $query);
   echo($query);
   header("Location: admin.php");
}
else {
   $query = "SELECT * FROM connections WHERE ip='" . $_SERVER['REMOTE_ADDR'] . "'";
   $result = mysqli_query($con, $query);

   $ipStatus = false;
   if (mysqli_num_rows($result) > 0) {
      while ($row = mysqli_fetch_array($result)) {
         $ipStatus = $row["authorized"];
      }

      $query = "UPDATE connections SET time ='" . date('Y-m-d H:i:s') . "' WHERE ip='" . $_SERVER['REMOTE_ADDR'] . "'";

   } else {
      $query = "INSERT INTO connections(ip, authorized, time) VALUES ('" . $_SERVER['REMOTE_ADDR'] . "', false,'" . date('Y-m-d H:i:s') . "')";
      echo $query;
   }

   mysqli_query($con, $query);
   

   $query = "SELECT * FROM config";
   $result = mysqli_query($con, $query);

   $config = array();

   if (mysqli_num_rows($result) > 0) {
      while ($row = mysqli_fetch_array($result)) {
         $config[$row['id']] = $row['value'];
      }
   }

   $data = array(
      'status' => $ipStatus,
      'config' => $config,
      'time' => date('Y-m-d H:i:s')
   );
}



echo json_encode($data);