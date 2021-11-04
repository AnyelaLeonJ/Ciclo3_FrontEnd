/////////////// CATEGORY ///////////////

//GET - 129.146.41.119//
function traerInformacionCategoria(){
    $.ajax({
        datatype:"JSON",
        url:"http://129.146.41.119:8080/api/Category/all",
        type:"GET",
        
        success:function(response){

            $("#resultadoCategory").empty();

            for(i=0;i<response.length;i++){
                console.log(response[i]);
                $("#resultadoCategory").append("<tr>");
                $("#resultadoCategory").append("<td>"+response[i].name+"</td>");
                $("#resultadoCategory").append("<td>"+response[i].description+"</td>");
                $("#resultadoCategory").append('<td><button onclick="borrarInformacionCategoria('+response[i].id+')">Borrar</button></td>');
                $("#resultadoCategory").append('<td><button onclick="obtenerItemEspecifico('+response[i].id+')">Cargar</button></td>');
                $("#resultadoCategory").append("<tr>");
            }
        },

        error: function(jqXHR, textStatus, errorThrown) {
        }
    });
}
    
//POST//
function guardarInformacionCategoria(){
    let infoCategory = {
        name:$("#Cname").val(),
        description:$("#Cdescription").val(),
        };
      
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(infoCategory),
        url:"http://129.146.41.119:8080/api/Category/save",
        
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
        url:"http://129.146.41.119:8080/api/Category/"+idElemento,
        type: 'GET',
    
        success:function(response){
            console.log(response);
            $("#Cname").val(response.name);
            $("#Cdescription").val(response.description);
        },
    
        error: function(jqXHR, textStatus, errorThrown) {       
        }
    });
}

//PUT//
function actualizarInformacionCategoria(idElemento){
    let myData={
        id:idElemento,
        name:$("#Cname").val(),
        description:$("#Cdescription").val(),
    };

    console.log(myData);
    let dataToSend=JSON.stringify(myData);

    $.ajax({
        url:"http://129.146.41.119:8080/api/Category/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",

        success:function(response){
            $("#resultadoCategory").empty();
            $("#Cname").val("");
            $("#Cdescription").val("");
            traerInformacionCategoria();
            alert("se ha Actualizado correctamente")
        },

        error: function(jqXHR, textStatus, errorThrown) {  
        }
    });
}

//DELETE//
function borrarInformacionCategoria(idElemento){
    var elemento={
        id:idElemento
    };

    var dataToSend=JSON.stringify(elemento);

    $.ajax({
        datatype:"JSON",
        data:dataToSend,
        url:"http://129.146.41.119:8080/api/Category/"+idElemento,
        type:"DELETE",
        contentType:"application/JSON",
        
        success:function(response){
            $("#resultadoCategory").empty();
            console.log("Borrado exitoso");  
            alert("Se ha Eliminado.");
            traerInformacionCategoria();
        },

        error: function(jqXHR, textStatus, errorThrown) {       
        }
    });
}