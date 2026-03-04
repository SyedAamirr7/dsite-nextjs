// Update After Testing
// Checking Balance Section Image
document.addEventListener("DOMContentLoaded", function () {
  const balanceImgElement = document.querySelector(
    ".balance-section .balance-content .img-balance-container"
  );
  const balanceTextElement = document.querySelector(
    ".balance-section .balance-content .balance-text"
  );
  if (!balanceImgElement) {
    balanceTextElement.style.maxWidth = "100%";
  }

  // Set Shadow BUtton
  const readMoreBtn = document.querySelectorAll(".general__btn");
  readMoreBtn.forEach((btn) => {
    btn.addEventListener("mouseover", function () {
      btn.style.setProperty("--shadow-hover", `${btn.style.backgroundColor}`);
    });
    btn.style.setProperty("--shadow-hover", `${btn.style.backgroundColor}`);
  });
});

// Check if h1 is available in slider or not
const sliderTextH1 = document.querySelectorAll(
  ".slider-section .slider-text .slider-text-h1"
);
sliderTextH1.forEach((text) => {
  if (text.textContent.length > 0) {
    text.parentElement.classList.remove("not-available");
    text.parentElement.classList.add("available");
  } else {
    text.parentElement.classList.remove("available");
    text.parentElement.classList.add("not-available");
  }
});

const headerSection = document.querySelector(".header");
const sliderSection = document.querySelector(".slider-section");
const aboutSections = document.querySelector(".about-section");
const servicesSection = document.querySelector(".services-section");
const balanceSection = document.querySelector(".balance-section");
const productsSection = document.querySelector(".products-section");
const projectsSection = document.querySelector(".projects-section");
const portfoliosSection = document.querySelector(".portfolios-section");
const whySection = document.querySelector(".why-section");
const newsSection = document.querySelector(".news-section");
const showSection = document.querySelector(".show-section");
const branchesSection = document.querySelector(".branches-section");
const gallerySection = document.querySelector(".gallery-section");
const clientsSection = document.querySelector(".clients-section");
const appsSection = document.querySelector(".apps-section");
const teamSection = document.querySelector(".team-section");
const careersSection = document.querySelector(".careers-section");
const partnersSection = document.querySelector(".partners-section");
const plansSection = document.querySelector(".plans-section");
const contactsSection = document.querySelector(".contacts-section");
const footerSection = document.querySelector(".footer");
const sliderAddLabel = document.querySelector(
  ".slider-section .edit-part .change-edit-part .change-container .label-upload-file"
);
const aboutAddLabel = document.querySelector(
  ".about-section .edit-part .change-edit-part .change-container .label-upload-file"
);
const servicesAddLabel = document.querySelector(
  ".services-section .edit-part .change-edit-part .change-container .label-upload-file"
);
const balanceAddLabel = document.querySelector(
  ".balance-section .edit-part .change-edit-part .change-container .label-upload-file"
);
const productsAddLabel = document.querySelector(
  ".products-section .edit-part .change-edit-part .change-container .label-upload-file"
);
const projectsAddLabel = document.querySelector(
  ".projects-section .edit-part .change-edit-part .change-container .label-upload-file"
);
const portfoliosAddLabel = document.querySelector(
  ".portfolios-section .edit-part .change-edit-part .change-container .label-upload-file"
);
const whyAddLabel = document.querySelector(
  ".why-section .edit-part .change-edit-part .change-container .label-upload-file"
);
const newsAddLabel = document.querySelector(
  ".news-section .edit-part .change-edit-part .change-container .label-upload-file"
);
const showAddLabel = document.querySelector(
  ".show-section .edit-part .change-edit-part .change-container .label-upload-file"
);
const branchesAddLabel = document.querySelector(
  ".branches-section .edit-part .change-edit-part .change-container .label-upload-file"
);
const galleryAddLabel = document.querySelector(
  ".gallery-section .edit-part .change-edit-part .change-container .label-upload-file"
);
const clientsAddLabel = document.querySelector(
  ".clients-section .edit-part .change-edit-part .change-container .label-upload-file"
);
const appsAddLabel = document.querySelector(
  ".apps-section .edit-part .change-edit-part .change-container .label-upload-file"
);
const teamAddLabel = document.querySelector(
  ".team-section .edit-part .change-edit-part .change-container .label-upload-file"
);
const careersAddLabel = document.querySelector(
  ".careers-section .edit-part .change-edit-part .change-container .label-upload-file"
);
const partnersAddLabel = document.querySelector(
  ".partners-section .edit-part .change-edit-part .change-container .label-upload-file"
);
const plansAddLabel = document.querySelector(
  ".plans-section .edit-part .change-edit-part .change-container .label-upload-file"
);
const contactsAddLabel = document.querySelector(
  ".contacts-section .edit-part .change-edit-part .change-container .label-upload-file"
);
const footerAddLabel = document.querySelector(
  ".footer .edit-part .change-edit-part .change-container .label-upload-file"
);

const toggleBar = document.querySelector(".header nav .toggle-bars");
const openBarIcon = document.querySelector(
  ".header nav .toggle-bars .open-menu-icon"
);
const closeBarIcon = document.querySelector(
  ".header nav .toggle-bars .close-menu-icon"
);
const mainMenu = document.querySelector(".header nav .header-links");
const mainMenuLi = document.querySelectorAll(".header nav .header-links li a");

toggleBar.addEventListener("click", () => {
  mainMenu.classList.toggle("active");
  closeBarIcon.classList.toggle("active");
  openBarIcon.classList.toggle("active");
});
mainMenuLi.forEach((item) => {
  item.addEventListener("click", () => {
    mainMenu.classList.toggle("active");
    closeBarIcon.classList.toggle("active");
    openBarIcon.classList.toggle("active");
  });
});

// Start Header Links
const pageItem = document.querySelector(
  ".header nav .header-links .pages-span"
);
const dropdownPages = document.querySelector(".header .dropdown-pages");
const dropdownLi = document.querySelector(".header .dropdown-li");
if (pageItem) {
  pageItem.addEventListener("click", () => {
    dropdownPages.classList.toggle("active-page");
    dropdownLi.classList.toggle("active");
  });
}
// End Header Links

// Start Dots
// const dots = document.querySelectorAll(".slider-section .slider-dots > .dot");
// dots.forEach((dot) => {
//   dot.addEventListener("click", () => {
//     dots.forEach((dot) => {
//       dot.classList.remove("active");
//     });
//     dot.classList.add("active");
//   });
// });
// End Dots

// Start Header
if (headerSection) {
  // Start Header Color Change
  const selectedHeaderColor = document.querySelector(
    ".header .edit-part .change-edit-part .change-container .header-color-dropdown .select-color .selected-color"
  );
  const menuHeaderColors = document.querySelector(
    ".header .edit-part .change-edit-part .change-container .header-color-dropdown .menu-colors"
  );
  const selectedColorLi = document.querySelectorAll(
    ".header .edit-part .change-edit-part .change-container .header-color-dropdown .menu-colors > li"
  );
  const headerLinks = document.querySelectorAll(
      ".header nav .header-links > li a"
    ),
    headerLinksSpan = document.querySelector(
      ".header nav .header-links .pages-span"
    ),
    headerMenuIcon = document.querySelectorAll(
      ".header nav .toggle-bars .mobile-icon-header"
    );
  const dropdownMenuPages = document.querySelector(".header .dropdown-pages");
  const headerLinksNav = document.querySelector(".header nav .header-links");

  if (selectedHeaderColor) {
    headerLinks.forEach((item) => {
      item.style.color = selectedHeaderColor.style.backgroundColor;
    });
  }
  if (headerLinksSpan) {
    headerLinksSpan.style.color = selectedHeaderColor.style.backgroundColor;
    headerMenuIcon.forEach((item) => {
      item.style.color = selectedHeaderColor.style.backgroundColor;
    });
  }
  if (selectedHeaderColor) {
    selectedHeaderColor.addEventListener("click", () => {
      menuHeaderColors.classList.toggle("active-menu");
    });
  }
  if (selectedHeaderColor) {
    selectedColorLi.forEach((item) => {
      item.addEventListener("click", () => {
        menuHeaderColors.classList.toggle("active-menu");
        var infos = $(item).data("info").split(",");
        var data = {
          colorId: infos[0],
          websiteId: infos[1],
          key: infos[2].replace("'", "").replace("'", ""),
        };
        $.ajax({
          url: Base_Url + "/acp/liveupdation/change_HF_color",
          type: "POST",
          dataType: "JSON",
          data: data,
          success: function (result) {
            selectedHeaderColor.style.backgroundColor =
              item.style.backgroundColor;
            if (
              selectedHeaderColor.style.backgroundColor ==
                "rgb(255, 255, 255)" ||
              selectedHeaderColor.style.backgroundColor == "#fff"
            ) {
              if (dropdownMenuPages) {
                dropdownMenuPages.style.background = "#f5f5f5";
              }
            } else {
              if (dropdownMenuPages) {
                dropdownMenuPages.style.background = "#fff";
              }
            }
            if (
              selectedHeaderColor.style.backgroundColor ==
                "rgb(255, 255, 255)" ||
              selectedHeaderColor.style.backgroundColor == "#fff"
            ) {
              headerLinksNav.classList.add("active-color");
            } else {
              headerLinksNav.classList.remove("active-color");
            }
            headerLinks.forEach((item) => {
              item.style.color = selectedHeaderColor.style.backgroundColor;
            });
            if (headerLinksSpan) {
              headerLinksSpan.style.color =
                selectedHeaderColor.style.backgroundColor;
              headerMenuIcon.forEach((item) => {
                item.style.color = selectedHeaderColor.style.backgroundColor;
              });
            }
          },
        });
      });
    });
  }
  // End Header Color Change

  // Start Header Bg Change
  const selectedHeaderBg = document.querySelector(
    ".header .edit-part .change-edit-part .change-container .header-bg-dropdown .select-color .selected-color"
  );
  const menuHeaderBg = document.querySelector(
    ".header .edit-part .change-edit-part .change-container .header-bg-dropdown .menu-colors"
  );
  const selectedBgLi = document.querySelectorAll(
      ".header .edit-part .change-edit-part .change-container .header-bg-dropdown .menu-colors > li"
    ),
    dropdownMenuItems = document.querySelectorAll(
      ".header .dropdown-pages li a"
    ),
    headerLinksMobile = document.querySelector(".header nav .header-links");

  headerSection.style.background = selectedHeaderBg.style.backgroundColor;
  selectedHeaderBg.addEventListener("click", () => {
    menuHeaderBg.classList.toggle("active-menu");
  });
  selectedBgLi.forEach((item) => {
    item.addEventListener("click", () => {
      menuHeaderBg.classList.toggle("active-menu");
      var infos = $(item).data("info").split(",");
      var data = {
        colorId: infos[0],
        websiteId: infos[1],
        key: infos[2].replace("'", "").replace("'", ""),
      };
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_HF_color",
        type: "POST",
        dataType: "JSON",
        data: data,
        success: function (result) {
          selectedHeaderBg.style.backgroundColor = item.style.backgroundColor;
          headerSection.style.backgroundColor = item.style.backgroundColor;
          // if (item.getAttribute("data-color") == "transparent") {
          //   selectedHeaderBg.style.background = item.style.background;
          //   headerSection.style.background = "transparent";
          // } else {
          //   selectedHeaderBg.style.background = item.style.background;
          //   headerSection.style.background = item.style.background;
          // }
        },
      });
    });
  });
  // End Header Bg Change

  // Start Header Logo Change
  const headerLogoImg = document.querySelector(".header nav .logo a > img");
  const logoSelect = document.querySelector(
    ".header .edit-part .change-edit-part .change-container.change-header-logo ul"
  );
  const logoSelected = document.querySelector(
    ".header .edit-part .change-edit-part .change-container.change-header-logo .selected-color"
  );
  const logoSelectedImg = document.querySelector(
    ".header .edit-part .change-edit-part .change-container.change-header-logo .selected-color > img"
  );
  const logoOptions = document.querySelectorAll(
    ".header .edit-part .change-edit-part .change-container.change-header-logo ul > li"
  );
  logoSelected.addEventListener("click", () => {
    logoSelect.classList.toggle("active-menu");
    logoOptions.forEach((item) => {
      item.addEventListener("click", () => {
        var infos = $(item).data("info").split(",");
        var data = {
          key: infos[0],
          websiteId: infos[1],
          value: item.getAttribute("data-value"),
        };
        $.ajax({
          url: Base_Url + "/acp/liveupdation/change_logo_color",
          type: "POST",
          dataType: "JSON",
          data: data,
          success: function (result) {
            if (result == "1") {
              const logoSelectValue = item.getAttribute("data-value");
              switch (logoSelectValue) {
                case "dark":
                  logoOptions.forEach((item) => {
                    if (item.getAttribute("data-value") == "dark") {
                      headerLogoImg.src = item.getAttribute("data-src");
                      logoSelectedImg.src = item.getAttribute("data-src");
                      logoSelect.classList.remove("active-menu");
                    }
                  });
                  break;
                case "light":
                  logoOptions.forEach((item) => {
                    if (item.getAttribute("data-value") == "light") {
                      headerLogoImg.src = item.getAttribute("data-src");
                      logoSelectedImg.src = item.getAttribute("data-src");
                      logoSelect.classList.remove("active-menu");
                    }
                  });
                  break;
                case "white":
                  logoOptions.forEach((item) => {
                    if (item.getAttribute("data-value") == "white") {
                      headerLogoImg.src = item.getAttribute("data-src");
                      logoSelectedImg.src = item.getAttribute("data-src");
                      logoSelect.classList.remove("active-menu");
                    }
                  });
                  break;
              }
            }
          },
        });
      });
    });
  });
  // End Header Logo Change
}
// End Header

// Start Slider
if (sliderSection) {
  // Start Slider Title
  const sliderTitleColor = document.querySelector(
    ".slider-section .edit-part .change-edit-part .change-container .slider-title-dropdown .select-color .selected-color"
  );
  const sliderMenuColors = document.querySelector(
    ".slider-section .edit-part .change-edit-part .change-container .slider-title-dropdown .menu-colors"
  );
  const sliderMenuLi = document.querySelectorAll(
    ".slider-section .edit-part .change-edit-part .change-container .slider-title-dropdown .menu-colors > li"
  );
  const sliderTitle = document.querySelectorAll(
    ".slider-section .slider-text .slider-text-h1"
  );

  sliderTitle.forEach((item) => {
    item.style.color = sliderTitleColor.style.backgroundColor;
  });
  sliderTitleColor.addEventListener("click", () => {
    sliderMenuColors.classList.toggle("active-menu");
  });
  sliderMenuLi.forEach((item) => {
    item.addEventListener("click", () => {
      sliderMenuColors.classList.toggle("active-menu");
      var infos = $(item).data("info").split(",");
      var data = {
        colorId: infos[1],
        mainId: infos[0],
        type: infos[3],
        ColId: infos[4],
      };
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_color",
        type: "POST",
        dataType: "JSON",
        data: data,
        success: function (result) {
          if (result == "1") {
            sliderTitleColor.style.backgroundColor = item.style.backgroundColor;
            sliderTitle.forEach((item) => {
              item.style.color = sliderTitleColor.style.backgroundColor;
            });
          }
        },
      });
    });
  });
  // Start Slider Title

  // Start Slider Subtitle
  const sliderSubtitleColor = document.querySelector(
    ".slider-section .edit-part .change-edit-part .change-container .slider-subtitle-dropdown .select-color .selected-color"
  );
  const sliderSubtitleMenuColors = document.querySelector(
    ".slider-section .edit-part .change-edit-part .change-container .slider-subtitle-dropdown .menu-colors"
  );
  const sliderSubtitleMenuLi = document.querySelectorAll(
    ".slider-section .edit-part .change-edit-part .change-container .slider-subtitle-dropdown .menu-colors > li"
  );
  const sliderSubtitle = document.querySelectorAll(
    ".slider-section .slider-text .slider-text-h2"
  );
  const sliderButtonClr = document.querySelectorAll(
    ".slider-section .slider-text .slider-text-btn"
  );
  if (sliderButtonClr) {
    sliderButtonClr.forEach((item) => {
      item.style.color = sliderSubtitleColor.style.backgroundColor;
    });
  }
  sliderSubtitle.forEach((item) => {
    item.style.color = sliderSubtitleColor.style.backgroundColor;
  });
  sliderSubtitleColor.addEventListener("click", () => {
    sliderSubtitleMenuColors.classList.toggle("active-menu");
  });
  sliderSubtitleMenuLi.forEach((item) => {
    item.addEventListener("click", () => {
      sliderSubtitleMenuColors.classList.toggle("active-menu");
      var infos = $(item).data("info").split(",");
      var data = {
        colorId: infos[1],
        mainId: infos[0],
        type: infos[3],
        ColId: infos[4],
      };
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_color",
        type: "POST",
        dataType: "JSON",
        data: data,
        success: function (result) {
          if (result == "1") {
            sliderSubtitleColor.style.backgroundColor =
              item.style.backgroundColor;
            sliderSubtitle.forEach((item) => {
              item.style.color = sliderSubtitleColor.style.backgroundColor;
            });
            if (sliderButtonClr) {
              sliderButtonClr.forEach((item) => {
                item.style.color = sliderSubtitleColor.style.backgroundColor;
              });
            }
          }
        },
      });
    });
  });
  // Start Slider Subtitle

  // Start Slider Paragraph
  const sliderParagraphColor = document.querySelector(
    ".edit-part .change-edit-part .change-container .slider-paragraph-dropdown .select-color .selected-color"
  );
  const sliderParagraphMenuColors = document.querySelector(
    ".edit-part .change-edit-part .change-container .slider-paragraph-dropdown .menu-colors"
  );
  const sliderParagraphMenuLi = document.querySelectorAll(
    ".edit-part .change-edit-part .change-container .slider-paragraph-dropdown .menu-colors > li"
  );
  const sliderParagraph = document.querySelectorAll(
    ".slider-section .slider-text .slider-text-p"
  );

  sliderParagraph.forEach((item) => {
    item.style.color = sliderParagraphColor.style.backgroundColor;
  });
  sliderParagraphColor.addEventListener("click", () => {
    sliderParagraphMenuColors.classList.toggle("active-menu");
  });
  sliderParagraphMenuLi.forEach((item) => {
    item.addEventListener("click", () => {
      sliderParagraphMenuColors.classList.toggle("active-menu");
      var infos = $(item).data("info").split(",");
      var data = {
        colorId: infos[1],
        mainId: infos[0],
        type: infos[3],
        ColId: infos[4],
      };
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_color",
        type: "POST",
        dataType: "JSON",
        data: data,
        success: function (result) {
          if (result == "1") {
            sliderParagraphColor.style.backgroundColor =
              item.style.backgroundColor;
            sliderParagraph.forEach((item) => {
              item.style.color = sliderParagraphColor.style.backgroundColor;
            });
          }
        },
      });
    });
  });
  // Start Slider Paragraph

  // Start Slider Button
  const sliderButtonColor = document.querySelector(
    ".edit-part .change-edit-part .change-container .slider-button-dropdown .select-color .selected-color"
  );
  const sliderButtonMenuColors = document.querySelector(
    ".edit-part .change-edit-part .change-container .slider-button-dropdown .menu-colors"
  );
  const sliderButtonMenuLi = document.querySelectorAll(
    ".edit-part .change-edit-part .change-container .slider-button-dropdown .menu-colors > li"
  );
  const sliderButton = document.querySelectorAll(
    ".slider-section .slider-text .slider-text-btn"
  );
  if (sliderButton) {
    sliderButton.forEach((item) => {
      item.style.background = sliderButtonColor.style.backgroundColor;
      item.style.opacity = "1";
    });
    sliderButtonColor.addEventListener("click", () => {
      sliderButtonMenuColors.classList.toggle("active-menu");
    });
    sliderButtonMenuLi.forEach((item) => {
      item.addEventListener("click", () => {
        sliderButtonMenuColors.classList.toggle("active-menu");
        var infos = $(item).data("info").split(",");
        var data = {
          colorId: infos[1],
          mainId: infos[0],
          type: infos[3],
          ColId: infos[4],
        };
        $.ajax({
          url: Base_Url + "/acp/liveupdation/change_color",
          type: "POST",
          dataType: "JSON",
          data: data,
          success: function (result) {
            if (result == "1") {
              sliderButtonColor.style.backgroundColor =
                item.style.backgroundColor;
              sliderButton.forEach((item) => {
                item.style.background = sliderButtonColor.style.backgroundColor;
                item.style.opacity = "1";
              });
            }
          },
        });
      });
    });
  }
  // Start Slider Button

  // Start Slider Background
  const sliderBgColor = document.querySelector(
    ".edit-part .change-edit-part .change-container .slider-background-dropdown .select-color .selected-color"
  );
  const sliderBgMenuColors = document.querySelector(
    ".edit-part .change-edit-part .change-container .slider-background-dropdown .menu-colors"
  );
  const sliderBgMenuLi = document.querySelectorAll(
    ".edit-part .change-edit-part .change-container .slider-background-dropdown .menu-colors > li"
  );
  const sliderSectionsVideo = document.querySelectorAll(".slider-section");
  const sliderBg = document.querySelectorAll(".slider-section .slides .slide");

  sliderBg.forEach((bg) => {
    const hasBgImage = bg.style.backgroundImage !== "";
    const hasVideo = sliderSection.querySelector("video");

    if (hasBgImage) {
      // If background image exists, keep it
      bg.style.backgroundColor = "";
    } else if (hasVideo) {
      bg.style.backgroundColor = "";
    } else {
      // Otherwise, show the background color.
      bg.style.background = sliderBgColor.style.backgroundColor;
    }
  });

  // sliderBg.forEach((item) => {
  //   item.style.background = sliderBgColor.style.backgroundColor;
  // });
  sliderBgColor.addEventListener("click", () => {
    sliderBgMenuColors.classList.toggle("active-menu");
  });
  sliderBgMenuLi.forEach((item) => {
    item.addEventListener("click", () => {
      sliderBgMenuColors.classList.toggle("active-menu");
      var infos = $(item).data("info").split(",");
      var data = {
        colorId: infos[1],
        mainId: infos[0],
        type: infos[3],
        ColId: infos[4],
      };
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_color",
        type: "POST",
        dataType: "JSON",
        data: data,
        success: function (result) {
          if (result == "1") {
            sliderBgColor.style.backgroundColor = item.style.backgroundColor;
            sliderBg.forEach((item) => {
              item.style.background = sliderBgColor.style.backgroundColor;
            });
          }
        },
      });
    });
  });
}
// End Slider

