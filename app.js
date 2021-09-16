const galleryItems = [
 {
  preview:
   'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
  original:
   'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
  description: 'Hokkaido Flower',
 },
 {
  preview:
   'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
  original:
   'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
  description: 'Container Haulage Freight',
 },
 {
  preview:
   'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
  original:
   'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
  description: 'Aerial Beach View',
 },
 {
  preview:
   'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
  original:
   'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
  description: 'Flower Blooms',
 },
 {
  preview:
   'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
  original:
   'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
  description: 'Alpine Mountains',
 },
 {
  preview:
   'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
  original:
   'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
  description: 'Mountain Lake Sailing',
 },
 {
  preview:
   'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
  original:
   'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
  description: 'Alpine Spring Meadows',
 },
 {
  preview:
   'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
  original:
   'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
  description: 'Nature Landscape',
 },
 {
  preview:
   'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
  original:
   'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
  description: 'Lighthouse Coast Sea',
 },
];

const refs = {
 galleryContainerRef: document.querySelector('.js-gallery'),
 modalWindowRef: document.querySelector('.lightbox'),
 closeModalBtnRef: document.querySelector('[data-action="close-lightbox"]'),
 lightboxImageRef: document.querySelector('.lightbox__image'),
 lightboxOverlayRef: document.querySelector('.lightbox__overlay'),
};

const galleryMarkup = createGalleryMarkup(galleryItems);
refs.galleryContainerRef.insertAdjacentHTML('beforeend', galleryMarkup);

function createGalleryMarkup(photos) {
 return photos
  .map(({ preview, original, description }) => {
   return `<li class="gallery__item">
    <a
     class="gallery__link"
     href="${original}"
    >
     <img
      class="gallery__image"
      src=${preview}
      data-source=${original}
      alt=${description}
     />
    </a>
   </li>`;
  })
  .join('');
}

refs.galleryContainerRef.addEventListener('click', onModalOpen);
function onModalOpen(e) {
 e.preventDefault();
 if (!e.target.classList.contains('gallery__image')) {
  return;
 }
 refs.modalWindowRef.classList.add('is-open');
 getImageAttributes(e.target.dataset.source, e.target.alt);
 window.addEventListener('keydown', onEscPress);
}

function getImageAttributes(src, alt) {
 refs.lightboxImageRef.src = src;
 refs.lightboxImageRef.alt = alt;
}

refs.closeModalBtnRef.addEventListener('click', onModalCLose);
function onModalCLose() {
 refs.modalWindowRef.classList.remove('is-open');
 getImageAttributes('', '');
 window.removeEventListener('keydown', onEscPress);
}

refs.lightboxOverlayRef.addEventListener('click', onOverlayClick);
function onOverlayClick() {
 onModalCLose();
}

function onEscPress(e) {
 if (e.code === 'ArrowRight') {
  onRightPress();
 }
 if (e.code === 'ArrowLeft') {
  onLeftPress();
 }
 if (e.code === 'Escape') {
  onModalCLose();
 }
}

function onRightPress() {
 const indexOfCurrentImage = galleryItems.findIndex(
  image => image.original === refs.lightboxImageRef.src,
 );
 if (indexOfCurrentImage !== galleryItems.length - 1) {
  refs.lightboxImageRef.src = galleryItems[indexOfCurrentImage + 1].original;
  refs.lightboxImageRef.alt = galleryItems[indexOfCurrentImage + 1].description;
 } else {
  refs.lightboxImageRef.src = galleryItems[0].original;
  refs.lightboxImageRef.alt = galleryItems[0].description;
 }
}

function onLeftPress() {
 const indexOfCurrentImage = galleryItems.findIndex(
  image => image.original === refs.lightboxImageRef.src,
 );
 if (indexOfCurrentImage !== 0) {
  refs.lightboxImageRef.src = galleryItems[indexOfCurrentImage - 1].original;
  refs.lightboxImageRef.alt = galleryItems[indexOfCurrentImage - 1].description;
 } else {
  refs.lightboxImageRef.src = galleryItems[galleryItems.length - 1].original;
  refs.lightboxImageRef.alt = galleryItems[galleryItems.length - 1].description;
 }
}
