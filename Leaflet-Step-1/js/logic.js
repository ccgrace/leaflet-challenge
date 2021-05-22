var myMap = L.map("mapid", {
    center: [38.2700, -100.8603],
    zoom: 13
  });

// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);


// Use this link to get the geojson data.
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";

d3.json(link).then(function(response) {
    var quakes = response.features

    console.log(quakes[0].geometry.coordinates[2]);
  
    for (var i = 0; i < quakes.length; i++) {
      var location = quakes[i].geometry;
      var color = "";
      
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
        L.circle([location.coordinates[1], location.coordinates[0]], {
            fillOpacity: 0.75,
            color: "blue",
            fillcolor: color,
            radius: quakes[i].properties.mag
        }).bindPopup("<h1>" + quakes[i].properties.place + "</h1>").addTo(myMap);
      }
    }
  });
  