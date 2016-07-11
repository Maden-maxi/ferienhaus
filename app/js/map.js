function initMap() {
    var myLatLng = {lat: 50.8655984, lng: 14.8132046};

    // Create a map object and specify the DOM element for display.
    var map = new google.maps.Map(document.getElementById('map'), {
      center: myLatLng,
      scrollwheel: false,
      zoom: 17
    });

    // Create a marker and set its position.
    var marker = new google.maps.Marker({
      map: map,
      position: myLatLng,
      title: 'An der Ziegelei 5, Hartau, 02763 Zittau, Germany'
    });
  }
try{
  initMap();
} catch(e){
  console.log(e + '!!!');
}
