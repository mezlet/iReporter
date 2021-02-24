function myFunction() {
    const x = document.getElementById('myTopnav');
    if (x.className === 'topnav') {
      x.className += ' responsive';
    } else {
      x.className = 'topnav';
    }
  }
  
  function imageValidation() {
    const fileInput = document.getElementById('file');
    const filePath = fileInput.value;
    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    if (!allowedExtensions.exec(filePath)) {
      alert('Please upload file having extensions .jpeg/.jpg/.png/.gif only.');
      fileInput.value = '';
      return false;
    }
    if (file.size > 1024000) {
      alert('Max Upload size is 1MB only');
      document.getElementById(file).value = '';
      return false;
    }
  
    // Image preview
    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        document.getElementById('imagePreview').innerHTML = `<img width ="400" src="${e.target.result}"/>`;
      };
      reader.readAsDataURL(fileInput.files[0]);
    }
  
  }
  
  
  function fileValidation(){
    var fileInput = document.getElementById('file2');
    var filePath = fileInput.value;
    var allowedExtensions = /(\.mp4)$/i;
    if(!allowedExtensions.exec(filePath)){
        alert('Please upload file having extensions .mp4/only.');
        fileInput.value = '';
        return false;
    }
    if (file.size > 1024000) {
        alert('Max Upload size is 1MB only');
        document.getElementById(file).value = '';
        return false;
    }            
    else{
        //Image preview
        if (fileInput.files && fileInput.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('videoPreview').innerHTML = '<video width= "400" controls><source src="'+e.target.result+'" type ="video/mp4"> </video>';
            };
            reader.readAsDataURL(fileInput.files[0]);
        }
    }
  }
  
