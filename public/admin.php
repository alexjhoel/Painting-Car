<?php include("login.php");?>
<html>

<head>
    <title>Painting Car Admin Panel</title>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/jquery.min.js"></script>
    <script src="adminUpdate.js?=15241"></script>

    <link rel="stylesheet" href="styles/bootstrap.min.css" />
    <link rel="stylesheet" href="styles/mystyle.css?t=21323" />
</head>

<body>

    <div class="container p-4" id="login" style = "display:<?php if($logged) echo 'none'; else echo 'inherit';?>;">
        <div class="row">
            <div class="col-md-4 mx-auto">
                <div class="card card-body">
                    <form id="loginForm" method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>">

                        <?php if (isset($_SESSION['message'])) { ?>
                            <div class="alert alert-<?= $_SESSION['message_type']; ?> alert-dismissible fade show"
                                role="alert">
                                <?= $_SESSION['message'] ?>
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>
                            <?php unset($_SESSION['message']);
                        } ?>

                        <div class="form-group p-2">
                            <p>Username:</p>
                            <input class="form-control" type="text" name="username" value=""
                                placeholder="Ingrese su usuario aquí">
                        </div>

                        <div class="form-group p-2">
                            <p>Password:</p>
                            <input class="form-control" type="password" name="password" value=""
                                placeholder="Ingrese su contraseña aquí">
                        </div>

                        <div class="form-group p-2">
                            <input type="submit" class="btn btn-success col-12" name="update" value="Log in" onclick="">
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>
    <div class="container p-4" id="table" style = "display:<?php if($logged) echo 'inherit'; else echo 'none';?>;">
        <div class="row">
            <div class="col-md-8 mx-auto">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>IP</th>
                            <th>Nombre</th>
                            <th>Última conexión</th>
                            <th>Color</th>
                            <th>Habilitado</th>
                        </tr>
                    </thead>

                    <tbody id="table-body">

                    </tbody>
                </table>
            </div>
        </div>

        <div class="row">
            <div class="col-md-8 mx-auto">
                <div class="card card-body">
                    <h2>Último color:</h2>
                    <div id="last-color-holder" class="color-holder" ></div>
                </div>    
            </div>
        </div>

        <div class="row">
            <div class="col-md-8 mx-auto">
            <div class="card card-body">
                <form id="configChange" method="post">


                        <div class="form-group p-2">
                            <p>IP1(ESP32):</p>
                            <input class="form-control" type="text" id="ip1"  name="ip1" value=""
                                placeholder="127.0.0.1">
                        </div>

                        <div class="form-group p-2">
                            <p>IP2(Tablet):</p>
                            <input class="form-control" type="text" id="ip2" name="ip2" value=""
                                placeholder="127.0.0.1">
                        </div>

                        <div class="form-group p-2">
                            <input type="submit" class="btn btn-success col-12" name="update" value="Guardar" onclick="">
                        </div>

                </form>
            </div>
        </div>
    </div>




</body>

</html>