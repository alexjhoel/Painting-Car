var path = document.location.pathname.substring(document.location.pathname.lastIndexOf('/') + 1,document.location.pathname.length);


$(document).ready(function () {
  // updating the view with notifications using ajax
  
  console.log(path);
  connectionStatus();
  
  
  setInterval(function () {
    connectionStatus();
  }, 1000);
});

function connectionStatus() {
  $.ajax({
    url: "./fetch.php",
    method: "POST",
    data: {getStatus:1},
    dataType: "json",
    success: function (data) {
      if(path == "" || path == "index.php" ){
        ip1 = data.config.ip1;
        ip2 = data.config.ip2;
        if(data.status == 0){
          window.open("./wait.php","_self")
        }
      }else if(path == "wait.php"){
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
