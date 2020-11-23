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
    pageNum: 1,
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
    // Handling initial view of three images
    const images = await API.getImages();
    model.images = images;
    populatePage();
    app.updateView();

    // Handling page number clicks
    const buttonPush = document.querySelector(".pageLinks");
    buttonPush.addEventListener("click", (e) => {
      app.clearView();
      model.pageNum = parseInt(e.target.innerHTML);
      populatePage();
    });

    // Handling a change in images per page
    const perPage = document.querySelector("#pages");
    perPage.addEventListener("change", (e) => {
      model.perPageImage = parseInt(e.target.value);
      model.abbrImages = images.slice(0, model.perPageImage);
      app.updateView();
    });

    // Populate page based on current model
    function populatePage() {
      const { pageNum, perPageImage } = model;
      const sliceIndex = (pageNum - 1) * perPageImage;
      model.abbrImages = images.slice(sliceIndex, sliceIndex + perPageImage);
      app.updateView();
    }
  },
});

app.showComponent("images");
