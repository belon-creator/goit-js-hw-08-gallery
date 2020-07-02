'use strict';

import gallery from './gallery-items.js';

const refs = {
  list: document.querySelector('.js-gallery'),
  modalWindow: document.querySelector('.lightbox'),
  modalContent: document.querySelector('.lightbox__content'),
  modalImg: document.querySelector('.lightbox__image'),
  closeModal: document.querySelector("button[data-action='close-lightbox']"),
};

const arrLength = gallery.length;
let index = -1;
let activeIndex = 0;

function createItems({ preview, original, description }) {
  const item = document.createElement('li');
  item.classList.add('gallery__item');

  const ref = document.createElement('a');
  ref.classList.add('gallery__link');
  ref.setAttribute('href', original);

  const image = document.createElement('img');
  image.classList.add('gallery__image');
  image.src = preview;
  image.setAttribute('data-source', original);
  image.setAttribute('data-index', (index += 1));
  image.alt = description;

  ref.appendChild(image);
  item.appendChild(ref);
  return item;
}

const renderListItems = (list, arr) => {
  const showItems = arr.map((item) => createItems(item));
  list.append(...showItems);
};
renderListItems(refs.list, gallery);

refs.list.addEventListener('click', clickOnGallery);
refs.closeModal.addEventListener('click', closeModal);
refs.modalContent.addEventListener('click', onBackDropClick);

function clickOnGallery(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  openModal();
}

function openModal() {
  window.addEventListener('keydown', clickOnEsc);
  window.addEventListener('keydown', sideClick);
  refs.modalWindow.classList.add('is-open');
  const imgRef = event.target;
  const bigImgUrl = imgRef.dataset.source;
  refs.modalImg.src = bigImgUrl;
  refs.modalImg.setAttribute('data-index', imgRef.dataset.index);
  activeIndex = refs.modalImg.dataset.index;
  activeIndex = Number(activeIndex);
}

function closeModal() {
  window.removeEventListener('keydown', clickOnEsc);
  window.removeEventListener('keydown', sideClick);
  refs.modalWindow.classList.remove('is-open');
  refs.modalImg.src = '';
}

function onBackDropClick(event) {
  if (event.target === event.currentTarget) {
    closeModal();
  }
}

function clickOnEsc(event) {
  if (event.code === 'Escape') {
    closeModal();
  }
}

function sideClick(event) {
  onPressing();

  let arrOfImages = document.querySelectorAll('.gallery__image');
  arrOfImages = Array.from(arrOfImages);

  const currentImg = arrOfImages.find(
    (item) => item.dataset.index === String(activeIndex)
  );

  changeImg(currentImg.dataset.source);
}

function onPressing() {
  if (event.code === 'ArrowRight') {
    if (activeIndex >= arrLength - 1) {
      return;
    }
    activeIndex += 1;
  }

  if (event.code === 'ArrowLeft') {
    if (activeIndex <= 0) {
      return;
    }
    activeIndex -= 1;
  }
}

function changeImg(value) {
  refs.modalImg.src = value;
}
