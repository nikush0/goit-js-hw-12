import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { getImages } from './js/pixebay-api';
import { renderImages } from './js/render-functions';
import { checkData } from './js/render-functions';

export let image;
let page = 1;
let maxPage = 0;
const perSize = 15;

export const refs = {
  formElem: document.querySelector('form'),
  list: document.querySelector('.gallery-image'),
  loadItem: document.querySelector('.loader-cont'),
  btnLoad: document.querySelector('.btn-primary'),
  loadIcon: document.querySelector('.content-loader'),
  loadIconMore: document.querySelector('.loader'),
};

refs.formElem.addEventListener('submit', onFormSubmit);

refs.btnLoad.addEventListener('click', onLoadMoreClick);

async function onFormSubmit(event) {
  event.preventDefault();
  hideLoadMore();
  page = 1;
  image = event.target.elements.search.value.trim();
  refs.list.innerHTML = '';
  if (!image && checkData) {
    hideLoadIcon();
    iziToast.info({
      message: 'Line is empty, enter a value',
      position: 'topLeft',
    });
    refs.list.innerHTML = '';
    return;
  }
  try {
    showLoadIcon();
    const data = await getImages(image, page);
    maxPage = Math.ceil(data.totalHits / perSize);
    refs.list.insertAdjacentHTML('beforeend', renderImages(data.hits));
    lightbox.refresh();
    checkBtnStatus();
    hideLoadIcon();
  } catch (err) {
    console.log(err);
  }

  event.target.reset();
}

async function onLoadMoreClick() {
  try {
    page += 1;
    showLoadBtn();
    const data = await getImages(image, page);

    refs.list.insertAdjacentHTML('beforeend', renderImages(data.hits));
    hiddenLoadBtn();
    lightbox.refresh();
  } catch (err) {
    console.log(err);
  }
  myScroll();
  checkBtnStatus();
}

function checkBtnStatus() {
  if (page >= maxPage) {
    hideLoadMore();
    iziToast.info({
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topRight',
    });
  } else {
    showLoadMore();
  }
}

function showLoadMore() {
  refs.btnLoad.classList.remove('hidden');
}

export function hideLoadMore() {
  refs.btnLoad.classList.add('hidden');
}

function showLoadIcon() {
  refs.loadIcon.classList.remove('hidden');
}

export function hideLoadIcon() {
  refs.loadIcon.classList.add('hidden');
}

function showLoadBtn() {
  refs.loadIconMore.classList.remove('hidden');
}

function hiddenLoadBtn() {
  refs.loadIconMore.classList.add('hidden');
}

function myScroll() {
  const item = document.querySelector('.gallery-item');
  const height = item.getBoundingClientRect().height;

  window.scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}

export const lightbox = new SimpleLightbox('.gallery-link', {
  captionsData: 'alt',
  captionDelay: 250,
  overlayOpacity: 0.8,
});
