hound.player={
    loadApp:function(){
        $.mobile.showPageLoadingMsg("a", "Descargando Actualizaciones",false);
        $.ajax($("#servidor").val()+"/HoundConnector/rs/"+$("#appName").val()+"/versiones")
        .done(function() {
            localStorage.setItem("appName",$("#appName").val());
            localStorage.setItem("server",$("#servidor").val());
            $.mobile.hidePageLoadingMsg();
            window.location = "loading.html";            
        })
        .fail(function(jqXHR, textStatus) {
            $.mobile.hidePageLoadingMsg();
            alert( "No se pudo descargar la aplicacion, favor de verificar los datos:" + textStatus );
        });
    },
    setConf: function(){
        hound.config.appName = localStorage.getItem("appName");
        hound.config.remote_server = localStorage.getItem("server")+"/HoundConnector/rs/";
        hound.config.remote_server_files = localStorage.getItem("server")+"/HoundConnector/resources/";
    }
}