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
      var color = "";
      
      if (location.coordinates[3] > 200) {
        color = "red";
      }
      else if (location.coordinates[3] > 150) {
        color = "orange";
      }
      else if (location.coordinates[3] > 100) {
        color = "yellow";
      }
      else if (location.coordinates[3] > 50) {
        color = "green";
      }
      else {
        color = "yellowgreen";
      };
 
      L.circleMarker([location.coordinates[1], location.coordinates[0]], {
            fillOpacity: 0.75,
            fillcolor: color,
            radius: quakes[i].properties.mag * 2
        }).bindPopup("<h1>" + quakes[i].properties.place + "</h1>").addTo(myMap);
    }
 

  // Create a legend to display information about our map
var key = L.control({ position: "bottomright" });

// When the layer control is added, insert a div with the class of "legend"
key.onAdd = function() {
  var div = L.DomUtil.create("div", "key");
  var depth = ["0-50", "50-100", "100-150", "150-200", ">200"]
  var colors = ["yellowgreen", "green", "yellow", "orange", "red"]
  var labels = [];
  
  depth.forEach(function(depth, index) {
    labels.push("<p><div class=\"color\" style=\"background-color: " + colors[index] + "\"> </div> <span>" + depth +  "</span> </p>");
  });
div.innerHTML += labels.join(""); // joining all the tags into one single string 
return div;
};
key.addTo(myMap);

});