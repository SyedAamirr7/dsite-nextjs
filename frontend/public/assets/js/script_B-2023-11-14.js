// Start Responsive Header
const toggleBarBtn = document.querySelector(
  ".header nav .toggle-bars .menuButton"
);
const toggleBarInput = document.querySelector(
  '.header nav .toggle-bars input[type = "checkbox"]'
);
const mainMenu = document.querySelector(".header nav .header-links");
const mainMenuLi = document.querySelectorAll(".header nav .header-links li a");

toggleBarBtn.addEventListener("click", () => {
  if (toggleBarInput.checked == true) {
    mainMenu.classList.add("active");
    document.documentElement.style.overflow = "hidden";
  } else {
    mainMenu.classList.remove("active");
    document.documentElement.style.overflow = "";
  }
});
mainMenuLi.forEach((item) => {
  item.addEventListener("click", () => {
    mainMenu.classList.remove("active");
    toggleBarInput.checked = false;
    document.documentElement.style.overflow = "";
  });
});
// Start update (30-10-2023)
const mainSublinks = document.querySelectorAll(".header nav .header-links li");
if (mainSublinks) {
  if (mainSublinks.length <= 0) {
    toggleBarBtn.style.display = "none";
  }
}
// End update (30-10-2023)
// End Responsive Header

// Start update (29/10/2023)
// Start check the about image
const aboutImg = document.querySelector(
  ".about-section .about-content .about-info .logo > a img"
);
const aboutText = document.querySelector(
  ".about-section:not(.about-page) .about-content .about-info .about-text"
);
if (aboutText) {
  if (!aboutImg) {
    aboutText.classList.add("padding-active");
  } else {
    aboutText.classList.remove("padding-active");
  }
}
// End check the about image
// End update (29/10/2023)

// Start Header Links
const pageItem = document.querySelector(
  ".header nav .header-links .pages-span"
);
const dropdownPages = document.querySelector(".header .dropdown-pages");
const dropdownLi = document.querySelector(".header .dropdown-li");
// Start update (24/10/2023)
if (pageItem) {
  pageItem.addEventListener("click", () => {
    dropdownPages.classList.toggle("active-page");
    dropdownLi.classList.toggle("active");
  });
}
// End update (24/10/2023)
// End Header Links

