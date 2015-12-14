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
	callAllQuery('user_helps', function(callback){
		if(callback != null){
			for (i = 0; i < callback.length; i++) {
				var itemx = callback[i];
				appendLog(itemx.Id, "reporte");
				formData = "cause="+itemx.cause+"&explanation="+itemx.explanation+"&area="+itemx.area+"&phone="+itemx.phone;
				url = "mobile/sincronize_user_helps";
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
				formData = "name="+itemx.name+"&address="+itemx.address+"&inconforme="+itemx.inconforme+"&acount="+itemx.acount+"&meter="+itemx.meter+"&t_ser="+itemx.t_ser+"&additional_data="+itemx.additional_data+"&date="+itemx.date+"&visit_date="+itemx.visit_date+"&general_inspect="+itemx.general_inspect+"&shooting_conditions="+itemx.shooting_conditions+"&home_room="+itemx.home_room+"&number_of_people="+itemx.number_of_people+"&ordeno_prueba_de_inspeccion="+itemx.ordeno_prueba_de_inspeccion+"&property_activity="+itemx.property_activity+"&anomalies="+itemx.anomalies+"&meter_conditions="+itemx.meter_conditions+"&additional_report="+itemx.additional_report;
				url = "mobile/sincronize_inspects";
				conectToSend(url, formData, function(callback) {
					console.log(callback);
				});

			}
		}

	});
	callAllQuery('service_contracts', function(callback){
		if(callback != null){
			for (i = 0; i < callback.length; i++) {
				var itemx = callback[i];
				appendLog(itemx.Id, "contrato");
				url = "mobile/sincronize_serivices_contracts";
				formData = "drinking_water="+timex.drinking_water+"&sewage_system="+itemx.sewage_system+"&acount="+itemx.acount+"&meter="+itemx.meter+"&diameter="+itemx.diameter+"&applicant_name="+itemx.applicant_name+"&address="+itemx.address+"&colony="+itemx.colony+"&phone="+itemx.phone+"&bussiness_name="+itemx.bussiness_name+"&rfc="+itemx.rfc+"&commercial_bussines="+itemx.commercial_bussines+"&legal_representative="+itemx.legal_representative+"&type_service="+itemx.type_service+"&legal_title="+itemx.legal_title;
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
			}
		}
	});

}


function appendLog(tolog, element){
	$('#log').append(String("<p> Sincronizando elemento -"+element+"-"+tolog+"</p></br>"));
}

function conectToSend(url, formData, callback) {
	var callurl = "http://192.168.1.132:3000/" + url;
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
