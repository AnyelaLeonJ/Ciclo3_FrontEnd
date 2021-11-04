/////////////// CLIENT ///////////////

//GET//
function traerInformacionCliente(){
    $.ajax({
        datatype:"json",
        url:"http://129.146.41.119:8080/api/Client/all",
        type:"GET",
        
        success:function(response){

            $("#resultadoClient").empty();
    
            for(i=0; i<response.length; i++){
                console.log(response[i]);
                $("#resultadoClient").append("<tr>");                
                $("#resultadoClient").append("<td>"+response[i].email+"</td>");
                $("#resultadoClient").append("<td>"+response[i].password+"</td>");
                $("#resultadoClient").append("<td>"+response[i].name+"</td>");
                $("#resultadoClient").append("<td>"+response[i].age+"</td>");
                $("#resultadoClient").append('<td><button onclick="borrarInformacionCliente('+response[i].idClient+')">Borrar</button></td>');
                $("#resultadoClient").append('<td><button onclick="obtenerItemEspecifico('+response[i].idClient+')">Cargar</button></td>');
                $("#resultadoClient").append("<tr>");                
            }     
        },

        error: function(jqXHR, textStatus, errorThrown) {
        }
    });
}

//POST//
function guardarInformacionCliente(){
    let infoClient = {
        email:$("#CLemail").val(),
        password:$("#CLpassword").val(),
        name:$("#CLname").val(),
        age:$("#CLage").val(),
        };
      
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(infoClient), 
        url:"http://129.146.41.119:8080/api/Client/save",
           
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
        url:"http://129.146.41.119:8080/api/Client/"+idElemento,
        type: 'GET',
    
        success:function(response){
            console.log(response);
            $("#CLemail").val(response.email);
            $("#CLpassword").val(response.password);
            $("#CLname").val(response.name);
            $("#CLage").val(response.age);
        },
    
        error: function(jqXHR, textStatus, errorThrown) {       
        }
    });
}

//PUT//
function actualizarInformacionCliente(idElemento){
    let myData={
        id:idElemento,
        email:$("#CLemail").val(),
        password:$("#CLpassword").val(),
        name:$("#CLname").val(),
        age:$("#CLage").val()
    };

    console.log(myData);
    let dataToSend=JSON.stringify(myData);

    $.ajax({
        url:"http://129.146.41.119:8080/api/Client/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",

        success:function(response){
            $("#resultadoClient").empty();
            $("#CLemail").val(),
            $("#CLpassword").val(),
            $("#CLname").val(),
            $("#CLage").val(),
            traerInformacionCliente();
            alert("se ha Actualizado correctamente")
        },
        
        error: function(jqXHR, textStatus, errorThrown) {  
        }
    });
}

//DELETE//
function borrarInformacionCliente(idElemento){
    var elemento={
        id:idElemento
    };

    var dataToSend=JSON.stringify(elemento);

    $.ajax({
        datatype:"json",
        data:dataToSend,
        url:"http://129.146.41.119:8080/api/Client/"+idElemento,
        type:"DELETE",
        contentType:"application/JSON",
        
        success:function(response){
            $("#resultadoClient").empty();
            console.log("Borrado exitoso");            
            alert("Se ha Eliminado.")
            traerInformacionCliente();
        },

        error: function(jqXHR, textStatus, errorThrown) {       
        }
    });
}