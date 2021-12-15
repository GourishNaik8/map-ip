function atStart() {
    fetch("http://ip-api.com/json")
        .then(result => result.json())
        .then((d) => {
            let d_data = d;
            document.querySelector("#i").innerTEXT = `${d_data.query}`;
            fun()
        })
}
var ip_in = document.getElementById("i");
ip_in.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {
        fun();
    }
});
fun = () => {
    var myip = document.querySelector("#i").value;
    console.log(myip);
    var my_url="https://geo.ipify.org/api/v2/country,city?apiKey=at_oc39VOha8Np48JsJ6rXFQ7nA4zTxz&ipAddress="+myip;
    // var my_url = "http://ip-api.com/json/" + ip;
    console.log(my_url);
    var myData;
    fetch(my_url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            let myData = data;
            document.querySelector("#d1").innerHTML = `${myData.ip}`;
            var statecity=`${myData.location.region}`+","+`${myData.location.city}`+" "+`${myData.location.postalCode}`;
            document.querySelector("#d2").innerHTML = statecity;
            var timeZone="UTC "+`${myData.location.timezone}`;
            document.querySelector("#d3").innerHTML = timeZone;
            document.querySelector("#d4").innerHTML = `${myData.isp}`;
            updateMarker([data.location.lat, data.location.lng]);
        })
        .catch(error => window.alert("Invalid ip", error))
    document.querySelector("#i").value = "";
}
const map = L.map('map-point', {
    'center': [0, 0],
    'zoom': 0,
    'layers': [
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        })
    ]
})
updateMarker = (update_marker = [0,0]) => {
    map.setView(update_marker, 12);
    L.marker(update_marker).addTo(map);
}
document.addEventListener('load', updateMarker())