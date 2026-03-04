// Start Search Icons
const searchInputIcon = document.querySelector("#onlineIcons #searchInput");
const searchBtnIcons = document.querySelector("#onlineIcons .searchBtn");
const iconImgs = document.querySelectorAll("#onlineIcons #thumbnails img");
const bearerKey =
  "fZFSC6Xioex8Wd1MT4UIlYaKBiEQ1xEsKhGZxh8NCZMVyTdeA2uPkU4atlKvtJQC";
const images_count = 10;

// Search Button Action
searchBtnIcons.addEventListener("click", (e) => {
  try {
    e.preventDefault();
    fetchData();
  } catch (error) {
    console.log("Error:", error.message);
  }
});

// Start active picture
const iconsPictures = document.querySelectorAll(
  ".page-content-wrapper #onlineIcons #thumbnails picture"
);
iconsPictures.forEach((item) => {
  item.addEventListener("click", () => {
    iconsPictures.forEach((item) => {
      item.classList.remove("active");
    });
    item.classList.add("active");
  });
});
// End active picture

// Get Icons From FlatIcons
async function fetchData() {
  try {
    const urlApi = `https://iconfinder-api-auth.herokuapp.com/v4/icons/search?query=${searchInputIcon.value}&count=${images_count}`;
    const options = {
      cache: "force-cache",
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${bearerKey}`,
      },
    };
    const response = await fetch(urlApi, options);
    const data = await response.json();
    const apiData = data.icons;
    getData(apiData);
  } catch (error) {
    console.log(error.message);
  }
}

// Get Data From API
function getData(data) {
  data.map((item, index) => {
    if (item.raster_sizes[6]) {
      let resultData = item.raster_sizes[6].formats[0].preview_url;
      let resultTags = item.tags[0];

      iconImgs[index].src = resultData;
      iconImgs[index].alt = resultTags;
    } else {
      let resultData = item.raster_sizes[0].formats[0].preview_url;
      let resultTags = item.tags[0];
      iconImgs[index].src = resultData;
      iconImgs[index].alt = resultTags;
    }
  });
}
// End Search Icons
