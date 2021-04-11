async function post(canvas, name) {
  const ts = new Date().getTime();
  canvas.toBlob(async function(blob) {
    const formData = new FormData();
    formData.append('image', blob, name);
    const res = await fetch('http://localhost:8082/upload', {
      mode: 'no-cors',
      method: 'POST',
      body: formData
    });
  });
}

function loadImage() {
  let img;

  const input = document.getElementById('imgfile');
  if (!input.files[0]) {
      write("Please select a file before clicking 'Load'");
      return;
  }

  const file = input.files[0];
  const fr = new FileReader();
  fr.onload = createImage;
  fr.readAsDataURL(file);

  function createImage() {
      img = new Image();
      img.onload = imageLoaded;
      img.src = fr.result;
  }

  function imageLoaded() {
      const canvas = document.getElementById("canvas")
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img,0,0);
  }

}

async function upload() {
  const canvas = document.getElementById("canvas")
  const input = document.getElementById('imgfile');
  await post(canvas, input.files[0].name);
  write('File uploaded')
}

function write(msg) {
  const p = document.createElement('p');
  p.innerHTML = msg;
  document.body.appendChild(p);
}