// Start About
if (aboutSections) {
  // About Logo
  const AboutLogoImg = document.querySelector(
    "#about > div.container > div > div.about-info > div > a > img"
  );
  const AboutlogoSelect = document.querySelector(
    ".about-section .edit-part .change-edit-part .change-container.change-header-logo ul"
  );
  const AboutlogoSelected = document.querySelector(
    ".about-section .edit-part .change-edit-part .change-container.change-header-logo .selected-color"
  );
  const AboutlogoSelectedImg = document.querySelector(
    ".about-section .edit-part .change-edit-part .change-container.change-header-logo .selected-color > img"
  );
  const AboutlogoOptions = document.querySelectorAll(
    ".about-section .edit-part .change-edit-part .change-container.change-header-logo ul > li"
  );
  AboutlogoSelected.addEventListener("click", () => {
    AboutlogoSelect.classList.toggle("active-menu");
    AboutlogoOptions.forEach((item) => {
      item.addEventListener("click", () => {
        var infos = $(item).data("info").split(",");
        var data = {
          key: infos[0],
          websiteId: infos[1],
          value: item.getAttribute("data-value"),
        };
        $.ajax({
          url: Base_Url + "/acp/liveupdation/change_about_logo",
          type: "POST",
          dataType: "JSON",
          data: data,
          success: function (result) {
            if (result == "1") {
              const logoSelectValue = item.getAttribute("data-value");
              switch (logoSelectValue) {
                case "dark":
                  AboutlogoOptions.forEach((item) => {
                    if (item.getAttribute("data-value") == "dark") {
                      AboutLogoImg.parentElement.parentElement.style.display =
                        "";
                      AboutLogoImg.src = item.getAttribute("data-src");
                      AboutlogoSelectedImg.src = item.getAttribute("data-src");
                      AboutlogoSelect.classList.remove("active-menu");
                    }
                  });
                  break;
                case "logo":
                  AboutlogoOptions.forEach((item) => {
                    if (item.getAttribute("data-value") == "logo") {
                      AboutLogoImg.parentElement.parentElement.style.display =
                        "";
                      AboutLogoImg.src = item.getAttribute("data-src");
                      AboutlogoSelectedImg.src = item.getAttribute("data-src");
                      AboutlogoSelect.classList.remove("active-menu");
                    }
                  });
                  break;
                case "custom":
                  AboutlogoOptions.forEach((item) => {
                    if (item.getAttribute("data-value") == "custom") {
                      AboutLogoImg.parentElement.parentElement.style.display =
                        "";
                      AboutLogoImg.src = item.getAttribute("data-src");
                      AboutlogoSelectedImg.src = item.getAttribute("data-src");
                      AboutlogoSelect.classList.remove("active-menu");
                    }
                  });
                  break;
                case "off":
                  AboutlogoOptions.forEach((item) => {
                    if (item.getAttribute("data-value") == "off") {
                      AboutLogoImg.parentElement.parentElement.style.display =
                        "none";
                      // LogoImg.src = item.getAttribute("data-src");
                      AboutlogoSelectedImg.src = item.getAttribute("data-src");
                      AboutlogoSelect.classList.remove("active-menu");
                    }
                  });
              }
            }
          },
        });
      });
    });
  });
  // End About Logo

  // Start About Title
  const aboutTitleColor = document.querySelector(
    ".about-section .edit-part .change-edit-part .change-container .about-title-dropdown .select-color .selected-color"
  );
  const aboutMenuColors = document.querySelector(
    ".about-section .edit-part .change-edit-part .change-container .about-title-dropdown .menu-colors"
  );
  const aboutMenuLi = document.querySelectorAll(
    ".about-section .edit-part .change-edit-part .change-container .about-title-dropdown .menu-colors > li"
  );
  const aboutTitle = document.querySelector(
    ".about-section .about-content .about-info .about-text h1"
  );

  aboutTitle.style.color = aboutTitleColor.style.backgroundColor;
  aboutTitleColor.addEventListener("click", () => {
    aboutMenuColors.classList.toggle("active-menu");
  });
  aboutMenuLi.forEach((item) => {
    item.addEventListener("click", () => {
      aboutMenuColors.classList.toggle("active-menu");
      var infos = $(item).data("info").split(",");
      console.log(infos);
      var data = {
        colorId: infos[1],
        mainId: infos[0],
        type: infos[3],
        ColId: infos[4],
      };
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_color",
        type: "POST",
        dataType: "JSON",
        data: data,
        success: function (result) {
          if (result == "1") {
            aboutTitleColor.style.backgroundColor = item.style.backgroundColor;
            aboutTitle.style.color = aboutTitleColor.style.backgroundColor;
          }
        },
      });
    });
  });
  // End About Title

  // Start About Subtitle
  const aboutSubtitleColor = document.querySelector(
    ".about-section .edit-part .change-edit-part .change-container .about-subtitle-dropdown .select-color .selected-color"
  );
  const aboutSubtitleMenuColors = document.querySelector(
    ".about-section .edit-part .change-edit-part .change-container .about-subtitle-dropdown .menu-colors"
  );
  const aboutSubtitleMenuLi = document.querySelectorAll(
    ".about-section .edit-part .change-edit-part .change-container .about-subtitle-dropdown .menu-colors > li"
  );

  // const aboutNumbers = document.querySelectorAll(
  //     ".about-section .about-content .about-statistics .statistic > h1"
  //   );
  const aboutSubtitle = document.querySelectorAll(
    ".about-section .about-content .about-statistics .statistic > h2"
  );

  aboutSubtitle.forEach((item) => {
    item.style.color = aboutSubtitleColor.style.backgroundColor;
  });
  aboutSubtitleColor.addEventListener("click", () => {
    aboutSubtitleMenuColors.classList.toggle("active-menu");
  });
  aboutSubtitleMenuLi.forEach((item) => {
    item.addEventListener("click", () => {
      aboutSubtitleMenuColors.classList.toggle("active-menu");
      var infos = $(item).data("info").split(",");
      var data = {
        colorId: infos[1],
        mainId: infos[0],
        type: infos[3],
        ColId: infos[4],
      };
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_color",
        type: "POST",
        dataType: "JSON",
        data: data,
        success: function (result) {
          if (result == "1") {
            aboutSubtitleColor.style.backgroundColor =
              item.style.backgroundColor;
            aboutSubtitle.forEach((item) => {
              item.style.color = aboutSubtitleColor.style.backgroundColor;
            });
          }
        },
      });
    });
  });
  // End About Subtitle

  // Start About Paragraph
  const aboutParagraphColor = document.querySelector(
    ".about-section .edit-part .change-edit-part .change-container .about-paragraph-dropdown .select-color .selected-color"
  );
  const aboutParagraphMenuColors = document.querySelector(
    ".about-section .edit-part .change-edit-part .change-container .about-paragraph-dropdown .menu-colors"
  );
  const aboutParagraphMenuLi = document.querySelectorAll(
    ".about-section .edit-part .change-edit-part .change-container .about-paragraph-dropdown .menu-colors > li"
  );
  const aboutParagraph = document.querySelector(
    ".about-section .about-content .about-info .about-text p"
  );

  // const aboutButton = document.querySelector(
  //   ".about-section .about-content .read-more.general-btn .read-more-btn"
  // );
  // if (aboutButton) {
  //   aboutButton.style.color = aboutParagraphColor.style.backgroundColor;
  // }
  aboutParagraph.style.color = aboutParagraphColor.style.backgroundColor;
  aboutParagraphColor.addEventListener("click", () => {
    aboutParagraphMenuColors.classList.toggle("active-menu");
  });
  aboutParagraphMenuLi.forEach((item) => {
    item.addEventListener("click", () => {
      aboutParagraphMenuColors.classList.toggle("active-menu");
      var infos = $(item).data("info").split(",");
      var data = {
        colorId: infos[1],
        mainId: infos[0],
        type: infos[3],
        ColId: infos[4],
      };
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_color",
        type: "POST",
        dataType: "JSON",
        data: data,
        success: function (result) {
          if (result == "1") {
            aboutParagraphColor.style.backgroundColor =
              item.style.backgroundColor;
            aboutParagraph.style.color =
              aboutParagraphColor.style.backgroundColor;
            // if (aboutButton) {
            //   aboutButton.style.color = aboutParagraphColor.style.backgroundColor;
            // }
          }
        },
      });
    });
  });
  // End About Paragraph

  // Start About Button BG
  const aboutButtonBgSelected = document.querySelector(
    ".about-section .edit-part .change-edit-part .change-container .about-button-bg-dropdown .select-color .selected-color"
  );
  const aboutButtonBgMenuColors = document.querySelector(
    ".about-section .edit-part .change-edit-part .change-container .about-button-bg-dropdown .menu-colors"
  );
  const aboutButtonBgMenuLi = document.querySelectorAll(
    ".about-section .edit-part .change-edit-part .change-container .about-button-bg-dropdown .menu-colors > li"
  );
  const aboutButtonBg = document.querySelector(
    ".about-section .about-content .read-more.general-btn .read-more-btn"
  );
  const aboutNumbers = document.querySelectorAll(
    ".about-section .about-content .about-statistics .statistic > h1"
  );

  if (aboutButtonBg) {
    aboutNumbers.forEach((item) => {
      item.style.color = aboutButtonBgSelected.style.backgroundColor;
    });
    aboutButtonBg.style.backgroundColor =
      aboutButtonBgSelected.style.backgroundColor;
    aboutButtonBgSelected.addEventListener("click", () => {
      aboutButtonBgMenuColors.classList.toggle("active-menu");
    });
    aboutButtonBgMenuLi.forEach((item) => {
      item.addEventListener("click", () => {
        aboutButtonBgMenuColors.classList.toggle("active-menu");
        var infos = $(item).data("info").split(",");
        var data = {
          colorId: infos[1],
          mainId: infos[0],
          type: infos[3],
          ColId: infos[4],
        };
        $.ajax({
          url: Base_Url + "/acp/liveupdation/change_color",
          type: "POST",
          dataType: "JSON",
          data: data,
          success: function (result) {
            if (result == "1") {
              aboutButtonBgSelected.style.backgroundColor =
                item.style.backgroundColor;
              aboutButtonBg.style.backgroundColor =
                aboutButtonBgSelected.style.backgroundColor;
              aboutNumbers.forEach((item) => {
                item.style.color = aboutButtonBgSelected.style.backgroundColor;
              });
            }
          },
        });
      });
    });
  }
  // End About Button BG

  // Start About Background
  const aboutBgColor = document.querySelector(
    ".about-section .edit-part .change-edit-part .change-container .about-background-dropdown .select-color .selected-color"
  );
  const aboutBgMenuColors = document.querySelector(
    ".about-section .edit-part .change-edit-part .change-container .about-background-dropdown .menu-colors"
  );
  const aboutBgMenuLi = document.querySelectorAll(
    ".about-section .edit-part .change-edit-part .change-container .about-background-dropdown .menu-colors > li"
  );
  const aboutBg = document.querySelector(".about-section");

  const AbouthasBgImage = aboutSections.style.backgroundImage !== "";

  if (AbouthasBgImage) {
    aboutBg.style.background =
      aboutSections.style.backgroundImage +
      ", " +
      aboutBgColor.style.backgroundColor;
  } else {
    // Otherwise, show the background color.
    aboutBg.style.background = aboutBgColor.style.backgroundColor;
  }
  // aboutBg.style.background = aboutSections.style + ';' + aboutBgColor.style.backgroundColor;
  aboutBgColor.addEventListener("click", () => {
    aboutBgMenuColors.classList.toggle("active-menu");
  });
  aboutBgMenuLi.forEach((item) => {
    item.addEventListener("click", () => {
      aboutBgMenuColors.classList.toggle("active-menu");
      var infos = $(item).data("info").split(",");
      var data = {
        colorId: infos[1],
        mainId: infos[0],
        type: infos[3],
        ColId: infos[4],
      };
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_color",
        type: "POST",
        dataType: "JSON",
        data: data,
        success: function (result) {
          if (result == "1") {
            aboutBgColor.style.backgroundColor = item.style.backgroundColor;
            aboutBg.style.background = aboutBgColor.style.backgroundColor;
          }
        },
      });
    });
  });
  // End About Background

  // Start About Upload Background Image
  const aboutBackgroundImage = document.querySelector(".about-section");
  const aboutBackgroundImageInput = document.querySelector(
    ".about-section .edit-part .about-background-image"
  );
  aboutBackgroundImageInput.addEventListener("change", () => {
    var fd = new FormData();
    var files = aboutBackgroundImageInput.files;
    var mainId = $(aboutBackgroundImageInput).data("info");
    // Check file selected or not
    if (files.length > 0) {
      fd.append("Section_Image", files[0]);
      fd.append("id", mainId);
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_bg_img",
        type: "post",
        data: fd,
        contentType: false,
        processData: false,
        success: function (response) {
          if (response == "1") {
            aboutBackgroundImage.style.backgroundImage =
              "url(" +
              URL.createObjectURL(aboutBackgroundImageInput.files[0]) +
              ")";
            aboutBackgroundImage.style.backgroundPosition = "center";
            aboutBackgroundImage.style.backgroundRepeat = "no-repeat";
            aboutBackgroundImage.style.backgroundSize = "cover";
            aboutAddLabel.style.backgroundImage =
              "url(" +
              URL.createObjectURL(aboutBackgroundImageInput.files[0]) +
              ")";
          }
        },
      });
    }
  });
  // End About Upload Background Image

  // Start About Remove Background Image
  const aboutBackgroundImageRemove = document.querySelector(
    ".about-section .edit-part .label-remove-file"
  );
  aboutBackgroundImageRemove.addEventListener("click", () => {
    var data = {
      mainId: $(aboutBackgroundImageRemove).data("info"),
    };
    $.ajax({
      url: Base_Url + "/acp/liveupdation/bg_img_remove",
      type: "POST",
      dataType: "JSON",
      data: data,
      success: function (result) {
        aboutBackgroundImage.style.backgroundImage = "";
        aboutBackgroundImage.style.backgroundPosition = "";
        aboutBackgroundImage.style.backgroundRepeat = "";
        aboutBackgroundImage.style.backgroundSize = "";
        aboutAddLabel.style.backgroundImage = "";
        aboutBg.style.background = aboutBgColor.style.backgroundColor;
      },
    });
  });
  // End About Remove Background Image
}
// End About

// Start Services
if (servicesSection) {
  // Start Services Title
  const servicesTitleColor = document.querySelector(
    ".services-section .edit-part .change-edit-part .change-container .services-title-dropdown .select-color .selected-color"
  );
  const servicesMenuColors = document.querySelector(
    ".services-section .edit-part .change-edit-part .change-container .services-title-dropdown .menu-colors"
  );
  const servicesMenuLi = document.querySelectorAll(
    ".services-section .edit-part .change-edit-part .change-container .services-title-dropdown .menu-colors > li"
  );
  const servicesTitle = document.querySelector(
    ".services-section .title-section > h1"
  );

  servicesTitle.style.color = servicesTitleColor.style.backgroundColor;
  servicesTitleColor.addEventListener("click", () => {
    servicesMenuColors.classList.toggle("active-menu");
  });
  servicesMenuLi.forEach((item) => {
    item.addEventListener("click", () => {
      servicesMenuColors.classList.toggle("active-menu");
      var infos = $(item).data("info").split(",");
      var data = {
        colorId: infos[1],
        mainId: infos[0],
        type: infos[3],
        ColId: infos[4],
      };
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_color",
        type: "POST",
        dataType: "JSON",
        data: data,
        success: function (result) {
          if (result == "1") {
            servicesTitleColor.style.backgroundColor =
              item.style.backgroundColor;
            servicesTitle.style.color =
              servicesTitleColor.style.backgroundColor;
          }
        },
      });
    });
  });
  // End Services Title

  // Start Services Subtitle
  const servicesSubtitleColor = document.querySelector(
    ".services-section .edit-part .change-edit-part .change-container .services-subtitle-dropdown .select-color .selected-color"
  );
  const servicesSubtitleMenuColors = document.querySelector(
    ".services-section .edit-part .change-edit-part .change-container .services-subtitle-dropdown .menu-colors"
  );
  const servicesSubtitleMenuLi = document.querySelectorAll(
    ".services-section .edit-part .change-edit-part .change-container .services-subtitle-dropdown .menu-colors > li"
  );
  const servicesSubtitle = document.querySelectorAll(
    ".services-section .services-content .cards .card .img-title__container > h2"
  );
  const servicesSubtitle2 = document.querySelectorAll(
    ".services-section .services-content .cards .card .title-description__container > h2"
  );

  servicesSubtitle.forEach((item) => {
    item.style.color = servicesSubtitleColor.style.backgroundColor;
  });
  servicesSubtitle2.forEach((item) => {
    item.style.color = servicesSubtitleColor.style.backgroundColor;
  });
  servicesSubtitleColor.addEventListener("click", () => {
    servicesSubtitleMenuColors.classList.toggle("active-menu");
  });
  servicesSubtitleMenuLi.forEach((item) => {
    item.addEventListener("click", () => {
      servicesSubtitleMenuColors.classList.toggle("active-menu");
      var infos = $(item).data("info").split(",");
      var data = {
        colorId: infos[1],
        mainId: infos[0],
        type: infos[3],
        ColId: infos[4],
      };
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_color",
        type: "POST",
        dataType: "JSON",
        data: data,
        success: function (result) {
          if (result == "1") {
            servicesSubtitleColor.style.backgroundColor =
              item.style.backgroundColor;
            servicesSubtitle.forEach((item) => {
              item.style.color = servicesSubtitleColor.style.backgroundColor;
            });
            servicesSubtitle2.forEach((item) => {
              item.style.color = servicesSubtitleColor.style.backgroundColor;
            });
          }
        },
      });
    });
  });
  // End Services Subtitle

  // Start Services Paragraph
  const servicesParagraphColor = document.querySelector(
    ".services-section .edit-part .change-edit-part .change-container .services-paragraph-dropdown .select-color .selected-color"
  );
  const servicesParagraphMenuColors = document.querySelector(
    ".services-section .edit-part .change-edit-part .change-container .services-paragraph-dropdown .menu-colors"
  );
  const servicesParagraphMenuLi = document.querySelectorAll(
    ".services-section .edit-part .change-edit-part .change-container .services-paragraph-dropdown .menu-colors > li"
  );
  const servicesParagraph = document.querySelectorAll(
    ".services-section .services-content .cards .card .title-description__container > p"
  );
  // const servicesSubParagraph = document.querySelector(
  //   ".services-section .title-section > p"
  // );

  servicesParagraph.forEach((item) => {
    item.style.color = servicesParagraphColor.style.backgroundColor;
  });
  // servicesSubParagraph.style.color =
  //   servicesParagraphColor.style.backgroundColor;
  servicesParagraphColor.addEventListener("click", () => {
    servicesParagraphMenuColors.classList.toggle("active-menu");
  });
  servicesParagraphMenuLi.forEach((item) => {
    item.addEventListener("click", () => {
      servicesParagraphMenuColors.classList.toggle("active-menu");
      var infos = $(item).data("info").split(",");
      var data = {
        colorId: infos[1],
        mainId: infos[0],
        type: infos[3],
        ColId: infos[4],
      };
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_color",
        type: "POST",
        dataType: "JSON",
        data: data,
        success: function (result) {
          if (result == "1") {
            servicesParagraphColor.style.backgroundColor =
              item.style.backgroundColor;
            servicesParagraph.forEach((item) => {
              item.style.color = servicesParagraphColor.style.backgroundColor;
            });
            // servicesSubParagraph.style.color =
            //   servicesParagraphColor.style.backgroundColor;
          }
        },
      });
    });
  });
  // End Services Paragraph

  // Start Services button
  const servicesButtonColor = document.querySelector(
    ".services-section .edit-part .change-edit-part .change-container .services-button-dropdown .select-color .selected-color"
  );
  const servicesButtonMenuColors = document.querySelector(
    ".services-section .edit-part .change-edit-part .change-container .services-button-dropdown .menu-colors"
  );
  const servicesButtonMenuLi = document.querySelectorAll(
    ".services-section .edit-part .change-edit-part .change-container .services-button-dropdown .menu-colors > li"
  );
  const servicesButton = document.querySelectorAll(
    ".services-section .services-content .cards .card .title-description__container .service-card__icon > i"
  );
  // const servicesSubParagraph = document.querySelector(
  //   ".services-section .title-section > p"
  // );

  servicesButton.forEach((item) => {
    item.style.color = servicesButtonColor.style.backgroundColor;
  });
  // servicesSubParagraph.style.color =
  //   servicesParagraphColor.style.backgroundColor;
  servicesButtonColor.addEventListener("click", () => {
    servicesButtonMenuColors.classList.toggle("active-menu");
  });
  servicesButtonMenuLi.forEach((item) => {
    item.addEventListener("click", () => {
      servicesButtonMenuColors.classList.toggle("active-menu");
      var infos = $(item).data("info").split(",");
      var data = {
        colorId: infos[1],
        mainId: infos[0],
        type: infos[3],
        ColId: infos[4],
      };
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_color",
        type: "POST",
        dataType: "JSON",
        data: data,
        success: function (result) {
          if (result == "1") {
            servicesButtonColor.style.backgroundColor =
              item.style.backgroundColor;
            servicesButton.forEach((item) => {
              item.style.color = servicesButtonColor.style.backgroundColor;
            });
            // servicesSubParagraph.style.color =
            //   servicesParagraphColor.style.backgroundColor;
          }
        },
      });
    });
  });
  // End Services button

  // Start Services Background
  const servicesBgColor = document.querySelector(
    ".services-section .edit-part .change-edit-part .change-container .services-background-dropdown .select-color .selected-color"
  );
  const servicesBgMenuColors = document.querySelector(
    ".services-section .edit-part .change-edit-part .change-container .services-background-dropdown .menu-colors"
  );
  const servicesBgMenuLi = document.querySelectorAll(
    ".services-section .edit-part .change-edit-part .change-container .services-background-dropdown .menu-colors > li"
  );
  const servicesBg = document.querySelector(".services-section");

  const ServiceshasBgImage = servicesSection.style.backgroundImage !== "";

  if (ServiceshasBgImage) {
    servicesBg.style.background =
      servicesSection.style.backgroundImage +
      ", " +
      servicesBgColor.style.backgroundColor;
  } else {
    // Otherwise, show the background color.
    servicesBg.style.background = servicesBgColor.style.backgroundColor;
  }

  // servicesBg.style.background = servicesSection.style +';'+servicesBgColor.style.backgroundColor;
  servicesBgColor.addEventListener("click", () => {
    servicesBgMenuColors.classList.toggle("active-menu");
  });
  servicesBgMenuLi.forEach((item) => {
    item.addEventListener("click", () => {
      servicesBgMenuColors.classList.toggle("active-menu");
      var infos = $(item).data("info").split(",");
      var data = {
        colorId: infos[1],
        mainId: infos[0],
        type: infos[3],
        ColId: infos[4],
      };
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_color",
        type: "POST",
        dataType: "JSON",
        data: data,
        success: function (result) {
          if (result == "1") {
            servicesBgColor.style.backgroundColor = item.style.backgroundColor;
            servicesBg.style.background = servicesBgColor.style.backgroundColor;
          }
        },
      });
    });
  });
  // End Services Background

  // Start Services Upload Background Image
  const servicesBackgroundImage = document.querySelector(".services-section");
  const servicesBackgroundImageInput = document.querySelector(
    ".services-section .edit-part .services-background-image"
  );
  servicesBackgroundImageInput.addEventListener("change", () => {
    var fd = new FormData();
    var files = servicesBackgroundImageInput.files;

    var mainId = $(servicesBackgroundImageInput).data("info");
    // Check file selected or not
    if (files.length > 0) {
      fd.append("Section_Image", files[0]);
      fd.append("id", mainId);
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_bg_img",
        type: "post",
        data: fd,
        contentType: false,
        processData: false,
        success: function (response) {
          if (response == "1") {
            servicesBackgroundImage.style.backgroundImage =
              "url(" +
              URL.createObjectURL(servicesBackgroundImageInput.files[0]) +
              ")";
            servicesBackgroundImage.style.backgroundPosition = "center";
            servicesBackgroundImage.style.backgroundRepeat = "no-repeat";
            servicesBackgroundImage.style.backgroundSize = "cover";
            servicesAddLabel.style.backgroundImage =
              "url(" +
              URL.createObjectURL(servicesBackgroundImageInput.files[0]) +
              ")";
          }
        },
      });
    }
  });
  // End Services Upload Background Image

  // Start Services Remove Background Image
  const servicesBackgroundImageRemove = document.querySelector(
    ".services-section .edit-part .label-remove-file"
  );
  servicesBackgroundImageRemove.addEventListener("click", () => {
    var data = {
      mainId: $(servicesBackgroundImageRemove).data("info"),
    };
    $.ajax({
      url: Base_Url + "/acp/liveupdation/bg_img_remove",
      type: "POST",
      dataType: "JSON",
      data: data,
      success: function (result) {
        servicesBackgroundImage.style.backgroundImage = "";
        servicesBackgroundImage.style.backgroundPosition = "";
        servicesBackgroundImage.style.backgroundRepeat = "";
        servicesBackgroundImage.style.backgroundSize = "";
        servicesAddLabel.style.backgroundImage = "";
        servicesBg.style.background = servicesBgColor.style.backgroundColor;
      },
    });
  });
  // End Services Remove Background Image
}
// End Services

// Start Balance
if (balanceSection) {
  // Balace Section Title
  const balanceTitleColor = document.querySelector(
    ".balance-section .edit-part .change-edit-part .change-container .balance-title-dropdown .select-color .selected-color"
  );
  const balanceTitleMenuColors = document.querySelector(
    ".balance-section .edit-part .change-edit-part .change-container .balance-title-dropdown .menu-colors"
  );
  const balanceTitleMenuLi = document.querySelectorAll(
    ".balance-section .edit-part .change-edit-part .change-container .balance-title-dropdown .menu-colors > li"
  );
  const balanceTitle = document.querySelector(
    ".balance-section .container .title-section >h1"
  );

  balanceTitle.style.color = balanceTitleColor.style.backgroundColor;

  balanceTitleColor.addEventListener("click", () => {
    balanceTitleMenuColors.classList.toggle("active-menu");
  });
  balanceTitleMenuLi.forEach((item) => {
    item.addEventListener("click", () => {
      balanceTitleMenuColors.classList.toggle("active-menu");
      var infos = $(item).data("info").split(",");
      var data = {
        colorId: infos[1],
        mainId: infos[0],
        type: infos[3],
        ColId: infos[4],
      };
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_color",
        type: "POST",
        dataType: "JSON",
        data: data,
        success: function (result) {
          if (result == "1") {
            balanceTitleColor.style.backgroundColor =
              item.style.backgroundColor;
            balanceTitle.style.color = balanceTitleColor.style.backgroundColor;
          }
        },
      });
    });
  });

  // Balace Section SubTitle
  const balanceSubTitleColor = document.querySelector(
    ".balance-section .edit-part .change-edit-part .change-container .balance-subtitle-dropdown .select-color .selected-color"
  );
  const balanceSubTitleMenuColors = document.querySelector(
    ".balance-section .edit-part .change-edit-part .change-container .balance-subtitle-dropdown .menu-colors"
  );
  const balanceSubTitleMenuLi = document.querySelectorAll(
    ".balance-section .edit-part .change-edit-part .change-container .balance-subtitle-dropdown .menu-colors > li"
  );
  const balanceSubTitle = document.querySelector(
    ".balance-section .container .title-section >p"
  );

  balanceSubTitle.style.color = balanceSubTitleColor.style.backgroundColor;

  balanceSubTitleColor.addEventListener("click", () => {
    balanceSubTitleMenuColors.classList.toggle("active-menu");
  });
  balanceSubTitleMenuLi.forEach((item) => {
    item.addEventListener("click", () => {
      balanceSubTitleMenuColors.classList.toggle("active-menu");
      var infos = $(item).data("info").split(",");
      var data = {
        colorId: infos[1],
        mainId: infos[0],
        type: infos[3],
        ColId: infos[4],
      };
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_color",
        type: "POST",
        dataType: "JSON",
        data: data,
        success: function (result) {
          if (result == "1") {
            balanceSubTitleColor.style.backgroundColor =
              item.style.backgroundColor;
            balanceSubTitle.style.color =
              balanceSubTitleColor.style.backgroundColor;
          }
        },
      });
    });
  });

  // Start Balance Paragraph
  const balanceParagraphColor = document.querySelector(
    ".balance-section .edit-part .change-edit-part .change-container .balance-paragraph-dropdown .select-color .selected-color"
  );
  const balanceParagraphMenuColors = document.querySelector(
    ".balance-section .edit-part .change-edit-part .change-container .balance-paragraph-dropdown .menu-colors"
  );
  const balanceParagraphMenuLi = document.querySelectorAll(
    ".balance-section .edit-part .change-edit-part .change-container .balance-paragraph-dropdown .menu-colors > li"
  );
  const balanceParagraph = document.querySelectorAll(
    ".balance-section .balance-content .balance-text .balance-text__info >*"
  );

  balanceParagraph.forEach((item) => {
    item.style.color = balanceParagraphColor.style.backgroundColor;
  });
  balanceParagraphColor.addEventListener("click", () => {
    balanceParagraphMenuColors.classList.toggle("active-menu");
  });
  balanceParagraphMenuLi.forEach((item) => {
    item.addEventListener("click", () => {
      balanceParagraphMenuColors.classList.toggle("active-menu");
      var infos = $(item).data("info").split(",");
      var data = {
        colorId: infos[1],
        mainId: infos[0],
        type: infos[3],
        ColId: infos[4],
      };
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_color",
        type: "POST",
        dataType: "JSON",
        data: data,
        success: function (result) {
          if (result == "1") {
            balanceParagraphColor.style.backgroundColor =
              item.style.backgroundColor;
            balanceParagraph.forEach((item) => {
              item.style.color = balanceParagraphColor.style.backgroundColor;
            });
          }
        },
      });
    });
  });
  // End Balance Paragraph

  // Start Balance Background
  const balanceBgColor = document.querySelector(
    ".balance-section .edit-part .change-edit-part .change-container .balance-background-dropdown .select-color .selected-color"
  );
  const balanceBgMenuColors = document.querySelector(
    ".balance-section .edit-part .change-edit-part .change-container .balance-background-dropdown .menu-colors"
  );
  const balanceBgMenuLi = document.querySelectorAll(
    ".balance-section .edit-part .change-edit-part .change-container .balance-background-dropdown .menu-colors > li"
  );
  const balanceBg = document.querySelector(".balance-section");

  const BalancehasBgImage = balanceSection.style.backgroundImage !== "";

  if (BalancehasBgImage) {
    balanceBg.style.background =
      balanceSection.style + " " + balanceBgColor.style.backgroundColor;
  } else {
    // Otherwise, show the background color.
    balanceBg.style.background = balanceBgColor.style.backgroundColor;
  }

  // balanceBg.style.background = balanceSection.style + ';' + balanceBgColor.style.backgroundColor;
  balanceBgColor.addEventListener("click", () => {
    balanceBgMenuColors.classList.toggle("active-menu");
  });
  balanceBgMenuLi.forEach((item) => {
    item.addEventListener("click", () => {
      balanceBgMenuColors.classList.toggle("active-menu");
      var infos = $(item).data("info").split(",");
      var data = {
        colorId: infos[1],
        mainId: infos[0],
        type: infos[3],
        ColId: infos[4],
      };
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_color",
        type: "POST",
        dataType: "JSON",
        data: data,
        success: function (result) {
          if (result == "1") {
            balanceBgColor.style.backgroundColor = item.style.backgroundColor;
            balanceBg.style.background = balanceBgColor.style.backgroundColor;
          }
        },
      });
    });
  });
  // End Balance Background

  // Start Balance Upload Background Image
  const balanceBackgroundImage = document.querySelector(".balance-section");
  const balanceBackgroundImageInput = document.querySelector(
    ".balance-section .edit-part .balance-background-image"
  );
  balanceBackgroundImageInput.addEventListener("change", () => {
    var fd = new FormData();
    var files = balanceBackgroundImageInput.files;

    var mainId = $(balanceBackgroundImageInput).data("info");
    // Check file selected or not
    if (files.length > 0) {
      fd.append("Section_Image", files[0]);
      fd.append("id", mainId);
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_bg_img",
        type: "post",
        data: fd,
        contentType: false,
        processData: false,
        success: function (response) {
          if (response == "1") {
            balanceBackgroundImage.style.backgroundImage =
              "url(" +
              URL.createObjectURL(balanceBackgroundImageInput.files[0]) +
              ")";
            balanceBackgroundImage.style.backgroundPosition = "center";
            balanceBackgroundImage.style.backgroundRepeat = "no-repeat";
            balanceBackgroundImage.style.backgroundSize = "cover";
            balanceAddLabel.style.backgroundImage =
              "url(" +
              URL.createObjectURL(balanceBackgroundImageInput.files[0]) +
              ")";
          }
        },
      });
    }
  });
  // End Balance Upload Background Image

  // Start Balance Remove Background Image
  const balanceBackgroundImageRemove = document.querySelector(
    ".balance-section .edit-part .label-remove-file"
  );
  balanceBackgroundImageRemove.addEventListener("click", () => {
    var data = {
      mainId: $(balanceBackgroundImageRemove).data("info"),
    };
    $.ajax({
      url: Base_Url + "/acp/liveupdation/bg_img_remove",
      type: "POST",
      dataType: "JSON",
      data: data,
      success: function (result) {
        balanceBackgroundImage.style.backgroundImage = "";
        balanceBackgroundImage.style.backgroundPosition = "";
        balanceBackgroundImage.style.backgroundRepeat = "";
        balanceBackgroundImage.style.backgroundSize = "";
        balanceAddLabel.style.backgroundImage = "";
        balanceBg.style.background = balanceBgColor.style.backgroundColor;
      },
    });
  });
  // End Balance Remove Background Image
}
// End Balance

