import { MenuHamburger } from "./menuHamburger.js";

function bootstrap() {
  const $enterSiteButton = document.querySelector('.intro__welcome__button');
  $enterSiteButton?.addEventListener('click', handleEnterSiteButtonClick);

  const $fullScreenButton = document.querySelector('.intro__video__full-screen');
  $fullScreenButton?.addEventListener('click', handleFullScreenButton);

  const $skipVideoButton = document.querySelector('.intro__video__skip');
  $skipVideoButton?.addEventListener('click', handleSkipVideoButton);

  const $video = document.querySelector('.intro video');
  $video?.addEventListener('ended', handleVideoEnded);

  retrieveInfoData();

  new MenuHamburger('.menu-hamburger');
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

function handleVideoEnded() {
  handleSkipVideoButton();
}

async function retrieveInfoData() {
  const $infos = document.querySelectorAll('[data-info]');
  if ($infos.length === 0) return;

  const infoData = await fetchInfoData();

  $infos.forEach(function ($info) {
    const info = $info.dataset.info;
    if (!info) return;

    const $total = $info.querySelector('[data-info-text="total"]');
    $total.textContent = new Intl.NumberFormat('en-US').format(infoData[info]);

    const $max = $info.querySelector('[data-info-text="max"]');
    $max.textContent = formatNumber(infoData.max[info]);

    if (infoData[info] >= infoData.max[info]) {
      $info.parentElement.classList.add('finished');
    }
  });

  const $quest = document.querySelector('[data-info-text="quest"]');
  $quest.textContent = '#' + String(infoData.currentQuest).padStart(2, '0');

  const $reward = document.querySelector('[data-info-text="reward"]');
  $reward.textContent = infoData.max.reward;

  const $progressBar = document.querySelector('.progress-bar');
  $progressBar.style.setProperty('--progress-bar-percentage', getPercentageFromInfo(infoData) + '%');

  function formatNumber(number) {
    let result = String(number);
    if (number >= 1_000_000) {
      result = result.slice(0, result.length - 6);
      return `${result}kk`;
    }
    if (number >= 1_000) {
      result = result.slice(0, result.length - 3);
      return `${result}k`;
    }
    return result;
  }

  function getPercentageFromInfo(info) {
    const attributes = Object.keys(info.max);

    let attributesQuant = 0;

    const sumPercentage = attributes.reduce(function (acc, attribute) {
      if (!info[attribute] && info[attribute] !== 0) return acc;
      const percentage = Math.min(info[attribute] * 100 / info.max[attribute], 100);
      attributesQuant++;
      return acc + percentage;
    }, 0);

    const result = sumPercentage / attributesQuant;

    return result;
  }
}

async function fetchInfoData() {
  const infoDataUrl = window.INFO_DATA_URL ?? './options.json';
  const response = await fetch(infoDataUrl);
  const infoData = await response.json();
  const parsedData = {
    max: {
      ...(infoData.quests[`#${infoData.data.currentQuest}`] ?? infoData.quests['#1']),
    },
    ...infoData.data,
  };
  return parsedData;
}

document.addEventListener('DOMContentLoaded', bootstrap);
