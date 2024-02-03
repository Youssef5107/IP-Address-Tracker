var dataLocation = null;
var dataIp = null;

async function getLocation() {
	const response = await fetch("https://api.geoapify.com/v1/ipinfo?apiKey=YOUR_API_KEY")
	var dataLocation = await response.json();
	console.log(dataLocation);
}
// getLocation()

async function getIp() {
	const response = await fetch("http://ip-api.com/json/?fields=61439");
	var dataIp = await response.json();
}

function ipInput() { }

function locationInfo() {
	document.querySelector(".location-info-container").innerHTML = `
		<div class="info-container">
			<div class="info-area">
				<div class="info-title">IP Address</div>
				<div class="info">this is not the real info</div>
			</div>
		</div>
		<hr>
		<div class="info-container">
			<div class="info-area">
				<div class="info-title">Location</div>
				<div class="info">this is not the real info</div>
			</div>
		</div>
		<hr>
		<div class="info-container">
			<div class="info-area">
				<div class="info-title">Timezone</div>
				<div class="info">this is not the real info</div>
			</div>
		</div>
		<hr>
		<div class="info-container">
			<div class="info-area">
				<div class="info-title">ISP</div>
				<div class="info">UTC -this is not the real info</div>
			</div>
		</div>
	`
}

locationInfo()

if (navigator.geolocation) {
	navigator.geolocation.watchPosition((position) => {
		document.querySelector(".map").innerHTML = `
		<div class="map-container">
			<iframe src="https://www.openstreetmap.org/export/embed.html?bbox=${position.coords.longitude},${position.coords.latitude}&;layer=mapnik"></iframe>
		</div>
	`
	}
	);
}

