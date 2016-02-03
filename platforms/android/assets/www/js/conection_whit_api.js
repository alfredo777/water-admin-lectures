$(document).ready(function() {
    // ingreso del usuario requiere internet
    $('#login').submit(function() {
        var $form = $(this),
            url = $form.attr('action'),
            formData = $form.serialize();
        stablishConnection(url, formData, function(data, err) {
            if (err)
                return alert("Error...");
            var compose_data = [data.id, String(data.name), String(data.card), String(data.email), String(data.phone)];
            var dataInsertion = insertData(compose_data, "users", myDataBase, Schema, true);
            var session_id = window.localStorage.getItem("last_insertion_id");
            window.localStorage.setItem("active_user", data.id);
            extractQuery("users", "Id", data.id, function(callback) {
                var profile = callback;
                console.log(profile);
                setTimeout(function() {
                    $('#loader').show();
                    $('#login-div').hide('slow');
                    loadDBTPL(profile, "profile", "loader");
                }, 1000);
            });

        });

        return false;
    });

    // sincronizacion de la base de datos

    $('#sincornize').submit(function() {
        var usercard = $( "input:first" ).val();
        var $form = $(this),
            url = $form.attr('action'),
            formData = $form.serialize();
        stablishConnection(url, formData, function(data, err) {
            if (err)
                return alert("Error...");
            dropTable("routes");
            dropTable("images");
            dropTable("inspects");
            window.localStorage.setItem("lecture", "0");
            $('.button-sincro').hide();
            $('.load').show();
            $.each(data, function(i, item) {
                setTimeout(function(){
                var dt = data[i];
                 var compose_data = [dt.id, dt.business_name, dt.address, dt.colony, dt.water_meter, dt.diameter, dt.reference, dt.observations, dt.sx, dt.ux, dt.stage, dt.account_number, dt.abnormalities, dt.lecture, dt.data_access, dt.reading_assignment_id, dt.successfully_completed, dt.last_read]
                 var insertion = insertData(compose_data, "routes", myDataBase, Schema, false);
                }, 200);
            });
            setTimeout(function() {
                var reports = {
                    "titles": "Todos los reportes",
                    "t2": "Ruta de reportes de lectura",
                    "card": "{{card}}"
                }
                loadDBTPL(reports, 'reportslist', 'internal-loader');
            }, 100000);

        });
        $('#sincro2').show();
        $('#sincro1').hide();
        $('#sincro').hide();
        $('#load').hide();
        
        return false;
    });

    
    
    // actualizacion de ruta

    $('#route-update').submit(function() {
        $('form#route-update input[type=text]').each(function(i) {
            var input = $(this);
            var valuex = input.val();
            var field = input.attr('id');
            var id = input.data('idx');
            console.log(field);
            console.log(valuex);
            console.log(id);
            if (field != "to_id") {
                if (valuex != "") {
                    updateQuery("routes", field, valuex, id);
                }
            } else {
                setTimeout(function() {
                    extractQuery("routes", "Id", id, function(callback) {
                        loadDBTPL(callback, 'open_route', 'internal-loader');
                    });
                }, 1000);
            }
        });
        return false;
    });


    // ajax function to call
    
    function stablishConnection(url, formData, callback) {
        console.log(url);
        console.log(formData);
        //var callurl = "http://192.168.1.116:3000/" + url;
        var callurl = "http://wateradmin.rockstars.mx/" + url;

        $.ajax({
            url: callurl,
            data: formData,
            processData: false,
            contentType: false,
            dataType: 'jsonp',
            type: 'GET',
            success: function(data) {
                callback(data, null);
            },
            error: function(err) {
                callback(null, err);
            }
        });
    };

    function calllInspects(usercard, callback){
        //var callurl = "http://192.168.1.116:3000/" + "mobile/call_all_inspects"+"?card="+usercard;
        var callurl = "http://wateradmin.rockstars.mx/" + "mobile/call_all_inspects"+"?card="+usercard;
        console.log(callurl);

         $.ajax({
            url: callurl,
            processData: false,
            contentType: false,
            dataType: 'jsonp',
            type: 'GET',
            success: function(data) {
                callback(data, null);
            },
            error: function(err) {
                callback(null, err);
            }
        });

    }
});