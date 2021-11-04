/////////////// MESSAGE ///////////////

//GET//
function traerInformacionMessage(){
    $.ajax({
        datatype:"json",
        url:"http://129.146.41.119:8080/api/Message/all",
        type:"GET",
        
        success:function(response){

            $("#resultadoMessage").empty();
    
            for(i=0; i<response.length; i++){
                console.log(response[i]);
                $("#resultadoMessage").append("<tr>");                
                $("#resultadoMessage").append("<td>"+response[i].messageText+"</td>");
                $("#resultadoMessage").append('<td><button onclick="borrarInformacionMessage('+response[i].idMessage+')">Borrar</button></td>');
                $("#resultadoMessage").append('<td><button onclick="obtenerItemEspecifico('+response[i].idMessage+')">Cargar</button></td>');
                $("#resultadoMessage").append("<tr>");                
            }     
        },

        error: function(jqXHR, textStatus, errorThrown) {
        }
    });
}

//POST//
function guardarInformacionMessage(){
    let infomessage = {
        messageText:$("#message").val(),
        };
      
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(infomessage), 
        url:"http://129.146.41.119:8080/api/Message/save",
           
        success:function(response) {
            console.log(response);
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente");
            window.location.reload()
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
              window.location.reload()
            alert("No se guardo correctamente");
        }
    });
}

//GET especific//
function obtenerItemEspecifico(idElemento){

    $.ajax({
        dataType: 'json',
        url:"http://129.146.41.119:8080/api/Message/"+idElemento,
        type: 'GET',
    
        success:function(response){
            console.log(response);
            $("#message").val(response.messageText);
        },
    
        error: function(jqXHR, textStatus, errorThrown) {       
        }
    });
}

//PUT//
function actualizarInformacionMessage(idElemento){
    let myData={
        id:idElemento,
        messageText:$("#message").val(),
    };

    console.log(myData);
    let dataToSend=JSON.stringify(myData);

    $.ajax({
        url:"http://129.146.41.119:8080/api/Message/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",

        success:function(response){
            $("#resultadoMessage").empty();
            $("#message").val(),
            traerInformacionMessage();
            alert("se ha Actualizado correctamente")
        },
        
        error: function(jqXHR, textStatus, errorThrown) {  
        }
    });
}

//DELETE//
function borrarInformacionMessage(idElemento){
    var elemento={
        id:idElemento
    };

    var dataToSend=JSON.stringify(elemento);

    $.ajax({
        datatype:"json",
        data:dataToSend,
        url:"http://129.146.41.119:8080/api/Message/"+idElemento,
        type:"DELETE",
        contentType:"application/JSON",
        
        success:function(response){
            $("#resultadoMessage").empty();
            console.log("Borrado exitoso");            
            alert("Se ha Eliminado.")
            traerInformacionMessage();
        },

        error: function(jqXHR, textStatus, errorThrown) {       
        }
    });
}