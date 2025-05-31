document.addEventListener('DOMContentLoaded', () => {

  // Array to keep all active stories
  const stories = [];

  // A generalized story initializer function that supports multiple story blocks
  function initStory({ containerId, imageId, prevBtnId, nextBtnId, counterId, totalImages, imageBasePath }) {
    const container = document.getElementById(containerId);
    const imageElement = document.getElementById(imageId);
    const prevBtn = document.getElementById(prevBtnId);
    const nextBtn = document.getElementById(nextBtnId);
    const counter = document.getElementById(counterId);
    let currentIndex = 1;

    // Register this story for arrow navigation
    const storyRef = { container, prev: () => prevSlide(), next: () => nextSlide() };
    stories.push(storyRef);

    // Function to load prev and next image in cache beforehand for faster loading (avoid any flicker)
    function preloadImage(index) {
      if (index >= 1 && index <= totalImages) {
        const img = new Image();
        img.src = `${imageBasePath}image${index}.webp`;
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
          setTimeout(() => imageElement.classList.remove('fade-in'), 400);
        };
      }, 200);

      // Preload next and previous images
      preloadImage(currentIndex + 1);
      preloadImage(currentIndex - 1);

      // Disables next and previous button at extreme slide (when index==1 or index==last)
      prevBtn.disabled = currentIndex === 1;
      nextBtn.disabled = currentIndex === totalImages;

       // Updates the counter
      counter.textContent = `${currentIndex} / ${totalImages}`;
    }

    function prevSlide() {
      if (currentIndex > 1) {
        currentIndex--;
        updateImage();
      }
    }

    function nextSlide() {
      if (currentIndex < totalImages) {
        currentIndex++;
        updateImage();
      }
    }

    // Event listeners
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // Prevents right click on images to discourage casual saving of images
    imageElement.addEventListener('contextmenu', e => e.preventDefault());

    // Must be called at start as well so that prev button is disabled on page load
    updateImage();
  }

  // Track last interacted story container for arrow key control
  let activeStory = null;

  // Set active story on hover or focus
  function attachActiveStoryTracking(container) {
    container.addEventListener('mouseenter', () => activeStory = container);
    container.addEventListener('focusin', () => activeStory = container);
    container.addEventListener('click', () => activeStory = container);
  }

  // Handle global arrow key events
  document.addEventListener('keydown', (e) => {
    if (!activeStory) return;

    const story = stories.find(s => s.container === activeStory);
    if (!story) return;

    if (e.key === 'ArrowLeft') {
      story.prev();
    } else if (e.key === 'ArrowRight') {
      story.next();
    }
  });

  // Initialize Story 1
  initStory({
    containerId: 'story1-container',
    imageId: 'story1-image',
    prevBtnId: 'story1-prev-btn',
    nextBtnId: 'story1-next-btn',
    counterId: 'story1-counter',
    totalImages: 26,
    imageBasePath: 'assets/images/story1/'
  });

  // Initialize Story 2
  initStory({
    containerId: 'story2-container',
    imageId: 'story2-image',
    prevBtnId: 'story2-prev-btn',
    nextBtnId: 'story2-next-btn',
    counterId: 'story2-counter',
    totalImages: 22,
    imageBasePath: 'assets/images/story2/'
  });

  // Attach hover/focus tracking to containers
  attachActiveStoryTracking(document.getElementById('story1-container'));
  attachActiveStoryTracking(document.getElementById('story2-container'));

});
