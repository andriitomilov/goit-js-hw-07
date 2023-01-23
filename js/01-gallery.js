import { galleryItems } from "./gallery-items.js";
// Change code below this line

// console.log(galleryItems);

{
  /* <div class="gallery__item">
  <a class="gallery__link" href="large-image.jpg">
    <img
      class="gallery__image"
      src="small-image.jpg"
      data-source="large-image.jpg"
      alt="Image description"
    />
  </a>
</div> */
}

const galleryContainer = document.querySelector(".gallery");

galleryContainer.insertAdjacentHTML(
  "beforeend",
  createGalleryMarkup(galleryItems)
);

galleryContainer.addEventListener("click", onGalleryContainerClick);

function createGalleryMarkup(array) {
  return array
    .map(
      ({ preview, original, description }) =>
        `<div class="gallery__item">
        <a class="gallery__link" href="${original}">
            <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
            />
        </a>
        </div>`
    )
    .join("");
}

function onGalleryContainerClick(e) {
  e.preventDefault();
  if (!e.target.classList.contains("gallery__image")) return;

  const modal = createModal(e.target.dataset.source);

  modal.show();
  window.addEventListener("keydown", onCloseModalByEscKeyClick);
}

function createModal(source) {
  const instance = basicLightbox.create(`
    <img src="${source}" width="1280">
    `);

  return instance;
}

function onCloseModalByEscKeyClick(e) {
  if (e.code === "Escape") modal.close();
  window.removeEventListener("keydown", onCloseModalByEscKeyClick);
}
