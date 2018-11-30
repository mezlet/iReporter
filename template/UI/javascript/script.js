/** **** Image */
function upload_img(input) {
  if (input.files && input.files[0]) {
    let reader = new FileReader();

    reader.onload = function (e) {
      $('#clock').attr('src', e.target.result);
    };
    reader.readAsDataURL(input.files[0]);
  }
}

/** ** Google Location */
let x = document.getElementById('location');

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = 'Geolocation is not supported by this browser.';
  }
}

function showPosition(position) {
  let latlon = `${position.coords.latitude  },${  position.coords.longitude}`;
  let img_url = 'https://maps.googleapis.com/maps/api/staticmap?center=' + latlon + '&zoom=14&size=400x300&sensor=false&key=YOUR_:KEY';
  document.getElementById('mapholder').innerHTML = `<img src='${img_url}'>`;
}















