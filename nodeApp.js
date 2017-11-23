//We want to look at badge couunt and points
//Connect to treehouse API to get profile information and printout

//Require https module
const https = require('https');

//Require http module for status code
const http = require('http');

//Print error message
function printError(error) {
	console.error(error.message);
} //end printError

//function to print message to console
function printMessage(username, badgeCount, point) {
	const message = `-Incoming Message: ${username} has ${badgeCount} total badges and ${point} points in Javascript` ;
	console.log(message);
} //end printMessage

function getProfile(username) {
	//try catchblock
	try {
		//connect to the API url (https://teamtreehouse.com/davidhincapie.json)
		//variable REQUEST stores the result of the GET method
		const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {
			if (response.statusCode === 200) {
				let body = "";
				//read data
				response.on('data', data => {
					body += data.toString();
				}); //end data event listener

				response.on('end', () => {
					try {
						//parse data
						const profile = JSON.parse(body);
						//print data
						printMessage(username, profile.badges.length, profile.points.JavaScript);
					} catch (error) {
						printError(error);
					}
				}); //end of END event listener
			} else {
				const message = `There was an error getting the profile for ${username} (${http.STATUS_CODES[response.statusCode]})`;
				const statusCodeError = new Error(message);
				printError(statusCodeError);
			}
		}); //end const request
		//if website address is not found
		//use the ON method to listen for the 'error' event. Pass in a callback function with one parameter of error
		request.on('error', printError);
		//in error callback use the error method on the console (console.error) to print out the error message.
	} catch (error) { //end try
		printError(error); //if unable to determine the domain name
	}
} //end getProfile

const users = ['davidhincapie', 'chalkers', 'notauser5'];

users.forEach(username => {
	getProfile(username);
}); //end users.forEach