// Start Header
const headerSection = document.querySelector(".header");
if (headerSection) {
  // Start Header Color Change
  const selectHeaderColor = document.querySelector(
    ".header .edit-part .change-edit-part .change-container .header-color-dropdown .select-color"
  );
  const selectedHeaderColor = document.querySelector(
    ".header .edit-part .change-edit-part .change-container .header-color-dropdown .select-color .selected-color"
  );
  const menuHeaderColors = document.querySelector(
    ".header .edit-part .change-edit-part .change-container .header-color-dropdown .menu-colors"
  );
  const allMenuHeaderColors = document.querySelectorAll(
    ".header .edit-part .change-edit-part .change-container .menu-colors"
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
  const togglebutton = document.querySelectorAll(
    ".header nav .toggle-bars label > span"
  );
  const dropdownMenuPages = document.querySelector(".header .dropdown-pages");
  const headerLinksNav = document.querySelector(".header nav .header-links");

  if (selectedHeaderColor) {
    headerLinks.forEach((item) => {
      item.style.color = selectedHeaderColor.style.backgroundColor;
    });
    // Start update (24/10/2023)
    if (headerLinksSpan) {
      headerLinksSpan.style.color = selectedHeaderColor.style.backgroundColor;
    }
    // End update (24/10/2023)
    headerMenuIcon.forEach((item) => {
      item.style.color = selectedHeaderColor.style.backgroundColor;
    });
    selectHeaderColor.addEventListener("click", () => {
      // menuHeaderColors.classList.toggle("active-menu");
      if (menuHeaderColors.classList.contains("active-menu")) {
        allMenuHeaderColors.forEach((item) => {
          item.classList.remove("active-menu");
        });
      } else {
        allMenuHeaderColors.forEach((item) => {
          item.classList.remove("active-menu");
        });
        menuHeaderColors.classList.add("active-menu");
      }
    });
    selectedColorLi.forEach((item) => {
      item.addEventListener("click", () => {
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
            menuHeaderColors.classList.toggle("active-menu");
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
              // Start update (30-10-2023)
              checkLinksBgFunction();
              // End update (30-10-2023)
            });
            if (headerLinksSpan) {
              headerLinksSpan.style.color =
                selectedHeaderColor.style.backgroundColor;
            }
            headerMenuIcon.forEach((item) => {
              item.style.color = selectedHeaderColor.style.backgroundColor;
            });
            togglebutton.forEach((item) => {
              item.style.backgroundColor =
                selectedHeaderColor.style.backgroundColor;
            });
          },
        });
      });
    });
  }
  // End Header Color Change

  // Start Header Bg Change
  const selectHeaderBg = document.querySelector(
    ".header .edit-part .change-edit-part .change-container .header-bg-dropdown .select-color"
  );
  const selectedHeaderBg = document.querySelector(
    ".header .edit-part .change-edit-part .change-container .header-bg-dropdown .select-color .selected-color"
  );
  const menuHeaderBg = document.querySelector(
    ".header .edit-part .change-edit-part .change-container .header-bg-dropdown .menu-colors"
  );
  const allMenuHeaderBg = document.querySelectorAll(
    ".header .edit-part .change-edit-part .change-container .menu-colors"
  );
  const selectedBgLi = document.querySelectorAll(
    ".header .edit-part .change-edit-part .change-container .header-bg-dropdown .menu-colors > li"
  );

  if (selectedHeaderColor) {
    headerSection.style.background = selectedHeaderBg.style.backgroundColor;
    selectHeaderBg.addEventListener("click", () => {
      // menuHeaderBg.classList.toggle("active-menu");
      if (menuHeaderBg.classList.contains("active-menu")) {
        allMenuHeaderBg.forEach((item) => {
          item.classList.remove("active-menu");
        });
      } else {
        allMenuHeaderBg.forEach((item) => {
          item.classList.remove("active-menu");
        });
        menuHeaderBg.classList.add("active-menu");
      }
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
  }
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
  if (logoSelect) {
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
  }
  // End Header Logo Change
}
// End Header

// Start Footer
const footerSection = document.querySelector(".footer");
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
  if (footerLogoSelect) {
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
                        footerLogoSelectedImg.src =
                          item.getAttribute("data-src");
                        footerLogoSelect.classList.remove("active-menu");
                      }
                    });
                    break;
                  case "light":
                    footerLogoOptions.forEach((item) => {
                      if (item.getAttribute("data-value") == "light") {
                        footerLogoImg.src = item.getAttribute("data-src");
                        footerLogoSelectedImg.src =
                          item.getAttribute("data-src");
                        footerLogoSelect.classList.remove("active-menu");
                      }
                    });
                    break;
                  case "white":
                    footerLogoOptions.forEach((item) => {
                      if (item.getAttribute("data-value") == "white") {
                        footerLogoImg.src = item.getAttribute("data-src");
                        footerLogoSelectedImg.src =
                          item.getAttribute("data-src");
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
  }
  // End Footer Logo Change

  // Start Footer Text
  const footerHeaderColor = document.querySelector(
    ".footer .edit-part .change-edit-part .change-container .footer-header-dropdown .select-color .selected-color"
  );
  const footerHeaderMenuColors = document.querySelector(
    ".footer .edit-part .change-edit-part .change-container .footer-header-dropdown .menu-colors"
  );
  const footerHeaderMenuLi = document.querySelectorAll(
    ".footer .edit-part .change-edit-part .change-container .footer-header-dropdown .menu-colors > li"
  );
  const allFooterHeaderMenuColors = document.querySelectorAll(
    ".footer .edit-part .change-edit-part .change-container .menu-colors"
  );
  const footerHeaderIcons = document.querySelectorAll(
    ".footer .footer-content .social-icons a > i"
  );

  if (footerHeaderColor) {
    footerHeaderIcons.forEach((item) => {
      item.style.color = footerHeaderColor.style.backgroundColor;
    });
    footerHeaderColor.addEventListener("click", () => {
      // footerHeaderMenuColors.classList.toggle("active-menu");
      if (footerHeaderMenuColors.classList.contains("active-menu")) {
        allFooterHeaderMenuColors.forEach((item) => {
          item.classList.remove("active-menu");
        });
      } else {
        allFooterHeaderMenuColors.forEach((item) => {
          item.classList.remove("active-menu");
        });
        footerHeaderMenuColors.classList.add("active-menu");
      }
    });
    footerHeaderMenuLi.forEach((item) => {
      item.addEventListener("click", () => {
        footerHeaderMenuColors.classList.toggle("active-menu");
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
              footerHeaderColor.style.backgroundColor =
                item.style.backgroundColor;
              footerHeaderIcons.forEach((item) => {
                item.style.color = footerHeaderColor.style.backgroundColor;
              });
            }
          },
        });
      });
    });
  }
  // End Footer Text

  // Start Footer Social Links
  const footerIconColor = document.querySelector(
    ".footer .edit-part .change-edit-part .change-container .footer-subtitle-dropdown .select-color .selected-color"
  );
  const footerIconMenuColors = document.querySelector(
    ".footer .edit-part .change-edit-part .change-container .footer-subtitle-dropdown .menu-colors"
  );
  const footerIconMenuLi = document.querySelectorAll(
    ".footer .edit-part .change-edit-part .change-container .footer-subtitle-dropdown .menu-colors > li"
  );
  const allFooterIconMenuColors = document.querySelectorAll(
    ".footer .edit-part .change-edit-part .change-container .menu-colors"
  );
  const footerIconLinks = document.querySelectorAll(
    ".footer .footer-links > li a"
  );

  if (footerIconColor) {
    footerIconLinks.forEach((item) => {
      item.style.color = footerIconColor.style.backgroundColor;
    });
    footerIconColor.addEventListener("click", () => {
      // footerIconMenuColors.classList.toggle("active-menu");
      if (footerIconMenuColors.classList.contains("active-menu")) {
        allFooterIconMenuColors.forEach((item) => {
          item.classList.remove("active-menu");
        });
      } else {
        allFooterIconMenuColors.forEach((item) => {
          item.classList.remove("active-menu");
        });
        footerIconMenuColors.classList.add("active-menu");
      }
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
              footerIconColor.style.backgroundColor =
                item.style.backgroundColor;
              footerIconLinks.forEach((item) => {
                item.style.color = footerIconColor.style.backgroundColor;
              });
            }
          },
        });
      });
    });
  }
  // End Footer Social Links

  // Start Footer Background
  const footerBgColor = document.querySelector(
    ".footer .edit-part .change-edit-part .change-container .footer-background-dropdown .select-color .selected-color"
  );
  const footerBgMenuColors = document.querySelector(
    ".footer .edit-part .change-edit-part .change-container .footer-background-dropdown .menu-colors"
  );
  const allFooterBgMenuColors = document.querySelectorAll(
    ".footer .edit-part .change-edit-part .change-container .menu-colors"
  );
  const footerBgMenuLi = document.querySelectorAll(
    ".footer .edit-part .change-edit-part .change-container .footer-background-dropdown .menu-colors > li"
  );
  const footerBg = document.querySelector(".footer");

  const FooterhasBgImage = footerSection.style.backgroundImage !== "";
  if (footerBgColor) {
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
      // footerBgMenuColors.classList.toggle("active-menu");
      if (footerBgMenuColors.classList.contains("active-menu")) {
        allFooterBgMenuColors.forEach((item) => {
          item.classList.remove("active-menu");
        });
      } else {
        allFooterBgMenuColors.forEach((item) => {
          item.classList.remove("active-menu");
        });
        footerBgMenuColors.classList.add("active-menu");
      }
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
  }
  // End Footer Background

  // Start Footer Upload Background Image
  const footerBackgroundImage = document.querySelector(".footer");
  const footerBackgroundImageInput = document.querySelector(
    ".footer .edit-part .footer-background-image"
  );
  const footerAddLabel = document.querySelector(
    ".footer .edit-part .change-edit-part .change-container .label-upload-file"
  );

  if (footerBackgroundImageInput) {
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
              footerBackgroundImage.style.backgroundAttachment = "fixed";
              footerAddLabel.style.backgroundImage =
                "url(" +
                URL.createObjectURL(footerBackgroundImageInput.files[0]) +
                ")";
            }
          },
        });
      }
    });
  }
  // End Footer Upload Background Image

  // Start Footer Remove Background Image
  const footerBackgroundImageRemove = document.querySelector(
    ".footer .edit-part .label-remove-file"
  );
  if (footerBackgroundImageRemove) {
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
          footerBackgroundImage.style.backgroundAttachment = "";
          footerAddLabel.style.backgroundImage = "";
          footerBg.style.background = footerBgColor.style.backgroundColor;
        },
      });
    });
  }
  // End Footer Remove Background Image
}
// End Footer

