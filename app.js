import elements from './persons.js';

const { slider, slides, progress } = elements;
let interval;
let timeOut;
let progressint;

const videoPopupOverlay = document.getElementById('videoPopupOverlay');
const videoPopup = document.getElementById('videoPopup');
const popupVideo = document.getElementById('popupVideo');

// Update progress indicator
progress.children[1].textContent = `- ${slider.children.length}`;

const intervalFn = () => {
  interval = setInterval(() => {
    rightMove(false);
  }, 10000);
};

intervalFn();

const timeOutFn = (bool) => {
  if (bool) {
    clearInterval(interval);
    clearTimeout(timeOut);
    clearInterval(progressint);
    progressFn(10);
    timeOut = setTimeout(() => {
      intervalFn();
    }, 5000);
  }

  progress.firstElementChild.textContent = slider.children[2].dataset.index;
};

const progressFn = (indexPlus) => {
  let i = 10;

  progressint = setInterval(() => {
    progress.lastElementChild.style.width = `${(i += indexPlus)}%`;

    if (i === 110) {
      i = 0;
      clearInterval(progressint);
      progress.lastElementChild.style.width = `${i}%`;
    }
  }, 1000);
};

const rightMove = (boolVal = true) => {
  const firstSlide = slider.removeChild(slider.firstElementChild);
  slider.append(firstSlide);
  slider.children[4].classList.add('fade-in');
  slider.style.justifyContent = 'flex-end';
  timeOutFn(boolVal);
};

const leftMove = (boolVal = true) => {
  const lastSlide = slider.removeChild(slider.lastElementChild);
  slider.insertBefore(lastSlide, slider.firstChild);
  lastSlide.classList.add('fade-in');
  slider.style.justifyContent = 'flex-start';
  timeOutFn(boolVal);
};

slides.forEach((slide) => {
  const video = slide.querySelector('video');

  slide.addEventListener('click', () => {
    const slideIndex = [...slider.children].indexOf(slide);
    
    switch (slideIndex) {
      case 0:
        leftMove();
        setTimeout(() => {
          leftMove();
        }, 500);
        break;
      case 1:
        leftMove();
        break;
      case 3:
        rightMove();
        break;
      case 4:
        rightMove();
        setTimeout(() => {
          rightMove();
        }, 500);
        break;
      default:
        break;
    }

    if (video) {
      popupVideo.src = video.src;
      videoPopupOverlay.style.display = 'block';
      videoPopup.style.display = 'block';
      popupVideo.muted = false;
      popupVideo.volume = 10.0;
      popupVideo.play();
    }
  });
});

videoPopupOverlay.addEventListener('click', () => {
  videoPopupOverlay.style.display = 'none';
  videoPopup.style.display = 'none';
  popupVideo.pause();
  popupVideo.src = '';
});

const leftControl = document.querySelector('.left-control');
leftControl.addEventListener('click', leftMove);

const rightControl = document.querySelector('.right-control');
rightControl.addEventListener('click', rightMove);

let draggedElement = null;

slides.forEach((slide) => {
  slide.setAttribute('draggable', true);

  slide.addEventListener('dragstart', (e) => {
    draggedElement = slide;
    setTimeout(() => {
      slide.style.display = 'none';
    }, 0);
  });

  slide.addEventListener('dragend', (e) => {
    setTimeout(() => {
      slide.style.display = 'flex';
      draggedElement = null;
    }, 0);
  });

  slide.addEventListener('dragover', (e) => {
    e.preventDefault();
  });

  slide.addEventListener('dragenter', (e) => {
    e.preventDefault();
    slide.classList.add('dropzone');
  });

  slide.addEventListener('dragleave', (e) => {
    slide.classList.remove('dropzone');
  });

  slide.addEventListener('drop', (e) => {
    e.preventDefault();
    if (slide !== draggedElement) {
      slide.parentNode.insertBefore(draggedElement, slide.nextSibling);
    }
    slide.classList.remove('dropzone');
  });
});
