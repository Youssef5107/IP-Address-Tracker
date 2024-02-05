var dataLocation = null;
var dataIp = null;
var map = null; // Declare map variable globally

// get ip data then send it to "function fillLocationInfo()"
async function getIp() {
	//add secure api
	const response = await fetch("http://ip-api.com/json/?fields=61439");
	var dataIp = await response.json();
	var ip = dataIp.query;
	var location = dataIp.city;
	var timeZone = dataIp.timezone;
	var isp = dataIp.isp;
	fillLocationInfo(ip, location, timeZone, isp)
}


// insert new from html input


function ipInput() {
	var inputIp = document.querySelector("input").value;
	getLocation(inputIp);
}

//save new ip in new variables and send it to draw the new location map

async function getLocation(inputIp) {
	const response = await fetch("https://geo.ipify.org/api/v2/country,city?apiKey=at_QyCIOzdReGCJHpir4mZ41Qzyak0bG&ipAddress=" + inputIp)
	var dataLocation = await response.json();
	var ipLongitude = dataLocation.location.lng;
	var ipLatitude = dataLocation.location.lat;
	var ip = dataLocation.ip;
	var location = dataLocation.location.city;
	var timeZone = dataLocation.location.timezone;
	var isp = dataLocation.isp;
	console.log(inputIp);
	console.log(ipLongitude);
	console.log(ipLatitude);
	findLocation(ipLongitude, ipLatitude, ip, location, timeZone, isp)
}

getIp()

// location data

function fillLocationInfo(ip, location, timeZone, isp) {
	document.querySelector(".location-info-container").innerHTML = `
		<div class="info-container">
			<div class="info-area">
				<div class="info-title">IP Address</div>
				<div class="info">${ip}</div>
			</div>
		</div>
		<img class="vertical-line vL1" src="images/360_F_363347020_YzZc2x3LI8fTfVXvGVPTXTrkOAJ1MR4l.jpeg" alt="">
		<div class="info-container">
			<div class="info-area">
				<div class="info-title">Location</div>
				<div class="info">${location}</div>
			</div>
		</div>
		<img class="vertical-line vL2" src="images/360_F_363347020_YzZc2x3LI8fTfVXvGVPTXTrkOAJ1MR4l.jpeg" alt="">
		<div class="info-container">
			<div class="info-area">
				<div class="info-title">Timezone</div>
				<div class="info">UTC -${timeZone}</div>
			</div>
		</div>
		<img class="vertical-line vL3" src="images/360_F_363347020_YzZc2x3LI8fTfVXvGVPTXTrkOAJ1MR4l.jpeg" alt="">
		<div class="info-container">
			<div class="info-area">
				<div class="info-title">ISP</div>
				<div class="info">${isp}</div>
			</div>
		</div>
	`
}

fillLocationInfo()

// draw default map with current location 

function initializeMap() {
	var mapArea = document.querySelector(".map");
	map = L.map(mapArea, {
		center: [51.505, -0.09], // Initial center (replace with suitable coordinates)
		zoom: 13
	});

	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);
}

initializeMap(); // Call the map initialization function

// Update the map with the user's current location
if (navigator.geolocation) {
	navigator.geolocation.watchPosition((position) => {
		map.setView([position.coords.latitude, position.coords.longitude], 13);
		L.marker([position.coords.latitude, position.coords.longitude]).addTo(map);
	});
}


// redraw the map after given new location

function findLocation(longitude, latitude, ip, location, timeZone, isp) {
	map.setView([latitude, longitude], 13);
	L.marker([latitude, longitude]).addTo(map);
	fillLocationInfo(ip, location, timeZone, isp);
}

function toTop() {
	var scrollToTopButton = document.querySelector(".scroll-to-top-button");
	scrollToTopButton.addEventListener("click", () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	});
}