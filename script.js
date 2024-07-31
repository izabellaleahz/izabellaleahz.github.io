// Initialize the map
var map = L.map('map').setView([20, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
}).addTo(map);

// Fetch GeoJSON data and add to map
fetch('data/countries.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            onEachFeature: function (feature, layer) {
                layer.on('click', function () {
                    displayPhotos(feature.properties.name);
                });
            },
            style: function (feature) {
                return { color: '#3388ff', weight: 1 };
            }
        }).addTo(map);
    });

// Function to display photos for a country
function displayPhotos(country) {
    var photosDiv = document.getElementById('photos');
    photosDiv.innerHTML = ''; // Clear previous photos

    // Example photos for a country
    var photoList = {
        'France': ['images/france1.jpg', 'images/france2.jpg'],
        // Add more countries and their photos here
    };

    if (photoList[country]) {
        photoList[country].forEach(function (photo) {
            var img = document.createElement('img');
            img.src = photo;
            photosDiv.appendChild(img);
        });
    }
}
