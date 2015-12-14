/*active record min phonegap*/
var myDataBase = window.openDatabase("mydb", "1.0", "mydb", 1000000);
var obJCall = [];
var Schema = {
    "users": {
        "accessor": "(Id,name,card,email,phone)",
        "progresor": "(Id INTEGER PRIMARY KEY, name VARCHAR(50), card VARCHAR(50),email VARCHAR(50), phone VARCHAR(50))",
        "procesor": "(?,?,?,?,?)"
    },
    "routes": {
        "accessor": "(Id,business_name,address,colony,water_meter,diameter,reference,observations,sx,ux,stage,account_number,abnormalities,lecture,data_access,reading_assignment_id,successfully_completed)",
        "progresor": "(Id INTEGER PRIMARY KEY,business_name VARCHAR(255),address VARCHAR(255),colony VARCHAR(50),water_meter VARCHAR(50),diameter VARCHAR(50),reference VARCHAR(50),observations VARCHAR(255),sx VARCHAR(50),ux VARCHAR(50),stage VARCHAR(50),account_number VARCHAR(50),abnormalities VARCHAR(50),lecture VARCHAR(50),data_access VARCHAR(50),reading_assignment_id INTEGER,successfully_completed BOOLEAN)",
        "procesor": "(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
    },
    "images": {
        "accessor": "(img,imageable_id,imageable_type)",
        "progresor": "(Id INTEGER PRIMARY KEY AUTOINCREMENT,img VARCHAR(255),imageable_id VARCHAR(255),imageable_type VARCHAR(255))",
        "procesor": "(?,?,?)"
    },
    "user_helps": {
        "accessor": "(cause,explanation,area,phone)",
        "progresor": "(Id INTEGER PRIMARY KEY AUTOINCREMENT, cause VARCHAR(255),explanation VARCHAR(255),area VARCHAR(255),phone VARCHAR(255))",
        "procesor": "(?,?,?,?)"
    },
    "inspects": {
        "accessor": "(name,address,inconforme,acount,meter,t_ser,additional_data,date,visit_date,general_inspect,shooting_conditions,home_room,number_of_people,ordeno_prueba_de_inspeccion,property_activity,anomalies,meter_conditions,additional_report)",
        "progresor": "(Id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(255), address VARCHAR(255), inconforme VARCHAR(255), acount VARCHAR(255), meter VARCHAR(255), t_ser VARCHAR(255), additional_data VARCHAR(255), date VARCHAR(255), visit_date VARCHAR(255), general_inspect VARCHAR(255), shooting_conditions VARCHAR(255), home_room VARCHAR(255), number_of_people VARCHAR(255), ordeno_prueba_de_inspeccion VARCHAR(255), property_activity VARCHAR(255), anomalies VARCHAR(255), meter_conditions VARCHAR(255), additional_report VARCHAR(255))",
        "procesor": "(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
    },
    "service_contracts": {
         "accessor": "(drinking_water,sewage_system,acount,meter,diameter,applicant_name,address,colony,phone,bussiness_name,rfc,commercial_bussines,legal_representative,type_service,legal_title)",
         "progresor": "(Id INTEGER PRIMARY KEY AUTOINCREMENT, drinking_water BOOLEAN, sewage_system BOOLEAN, acount VARCHAR(255), meter VARCHAR(255), diameter VARCHAR(255), applicant_name VARCHAR(255), address VARCHAR(255), colony VARCHAR(255), phone VARCHAR(255), type_service VARCHAR(255), bussiness_name VARCHAR(255), rfc VARCHAR(255), commercial_bussines VARCHAR(255), legal_representative VARCHAR(255), legal_title VARCHAR(255))",
         "procesor": "(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
    }
};
$(document).ready(function() {
    document.addEventListener("deviceready", onDeviceReady, false);
});

function onDeviceReady() {
    var db = myDataBase;
    var sh = schema;
}

function resultDATA(tx, result) {
    var r = result;
    console.log(r);
    createSession("last_insertion_id", r);
}

function resultFromExtract(tx, results) {
    console.log(results.rows);
}

function insertData(data, table, db, sh, drop) {
    if (drop == true) {
        dropTable(table);
    }
    createDB(table);
    insertQuery(table, data);
}

