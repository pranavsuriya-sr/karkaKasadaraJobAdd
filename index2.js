import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getDatabase, ref, set, remove, onChildAdded, onChildRemoved } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyBDe9qRyWKoo377m7MQ-wnDZZ-InjutxTg",
    authDomain: "test1-15fd6.firebaseapp.com",
    databaseURL: "https://test1-15fd6-default-rtdb.firebaseio.com",
    projectId: "test1-15fd6",
    storageBucket: "test1-15fd6.appspot.com",
    messagingSenderId: "844739593407",
    appId: "1:844739593407:web:0e0976e353f763be04320a",
    measurementId: "G-0NJMP6GGFK"
  };
  

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


// TO SEND MESSAGES
module.sendMsg = function sendMsg()
{
    var msg = textMsg.value;
    var jobid = jobidi.value;
    var jobdes = jobdesi.value;
    var timestamp = new Date().getTime();
    set(ref(db,"jobs/"+timestamp),{
                msg : msg,
                jobid : jobid,
                jobdes : jobdes
            })

            textMsg.value="";
            jobidi.value = "";
            jobdesi.value = "";
}


onChildAdded(ref(db,"jobs"), (data)=>{
    jobname.innerHTML += "<div style=justify-content:end class=outer id="+data.key+"><div id=inner class=meSelf>Jobname: "+data.val().msg+"<br>Jobid: "+data.val().jobid+ "<br>Jobdes: "+data.val().jobdes+"</div> <button id=dltMsg onclick=module.dltMsg("+data.key+")>🗑</button> </div>";

})







// TO DELETE MSG
module.dltMsg = function dltMsg(key)
{
    remove(ref(db,"jobs/"+key));
}

onChildRemoved(ref(db, "jobs"), (data) => {
    const msgBox = document.getElementById(data.key);
    if (msgBox) {
        msgBox.remove();
    }
});