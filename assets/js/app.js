function bootstrap() {
  const $enterSiteButton = document.querySelector('.intro__welcome__button');
  $enterSiteButton?.addEventListener('click', handleEnterSiteButtonClick);

  const $fullScreenButton = document.querySelector('.intro__video__full-screen');
  if (navigator.userAgent.indexOf('Safari') === -1) {
    $fullScreenButton?.addEventListener('click', handleFullScreenButton);
  } else {
    $fullScreenButton?.remove();
  }

  const $skipVideoButton = document.querySelector('.intro__video__skip');
  $skipVideoButton?.addEventListener('click', handleSkipVideoButton);
}

function handleEnterSiteButtonClick() {
  const $welcomeIntro = document.querySelector('.intro__welcome');
  $welcomeIntro.remove();

  const $videoWrapper = document.querySelector('.intro__video-wrapper');
  $videoWrapper.classList.add('show');

  const $video = document.querySelector('.intro video');
  $video.play();
}

function handleFullScreenButton() {
  const $video = document.querySelector('.intro video');
  $video.requestFullscreen();
}

function handleSkipVideoButton() {
  const $intro = document.querySelector('.intro');
  $intro.remove();
  document.documentElement.classList.remove('no-scroll');
}

document.addEventListener('DOMContentLoaded', bootstrap);
