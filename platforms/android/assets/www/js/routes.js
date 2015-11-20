function updateLecture() {
  $('#routeupdate input[type=text]').each(function(i) {
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
          var id = callback.Id;
          var type = "routes";
          var inspect = callback;
          console.log(id);
          console.log('Creando Imagenes');
          $('#images-adding input[type=text]').each(function(i) {
            console.log("image adding");
            var input = $(this);
            var value = input.val();
            console.log(type);
            console.log(id);
            var data_images = [value, id, type];
            var im = insertData(data_images, "images", myDataBase, Schema, false);
            console.log(data_images);
          });
          loadDBTPL(callback, 'open_route', 'internal-loader');
          polimorfismQuery("images", id, "routes", function(callback){
            var all_calls_img = callback;
            var images = {
            "imglist": all_calls_img,
            "name": "lista de imagenes"
            };
            putsformDBTPL(images,'imagelist','images-adding');
          });
        });
      }, 2000);
    }
  });
}