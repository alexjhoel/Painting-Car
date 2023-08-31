var path = window.location.pathname;


$(document).ready(function () {
  // updating the view with notifications using ajax
  

  connectionStatus();
  
  
  setInterval(function () {
    connectionStatus();
  }, 1000);
});

function connectionStatus() {
  $.ajax({
    url: "fetch.php",
    method: "POST",
    data: {getStatus:1},
    dataType: "json",
    success: function (data) {
      if(path == "/paintingcar/" || path == "/paintingcar/index.php" ){
        ip1 = data.config.ip1;
        ip2 = data.config.ip2;
        if(ip1!=data.config.ip1){
          recargarVid1();
        }
        if(ip2!=data.config.ip2){
          recargarVid2();
        }
        if(data.status == 0){
          window.open("./wait.php","_self")
        }
      }else if(path == "/paintingcar/wait.php"){
        if(data.status == 1){
          window.open("./index.php","_self")
        }
      }
    },
    error: function (data) {
      console.log(data);
    }
  });
}
