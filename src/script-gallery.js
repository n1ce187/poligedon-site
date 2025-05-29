document.addEventListener('DOMContentLoaded', () => {
  const thumbnails = document.querySelectorAll('.thumbnails img');
  const current = document.getElementById('currentImage');

  thumbnails.forEach(img => {
    img.addEventListener('click', () => {
      current.src = img.src;
      thumbnails.forEach(th => th.classList.remove('active'));
      img.classList.add('active');
    });
  });

  if (thumbnails.length > 0) {
    thumbnails[0].classList.add('active');
  }

  current.addEventListener('click', () => {
    current.classList.toggle('zoomed');
  });
});
