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
