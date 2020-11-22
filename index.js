import App from "./lib/App.js";
import API from "./lib/API.js";

const app = new App("#card-container");

const imageCard = (data) => `
    <div class="row">
        <h4 class="card-title col-8">Title: ${data.title}</h4>
        <a target="_blank" href="${data.url}">
            <img class="card-image col-4" src="${
              data.thumbnailUrl
            }" alt="Image placeholder" />
        </a>
    </div>
`;

app.addComponent({
  name: "images",
  model: {
    images: [],
    abbrImages: [],
    perPageImage: 3,
  },

  view(model) {
    return `
    <ul class="images">
        ${model.abbrImages
          .map((image) => `<div class="card">${imageCard(image)}</div>`)
          .join("")}
    </ul>
    `;
  },

  async controller(model) {
    // Handling a change in images per page
    const perPage = document.querySelector("#pages");
    perPage.addEventListener("change", (e) => {
      model.perPageImage = e.target.value;
      model.abbrImages = images.slice(0, model.perPageImage);
      app.updateView();
    });

    // Handling initial view of three images
    const images = await API.getImages();
    model.images = images;
    model.abbrImages = images.slice(0, model.perPageImage);
    app.updateView();
  },
});

app.showComponent("images");
