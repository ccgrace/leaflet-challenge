var myMap = L.map("mapid", {
    center: [38.2700, -100.8603],
    zoom: 5
  });

// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: "pk.eyJ1IjoiY2NncmFjZSIsImEiOiJja296MjM2ZnkwMXZ0MndwZXR0dmI0ZWEyIn0.ZP_G3UkufeT4HwQyULf2zw"
}).addTo(myMap);


// Use this link to get the geojson data.
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";

d3.json(link).then(function(response) {
    var quakes = response.features

    console.log(quakes[0].properties.mag);
  
    for (var i = 0; i < quakes.length; i++) {
      var location = quakes[i].geometry;
      
      if (location.coordinates[3] > 200) {
        color = "darkred"
      }
      else if (location.coordinates[3] > 100) {
          color = "red";
      }
      else if (location.coordinates[3] > 80) {
          color = "darkorange";
      }
      else if (location.coordinates[3] > 60) {
          color = "orange";
      }
      else if (location.coordinates[3] > 40) {
          color = "yellow";
      }
      else if (location.coordinates[3] > 20) {
          color = "green";
      }
      else {
          color = "lightgreen";
      };
      
      if (location) {
        L.circleMarker([location.coordinates[1], location.coordinates[0]], {
            fillOpacity: 0.75,
            fillcolor: color,
            radius: quakes[i].properties.mag * 5
        }).bindPopup("<h1>" + quakes[i].properties.place + "</h1>").addTo(myMap);
      }
    }
  });
  