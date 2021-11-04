/////////////// Bike ///////////////

//GET//
function traerInformacionBike(){
    $.ajax({
        datatype:"JSON",
        url:"http://129.146.41.119:8080/api/Bike/all",
        type:"GET",

        success:function(response){
    
            $("#resultadoBike").empty();
            
            for(i=0;i<response.length;i++){
                console.log(response[i]);
                $("#resultadoBike").append("<tr>");                
                $("#resultadoBike").append("<td>"+response[i].name+"</td>");
                $("#resultadoBike").append("<td>"+response[i].brand+"</td>");
                $("#resultadoBike").append("<td>"+response[i].year+"</td>");
                $("#resultadoBike").append("<td>"+response[i].description+"</td>");
                $("#resultadoBike").append('<td><button onclick="borrarInformacionBike('+response[i].id+')">Borrar</button></td>');
                $("#resultadoBike").append('<td><button onclick="obtenerItemEspecifico('+response[i].id+')">Cargar</button></td>');
                $("#resultadoBike").append("<tr>");                
            }
        },

        error: function(jqXHR, textStatus, errorThrown) {
        }
    });
}

//POST//
function guardarInformacionBike(){
    let infoBike = {
        name:$("#Oname").val(),
        brand:$("#Obrand").val(),
        year:$("#Oyear").val(),
        description:$("#Odescription").val(),
        };
      
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(infoBike),
        url:"http://129.146.41.119:8080/api/Bike/save",
       
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
        url:"http://129.146.41.119:8080/api/Bike/"+idElemento,
        type: 'GET',
    
        success:function(response){
            console.log(response);
            $("#Oname").val(response.name);
            $("#Obrand").val(response.brand);
            $("#Oyear").val(response.year);
            $("#Odescription").val(response.description);
        },
    
        error: function(jqXHR, textStatus, errorThrown) {       
        }
    });
}

//PUT//
function actualizarInformacionBike(idElemento){
    let myData={
        id:idElemento,
        name:$("#Oname").val(),
        brand:$("#Obrand").val(),   
        year:$("#Oyear").val(),
        description:$("#Odescription").val()
    };
    
    console.log(myData);
    let dataToSend=JSON.stringify(myData);

    $.ajax({
        url:"http://129.146.41.119:8080/api/Bike/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",

        success:function(response){
            $("#resultadoBike").empty();
            $("#Oname").val(),
            $("#Obrand").val(),
            $("#Oyear").val(),
            $("#Odescription").val()
            traerInformacionBike();
            alert("se ha Actualizado correctamente")
        },

        error: function(jqXHR, textStatus, errorThrown) {  
        }
    });
}

//DELETE//
function borrarInformacionBike(idElemento){
    var elemento={
        id:idElemento
    };

    var dataToSend=JSON.stringify(elemento);

    $.ajax({
        datatype:"JSON",
        data:dataToSend,
        url:"http://129.146.41.119:8080/api/Bike/"+idElemento,
        type:"DELETE",
        contentType:"application/JSON",
        
        success:function(response){
            $("#resultadoBike").empty();
            console.log("Borrado exitoso");            
            alert("Se ha Eliminado.")
            traerInformacionBike();
        },

        error: function(jqXHR, textStatus, errorThrown) {       
        }
    });
}