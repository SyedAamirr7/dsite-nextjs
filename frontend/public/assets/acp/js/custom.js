function readURL(e, a) {
  if (e.files && e.files[0]) {
    var t = new FileReader();
    (t.onload = function (e) {
      $("." + a)
        .attr("src", e.target.result)
        .addClass("img-fluid");
    }),
      t.readAsDataURL(e.files[0]);
  }
}
function getLanguageFromUrl(e) {
  let a = e.split("/");
  return (a.length >= 2 && a[3]) || "en";
}
$(function () {
  function e() {
    $(window).width() > 1024
      ? ($("#wrapper").addClass("toggled"),
        $(".main-navbar .head .menu-toggle").addClass("d-none"))
      : ($("#wrapper").removeClass("toggled"),
        $(".main-navbar .head .menu-toggle").removeClass("d-none"));
  }
  $(".menu-toggle").click(function (e) {
    e.preventDefault(), $("#wrapper").toggleClass("toggled");
  }),
    $(window).resize(function (a) {
      e();
    }),
    e();
}),
  $(".scroll-to-top").click(function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }),
  (function () {
    "use strict";
    var e = $("html").data("dir");
    if (
      (window.addEventListener(
        "load",
        function () {
          var e = document.getElementsByClassName("needs-validation");
          Array.prototype.filter.call(e, function (e) {
            e.addEventListener(
              "submit",
              function (a) {
                !1 === e.checkValidity() &&
                  (a.preventDefault(), a.stopPropagation()),
                  e.classList.add("was-validated");
              },
              !1
            );
          });
        },
        !1
      ),
      $('[data-toggle="tooltip"]').tooltip(),
      $('[data-toggle="popover"]').popover(),
      $("body").on("click", function (e) {
        $('[data-toggle="popover"]').each(function () {
          $(this).is(e.target) ||
            0 !== $(this).has(e.target).length ||
            0 !== $(".popover").has(e.target).length ||
            $(this).popover("hide");
        });
      }),
      $(".tagsinput").tagsinput({ confirmKeys: [13, 188] }),
      $(".bootstrap-tagsinput input").keydown(function (e) {
        if (13 == e.which) return $(this).blur(), $(this).focus(), !1;
      }),
      $("select").selectpicker(),
      "rtl" == e)
    )
      var a = "ar";
    else var a = "en";
    $(".date-picker").datepicker({
      format: "yyyy-mm-dd",
      language: a,
      autoclose: !0,
    }),
      (toastr.options = {
        closeButton: !1,
        debug: !1,
        newestOnTop: !1,
        progressBar: !1,
        positionClass: "toast-top-left",
        preventDuplicates: !1,
        onclick: null,
        showDuration: "300",
        hideDuration: "1000",
        timeOut: "5000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      }),
      $(document).ready(function () {
        if ("rtl" == e)
          var a =
            "https://cdn.datatables.net/plug-ins/1.10.25/i18n/Arabic.json";
        else var a = "";
        $("#table").DataTable({
          searching: !0,
          info: !1,
          orderd: !1,
          responsive: !0,
          oLanguage: { sUrl: a },
        });
      });
  })();
  const planType = document.querySelectorAll(
    ".plan_type .plan_type-system"
  );
  const planPriceMonthly = document.querySelectorAll(
    ".plan_card .plan_monthly"
  );
  const planPriceAnnually = document.querySelectorAll(
    ".plan_card .plan_annually"
  );
  const getStartedButtons = document.querySelectorAll(".submit-plan");
  planType && planType.forEach((plan) => {
    plan.addEventListener("click", () => {
      planType.forEach((item) => {
        item.classList.remove("active");
      });
      plan.classList.add("active");

      const selectedPlan = plan.dataset.system;

      if (plan.dataset.system == "annually") {
        planPriceMonthly.forEach((month) => {
          month.classList.remove("active");
        });
        planPriceAnnually.forEach((year) => {
          year.classList.add("active");
        });
      } else {
        planPriceMonthly.forEach((month) => {
          month.classList.add("active");
        });
        planPriceAnnually.forEach((year) => {
          year.classList.remove("active");
        });
      }
     // Update the "Get Started" buttons' URLs with the encrypted plan type
     const selectedPlanValue = document.getElementById(selectedPlan).value;
     getStartedButtons.forEach((button) => {
       let currentHref = button.getAttribute("href");

       // Split the URL by '/' and remove the last part (encrypted value)
       const urlParts = currentHref.split('/');
       urlParts.pop(); // Remove last part of the URL (encrypted value)

       // Append the new encrypted plan type value
       const newHref = `${urlParts.join('/')}/${selectedPlanValue}`;
       button.setAttribute("href", newHref);
     });
    });
  });