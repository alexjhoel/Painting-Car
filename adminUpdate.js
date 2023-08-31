var path = window.location.pathname;



$(document).ready(function () {
  // updating the view with notifications using ajax

  unlock();

  $.ajax({
    url: "editconfigs.php",
    method: "POST",
    data: {view:1},
    dataType: "json",
    success: function (data) {
      $("#ip1").val(data.ip1);
      $("#ip2").val(data.ip2);
    },
    error:function (data) {
        console.log(data);
      }
  })

  $("#configChange").on("submit",function(e){
    e.preventDefault();
    var form_data = $(this).serialize();
    $.ajax({
      url: "editconfigs.php",
      method: "POST",
      data: form_data,
      success: function (data) {
        console.log(data);
      },
      error:function (data) {
          console.log(data);
      }
    })
  });

});

function getData() {
  $.ajax({
    url: "fetch.php",
    method: "POST",
    data: {getData:1},
    dataType: "json",
    success: function (data) {
      $("#table-body").html(data.output);
    },
    error:function (data) {
        console.log(data);
      }
  });
}

function unlock(){
  getData();
  
  
  setInterval(function () {
    getData();
  }, 1000);
}