// Start Products
if (productsSection) {
  // Start Products Title
  const productsTitleColor = document.querySelector(
    ".products-section .edit-part .change-edit-part .change-container .products-title-dropdown .select-color .selected-color"
  );
  const productsMenuColors = document.querySelector(
    ".products-section .edit-part .change-edit-part .change-container .products-title-dropdown .menu-colors"
  );
  const productsMenuLi = document.querySelectorAll(
    ".products-section .edit-part .change-edit-part .change-container .products-title-dropdown .menu-colors > li"
  );
  const productsTitle = document.querySelector(
    ".products-section .title-section > h1"
  );
  // const productsCardTitle = document.querySelectorAll(
  //   ".products-section .cards .card .product-card-text > h2"
  // );

  // productsCardTitle.forEach((item) => {
  //   item.style.color = productsTitleColor.style.backgroundColor;
  // });

  productsTitle.style.color = productsTitleColor.style.backgroundColor;
  productsTitleColor.addEventListener("click", () => {
    productsMenuColors.classList.toggle("active-menu");
  });
  productsMenuLi.forEach((item) => {
    item.addEventListener("click", () => {
      productsMenuColors.classList.toggle("active-menu");
      var infos = $(item).data("info").split(",");
      var data = {
        colorId: infos[1],
        mainId: infos[0],
        type: infos[3],
        ColId: infos[4],
      };
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_color",
        type: "POST",
        dataType: "JSON",
        data: data,
        success: function (result) {
          if (result == "1") {
            productsTitleColor.style.backgroundColor =
              item.style.backgroundColor;
            productsTitle.style.color =
              productsTitleColor.style.backgroundColor;
            // productsCardTitle.forEach((item) => {
            //   item.style.color = productsTitleColor.style.backgroundColor;
            // });
          }
        },
      });
    });
  });
  // End Products Title

  // Start Products Subtitle
  const productsSubtitleColor = document.querySelector(
    ".products-section .edit-part .change-edit-part .change-container .products-subtitle-dropdown .select-color .selected-color"
  );
  const productsSubtitleMenuColors = document.querySelector(
    ".products-section .edit-part .change-edit-part .change-container .products-subtitle-dropdown .menu-colors"
  );
  const productsSubtitleMenuLi = document.querySelectorAll(
    ".products-section .edit-part .change-edit-part .change-container .products-subtitle-dropdown .menu-colors > li"
  );
  // const productsSubtitle = document.querySelectorAll(
  //   ".products-section .cards .card .product-card-text > h3"
  // );
  const servicesProductsSubParagraph = document.querySelector(
    ".products-section .title-section > p"
  );
  const productsCardTitle = document.querySelectorAll(
    ".products-section .cards .card .product-card-text > h2"
  );

  productsCardTitle.forEach((item) => {
    item.style.color = productsSubtitleColor.style.backgroundColor;
  });
  servicesProductsSubParagraph.style.color =
    productsSubtitleColor.style.backgroundColor;

  // productsSubtitle.forEach((item) => {
  //   item.style.color = productsSubtitleColor.style.backgroundColor;
  // });
  productsSubtitleColor.addEventListener("click", () => {
    productsSubtitleMenuColors.classList.toggle("active-menu");
  });
  productsSubtitleMenuLi.forEach((item) => {
    item.addEventListener("click", () => {
      productsSubtitleMenuColors.classList.toggle("active-menu");
      var infos = $(item).data("info").split(",");
      var data = {
        colorId: infos[1],
        mainId: infos[0],
        type: infos[3],
        ColId: infos[4],
      };
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_color",
        type: "POST",
        dataType: "JSON",
        data: data,
        success: function (result) {
          if (result == "1") {
            productsSubtitleColor.style.backgroundColor =
              item.style.backgroundColor;
            // productsSubtitle.forEach((item) => {
            //   item.style.color = productsSubtitleColor.style.backgroundColor;
            // });
            servicesProductsSubParagraph.style.color =
              productsSubtitleColor.style.backgroundColor;
            productsCardTitle.forEach((item) => {
              item.style.color = productsSubtitleColor.style.backgroundColor;
            });
          }
        },
      });
    });
  });
  // End Products Subtitle

  // Start Products Paragraph
  const productsParagraphColor = document.querySelector(
    ".products-section .edit-part .change-edit-part .change-container .products-paragraph-dropdown .select-color .selected-color"
  );
  const productsParagraphMenuColors = document.querySelector(
    ".products-section .edit-part .change-edit-part .change-container .products-paragraph-dropdown .menu-colors"
  );
  const productsParagraphMenuLi = document.querySelectorAll(
    ".products-section .edit-part .change-edit-part .change-container .products-paragraph-dropdown .menu-colors > li"
  );
  const productsParagraph = document.querySelectorAll(
    ".products-section .cards .card .product-card-text > p"
  );
  // const servicesProductsSubParagraph = document.querySelector(
  //   ".products-section .title-section > p"
  // );
  // const productsButton = document.querySelector(
  //   ".products-section .products-content .read-more.general-btn .read-more-btn"
  // );
  // if (productsButton) {
  //   productsButton.style.color = productsParagraphColor.style.backgroundColor;
  // }
  // servicesProductsSubParagraph.style.color =
  //   productsParagraphColor.style.backgroundColor;
  productsParagraph.forEach((item) => {
    item.style.color = productsParagraphColor.style.backgroundColor;
  });
  productsParagraphColor.addEventListener("click", () => {
    productsParagraphMenuColors.classList.toggle("active-menu");
  });
  productsParagraphMenuLi.forEach((item) => {
    item.addEventListener("click", () => {
      productsParagraphMenuColors.classList.toggle("active-menu");
      var infos = $(item).data("info").split(",");
      var data = {
        colorId: infos[1],
        mainId: infos[0],
        type: infos[3],
        ColId: infos[4],
      };
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_color",
        type: "POST",
        dataType: "JSON",
        data: data,
        success: function (result) {
          if (result == "1") {
            productsParagraphColor.style.backgroundColor =
              item.style.backgroundColor;
            productsParagraph.forEach((item) => {
              item.style.color = productsParagraphColor.style.backgroundColor;
            });
            // servicesProductsSubParagraph.style.color =
            //   productsParagraphColor.style.backgroundColor;
            // if (productsButton) {
            //   productsButton.style.color = productsParagraphColor.style.backgroundColor;
            // }
          }
        },
      });
    });
  });
  // End Products Paragraph

  // Start Products Button BG
  const productsButtonBgSelected = document.querySelector(
    ".products-section .edit-part .change-edit-part .change-container .products-button-dropdown .select-color .selected-color"
  );
  const productsButtonBgMenuColors = document.querySelector(
    ".products-section .edit-part .change-edit-part .change-container .products-button-dropdown .menu-colors"
  );
  const productsButtonBgMenuLi = document.querySelectorAll(
    ".products-section .edit-part .change-edit-part .change-container .products-button-dropdown .menu-colors > li"
  );
  const productsButtonBg = document.querySelector(
    ".products-section .products-content .read-more.general-btn .read-more-btn"
  );
  const productsSubtitle = document.querySelectorAll(
    ".products-section .cards .card .product-card-text > h3"
  );
  productsSubtitle.forEach((item) => {
    item.style.color = productsButtonBgSelected.style.backgroundColor;
  });

  if (productsButtonBg) {
    productsButtonBg.style.backgroundColor =
      productsButtonBgSelected.style.backgroundColor;
    productsButtonBgSelected.addEventListener("click", () => {
      productsButtonBgMenuColors.classList.toggle("active-menu");
    });
    productsButtonBgMenuLi.forEach((item) => {
      item.addEventListener("click", () => {
        productsButtonBgMenuColors.classList.toggle("active-menu");
        var infos = $(item).data("info").split(",");
        var data = {
          colorId: infos[1],
          mainId: infos[0],
          type: infos[3],
          ColId: infos[4],
        };
        $.ajax({
          url: Base_Url + "/acp/liveupdation/change_color",
          type: "POST",
          dataType: "JSON",
          data: data,
          success: function (result) {
            if (result == "1") {
              productsButtonBgSelected.style.backgroundColor =
                item.style.backgroundColor;
              productsButtonBg.style.backgroundColor =
                productsButtonBgSelected.style.backgroundColor;
              productsSubtitle.forEach((item) => {
                item.style.color =
                  productsButtonBgSelected.style.backgroundColor;
              });
            }
          },
        });
      });
    });
  }
  // End Products Button BG

  // Start Products Background
  const productsBgColor = document.querySelector(
    ".products-section .edit-part .change-edit-part .change-container .products-background-dropdown .select-color .selected-color"
  );
  const productsBgMenuColors = document.querySelector(
    ".products-section .edit-part .change-edit-part .change-container .products-background-dropdown .menu-colors"
  );
  const productsBgMenuLi = document.querySelectorAll(
    ".products-section .edit-part .change-edit-part .change-container .products-background-dropdown .menu-colors > li"
  );
  const productsBg = document.querySelector(".products-section");
  const ProducthasBgImage = productsSection.style.backgroundImage !== "";

  if (ProducthasBgImage) {
    productsBg.style.background =
      productsSection.style.backgroundImage +
      " ," +
      productsBgColor.style.backgroundColor;
  } else {
    // Otherwise, show the background color.
    productsBg.style.background = productsBgColor.style.backgroundColor;
  }

  // productsBg.style.background = productsSection.style + ';' +productsBgColor.style.backgroundColor;
  productsBgColor.addEventListener("click", () => {
    productsBgMenuColors.classList.toggle("active-menu");
  });
  productsBgMenuLi.forEach((item) => {
    item.addEventListener("click", () => {
      productsBgMenuColors.classList.toggle("active-menu");
      var infos = $(item).data("info").split(",");
      var data = {
        colorId: infos[1],
        mainId: infos[0],
        type: infos[3],
        ColId: infos[4],
      };
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_color",
        type: "POST",
        dataType: "JSON",
        data: data,
        success: function (result) {
          if (result == "1") {
            productsBgColor.style.backgroundColor = item.style.backgroundColor;
            productsBg.style.background = productsBgColor.style.backgroundColor;
          }
        },
      });
    });
  });
  // End Products Background

  // Start Products Upload Background Image
  const productsBackgroundImage = document.querySelector(".products-section");
  const productsBackgroundImageInput = document.querySelector(
    ".products-section .edit-part .products-background-image"
  );
  productsBackgroundImageInput.addEventListener("change", () => {
    var fd = new FormData();
    var files = productsBackgroundImageInput.files;

    var mainId = $(productsBackgroundImageInput).data("info");
    // Check file selected or not
    if (files.length > 0) {
      fd.append("Section_Image", files[0]);
      fd.append("id", mainId);
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_bg_img",
        type: "post",
        data: fd,
        contentType: false,
        processData: false,
        success: function (response) {
          if (response == "1") {
            productsBackgroundImage.style.backgroundImage =
              "url(" +
              URL.createObjectURL(productsBackgroundImageInput.files[0]) +
              ")";
            productsBackgroundImage.style.backgroundPosition = "center";
            productsBackgroundImage.style.backgroundRepeat = "no-repeat";
            productsBackgroundImage.style.backgroundSize = "cover";
            productsAddLabel.style.backgroundImage =
              "url(" +
              URL.createObjectURL(productsBackgroundImageInput.files[0]) +
              ")";
          }
        },
      });
    }
  });
  // End Products Upload Background Image

  // Start Products Remove Background Image
  const productsBackgroundImageRemove = document.querySelector(
    ".products-section .edit-part .label-remove-file"
  );
  productsBackgroundImageRemove.addEventListener("click", () => {
    var data = {
      mainId: $(productsBackgroundImageRemove).data("info"),
    };
    $.ajax({
      url: Base_Url + "/acp/liveupdation/bg_img_remove",
      type: "POST",
      dataType: "JSON",
      data: data,
      success: function (result) {
        productsBackgroundImage.style.backgroundImage = "";
        productsBackgroundImage.style.backgroundPosition = "";
        productsBackgroundImage.style.backgroundRepeat = "";
        productsBackgroundImage.style.backgroundSize = "";
        productsAddLabel.style.backgroundImage = "";
        productsBg.style.background = productsBgColor.style.backgroundColor;
      },
    });
  });
  // End Products Remove Background Image
}
// End Products

// Start Projects
if (projectsSection) {
  // Start Projects Title
  const projectsTitleColor = document.querySelector(
    ".projects-section .edit-part .change-edit-part .change-container .projects-title-dropdown .select-color .selected-color"
  );
  const projectsMenuColors = document.querySelector(
    ".projects-section .edit-part .change-edit-part .change-container .projects-title-dropdown .menu-colors"
  );
  const projectsMenuLi = document.querySelectorAll(
    ".projects-section .edit-part .change-edit-part .change-container .projects-title-dropdown .menu-colors > li"
  );
  const projectsTitle = document.querySelector(
    ".projects-section .title-section > h1"
  );
  // const projectsCardTitle = document.querySelectorAll(
  //   ".projects-section .cards .card .project-card-text > a > h2"
  // );

  // projectsCardTitle.forEach((item) => {
  //   item.style.color = projectsTitleColor.style.backgroundColor;
  // });

  projectsTitle.style.color = projectsTitleColor.style.backgroundColor;

  projectsTitleColor.addEventListener("click", () => {
    projectsMenuColors.classList.toggle("active-menu");
  });
  projectsMenuLi.forEach((item) => {
    item.addEventListener("click", () => {
      projectsMenuColors.classList.toggle("active-menu");
      var infos = $(item).data("info").split(",");
      var data = {
        colorId: infos[1],
        mainId: infos[0],
        type: infos[3],
        ColId: infos[4],
      };
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_color",
        type: "POST",
        dataType: "JSON",
        data: data,
        success: function (result) {
          if (result == "1") {
            projectsTitleColor.style.backgroundColor =
              item.style.backgroundColor;
            // projectsCardTitle.forEach((item) => {
            //   item.style.color = projectsTitleColor.style.backgroundColor;
            // });
            projectsTitle.style.color =
              projectsTitleColor.style.backgroundColor;
          }
        },
      });
    });
  });
  // End Projects Title

  // Start Projects Subtitle
  const projectsSubtitleColor = document.querySelector(
    ".projects-section .edit-part .change-edit-part .change-container .projects-subtitle-dropdown .select-color .selected-color"
  );
  const projectsSubtitleMenuColors = document.querySelector(
    ".projects-section .edit-part .change-edit-part .change-container .projects-subtitle-dropdown .menu-colors"
  );
  const projectsSubtitleMenuLi = document.querySelectorAll(
    ".projects-section .edit-part .change-edit-part .change-container .projects-subtitle-dropdown .menu-colors > li"
  );
  // const projectsSubtitle = document.querySelectorAll(
  //   ".projects-section .cards .card .project-card-text > h3"
  // );
  const servicesProjectsSubParagraph = document.querySelector(
    ".projects-section .title-section > p"
  );
  const projectsCardTitle = document.querySelectorAll(
    ".projects-section .cards .card .project-card-text > h2"
  );

  projectsCardTitle.forEach((item) => {
    item.style.color = projectsSubtitleColor.style.backgroundColor;
  });

  servicesProjectsSubParagraph.style.color =
    projectsSubtitleColor.style.backgroundColor;
  // projectsSubtitle.forEach((item) => {
  //   item.style.color = projectsSubtitleColor.style.backgroundColor;
  // });
  projectsSubtitleColor.addEventListener("click", () => {
    projectsSubtitleMenuColors.classList.toggle("active-menu");
  });
  projectsSubtitleMenuLi.forEach((item) => {
    item.addEventListener("click", () => {
      projectsSubtitleMenuColors.classList.toggle("active-menu");
      var infos = $(item).data("info").split(",");
      var data = {
        colorId: infos[1],
        mainId: infos[0],
        type: infos[3],
        ColId: infos[4],
      };
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_color",
        type: "POST",
        dataType: "JSON",
        data: data,
        success: function (result) {
          if (result == "1") {
            projectsSubtitleColor.style.backgroundColor =
              item.style.backgroundColor;
            // projectsSubtitle.forEach((item) => {
            //   item.style.color = projectsSubtitleColor.style.backgroundColor;
            // });
            servicesProjectsSubParagraph.style.color =
              projectsSubtitleColor.style.backgroundColor;
            projectsCardTitle.forEach((item) => {
              item.style.color = projectsSubtitleColor.style.backgroundColor;
            });
          }
        },
      });
    });
  });
  // End Projects Subtitle

  // Start Projects Paragraph
  const projectsParagraphColor = document.querySelector(
    ".projects-section .edit-part .change-edit-part .change-container .projects-paragraph-dropdown .select-color .selected-color"
  );
  const projectsParagraphMenuColors = document.querySelector(
    ".projects-section .edit-part .change-edit-part .change-container .projects-paragraph-dropdown .menu-colors"
  );
  const projectsParagraphMenuLi = document.querySelectorAll(
    ".projects-section .edit-part .change-edit-part .change-container .projects-paragraph-dropdown .menu-colors > li"
  );
  const projectsParagraph = document.querySelectorAll(
    ".projects-section .cards .card .project-card-text > p"
  );
  // const servicesProjectsSubParagraph = document.querySelector(
  //   ".projects-section .title-section > p"
  // );
  // const projectsButton = document.querySelector(
  //   ".projects-section .projects-content .read-more.general-btn .read-more-btn"
  // );
  // if (projectsButton) {
  //   projectsButton.style.color = projectsParagraphColor.style.backgroundColor;
  // }
  projectsParagraph.forEach((item) => {
    item.style.color = projectsParagraphColor.style.backgroundColor;
  });
  // servicesProjectsSubParagraph.style.color =
  //   projectsParagraphColor.style.backgroundColor;
  projectsParagraphColor.addEventListener("click", () => {
    projectsParagraphMenuColors.classList.toggle("active-menu");
  });
  projectsParagraphMenuLi.forEach((item) => {
    item.addEventListener("click", () => {
      projectsParagraphMenuColors.classList.toggle("active-menu");
      var infos = $(item).data("info").split(",");
      var data = {
        colorId: infos[1],
        mainId: infos[0],
        type: infos[3],
        ColId: infos[4],
      };
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_color",
        type: "POST",
        dataType: "JSON",
        data: data,
        success: function (result) {
          if (result == "1") {
            projectsParagraphColor.style.backgroundColor =
              item.style.backgroundColor;
            projectsParagraph.forEach((item) => {
              item.style.color = projectsParagraphColor.style.backgroundColor;
            });
            // servicesProjectsSubParagraph.style.color =
            //   projectsParagraphColor.style.backgroundColor;
            // if (projectsButton) {
            //   projectsButton.style.color =
            //     projectsParagraphColor.style.backgroundColor;
            //   projectsButton.style.borderColor =
            //     projectsParagraphColor.style.backgroundColor;
            // }
          }
        },
      });
    });
  });
  // End Projects Paragraph

  // Start Projects Button BG
  const projectsButtonBgSelected = document.querySelector(
    ".projects-section .edit-part .change-edit-part .change-container .projects-button-dropdown .select-color .selected-color"
  );
  const projectsButtonBgMenuColors = document.querySelector(
    ".projects-section .edit-part .change-edit-part .change-container .projects-button-dropdown .menu-colors"
  );
  const projectsButtonBgMenuLi = document.querySelectorAll(
    ".projects-section .edit-part .change-edit-part .change-container .projects-button-dropdown .menu-colors > li"
  );
  const projectsButtonBg = document.querySelector(
    ".projects-section .projects-content .read-more.general-btn .read-more-btn"
  );
  const projectsSubtitle = document.querySelectorAll(
    ".projects-section .cards .card .project-card-text > h3"
  );
  projectsSubtitle.forEach((item) => {
    item.style.color = projectsButtonBgSelected.style.backgroundColor;
  });
  if (projectsButtonBg) {
    projectsButtonBg.style.backgroundColor =
      projectsButtonBgSelected.style.backgroundColor;
    projectsButtonBgSelected.addEventListener("click", () => {
      projectsButtonBgMenuColors.classList.toggle("active-menu");
    });
    projectsButtonBgMenuLi.forEach((item) => {
      item.addEventListener("click", () => {
        projectsButtonBgMenuColors.classList.toggle("active-menu");
        var infos = $(item).data("info").split(",");
        var data = {
          colorId: infos[1],
          mainId: infos[0],
          type: infos[3],
          ColId: infos[4],
        };
        $.ajax({
          url: Base_Url + "/acp/liveupdation/change_color",
          type: "POST",
          dataType: "JSON",
          data: data,
          success: function (result) {
            if (result == "1") {
              projectsButtonBgSelected.style.backgroundColor =
                item.style.backgroundColor;
              projectsButtonBg.style.backgroundColor =
                projectsButtonBgSelected.style.backgroundColor;
              projectsSubtitle.forEach((item) => {
                item.style.color =
                  projectsButtonBgSelected.style.backgroundColor;
              });
            }
          },
        });
      });
    });
  }
  // End Projects Button BG

  // Start Projects Background
  const projectsBgColor = document.querySelector(
    ".projects-section .edit-part .change-edit-part .change-container .projects-background-dropdown .select-color .selected-color"
  );
  const projectsBgMenuColors = document.querySelector(
    ".projects-section .edit-part .change-edit-part .change-container .projects-background-dropdown .menu-colors"
  );
  const projectsBgMenuLi = document.querySelectorAll(
    ".projects-section .edit-part .change-edit-part .change-container .projects-background-dropdown .menu-colors > li"
  );
  const projectsBg = document.querySelector(".projects-section");

  const projectshasBgImage = projectsSection.style.backgroundImage !== "";

  if (projectshasBgImage) {
    projectsBg.style.background = projectsBg.style.background =
      projectsSection.style.backgroundImage +
      ", " +
      projectsBgColor.style.backgroundColor;
  } else {
    // Otherwise, show the background color.
    projectsBg.style.background = projectsBgColor.style.backgroundColor;
  }

  // projectsBg.style.background = projectsSection.style + ';' + projectsBgColor.style.backgroundColor;
  projectsBgColor.addEventListener("click", () => {
    projectsBgMenuColors.classList.toggle("active-menu");
  });
  projectsBgMenuLi.forEach((item) => {
    item.addEventListener("click", () => {
      projectsBgMenuColors.classList.toggle("active-menu");
      var infos = $(item).data("info").split(",");
      var data = {
        colorId: infos[1],
        mainId: infos[0],
        type: infos[3],
        ColId: infos[4],
      };
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_color",
        type: "POST",
        dataType: "JSON",
        data: data,
        success: function (result) {
          if (result == "1") {
            projectsBgColor.style.backgroundColor = item.style.backgroundColor;
            projectsBg.style.background = projectsBgColor.style.backgroundColor;
          }
        },
      });
    });
  });
  // End Projects Background

  // Start Projects Upload Background Image
  const projectsBackgroundImage = document.querySelector(".projects-section");
  const projectsBackgroundImageInput = document.querySelector(
    ".projects-section .edit-part .projects-background-image"
  );
  projectsBackgroundImageInput.addEventListener("change", () => {
    var fd = new FormData();
    var files = projectsBackgroundImageInput.files;

    var mainId = $(projectsBackgroundImageInput).data("info");
    // Check file selected or not
    if (files.length > 0) {
      fd.append("Section_Image", files[0]);
      fd.append("id", mainId);
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_bg_img",
        type: "post",
        data: fd,
        contentType: false,
        processData: false,
        success: function (response) {
          if (response == "1") {
            projectsBackgroundImage.style.backgroundImage =
              "url(" +
              URL.createObjectURL(projectsBackgroundImageInput.files[0]) +
              ")";
            projectsBackgroundImage.style.backgroundPosition = "center";
            projectsBackgroundImage.style.backgroundRepeat = "no-repeat";
            projectsBackgroundImage.style.backgroundSize = "cover";
            projectsAddLabel.style.backgroundImage =
              "url(" +
              URL.createObjectURL(projectsBackgroundImageInput.files[0]) +
              ")";
          }
        },
      });
    }
  });

  // End Projects Upload Background Image

  // Start Projects Remove Background Image
  const projectsBackgroundImageRemove = document.querySelector(
    ".projects-section .edit-part .label-remove-file"
  );
  projectsBackgroundImageRemove.addEventListener("click", () => {
    var data = {
      mainId: $(projectsBackgroundImageRemove).data("info"),
    };
    $.ajax({
      url: Base_Url + "/acp/liveupdation/bg_img_remove",
      type: "POST",
      dataType: "JSON",
      data: data,
      success: function (result) {
        projectsBackgroundImage.style.backgroundImage = "";
        projectsBackgroundImage.style.backgroundPosition = "";
        projectsBackgroundImage.style.backgroundRepeat = "";
        projectsBackgroundImage.style.backgroundSize = "";
        projectsAddLabel.style.backgroundImage = "";
        projectsBg.style.background = projectsBgColor.style.backgroundColor;
      },
    });
  });
  // End Projects Remove Background Image
}
// End Projects

