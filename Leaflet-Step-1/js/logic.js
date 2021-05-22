var myMap = L.map("mapid", {
    center: [38.2700, -100.8603],
    zoom: 5
  });

// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
}).addTo(myMap);


// Use this link to get the geojson data.
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_month.geojson";

d3.json(link).then(function(response) {
    var quakes = response.features

    console.log(quakes[0].properties.mag);
  
    for (var i = 0; i < quakes.length; i++) {
      var location = quakes[i].geometry;
      
  
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

  // Create a legend to display information about our map
var key = L.control({ position: "bottomright" });

// When the layer control is added, insert a div with the class of "legend"
key.onAdd = function() {
  var div = L.DomUtil.create("div", "key");
  var depth = ["0-20", "20-40", "40-60", "60-80", "80-100", ">100"]
  var colors = ["#e2eb34", "#ebd334", "#eb9f34", "#eb5e34", "#FF0000", "990000"]
  var labels = [];
  
  limits.forEach(function(limit, index) {
    labels.push("<p><div class=\"color\" style=\"background-color: " + colors[index] + "\"> </div> <span>" + limit +  "</span> </p>");
});
div.innerHTML += labels.join(""); // joining all the tags into one single string 
return div;
};
key.addTo(myMap); 
});