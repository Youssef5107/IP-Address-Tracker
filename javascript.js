var dataLocation = null;
var dataIp = null;


async function getIp() {
	const response = await fetch("http://ip-api.com/json/?fields=61439");
	var dataIp = await response.json();
	var ip = dataIp.query;
	var location = dataIp.city;
	var timeZone = dataIp.timeZone
	var isp = dataIp.isp
	getLocation(ip)
	locationInfo(ip, location, timeZone, isp)
}

async function getLocation(ip) {
	const response = await fetch("https://api.geoapify.com/v1/ipinfo?apiKey=" + ip)
	var dataLocation = await response.json();
	console.log(ip)
}

getIp()


function ipInput() { }

function locationInfo(ip, location, timeZone, isp) {
	document.querySelector(".location-info-container").innerHTML = `
		<div class="info-container">
			<div class="info-area">
				<div class="info-title">IP Address</div>
				<div class="info">${ip}</div>
			</div>
		</div>
		<hr>
		<div class="info-container">
			<div class="info-area">
				<div class="info-title">Location</div>
				<div class="info">${location}</div>
			</div>
		</div>
		<hr>
		<div class="info-container">
			<div class="info-area">
				<div class="info-title">Timezone</div>
				<div class="info">UTC -${timeZone}</div>
			</div>
		</div>
		<hr>
		<div class="info-container">
			<div class="info-area">
				<div class="info-title">ISP</div>
				<div class="info">${isp}</div>
			</div>
		</div>
	`
}

locationInfo()

if (navigator.geolocation) {
	navigator.geolocation.watchPosition((position) => {
		var Latitude = position.coords.latitude;
		var Longitude = position.coords.longitude;
		var mark = document.querySelector(".location-icon");
		var mapContainer = document.querySelector(".map-container");
		var map = ` <iframe src="https://www.openstreetmap.org/export/embed.html?bbox=${position.coords.longitude},${position.coords.latitude}&;layer=mapnik"></iframe>`
		mapContainer.innerHTML = map;

	}
	);
}
