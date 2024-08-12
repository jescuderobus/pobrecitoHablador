const recognition = new webkitSpeechRecognition()
recognition.lang = 'es-ES'
recognition.continuous = true
let transcripcion="";
recognition.onresult = event => {
for (const result of event.results) {
    transcripcion += "<br>"+result[0].transcript;  
    //document.getElementById("caja").innerHTML =transcripcion;
}
document.getElementById("caja").innerHTML= transcripcion;
}

function limpiar(){
    document.getElementById("caja").innerHTML="";
}