// Start Portfolios
if (portfoliosSection) {
  // Start Portfolios Title
  const portfoliosTitleColor = document.querySelector(
    ".portfolios-section .edit-part .change-edit-part .change-container .portfolios-title-dropdown .select-color .selected-color"
  );
  const portfoliosMenuColors = document.querySelector(
    ".portfolios-section .edit-part .change-edit-part .change-container .portfolios-title-dropdown .menu-colors"
  );
  const portfoliosMenuLi = document.querySelectorAll(
    ".portfolios-section .edit-part .change-edit-part .change-container .portfolios-title-dropdown .menu-colors > li"
  );
  const portfoliosTitle = document.querySelector(
    ".portfolios-section .title-section > h1"
  );
  const portfoliosCardTitle = document.querySelectorAll(
    ".portfolios-section .cards .card .read-portfolios-btn"
  );
  portfoliosTitle.style.color = portfoliosTitleColor.style.backgroundColor;
  portfoliosCardTitle.forEach((item) => {
    item.style.color = portfoliosTitleColor.style.backgroundColor;
  });
  portfoliosTitleColor.addEventListener("click", () => {
    portfoliosMenuColors.classList.toggle("active-menu");
  });
  portfoliosMenuLi.forEach((item) => {
    item.addEventListener("click", () => {
      portfoliosMenuColors.classList.toggle("active-menu");
      var infos = $(item).data("info").split(",");
      var data = {
        colorId: infos[1],
        mainId: infos[0],
        type: infos[3],
        ColId: infos[4],
      };
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_color",
        type: "POST",
        dataType: "JSON",
        data: data,
        success: function (result) {
          if (result == "1") {
            portfoliosTitleColor.style.backgroundColor =
              item.style.backgroundColor;
            portfoliosTitle.style.color =
              portfoliosTitleColor.style.backgroundColor;
            portfoliosCardTitle.forEach((item) => {
              item.style.color = portfoliosTitleColor.style.backgroundColor;
            });
          }
        },
      });
    });
  });
  // End Portfolios Title

  // Start Portfolios Card Button and Subtitle
  const portfoliosCardTitleColor = document.querySelector(
    ".portfolios-section .edit-part .change-edit-part .change-container .portfolios-subtitle-dropdown .select-color .selected-color"
  );
  const portfoliosCardTitleMenuColors = document.querySelector(
    ".portfolios-section .edit-part .change-edit-part .change-container .portfolios-subtitle-dropdown .menu-colors"
  );
  const portfoliosCardTitleMenuLi = document.querySelectorAll(
    ".portfolios-section .edit-part .change-edit-part .change-container .portfolios-subtitle-dropdown .menu-colors > li"
  );
  const portfolioSubTitle = document.querySelector(
    ".portfolios-section .title-section > p"
  );

  portfolioSubTitle.style.color =
    portfoliosCardTitleColor.style.backgroundColor;

  portfoliosCardTitleColor.addEventListener("click", () => {
    portfoliosCardTitleMenuColors.classList.toggle("active-menu");
  });
  portfoliosCardTitleMenuLi.forEach((item) => {
    item.addEventListener("click", () => {
      portfoliosCardTitleMenuColors.classList.toggle("active-menu");
      var infos = $(item).data("info").split(",");
      var data = {
        colorId: infos[1],
        mainId: infos[0],
        type: infos[3],
        ColId: infos[4],
      };
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_color",
        type: "POST",
        dataType: "JSON",
        data: data,
        success: function (result) {
          if (result == "1") {
            portfoliosCardTitleColor.style.backgroundColor =
              item.style.backgroundColor;
            // portfolioSubParagraph.style.color =
            //   portfoliosCardTitleColor.style.backgroundColor;
            portfolioSubTitle.style.color =
              portfoliosCardTitleColor.style.backgroundColor;
          }
        },
      });
    });
  });
  // End Portfolios Card Button

  // Start Portfolios Button
  const portfoliosButtonColor = document.querySelector(
    ".portfolios-section .edit-part .change-edit-part .change-container .portfolios-button-dropdown .select-color .selected-color"
  );
  const portfoliosButtonMenuColors = document.querySelector(
    ".portfolios-section .edit-part .change-edit-part .change-container .portfolios-button-dropdown .menu-colors"
  );
  const portfoliosButtonMenuLi = document.querySelectorAll(
    ".portfolios-section .edit-part .change-edit-part .change-container .portfolios-button-dropdown .menu-colors > li"
  );
  const portfoliosButton = document.querySelector(
    ".portfolios-section .portfolios-content .read-more.general-btn .read-more-btn"
  );
  if (portfoliosButton) {
    portfoliosButton.style.backgroundColor =
      portfoliosButtonColor.style.backgroundColor;
    portfoliosButton.style.borderColor =
      portfoliosButtonColor.style.backgroundColor;

    portfoliosButtonColor.addEventListener("click", () => {
      portfoliosButtonMenuColors.classList.toggle("active-menu");
    });
    portfoliosButtonMenuLi.forEach((item) => {
      item.addEventListener("click", () => {
        portfoliosButtonMenuColors.classList.toggle("active-menu");
        var infos = $(item).data("info").split(",");
        var data = {
          colorId: infos[1],
          mainId: infos[0],
          type: infos[3],
          ColId: infos[4],
        };
        $.ajax({
          url: Base_Url + "/acp/liveupdation/change_color",
          type: "POST",
          dataType: "JSON",
          data: data,
          success: function (result) {
            if (result == "1") {
              portfoliosButtonColor.style.backgroundColor =
                item.style.backgroundColor;
              portfoliosButton.style.backgroundColor =
                portfoliosButtonColor.style.backgroundColor;
              portfoliosButton.style.borderColor =
                portfoliosButtonColor.style.backgroundColor;
            }
          },
        });
      });
    });
  }
  // End Portfolios Button

  // Start Portfolios Button BG
  // const portfoliosButtonBgSelected = document.querySelector(
  //   ".portfolios-section .edit-part .change-edit-part .change-container .portfolios-button-bg-dropdown .select-color .selected-color"
  // );
  // const portfoliosButtonBgMenuColors = document.querySelector(
  //   ".portfolios-section .edit-part .change-edit-part .change-container .portfolios-button-bg-dropdown .menu-colors"
  // );
  // const portfoliosButtonBgMenuLi = document.querySelectorAll(
  //   ".portfolios-section .edit-part .change-edit-part .change-container .portfolios-button-bg-dropdown .menu-colors > li"
  // );
  // const portfoliosButtonBg = document.querySelector(
  //   ".portfolios-section .portfolios-content .read-more.general-btn .read-more-btn"
  // );
  // if (portfoliosButtonBg) {
  //   portfoliosButtonBg.style.backgroundColor =
  //     portfoliosButtonBgSelected.style.backgroundColor;
  //   portfoliosButtonBgSelected.addEventListener("click", () => {
  //     portfoliosButtonBgMenuColors.classList.toggle("active-menu");
  //   });
  //   portfoliosButtonBgMenuLi.forEach((item) => {
  //     item.addEventListener("click", () => {
  //       portfoliosButtonBgMenuColors.classList.toggle("active-menu");
  //       var infos = $(item).data("info").split(",");
  //       var data = {
  //         colorId: infos[1],
  //         mainId: infos[0],
  //         type: infos[3],
  //         ColId: infos[4],
  //       };
  //       $.ajax({
  //         url: Base_Url + "/acp/liveupdation/change_color",
  //         type: "POST",
  //         dataType: "JSON",
  //         data: data,
  //         success: function (result) {
  //           if (result == "1") {
  //             portfoliosButtonBgSelected.style.backgroundColor =
  //               item.style.backgroundColor;
  //             portfoliosButtonBg.style.backgroundColor =
  //               portfoliosButtonBgSelected.style.backgroundColor;
  //           }
  //         },
  //       });
  //     });
  //   });
  // }
  // End Projects Button BG

  // Start Portfolios Background
  const portfoliosBgColor = document.querySelector(
    ".portfolios-section .edit-part .change-edit-part .change-container .portfolios-background-dropdown .select-color .selected-color"
  );
  const portfoliosBgMenuColors = document.querySelector(
    ".portfolios-section .edit-part .change-edit-part .change-container .portfolios-background-dropdown .menu-colors"
  );
  const portfoliosBgMenuLi = document.querySelectorAll(
    ".portfolios-section .edit-part .change-edit-part .change-container .portfolios-background-dropdown .menu-colors > li"
  );
  const portfoliosBg = document.querySelector(".portfolios-section");

  const PortfoliohasBgImage = portfoliosSection.style.backgroundImage !== "";

  if (PortfoliohasBgImage) {
    portfoliosBg.style.background =
      portfoliosSection.style.backgroundImage +
      " ," +
      portfoliosBgColor.style.backgroundColor;
  } else {
    // Otherwise, show the background color.
    portfoliosBg.style.background = portfoliosBgColor.style.backgroundColor;
  }

  // portfoliosBg.style.background = portfoliosSection.style + ';' + portfoliosBgColor.style.backgroundColor;
  portfoliosBgColor.addEventListener("click", () => {
    portfoliosBgMenuColors.classList.toggle("active-menu");
  });
  portfoliosBgMenuLi.forEach((item) => {
    item.addEventListener("click", () => {
      portfoliosBgMenuColors.classList.toggle("active-menu");
      var infos = $(item).data("info").split(",");
      var data = {
        colorId: infos[1],
        mainId: infos[0],
        type: infos[3],
        ColId: infos[4],
      };
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_color",
        type: "POST",
        dataType: "JSON",
        data: data,
        success: function (result) {
          if (result == "1") {
            portfoliosBgColor.style.backgroundColor =
              item.style.backgroundColor;
            portfoliosBg.style.background =
              portfoliosBgColor.style.backgroundColor;
          }
        },
      });
    });
  });
  // End Portfolios Background

  // Start Portfolios Upload Background Image
  const portfoliosBackgroundImage = document.querySelector(
    ".portfolios-section"
  );
  const portfoliosBackgroundImageInput = document.querySelector(
    ".portfolios-section .edit-part .portfolios-background-image"
  );
  portfoliosBackgroundImageInput.addEventListener("change", () => {
    var fd = new FormData();
    var files = portfoliosBackgroundImageInput.files;

    var mainId = $(portfoliosBackgroundImageInput).data("info");
    // Check file selected or not
    if (files.length > 0) {
      fd.append("Section_Image", files[0]);
      fd.append("id", mainId);
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_bg_img",
        type: "post",
        data: fd,
        contentType: false,
        processData: false,
        success: function (response) {
          if (response == "1") {
            portfoliosBackgroundImage.style.backgroundImage =
              "url(" +
              URL.createObjectURL(portfoliosBackgroundImageInput.files[0]) +
              ")";
            portfoliosBackgroundImage.style.backgroundPosition = "center";
            portfoliosBackgroundImage.style.backgroundRepeat = "no-repeat";
            portfoliosBackgroundImage.style.backgroundSize = "cover";
            portfoliosAddLabel.style.backgroundImage =
              "url(" +
              URL.createObjectURL(portfoliosBackgroundImageInput.files[0]) +
              ")";
          }
        },
      });
    }
  });
  // End Portfolios Upload Background Image

  // Start Portfolios Remove Background Image
  const portfoliosBackgroundImageRemove = document.querySelector(
    ".portfolios-section .edit-part .label-remove-file"
  );
  portfoliosBackgroundImageRemove.addEventListener("click", () => {
    var data = {
      mainId: $(portfoliosBackgroundImageRemove).data("info"),
    };
    $.ajax({
      url: Base_Url + "/acp/liveupdation/bg_img_remove",
      type: "POST",
      dataType: "JSON",
      data: data,
      success: function (result) {
        portfoliosBackgroundImage.style.backgroundImage = "";
        portfoliosBackgroundImage.style.backgroundPosition = "";
        portfoliosBackgroundImage.style.backgroundRepeat = "";
        portfoliosBackgroundImage.style.backgroundSize = "";
        portfoliosAddLabel.style.backgroundImage = "";
        portfoliosBg.style.background = portfoliosBgColor.style.backgroundColor;
      },
    });
  });
  // End Portfolios Remove Background Image
}
// End Portfolios

// Start Why
if (whySection) {
  // Start Why Title
  const whyTitleColor = document.querySelector(
    ".why-section .edit-part .change-edit-part .change-container .why-title-dropdown .select-color .selected-color"
  );
  const whyMenuColors = document.querySelector(
    ".why-section .edit-part .change-edit-part .change-container .why-title-dropdown .menu-colors"
  );
  const whyMenuLi = document.querySelectorAll(
    ".why-section .edit-part .change-edit-part .change-container .why-title-dropdown .menu-colors > li"
  );
  const whyTitle = document.querySelector(".why-section .why-content > h1");
  whyTitle.style.color = whyTitleColor.style.backgroundColor;
  whyTitleColor.addEventListener("click", () => {
    whyMenuColors.classList.toggle("active-menu");
  });
  whyMenuLi.forEach((item) => {
    item.addEventListener("click", () => {
      whyMenuColors.classList.toggle("active-menu");
      var infos = $(item).data("info").split(",");
      var data = {
        colorId: infos[1],
        mainId: infos[0],
        type: infos[3],
        ColId: infos[4],
      };
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_color",
        type: "POST",
        dataType: "JSON",
        data: data,
        success: function (result) {
          if (result == "1") {
            whyTitleColor.style.backgroundColor = item.style.backgroundColor;
            whyTitle.style.color = whyTitleColor.style.backgroundColor;
          }
        },
      });
    });
  });
  // End Why Title

  // Start Why Paragraph
  const whyParagraphColor = document.querySelector(
    ".why-section .edit-part .change-edit-part .change-container .why-paragraph-dropdown .select-color .selected-color"
  );
  const whyParagraphMenuColors = document.querySelector(
    ".why-section .edit-part .change-edit-part .change-container .why-paragraph-dropdown .menu-colors"
  );
  const whyParagraphMenuLi = document.querySelectorAll(
    ".why-section .edit-part .change-edit-part .change-container .why-paragraph-dropdown .menu-colors > li"
  );
  const whyParagraph = document.querySelector(".why-section .why-content > p");
  whyParagraph.style.color = whyParagraphColor.style.backgroundColor;
  whyParagraphColor.addEventListener("click", () => {
    whyParagraphMenuColors.classList.toggle("active-menu");
  });
  whyParagraphMenuLi.forEach((item) => {
    item.addEventListener("click", () => {
      whyParagraphMenuColors.classList.toggle("active-menu");
      var infos = $(item).data("info").split(",");
      var data = {
        colorId: infos[1],
        mainId: infos[0],
        type: infos[3],
        ColId: infos[4],
      };
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_color",
        type: "POST",
        dataType: "JSON",
        data: data,
        success: function (result) {
          if (result == "1") {
            whyParagraphColor.style.backgroundColor =
              item.style.backgroundColor;
            whyParagraph.style.color = whyParagraphColor.style.backgroundColor;
          }
        },
      });
    });
  });
  // End Why Paragraph

  // Start Why Background
  const whyBgColor = document.querySelector(
    ".why-section .edit-part .change-edit-part .change-container .why-background-dropdown .select-color .selected-color"
  );
  const whyBgMenuColors = document.querySelector(
    ".why-section .edit-part .change-edit-part .change-container .why-background-dropdown .menu-colors"
  );
  const whyBgMenuLi = document.querySelectorAll(
    ".why-section .edit-part .change-edit-part .change-container .why-background-dropdown .menu-colors > li"
  );
  const whyBg = document.querySelector(".why-section");

  const WhyhasBgImage = whySection.style.backgroundImage !== "";

  if (WhyhasBgImage) {
    whyBg.style.background =
      whySection.style.backgroundImage +
      ", " +
      whyBgColor.style.backgroundColor;
  } else {
    // Otherwise, show the background color.
    whyBg.style.background = whyBgColor.style.backgroundColor;
  }

  // whyBg.style.background =  whySection.style + ';' + whyBgColor.style.backgroundColor;
  whyBgColor.addEventListener("click", () => {
    whyBgMenuColors.classList.toggle("active-menu");
  });
  whyBgMenuLi.forEach((item) => {
    item.addEventListener("click", () => {
      whyBgMenuColors.classList.toggle("active-menu");
      var infos = $(item).data("info").split(",");
      var data = {
        colorId: infos[1],
        mainId: infos[0],
        type: infos[3],
        ColId: infos[4],
      };
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_color",
        type: "POST",
        dataType: "JSON",
        data: data,
        success: function (result) {
          if (result == "1") {
            whyBgColor.style.backgroundColor = item.style.backgroundColor;
            whyBg.style.background = whyBgColor.style.backgroundColor;
          }
        },
      });
    });
  });
  // End Why Background

  // Start Why Upload Background Image
  const whyBackgroundImage = document.querySelector(".why-section");
  const whyBackgroundImageInput = document.querySelector(
    ".why-section .edit-part .why-background-image"
  );
  whyBackgroundImageInput.addEventListener("change", () => {
    var fd = new FormData();
    var files = whyBackgroundImageInput.files;

    var mainId = $(whyBackgroundImageInput).data("info");
    // Check file selected or not
    if (files.length > 0) {
      fd.append("Section_Image", files[0]);
      fd.append("id", mainId);
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_bg_img",
        type: "post",
        data: fd,
        contentType: false,
        processData: false,
        success: function (response) {
          if (response == "1") {
            whyBackgroundImage.style.backgroundImage =
              "url(" +
              URL.createObjectURL(whyBackgroundImageInput.files[0]) +
              ")";
            whyBackgroundImage.style.backgroundPosition = "center";
            whyBackgroundImage.style.backgroundRepeat = "no-repeat";
            whyBackgroundImage.style.backgroundSize = "cover";
            whyAddLabel.style.backgroundImage =
              "url(" +
              URL.createObjectURL(whyBackgroundImageInput.files[0]) +
              ")";
          }
        },
      });
    }
  });
  // End Why Upload Background Image

  // Start Why Remove Background Image
  const whyBackgroundImageRemove = document.querySelector(
    ".why-section .edit-part .label-remove-file"
  );
  whyBackgroundImageRemove.addEventListener("click", () => {
    var data = {
      mainId: $(whyBackgroundImageRemove).data("info"),
    };
    $.ajax({
      url: Base_Url + "/acp/liveupdation/bg_img_remove",
      type: "POST",
      dataType: "JSON",
      data: data,
      success: function (result) {
        whyBackgroundImage.style.backgroundImage = "";
        whyBackgroundImage.style.backgroundPosition = "";
        whyBackgroundImage.style.backgroundRepeat = "";
        whyBackgroundImage.style.backgroundSize = "";
        whyAddLabel.style.backgroundImage = "";
        whyBg.style.background = whyBgColor.style.backgroundColor;
      },
    });
  });
  // End Why Remove Background Image
}
// End Why

// Start News
if (newsSection) {
  // Start News Title
  const newsTitleColor = document.querySelector(
    ".news-section .edit-part .change-edit-part .change-container .news-title-dropdown .select-color .selected-color"
  );
  const newsMenuColors = document.querySelector(
    ".news-section .edit-part .change-edit-part .change-container .news-title-dropdown .menu-colors"
  );
  const newsMenuLi = document.querySelectorAll(
    ".news-section .edit-part .change-edit-part .change-container .news-title-dropdown .menu-colors > li"
  );
  const newsTitle = document.querySelector(".news-section .title-section > h1");

  const newsCardDate = document.querySelectorAll(
    ".news-section .cards .card .news-card-text > h3"
  );

  newsTitle.style.color = newsTitleColor.style.backgroundColor;
  newsCardDate.forEach((item) => {
    item.style.color = newsTitleColor.style.backgroundColor;
  });
  newsTitleColor.addEventListener("click", () => {
    newsMenuColors.classList.toggle("active-menu");
  });
  newsMenuLi.forEach((item) => {
    item.addEventListener("click", () => {
      newsMenuColors.classList.toggle("active-menu");
      var infos = $(item).data("info").split(",");
      var data = {
        colorId: infos[1],
        mainId: infos[0],
        type: infos[3],
        ColId: infos[4],
      };
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_color",
        type: "POST",
        dataType: "JSON",
        data: data,
        success: function (result) {
          if (result == "1") {
            newsTitleColor.style.backgroundColor = item.style.backgroundColor;
            newsTitle.style.color = newsTitleColor.style.backgroundColor;
            // newsCardTitle.forEach((item) => {
            //   item.style.color = newsTitleColor.style.backgroundColor;
            // });
            newsCardDate.forEach((item) => {
              item.style.color = newsTitleColor.style.backgroundColor;
            });
          }
        },
      });
    });
  });
  // End News Title

  // Start News Subtitle
  const newsSubtitleColor = document.querySelector(
    ".news-section .edit-part .change-edit-part .change-container .news-subtitle-dropdown .select-color .selected-color"
  );
  const newsSubtitleMenuColors = document.querySelector(
    ".news-section .edit-part .change-edit-part .change-container .news-subtitle-dropdown .menu-colors"
  );
  const newsSubtitleMenuLi = document.querySelectorAll(
    ".news-section .edit-part .change-edit-part .change-container .news-subtitle-dropdown .menu-colors > li"
  );
  const newsSubSubtitle = document.querySelector(
    ".news-section .title-section > p"
  );
  const newsCardTitle = document.querySelectorAll(
    ".news-section .cards .card .img-news-container > h2"
  );
  newsCardTitle.forEach((item) => {
    item.style.color = newsSubtitleColor.style.backgroundColor;
  });

  newsSubSubtitle.style.color = newsSubtitleColor.style.backgroundColor;

  newsSubtitleColor.addEventListener("click", () => {
    newsSubtitleMenuColors.classList.toggle("active-menu");
  });
  newsSubtitleMenuLi.forEach((item) => {
    item.addEventListener("click", () => {
      newsSubtitleMenuColors.classList.toggle("active-menu");
      var infos = $(item).data("info").split(",");
      var data = {
        colorId: infos[1],
        mainId: infos[0],
        type: infos[3],
        ColId: infos[4],
      };
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_color",
        type: "POST",
        dataType: "JSON",
        data: data,
        success: function (result) {
          if (result == "1") {
            newsSubtitleColor.style.backgroundColor =
              item.style.backgroundColor;
            newsSubSubtitle.style.color =
              newsSubtitleColor.style.backgroundColor;
            newsCardTitle.forEach((item) => {
              item.style.color = newsSubtitleColor.style.backgroundColor;
            });
          }
        },
      });
    });
  });
  // End News Subtitle

  // Start News Paragraph
  const newsParagraphColor = document.querySelector(
    ".news-section .edit-part .change-edit-part .change-container .news-paragraph-dropdown .select-color .selected-color"
  );
  const newsParagraphMenuColors = document.querySelector(
    ".news-section .edit-part .change-edit-part .change-container .news-paragraph-dropdown .menu-colors"
  );
  const newsParagraphMenuLi = document.querySelectorAll(
    ".news-section .edit-part .change-edit-part .change-container .news-paragraph-dropdown .menu-colors > li"
  );
  const newsParagraph = document.querySelectorAll(
    ".news-section .cards .card .news-card-text > p"
  );

  newsParagraph.forEach((item) => {
    item.style.color = newsParagraphColor.style.backgroundColor;
  });
  newsParagraphColor.addEventListener("click", () => {
    newsParagraphMenuColors.classList.toggle("active-menu");
  });
  newsParagraphMenuLi.forEach((item) => {
    item.addEventListener("click", () => {
      newsParagraphMenuColors.classList.toggle("active-menu");
      var infos = $(item).data("info").split(",");
      var data = {
        colorId: infos[1],
        mainId: infos[0],
        type: infos[3],
        ColId: infos[4],
      };
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_color",
        type: "POST",
        dataType: "JSON",
        data: data,
        success: function (result) {
          if (result == "1") {
            newsParagraphColor.style.backgroundColor =
              item.style.backgroundColor;
            newsParagraph.forEach((item) => {
              item.style.color = newsParagraphColor.style.backgroundColor;
            });
          }
        },
      });
    });
  });
  // End News Paragraph

  // // Start News Card Button
  // const newsCardButtonColor = document.querySelector(
  //   ".news-section .edit-part .change-edit-part .change-container .news-button-dropdown .select-color .selected-color"
  // );
  // const newsCardButtonMenuColors = document.querySelector(
  //   ".news-section .edit-part .change-edit-part .change-container .news-button-dropdown .menu-colors"
  // );
  // const newsCardButtonMenuLi = document.querySelectorAll(
  //   ".news-section .edit-part .change-edit-part .change-container .news-button-dropdown .menu-colors > li"
  // );
  // const newsCardButton = document.querySelectorAll(
  //   ".news-section .cards .card .news-card-text .read-more-news"
  // );
  // if (newsCardButton) {
  //   newsCardButton.forEach((item) => {
  //     item.style.color = newsCardButtonColor.style.backgroundColor;
  //   });
  //   newsCardButtonColor.addEventListener("click", () => {
  //     newsCardButtonMenuColors.classList.toggle("active-menu");
  //   });
  //   newsCardButtonMenuLi.forEach((item) => {
  //     item.addEventListener("click", () => {
  //       newsCardButtonMenuColors.classList.toggle("active-menu");
  //       var infos = $(item).data("info").split(",");
  //       var data = {
  //         colorId: infos[1],
  //         mainId: infos[0],
  //         type: infos[3],
  //         ColId: infos[4],
  //       };
  //       $.ajax({
  //         url: Base_Url + "/acp/liveupdation/change_color",
  //         type: "POST",
  //         dataType: "JSON",
  //         data: data,
  //         success: function (result) {
  //           if (result == "1") {
  //             newsCardButtonColor.style.backgroundColor =
  //               item.style.backgroundColor;
  //             newsCardButton.forEach((item) => {
  //               item.style.color = newsCardButtonColor.style.backgroundColor;
  //             });
  //           }
  //         },
  //       });
  //     });
  //   });
  // }
  // End News Card Button

  // Start News Background
  const newsBgColor = document.querySelector(
    ".news-section .edit-part .change-edit-part .change-container .news-background-dropdown .select-color .selected-color"
  );
  const newsBgMenuColors = document.querySelector(
    ".news-section .edit-part .change-edit-part .change-container .news-background-dropdown .menu-colors"
  );
  const newsBgMenuLi = document.querySelectorAll(
    ".news-section .edit-part .change-edit-part .change-container .news-background-dropdown .menu-colors > li"
  );
  const newsBg = document.querySelector(".news-section");

  const NewshasBgImage = newsSection.style.backgroundImage !== "";

  if (NewshasBgImage) {
    newsBg.style.background =
      newsSection.style.backgroundImage +
      ", " +
      newsBgColor.style.backgroundColor;
  } else {
    // Otherwise, show the background color.
    newsBg.style.background = newsBgColor.style.backgroundColor;
  }

  // newsBg.style.background = newsSection.style + ';' + newsBgColor.style.backgroundColor;
  newsBgColor.addEventListener("click", () => {
    newsBgMenuColors.classList.toggle("active-menu");
  });
  newsBgMenuLi.forEach((item) => {
    item.addEventListener("click", () => {
      newsBgMenuColors.classList.toggle("active-menu");
      var infos = $(item).data("info").split(",");
      var data = {
        colorId: infos[1],
        mainId: infos[0],
        type: infos[3],
        ColId: infos[4],
      };
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_color",
        type: "POST",
        dataType: "JSON",
        data: data,
        success: function (result) {
          if (result == "1") {
            newsBgColor.style.backgroundColor = item.style.backgroundColor;
            newsBg.style.background = newsBgColor.style.backgroundColor;
          }
        },
      });
    });
  });
  // End News Background

  // Start News Upload Background Image
  const newsBackgroundImage = document.querySelector(".news-section");
  const newsBackgroundImageInput = document.querySelector(
    ".news-section .edit-part .news-background-image"
  );
  newsBackgroundImageInput.addEventListener("change", () => {
    var fd = new FormData();
    var files = newsBackgroundImageInput.files;

    var mainId = $(newsBackgroundImageInput).data("info");
    // Check file selected or not
    if (files.length > 0) {
      fd.append("Section_Image", files[0]);
      fd.append("id", mainId);
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_bg_img",
        type: "post",
        data: fd,
        contentType: false,
        processData: false,
        success: function (response) {
          if (response == "1") {
            newsBackgroundImage.style.backgroundImage =
              "url(" +
              URL.createObjectURL(newsBackgroundImageInput.files[0]) +
              ")";
            newsBackgroundImage.style.backgroundPosition = "center";
            newsBackgroundImage.style.backgroundRepeat = "no-repeat";
            newsBackgroundImage.style.backgroundSize = "cover";
            newsAddLabel.style.backgroundImage =
              "url(" +
              URL.createObjectURL(newsBackgroundImageInput.files[0]) +
              ")";
          }
        },
      });
    }
  });
  // End News Upload Background Image

  // Start News Remove Background Image
  const newsBackgroundImageRemove = document.querySelector(
    ".news-section .edit-part .label-remove-file"
  );
  newsBackgroundImageRemove.addEventListener("click", () => {
    var data = {
      mainId: $(newsBackgroundImageRemove).data("info"),
    };
    $.ajax({
      url: Base_Url + "/acp/liveupdation/bg_img_remove",
      type: "POST",
      dataType: "JSON",
      data: data,
      success: function (result) {
        newsBackgroundImage.style.backgroundImage = "";
        newsBackgroundImage.style.backgroundPosition = "";
        newsBackgroundImage.style.backgroundRepeat = "";
        newsBackgroundImage.style.backgroundSize = "";
        newsAddLabel.style.backgroundImage = "";
        newsBg.style.background = newsBgColor.style.backgroundColor;
      },
    });
  });
  // End News Remove Background Image
}
// End News

