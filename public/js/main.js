var xhttp = new XMLHttpRequest();
        var db;

        const maxVel = 130;
        const minVel = 100;

        var ip1 = "";
        var ip2 = "";

        const alertCard = document.getElementById("alert");

        const session = new Date(localStorage.getItem("session"));
        var ttsEnabled = false;

        if(localStorage.getItem("tts") != null)ttsEnabled = localStorage.getItem("tts") == 'true';
        let synth = window.speechSynthesis;
        var commandState = '3';
        var velState;
	    var volanteMode = false;
        var volanteCooldown = false;


        /////////////////////////
        //Inicializacion de usuarios
        /////////////////////////
        /*

        localStorage.setItem("users", JSON.stringify([
        {
            "username":"admin",
        }
        ,{
            "username":"alexander",
        }
        ,{
            "username":"pepito",
        }
        ]))
        
        <button class="btn btn-danger" onclick="logoff()" id="logoff" name="Cerrar Sesión">
        Cerrar sesión
      </button>
        
        */

        

        

        function setSpeech() {
            //Obtener lista de voces
            return new Promise(
            function (resolve, reject) {
                let synth = window.speechSynthesis;
                let id;

                id = setInterval(() => {
                    if (synth.getVoices().length !== 0) {
                        resolve(synth.getVoices());
                        clearInterval(id);
                    }
                }, 10);
                }
            )
        }

        let s = setSpeech();
        var voicesList = null;
        s.then((voices) => {
            voicesList=voices
        });

        window.onload = () => {
            canvas = document.getElementById("canvasVolante")
            ctx = canvas.getContext("2d")

            canvas2 = document.getElementById("canvasNodo")
            ctx2 = canvas2.getContext("2d")

            canvas2.addEventListener("mouseover", () => mouseover2 = true)

            canvas2.addEventListener("mouseout", () => mouseover2 = false)
            
            ctx.scale(1, 0.5);
            ctx2.scale(1, 0.5);

            document.querySelectorAll("button").forEach((element) => element.onmouseenter = () => textToSpeech(element.name))
            document.querySelectorAll("input").forEach((element) => element.onmouseenter = () => textToSpeech(element.name))
            document.querySelectorAll("button:not(#modoBoton-tab):not(#modoVolante-tab)").forEach((element) => element.onfocus = () => textToSpeech(element.name + " ,click"))
            document.querySelectorAll("input").forEach((element) => element.onfocus = () => textToSpeech(element.name + " ,click"))
            document.querySelector("#modoBoton-tab").onfocus = () => {
                textToSpeech(document.querySelector("#modoBoton-tab").name + " ,click")
                volanteMode = false;

            }

            document.querySelector("#modoVolante-tab").onfocus = () => {
                textToSpeech(document.querySelector("#modoVolante-tab").name + " ,click")
                volanteMode = true;

            }
            Ingresar(true);
        }

        

        function login() {
        
            /*
            const users = JSON.parse(localStorage.getItem("users"));

            const username = document.getElementById("username").value
            flag = true;
            for (let i = 0; i < users.length; i++) {
                if (users[i].username == username) {

                    flag = false;
                    localStorage.setItem("session", new Date().toUTCString())
                    localStorage.setItem("sessionName", username)
                    MostrarMensajeLogin("");
                    Ingresar(true);
                }
            }

            if (flag) {
                MostrarMensajeLogin("Nombre de usuario incorrecto");
            }
            */

        }

        function MostrarMensajeLogin(text) {
            if(text!="")textToSpeech("Aviso:" + text)
            if (text == "") {
                $("#alert").hide();
            } else {
                $("#alert").contents().filter(function () { return this.nodeType == 3; }).first().replaceWith(text)
                $("#alert").show();
            }

        }

        function Ingresar(x) {
            if (x) {
                $("#app").show("slow");
                $("#userData").show();
                //textToSpeech("Has iniciado sesión como " + localStorage.getItem("sessionName"))

            } else {
                $("#app").hide("slow");
                $("#userData").hide();
            }
        }

        function textToSpeech(text){
            if(!ttsEnabled) return;
            synth.cancel();
            const voiceName = "Microsoft Sabina - Spanish (Mexico)";
            let utterance = new SpeechSynthesisUtterance(text);

            for(let voice of voicesList){
                
                if(voiceName === voice.name){
                    utterance.voice = voice;
                }
            }

            synth.speak(utterance);
        }
        
        const args = {
            //Comandos
            forward: '4',
            stop: '3',
            rightturn: '1',
            leftturn: '5',
            reverse: '2',

        }
        function getsend(val) {
            //Enviar comando
            console.log(val);
            if(val > 5){
                
                if(!volanteCooldown) 
                {
		    console.log("Color change to " + val);
                    volanteCooldown = true;
                    setTimeout(() => volanteCooldown = false, 1500);
                }                                                                
                else return;
                
            }
            try{
                fetch('http://' + ip1 + '/control?var=nostop&val='+1);
                fetch('http://' + ip1 + '/control?var=speed&val='+maxVel);
                fetch('http://' + ip1 + '/control?var=car&val='+val);
            }catch{

            }
                
            
            
            
        }

        function getsend2(val, x){
            
                if(val != commandState || x != velState){
                    //console.log(val);
                    try{
                        fetch('http://' + ip1 + '/control?var=nostop&val='+1);
                        fetch('http://' + ip1 + '/control?var=speed&val='+x);
                        fetch('http://' + ip1 + '/control?var=car&val='+val);
                    }catch{
                        
                    }
                    
                    const list = ["Girando a la derecha", "Retrocediendo", "Detenido","Avanzando", "Girando a la izquierda"]
                    const speedText = val == args.stop ? "" : (x >= maxVel ? "rápido" : "lento")
                    document.getElementById("pVolante").innerHTML = list[parseInt(val) - 1] + " " + speedText;
                    textToSpeech(document.getElementById("pVolante").innerHTML)
                    commandState = val;
                    velState = x;
                }
            
            
            
        }

        function logoff() {
            localStorage.removeItem("session");
            Ingresar(false);
        }

        function ttsChange(){
            ttsEnabled = !ttsEnabled
            localStorage.setItem("tts", ttsEnabled);
        }

        function recargarVid1(){
            $("#vid1").attr("src",'http://' + ip1 + ':81/stream?' + new Date().getTime())
            //$("#vid1").error = () => $("#vid1").attr("src","img/videoperdido.png")
        }

        function recargarVid2(){
            $("#vid2").attr("src",'http://' + ip2 + '/video?' + new Date().getTime())
            //$("#vid2").error = () => $("#vid2").attr("src","img/videoperdido.png")
        }

