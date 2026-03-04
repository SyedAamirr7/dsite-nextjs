// Start add dns
const dnsContent = document.querySelectorAll(".card #dnsContent .form-group");
const dnsName = document.querySelector(".card #dnsContent .form-group.ALL-srv");
const dnsSelect = document.querySelector(".card .dns-type-dropdown select");

dnsSelect.addEventListener("change", () => {
  const selectValue = dnsSelect.value;

  dnsContent.forEach((dns) => {
    const checkClass = dns.classList.contains(`${selectValue}-srv`);

    if (checkClass) {
      dns.classList.remove("d-none");
    } else {
      dns.classList.add("d-none");
    }
  });
  dnsName.classList.remove("d-none");
});
// End add dns
