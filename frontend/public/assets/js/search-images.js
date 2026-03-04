// Start Active Tags Script
const activeTags = document.querySelectorAll(
  ".tab-content .tab-pane.tab_content"
);
activeTags.forEach((tag) => {
  tag.addEventListener("click", () => {
    activeTags.forEach((tag) => {
      tag.classList.remove("active");
    });
    tag.classList.add("active");
  });
});
// End Active Tags Script

// Start active picture
const imgPictures = document.querySelectorAll(
  ".page-content-wrapper #onlineImg #thumbnails picture"
);
imgPictures.forEach((item) => {
  item.addEventListener("click", () => {
    imgPictures.forEach((item) => {
      item.classList.remove("active");
    });
    item.classList.add("active");
  });
});
// End active picture

// Start Search On Internet Script
const accessKey = "RaoSLWf3k8XpJetluT1QMGn_4nKCG-oBTdvda4NqujU";
const thumbnailImg = document.querySelectorAll(
  "#onlineImg #thumbnails div img"
);
const searchInputImg = document.querySelector("#onlineImg #searchInput");
const searchBtnImg = document.querySelector("#onlineImg .searchBtn");

searchBtnImg.addEventListener("click", function (e) {
  e.preventDefault();
  const query = searchInputImg.value;
  const options = {
    cache: "force-cache",
  };
  if (query.trim() !== "") {
    fetch(
      `https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}&per_page=8`,
      options
    )
      .then((response) => response.json())
      .then((data) => {
        data.results.map((photo, index) => {
          // const thumbUrl = photo.urls.full;
          const thumbUrl = photo.urls.regular;
          thumbnailImg[index].src = thumbUrl;
        });
        imageHandler();
      })
      .catch((error) => console.error(error));
  }
});

function imageHandler() {
  const thumbnailsImage = document.querySelectorAll(
    ".page-content-wrapper #onlineImg #thumbnails img"
  );
  thumbnailsImage.forEach((item) => {
    item.addEventListener("click", () => {
      thumbnailsImage.forEach((item) => {
        item.classList.remove("active");
      });
      item.classList.add("active");
    });
  });
}
// End Search On Internet Script
