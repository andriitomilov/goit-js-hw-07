import { galleryItems } from "./gallery-items.js";
// Change code below this line

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

  bindEscKeyPressWithModal(modal);

  modal.show(() => {
    window.addEventListener("keydown", modal.closeByEspKey);
  });

}

function createModal(source) {
  const instance = basicLightbox.create(`
    <img src="${source}" width="1280">
    `);

  return instance;
}

function onEscKeyPress(e) {
  if (e.code === "Escape") {
    return this.close();
  }
}

function bindEscKeyPressWithModal(obj) {
  obj.closeByEspKey = onEscKeyPress.bind(obj);
}

