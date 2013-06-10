hound.player={
    loadApp:function(){
        $("#appName").val();
        $("#servidor").val();
        $.ajax($("#servidor").val()+"/HoundConnector/rs/"+$("#appName").val()+"/versiones")
        .done(function() {
            localStorage.setItem("appName",$("#appName").val());
            localStorage.getItem("server",$("#servidor").val());
            window.location = "loading.html";
        })
        .fail(function() {
            alert("error");
        })
    },
    setConf: function(){
        hound.config.appName = localStorage.getItem("appName");
        hound.config.remote_server = localStorage.getItem("server")+"/HoundConnector/rs/";
        hound.config.remote_server_files = localStorage.getItem("server")+"/HoundConnector/resources/";
    }
}