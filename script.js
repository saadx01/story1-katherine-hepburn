document.addEventListener('DOMContentLoaded', () => {

  // A generalized story initializer function that supports multiple story blocks
  function initStory({ imageId, prevBtnId, nextBtnId, counterId, totalImages, imageBasePath }) {
    const imageElement = document.getElementById(imageId);
    const prevBtn = document.getElementById(prevBtnId);
    const nextBtn = document.getElementById(nextBtnId);
    const counter = document.getElementById(counterId);
    let currentIndex = 1;

    // Function to load prev and next image in cache beforehand for faster loading (avoid any flicker)
    function preloadImage(index) {
      if (index >= 1 && index <= totalImages) {
        const img = new Image();
        img.src = `${imageBasePath}image${index}.webp`; // This starts loading the image
      }
    }

    // Function to update current image, adds transition, preloads 2 images and disables nav buttons at the end of slides
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

      // Disables next and previous button at extreme slide (when index==1 or index==last)
      prevBtn.disabled = currentIndex === 1;
      nextBtn.disabled = currentIndex === totalImages;

      // Updates the counter if present
      if (counter) {
        counter.textContent = `${currentIndex} / ${totalImages}`;
      }
    }

    // Prev button functionality
    prevBtn.addEventListener('click', () => {
      if (currentIndex > 1) {
        currentIndex--;
        updateImage();
      }
    });

    // Next button functionality
    nextBtn.addEventListener('click', () => {
      if (currentIndex < totalImages) {
        currentIndex++;
        updateImage();
      }
    });

    // Prevents right click on images to discourage casual saving of images
    imageElement.addEventListener('contextmenu', e => e.preventDefault());

    // Must be called at start as well so that prev button is disabled on page load
    updateImage();
  }

  // Initialize first story
  initStory({
    imageId: 'story1-image',
    prevBtnId: 'story1-prev-btn',
    nextBtnId: 'story1-next-btn',
    counterId: 'story1-counter',
    totalImages: 26,
    imageBasePath: 'assets/images/story1/'
  });

  // Initialize second story
  initStory({
    imageId: 'story2-image',
    prevBtnId: 'story2-prev-btn',
    nextBtnId: 'story2-next-btn',
    counterId: 'story2-counter',
    totalImages: 22,
    imageBasePath: 'assets/images/story2/'
  });

});