// Start Show
if (showSection) {
  // Start Show Title
  const showTitleColor = document.querySelector(
    ".show-section .edit-part .change-edit-part .change-container .show-title-dropdown .select-color .selected-color"
  );
  const showMenuColors = document.querySelector(
    ".show-section .edit-part .change-edit-part .change-container .show-title-dropdown .menu-colors"
  );
  const showMenuLi = document.querySelectorAll(
    ".show-section .edit-part .change-edit-part .change-container .show-title-dropdown .menu-colors > li"
  );
  const showTitle = document.querySelector(".show-section .title-section > h1");

  showTitle.style.color = showTitleColor.style.backgroundColor;
  showTitleColor.addEventListener("click", () => {
    showMenuColors.classList.toggle("active-menu");
  });
  showMenuLi.forEach((item) => {
    item.addEventListener("click", () => {
      showMenuColors.classList.toggle("active-menu");
      var infos = $(item).data("info").split(",");
      var data = {
        colorId: infos[1],
        mainId: infos[0],
        type: infos[3],
        ColId: infos[4],
      };
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_color",
        type: "POST",
        dataType: "JSON",
        data: data,
        success: function (result) {
          if (result == "1") {
            showTitleColor.style.backgroundColor = item.style.backgroundColor;
            showTitle.style.color = showTitleColor.style.backgroundColor;
          }
        },
      });
    });
  });
  // End Show Title

  // Start Show Subtitle
  const showSubTitleColor = document.querySelector(
    ".show-section .edit-part .change-edit-part .change-container .show-subtitle-dropdown .select-color .selected-color"
  );
  const showSubMenuColors = document.querySelector(
    ".show-section .edit-part .change-edit-part .change-container .show-subtitle-dropdown .menu-colors"
  );
  const showSubMenuLi = document.querySelectorAll(
    ".show-section .edit-part .change-edit-part .change-container .show-subtitle-dropdown .menu-colors > li"
  );
  const showSubParagraph = document.querySelector(
    ".show-section .title-section > p"
  );

  showSubParagraph.style.color = showSubTitleColor.style.backgroundColor;
  showSubTitleColor.addEventListener("click", () => {
    showSubMenuColors.classList.toggle("active-menu");
  });
  showSubMenuLi.forEach((item) => {
    item.addEventListener("click", () => {
      showSubMenuColors.classList.toggle("active-menu");
      var infos = $(item).data("info").split(",");
      var data = {
        colorId: infos[1],
        mainId: infos[0],
        type: infos[3],
        ColId: infos[4],
      };
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_color",
        type: "POST",
        dataType: "JSON",
        data: data,
        success: function (result) {
          if (result == "1") {
            showSubTitleColor.style.backgroundColor =
              item.style.backgroundColor;
            showSubParagraph.style.color =
              showSubTitleColor.style.backgroundColor;
          }
        },
      });
    });
  });
  // End Show Subtitle

  // Start Show Background
  const showBgColor = document.querySelector(
    ".show-section .edit-part .change-edit-part .change-container .show-background-dropdown .select-color .selected-color"
  );
  const showBgMenuColors = document.querySelector(
    ".show-section .edit-part .change-edit-part .change-container .show-background-dropdown .menu-colors"
  );
  const showBgMenuLi = document.querySelectorAll(
    ".show-section .edit-part .change-edit-part .change-container .show-background-dropdown .menu-colors > li"
  );
  const showBg = document.querySelector(".show-section");

  // Check if the `.show-section` class has a background image.
  const ShowhasBgImage = showSection.style.backgroundImage !== "";

  // If the `.show-section` class has a background image, show the background image.
  if (ShowhasBgImage) {
    showBg.style.background =
      showSection.style.backgroundImage +
      ", " +
      showBgColor.style.backgroundColor;
  } else {
    // Otherwise, show the background color.
    showBg.style.background = showBgColor.style.backgroundColor;
  }

  // showBg.style.background = showSection.style + ';' + showBgColor.style.backgroundColor;
  showBgColor.addEventListener("click", () => {
    showBgMenuColors.classList.toggle("active-menu");
  });
  showBgMenuLi.forEach((item) => {
    item.addEventListener("click", () => {
      showBgMenuColors.classList.toggle("active-menu");
      var infos = $(item).data("info").split(",");
      var data = {
        colorId: infos[1],
        mainId: infos[0],
        type: infos[3],
        ColId: infos[4],
      };
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_color",
        type: "POST",
        dataType: "JSON",
        data: data,
        success: function (result) {
          if (result == "1") {
            showBgColor.style.backgroundColor = item.style.backgroundColor;
            showBg.style.background = showBgColor.style.backgroundColor;
          }
        },
      });
    });
  });
  // End Show Background

  // Start Show Upload Background Image
  const showBackgroundImage = document.querySelector(".show-section");
  const showBackgroundImageInput = document.querySelector(
    ".show-section .edit-part .show-background-image"
  );
  showBackgroundImageInput.addEventListener("change", () => {
    var fd = new FormData();
    var files = showBackgroundImageInput.files;

    var mainId = $(showBackgroundImageInput).data("info");
    // Check file selected or not
    if (files.length > 0) {
      fd.append("Section_Image", files[0]);
      fd.append("id", mainId);
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_bg_img",
        type: "post",
        data: fd,
        contentType: false,
        processData: false,
        success: function (response) {
          if (response == "1") {
            showBackgroundImage.style.backgroundImage =
              "url(" +
              URL.createObjectURL(showBackgroundImageInput.files[0]) +
              ")";
            showBackgroundImage.style.backgroundPosition = "center";
            showBackgroundImage.style.backgroundRepeat = "no-repeat";
            showBackgroundImage.style.backgroundSize = "cover";
            showAddLabel.style.backgroundImage =
              "url(" +
              URL.createObjectURL(showBackgroundImageInput.files[0]) +
              ")";
          }
        },
      });
    }
  });
  // End Show Upload Background Image

  // Start Show Remove Background Image
  const showBackgroundImageRemove = document.querySelector(
    ".show-section .edit-part .label-remove-file"
  );
  showBackgroundImageRemove.addEventListener("click", () => {
    var data = {
      mainId: $(showBackgroundImageRemove).data("info"),
    };
    $.ajax({
      url: Base_Url + "/acp/liveupdation/bg_img_remove",
      type: "POST",
      dataType: "JSON",
      data: data,
      success: function (result) {
        showBackgroundImage.style.backgroundImage = "";
        showBackgroundImage.style.backgroundPosition = "";
        showBackgroundImage.style.backgroundRepeat = "";
        showBackgroundImage.style.backgroundSize = "";
        showAddLabel.style.backgroundImage = "";
        showBg.style.background = showBgColor.style.backgroundColor;
      },
    });
  });
  // End Show Remove Background Image
}
// End Show

// Start Branches
if (branchesSection) {
  // Start Branches Title
  const branchesTitleColor = document.querySelector(
    ".branches-section .edit-part .change-edit-part .change-container .branches-title-dropdown .select-color .selected-color"
  );
  const branchesMenuColors = document.querySelector(
    ".branches-section .edit-part .change-edit-part .change-container .branches-title-dropdown .menu-colors"
  );
  const branchesMenuLi = document.querySelectorAll(
    ".branches-section .edit-part .change-edit-part .change-container .branches-title-dropdown .menu-colors > li"
  );
  const branchesTitle = document.querySelector(
    ".branches-section .title-section > h1"
  );

  branchesTitle.style.color = branchesTitleColor.style.backgroundColor;
  branchesTitleColor.addEventListener("click", () => {
    branchesMenuColors.classList.toggle("active-menu");
  });
  branchesMenuLi.forEach((item) => {
    item.addEventListener("click", () => {
      branchesMenuColors.classList.toggle("active-menu");
      var infos = $(item).data("info").split(",");
      var data = {
        colorId: infos[1],
        mainId: infos[0],
        type: infos[3],
        ColId: infos[4],
      };
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_color",
        type: "POST",
        dataType: "JSON",
        data: data,
        success: function (result) {
          if (result == "1") {
            branchesTitleColor.style.backgroundColor =
              item.style.backgroundColor;
            branchesTitle.style.color =
              branchesTitleColor.style.backgroundColor;
          }
        },
      });
    });
  });
  // End Branches Title

  // Start Branches Card Title and Paragraph
  const branchesCardTitleColor = document.querySelector(
    ".branches-section .edit-part .change-edit-part .change-container .branches-subtitle-dropdown .select-color .selected-color"
  );
  const branchesCardTitleMenuColors = document.querySelector(
    ".branches-section .edit-part .change-edit-part .change-container .branches-subtitle-dropdown .menu-colors"
  );
  const branchesCardTitleMenuLi = document.querySelectorAll(
    ".branches-section .edit-part .change-edit-part .change-container .branches-subtitle-dropdown .menu-colors > li"
  );
  const branchesCardTitle = document.querySelectorAll(
    ".branches-section .cards .card .branch-card-text > h2"
  );
  const branchesSubParagraph = document.querySelector(
    ".branches-section .title-section > p"
  );

  branchesSubParagraph.style.color =
    branchesCardTitleColor.style.backgroundColor;
  branchesCardTitle.forEach((item) => {
    item.style.color = branchesCardTitleColor.style.backgroundColor;
  });
  branchesCardTitleColor.addEventListener("click", () => {
    branchesCardTitleMenuColors.classList.toggle("active-menu");
  });
  branchesCardTitleMenuLi.forEach((item) => {
    item.addEventListener("click", () => {
      branchesCardTitleMenuColors.classList.toggle("active-menu");
      var infos = $(item).data("info").split(",");
      var data = {
        colorId: infos[1],
        mainId: infos[0],
        type: infos[3],
        ColId: infos[4],
      };
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_color",
        type: "POST",
        dataType: "JSON",
        data: data,
        success: function (result) {
          if (result == "1") {
            branchesCardTitleColor.style.backgroundColor =
              item.style.backgroundColor;
            branchesSubParagraph.style.color =
              branchesCardTitleColor.style.backgroundColor;
            branchesCardTitle.forEach((item) => {
              item.style.color = branchesCardTitleColor.style.backgroundColor;
            });
          }
        },
      });
    });
  });
  // End Branches Card Title

  // Start Branches Card Paragraph
  const branchesCardParagraphColor = document.querySelector(
    ".branches-section .edit-part .change-edit-part .change-container .branches-paragraph-dropdown .select-color .selected-color"
  );
  const branchesCardParagraphMenuColors = document.querySelector(
    ".branches-section .edit-part .change-edit-part .change-container .branches-paragraph-dropdown .menu-colors"
  );
  const branchesCardParagraphMenuLi = document.querySelectorAll(
    ".branches-section .edit-part .change-edit-part .change-container .branches-paragraph-dropdown .menu-colors > li"
  );
  const branchesCardParagraph = document.querySelectorAll(
    ".branches-section .cards .card .branch-card-text > p"
  );

  const branchesCardButton = document.querySelector(
    ".branches-section .branches-content .read-more.general-btn .read-more-btn"
  );
  // if (branchesCardButton) {
  //   branchesCardButton.style.color =
  //     branchesCardParagraphColor.style.backgroundColor;
  //   branchesCardButton.style.borderColor =
  //     branchesCardParagraphColor.style.backgroundColor;
  // }

  branchesCardParagraph.forEach((item) => {
    item.style.color = branchesCardParagraphColor.style.backgroundColor;
  });
  branchesCardParagraphColor.addEventListener("click", () => {
    branchesCardParagraphMenuColors.classList.toggle("active-menu");
  });
  branchesCardParagraphMenuLi.forEach((item) => {
    item.addEventListener("click", () => {
      var infos = $(item).data("info").split(",");
      var data = {
        colorId: infos[1],
        mainId: infos[0],
        type: infos[3],
        ColId: infos[4],
      };
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_color",
        type: "POST",
        dataType: "JSON",
        data: data,
        success: function (result) {
          if (result == "1") {
            branchesCardParagraphMenuColors.classList.toggle("active-menu");
            branchesCardParagraphColor.style.backgroundColor =
              item.style.backgroundColor;
            branchesCardParagraph.forEach((item) => {
              item.style.color =
                branchesCardParagraphColor.style.backgroundColor;
            });
            // if (branchesCardButton) {
            //   branchesCardButton.style.color =
            //     branchesCardParagraphColor.style.backgroundColor;
            //   branchesCardButton.style.borderColor =
            //     branchesCardParagraphColor.style.backgroundColor;
            // }
          }
        },
      });
    });
  });
  // End Branches Card Paragraph

  // Start Branches Button BG
  const branchesButtonBgSelected = document.querySelector(
    ".branches-section .edit-part .change-edit-part .change-container .branches-button-dropdown .select-color .selected-color"
  );
  const branchesButtonBgMenuColors = document.querySelector(
    ".branches-section .edit-part .change-edit-part .change-container .branches-button-dropdown .menu-colors"
  );
  const branchesButtonBgMenuLi = document.querySelectorAll(
    ".branches-section .edit-part .change-edit-part .change-container .branches-button-dropdown .menu-colors > li"
  );
  const branchesButtonBg = document.querySelector(
    ".branches-section .branches-content .read-more.general-btn .read-more-btn"
  );
  if (branchesButtonBg) {
    branchesButtonBg.style.backgroundColor =
      branchesButtonBgSelected.style.backgroundColor;
    branchesButtonBgSelected.addEventListener("click", () => {
      branchesButtonBgMenuColors.classList.toggle("active-menu");
    });
    branchesButtonBgMenuLi.forEach((item) => {
      item.addEventListener("click", () => {
        branchesButtonBgMenuColors.classList.toggle("active-menu");
        var infos = $(item).data("info").split(",");
        var data = {
          colorId: infos[1],
          mainId: infos[0],
          type: infos[3],
          ColId: infos[4],
        };
        $.ajax({
          url: Base_Url + "/acp/liveupdation/change_color",
          type: "POST",
          dataType: "JSON",
          data: data,
          success: function (result) {
            if (result == "1") {
              branchesButtonBgSelected.style.backgroundColor =
                item.style.backgroundColor;
              branchesButtonBg.style.backgroundColor =
                branchesButtonBgSelected.style.backgroundColor;
            }
          },
        });
      });
    });
  }
  // End Branches Button BG

  // Start Branches Background
  const branchesBgColor = document.querySelector(
    ".branches-section .edit-part .change-edit-part .change-container .branches-background-dropdown .select-color .selected-color"
  );
  const branchesBgMenuColors = document.querySelector(
    ".branches-section .edit-part .change-edit-part .change-container .branches-background-dropdown .menu-colors"
  );
  const branchesBgMenuLi = document.querySelectorAll(
    ".branches-section .edit-part .change-edit-part .change-container .branches-background-dropdown .menu-colors > li"
  );
  const branchesBg = document.querySelector(".branches-section");

  const BrancheshasBgImage = branchesSection.style.backgroundImage !== "";

  if (BrancheshasBgImage) {
    branchesBg.style.background =
      branchesSection.style.backgroundImage +
      ", " +
      branchesBgColor.style.backgroundColor;
  } else {
    // Otherwise, show the background color.
    branchesBg.style.background = branchesBgColor.style.backgroundColor;
  }

  // branchesBg.style.background = branchesSection.style + ';' + branchesBgColor.style.backgroundColor;
  branchesBgColor.addEventListener("click", () => {
    branchesBgMenuColors.classList.toggle("active-menu");
  });
  branchesBgMenuLi.forEach((item) => {
    item.addEventListener("click", () => {
      branchesBgMenuColors.classList.toggle("active-menu");
      var infos = $(item).data("info").split(",");
      var data = {
        colorId: infos[1],
        mainId: infos[0],
        type: infos[3],
        ColId: infos[4],
      };
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_color",
        type: "POST",
        dataType: "JSON",
        data: data,
        success: function (result) {
          if (result == "1") {
            branchesBgColor.style.backgroundColor = item.style.backgroundColor;
            branchesBg.style.background = branchesBgColor.style.backgroundColor;
          }
        },
      });
    });
  });
  // End Branches Background

  // Start Branches Upload Background Image
  const branchesBackgroundImage = document.querySelector(".branches-section");
  const branchesBackgroundImageInput = document.querySelector(
    ".branches-section .edit-part .branches-background-image"
  );
  branchesBackgroundImageInput.addEventListener("change", () => {
    var fd = new FormData();
    var files = branchesBackgroundImageInput.files;

    var mainId = $(branchesBackgroundImageInput).data("info");
    // Check file selected or not
    if (files.length > 0) {
      fd.append("Section_Image", files[0]);
      fd.append("id", mainId);
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_bg_img",
        type: "post",
        data: fd,
        contentType: false,
        processData: false,
        success: function (response) {
          if (response == "1") {
            branchesBackgroundImage.style.backgroundImage =
              "url(" +
              URL.createObjectURL(branchesBackgroundImageInput.files[0]) +
              ")";
            branchesBackgroundImage.style.backgroundPosition = "center";
            branchesBackgroundImage.style.backgroundRepeat = "no-repeat";
            branchesBackgroundImage.style.backgroundSize = "cover";
            branchesAddLabel.style.backgroundImage =
              "url(" +
              URL.createObjectURL(branchesBackgroundImageInput.files[0]) +
              ")";
          }
        },
      });
    }
  });
  // End Branches Upload Background Image

  // Start Branches Remove Background Image
  const branchesBackgroundImageRemove = document.querySelector(
    ".branches-section .edit-part .label-remove-file"
  );
  branchesBackgroundImageRemove.addEventListener("click", () => {
    var data = {
      mainId: $(branchesBackgroundImageRemove).data("info"),
    };
    $.ajax({
      url: Base_Url + "/acp/liveupdation/bg_img_remove",
      type: "POST",
      dataType: "JSON",
      data: data,
      success: function (result) {
        branchesBackgroundImage.style.backgroundImage = "";
        branchesBackgroundImage.style.backgroundPosition = "";
        branchesBackgroundImage.style.backgroundRepeat = "";
        branchesBackgroundImage.style.backgroundSize = "";
        branchesAddLabel.style.backgroundImage = "";
        branchesBg.style.background = branchesBgColor.style.backgroundColor;
      },
    });
  });
  // End Branches Remove Background Image
}
// End Branches

// Start Gallery
if (gallerySection) {
  // Start Gallery Title
  const galleryTitleColor = document.querySelector(
    ".gallery-section .edit-part .change-edit-part .change-container .gallery-title-dropdown .select-color .selected-color"
  );
  const galleryMenuColors = document.querySelector(
    ".gallery-section .edit-part .change-edit-part .change-container .gallery-title-dropdown .menu-colors"
  );
  const galleryMenuLi = document.querySelectorAll(
    ".gallery-section .edit-part .change-edit-part .change-container .gallery-title-dropdown .menu-colors > li"
  );
  const galleryTitle = document.querySelector(
    ".gallery-section .title-section > h1"
  );

  galleryTitle.style.color = galleryTitleColor.style.backgroundColor;
  galleryTitleColor.addEventListener("click", () => {
    galleryMenuColors.classList.toggle("active-menu");
  });
  galleryMenuLi.forEach((item) => {
    item.addEventListener("click", () => {
      galleryMenuColors.classList.toggle("active-menu");
      var infos = $(item).data("info").split(",");
      var data = {
        colorId: infos[1],
        mainId: infos[0],
        type: infos[3],
        ColId: infos[4],
      };
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_color",
        type: "POST",
        dataType: "JSON",
        data: data,
        success: function (result) {
          if (result == "1") {
            galleryTitleColor.style.backgroundColor =
              item.style.backgroundColor;
            galleryTitle.style.color = galleryTitleColor.style.backgroundColor;
          }
        },
      });
    });
  });
  // End Gallery Title

  // Start Gallery Subtitle
  const gallerySubTitleColor = document.querySelector(
    ".gallery-section .edit-part .change-edit-part .change-container .gallery-subtitle-dropdown .select-color .selected-color"
  );
  const gallerySubMenuColors = document.querySelector(
    ".gallery-section .edit-part .change-edit-part .change-container .gallery-subtitle-dropdown .menu-colors"
  );
  const gallerySubMenuLi = document.querySelectorAll(
    ".gallery-section .edit-part .change-edit-part .change-container .gallery-subtitle-dropdown .menu-colors > li"
  );
  const gallerySubParagraph = document.querySelector(
    ".gallery-section .gallery-content .title-section > p"
  );

  gallerySubParagraph.style.color = gallerySubTitleColor.style.backgroundColor;
  gallerySubTitleColor.addEventListener("click", () => {
    gallerySubMenuColors.classList.toggle("active-menu");
  });
  gallerySubMenuLi.forEach((item) => {
    item.addEventListener("click", () => {
      gallerySubMenuColors.classList.toggle("active-menu");
      var infos = $(item).data("info").split(",");
      var data = {
        colorId: infos[1],
        mainId: infos[0],
        type: infos[3],
        ColId: infos[4],
      };
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_color",
        type: "POST",
        dataType: "JSON",
        data: data,
        success: function (result) {
          if (result == "1") {
            gallerySubTitleColor.style.backgroundColor =
              item.style.backgroundColor;
            gallerySubParagraph.style.color =
              gallerySubTitleColor.style.backgroundColor;
          }
        },
      });
    });
  });
  // End Gallery Subtitle

  // Start Gallery Button
  const galleryCardButtonColor = document.querySelector(
    ".gallery-section .edit-part .change-edit-part .change-container .gallery-button-dropdown .select-color .selected-color"
  );
  const galleryCardButtonMenuColors = document.querySelector(
    ".gallery-section .edit-part .change-edit-part .change-container .gallery-button-dropdown .menu-colors"
  );
  const galleryCardButtonMenuLi = document.querySelectorAll(
    ".gallery-section .edit-part .change-edit-part .change-container .gallery-button-dropdown .menu-colors > li"
  );
  const galleryCardButton = document.querySelector(
    ".gallery-section .read-more.general-btn .read-more-btn"
  );
  if (galleryCardButton) {
    galleryCardButton.style.backgroundColor =
      galleryCardButtonColor.style.backgroundColor;
    galleryCardButton.style.borderColor =
      galleryCardButtonColor.style.backgroundColor;
    galleryCardButtonColor.addEventListener("click", () => {
      galleryCardButtonMenuColors.classList.toggle("active-menu");
    });
    galleryCardButtonMenuLi.forEach((item) => {
      item.addEventListener("click", () => {
        galleryCardButtonMenuColors.classList.toggle("active-menu");
        var infos = $(item).data("info").split(",");
        var data = {
          colorId: infos[1],
          mainId: infos[0],
          type: infos[3],
          ColId: infos[4],
        };
        $.ajax({
          url: Base_Url + "/acp/liveupdation/change_color",
          type: "POST",
          dataType: "JSON",
          data: data,
          success: function (result) {
            if (result == "1") {
              galleryCardButtonColor.style.backgroundColor =
                item.style.backgroundColor;
              galleryCardButton.style.backgroundColor =
                galleryCardButtonColor.style.backgroundColor;
              galleryCardButton.style.borderColor =
                galleryCardButtonColor.style.backgroundColor;
            }
          },
        });
      });
    });
  }
  // End Gallery Button

  // Start Gallery Button BG
  // const galleryButtonBgSelected = document.querySelector(
  //   ".gallery-section .edit-part .change-edit-part .change-container .gallery-button-bg-dropdown .select-color .selected-color"
  // );
  // const galleryButtonBgMenuColors = document.querySelector(
  //   ".gallery-section .edit-part .change-edit-part .change-container .gallery-button-bg-dropdown .menu-colors"
  // );
  // const galleryButtonBgMenuLi = document.querySelectorAll(
  //   ".gallery-section .edit-part .change-edit-part .change-container .gallery-button-bg-dropdown .menu-colors > li"
  // );
  // const galleryButtonBg = document.querySelector(
  //   ".gallery-section  .read-more.general-btn .read-more-btn"
  // );
  // if (galleryButtonBg) {
  //   galleryButtonBg.style.backgroundColor =
  //     galleryButtonBgSelected.style.backgroundColor;
  //   galleryButtonBgSelected.addEventListener("click", () => {
  //     galleryButtonBgMenuColors.classList.toggle("active-menu");
  //   });
  //   galleryButtonBgMenuLi.forEach((item) => {
  //     item.addEventListener("click", () => {
  //       galleryButtonBgMenuColors.classList.toggle("active-menu");
  //       var infos = $(item).data("info").split(",");
  //       var data = {
  //         colorId: infos[1],
  //         mainId: infos[0],
  //         type: infos[3],
  //         ColId: infos[4],
  //       };
  //       $.ajax({
  //         url: Base_Url + "/acp/liveupdation/change_color",
  //         type: "POST",
  //         dataType: "JSON",
  //         data: data,
  //         success: function (result) {
  //           if (result == "1") {
  //             galleryButtonBgSelected.style.backgroundColor =
  //               item.style.backgroundColor;
  //             galleryButtonBg.style.backgroundColor =
  //               galleryButtonBgSelected.style.backgroundColor;
  //           }
  //         },
  //       });
  //     });
  //   });
  // }
  // End Gallery Button BG

  // Start Gallery Background
  const galleryBgColor = document.querySelector(
    ".gallery-section .edit-part .change-edit-part .change-container .gallery-background-dropdown .select-color .selected-color"
  );
  const galleryBgMenuColors = document.querySelector(
    ".gallery-section .edit-part .change-edit-part .change-container .gallery-background-dropdown .menu-colors"
  );
  const galleryBgMenuLi = document.querySelectorAll(
    ".gallery-section .edit-part .change-edit-part .change-container .gallery-background-dropdown .menu-colors > li"
  );
  const galleryBg = document.querySelector(".gallery-section");

  const GalleryhasBgImage = gallerySection.style.backgroundImage !== "";

  if (GalleryhasBgImage) {
    galleryBg.style.background =
      gallerySection.style.backgroundImage +
      ", " +
      galleryBgColor.style.backgroundColor;
  } else {
    // Otherwise, show the background color.
    galleryBg.style.background = galleryBgColor.style.backgroundColor;
  }

  // galleryBg.style.background = gallerySection.style + ';' + galleryBgColor.style.backgroundColor;
  galleryBgColor.addEventListener("click", () => {
    galleryBgMenuColors.classList.toggle("active-menu");
  });
  galleryBgMenuLi.forEach((item) => {
    item.addEventListener("click", () => {
      galleryBgMenuColors.classList.toggle("active-menu");
      var infos = $(item).data("info").split(",");
      var data = {
        colorId: infos[1],
        mainId: infos[0],
        type: infos[3],
        ColId: infos[4],
      };
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_color",
        type: "POST",
        dataType: "JSON",
        data: data,
        success: function (result) {
          if (result == "1") {
            galleryBgColor.style.backgroundColor = item.style.backgroundColor;
            galleryBg.style.background = galleryBgColor.style.backgroundColor;
          }
        },
      });
    });
  });
  // End Gallery Background

  // Start Gallery Upload Background Image
  const galleryBackgroundImage = document.querySelector(".gallery-section");
  const galleryBackgroundImageInput = document.querySelector(
    ".gallery-section .edit-part .gallery-background-image"
  );
  galleryBackgroundImageInput.addEventListener("change", () => {
    var fd = new FormData();
    var files = galleryBackgroundImageInput.files;

    var mainId = $(galleryBackgroundImageInput).data("info");
    // Check file selected or not
    if (files.length > 0) {
      fd.append("Section_Image", files[0]);
      fd.append("id", mainId);
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_bg_img",
        type: "post",
        data: fd,
        contentType: false,
        processData: false,
        success: function (response) {
          if (response == "1") {
            galleryBackgroundImage.style.backgroundImage =
              "url(" +
              URL.createObjectURL(galleryBackgroundImageInput.files[0]) +
              ")";
            galleryBackgroundImage.style.backgroundPosition = "center";
            galleryBackgroundImage.style.backgroundRepeat = "no-repeat";
            galleryBackgroundImage.style.backgroundSize = "cover";
            galleryAddLabel.style.backgroundImage =
              "url(" +
              URL.createObjectURL(galleryBackgroundImageInput.files[0]) +
              ")";
          }
        },
      });
    }
  });
  // End Gallery Upload Background Image

  // Start Gallery Remove Background Image
  const galleryBackgroundImageRemove = document.querySelector(
    ".gallery-section .edit-part .label-remove-file"
  );
  galleryBackgroundImageRemove.addEventListener("click", () => {
    var data = {
      mainId: $(galleryBackgroundImageRemove).data("info"),
    };
    $.ajax({
      url: Base_Url + "/acp/liveupdation/bg_img_remove",
      type: "POST",
      dataType: "JSON",
      data: data,
      success: function (result) {
        galleryBackgroundImage.style.backgroundImage = "";
        galleryBackgroundImage.style.backgroundPosition = "";
        galleryBackgroundImage.style.backgroundRepeat = "";
        galleryBackgroundImage.style.backgroundSize = "";
        galleryAddLabel.style.backgroundImage = "";
        galleryBg.style.background = galleryBgColor.style.backgroundColor;
      },
    });
  });
  // End Gallery Remove Background Image
}
// End Gallery

