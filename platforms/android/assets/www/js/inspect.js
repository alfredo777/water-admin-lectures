function updateInspect(idx){
  var idx = idx;

  $('#createinspect input[type=text]').each(function(i) {
    var input = $(this);
    var field = input.attr('id');
    var id = input.data('updater');
    var valuex = input.val();
    console.log(field);
    console.log(valuex);
    console.log(id);
    if (valuex != ""){
    updateQuery("inspects",field,valuex,id);
    }
  });

  createImagesForInspects(idx);
  alert("Se ha generado la inspección");

}

function createImagesForInspects(id){
    var id = id;
    var type = "inspects";
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
      extractQuery("inspects", "Id", id, function(callback){
      var inspect = callback;
      loadDBTPL(inspect, 'inspect_view', 'internal-loader');
     });
    }, 1000);
}