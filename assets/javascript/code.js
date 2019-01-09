var currentTime=moment().local().format("HH:mm")

var train = {
  Name: "",
  Destination: "",
  Frequency: 0,
  nextTime: 0
}

//clock
console.log(moment().local().format("HH:mm"))
setInterval(function(){$("#trainClock").text(moment())}, 1000)

function appendTable(){
//$("#trainClock").text(currentTime)
var tableBody=$("#trainSchedule")
var row=$("<tr>")
var trainNameTd=$("<td>").text(train.Name);
var trainDestinationTd=$("<td>").text(train.Destination);
var trainFrequencyTd=$("<td>").text(train.Frequency);
var trainNextTd=$("<td>").text(moment(train.nextTime, "hh:mm"));
var trainMinutesUntilTd=$("<td>").text(parseInt(moment(currentTime).diff(moment(train.nextTime), "minutes")))

row.append(trainNameTd, trainDestinationTd, trainFrequencyTd, trainNextTd, trainMinutesUntilTd)
tableBody.append(row)
}

//console.log(currentTime.format())
//console.log(moment.utc(currentTime).format("HH:mm"))
console.log(moment().diff(moment(train.nextTime), "minutes"))
//console.log(moment.diff())
// Initialize Firebase
var config = {
  apiKey: "AIzaSyDe2lhHx6iXmM19ps-i6esAg_Q-rYLf_gk",
  authDomain: "bootcamp-test-app.firebaseapp.com",
  databaseURL: "https://bootcamp-test-app.firebaseio.com",
  projectId: "bootcamp-test-app",
  storageBucket: "bootcamp-test-app.appspot.com",
  messagingSenderId: "975260567147"
};
firebase.initializeApp(config);

var database = firebase.database();

/*
database.ref().on("value", function(snapshot) {
train.Name=snapshot.val().trainName;
})
*/

database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val().trainName)
  console.log(childSnapshot.val().trainDestination)
  console.log(childSnapshot.val().trainFrequency)
  console.log(childSnapshot.val().trainNextTime)
  train.Name=childSnapshot.val().trainName;
  train.Destination=childSnapshot.val().trainDestination;
  train.Frequency=childSnapshot.val().trainFrequency;
  train.nextTime=childSnapshot.val().trainNextTime;
  console.log(moment().diff(moment(train.nextTime), "minutes"))
  console.log(currentTime)
  appendTable();
})

//$("#trainClock").text(currentTime)
//$("#trainName").text=train.Name

$("#submitButton").on("click", function(){
  event.preventDefault();
  train.Name=$("#trainName").val().trim();
  train.Destination=$("#trainDestination").val().trim();
  train.Frequency=$("#trainFrequency").val().trim();
  train.nextTime=$("#trainNext").val().trim();
  //train.nextTime=moment(train.nextTime).format("HH:mm")
  console.log(train.nextTime)
  console.log(train.Name)
  console.log(train.Destination)
  console.log(train.Frequency)
  console.log(train.nextTime)
  //set current values in firebase
  database.ref().push({
    trainName: train.Name,
    trainDestination: train.Destination,
    trainFrequency: train.Frequency,
    trainNextTime: train.nextTime,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });
  $("#trainName").val("");
  $("#trainDestination").val("");
  $("#trainFrequency").val("");
  $("#trainNext").val("");
  
//appendTable();
})

database.ref().orderByChild("dateAdded").on("child_added", function(snapshot) {
  // Change the HTML to reflect
  $("#trainName").text(snapshot.val().trainName);
  $("#trainDestination").text(snapshot.val().trainDestination);
  $("#trainFrequency").text(snapshot.val().trainFrequency);
  $("#trainNext").text(snapshot.val().trainNextTime);
});