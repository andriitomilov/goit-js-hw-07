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

  createModal(e.target.dataset.source);
  // const modal = createModal(e.target.dataset.source);

  // bindEscKeyPressWithModal(modal);
  // modal.show(() => {
  //   window.addEventListener("keydown", modal.closeByEspKey);
  // });
}

function createModal(source) {
  const instance = basicLightbox.create(
    `
    <img src="${source}" width="1280">
    `,
    {
      onShow: (instance) => {
        // Close when hitting escape.
        document.onkeydown = function (evt) {
          evt = evt || window.event;
          let isEscape = false;
          if ("key" in evt) {
            isEscape = evt.key === "Escape" || evt.key === "Esc";
          } else {
            isEscape = evt.code === 27;
          }
          if (isEscape) {
            instance.close();
          }
        };
      },
    }
  );
  instance.show();

  // return instance;
}

// function onEscKeyPress(e) {
//   if (e.code === "Escape") {
//     window.removeEventListener("keydown", this.closeByEspKey);
//     return this.close();
//   }
// }

// function bindEscKeyPressWithModal(obj) {
//   obj.closeByEspKey = onEscKeyPress.bind(obj);
// }
