
<?php include("./requirename.php"); ?>

<head>
  <title>Painting Car</title>
  <meta charset="utf-8" />
  

  <link rel="stylesheet" href="styles/bootstrap.min.css" />
  <link rel="stylesheet" href="styles/mystyle.css?t=12233445" />
  <script src="js/jquery.min.js"></script>
  <script src="js/bootstrap.min.js"></script>
   <script src="update.js?t=19139349"></script>
   <script src="js/color.js?t=129139349"></script>
</head>

<body>



  

  
  
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />

  <script src="js/main.js?t=19191549"></script>
  <script src="js/drawing.js?t=1913914"></script>
  <div class="row d-flex p-3 bg-primary" style="color: white">
    <div class="col p-2">
      <img src="img/logoPaintingCar.png" width=40>
      <span>Painting Car</span>
    </div>
    <div class="col text-end" id="userData" style="display: none">
      <span>Nombre:</span>
      <span><?php if(isset($_SESSION["name"])) echo $_SESSION["name"]?></span>
      <br>
      <span>IP:</span>
      <span><?php echo $_SERVER['REMOTE_ADDR']?></span>
      
      
    </div>
  </div>

  <div class="container p-3" id="app" style="display: none">
    <div class="row d-flex justify-content-center">
      <div class="col-sm-12 col-md-6 text-center">
        Cámara en robot móvil
        <button class="btn btn-primary" name="Recargar video robot" onclick="recargarVid1()">
          <svg xmlns="http://www.w3.org/2000/svg" height="0.75em" viewBox="0 0 512 512">
            <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
            <style>
              svg {
                fill: #ffffff;
              }
            </style>
            <path
              d="M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z" />
          </svg>
        </button>

        <div class="row d-flex p-1 align-items-center">
          <img class="col-10" id="vid1" alt="" />
          <div class="col-2 d-flex flex-column" >
            <?php
              $query= 'SELECT * FROM Colors';
              $result = mysqli_query($con, $query);

              while($row = mysqli_fetch_array($result)){
                echo '<button class="m-1 btn-color" id="color-'.$row["id"].'" data="'.$row["command"].'" name="Cambiar color '.$row["name"].'" onload="this.style.setProperty("--color","'.$row["value"].'")" onclick="colorSelected(event);">';
              }
            ?>
          </div>
        </div>
        
        <ul class="nav nav-tabs justify-content-center" id="myTab" role="tablist">
          <li class="nav-item" role="presentation">
            <button class="nav-link active" name="Cambiar a control con botones" id="modoBoton-tab" data-bs-toggle="tab"
              data-bs-target="#modoBoton" type="button" role="tab" aria-controls="modoBoton" aria-selected="true" onclick="getsend(args.stop);">
              Modo botones
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" id="modoVolante-tab" name="Cambiar a control al volante" data-bs-toggle="tab"
              data-bs-target="#modoVolante" type="button" role="tab" aria-controls="modoVolante" aria-selected="false" onclick="getsend(args.stop);">
              Modo volante
            </button>
          </li>
        </ul>

        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active" id="modoBoton" role="tabpanel" aria-labelledby="modoBoton-tab">
            <div class="row d-flex justify-content-center">
              <button class="col-auto btn btn-large btn-primary m-1" id="forward" onmousedown="getsend(args.forward)"
                name="Adelante">
                <p class="p-0 m-0">Forward</p>
                <i class="p-0 m-0 fas fa-caret-up fa-lg"></i>
              </button>
            </div>

            <div class="row d-flex justify-content-center">
              <button class="col-auto btn btn-large btn-primary m-1" onmousedown="getsend(args.leftturn)"
                name="Girar a la izquierda">
                <span class="p-0 m-0">&nbsp;Left&nbsp;</span>
                <i class="p-0 m-0 fas fa-caret-left fa-lg"></i>
              </button>
              <button id="stop" class="col-auto btn btn-large btn-primary m-1" onmousedown="getsend(args.stop)"
                name="Parar">
                &loz;
              </button>
              <button id="rightTurn" class="col-auto btn btn-large btn-primary m-1"
                onmousedown="getsend(args.rightturn)" name="Girar a la derecha">
                <i class="p-0 m-0 fas fa-caret-right fa-lg"></i>
                <span class="p-0 m-0">Right</span>
              </button>
            </div>

            <div class="row d-flex justify-content-center">
              <button id="reverse" class="col-auto btn btn-large btn-primary m-1" onmousedown="getsend(args.reverse)"
                name="Reversa">
                <i class="p-0 m-0 fas fa-caret-down fa-lg"></i>
                <p class="p-0 m-0">Reverse</p>
              </button>
            </div>
          </div>

          <div class="tab-pane fade show" id="modoVolante" role="tabpanel" aria-labelledby="modoVolante-tab">
            <canvas id="canvasVolante"></canvas>
            <p id="pVolante">Estado</p>
          </div>

          <div class="tab-pane fade show" id="modoNodos" role="tabpanel" aria-labelledby="modoNodos-tab">
            <canvas id="canvasNodo"></canvas>
            <p>
              <button class="btn btn-success" id="playNodos" onclick="playNodos()"><img src="img/play-solid.png"
                  width="20px"></button>
              <button class="btn btn-danger" id="borrarNodos" onclick="borrarNodos()"><img src="img/delete.png"
                  width="30px"></button>
            </p>

          </div>
        </div>
      </div>
      <div class="col-sm-12 col-md-6 text-center">
        Cámara en lienzo fija
        <button class="btn btn-primary" name="Recargar video fijo" onclick="recargarVid2()">
          <svg xmlns="http://www.w3.org/2000/svg" height="0.75em" viewBox="0 0 512 512">
            <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
            <style>
              svg {
                fill: #ffffff;
              }
            </style>
            <path
              d="M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z" />
          </svg>
        </button>
        <img id="vid2" style="width: 100%" />
        
      </div>
    </div>
  </div>

  <button id="access" name="Desactivar texto a voz" onclick="ttsChange()">
    <img src="img/access.png" width=25>
  </button>
</body>
