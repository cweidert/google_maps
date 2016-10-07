function initMap() {
	var locations = getLocations();
	var landmarks = getLandmarks(locations);
	var legend = makeLegend(landmarks);

	var map = new google.maps.Map(document.getElementById('map'), {
		center: locations["lacma"],
		zoom: 11
	});

	makeMarkers(map, landmarks);
	makeExamplePath(map, locations);
	makeExamplePolygon(map, locations);
	map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legend);
}

function getLandmarks(locations) {
	var iconBase = "icons/";
	var landmarks = {
	  griffith: {
		  name: "Griffith Observatory",
		  subtitle: "beautiful and educational",
		  location: locations["griffith"],
		  icon: iconBase + "griffith24.png"
	  },
	  library: {
		  name: "LA Central Library",
		  subtitle: "book central",
		  location: locations["centralLibrary"],
		  icon: iconBase + "library24.png"
	  },
	  lacma: {
		  name: "LACMA",
		  subtitle: "very artsy",
		  location: locations["lacma"],
		  icon: iconBase + "lacma24.png"
	  },
	  cityhall: {
		  name: "City Hall",
		  subtitle: "free observation deck",
		  location: locations["cityHall"],
		  icon: iconBase + "cityHall24.png"
	  },
	  pier: {
		  name: "Santa Monica Pier",
		  subtitle: "nice and cool",
		  location: locations["santaMonicaPier"],
		  icon: iconBase + "smpier24.png"
	  }
	}

	return landmarks
}

function makeExamplePolygon(map, locations) {
	var midWilshire = new google.maps.Polygon({
		path: [
			locations["beverlyHighland"],
			locations["wilshireHighland"],
			locations["highlandBend"],
			locations["olympicHighland"],
			locations["olympicBend"],
			locations["olympicFairfax"],
			locations["wilshireFairfax"],
			locations["beverlyFairfax"],
			locations["beverlyHighland"]
		],
		strokeColor: "#040",
		strokeOpacity: .8,
		strokeWeight: 2,
		fillColor: "#080",
		fillOpacity: .4
	});
	midWilshire.setMap(map);
}

function makeExamplePath(map, locations) {
	var redLinePath = new google.maps.Polyline({
		path: [
			locations["unionStation"],
			locations["grandParkStation"],
			locations["pershingSquareStation"],
			locations["seventhAndMetro"],
			locations["westlakeStation"],
			locations["wilshireVermontStation"],
			locations["vermontBeverlyStation"],
			locations["vermontSunsetStation"],
			locations["hollywoodWesternStation"],
			locations["hollywoodVineStation"],
			locations["hollywoodHighlandStation"],
			locations["universalCityStation"],
			locations["northHollywoodStation"]
		],
		strokeColor: "#f00",
		strokeOpacity: .5,
		strokeWeight: 2
	});
	redLinePath.setMap(map);
}

function makeLegend(icons) {
	var legend = document.createElement("div");//document.getElementById("legend")
	legend.className += " legend";
	var title = document.createElement("h3")
	title.innerHTML = "Legend";
	legend.appendChild(title);
	for (var key in icons) {
		var ele = icons[key]
		var name = ele.name;
		var icon = ele.icon;
		var div = document.createElement("div");
		div.innerHTML = '<img src="' + icon + '"> ' + name;
		legend.appendChild(div);
	}
	return legend
}

function makeMarkers(map, landmarks) {
	for (var landmarkKey in landmarks) {
		var landmark = landmarks[landmarkKey];
		var location = landmark["location"];
		var icon = landmark["icon"];
		var marker = makeNewMarker(map, location, icon);
		addCaption(map, marker, landmark, zoom = true);
	}
}

function makeNewMarker(map, location, img) {
	var marker = new google.maps.Marker({
		position: location,
		icon: img,
		map: map
	});
	return marker;
}

function addCaption(map, marker, landmark, zoom = false) {
	var message = landmark["name"] + ": " + landmark["subtitle"];

	var markerInfo = new google.maps.InfoWindow({
		content: message
	})

	google.maps.event.addListener(marker, 'click', function(event) {
		markerInfo.open(map, marker);
		if (zoom) {
			var oldZoom = map.getZoom();
			var oldCenter = map.getCenter();
			var oldId = map.getMapTypeId();

			map.setZoom(18);
			map.setMapTypeId("hybrid");
			map.setCenter(marker.getPosition());
			window.setTimeout(function() {
				map.setZoom(oldZoom);
				map.setCenter(oldCenter);
				map.setMapTypeId(oldId);
				// markerInfo.close();
			}, 3000);
		}
	});
}
