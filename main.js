var xhttp = new XMLHttpRequest();
        var db;

        const ip1 = "";
        const ip2 = "";
        const ip3 = "";

        const alertCard = document.getElementById("alert");

        const session = new Date(localStorage.getItem("session"));

        var ttsEnabled = false;
        let synth = window.speechSynthesis;



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
        ]))*/

        

        

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
            console.log(voicesList)
        });

        window.onload = () => {
            canvas = document.getElementById("canvasVolante")
            ctx = canvas.getContext("2d")

            document.querySelectorAll("button").forEach((element) => element.onmouseenter = () => textToSpeech(element.name))
            document.querySelectorAll("input").forEach((element) => element.onmouseenter = () => textToSpeech(element.name))
            document.querySelectorAll("button").forEach((element) => element.onfocus = () => textToSpeech(element.name + " ,click"))
            document.querySelectorAll("input").forEach((element) => element.onfocus = () => textToSpeech(element.name + " ,click"))

            if (session) {

                if ((new Date() - session) / 1000 / 60 / 60 < 1) {
    
                Ingresar(true);

            }

            }
        }

        

        function login() {
            

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
                
                $("#login").hide("slow");
                $("#app").show("slow");
                $("#userData").show();
                $("#usernameText").text(localStorage.getItem("sessionName"))
                textToSpeech("Has iniciado sesión como " + localStorage.getItem("sessionName"))

            } else {
                $("#app").hide("slow");
                $("#login").show("slow");
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
            reverse: '2'

        }
        function getsend(val) {
            //Enviar comando
            fetch('http://192.168.0.101/control?var=nostop&val='+1);
            fetch('http://192.168.0.101/control?var=speed&val='+190);
            fetch('http://192.168.0.101/control?var=car&val='+val);
        }

        function logoff() {
            localStorage.removeItem("session");
            Ingresar(false);
        }

        function ttsChange(){
            ttsEnabled = !ttsEnabled
        }

        function recargarVid1(){
            $("#vid1").attr("src","http://192.168.0.102:81/stream?" + new Date().getTime())
            //$("#vid1").error = () => $("#vid1").attr("src","img/videoperdido.png")
        }

        function recargarVid2(){
            $("#vid2").attr("src","http://192.168.1.6:8080/video?" + new Date().getTime())
            //$("#vid2").error = () => $("#vid2").attr("src","img/videoperdido.png")
        }

