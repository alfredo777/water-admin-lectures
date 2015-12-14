function sincronizeAllData(){
	var users_to_send;
	var images_to_send;
	var routes_to_send;
	var user_helps_to_send;
	var inspects_to_send;
	var service_contracts_to_send;
	var div = document.getElementById('log');

	callAllQuery('users', function(callback){
		if(callback != null){
			for (i = 0; i < callback.length; i++) {
				var itemx = callback[i];
				appendLog(itemx.Id, "usuario");

			}
		}
	});
	callAllQuery('routes', function(callback){
		if(callback != null){
			for (i = 0; i < callback.length; i++) {
					var itemx = callback[i];
					appendLog(itemx.Id, "ruta");
					var formData =  "id="+itemx.Id+"&reference="+itemx.reference+"&observations="+itemx.observations+"&abnormalities="+itemx.abnormalities+"&lecture="+itemx.lecture+"&data_access="+itemx.data_access;
					var url = "mobile/sincronize_routes";
					conectToSend(url, formData, function(callback) {
						console.log(callback);
					});
			}
		}
	});
	callAllQuery('inspects', function(callback){
		if(callback != null){
			for (i = 0; i < callback.length; i++) {
				var itemx = callback[i];
				appendLog(itemx.Id, "inspección");
				formData = "id="+itemx.Id+"&name="+itemx.name+"&address="+itemx.address+"&inconforme="+itemx.inconforme+"&acount="+itemx.acount+"&meter="+itemx.meter+"&t_ser="+itemx.t_ser+"&additional_data="+itemx.additional_data+"&date="+itemx.date+"&visit_date="+itemx.visit_date+"&general_inspect="+itemx.general_inspect+"&shooting_conditions="+itemx.shooting_conditions+"&home_room="+itemx.home_room+"&number_of_people="+itemx.number_of_people+"&ordeno_prueba_de_inspeccion="+itemx.ordeno_prueba_de_inspeccion+"&property_activity="+itemx.property_activity+"&anomalies="+itemx.anomalies+"&meter_conditions="+itemx.meter_conditions+"&additional_report="+itemx.additional_report;
				url = "mobile/sincronize_inspects";
				conectToSend(url, formData, function(callback) {
					console.log(callback);
				});

			}
		}

	});
  
  
	callAllQuery('images', function(callback){
		if(callback != null){
			for (i = 0; i < callback.length; i++) {
	      	var itemx = callback[i];
					appendLog(itemx.Id, "imagen");
					uploadPhoto(itemx.img, itemx.imageable_id, itemx.imageable_type);						
			}
		}
	});

}


function appendLog(tolog, element){
	$('#log').append(String("<p> Sincronizando elemento -"+element+"-"+tolog+"</p></br>"));
}

function prepareFormToSend(img, imageable_id, imageable_type){
  $("#img").attr("src",img);
  var url = $("#img").attr("src");
  $('#secondimg').val(url);
  $('#imageable_id').val(imageable_id);
  $('#imageable_type').val(imageable_type);
  $('#submit').trigger('click');
}



function uploadPhoto(imageURI, imageable_id, imageable_type) {
	    var options = new FileUploadOptions();
	    options.fileKey="file";
	    options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
	    options.mimeType="image/png";

	    var params = new Object();
	    params.imageable_id = imageable_id;
	    params.imageable_type = imageable_type;

	    options.params = params;

	    var ft = new FileTransfer();
	    ft.upload(imageURI, "http://wateradmin.rockstars.mx/mobile/images", win, fail, options);
	    //ft.upload(imageURI, "http://192.168.1.116:9292/mobile/images", win, fail, options);
}

function win(r) {
    console.log("Code = " + r.responseCode);
    console.log("Response = " + r.response);
    console.log("Sent = " + r.bytesSent);
}

function fail(error) {
    alert("An error has occurred: Code = " = error.code);
    console.log("upload error source " + error.source);
    console.log("upload error target " + error.target);
}


function conectToSend(url, formData, callback) {
	var callurl = "http://wateradmin.rockstars.mx/" + url;
	//var callurl = "http://192.168.1.116:3000/" + url;
	console.log(formData);
	$.ajax({
		url: callurl,
		data: formData,
		processData: false,
		contentType: false,
		dataType: 'json',
		type: 'GET',
		success: function(data) {
			callback(data, null);
			console.log(data);
		},
		error: function(err) {
			callback(null, err);
		}
	});
}