function createDB(table) {
    var confiG = Schema[table].progresor;
    var createQuery = "CREATE TABLE IF NOT EXISTS" + " " + table + " " + confiG;
    myDataBase.transaction(function(tx) {
            console.log(createQuery);
            tx.executeSql(createQuery);
        },
        function(tx, error) {
            console.log('1.Something went wrong: ' + error);
        },
        function successCB() {
            console.log("success!");
        }
    );
}

function insertQuery(table, data) {
    var confiG = Schema[table].accessor;
    var procesoR = Schema[table].procesor;
    var accessDATa = data;
    var insertQuery = "INSERT INTO" + " " + table + " " + confiG + " " + "VALUES" + procesoR;
    console.log(accessDATa);
    myDataBase.transaction(function(tx) {
            console.log(insertQuery);
            tx.executeSql(insertQuery, accessDATa, resultDATA);
        },
        function(tx, error) {
            console.log('1.Something went wrong: ' + error);
        });
}

function extractQuery(table, by_param, data, callback) {
    var accessDATa = data;
    var findQuery = "SELECT * FROM " + " " + table;
    var session = String(table).toUpperCase();
    myDataBase.transaction(function(tx) {
            console.log(findQuery);
            tx.executeSql(findQuery, [],
                function(tx, results) {
                    for (i = 0; i < results.rows.length; i++) {
                        if (results.rows.item(i)["Id"] == accessDATa) {
                            callback(results.rows.item(i))
                        }
                    }
                }
            );
        },
        function(tx, error) {
            console.log('1.Something went wrong: ' + error);
        }
    );
}

function polimorfismQuery(table, id, type, callback) {
    var data_id = id;
    var data_type = type;
    var findQuery = "SELECT * FROM " + " " + table;
    myDataBase.transaction(function(tx) {
            console.log(findQuery);
            var PushinfVAr = [];
            tx.executeSql(findQuery, [],
                function(tx, results) {
                    for (i = 0; i < results.rows.length; i++) {
                        var typexcompare = results.rows.item(i)["imageable_type"];
                        var idcompare = results.rows.item(i)["imageable_id"];
                        if (typexcompare == type) {
                            if (idcompare == id) {
                                var itemx = results.rows.item(i);
                                PushinfVAr.push(itemx);
                            }
                        }
                    }
                    callback(PushinfVAr);
                }
            );
        },
        function(tx, error) {
            console.log('1.Something went wrong: ' + error);
        }
    );
}



function callAllQuery(table, callback) {
    myDataBase.transaction(function(tx) {
            var findQuery = "SELECT * FROM " + " " + table;
            var call_all = []
            tx.executeSql(findQuery, [],
                function(tx, results) {
                    for (i = 0; i < results.rows.length; i++) {
                        var itemx = results.rows.item(i);
                        call_all.push(itemx);
                    }
                    console.log(call_all);
                    callback(call_all);
                });
        },
        function(tx, error) {
            console.log('1.Something went wrong: ' + error);
            callback(error);
        });
}

function updateQuery(table, field, valuex, id) {
    var updateQuery = "UPDATE" + " " + table + " " + "SET" + " " + field + " " + "= ?" + " " + "WHERE Id =?";
    var value = String(valuex);
    var identifier = id;
    myDataBase.transaction(function(tx) {
        console.log(updateQuery);
        tx.executeSql(updateQuery, [value, identifier],
            function(tx, result) {
                console.log("Succes!");
            }
        );
    });
}

function lastRegisterQuery(table, callback){
    var findQuery = "SELECT * FROM " + " " + table;
    myDataBase.transaction(function(tx) {
        console.log(findQuery);
        tx.executeSql(findQuery, [],
        function(tx, results) {
            var lastacount = results.rows.length -1; 
            for (i = 0; i < results.rows.length; i++) {
                var interator = i;
                if(interator == lastacount){
                    var itemx = results.rows.item(i);
                    callback(itemx);
                    console.log(itemx.Id);
                }
            }
        });
    },
    function(tx, error) {
        console.log('1.Something went wrong: ' + error);
    });

}

function dropTable(table) {
    var DropQery = 'DROP TABLE IF EXISTS' + " " + table;
    myDataBase.transaction(function(tx) {
            tx.executeSql(DropQery);
        },
        function(tx, error) {
            console.log('1.Something went wrong: ' + error);
        },
        function successCB() {
            console.log("success!");
        }
    );
}