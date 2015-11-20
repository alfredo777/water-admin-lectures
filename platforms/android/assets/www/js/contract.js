function createContract(){
  console.log("Generando contrato");
  var compose_data = [];

  $('#createcontract input[type=checkbox]').each(function(i) {
    var input = $(this);
    var id = input.attr('id');
    var check = input.prop('checked');
    if (check) {
      var value = 1;
    }else{
      var value = 0;
    }
    var asignation = input.data('asignation');
    if (asignation == "form") {
      compose_data.push(String(value));
      console.log(value);
    }
  });

  $('#createcontract input[type=text]').each(function(i) {
    var input = $(this);
    var id = input.attr('id');
    var value = input.val();
    var asignation = input.data('asignation');
    if (asignation == "form") {
      compose_data.push(String(value));
      console.log(value);
    }
  });
  
  setTimeout(function(){
    var value_s_1 = $('#type_service').val();
    compose_data.push(String(value_s_1));
    console.log(value_s_1);
    var value_s_2 = $('#legal_title').val();
    compose_data.push(String(value_s_2));
    console.log(value_s_2);
    console.log(compose_data);
  }, 200);

  setTimeout(function(){

  insertData(compose_data,"service_contracts",myDataBase,Schema,false);  
    lastRegisterQuery("service_contracts", function(callback){
      var contract = callback;
      loadDBTPL(contract, 'signing_contract', 'internal-loader');
    });

  }, 400);
  
  



}