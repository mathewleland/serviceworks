$(document).ready(function() {

  var orgID = 3;
  var orgURL = 'http://www.serviceworks.dev/organizations/' + orgID;
  var eventURL ='http://www.serviceworks.dev/events';

  var satoriURL = '';

  //identify the organizer
  $.getJSON(orgURL, function(data) {
    $('#welcomeHeader').html('Welcome, ' + data.name);
    console.log('first request worked');
  });


  //populate the upcoming events
  $.getJSON(eventURL, function(data) {
    console.log(data);
    var orgEvents = data.filter(function(event) {
      return event.organizations_id === orgID;
    })
    var eventsHTML = '';
    orgEvents.forEach(function(event) {
      eventsHTML += '<li> <h3>' + event.name + ' Event</h3>';
      eventsHTML += '<img src="http://lorempixel.com/400/200/">';
      eventsHTML += '<p><strong> Join us in ' + event.city + ', ' + event.state + ' ' + event.zip + '</strong></p>';
      eventsHTML += '<p>' + event.loves + ' people have said they are interested </p>';

      //get weather info from Satori
      $.getJSON(satoriURL, function(data) {
        eventsHTML += '<p>The weather for this event looks like it is going to be' + data.temperature + '</p>';
      });
      //placeholder until that works:
      eventsHTML += '<p>The weather for this event looks like it is going to be SATOIRI TEMP HERE</p>';


      eventsHTML += '<p>Recent activity following this events twitter: </p>';
      eventsHTML += '<ul><li>tweet 1 from satori stream</li><li>tweet 2 from your given hashtag on the event creation</li></ul></li>';
    })

    $('#upcomingEvents').html(eventsHTML);

  });
})


//https://s3-us-west-1.amazonaws.com/personalprojectfiles/events.json