// Start Clients
if (clientsSection) {
  // Start Clients Title
  const clientsTitleColor = document.querySelector(
    ".clients-section .edit-part .change-edit-part .change-container .clients-title-dropdown .select-color .selected-color"
  );
  const clientsMenuColors = document.querySelector(
    ".clients-section .edit-part .change-edit-part .change-container .clients-title-dropdown .menu-colors"
  );
  const clientsMenuLi = document.querySelectorAll(
    ".clients-section .edit-part .change-edit-part .change-container .clients-title-dropdown .menu-colors > li"
  );
  const clientsTitle = document.querySelector(
    ".clients-section .title-section > h1"
  );

  clientsTitle.style.color = clientsTitleColor.style.backgroundColor;
  clientsTitleColor.addEventListener("click", () => {
    clientsMenuColors.classList.toggle("active-menu");
  });
  clientsMenuLi.forEach((item) => {
    item.addEventListener("click", () => {
      clientsMenuColors.classList.toggle("active-menu");
      var infos = $(item).data("info").split(",");
      var data = {
        colorId: infos[1],
        mainId: infos[0],
        type: infos[3],
        ColId: infos[4],
      };
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_color",
        type: "POST",
        dataType: "JSON",
        data: data,
        success: function (result) {
          if (result == "1") {
            clientsTitleColor.style.backgroundColor =
              item.style.backgroundColor;
            clientsTitle.style.color = clientsTitleColor.style.backgroundColor;
          }
        },
      });
    });
  });
  // End Clients Title

  // Start Clients Subtitle
  const clientsSubTitleColor = document.querySelector(
    ".clients-section .edit-part .change-edit-part .change-container .clients-subtitle-dropdown .select-color .selected-color"
  );
  const clientsSubMenuColors = document.querySelector(
    ".clients-section .edit-part .change-edit-part .change-container .clients-subtitle-dropdown .menu-colors"
  );
  const clientsSubMenuLi = document.querySelectorAll(
    ".clients-section .edit-part .change-edit-part .change-container .clients-subtitle-dropdown .menu-colors > li"
  );
  const clientsSubParagraph = document.querySelector(
    ".clients-section .clients-content .title-section > p"
  );

  clientsSubParagraph.style.color = clientsSubTitleColor.style.backgroundColor;
  clientsSubTitleColor.addEventListener("click", () => {
    clientsSubMenuColors.classList.toggle("active-menu");
  });
  clientsSubMenuLi.forEach((item) => {
    item.addEventListener("click", () => {
      clientsSubMenuColors.classList.toggle("active-menu");
      var infos = $(item).data("info").split(",");
      var data = {
        colorId: infos[1],
        mainId: infos[0],
        type: infos[3],
        ColId: infos[4],
      };
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_color",
        type: "POST",
        dataType: "JSON",
        data: data,
        success: function (result) {
          if (result == "1") {
            clientsSubTitleColor.style.backgroundColor =
              item.style.backgroundColor;
            clientsSubParagraph.style.color =
              clientsSubTitleColor.style.backgroundColor;
          }
        },
      });
    });
  });
  // End Clients Subtitle

  // Start Clients Background
  const clientsBgColor = document.querySelector(
    ".clients-section .edit-part .change-edit-part .change-container .clients-background-dropdown .select-color .selected-color"
  );
  const clientsBgMenuColors = document.querySelector(
    ".clients-section .edit-part .change-edit-part .change-container .clients-background-dropdown .menu-colors"
  );
  const clientsBgMenuLi = document.querySelectorAll(
    ".clients-section .edit-part .change-edit-part .change-container .clients-background-dropdown .menu-colors > li"
  );
  const clientsBg = document.querySelector(".clients-section");

  const ClienthasBgImage = clientsSection.style.backgroundImage !== "";

  if (ClienthasBgImage) {
    clientsBg.style.background =
      clientsSection.style.backgroundImage +
      ", " +
      clientsBgColor.style.backgroundColor;
  } else {
    // Otherwise, show the background color.
    clientsBg.style.background = clientsBgColor.style.backgroundColor;
  }

  // clientsBg.style.background = clientsSection.style + ';' + clientsBgColor.style.backgroundColor;
  clientsBgColor.addEventListener("click", () => {
    clientsBgMenuColors.classList.toggle("active-menu");
  });
  clientsBgMenuLi.forEach((item) => {
    item.addEventListener("click", () => {
      clientsBgMenuColors.classList.toggle("active-menu");
      var infos = $(item).data("info").split(",");
      var data = {
        colorId: infos[1],
        mainId: infos[0],
        type: infos[3],
        ColId: infos[4],
      };
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_color",
        type: "POST",
        dataType: "JSON",
        data: data,
        success: function (result) {
          if (result == "1") {
            clientsBgColor.style.backgroundColor = item.style.backgroundColor;
            clientsBg.style.background = clientsBgColor.style.backgroundColor;
          }
        },
      });
    });
  });
  // End Clients Background

  // Start Clients Upload Background Image
  const clientsBackgroundImage = document.querySelector(".clients-section");
  const clientsBackgroundImageInput = document.querySelector(
    ".clients-section .edit-part .clients-background-image"
  );
  clientsBackgroundImageInput.addEventListener("change", () => {
    var fd = new FormData();
    var files = clientsBackgroundImageInput.files;

    var mainId = $(clientsBackgroundImageInput).data("info");
    // Check file selected or not
    if (files.length > 0) {
      fd.append("Section_Image", files[0]);
      fd.append("id", mainId);
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_bg_img",
        type: "post",
        data: fd,
        contentType: false,
        processData: false,
        success: function (response) {
          if (response == "1") {
            clientsBackgroundImage.style.backgroundImage =
              "url(" +
              URL.createObjectURL(clientsBackgroundImageInput.files[0]) +
              ")";
            clientsBackgroundImage.style.backgroundPosition = "center";
            clientsBackgroundImage.style.backgroundRepeat = "no-repeat";
            clientsBackgroundImage.style.backgroundSize = "cover";
            clientsAddLabel.style.backgroundImage =
              "url(" +
              URL.createObjectURL(clientsBackgroundImageInput.files[0]) +
              ")";
          }
        },
      });
    }
  });
  // End Clients Upload Background Image

  // Start Clients Remove Background Image
  const clientsBackgroundImageRemove = document.querySelector(
    ".clients-section .edit-part .label-remove-file"
  );
  clientsBackgroundImageRemove.addEventListener("click", () => {
    var data = {
      mainId: $(clientsBackgroundImageRemove).data("info"),
    };
    $.ajax({
      url: Base_Url + "/acp/liveupdation/bg_img_remove",
      type: "POST",
      dataType: "JSON",
      data: data,
      success: function (result) {
        clientsBackgroundImage.style.backgroundImage = "";
        clientsBackgroundImage.style.backgroundPosition = "";
        clientsBackgroundImage.style.backgroundRepeat = "";
        clientsBackgroundImage.style.backgroundSize = "";
        clientsAddLabel.style.backgroundImage = "";
        clientsBg.style.background = clientsBgColor.style.backgroundColor;
      },
    });
  });
  // End Clients Remove Background Image
}
// End Clients

// Start Apps
if (appsSection) {
  // Start Apps Title
  const appsTitleColor = document.querySelector(
    ".apps-section .edit-part .change-edit-part .change-container .apps-title-dropdown .select-color .selected-color"
  );
  const appsMenuColors = document.querySelector(
    ".apps-section .edit-part .change-edit-part .change-container .apps-title-dropdown .menu-colors"
  );
  const appsMenuLi = document.querySelectorAll(
    ".edit-part .change-edit-part .change-container .apps-title-dropdown .menu-colors > li"
  );
  const appsTitle = document.querySelector(".apps-section .title-section > h1");

  appsTitle.style.color = appsTitleColor.style.backgroundColor;
  appsTitleColor.addEventListener("click", () => {
    appsMenuColors.classList.toggle("active-menu");
  });
  appsMenuLi.forEach((item) => {
    item.addEventListener("click", () => {
      appsMenuColors.classList.toggle("active-menu");
      var infos = $(item).data("info").split(",");
      var data = {
        colorId: infos[1],
        mainId: infos[0],
        type: infos[3],
        ColId: infos[4],
      };
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_color",
        type: "POST",
        dataType: "JSON",
        data: data,
        success: function (result) {
          if (result == "1") {
            appsTitleColor.style.backgroundColor = item.style.backgroundColor;
            appsTitle.style.color = appsTitleColor.style.backgroundColor;
          }
        },
      });
    });
  });
  // End Apps Title

  // Start Apps Subtitle
  const appSubTitleColor = document.querySelector(
    ".apps-section .edit-part .change-edit-part .change-container .apps-subtitle-dropdown .select-color .selected-color"
  );
  const appSubMenuColors = document.querySelector(
    ".apps-section .edit-part .change-edit-part .change-container .apps-subtitle-dropdown .menu-colors"
  );
  const appSubMenuLi = document.querySelectorAll(
    ".apps-section .edit-part .change-edit-part .change-container .apps-subtitle-dropdown .menu-colors > li"
  );
  const appSubParagraph = document.querySelector(
    ".apps-section .apps-content .title-section > p"
  );
  const appsName = document.querySelector(
    ".apps-section .apps-content .app-text > h2"
  );

  appsName.style.color = appSubTitleColor.style.backgroundColor;
  appSubParagraph.style.color = appSubTitleColor.style.backgroundColor;
  appSubTitleColor.addEventListener("click", () => {
    appSubMenuColors.classList.toggle("active-menu");
  });
  appSubMenuLi.forEach((item) => {
    item.addEventListener("click", () => {
      appSubMenuColors.classList.toggle("active-menu");
      var infos = $(item).data("info").split(",");
      var data = {
        colorId: infos[1],
        mainId: infos[0],
        type: infos[3],
        ColId: infos[4],
      };
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_color",
        type: "POST",
        dataType: "JSON",
        data: data,
        success: function (result) {
          if (result == "1") {
            appSubTitleColor.style.backgroundColor = item.style.backgroundColor;
            appsName.style.color = appSubTitleColor.style.backgroundColor;
            appSubParagraph.style.color =
              appSubTitleColor.style.backgroundColor;
          }
        },
      });
    });
  });
  // End Apps Subtitle

  // Start Apps Name
  // const appsNameColor = document.querySelector(
  //   ".apps-section .edit-part .change-edit-part .change-container .apps-paragraph-dropdown .select-color .selected-color"
  // );
  // const appsNameMenuColors = document.querySelector(
  //   ".apps-section .edit-part .change-edit-part .change-container .apps-paragraph-dropdown .menu-colors"
  // );
  // const appsNameMenuLi = document.querySelectorAll(
  //   ".apps-section .edit-part .change-edit-part .change-container .apps-paragraph-dropdown .menu-colors > li"
  // );
  // const appsName = document.querySelector(
  //   ".apps-section .apps-content .app-text > h2"
  // );

  // appsName.style.color = appsNameColor.style.backgroundColor;
  // appsNameColor.addEventListener("click", () => {
  //   appsNameMenuColors.classList.toggle("active-menu");
  // });
  // appsNameMenuLi.forEach((item) => {
  //   item.addEventListener("click", () => {
  //     appsNameMenuColors.classList.toggle("active-menu");
  //     var infos = $(item).data("info").split(",");
  //     var data = {
  //       colorId: infos[1],
  //       mainId: infos[0],
  //       type: infos[3],
  //       ColId: infos[4],
  //     };
  //     $.ajax({
  //       url: Base_Url + "/acp/liveupdation/change_color",
  //       type: "POST",
  //       dataType: "JSON",
  //       data: data,
  //       success: function (result) {
  //         if (result == "1") {
  //           appsNameColor.style.backgroundColor = item.style.backgroundColor;
  //           appsName.style.color = appsNameColor.style.backgroundColor;
  //         }
  //       },
  //     });
  //   });
  // });
  // End Apps Name

  // Start Apps Background
  const appsBgColor = document.querySelector(
    ".apps-section .edit-part .change-edit-part .change-container .apps-background-dropdown .select-color .selected-color"
  );
  const appsBgMenuColors = document.querySelector(
    ".apps-section .edit-part .change-edit-part .change-container .apps-background-dropdown .menu-colors"
  );
  const appsBgMenuLi = document.querySelectorAll(
    ".apps-section .edit-part .change-edit-part .change-container .apps-background-dropdown .menu-colors > li"
  );
  const appsBg = document.querySelector(".apps-section");

  const AppshasBgImage = appsSection.style.backgroundImage !== "";

  if (AppshasBgImage) {
    appsBg.style.background =
      appsSection.style.backgroundImage +
      " ," +
      appsBgColor.style.backgroundColor;
  } else {
    // Otherwise, show the background color.
    appsBg.style.background = appsBgColor.style.backgroundColor;
  }

  // appsBg.style.background = appsSection.style + ';' + appsBgColor.style.backgroundColor;
  appsBgColor.addEventListener("click", () => {
    appsBgMenuColors.classList.toggle("active-menu");
  });
  appsBgMenuLi.forEach((item) => {
    item.addEventListener("click", () => {
      appsBgMenuColors.classList.toggle("active-menu");
      var infos = $(item).data("info").split(",");
      var data = {
        colorId: infos[1],
        mainId: infos[0],
        type: infos[3],
        ColId: infos[4],
      };
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_color",
        type: "POST",
        dataType: "JSON",
        data: data,
        success: function (result) {
          if (result == "1") {
            appsBgColor.style.backgroundColor = item.style.backgroundColor;
            appsBg.style.background = appsBgColor.style.backgroundColor;
          }
        },
      });
    });
  });
  // End Apps Background

  // Start Apps Upload Background Image
  const appsBackgroundImage = document.querySelector(".apps-section");
  const appsBackgroundImageInput = document.querySelector(
    ".apps-section .edit-part .apps-background-image"
  );
  appsBackgroundImageInput.addEventListener("change", () => {
    var fd = new FormData();
    var files = appsBackgroundImageInput.files;

    var mainId = $(appsBackgroundImageInput).data("info");
    // Check file selected or not
    if (files.length > 0) {
      fd.append("Section_Image", files[0]);
      fd.append("id", mainId);
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_bg_img",
        type: "post",
        data: fd,
        contentType: false,
        processData: false,
        success: function (response) {
          if (response == "1") {
            appsBackgroundImage.style.backgroundImage =
              "url(" +
              URL.createObjectURL(appsBackgroundImageInput.files[0]) +
              ")";
            appsBackgroundImage.style.backgroundPosition = "center";
            appsBackgroundImage.style.backgroundRepeat = "no-repeat";
            appsBackgroundImage.style.backgroundSize = "cover";
            appsAddLabel.style.backgroundImage =
              "url(" +
              URL.createObjectURL(appsBackgroundImageInput.files[0]) +
              ")";
          }
        },
      });
    }
  });
  // End Apps Upload Background Image

  // Start Apps Remove Background Image
  const appsBackgroundImageRemove = document.querySelector(
    ".apps-section .edit-part .label-remove-file"
  );
  appsBackgroundImageRemove.addEventListener("click", () => {
    var data = {
      mainId: $(appsBackgroundImageRemove).data("info"),
    };
    $.ajax({
      url: Base_Url + "/acp/liveupdation/bg_img_remove",
      type: "POST",
      dataType: "JSON",
      data: data,
      success: function (result) {
        appsBackgroundImage.style.backgroundImage = "";
        appsBackgroundImage.style.backgroundPosition = "";
        appsBackgroundImage.style.backgroundRepeat = "";
        appsBackgroundImage.style.backgroundSize = "";
        appsAddLabel.style.backgroundImage = "";
        appsBg.style.background = appsBgColor.style.backgroundColor;
      },
    });
  });
  // End Apps Remove Background Image
}
// End Apps

// Start team
if (teamSection) {
  // Start team Title
  const teamTitleColor = document.querySelector(
    ".team-section .edit-part .change-edit-part .change-container .team-title-dropdown .select-color .selected-color"
  );
  const teamMenuColors = document.querySelector(
    ".team-section .edit-part .change-edit-part .change-container .team-title-dropdown .menu-colors"
  );
  const teamMenuLi = document.querySelectorAll(
    ".team-section .edit-part .change-edit-part .change-container .team-title-dropdown .menu-colors > li"
  );
  const teamTitle = document.querySelector(".team-section .title-section > h1");

  const teamCareer = document.querySelectorAll(
    ".team-section .team-content .cards .card .team-card-text > p"
  );

  teamCareer.forEach((career) => {
    career.style.color = teamTitleColor.style.backgroundColor;
  });

  teamTitle.style.color = teamTitleColor.style.backgroundColor;
  teamTitleColor.addEventListener("click", () => {
    teamMenuColors.classList.toggle("active-menu");
  });
  teamMenuLi.forEach((item) => {
    item.addEventListener("click", () => {
      teamMenuColors.classList.toggle("active-menu");
      var infos = $(item).data("info").split(",");
      var data = {
        colorId: infos[1],
        mainId: infos[0],
        type: infos[3],
        ColId: infos[4],
      };
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_color",
        type: "POST",
        dataType: "JSON",
        data: data,
        success: function (result) {
          if (result == "1") {
            teamTitleColor.style.backgroundColor = item.style.backgroundColor;
            teamTitle.style.color = teamTitleColor.style.backgroundColor;
            teamCareer.forEach((career) => {
              career.style.color = teamTitleColor.style.backgroundColor;
            });
          }
        },
      });
    });
  });
  // End team Title

  // Start Team Subtitle
  const teamSubTitleColor = document.querySelector(
    ".team-section .edit-part .change-edit-part .change-container .team-subtitle-dropdown .select-color .selected-color"
  );
  const teamSubMenuColors = document.querySelector(
    ".team-section .edit-part .change-edit-part .change-container .team-subtitle-dropdown .menu-colors"
  );
  const teamSubMenuLi = document.querySelectorAll(
    ".team-section .edit-part .change-edit-part .change-container .team-subtitle-dropdown .menu-colors > li"
  );
  const teamSubParagraph = document.querySelector(
    ".team-section .team-content .title-section > p"
  );
  const teamName = document.querySelectorAll(
    ".team-section .team-content .cards .card .team-card-text > h2"
  );

  teamName.forEach((name) => {
    name.style.color = teamSubTitleColor.style.backgroundColor;
  });

  teamSubParagraph.style.color = teamSubTitleColor.style.backgroundColor;
  teamSubTitleColor.addEventListener("click", () => {
    teamSubMenuColors.classList.toggle("active-menu");
  });
  teamSubMenuLi.forEach((item) => {
    item.addEventListener("click", () => {
      teamSubMenuColors.classList.toggle("active-menu");
      var infos = $(item).data("info").split(",");
      var data = {
        colorId: infos[1],
        mainId: infos[0],
        type: infos[3],
        ColId: infos[4],
      };
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_color",
        type: "POST",
        dataType: "JSON",
        data: data,
        success: function (result) {
          if (result == "1") {
            teamSubTitleColor.style.backgroundColor =
              item.style.backgroundColor;
            teamSubParagraph.style.color =
              teamSubTitleColor.style.backgroundColor;
            teamName.forEach((name) => {
              name.style.color = teamSubTitleColor.style.backgroundColor;
            });
          }
        },
      });
    });
  });
  // End Team Subtitle

  // Start team Name
  // const teamNameColor = document.querySelector(
  //   ".team-section .edit-part .change-edit-part .change-container .team-paragraph-dropdown .select-color .selected-color"
  // );
  // const teamNameMenuColors = document.querySelector(
  //   ".team-section .edit-part .change-edit-part .change-container .team-paragraph-dropdown .menu-colors"
  // );
  // const teamNameMenuLi = document.querySelectorAll(
  //   ".team-section .edit-part .change-edit-part .change-container .team-paragraph-dropdown .menu-colors > li"
  // );
  // const teamName = document.querySelectorAll(
  //   ".team-section .team-content .cards .card .team-card-text > h2"
  // );

  // teamName.forEach((name) => {
  //   name.style.color = teamNameColor.style.backgroundColor;
  // });
  // teamNameColor.addEventListener("click", () => {
  //   teamNameMenuColors.classList.toggle("active-menu");
  // });
  // teamNameMenuLi.forEach((item) => {
  //   item.addEventListener("click", () => {
  //     teamNameMenuColors.classList.toggle("active-menu");
  //     var infos = $(item).data("info").split(",");
  //     var data = {
  //       colorId: infos[1],
  //       mainId: infos[0],
  //       type: infos[3],
  //       ColId: infos[4],
  //     };
  //     $.ajax({
  //       url: Base_Url + "/acp/liveupdation/change_color",
  //       type: "POST",
  //       dataType: "JSON",
  //       data: data,
  //       success: function (result) {
  //         if (result == "1") {
  //           teamNameColor.style.backgroundColor = item.style.backgroundColor;
  //           teamName.forEach((name) => {
  //             name.style.color = teamNameColor.style.backgroundColor;
  //           });
  //         }
  //       },
  //     });
  //   });
  // });
  // End team Name

  // Start team Career
  // const teamCareerColor = document.querySelector(
  //   ".team-section .edit-part .change-edit-part .change-container .team-button-dropdown .select-color .selected-color"
  // );
  // const teamCareerMenuColors = document.querySelector(
  //   ".team-section .edit-part .change-edit-part .change-container .team-button-dropdown .menu-colors"
  // );
  // const teamCareerMenuLi = document.querySelectorAll(
  //   ".team-section .edit-part .change-edit-part .change-container .team-button-dropdown .menu-colors > li"
  // );
  // const teamCareer = document.querySelectorAll(
  //   ".team-section .team-content .cards .card .team-card-text > p"
  // );

  // teamCareer.forEach((career) => {
  //   career.style.color = teamCareerColor.style.backgroundColor;
  // });
  // teamCareerColor.addEventListener("click", () => {
  //   teamCareerMenuColors.classList.toggle("active-menu");
  // });
  // teamCareerMenuLi.forEach((item) => {
  //   item.addEventListener("click", () => {
  //     teamCareerMenuColors.classList.toggle("active-menu");
  //     var infos = $(item).data("info").split(",");
  //     var data = {
  //       colorId: infos[1],
  //       mainId: infos[0],
  //       type: infos[3],
  //       ColId: infos[4],
  //     };
  //     $.ajax({
  //       url: Base_Url + "/acp/liveupdation/change_color",
  //       type: "POST",
  //       dataType: "JSON",
  //       data: data,
  //       success: function (result) {
  //         if (result == "1") {
  //           teamCareerColor.style.backgroundColor = item.style.backgroundColor;
  //           teamCareer.forEach((career) => {
  //             career.style.color = teamCareerColor.style.backgroundColor;
  //           });
  //         }
  //       },
  //     });
  //   });
  // });
  // End team career

  // Start team Background
  const teamBgColor = document.querySelector(
    ".team-section .edit-part .change-edit-part .change-container .team-background-dropdown .select-color .selected-color"
  );
  const teamBgMenuColors = document.querySelector(
    ".team-section .edit-part .change-edit-part .change-container .team-background-dropdown .menu-colors"
  );
  const teamBgMenuLi = document.querySelectorAll(
    ".team-section .edit-part .change-edit-part .change-container .team-background-dropdown .menu-colors > li"
  );
  const teamBg = document.querySelector(".team-section");

  const TeamshasBgImage = teamSection.style.backgroundImage !== "";

  if (TeamshasBgImage) {
    teamBg.style.background =
      teamSection.style.backgroundImage +
      ", " +
      teamBgColor.style.backgroundColor;
  } else {
    // Otherwise, show the background color.
    teamBg.style.background = teamBgColor.style.backgroundColor;
  }

  // teamBg.style.background = teamSection.style + ';' + teamBgColor.style.backgroundColor;
  teamBgColor.addEventListener("click", () => {
    teamBgMenuColors.classList.toggle("active-menu");
  });
  teamBgMenuLi.forEach((item) => {
    item.addEventListener("click", () => {
      teamBgMenuColors.classList.toggle("active-menu");
      var infos = $(item).data("info").split(",");
      var data = {
        colorId: infos[1],
        mainId: infos[0],
        type: infos[3],
        ColId: infos[4],
      };
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_color",
        type: "POST",
        dataType: "JSON",
        data: data,
        success: function (result) {
          if (result == "1") {
            teamBgColor.style.backgroundColor = item.style.backgroundColor;
            teamBg.style.background = teamBgColor.style.backgroundColor;
          }
        },
      });
    });
  });
  // End team Background

  // Start team Upload Background Image
  const teamBackgroundImage = document.querySelector(".team-section");
  const teamBackgroundImageInput = document.querySelector(
    ".team-section .edit-part .team-background-image"
  );
  teamBackgroundImageInput.addEventListener("change", () => {
    var fd = new FormData();
    var files = teamBackgroundImageInput.files;

    var mainId = $(teamBackgroundImageInput).data("info");
    // Check file selected or not
    if (files.length > 0) {
      fd.append("Section_Image", files[0]);
      fd.append("id", mainId);
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_bg_img",
        type: "post",
        data: fd,
        contentType: false,
        processData: false,
        success: function (response) {
          if (response == "1") {
            teamBackgroundImage.style.backgroundImage =
              "url(" +
              URL.createObjectURL(teamBackgroundImageInput.files[0]) +
              ")";
            teamBackgroundImage.style.backgroundPosition = "center";
            teamBackgroundImage.style.backgroundRepeat = "no-repeat";
            teamBackgroundImage.style.backgroundSize = "cover";
            teamAddLabel.style.backgroundImage =
              "url(" +
              URL.createObjectURL(teamBackgroundImageInput.files[0]) +
              ")";
          }
        },
      });
    }
  });
  // End team Upload Background Image

  // Start team Remove Background Image
  const teamBackgroundImageRemove = document.querySelector(
    ".team-section .edit-part .label-remove-file"
  );
  teamBackgroundImageRemove.addEventListener("click", () => {
    var data = {
      mainId: $(teamBackgroundImageRemove).data("info"),
    };
    $.ajax({
      url: Base_Url + "/acp/liveupdation/bg_img_remove",
      type: "POST",
      dataType: "JSON",
      data: data,
      success: function (result) {
        teamBackgroundImage.style.backgroundImage = "";
        teamBackgroundImage.style.backgroundPosition = "";
        teamBackgroundImage.style.backgroundRepeat = "";
        teamBackgroundImage.style.backgroundSize = "";
        teamAddLabel.style.backgroundImage = "";
        teamBg.style.background = teamBgColor.style.backgroundColor;
      },
    });
  });
  // End team Remove Background Image
}
// End team

