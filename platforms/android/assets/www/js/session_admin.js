function createSession(name_session, xid){
  window.localStorage.setItem(name_session,xid);
    var session_acces = window.localStorage.getItem(name_session);
  console.log(session_acces);
};

function deleteSession(name_session){
  window.localStorage.setItem(name_session, "");
  var session_acces = window.localStorage.getItem(name_session);
  console.log(session_acces);
  console.log("La session ha sido limpiada")
};

function getSession(name_session){
  var session_acces = window.localStorage.getItem(name_session);
  console.log("accesando a la session"+ session_acces);
};

function clearSession(name){
  window.localStorage.clear(name);
  window.location.reload();
}