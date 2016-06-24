// express app for magellan's voyage

// setup our app, invoke it right here. setup our middlewares
var app 		= require('express')(),
	logger		= require('morgan'),
 	bodyParser 	= require('body-parser');

// use our middlewares
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// handles the home page which will send back the seville.html page, the 
// start of Magellan's Voyage
app.get('/', function(req, res) {
	res.sendFile("seville.html", { root: "./html" });
});

app.get('/unknown-voyage', function(req, res) {
	res.sendFile("unknown-voyage.html", { root: "./html" });
});

app.get('/:location', function(req, res) {
	var location = req.params.location;

	switch (location) {
		case 'canary-islands':
		case 'cape-verde':
		case 'strait-of-magellan':
		case 'guam':
		case 'philippines':
			res.sendFile(location + ".html", { root: "./html" });
			break;
		case 'next':
			nextRouteHandler(req, res);
			break;
		default:
			res.redirect('unknown-voyage');
	}
});

// when user selects the route /next?location=seville, we return a JSON object
// specfiying that location with what would be the next on his voyage:
// ex: localhost:PORT/next?location=Seville
// { location: 'Seville', nextLocation: 'Canary Islands' }
function nextRouteHandler(req, res) {
	var location = req.query.location.toLowerCase();
	var nextLoction = "unknown";

	switch (location) {
		case 'seville':
			nextLocation = "Canary Islands";
			break;
		case 'canaryislands':
			nextLocation = "Cape Verde";
			break;
		case 'capeverde':
			nextLocation = "Strait Of Magellan";
			break;
		case 'straitofmagellan':
			nextLocation = "Guam";
			break;
		case 'guam':
			nextLocation = "Philippines";
			break;
		case 'philippines':
			nextLocation = "The End Of The Voyage";
			break;
		default:
			res.redirect('unknown-voyage');
	}
		res.json({
			location: location[0].toUpperCase() + location.slice(1),
			nextLocation: nextLocation
		});
}

// // canary islands
// app.get('/canary-islands', function(req, res) {
// 	res.sendFile("canary-islands.html", { root: "./html" });
// });

// // cape verde
// app.get('/cape-verde', function(req, res) {
// 	res.sendFile("cape-verde.html", { root: "./html" });
// });

// // strait of magellan
// app.get('/strait-of-magellan', function(req, res) {
// 	res.sendFile("strait-of-magellan.html", { root: "./html" });
// });

// // guam
// app.get('/guam', function(req, res) {
// 	res.sendFile("guam.html", { root: "./html" });
// });

// // philippines
// app.get('/philippines', function(req, res) {
// 	res.sendFile("philippines.html", { root: "./html" });
// });

// start our server
app.listen(process.env.PORT || 3030);
