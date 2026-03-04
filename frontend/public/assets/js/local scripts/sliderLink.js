const sliderVideo = document.querySelector("#sliderVideo");
const sliderImg = document.querySelector("#sliderImg");
const selectLink = document.querySelector("#sliderType");

selectLink.addEventListener("change", () => {
  const selectValue = selectLink.value;
  if (selectValue == "sliderVideo") {
    sliderVideo.classList.remove("d-none");
    sliderImg.classList.add("d-none");
  } else {
    sliderVideo.classList.add("d-none");
    sliderImg.classList.remove("d-none");
  }
});
