function createInspect(){
  console.log("Inspección");
  var compose_data = [];
  $('#createinspect input[type=text]').each(function(i) {
    var input = $(this);
    var id = input.attr('id');
    var value = input.val();
    console.log(value);
    var asignation = input.data('asignation');
    if (asignation == "form") {
      compose_data.push(String(value));
    }
  });
  console.log(compose_data);
  insertData(compose_data,"inspects",myDataBase,Schema,false);  
  createImagesForInspects();

}

function createImagesForInspects(){
  lastRegisterQuery("inspects", function(callback){
    var id = callback.Id;
    var type = "inspects";
    var inspect = callback;
    console.log(id);
    console.log('Creando Imagenes');
    $('#images-adding input[type=text]').each(function(i) {
      console.log("image adding");
      var input = $(this);
      var value = input.val();
      console.log(type);
      console.log(id);
      var data_images = [value,id,type];
      var im = insertData(data_images, "images", myDataBase, Schema, false);
      console.log(data_images);
    });
    setTimeout(function(){
    loadDBTPL(inspect, 'inspect_view', 'internal-loader');
    }, 750);
  });
}