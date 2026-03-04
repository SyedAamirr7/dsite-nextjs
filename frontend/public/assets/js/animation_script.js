// Animation script

// About Section
const aboutSection = document.querySelector(".about-section");
const aboutNumbers = document.querySelectorAll(
  ".about-section .about-content .about-statistics .statistic h1"
);
let started = false; // Function started?? No

// Services Section
const serviceSectionAnimation = document.querySelector(".services-section");
const serviceCardAnimation = document.querySelectorAll(
  ".services-section .services-content .cards .card"
);

// Products Section
const productSectionAnimation = document.querySelector(".products-section");
const productCardAnimation = document.querySelectorAll(
  ".products-section .cards .card"
);

// Projects Section
const projectSectionAnimation = document.querySelector(".projects-section");
const projectCardAnimation = document.querySelectorAll(
  ".projects-section .cards .card"
);

// Portfolios Section
const portfolioSectionAnimation = document.querySelector(".portfolios-section");
const portfolioCardAnimation = document.querySelectorAll(
  ".portfolios-section .cards .card"
);

// Portfolios Section
const newsSectionAnimation = document.querySelector(".news-section");
const newsCardAnimation = document.querySelectorAll(
  ".news-section .cards .card"
);

// Branches Section
const branchesSectionAnimation = document.querySelector(".branches-section");
const branchesCardAnimation = document.querySelectorAll(
  ".branches-section .branch"
);

// Gallery Section
const gallerySectionAnimation = document.querySelector(".gallery-section");
const galleryCardAnimation = document.querySelectorAll(
  ".gallery-section .cards .card"
);

// Clients Section
const clientsSectionAnimation = document.querySelector(".clients-section");
const clientsCardAnimation = document.querySelectorAll(
  ".clients-section .cards .card"
);

// Team Section
const teamSectionAnimation = document.querySelector(".team-section");
const teamCardAnimation = document.querySelectorAll(".team-section .team-card");

// update restaurant
// Restaurant Section
const restSectionAnimation = document.querySelector(".findRestaurant-section");
const restCardAnimation = document.querySelectorAll(
  ".findRestaurant-section .cards .card"
);

// Partners Section
const partnersSectionAnimation = document.querySelector(".partners-section");
const partnersCardAnimation = document.querySelectorAll(
  ".partners-section .cards .card"
);

// Plans Section
const plansSectionAnimation = document.querySelector(".plans-section");
const plansCardAnimation = document.querySelectorAll(
  ".plans-section .cards .card"
);

window.onscroll = function () {
  if (teamSectionAnimation) {
    if (window.scrollY >= teamSectionAnimation.offsetTop - 500) {
      teamCardAnimation.forEach((item) => {
        item.classList.add("active");
      });
    }
  }
  // update restaurant
  if (restSectionAnimation) {
    if (window.scrollY >= restSectionAnimation.offsetTop - 500) {
      restCardAnimation.forEach((item) => {
        item.classList.add("active");
      });
    }
  }

  if (serviceSectionAnimation) {
    if (window.scrollY >= serviceSectionAnimation.offsetTop - 500) {
      serviceCardAnimation.forEach((item) => {
        item.classList.add("active");
      });
    }
  }

  if (productSectionAnimation) {
    if (window.scrollY >= productSectionAnimation.offsetTop - 500) {
      productCardAnimation.forEach((item) => {
        item.classList.add("active");
      });
    }
  }

  if (projectSectionAnimation) {
    if (window.scrollY >= projectSectionAnimation.offsetTop - 500) {
      projectCardAnimation.forEach((item) => {
        item.classList.add("active");
      });
    }
  }

  if (portfolioSectionAnimation) {
    if (window.scrollY >= portfolioSectionAnimation.offsetTop - 500) {
      portfolioCardAnimation.forEach((item) => {
        item.classList.add("active");
      });
    }
  }

  if (newsSectionAnimation) {
    if (window.scrollY >= newsSectionAnimation.offsetTop - 500) {
      newsCardAnimation.forEach((item) => {
        item.classList.add("active");
      });
    }
  }

  if (branchesSectionAnimation) {
    if (window.scrollY >= branchesSectionAnimation.offsetTop - 500) {
      branchesCardAnimation.forEach((item) => {
        item.classList.add("active");
      });
    }
  }

  if (gallerySectionAnimation) {
    if (window.scrollY >= gallerySectionAnimation.offsetTop - 500) {
      galleryCardAnimation.forEach((item) => {
        item.classList.add("active");
      });
    }
  }

  if (clientsSectionAnimation) {
    if (window.scrollY >= clientsSectionAnimation.offsetTop - 500) {
      clientsCardAnimation.forEach((item) => {
        item.classList.add("active");
      });
    }
  }

  if (partnersSectionAnimation) {
    if (window.scrollY >= partnersSectionAnimation.offsetTop - 500) {
      partnersCardAnimation.forEach((item) => {
        item.classList.add("active");
      });
    }
  }

  if (plansSectionAnimation) {
    if (window.scrollY >= plansSectionAnimation.offsetTop - 500) {
      plansCardAnimation.forEach((item) => {
        item.classList.add("active");
      });
    }
  }

  if (aboutSection) {
    // Start Count Numbers In About Section
    if (window.scrollY >= aboutSection.offsetTop - 500) {
      if (!started) {
        startCount(aboutNumbers);
      }
      started = true;
    }
    // End Count Numbers In About Section
  }
};

function startCount(counters) {
  counters.forEach((counter) => {
    if (counter.dataset.count) {
      let counterValue = counter.dataset.count.match(/\d/g).join("");
      let nonCounterValue = counter.dataset.count.match(/[^\d]/g);
      var odObject = new Odometer({
        el: counter,
        value: 0,
        format: "(,ddd)",
      });
      var counterInterval = setInterval(function () {
        if (odObject.value >= counterValue) {
          clearInterval(counterInterval);
        } else {
          odObject.update(odObject.value + counterValue);
        }
      }, 0);
      if (nonCounterValue != null) {
        if (nonCounterValue.includes("+")) {
          counter.previousElementSibling.innerHTML = "+";
          nonCounterValue.splice(nonCounterValue.indexOf("+"), 1);
        }
        counter.nextElementSibling.innerHTML = nonCounterValue.join("");
      }
    }
  });
}
