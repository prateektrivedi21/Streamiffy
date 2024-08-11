const persons = [
  {
    index: 1,
    video: 'videos/video1.mp4',
  },
  {
    index: 2,
    video: 'videos/video2.mp4',
  },
  {
    index: 3,
    video: 'videos/video3.mp4',
  },
  {
    index: 4,
    video: 'videos/video4.mp4',
  },
  {
    index: 5,
    video: 'videos/video5.mp4',
  },
  {
    index: 6,
    video: 'videos/video6.mp4',
  },
  {
    index: 7,
    video: 'videos/video7.mp4',
  },
  {
    index: 8,
    video: 'videos/video8.mp4',
  },
  {
    index: 9,
    video: 'videos/video9.mp4',
  },
  {
    index: 10,
    video: 'videos/video10.mp4',
  },
]

const slider = document.querySelector('.slider')

persons.forEach(({ index, video }) => {
  slider.insertAdjacentHTML(
    'beforeend',
    `<div class="slide" data-index=${index} title="Make Active">
       <video src=${video} alt=${video.split('/')[1].split('.')[0]} autoplay loop> this video is not supported</video>
       <i class="fa fa-youtube-play icon"></i>
       <i class="fa fa-play icon-2"></i>
    </div>`,
  )
})

const elements = {
  slider,
  slides: [...document.querySelectorAll('.slide')],
  progress: document.querySelector('.progress'),
}

export default elements
