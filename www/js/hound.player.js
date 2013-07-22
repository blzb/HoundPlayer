hound.player={
    loadApp:function(appName){
        var servidor = "http://server-hound.rhcloud.com";
        if(servidor.indexOf("http://")==-1){
            servidor = "http://"+servidor;
        }
        $.mobile.showPageLoadingMsg("a", "Descargando Actualizaciones",false);
        $.ajax(servidor+"/HoundConnector/rs/"+appName+"/versiones")
        .done(function() {
            localStorage.setItem("appName",appName);
            localStorage.setItem("server",servidor);
            $.mobile.hidePageLoadingMsg();
            window.location = "loading.html";            
        })
        .fail(function(jqXHR, textStatus) {
            $.mobile.hidePageLoadingMsg();
            hound.errorAlert( "No se pudo descargar la aplicacion, favor de verificar los datos:" + textStatus );
        });
    },
    setConf: function(){
        hound.config.appName = localStorage.getItem("appName");        
        hound.config.remote_server = localStorage.getItem("server")+"/HoundConnector/rs/";
        hound.config.remote_server_files = localStorage.getItem("server")+"/HoundConnector/resources/";
        console.log(hound.config.appName);
        console.log(hound.config.remote_server);
        console.log(hound.config.remote_server_files);
    },
    loadValues: function(){
        if(localStorage.getItem("appName")){
            $("#appName").val(localStorage.getItem("appName"));
        }
        if(localStorage.getItem("server")){
            $("#servidor").val(localStorage.getItem("server"));
        }
    },
    login : function(){
        //alert("login");
        var servidor = "http://server-hound.rhcloud.com";
        if(servidor.indexOf("http://")==-1){
            servidor = "http://"+servidor;
        }
        $.mobile.showPageLoadingMsg("a", "Descargando Actualizaciones",false);
        var login = {email:$("#user").val(), password:$("#password").val()};        
        $.ajax({
            url:servidor+"/HoundConnector/rs/login", 
            type:'POST',
            contentType: "application/json",
            data:JSON.stringify(login)})
        .done(function( value) {
            //alert(value[0]);
            hound.player.loadApp(value[0]);
/*            
            localStorage.setItem("appName",$("#appName").val());
            localStorage.setItem("server",servidor);
            $.mobile.hidePageLoadingMsg();
            window.location = "loading.html";            
            */
        })
        .fail(function(jqXHR, textStatus) {
            $.mobile.hidePageLoadingMsg();
            hound.errorAlert( "LOGIN INCORRECTO VERIFICA TUS CREDENCIALES");
        });
    }
}