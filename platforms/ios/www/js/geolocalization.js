/*document.addEventListener("deviceready", onDeviceReady, false);
var watchID = null;

function onDeviceReady() {
  var options = { timeout: 30000 };
  watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);
}

function onSuccess(position) {
  console.log(position.coords.latitude );
  console.log(position.coords.longitude);
}
function onError(error) {
alert('code: '    + error.code    + '\n' +
      'message: ' + error.message + '\n');
}*/

function createReport() {
  var compose_data = []
  $('#report input[type=text]').each(function(i) {
    var input = $(this);
    var id = input.attr('id');
    var value = input.val();
    var asignation = input.data('asignation');
    if (asignation == "form") {
      compose_data.push(String(value));
    }
  });

  insertData(compose_data,"user_helps",myDataBase,Schema,false);  
  createImagesForReports();
  setTimeout(function(){
    var reports = {
      "titles": "Todos los reportes",
      "t2": "Ruta de reportes de lectura",
     "card": "{{card}}"
    };
    loadDBTPL(reports, 'allreports', 'internal-loader');
  },1200);
  
}

function createImagesForReports(){
    lastRegisterQuery("user_helps", function(callback){
      var id = callback.Id;
      var type = "user_helps";
      console.log(id);
      console.log('Creando Imagenes');
      $('#images-adding input[type=text]').each(function(i) {
        var input = $(this);
        var value = input.val();
        var data_images = [value,id,type];
        var datainsertion = insertData(data_images, "images", myDataBase, Schema, false);
        console.log(datainsertion);
      });
    });
}

