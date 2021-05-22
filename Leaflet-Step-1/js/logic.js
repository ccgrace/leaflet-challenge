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
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_month.geojson";

d3.json(link).then(function(response) {
    var quakes = response.features

    console.log(quakes[0].properties.mag);
  
    for (var i = 0; i < quakes.length; i++) {
      var location = quakes[i].geometry;
      
    function color(depth) {

      var depthcolor = "";
      
      if (depth > 100) {
        depthcolor = "990000";
      }
      else if (depth > 80) {
        depthcolor = "#FF0000";
      }
      else if (depth > 60) {
        depthcolor = "#eb5e34";
      }
      else if (depth > 40) {
        depthcolor = "#eb9f34";
      }
      else if (depth > 20) {
        depthcolor = "#ebd334";
      }
      else {
        depthcolor = "#e2eb34";
      };
      return depthcolor
    }
      if (location) {
        
      L.circleMarker([location.coordinates[1], location.coordinates[0]], {
            fillOpacity: 0.75,
            fillcolor: color(location.coordinates[3]),
            radius: quakes[i].properties.mag * 2
        }).bindPopup("<h1>" + quakes[i].properties.place + "</h1>").addTo(myMap);
      }
    }
  });