// Start careers
if (careersSection) {
  // Start careers Title
  const careersTitleColor = document.querySelector(
    ".careers-section .edit-part .change-edit-part .change-container .careers-title-dropdown .select-color .selected-color"
  );
  const careersMenuColors = document.querySelector(
    ".careers-section .edit-part .change-edit-part .change-container .careers-title-dropdown .menu-colors"
  );
  const careersMenuLi = document.querySelectorAll(
    ".careers-section .edit-part .change-edit-part .change-container .careers-title-dropdown .menu-colors > li"
  );
  const careersTitle = document.querySelector(
    ".careers-section .title-section > h1"
  );

  careersTitle.style.color = careersTitleColor.style.backgroundColor;
  careersTitleColor.addEventListener("click", () => {
    careersMenuColors.classList.toggle("active-menu");
  });
  careersMenuLi.forEach((item) => {
    item.addEventListener("click", () => {
      careersMenuColors.classList.toggle("active-menu");
      var infos = $(item).data("info").split(",");
      var data = {
        colorId: infos[1],
        mainId: infos[0],
        type: infos[3],
        ColId: infos[4],
      };
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_color",
        type: "POST",
        dataType: "JSON",
        data: data,
        success: function (result) {
          if (result == "1") {
            careersTitleColor.style.backgroundColor =
              item.style.backgroundColor;
            careersTitle.style.color = careersTitleColor.style.backgroundColor;
          }
        },
      });
    });
  });
  // End careers Title

  // Start Career Subtitle
  const careerSubTitleColor = document.querySelector(
    ".careers-section .edit-part .change-edit-part .change-container .careers-subtitle-dropdown .select-color .selected-color"
  );
  const careerSubMenuColors = document.querySelector(
    ".careers-section .edit-part .change-edit-part .change-container .careers-subtitle-dropdown .menu-colors"
  );
  const careerSubMenuLi = document.querySelectorAll(
    ".careers-section .edit-part .change-edit-part .change-container .careers-subtitle-dropdown .menu-colors > li"
  );
  const careerSubParagraph = document.querySelector(
    ".careers-section .title-section > p"
  );

  careerSubParagraph.style.color = careerSubTitleColor.style.backgroundColor;
  careerSubTitleColor.addEventListener("click", () => {
    careerSubMenuColors.classList.toggle("active-menu");
  });
  careerSubMenuLi.forEach((item) => {
    item.addEventListener("click", () => {
      careerSubMenuColors.classList.toggle("active-menu");
      var infos = $(item).data("info").split(",");
      var data = {
        colorId: infos[1],
        mainId: infos[0],
        type: infos[3],
        ColId: infos[4],
      };
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_color",
        type: "POST",
        dataType: "JSON",
        data: data,
        success: function (result) {
          if (result == "1") {
            careerSubTitleColor.style.backgroundColor =
              item.style.backgroundColor;
            careerSubParagraph.style.color =
              careerSubTitleColor.style.backgroundColor;
          }
        },
      });
    });
  });
  // End Career Subtitle

  // Start careers Button
  // const careersButtonColor = document.querySelector(
  //   ".careers-section .edit-part .change-edit-part .change-container .careers-paragraph-dropdown .select-color .selected-color"
  // );
  // const careersButtonMenuColors = document.querySelector(
  //   ".careers-section .edit-part .change-edit-part .change-container .careers-paragraph-dropdown .menu-colors"
  // );
  // const careersButtonMenuLi = document.querySelectorAll(
  //   ".careers-section .edit-part .change-edit-part .change-container .careers-paragraph-dropdown .menu-colors > li"
  // );
  // const careersButton = document.querySelector(
  //   ".careers-section .careers-content .read-more.general-btn .read-more-btn"
  // );
  // if (careersButton) {
  //   careersButton.style.color = careersButtonColor.style.backgroundColor;
  //   careersButtonColor.addEventListener("click", () => {
  //     careersButtonMenuColors.classList.toggle("active-menu");
  //   });
  //   careersButtonMenuLi.forEach((item) => {
  //     item.addEventListener("click", () => {
  //       careersButtonMenuColors.classList.toggle("active-menu");
  //       var infos = $(item).data("info").split(",");
  //       var data = {
  //         colorId: infos[1],
  //         mainId: infos[0],
  //         type: infos[3],
  //         ColId: infos[4],
  //       };
  //       $.ajax({
  //         url: Base_Url + "/acp/liveupdation/change_color",
  //         type: "POST",
  //         dataType: "JSON",
  //         data: data,
  //         success: function (result) {
  //           if (result == "1") {
  //             careersButtonColor.style.backgroundColor =
  //               item.style.backgroundColor;
  //             careersButton.style.color =
  //               careersButtonColor.style.backgroundColor;
  //           }
  //         },
  //       });
  //     });
  //   });
  // }
  // End careers Button

  // Start careers Button Bg
  const careersButtonBgColor = document.querySelector(
    ".careers-section .edit-part .change-edit-part .change-container .careers-button-dropdown .select-color .selected-color"
  );
  const careersButtonBgMenuColors = document.querySelector(
    ".careers-section .edit-part .change-edit-part .change-container .careers-button-dropdown .menu-colors"
  );
  const careersButtonBgMenuLi = document.querySelectorAll(
    ".careers-section .edit-part .change-edit-part .change-container .careers-button-dropdown .menu-colors > li"
  );
  const careersButton = document.querySelector(
    ".careers-section .careers-content .read-more.general-btn .read-more-btn"
  );
  if (careersButton) {
    careersButton.style.background = careersButtonBgColor.style.backgroundColor;
    careersButtonBgColor.addEventListener("click", () => {
      careersButtonBgMenuColors.classList.toggle("active-menu");
    });
    careersButtonBgMenuLi.forEach((item) => {
      item.addEventListener("click", () => {
        careersButtonBgMenuColors.classList.toggle("active-menu");
        var infos = $(item).data("info").split(",");
        var data = {
          colorId: infos[1],
          mainId: infos[0],
          type: infos[3],
          ColId: infos[4],
        };
        $.ajax({
          url: Base_Url + "/acp/liveupdation/change_color",
          type: "POST",
          dataType: "JSON",
          data: data,
          success: function (result) {
            if (result == "1") {
              careersButtonBgColor.style.backgroundColor =
                item.style.backgroundColor;
              careersButton.style.background =
                careersButtonBgColor.style.backgroundColor;
            }
          },
        });
      });
    });
  }
  // End careers Button Bg

  // Start careers Background
  const careersBgColor = document.querySelector(
    ".careers-section .edit-part .change-edit-part .change-container .careers-background-dropdown .select-color .selected-color"
  );
  const careersBgMenuColors = document.querySelector(
    ".careers-section .edit-part .change-edit-part .change-container .careers-background-dropdown .menu-colors"
  );
  const careersBgMenuLi = document.querySelectorAll(
    ".careers-section .edit-part .change-edit-part .change-container .careers-background-dropdown .menu-colors > li"
  );
  const careersBg = document.querySelector(".careers-section");

  const CareershasBgImage = careersSection.style.backgroundImage !== "";

  if (CareershasBgImage) {
    careersBg.style.background =
      careersSection.style.backgroundImage +
      ", " +
      careersBgColor.style.backgroundColor;
  } else {
    // Otherwise, show the background color.
    careersBg.style.background = careersBgColor.style.backgroundColor;
  }

  // careersBg.style.background = careersSection.style + ';' + careersBgColor.style.backgroundColor;
  careersBgColor.addEventListener("click", () => {
    careersBgMenuColors.classList.toggle("active-menu");
  });
  careersBgMenuLi.forEach((item) => {
    item.addEventListener("click", () => {
      careersBgMenuColors.classList.toggle("active-menu");
      var infos = $(item).data("info").split(",");
      var data = {
        colorId: infos[1],
        mainId: infos[0],
        type: infos[3],
        ColId: infos[4],
      };
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_color",
        type: "POST",
        dataType: "JSON",
        data: data,
        success: function (result) {
          if (result == "1") {
            careersBgColor.style.backgroundColor = item.style.backgroundColor;
            careersBg.style.background = careersBgColor.style.backgroundColor;
          }
        },
      });
    });
  });
  // End careers Background

  // Start careers Upload Background Image
  const careersBackgroundImage = document.querySelector(".careers-section");
  const careersBackgroundImageInput = document.querySelector(
    ".careers-section .edit-part .careers-background-image"
  );
  careersBackgroundImageInput.addEventListener("change", () => {
    var fd = new FormData();
    var files = careersBackgroundImageInput.files;

    var mainId = $(careersBackgroundImageInput).data("info");
    // Check file selected or not
    if (files.length > 0) {
      fd.append("Section_Image", files[0]);
      fd.append("id", mainId);
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_bg_img",
        type: "post",
        data: fd,
        contentType: false,
        processData: false,
        success: function (response) {
          if (response == "1") {
            careersBackgroundImage.style.backgroundImage =
              "url(" +
              URL.createObjectURL(careersBackgroundImageInput.files[0]) +
              ")";
            careersBackgroundImage.style.backgroundPosition = "center";
            careersBackgroundImage.style.backgroundRepeat = "no-repeat";
            careersBackgroundImage.style.backgroundSize = "cover";
            careersAddLabel.style.backgroundImage =
              "url(" +
              URL.createObjectURL(careersBackgroundImageInput.files[0]) +
              ")";
          }
        },
      });
    }
  });
  // End careers Upload Background Image

  // Start careers Remove Background Image
  const careersBackgroundImageRemove = document.querySelector(
    ".careers-section .edit-part .label-remove-file"
  );
  careersBackgroundImageRemove.addEventListener("click", () => {
    var data = {
      mainId: $(careersBackgroundImageRemove).data("info"),
    };
    $.ajax({
      url: Base_Url + "/acp/liveupdation/bg_img_remove",
      type: "POST",
      dataType: "JSON",
      data: data,
      success: function (result) {
        careersBackgroundImage.style.backgroundImage = "";
        careersBackgroundImage.style.backgroundPosition = "";
        careersBackgroundImage.style.backgroundRepeat = "";
        careersBackgroundImage.style.backgroundSize = "";
        careersAddLabel.style.backgroundImage = "";
        careersBg.style.background = careersBgColor.style.backgroundColor;
      },
    });
  });
  // End careers Remove Background Image
}
// End careers

// Start plans
if (plansSection) {
  // Start plans Title
  const plansTitleColor = document.querySelector(
    ".plans-section .edit-part .change-edit-part .change-container .plans-title-dropdown .select-color .selected-color"
  );
  const plansMenuColors = document.querySelector(
    ".plans-section .edit-part .change-edit-part .change-container .plans-title-dropdown .menu-colors"
  );
  const plansMenuLi = document.querySelectorAll(
    ".plans-section .edit-part .change-edit-part .change-container .plans-title-dropdown .menu-colors > li"
  );
  const plansTitle = document.querySelector(
    ".plans-section .title-section > h1"
  );

  plansTitle.style.color = plansTitleColor.style.backgroundColor;
  plansTitleColor.addEventListener("click", () => {
    plansMenuColors.classList.toggle("active-menu");
  });
  plansMenuLi.forEach((item) => {
    item.addEventListener("click", () => {
      plansMenuColors.classList.toggle("active-menu");
      var infos = $(item).data("info").split(",");
      var data = {
        colorId: infos[1],
        mainId: infos[0],
        type: infos[3],
        ColId: infos[4],
      };
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_color",
        type: "POST",
        dataType: "JSON",
        data: data,
        success: function (result) {
          if (result == "1") {
            plansTitleColor.style.backgroundColor = item.style.backgroundColor;
            plansTitle.style.color = plansTitleColor.style.backgroundColor;
          }
        },
      });
    });
  });
  // End plans Title

  // Start Plans Subtitle
  const plansSubTitleColor = document.querySelector(
    ".plans-section .edit-part .change-edit-part .change-container .plans-subtitle-dropdown .select-color .selected-color"
  );
  const plansSubMenuColors = document.querySelector(
    ".plans-section .edit-part .change-edit-part .change-container .plans-subtitle-dropdown .menu-colors"
  );
  const plansSubMenuLi = document.querySelectorAll(
    ".plans-section .edit-part .change-edit-part .change-container .plans-subtitle-dropdown .menu-colors > li"
  );
  const plansSubParagraph = document.querySelector(
    ".plans-section .title-section > p"
  );
  plansSubParagraph.style.color = plansSubTitleColor.style.backgroundColor;
  plansSubTitleColor.addEventListener("click", () => {
    plansSubMenuColors.classList.toggle("active-menu");
  });
  plansSubMenuLi.forEach((item) => {
    item.addEventListener("click", () => {
      plansSubMenuColors.classList.toggle("active-menu");
      var infos = $(item).data("info").split(",");
      var data = {
        colorId: infos[1],
        mainId: infos[0],
        type: infos[3],
        ColId: infos[4],
      };
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_color",
        type: "POST",
        dataType: "JSON",
        data: data,
        success: function (result) {
          if (result == "1") {
            plansSubTitleColor.style.backgroundColor =
              item.style.backgroundColor;
            plansSubParagraph.style.color =
              plansSubTitleColor.style.backgroundColor;
          }
        },
      });
    });
  });
  // End Plans Subtitle

  // Start plans text
  const plansTextColor = document.querySelector(
    ".plans-section .edit-part .change-edit-part .change-container .plans-paragraph-dropdown .select-color .selected-color"
  );
  const plansTextMenuColors = document.querySelector(
    ".plans-section .edit-part .change-edit-part .change-container .plans-paragraph-dropdown .menu-colors"
  );
  const plansTextMenuLi = document.querySelectorAll(
    ".plans-section .edit-part .change-edit-part .change-container .plans-paragraph-dropdown .menu-colors > li"
  );
  const planssvg = document.querySelectorAll(
    ".plans-section .cards .card .plan-card-text .plan-card-feature > li >svg"
  );
  const plansText = document.querySelectorAll(
    ".plans-section .cards .card .plan-card-text .plan-card-feature > li >span"
  );
  const plansPriceSubtitle = document.querySelectorAll(
    ".plans-section .cards .card .plan-card-text .plan-card-info"
  );

  plansText.forEach((item) => {
    item.style.color = plansTextColor.style.backgroundColor;
  });
  planssvg.forEach((item) => {
    item.style.color = plansTextColor.style.backgroundColor;
  });
  plansPriceSubtitle.forEach((item) => {
    item.style.color = plansTextColor.style.backgroundColor;
  });

  plansTextColor.addEventListener("click", () => {
    plansTextMenuColors.classList.toggle("active-menu");
  });
  plansTextMenuLi.forEach((item) => {
    item.addEventListener("click", () => {
      plansTextMenuColors.classList.toggle("active-menu");
      var infos = $(item).data("info").split(",");
      var data = {
        colorId: infos[1],
        mainId: infos[0],
        type: infos[3],
        ColId: infos[4],
      };
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_color",
        type: "POST",
        dataType: "JSON",
        data: data,
        success: function (result) {
          if (result == "1") {
            plansTextColor.style.backgroundColor = item.style.backgroundColor;
            plansPriceSubtitle.forEach((item) => {
              item.style.color = plansTextColor.style.backgroundColor;
            });
            plansText.forEach((item) => {
              item.style.color = plansTextColor.style.backgroundColor;
            });
            planssvg.forEach((item) => {
              item.style.color = plansTextColor.style.backgroundColor;
            });
          }
        },
      });
    });
  });
  // End plans text

  // Start plans button
  const plansCardColor = document.querySelector(
    ".plans-section .edit-part .change-edit-part .change-container .plans-button-dropdown .select-color .selected-color"
  );
  const plansCardMenuColors = document.querySelector(
    ".plans-section .edit-part .change-edit-part .change-container .plans-button-dropdown .menu-colors"
  );
  const plansCardMenuLi = document.querySelectorAll(
    ".plans-section .edit-part .change-edit-part .change-container .plans-button-dropdown .menu-colors > li"
  );
  const plansButtonBg = document.querySelectorAll(
    ".plans-section .plans-content .read-more.general-btn .read-more-btn"
  );
  plansPriceTitle = document.querySelectorAll(
    ".plans-section .cards .card .plan-card-text .plan-card-title"
  );
  plansPrice = document.querySelectorAll(
    ".plans-section .cards .card .plan-card-text .plan-card-price > span"
  );
  plansPriceTitle.forEach((item) => {
    item.style.color = plansCardColor.style.backgroundColor;
  });
  if (plansButtonBg) {
    plansButtonBg.forEach((item) => {
      item.style.backgroundColor = plansCardColor.style.backgroundColor;
    });
  }
  plansPrice.forEach((item) => {
    item.style.color = plansCardColor.style.backgroundColor;
  });
  plansCardColor.addEventListener("click", () => {
    plansCardMenuColors.classList.toggle("active-menu");
  });
  plansCardMenuLi.forEach((item) => {
    item.addEventListener("click", () => {
      plansCardMenuColors.classList.toggle("active-menu");
      var infos = $(item).data("info").split(",");
      var data = {
        colorId: infos[1],
        mainId: infos[0],
        type: infos[3],
        ColId: infos[4],
      };
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_color",
        type: "POST",
        dataType: "JSON",
        data: data,
        success: function (result) {
          if (result == "1") {
            plansCardColor.style.backgroundColor = item.style.backgroundColor;
            plansPriceTitle.forEach((item) => {
              item.style.color = plansCardColor.style.backgroundColor;
            });
            if (plansButtonBg) {
              plansButtonBg.forEach((item) => {
                item.style.backgroundColor =
                  plansCardColor.style.backgroundColor;
              });
              plansPrice.forEach((item) => {
                item.style.color = plansCardColor.style.backgroundColor;
              });
            }
          }
        },
      });
    });
  });
  // End plans button

  // Start plans Background
  const plansBgColor = document.querySelector(
    ".plans-section .edit-part .change-edit-part .change-container .plans-background-dropdown .select-color .selected-color"
  );
  const plansBgMenuColors = document.querySelector(
    ".plans-section .edit-part .change-edit-part .change-container .plans-background-dropdown .menu-colors"
  );
  const plansBgMenuLi = document.querySelectorAll(
    ".plans-section .edit-part .change-edit-part .change-container .plans-background-dropdown .menu-colors > li"
  );
  const plansBg = document.querySelector(".plans-section");

  const PlanshasBgImage = plansSection.style.backgroundImage !== "";

  if (PlanshasBgImage) {
    plansBg.style.background =
      plansSection.style.backgroundImage +
      " ," +
      plansBgColor.style.backgroundColor;
  } else {
    // Otherwise, show the background color.
    plansBg.style.background = plansBgColor.style.backgroundColor;
  }

  // plansBg.style.background = plansSection.style + ';' + plansBgColor.style.backgroundColor;
  plansBgColor.addEventListener("click", () => {
    plansBgMenuColors.classList.toggle("active-menu");
  });
  plansBgMenuLi.forEach((item) => {
    item.addEventListener("click", () => {
      plansBgMenuColors.classList.toggle("active-menu");
      var infos = $(item).data("info").split(",");
      var data = {
        colorId: infos[1],
        mainId: infos[0],
        type: infos[3],
        ColId: infos[4],
      };
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_color",
        type: "POST",
        dataType: "JSON",
        data: data,
        success: function (result) {
          if (result == "1") {
            plansBgColor.style.backgroundColor = item.style.backgroundColor;
            plansBg.style.background = plansBgColor.style.backgroundColor;
          }
        },
      });
    });
  });
  // End plans Background

  // Start plans Upload Background Image
  const plansBackgroundImage = document.querySelector(".plans-section");
  const plansBackgroundImageInput = document.querySelector(
    ".plans-section .edit-part .plans-background-image"
  );
  plansBackgroundImageInput.addEventListener("change", () => {
    var fd = new FormData();
    var files = plansBackgroundImageInput.files;

    var mainId = $(plansBackgroundImageInput).data("info");
    // Check file selected or not
    if (files.length > 0) {
      fd.append("Section_Image", files[0]);
      fd.append("id", mainId);
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_bg_img",
        type: "post",
        data: fd,
        contentType: false,
        processData: false,
        success: function (response) {
          if (response == "1") {
            plansBackgroundImage.style.backgroundImage =
              "url(" +
              URL.createObjectURL(plansBackgroundImageInput.files[0]) +
              ")";
            plansBackgroundImage.style.backgroundPosition = "center";
            plansBackgroundImage.style.backgroundRepeat = "no-repeat";
            plansBackgroundImage.style.backgroundSize = "cover";
            plansAddLabel.style.backgroundImage =
              "url(" +
              URL.createObjectURL(plansBackgroundImageInput.files[0]) +
              ")";
          }
        },
      });
    }
  });
  // End plans Upload Background Image

  // Start plans Remove Background Image
  const plansBackgroundImageRemove = document.querySelector(
    ".plans-section .edit-part .label-remove-file"
  );
  plansBackgroundImageRemove.addEventListener("click", () => {
    var data = {
      mainId: $(plansBackgroundImageRemove).data("info"),
    };
    $.ajax({
      url: Base_Url + "/acp/liveupdation/bg_img_remove",
      type: "POST",
      dataType: "JSON",
      data: data,
      success: function (result) {
        plansBackgroundImage.style.backgroundImage = "";
        plansBackgroundImage.style.backgroundPosition = "";
        plansBackgroundImage.style.backgroundRepeat = "";
        plansBackgroundImage.style.backgroundSize = "";
        plansAddLabel.style.backgroundImage = "";
        plansBg.style.background = plansBgColor.style.backgroundColor;
      },
    });
  });
  // End plans Remove Background Image
}
// End plans

