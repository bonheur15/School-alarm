function AddNewToggle(state){
    if(state){
        document.getElementById("add-new").classList.toggle("hide",false);
        document.getElementById("add-new").classList.toggle("show",true);
    }
   else{
        document.getElementById("add-new").classList.toggle("show",false);
        document.getElementById("add-new").classList.toggle("hide",true);
    }
}


function StoreNewAlarm(data){
    StoredAlarm.push(data);
    DisplayStoredTime();
    AddNewToggle(false);
}

var InputFromData= {
    "time":"",
    "label":""
};  // this is global varible that willl store what is subbimite in the inout box
var StoredAlarm = [
    {
        "time":"12:00",
        "label":"Lunch"
    }
]
function ProcessInput(){
    var labelInput = document.getElementById("labelInput").value;
    var timeInput = document.getElementById("timeInput").value;

    InputFromData.time = timeInput;
    InputFromData.label = labelInput;
    StoreNewAlarm(InputFromData);
}
var timenow=new Date();
var simulatedTime = {
    "hour":"00",
    "minute":"00"
}
function DisplayTimeNow(){
    timenow=new Date();
    document.getElementById("time").innerText= timenow.getHours()+":"+timenow.getMinutes();
}
setInterval(() => {
    if(!simulation){
        DisplayTimeNow();
        CheckAlarm();
    }

}, 1000);
var simulation = false;
function CheckAlarm(){

     if(!simulation) timenow = timenow.getHours()+":"+timenow.getMinutes();
    if(simulation) timenow = simulatedTime.hour+":"+simulatedTime.minute;
    StoredAlarm.forEach(item => {  
        if(timenow == item.time) RingNow();
    });
}
function RingNow(){
    alert('Ringing');
}

function DisplayStoredTime(){
    document.getElementById("Timer-on").innerHTML=" <h3>Alarm you already setted</h3>";
    StoredAlarm.forEach(item => {
        document.getElementById("Timer-on").innerHTML+=
        `        
        <div class="alarm">
            <label>`+item.label+`:</label><b>`+item.time+`</b>
        </div>
        `;
    });
    
}
DisplayStoredTime();
// simulation code


function DisplayTimeNowSimulated(){
    document.getElementById("time").innerText = simulatedTime.hour+":"+simulatedTime.minute;
}
function CountSimulatedTime(){
   var hours = Number(simulatedTime.hour);
   var minute = Number(simulatedTime.minute);

   minute+=1;
   if(minute == 60) {
    minute = 0;
    hours+=1;
    if(hours == 24 ){
        hours = 0;
    }
   }
   minute = minute.toString();
   if(minute.length == 1) minute = "0"+minute;


   hours = hours.toString();
   if(hours.length == 1) hours = "0"+hours;

   simulatedTime.hour = hours;
   simulatedTime.minute = minute;
}


function Startsimulation(){
    simulation = true;
    var timeinterval = prompt("Enter Time interval in milliseconds",10);
    setInterval(() => {
        CountSimulatedTime();
        CheckAlarm();
        DisplayTimeNowSimulated();
    }, timeinterval);
    
}