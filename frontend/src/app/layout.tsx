import type { Metadata } from "next";
import localFont from "next/font/local";
import Providers from "@/components/Providers";
import "./globals.css";

const dinNextRegular = localFont({
  src: "../../public/assets/fonts/DINNextLTArabic-Regular.ttf",
  variable: "--font-din-regular",
  weight: "400",
  display: "optional",
});

const dinNextBold = localFont({
  src: "../../public/assets/fonts/DINNextLTArabic-Bold.ttf",
  variable: "--font-din-bold",
  weight: "700",
  display: "optional",
});

const dinNextLight = localFont({
  src: "../../public/assets/fonts/DINNEXTLTARABIC-LIGHT.ttf",
  variable: "--font-din-light",
  weight: "300",
  display: "optional",
  preload: false,
});

const dinNextMedium = localFont({
  src: "../../public/assets/fonts/DINNextLTArabic-Medium.ttf",
  variable: "--font-din-medium",
  weight: "500",
  display: "optional",
  preload: false,
});

const dinNextBlack = localFont({
  src: "../../public/assets/fonts/DINNextLTArabic-Black.ttf",
  variable: "--font-din-black",
  weight: "900",
  display: "optional",
  preload: false,
});

export const metadata: Metadata = {
  title: "Home - Control Dashboard",
  description: "Site Control Panel Dashboard",
  icons: {
    icon: "/assets/img/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" data-dir="ltr" suppressHydrationWarning>
      <body
        className={`${dinNextRegular.variable} ${dinNextBold.variable} ${dinNextLight.variable} ${dinNextMedium.variable} ${dinNextBlack.variable} antialiased`}
        suppressHydrationWarning
      >
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var p=window.location.pathname;try{var d=localStorage.getItem("isDarkMode");var dark=d==="true";document.documentElement.setAttribute("data-dark-mode",dark?"true":"false");if(dark&&p!=="/acp/login")document.body.classList.add("dark");var loc=localStorage.getItem("app-locale");if(loc==="ar"||loc==="en"){document.documentElement.setAttribute("data-locale",loc);document.documentElement.setAttribute("dir",loc==="ar"?"rtl":"ltr");document.documentElement.setAttribute("lang",loc);}else{document.documentElement.setAttribute("data-locale","en");}}catch(e){document.documentElement.setAttribute("data-dark-mode","false");document.documentElement.setAttribute("data-locale","en");}})();`,
          }}
        />
        <link rel="stylesheet" href="/assets/css/bootstrap.css" />
        <link rel="stylesheet" href="/assets/css/custom.css" />
        <link rel="stylesheet" href="/assets/css/update-custom.css" />
        <link rel="stylesheet" href="/assets/css/responsive.css" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){if("scrollRestoration"in history)history.scrollRestoration="manual";var p=window.location.pathname;if(p!=="/acp/login"){window.scrollTo(0,0);window.addEventListener("load",function(){if(window.location.pathname!=="/acp/login")window.scrollTo(0,0);});}});})();`,
          }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
