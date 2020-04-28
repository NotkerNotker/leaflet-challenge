var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"

d3.json(queryUrl, function(data) {
  console.log(data);

  var myMap = L.map("map", {
    center: [15.5994, -28.6731],
    zoom: 3
  });

  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets-basic",
  accessToken: API_KEY
  }).addTo(myMap);


  for (var i = 0; i < data.features.length; i++) {

    var color = "";
    if (data.features[i].properties.mag > 4) {
      color = "red";
    }
    else if (data.features[i].properties.mag > 2.5) {
      color = "orange";
    }
    else if (data.features[i].properties.mag > 1) {
      color = "yellow";
    }
    else {
      color = "white";
    }

  // Add circles to map
    L.circle([data.features[i].geometry.coordinates[1], data.features[i].geometry.coordinates[0]], {
      fillOpacity: 0.75,
      color: "white",
      fillColor: color,
      // Adjust radius
      radius: data.features[i].properties.mag * 30000
    }).bindPopup("<h1>" + data.features[i].properties.place + "</h1> <hr> <h3>Magnitude: " + data.features[i].properties.mag + "</h3>").addTo(myMap);
  }
});
console.log(API_KEY);
