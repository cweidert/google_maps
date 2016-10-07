function makeNewMarker(map, location, img) {
	var marker = new google.maps.Marker({
		position: location,
		icon: img
	});
	marker.setMap(map);
	return marker; 
}
	
function placeMarker(map, location) {
	var marker = new google.maps.Marker({
		position: location,
		map: map
	});
	var infoWindow = new google.maps.InfoWindow({
		content: "Latitude: " + location.lat() + "<br>Longitude: " + location.lng()
	});
	infoWindow.open(map, marker);
}