// The below script can be applied on the other sections
// Start Edit Sections
const sectionWrapper = document.querySelectorAll(".section-wrapper");
const loginCheck = document.querySelector(".section-wrapper .edit-part");
if (loginCheck) {
  sectionWrapper.forEach((item) => {
    if (item) {
      const upperSection = item;

      // Start Color style
      const allSectionColor = upperSection.querySelectorAll(
        ".general__section-get-color"
      );
      allSectionColor.forEach((sectionColor) => {
        const sectionColorTarget = document.querySelector(
          sectionColor.dataset.target
        );
        if (sectionColor.style.color) {
          sectionColorTarget.style.backgroundColor = sectionColor.style.color;
        }
      });

      const selectColorItem = item.querySelectorAll(
        ".edit-part .change-edit-part .change-container .dropdown-colors .select-color"
      );
      selectColorItem.forEach((item) => {
        item.addEventListener("click", () => {
          const selectedColorItem = item.querySelector(".selected-color");
          const sectionDropdownColors =
            item.parentElement.parentElement.querySelector(".dropdown-colors");
          const sectionMenuColors = item.parentElement.querySelector(
            ".dropdown-colors .menu-colors"
          );
          const allSectionMenuColors = document.querySelectorAll(
            ".edit-part .dropdown-colors .menu-colors"
          );
          // sectionMenuColors.classList.toggle("active-menu");
          if (sectionMenuColors.classList.contains("active-menu")) {
            allSectionMenuColors.forEach((item) => {
              item.classList.remove("active-menu");
            });
          } else {
            allSectionMenuColors.forEach((item) => {
              item.classList.remove("active-menu");
            });
            sectionMenuColors.classList.add("active-menu");
            sectionDropdownColors.addEventListener("mouseleave", () => {
              allSectionMenuColors.forEach((item) => {
                item.classList.remove("active-menu");
              });
            });
          }
          const selectParentItem = selectedColorItem.parentElement;
          const editType = selectParentItem.dataset.targetType;
          const sectionName = selectParentItem.dataset.targetSection;
          const subPage = selectParentItem.dataset.targetPage;
          const sectionContent =
            document.getElementsByClassName(sectionName)[0];

          // Update after testing (14/9/2023)
          // Start Title
          if (editType == "title") {
            const sectionTitle =
              sectionContent.querySelectorAll(".header__section");
            const sectionTitleBtnDetails =
              sectionContent.querySelector(".btn-details-page");
            const sectionTitleLi = sectionContent.querySelectorAll(
              ".edit-part .change-edit-part .change-container .section-title-dropdown .menu-colors > li"
            );
            // Update (17/10/2023)
            // Start change selector
            const activeDot = sectionContent.querySelectorAll(
              ".slider-section .slides .carousel-indicators [data-bs-target]"
            );
            // End change selector
            sectionTitleLi.forEach((item) => {
              item.addEventListener("click", () => {
                sectionMenuColors.classList.remove("active-menu");
                if (subPage == "sub-page") {
                  var infos = $(item).data("info").split(",");
                  var data = {
                    websiteId: infos[1],
                    key: infos[2],
                    colorId: infos[0],
                    ColId: infos[4],
                  };
                  $.ajax({
                    url: Base_Url + "/acp/liveupdation/change_page_colors",
                    type: "POST",
                    dataType: "JSON",
                    data: data,
                    success: function (result) {
                      if (result == "1") {
                        selectedColorItem.style.backgroundColor =
                          item.style.backgroundColor;
                        sectionTitle.forEach((item) => {
                          item.style.color =
                            selectedColorItem.style.backgroundColor;
                        });
                      }
                    },
                  });
                } else {
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
                        selectedColorItem.style.backgroundColor =
                          item.style.backgroundColor;
                        // Update 17/10/2023
                        // Start check if the color is light or dark
                        checkArrowColorFunction(item);
                        // End check if the color is light or dark
                        sectionTitle.forEach((item) => {
                          if (sectionTitleBtnDetails) {
                            if (
                              sectionTitleBtnDetails.dataset.target ==
                              "sub-page"
                            ) {
                              item.style.color =
                                selectedColorItem.style.backgroundColor;
                              sectionTitleBtnDetails.style.backgroundColor =
                                selectedColorItem.style.backgroundColor;
                              sectionTitleBtnDetails.style.borderColor =
                                selectedColorItem.style.backgroundColor;
                              sectionTitleBtnDetails.style.setProperty(
                                "--shadow-hover",
                                `${selectedColorItem.style.backgroundColor}`
                              );
                            } else {
                              item.style.color =
                                selectedColorItem.style.backgroundColor;
                            }
                          } else {
                            item.style.color =
                              selectedColorItem.style.backgroundColor;
                          }
                        });
                        activeDot.forEach((dot) => {
                          dot.style.setProperty(
                            "background-color",
                            `${selectedColorItem.style.backgroundColor}`
                          );
                        });
                      }
                    },
                  });
                }
              });
            });
          }
          // End Title

          // Start Subtitle
          if (editType == "subtitle") {
            const sectionSubtitle = sectionContent.querySelectorAll(
              ".header__section-subtitle"
            );
            const sectionSubtitleLi = sectionContent.querySelectorAll(
              ".edit-part .change-edit-part .change-container .section-subtitle-dropdown .menu-colors > li"
            );
            sectionSubtitleLi.forEach((item) => {
              item.addEventListener("click", () => {
                sectionMenuColors.classList.remove("active-menu");
                if (subPage == "sub-page") {
                  var infos = $(item).data("info").split(",");
                  var data = {
                    websiteId: infos[1],
                    key: infos[2],
                    colorId: infos[0],
                    ColId: infos[4],
                  };
                  $.ajax({
                    url: Base_Url + "/acp/liveupdation/change_page_colors",
                    type: "POST",
                    dataType: "JSON",
                    data: data,
                    success: function (result) {
                      if (result == "1") {
                        selectedColorItem.style.backgroundColor =
                          item.style.backgroundColor;
                        sectionSubtitle.forEach((item) => {
                          item.style.color =
                            selectedColorItem.style.backgroundColor;
                        });
                      }
                    },
                  });
                } else {
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
                        selectedColorItem.style.backgroundColor =
                          item.style.backgroundColor;
                        // Update 17/10/2023
                        // Start check if the color is light or dark
                        checkArrowColorFunction(item);
                        // End check if the color is light or dark
                        sectionSubtitle.forEach((item) => {
                          item.style.color =
                            selectedColorItem.style.backgroundColor;
                        });
                      }
                    },
                  });
                }
              });
            });
          }
          // End Subtitle

          // Start Paragraph
          if (editType == "paragraph") {
            const sectionParagraph = sectionContent.querySelectorAll(
              ".general__section-paragraph"
            );
            const sectionParagraphLi = sectionContent.querySelectorAll(
              ".edit-part .change-edit-part .change-container .section-paragraph-dropdown .menu-colors > li"
            );
            sectionParagraphLi.forEach((item) => {
              item.addEventListener("click", () => {
                sectionMenuColors.classList.remove("active-menu");
                if (subPage == "sub-page") {
                  var infos = $(item).data("info").split(",");
                  var data = {
                    websiteId: infos[1],
                    key: infos[2],
                    colorId: infos[0],
                    ColId: infos[4],
                  };
                  $.ajax({
                    url: Base_Url + "/acp/liveupdation/change_page_colors",
                    type: "POST",
                    dataType: "JSON",
                    data: data,
                    success: function (result) {
                      if (result == "1") {
                        selectedColorItem.style.backgroundColor =
                          item.style.backgroundColor;
                        sectionParagraph.forEach((item) => {
                          item.style.color =
                            selectedColorItem.style.backgroundColor;
                        });
                      }
                    },
                  });
                } else {
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
                        selectedColorItem.style.backgroundColor =
                          item.style.backgroundColor;
                        // Update 17/10/2023
                        // Start check if the color is light or dark
                        checkArrowColorFunction(item);
                        // End check if the color is light or dark
                        sectionParagraph.forEach((item) => {
                          item.style.color =
                            selectedColorItem.style.backgroundColor;
                        });
                      }
                    },
                  });
                }
              });
            });
          }
          // End Paragraph

          // Start General Button
          if (editType == "g-btn") {
            const sectionGBtn = sectionContent.querySelectorAll(
              ".general__section-g-btn"
            );
            const sectionGBtnLi = sectionContent.querySelectorAll(
              ".edit-part .change-edit-part .change-container .section-g-btn-dropdown .menu-colors > li"
            );
            sectionGBtnLi.forEach((item) => {
              item.addEventListener("click", () => {
                sectionMenuColors.classList.remove("active-menu");
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
                      selectedColorItem.style.backgroundColor =
                        item.style.backgroundColor;
                      // Update 17/10/2023
                      // Start check if the color is light or dark
                      checkArrowColorFunction(item);
                      // End check if the color is light or dark
                      sectionGBtn.forEach((item) => {
                        item.style.backgroundColor =
                          selectedColorItem.style.backgroundColor;
                        // Update 18/10/2023
                        // Start check if the color is light or dark
                        checkButtonColorFunction(
                          sectionGBtn,
                          item.style.backgroundColor
                        );
                        // End check if the color is light or dark
                      });
                      // Update Script
                      sectionGBtn.forEach((item) => {
                        item.style.setProperty(
                          "--shadow-hover",
                          `${selectedColorItem.style.backgroundColor}`
                        );
                      });
                    }
                  },
                });
              });
            });
          }
          // End General Button

          // Start Button Bg
          if (editType == "btnBg") {
            const sectionBtnBg = sectionContent.querySelectorAll(
              ".general__section-btnBg"
            );
            const sectionCardSubtitle = sectionContent.querySelectorAll(
              ".general__section-cardSubtitle"
            );
            const sectionBtnBgLi = sectionContent.querySelectorAll(
              ".edit-part .change-edit-part .change-container .section-btnBg-dropdown .menu-colors > li"
            );
            sectionBtnBgLi.forEach((item) => {
              item.addEventListener("click", () => {
                sectionMenuColors.classList.remove("active-menu");
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
                      selectedColorItem.style.backgroundColor =
                        item.style.backgroundColor;
                      if (sectionName == "services-section") {
                        sectionBtnBg.forEach((item) => {
                          item.style.color =
                            selectedColorItem.style.backgroundColor;
                        });
                      } else {
                        // Update 17/10/2023
                        // Start check if the color is light or dark
                        checkArrowColorFunction(item);
                        // End check if the color is light or dark
                        sectionBtnBg.forEach((item) => {
                          item.style.backgroundColor =
                            selectedColorItem.style.backgroundColor;
                          // Update 18/10/2023
                          // Start check if the color is light or dark
                          checkButtonColorFunction(
                            sectionBtnBg,
                            item.style.backgroundColor
                          );
                          // End check if the color is light or dark
                        });
                      }
                      sectionCardSubtitle.forEach((item) => {
                        item.style.color =
                          selectedColorItem.style.backgroundColor;
                      });
                      // Update Script
                      sectionBtnBg.forEach((item) => {
                        item.style.setProperty(
                          "--shadow-hover",
                          `${selectedColorItem.style.backgroundColor}`
                        );
                      });
                    }
                  },
                });
              });
            });
          }
          // End Button Bg

          // Start Bg Color
          if (editType == "bgColor") {
            const sectionBgColor = [sectionContent];
            const sectionBgColorLi = sectionContent.querySelectorAll(
              ".edit-part .change-edit-part .change-container .section-bgColor-dropdown .menu-colors > li"
            );
            sectionBgColorLi.forEach((item) => {
              item.addEventListener("click", () => {
                sectionMenuColors.classList.remove("active-menu");
                if (subPage == "sub-page") {
                  var infos = $(item).data("info").split(",");
                  var data = {
                    websiteId: infos[1],
                    key: infos[2],
                    colorId: infos[0],
                    ColId: infos[4],
                  };
                  $.ajax({
                    url: Base_Url + "/acp/liveupdation/change_page_colors",
                    type: "POST",
                    dataType: "JSON",
                    data: data,
                    success: function (result) {
                      if (result == "1") {
                        selectedColorItem.style.backgroundColor =
                          item.style.backgroundColor;
                        sectionBgColor.forEach((item) => {
                          item.style.backgroundColor =
                            selectedColorItem.style.backgroundColor;
                        });
                      }
                    },
                  });
                } else {
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
                        selectedColorItem.style.backgroundColor =
                          item.style.backgroundColor;
                        // Update 17/10/2023
                        // Start check if the color is light or dark
                        checkArrowColorFunction(item);
                        // End check if the color is light or dark
                        sectionBgColor.forEach((item) => {
                          item.style.backgroundColor =
                            selectedColorItem.style.backgroundColor;
                        });
                      }
                    },
                  });
                }
              });
            });
          }
          // End Bg Color
        });
      });
      // End Color style

      // Update after testing (14/9/2023)
      // Start Bg Image
      const selectImageItem = upperSection.querySelectorAll(
        ".edit-part .change-edit-part .change-container .general-background-image"
      );
      selectImageItem.forEach((item) => {
        item.addEventListener("change", () => {
          const bgLabel = item.parentElement.querySelector(
            ".general-background-label"
          );
          const bgSubPage = upperSection.querySelector(".general-bg-img-page");
          const checkSubPage = bgLabel.dataset.target;
          console.log(checkSubPage);

          if (checkSubPage == "sub-page") {
            var fd = new FormData();
            var files = item.files;
            var mainId = $(item).data("info");

            // Check if a file was selected
            if (files.length > 0) {
              fd.append("Section_Image", files[0]);
              fd.append("websiteId", mainId);

              $.ajax({
                url: Base_Url + "/acp/liveupdation/change_page_bg_img",
                type: "post",
                data: fd,
                contentType: false,
                processData: false,
                success: function (response) {
                  if (response == "1") {
                    bgSubPage.style.backgroundImage =
                      "url(" + URL.createObjectURL(item.files[0]) + ")";
                    bgSubPage.style.backgroundPosition = "center";
                    bgSubPage.style.backgroundRepeat = "no-repeat";
                    bgSubPage.style.backgroundSize = "cover";
                    bgSubPage.style.backgroundAttachment = "fixed";
                    bgLabel.style.backgroundImage =
                      "url(" + URL.createObjectURL(item.files[0]) + ")";
                  }
                },
              });
            }
          } else {
            var fd = new FormData();
            var files = item.files;
            var mainId = $(item).data("info");
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
                    upperSection.style.backgroundImage =
                      "url(" + URL.createObjectURL(item.files[0]) + ")";
                    upperSection.style.backgroundPosition = "center";
                    upperSection.style.backgroundRepeat = "no-repeat";
                    upperSection.style.backgroundSize = "cover";
                    upperSection.style.backgroundAttachment = "fixed";
                    bgLabel.style.backgroundImage =
                      "url(" + URL.createObjectURL(item.files[0]) + ")";
                  }
                },
              });
            }
          }
        });
      });
      // End Bg Image

      // Update after testing (14/9/2023)
      // Start Remove Img
      const selectRemoveBg = upperSection.querySelectorAll(
        ".edit-part .change-edit-part .change-container .general-removeBg-label"
      );
      selectRemoveBg.forEach((item) => {
        item.addEventListener("click", () => {
          const bgLabel = item.parentElement.parentElement.querySelector(
            ".general-background-label"
          );
          const bgSubPage = upperSection.querySelector(".general-bg-img-page");
          const checkSubPage = selectRemoveBg[0].dataset.target;
          if (checkSubPage == "sub-page") {
            var data = {
              mainId: $(item).data("info"),
            };
            console.log(data);
            $.ajax({
              url: Base_Url + "/acp/liveupdation/page_bg_img_remove",
              type: "POST",
              dataType: "JSON",
              data: data,
              success: function (result) {
                if (result == 1) {
                  bgSubPage.style.backgroundImage = "";
                  bgLabel.style.backgroundImage = "";
                }
              },
            });
          } else {
            var data = {
              mainId: $(item).data("info"),
            };
            $.ajax({
              url: Base_Url + "/acp/liveupdation/bg_img_remove",
              type: "POST",
              dataType: "JSON",
              data: data,
              success: function (result) {
                upperSection.style.backgroundImage = "";
                bgLabel.style.backgroundImage = "";
              },
            });
          }
        });
      });
      // End Remove Img

      // Start Change Icon
      const selectLogoItem = upperSection.querySelectorAll(
        ".edit-part .change-edit-part .change-container .general-select-logo"
      );
      selectLogoItem.forEach((item) => {
        item.addEventListener("click", () => {
          const aboutText = document.querySelector(".section .about-text");
          const logoSelectedImg = item.querySelector(".selected-color > img");
          const LogoSelectUl = item.parentElement.querySelector("ul");
          const LogoSelectLi = item.parentElement.querySelectorAll("ul > li");
          const LogoSelectedColor =
            item.parentElement.querySelector(".selected-color");
          const LogoImg = upperSection.querySelector(".general__section-logo");
          LogoSelectUl.classList.toggle("active-menu");
          LogoSelectLi.forEach((item) => {
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
                      case "logo":
                        LogoSelectLi.forEach((item) => {
                          if (item.getAttribute("data-value") == "logo") {
                            LogoImg.parentElement.parentElement.style.display =
                              "flex";
                            LogoImg.src = item.getAttribute("data-src");
                            logoSelectedImg.src = item.getAttribute("data-src");
                            LogoSelectUl.classList.remove("active-menu");
                          }
                        });
                        break;
                      case "off":
                        LogoSelectLi.forEach((item) => {
                          if (item.getAttribute("data-value") == "off") {
                            LogoImg.parentElement.parentElement.style.display =
                              "none";
                            // LogoImg.src = item.getAttribute("data-src");
                            logoSelectedImg.src = item.getAttribute("data-src");
                            LogoSelectUl.classList.remove("active-menu");
                            aboutText.classList.add("padding-active");
                          }
                        });
                        break;
                      case "dark":
                        LogoSelectLi.forEach((item) => {
                          if (item.getAttribute("data-value") == "dark") {
                            LogoImg.parentElement.parentElement.style.display =
                              "flex";
                            LogoImg.src = item.getAttribute("data-src");
                            logoSelectedImg.src = item.getAttribute("data-src");
                            LogoSelectUl.classList.remove("active-menu");
                            aboutText.classList.remove("padding-active");
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
      });
      // End Change Icon
    }
  });
}
// End Edit Sections

// Checking Balance Section Image
document.addEventListener("DOMContentLoaded", function () {
  const balanceSection = document.querySelector(".balance-section");
  const balanceImgElement = document.querySelector(
    ".balance-section .balance-content .img-balance-container"
  );
  const balanceTextElement = document.querySelector(
    ".balance-section .balance-content .balance-text"
  );
  if (balanceSection) {
    if (!balanceImgElement) {
      balanceTextElement.style.maxWidth = "100%";
    }
  }

  // Set Shadow BUtton
  const readMoreBtn = document.querySelectorAll(".general__btn");
  readMoreBtn.forEach((btn) => {
    btn.addEventListener("mouseover", function () {
      btn.style.setProperty("--shadow-hover", `${btn.style.backgroundColor}`);
    });
    btn.style.setProperty("--shadow-hover", `${btn.style.backgroundColor}`);
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
});

// Update (11/10/2023)

//                        ================= Invert Colors ====================

// Start Update 17/10/2023
// Start change the color (When loading the page)
const sectionGBtn = document.querySelectorAll(".general__btn");
const colorsLi = document.querySelectorAll(
  ".edit-part .change-edit-part .menu-colors > li.active-color"
);
colorsLi.forEach((item) => {
  checkArrowColorFunction(item);
});
sectionGBtn.forEach((item) => {
  const buttonItem = item.querySelector("button");
  const itemBg = getComputedStyle(item);
  const colorValuesArray = itemBg["background-color"].match(/\d+/g);
  let darkColorNumber = 0;
  for (let i = 0; i < colorValuesArray.length; i++) {
    if (Number(colorValuesArray[i]) > 128) {
      darkColorNumber++;
    }
  }
  if (darkColorNumber == 3) {
    buttonItem.style.color = "rgba(0, 0, 0, 0.5)";
  } else {
    buttonItem.style.color = "rgba(255, 255, 255, 0.7)";
  }
});
// End change the color (When loading the page)
// Start check if the color is light or dark
// Arrows Color
function checkArrowColorFunction(getItem) {
  const caretItem = getItem.parentElement.parentElement.querySelector(
    ".select-color .caret"
  );
  const colorValuesArray = getItem.style.backgroundColor.match(/\d+/g);
  let darkColorNumber = 0;
  for (let i = 0; i < colorValuesArray.length; i++) {
    if (Number(colorValuesArray[i]) > 128) {
      darkColorNumber++;
    }
  }
  if (darkColorNumber == 3) {
    caretItem.style.color = "rgba(0, 0, 0, 0.5)";
  } else {
    caretItem.style.color = "rgba(255, 255, 255, 0.7)";
  }
}
// Buttons Color
function checkButtonColorFunction(getItem, getBg) {
  getItem.forEach((item) => {
    const buttonItem = item.querySelector("button");
    const colorValuesArray = getBg.match(/\d+/g);
    let darkColorNumber = 0;
    for (let i = 0; i < colorValuesArray.length; i++) {
      if (Number(colorValuesArray[i]) > 128) {
        darkColorNumber++;
      }
    }
    if (darkColorNumber == 3) {
      buttonItem.style.color = "rgba(0, 0, 0, 0.5)";
    } else {
      buttonItem.style.color = "rgba(255, 255, 255, 0.7)";
    }
  });
}
// End check if the color is light or dark
// End Update 17/10/2023

// Start Update 18/10/2023
// Start change the color of copyright and powered by in footer based on the footer background
const footerElement = document.querySelector(".footer");
const footerElementLi = footerElement.querySelectorAll(
  ".edit-part .change-edit-part .change-container .dropdown-colors .menu-colors > li"
);

footerElementLi.forEach((item) => {
  item.addEventListener("click", () => {
    checkFooterColorFunction(footerElement);
  });
});

function checkFooterColorFunction(getItem) {
  const footerElementCopyright = getItem.querySelector(
    ".footer-copyright > h1"
  );
  const footerElementP = getItem.querySelector(".footer-copyright > p");
  const footerElementA = getItem.querySelector(".footer-copyright > p a");
  const colorValuesArray = getItem.style.backgroundColor.match(/\d+/g);
  // console.log(colorValuesArray);
  let darkColorNumber = 0;
  for (let i = 0; i < colorValuesArray.length; i++) {
    if (Number(colorValuesArray[i]) > 128) {
      darkColorNumber++;
    }
  }
  if (darkColorNumber == 3) {
    footerElementCopyright.style.color = "rgba(0, 0, 0, 0.5)";
    footerElementP.style.color = "rgba(0, 0, 0, 0.5)";
    footerElementA.style.color = "rgba(0, 0, 0, 0.5)";
  } else {
    footerElementCopyright.style.color = "rgba(255, 255, 255, 0.7)";
    footerElementP.style.color = "rgba(255, 255, 255, 0.7)";
    footerElementA.style.color = "rgba(255, 255, 255, 0.7)";
  }
}
// End change the color of copyright and powered by in footer based on the footer background
// End Update 18/10/2023

// Start update (30-10-2023)
function checkLinksBgFunction() {
  const headerLinks = document.querySelectorAll(
    ".header nav .header-links .header-link a"
  );
  const activeLinks = document.querySelector(".header nav .header-links");
  if (headerLinks) {
    const colorValuesArray = headerLinks[0].style.color.match(/\d+/g);
    let darkColorNumber = 0;
    for (let i = 0; i < colorValuesArray.length; i++) {
      if (Number(colorValuesArray[i]) > 128) {
        darkColorNumber++;
      }
    }
    if (window.screen.width <= 992) {
      if (darkColorNumber == 3) {
        activeLinks.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
      } else {
        activeLinks.style.backgroundColor = "rgba(255, 255, 255, 0.7)";
      }
    } else {
      activeLinks.style.backgroundColor = "transparent";
    }
  }
}
window.addEventListener("resize", () => {
  checkLinksBgFunction();
});
// End update (30-10-2023)
