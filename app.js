let map, panorama, geocoder;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 40.730610, lng: -73.935242 }, // Default to New York City
        zoom: 14,
        streetViewControl: false // Disable default StreetView UI
    });

    panorama = new google.maps.StreetViewPanorama(
        document.getElementById("panorama"), {
            position: { lat: 40.730610, lng: -73.935242 },
            pov: { heading: 34, pitch: 10 },
            motionTracking: false,
            motionTrackingControl: false
        }
    );

    geocoder = new google.maps.Geocoder();

    map.setStreetView(panorama);
}

function geocodeAddress(geocoder, resultsMap) {
    const address = document.getElementById("address").value;

    geocoder.geocode({ 'address': address }, (results, status) => {
        if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            panorama.setPosition(results[0].geometry.location);
            panorama.setPov({
                heading: 34,
                pitch: 10
            });
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}
