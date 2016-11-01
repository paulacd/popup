
// var lastMessage = "";
var IGline = []; 

// Map routes to controller functions
module.exports = function(app) {
    // Twilio SMS webhook route
    app.post('/message', webhook);

    //send IG handle to IG script
    app.get('/instagram', hitIG);
};

//----------INSTAGRAM CODE------------------
var hitIG = function(request, response) {
	// make request to instagram using lastmessage
	response.send("hello")
	// send instagram back to wip in response
}
//----------INSTAGRAM CODE------------------

// Create a function to handle Twilio SMS / MMS webhook requests
var webhook = function(request, response) {
		console.log("i got a message from: " + request.body.From)
        console.log(IGline)

		//response.send("got")
    // Get the user's phone number
    var phone = request.body.From;

        // get the text message command sent by the user
        var msg = request.body.Body || '';
        msg = msg.toLowerCase().trim();
        // lastMessage = msg;

        if (IGline.length < 4){
            IGline.push(msg);

        } else {
            IGline.shift();
            IGline.push(msg);
        }
        // Conditional logic to do different things based on the command from
        // the user
        if (msg.length > 0) {

        	var responseMessage = 'Thanks for sending! Now look into my eye...'
            
             respond(responseMessage);
            
        } else {
            // If we don't recognize the command, text back with the list of
            // available commands
            var responseMessage = 'Sorry, we didn\'t understand that. '
                + 'please try again';

            respond(responseMessage);
        }

        function respond(message) {
        	response.type('text/xml');
        	response.render('twiml', {
            message: message
        	});
    		}
}