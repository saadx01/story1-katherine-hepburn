document.addEventListener('DOMContentLoaded', function () {
  const imageElement = document.getElementById('story-image');
  const prevBtn = document.getElementById('story-prev-btn');
  const nextBtn = document.getElementById('story-next-btn');


  let currentIndex = 1;
  const totalImages = 26;
  const imageBasePath = 'assets/images/';

  function preloadImage(index) {
    if (index >= 1 && index <= totalImages) {
      const img = new Image(); // Create a new, invisible image object
      img.src = `${imageBasePath}image${index}.webp`; // This starts loading the image
    }
  }

  function updateImage() {
    imageElement.classList.add('fade-out');

    setTimeout(() => {
      imageElement.src = `${imageBasePath}image${currentIndex}.webp`;

      imageElement.onload = () => {
        imageElement.classList.remove('fade-out');
        imageElement.classList.add('fade-in');

        // Remove fade-in after it's done to avoid buildup
        setTimeout(() => {
          imageElement.classList.remove('fade-in');
        }, 400);
      };
    }, 200);

    // Preload next and previous images
    preloadImage(currentIndex + 1);
    preloadImage(currentIndex - 1);

    prevBtn.disabled = currentIndex === 1;
    nextBtn.disabled = currentIndex === totalImages;
    document.getElementById('story-counter').textContent = `${currentIndex} / ${totalImages}`;
  }


  prevBtn.addEventListener('click', () => {
    if (currentIndex > 1) {
      currentIndex--;
      updateImage();
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentIndex < totalImages) {
      currentIndex++;
      updateImage();
    }
  });

  // To move between slides using arrow buttons
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && currentIndex > 1) {
      currentIndex--;
      updateImage();
    }
    if (e.key === 'ArrowRight' && currentIndex < totalImages) {
      currentIndex++;
      updateImage();
    }
  });

  // Prevents right click on images to discourage casual saving of images
  imageElement.addEventListener('contextmenu', e => e.preventDefault());

  //Must be called at start as well so that prev button is disabled on page load
  updateImage();

});
