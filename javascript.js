var dataLocation = null;
var dataIp = null;

async function getLocation() {
	const response = await fetch("https://api.geoapify.com/v1/ipinfo?apiKey=YOUR_API_KEY")
	var dataLocation = await response.json();
	console.log(dataLocation);
}
getLocation()

async function getIp() {
	const response = await fetch("http://ip-api.com/json/?fields=61439");
	var dataIp = await response.json();
}

if (navigator.geolocation) {
	navigator.geolocation.watchPosition((position) => {
		document.querySelector(".map").innerHTML = `
		<iframe height="300" src="https://www.openstreetmap.org/export/embed.html?bbox=${position.coords.longitude},${position.coords.latitude}&;layer=mapnik"></iframe>
	`
	}
	);
}