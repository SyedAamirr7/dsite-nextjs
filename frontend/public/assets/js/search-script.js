// Start Active Tags Script
const activeTags = document.querySelectorAll(
  ".tab-content .tab-pane.tab_content"
);
const onlineContainer = document.querySelector("#image-upload-online-div");
const onlineImage = document.querySelector("#uploadImgOnline");
const uploadBtn = document.querySelector("#uploadBtn");
const removeUploadBtn = document.querySelector("#removeUploadBtn");
const closeSearch = document.querySelector(
  "#image-upload-online-div .close__search"
);

activeTags.forEach((tag) => {
  tag.addEventListener("click", () => {
    activeTags.forEach((tag) => {
      tag.classList.remove("active");
    });
    tag.classList.add("active");
  });
});

uploadBtn.addEventListener("click", (e) => {
  e.preventDefault();
  onlineContainer.classList.add("active");
  document.documentElement.style.overflow = "hidden";
});

removeUploadBtn.addEventListener("click", (e) => {
  e.preventDefault();
  onlineImage.src = "./assets/img/download.jpg";
});

closeSearch.addEventListener("click", () => {
  onlineContainer.classList.remove("active");
  document.documentElement.style.overflow = "";
});
// End Active Tags Script

// Start Search On Internet Script
const accessKey = "RaoSLWf3k8XpJetluT1QMGn_4nKCG-oBTdvda4NqujU";
const thumbnailImg = document.querySelectorAll("#thumbnails div img");
const selectedImageOnline = document.querySelector(
  ".tab-content .tab-pane #uploadImgOnline"
);
const searchText = document.getElementById("searchInput");
const searchBtn = document.querySelector(".searchBtn");

searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const query = searchText.value;
  const options = {
    cache: "force-cache",
  };
  if (query.trim() !== "") {
    fetch(
      `https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}&per_page=6`,
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
    ".page-content-wrapper #thumbnails img"
  );
  thumbnailsImage.forEach((item) => {
    item.addEventListener("click", () => {
      thumbnailsImage.forEach((item) => {
        item.classList.remove("active");
      });
      item.classList.add("active");
      onlineImage.src = item.src;
    });
  });
}
// End Search On Internet Script