// Start Partners
if (partnersSection) {
  // Start Partners Title
  const partnersTitleColor = document.querySelector(
    ".partners-section .edit-part .change-edit-part .change-container .partners-title-dropdown .select-color .selected-color"
  );
  const partnersMenuColors = document.querySelector(
    ".partners-section .edit-part .change-edit-part .change-container .partners-title-dropdown .menu-colors"
  );
  const partnersMenuLi = document.querySelectorAll(
    ".partners-section .edit-part .change-edit-part .change-container .partners-title-dropdown .menu-colors > li"
  );
  const partnersTitle = document.querySelector(
    ".partners-section .title-section > h1"
  );

  partnersTitle.style.color = partnersTitleColor.style.backgroundColor;
  partnersTitleColor.addEventListener("click", () => {
    partnersMenuColors.classList.toggle("active-menu");
  });
  partnersMenuLi.forEach((item) => {
    item.addEventListener("click", () => {
      partnersMenuColors.classList.toggle("active-menu");
      var infos = $(item).data("info").split(",");
      var data = {
        colorId: infos[1],
        mainId: infos[0],
        type: infos[3],
        ColId: infos[4],
      };
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_color",
        type: "POST",
        dataType: "JSON",
        data: data,
        success: function (result) {
          if (result == "1") {
            partnersTitleColor.style.backgroundColor =
              item.style.backgroundColor;
            partnersTitle.style.color =
              partnersTitleColor.style.backgroundColor;
          }
        },
      });
    });
  });
  // End Partners Title

  // Start Plans Subtitle
  const partnersSubTitleColor = document.querySelector(
    ".partners-section .edit-part .change-edit-part .change-container .partners-subtitle-dropdown .select-color .selected-color"
  );
  const partnersSubMenuColors = document.querySelector(
    ".partners-section .edit-part .change-edit-part .change-container .partners-subtitle-dropdown .menu-colors"
  );
  const partnersSubMenuLi = document.querySelectorAll(
    ".partners-section .edit-part .change-edit-part .change-container .partners-subtitle-dropdown .menu-colors > li"
  );
  const partnersSubParagraph = document.querySelector(
    ".partners-section .title-section > p"
  );

  partnersSubParagraph.style.color =
    partnersSubTitleColor.style.backgroundColor;
  partnersSubTitleColor.addEventListener("click", () => {
    partnersSubMenuColors.classList.toggle("active-menu");
  });
  partnersSubMenuLi.forEach((item) => {
    item.addEventListener("click", () => {
      partnersSubMenuColors.classList.toggle("active-menu");
      var infos = $(item).data("info").split(",");
      var data = {
        colorId: infos[1],
        mainId: infos[0],
        type: infos[3],
        ColId: infos[4],
      };
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_color",
        type: "POST",
        dataType: "JSON",
        data: data,
        success: function (result) {
          if (result == "1") {
            partnersSubTitleColor.style.backgroundColor =
              item.style.backgroundColor;
            partnersSubParagraph.style.color =
              partnersSubTitleColor.style.backgroundColor;
          }
        },
      });
    });
  });
  // End Plans Subtitle

  // Start Partners Background
  const partnersBgColor = document.querySelector(
    ".partners-section .edit-part .change-edit-part .change-container .partners-background-dropdown .select-color .selected-color"
  );
  const partnersBgMenuColors = document.querySelector(
    ".partners-section .edit-part .change-edit-part .change-container .partners-background-dropdown .menu-colors"
  );
  const partnersBgMenuLi = document.querySelectorAll(
    ".partners-section .edit-part .change-edit-part .change-container .partners-background-dropdown .menu-colors > li"
  );
  const partnersBg = document.querySelector(".partners-section");

  const PartnershasBgImage = partnersSection.style.backgroundImage !== "";

  if (PartnershasBgImage) {
    partnersBg.style.background =
      partnersSection.style.backgroundImage +
      ", " +
      partnersBgColor.style.backgroundColor;
  } else {
    // Otherwise, show the background color.
    partnersBg.style.background = partnersBgColor.style.backgroundColor;
  }

  // partnersBg.style.background = partnersSection.style + ';' + partnersBgColor.style.backgroundColor;
  partnersBgColor.addEventListener("click", () => {
    partnersBgMenuColors.classList.toggle("active-menu");
  });
  partnersBgMenuLi.forEach((item) => {
    item.addEventListener("click", () => {
      partnersBgMenuColors.classList.toggle("active-menu");
      var infos = $(item).data("info").split(",");
      var data = {
        colorId: infos[1],
        mainId: infos[0],
        type: infos[3],
        ColId: infos[4],
      };
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_color",
        type: "POST",
        dataType: "JSON",
        data: data,
        success: function (result) {
          if (result == "1") {
            partnersBgColor.style.backgroundColor = item.style.backgroundColor;
            partnersBg.style.background = partnersBgColor.style.backgroundColor;
          }
        },
      });
    });
  });
  // End Partners Background

  // Start Partners Upload Background Image
  const partnersBackgroundImage = document.querySelector(".partners-section");
  const partnersBackgroundImageInput = document.querySelector(
    ".partners-section .edit-part .partners-background-image"
  );
  partnersBackgroundImageInput.addEventListener("change", () => {
    var fd = new FormData();
    var files = partnersBackgroundImageInput.files;

    var mainId = $(partnersBackgroundImageInput).data("info");
    // Check file selected or not
    if (files.length > 0) {
      fd.append("Section_Image", files[0]);
      fd.append("id", mainId);
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_bg_img",
        type: "post",
        data: fd,
        contentType: false,
        processData: false,
        success: function (response) {
          if (response == "1") {
            partnersBackgroundImage.style.backgroundImage =
              "url(" +
              URL.createObjectURL(partnersBackgroundImageInput.files[0]) +
              ")";
            partnersBackgroundImage.style.backgroundPosition = "center";
            partnersBackgroundImage.style.backgroundRepeat = "no-repeat";
            partnersBackgroundImage.style.backgroundSize = "cover";
            partnersAddLabel.style.backgroundImage =
              "url(" +
              URL.createObjectURL(partnersBackgroundImageInput.files[0]) +
              ")";
          }
        },
      });
    }
  });
  // End Partners Upload Background Image

  // Start Partners Remove Background Image
  const partnersBackgroundImageRemove = document.querySelector(
    ".partners-section .edit-part .label-remove-file"
  );
  partnersBackgroundImageRemove.addEventListener("click", () => {
    var data = {
      mainId: $(partnersBackgroundImageRemove).data("info"),
    };
    $.ajax({
      url: Base_Url + "/acp/liveupdation/bg_img_remove",
      type: "POST",
      dataType: "JSON",
      data: data,
      success: function (result) {
        partnersBackgroundImage.style.backgroundImage = "";
        partnersBackgroundImage.style.backgroundPosition = "";
        partnersBackgroundImage.style.backgroundRepeat = "";
        partnersBackgroundImage.style.backgroundSize = "";
        partnersAddLabel.style.backgroundImage = "";
        partnersBg.style.background = partnersBgColor.style.backgroundColor;
      },
    });
  });
  // End Partners Remove Background Image
}
// End Partners

// Start Contact
if (contactsSection) {
  // Start Contact Title
  const contactsTitleColor = document.querySelector(
    ".contacts-section .edit-part .change-edit-part .change-container .contacts-title-dropdown .select-color .selected-color"
  );
  const contactsMenuColors = document.querySelector(
    ".contacts-section .edit-part .change-edit-part .change-container .contacts-title-dropdown .menu-colors"
  );
  const contactsMenuLi = document.querySelectorAll(
    ".contacts-section .edit-part .change-edit-part .change-container .contacts-title-dropdown .menu-colors > li"
  );
  const contactsTitle = document.querySelector(
    ".contacts-section .title-section > h1"
  );

  contactsTitle.style.color = contactsTitleColor.style.backgroundColor;
  contactsTitleColor.addEventListener("click", () => {
    contactsMenuColors.classList.toggle("active-menu");
  });
  contactsMenuLi.forEach((item) => {
    item.addEventListener("click", () => {
      contactsMenuColors.classList.toggle("active-menu");
      var infos = $(item).data("info").split(",");
      var data = {
        colorId: infos[1],
        mainId: infos[0],
        type: infos[3],
        ColId: infos[4],
      };
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_color",
        type: "POST",
        dataType: "JSON",
        data: data,
        success: function (result) {
          if (result == "1") {
            contactsTitleColor.style.backgroundColor =
              item.style.backgroundColor;
            contactsTitle.style.color =
              contactsTitleColor.style.backgroundColor;
          }
        },
      });
    });
  });
  // End Contact Title

  // Start Plans Subtitle
  const contactSubTitleColor = document.querySelector(
    ".contacts-section .edit-part .change-edit-part .change-container .contacts-subtitle-dropdown .select-color .selected-color"
  );
  const contactSubMenuColors = document.querySelector(
    ".contacts-section .edit-part .change-edit-part .change-container .contacts-subtitle-dropdown .menu-colors"
  );
  const contactSubMenuLi = document.querySelectorAll(
    ".contacts-section .edit-part .change-edit-part .change-container .contacts-subtitle-dropdown .menu-colors > li"
  );
  const contactSubtitle = document.querySelector(
    ".contacts-section .title-section > p"
  );

  contactSubtitle.style.color = contactSubTitleColor.style.backgroundColor;

  contactSubTitleColor.addEventListener("click", () => {
    contactSubMenuColors.classList.toggle("active-menu");
  });
  contactSubMenuLi.forEach((item) => {
    item.addEventListener("click", () => {
      contactSubMenuColors.classList.toggle("active-menu");
      var infos = $(item).data("info").split(",");
      var data = {
        colorId: infos[1],
        mainId: infos[0],
        type: infos[3],
        ColId: infos[4],
      };
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_color",
        type: "POST",
        dataType: "JSON",
        data: data,
        success: function (result) {
          if (result == "1") {
            contactSubTitleColor.style.backgroundColor =
              item.style.backgroundColor;
            contactSubtitle.style.color =
              contactSubTitleColor.style.backgroundColor;
          }
        },
      });
    });
  });
  // End Plans Subtitle

  // Start Contact Text
  const contactsTextColor = document.querySelector(
    ".contacts-section .edit-part .change-edit-part .change-container .contacts-paragraph-dropdown .select-color .selected-color"
  );
  const contactsTextMenuColors = document.querySelector(
    ".contacts-section .edit-part .change-edit-part .change-container .contacts-paragraph-dropdown .menu-colors"
  );
  const contactsTextMenuLi = document.querySelectorAll(
    ".contacts-section .edit-part .change-edit-part .change-container .contacts-paragraph-dropdown .menu-colors > li"
  );
  const contactsTextLabels = document.querySelectorAll(
      ".contacts-section .contacts-content .contacts-info form .input-container > label"
    ),
    contactsTextParagraphs = document.querySelectorAll(
      ".contacts-section .contacts-content .contacts-text > p"
    );

  contactsTextLabels.forEach((item) => {
    item.style.color = contactsTextColor.style.backgroundColor;
  });
  contactsTextParagraphs.forEach((item) => {
    item.style.color = contactsTextColor.style.backgroundColor;
  });
  contactsTextColor.addEventListener("click", () => {
    contactsTextMenuColors.classList.toggle("active-menu");
  });
  contactsTextMenuLi.forEach((item) => {
    item.addEventListener("click", () => {
      contactsTextMenuColors.classList.toggle("active-menu");
      var infos = $(item).data("info").split(",");
      var data = {
        colorId: infos[1],
        mainId: infos[0],
        type: infos[3],
        ColId: infos[4],
      };
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_color",
        type: "POST",
        dataType: "JSON",
        data: data,
        success: function (result) {
          if (result == "1") {
            contactsTextColor.style.backgroundColor =
              item.style.backgroundColor;
            contactsTextLabels.forEach((item) => {
              item.style.color = contactsTextColor.style.backgroundColor;
            });
            contactsTextParagraphs.forEach((item) => {
              item.style.color = contactsTextColor.style.backgroundColor;
            });
          }
        },
      });
    });
  });
  // End Contact Text

  // Start Contact Button
  const contactCardButtonColor = document.querySelector(
    ".contacts-section .edit-part .change-edit-part .change-container .contacts-button-dropdown .select-color .selected-color"
  );
  const contactCardButtonMenuColors = document.querySelector(
    ".contacts-section .edit-part .change-edit-part .change-container .contacts-button-dropdown .menu-colors"
  );
  const contactCardButtonMenuLi = document.querySelectorAll(
    ".contacts-section .edit-part .change-edit-part .change-container .contacts-button-dropdown .menu-colors > li"
  );
  const contactCardButton = document.querySelector(
    ".contacts-section .contacts-content .contacts-info form .submit-form-btn"
  );
  if (contactCardButton) {
    contactCardButton.style.background =
      contactCardButtonColor.style.backgroundColor;
    contactCardButtonColor.addEventListener("click", () => {
      contactCardButtonMenuColors.classList.toggle("active-menu");
    });
    contactCardButtonMenuLi.forEach((item) => {
      item.addEventListener("click", () => {
        contactCardButtonMenuColors.classList.toggle("active-menu");
        var infos = $(item).data("info").split(",");
        var data = {
          colorId: infos[1],
          mainId: infos[0],
          type: infos[3],
          ColId: infos[4],
        };
        $.ajax({
          url: Base_Url + "/acp/liveupdation/change_color",
          type: "POST",
          dataType: "JSON",
          data: data,
          success: function (result) {
            if (result == "1") {
              contactCardButtonColor.style.backgroundColor =
                item.style.backgroundColor;
              contactCardButton.style.background =
                contactCardButtonColor.style.backgroundColor;
            }
          },
        });
      });
    });
  }
  // End Contact Button

  // Start Contact Background
  const contactsBgColor = document.querySelector(
    ".contacts-section .edit-part .change-edit-part .change-container .contacts-background-dropdown .select-color .selected-color"
  );
  const contactsBgMenuColors = document.querySelector(
    ".contacts-section .edit-part .change-edit-part .change-container .contacts-background-dropdown .menu-colors"
  );
  const contactsBgMenuLi = document.querySelectorAll(
    ".contacts-section .edit-part .change-edit-part .change-container .contacts-background-dropdown .menu-colors > li"
  );
  const contactsBg = document.querySelector(".contacts-section");

  const ContactshasBgImage = contactsSection.style.backgroundImage !== "";

  if (ContactshasBgImage) {
    contactsBg.style.background =
      contactsSection.style.backgroundImage +
      ", " +
      contactsBgColor.style.backgroundColor;
  } else {
    // Otherwise, show the background color.
    contactsBg.style.background = contactsBgColor.style.backgroundColor;
  }

  // contactsBg.style.background = contactsSection.style + ';' + contactsBgColor.style.backgroundColor;
  contactsBgColor.addEventListener("click", () => {
    contactsBgMenuColors.classList.toggle("active-menu");
  });
  contactsBgMenuLi.forEach((item) => {
    item.addEventListener("click", () => {
      contactsBgMenuColors.classList.toggle("active-menu");
      var infos = $(item).data("info").split(",");
      var data = {
        colorId: infos[1],
        mainId: infos[0],
        type: infos[3],
        ColId: infos[4],
      };
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_color",
        type: "POST",
        dataType: "JSON",
        data: data,
        success: function (result) {
          if (result == "1") {
            contactsBgColor.style.backgroundColor = item.style.backgroundColor;
            contactsBg.style.background = contactsBgColor.style.backgroundColor;
          }
        },
      });
    });
  });
  // End Contact Background

  // Start Contact Upload Background Image
  const contactsBackgroundImage = document.querySelector(".contacts-section");
  const contactsBackgroundImageInput = document.querySelector(
    ".contacts-section .edit-part .contacts-background-image"
  );
  contactsBackgroundImageInput.addEventListener("change", () => {
    var fd = new FormData();
    var files = contactsBackgroundImageInput.files;

    var mainId = $(contactsBackgroundImageInput).data("info");
    // Check file selected or not
    if (files.length > 0) {
      fd.append("Section_Image", files[0]);
      fd.append("id", mainId);
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_bg_img",
        type: "post",
        data: fd,
        contentType: false,
        processData: false,
        success: function (response) {
          if (response == "1") {
            contactsBackgroundImage.style.backgroundImage =
              "url(" +
              URL.createObjectURL(contactsBackgroundImageInput.files[0]) +
              ")";
            contactsBackgroundImage.style.backgroundPosition = "center";
            contactsBackgroundImage.style.backgroundRepeat = "no-repeat";
            contactsBackgroundImage.style.backgroundSize = "cover";
            contactsAddLabel.style.backgroundImage =
              "url(" +
              URL.createObjectURL(contactsBackgroundImageInput.files[0]) +
              ")";
          }
        },
      });
    }
  });
  // End Contact Upload Background Image

  // Start Contact Remove Background Image
  const contactsBackgroundImageRemove = document.querySelector(
    ".contacts-section .edit-part .label-remove-file"
  );
  contactsBackgroundImageRemove.addEventListener("click", () => {
    var data = {
      mainId: $(contactsBackgroundImageRemove).data("info"),
    };
    $.ajax({
      url: Base_Url + "/acp/liveupdation/bg_img_remove",
      type: "POST",
      dataType: "JSON",
      data: data,
      success: function (result) {
        contactsBackgroundImage.style.backgroundImage = "";
        contactsBackgroundImage.style.backgroundPosition = "";
        contactsBackgroundImage.style.backgroundRepeat = "";
        contactsBackgroundImage.style.backgroundSize = "";
        contactsAddLabel.style.backgroundImage = "";
        contactsBg.style.background = contactsBgColor.style.backgroundColor;
      },
    });
  });
  // End Contact Remove Background Image
}
// End Contact

// Start Footer
if (footerSection) {
  // Start Footer Logo Change
  const footerLogoImg = document.querySelector(
    ".footer .footer-content .logo a > img"
  );
  const footerLogoSelect = document.querySelector(
    ".footer .edit-part .change-edit-part .change-container.change-header-logo ul"
  );
  const footerLogoSelected = document.querySelector(
    ".footer .edit-part .change-edit-part .change-container.change-header-logo .selected-color"
  );
  const footerLogoSelectedImg = document.querySelector(
    ".footer .edit-part .change-edit-part .change-container.change-header-logo .selected-color > img"
  );
  const footerLogoOptions = document.querySelectorAll(
    ".footer .edit-part .change-edit-part .change-container.change-header-logo ul > li"
  );
  footerLogoSelected.addEventListener("click", () => {
    footerLogoSelect.classList.toggle("active-menu");
    footerLogoOptions.forEach((item) => {
      item.addEventListener("click", () => {
        var infos = $(item).data("info").split(",");
        var data = {
          key: infos[0],
          websiteId: infos[1],
          value: item.getAttribute("data-value"),
        };
        $.ajax({
          url: Base_Url + "/acp/liveupdation/change_logo_color",
          type: "POST",
          dataType: "JSON",
          data: data,
          success: function (result) {
            if (result == "1") {
              const logoSelectValue = item.getAttribute("data-value");
              switch (logoSelectValue) {
                case "dark":
                  footerLogoOptions.forEach((item) => {
                    if (item.getAttribute("data-value") == "dark") {
                      footerLogoImg.src = item.getAttribute("data-src");
                      footerLogoSelectedImg.src = item.getAttribute("data-src");
                      footerLogoSelect.classList.remove("active-menu");
                    }
                  });
                  break;
                case "light":
                  footerLogoOptions.forEach((item) => {
                    if (item.getAttribute("data-value") == "light") {
                      footerLogoImg.src = item.getAttribute("data-src");
                      footerLogoSelectedImg.src = item.getAttribute("data-src");
                      footerLogoSelect.classList.remove("active-menu");
                    }
                  });
                  break;
                case "white":
                  footerLogoOptions.forEach((item) => {
                    if (item.getAttribute("data-value") == "white") {
                      footerLogoImg.src = item.getAttribute("data-src");
                      footerLogoSelectedImg.src = item.getAttribute("data-src");
                      footerLogoSelect.classList.remove("active-menu");
                    }
                  });
                  break;
              }
            }
          },
        });
      });
    });
  });
  // End Footer Logo Change

  // Start Footer Text
  const footerTextColor = document.querySelector(
    ".footer .edit-part .change-edit-part .change-container .footer-text-dropdown .select-color .selected-color"
  );
  const footerTextMenuColors = document.querySelector(
    ".footer .edit-part .change-edit-part .change-container .footer-text-dropdown .menu-colors"
  );
  const footerTextMenuLi = document.querySelectorAll(
    ".footer .edit-part .change-edit-part .change-container .footer-text-dropdown .menu-colors > li"
  );
  const footerTextH3 = document.querySelectorAll(
      ".footer .footer-copyright > h1"
    ),
    footerTextParagraph = document.querySelectorAll(
      ".footer .footer-copyright > p"
    ),
    footerTextNav = document.querySelectorAll(".footer .footer-links > li a");

  footerTextH3.forEach((item) => {
    item.style.color = footerTextColor.style.backgroundColor;
  });
  footerTextParagraph.forEach((item) => {
    item.style.color = footerTextColor.style.backgroundColor;
  });
  footerTextNav.forEach((item) => {
    item.style.color = footerTextColor.style.backgroundColor;
  });
  footerTextColor.addEventListener("click", () => {
    footerTextMenuColors.classList.toggle("active-menu");
  });
  footerTextMenuLi.forEach((item) => {
    item.addEventListener("click", () => {
      footerTextMenuColors.classList.toggle("active-menu");
      var infos = $(item).data("info").split(",");
      var data = {
        colorId: infos[0],
        websiteId: infos[1],
        key: infos[2],
      };
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_HF_color",
        type: "POST",
        dataType: "JSON",
        data: data,
        success: function (result) {
          if (result == "1") {
            footerTextColor.style.backgroundColor = item.style.backgroundColor;
            footerTextH3.forEach((item) => {
              item.style.color = footerTextColor.style.backgroundColor;
            });
            footerTextParagraph.forEach((item) => {
              item.style.color = footerTextColor.style.backgroundColor;
            });
            footerTextNav.forEach((item) => {
              item.style.color = footerTextColor.style.backgroundColor;
            });
          }
        },
      });
    });
  });
  // End Footer Text

  // Start Footer Social Links
  const footerIconColor = document.querySelector(
    ".footer .edit-part .change-edit-part .change-container .footer-button-dropdown .select-color .selected-color"
  );
  const footerIconMenuColors = document.querySelector(
    ".footer .edit-part .change-edit-part .change-container .footer-button-dropdown .menu-colors"
  );
  const footerIconMenuLi = document.querySelectorAll(
    ".footer .edit-part .change-edit-part .change-container .footer-button-dropdown .menu-colors > li"
  );
  footerSocialIcons = document.querySelectorAll(
    ".footer .footer-content .social-icons a > i"
  );

  footerSocialIcons.forEach((item) => {
    item.style.color = footerIconColor.style.backgroundColor;
  });

  footerIconColor.addEventListener("click", () => {
    footerIconMenuColors.classList.toggle("active-menu");
  });
  footerIconMenuLi.forEach((item) => {
    item.addEventListener("click", () => {
      footerIconMenuColors.classList.toggle("active-menu");
      var infos = $(item).data("info").split(",");
      var data = {
        colorId: infos[0],
        websiteId: infos[1],
        key: infos[2],
      };
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_HF_color",
        type: "POST",
        dataType: "JSON",
        data: data,
        success: function (result) {
          if (result == "1") {
            footerIconColor.style.backgroundColor = item.style.backgroundColor;
            footerSocialIcons.forEach((item) => {
              item.style.color = footerIconColor.style.backgroundColor;
            });
          }
        },
      });
    });
  });
  // End Footer Social Links

  // Start Footer Background
  const footerBgColor = document.querySelector(
    ".footer .edit-part .change-edit-part .change-container .footer-background-dropdown .select-color .selected-color"
  );
  const footerBgMenuColors = document.querySelector(
    ".footer .edit-part .change-edit-part .change-container .footer-background-dropdown .menu-colors"
  );
  const footerBgMenuLi = document.querySelectorAll(
    ".footer .edit-part .change-edit-part .change-container .footer-background-dropdown .menu-colors > li"
  );
  const footerBg = document.querySelector(".footer");
  const FooterhasBgImage = footerSection.style.backgroundImage !== "";

  if (FooterhasBgImage) {
    footerBg.style.background =
      footerSection.style.backgroundImage +
      ", " +
      footerBgColor.style.backgroundColor;
    footerSection.style.backgroundPosition = "center";
    footerSection.style.backgroundRepeat = "no-repeat";
    footerSection.style.backgroundSize = "cover";
  } else {
    // Otherwise, show the background color.
    footerBg.style.background = footerBgColor.style.backgroundColor;
  }
  // footerBg.style.background = footerBgColor.style.backgroundColor;
  footerBgColor.addEventListener("click", () => {
    footerBgMenuColors.classList.toggle("active-menu");
  });
  footerBgMenuLi.forEach((item) => {
    item.addEventListener("click", () => {
      footerBgMenuColors.classList.toggle("active-menu");
      var infos = $(item).data("info").split(",");
      var data = {
        colorId: infos[0],
        websiteId: infos[1],
        key: infos[2],
      };
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_HF_color",
        type: "POST",
        dataType: "JSON",
        data: data,
        success: function (result) {
          footerBgColor.style.backgroundColor = item.style.backgroundColor;
          footerBg.style.background = footerBgColor.style.backgroundColor;
        },
      });
    });
  });
  // End Footer Background

  // Start Footer Upload Background Image
  const footerBackgroundImage = document.querySelector(".footer");
  const footerBackgroundImageInput = document.querySelector(
    ".footer .edit-part .footer-background-image"
  );
  footerBackgroundImageInput.addEventListener("change", () => {
    var fd = new FormData();
    var files = footerBackgroundImageInput.files;

    var mainId = $(footerBackgroundImageInput).data("info");
    // Check file selected or not
    if (files.length > 0) {
      fd.append("Section_Image", files[0]);
      fd.append("websiteId", mainId);
      $.ajax({
        url: Base_Url + "/acp/liveupdation/change_footer_bg_img",
        type: "post",
        data: fd,
        contentType: false,
        processData: false,
        success: function (response) {
          if (response == "1") {
            footerBackgroundImage.style.backgroundImage =
              "url(" +
              URL.createObjectURL(footerBackgroundImageInput.files[0]) +
              ")";
            footerBackgroundImage.style.backgroundPosition = "center";
            footerBackgroundImage.style.backgroundRepeat = "no-repeat";
            footerBackgroundImage.style.backgroundSize = "cover";
          }
        },
      });
    }
  });
  // End Footer Upload Background Image

  // Start Footer Remove Background Image
  const footerBackgroundImageRemove = document.querySelector(
    ".footer .edit-part .label-remove-file"
  );
  footerBackgroundImageRemove.addEventListener("click", () => {
    var data = {
      mainId: $(footerBackgroundImageRemove).data("info"),
    };
    $.ajax({
      url: Base_Url + "/acp/liveupdation/footer_bg_img_remove",
      type: "POST",
      dataType: "JSON",
      data: data,
      success: function (result) {
        footerBackgroundImage.style.backgroundImage = "";
        footerBackgroundImage.style.backgroundPosition = "";
        footerBackgroundImage.style.backgroundRepeat = "";
        footerBackgroundImage.style.backgroundSize = "";
        footerAddLabel.style.backgroundImage = "";
        footerBg.style.background = footerBgColor.style.backgroundColor;
      },
    });
  });
  // End Footer Remove Background Image
}
// End Footer
