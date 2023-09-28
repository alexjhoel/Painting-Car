

var i = 5;

setInterval(updateCooldown, 10);


function updateCooldown(){
    for (let index = 0; index < $(".btn-color").length; index++) {
        $(".btn-color")[index].style.setProperty("--cooldown",i + "%");
        
    }
    
    
    i= Math.min(100,i+1);
}

function colorSelected(e){
    let btns = $(".btn-color");
    for (let index = 0; index < btns.length; index++) {
        $(btns[index]).removeClass("selected");
        
        
    }

    $.ajax({
        url: "setcolor.php",
        method: "POST",
        data: {id: $(e.target).attr("id").substring(6,7)},
        dataType: "json",
        success: function (data) {
            console.log(data);
        },
        error:function (data) {
            console.log($(e.target).attr("id").substring(6,7));
          }
      });
        
    getsend($(e.target).attr("data"));
    $(e.target).addClass("selected");
}