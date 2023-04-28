const header_menu = document.querySelector(".header-menu"),
  not_loaded_class = "not-loaded",
  reloj = document.querySelector(".present_relej"),
  home = document.querySelector("#home"),
  lde = document.querySelector(".loader"),
  hi = document.querySelector(".home_intro"),
  ht = document.querySelector(".home_text"),
  ct = document.querySelector(".page-content");
var scrollbar = window.Scrollbar;

function is_touch_enabled() {
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
}

function LoadMianPage(LoadElemt, IntroFrame, ContentElemt) {
  if (!LoadElemt) {
    return console.error("Parámetros no válidos.");
  }

  LoadElemt.classList.add("loaded");

  setTimeout(() => {
    if (IntroFrame && ContentElemt) {
      IntroFrame.classList.add("intro");
      LoadElemt.style.display = "none";
      ContentElemt.style.display = "block";
    }

    setTimeout(() => {
      if (!header_menu.classList.contains(not_loaded_class)) {
        console.error(
          `El elemento ${header_menu} no tiene la clase de pre-carga: ${not_loaded_class}`
        );
      } else {
        header_menu.classList.remove(not_loaded_class);
        ht.classList.add("fadeAnim");
      }
    }, 500);
  }, 500);
}

function GaspAnimtionLoad(scroll, istouch) {
  const elements = {
    createText: document.querySelector(".create_text"),
    createCoins: document.querySelector(".create_coins"),
    createFooter: document.querySelector(".create_footer"),
    textsFlex: document.querySelector(".texts_flex"),
    easyText: document.querySelector(".easy_text_block"),
  };

  const y = scroll.y;

  if (istouch) {
    Object.values(elements).forEach((el) =>
      el.classList.add("InAnim", "fadeAnim")
    );
    return;
  }

  const isScrollThan = (value) => y >= value;
  const isHeightThan = (value) => window.outerHeight > value;

  if (isScrollThan(430)) {
    elements.createText.classList.add("InAnim");
    elements.createCoins.classList.add("InAnim");

    if (isHeightThan(999) && isScrollThan(1000)) {
      console.log(scroll.y, '+900');
      elements.createFooter.classList.add("fadeAnim");
      elements.textsFlex.classList.add("fadeAnim");

      if (isScrollThan(1730)) {
        elements.easyText.classList.add("fadeAnim");

        if (isScrollThan(3800) && !isScrollThan(4690)) {
          header_menu.classList.add("black");
        } else {
          header_menu.classList.remove("black");
        }
      }
    } else if (isScrollThan(1050) && isHeightThan(600) && !isHeightThan(700)) {
      console.log(scroll.y, '-700');
      elements.textsFlex.classList.add("fadeAnim");
      elements.createFooter.classList.add("fadeAnim");
      if (isScrollThan(1600)) {
        elements.easyText.classList.add("fadeAnim");
      }
      if (isScrollThan(3300) && !isScrollThan(4200)) {
        console.log(scroll.y);
        header_menu.classList.add("black");
      } else {
        header_menu.classList.remove("black");
      }
      
    } else if (isScrollThan(760) && !isHeightThan(900) && isHeightThan(780)) {
      console.log(scroll.y, '+780');
      elements.createFooter.classList.add("fadeAnim");
      elements.textsFlex.classList.add("fadeAnim");

      if (isScrollThan(1100)) {
        elements.easyText.classList.add("fadeAnim");

        if (isScrollThan(2160) && !isScrollThan(2700)) {
          header_menu.classList.add("black");
        } else {
          header_menu.classList.remove("black");
        }
      }
    } else if (isScrollThan(1100) && isHeightThan(700) && !isHeightThan(760)) {
      elements.easyText.classList.add("fadeAnim");

      if (isScrollThan(2479) && !isScrollThan(3090)) {
        header_menu.classList.add("black");
      } else {
        header_menu.classList.remove("black");
      }
    } else if (isScrollThan(1050) && isHeightThan(900) && !isHeightThan(999)) {
      console.log(scroll.y, '+900');
      elements.textsFlex.classList.add("fadeAnim");
      elements.createFooter.classList.add("fadeAnim");
      if (isScrollThan(1600)) {
        elements.easyText.classList.add("fadeAnim");
      }
      if (isScrollThan(3300) && !isScrollThan(4200)) {
        header_menu.classList.add("black");
      } else {
        header_menu.classList.remove("black");
      }
    }
  } else if (!isScrollThan(130)) {
    Object.values(elements).forEach((el) =>
      el.classList.remove("InAnim", "fadeAnim")
    );
  }
}

function hover(element, backgroundElement, className) {
  if (element) {
    element.addEventListener("mouseenter", () => {
      backgroundElement.classList.add(className);
    });

    element.addEventListener("mouseleave", () => {
      backgroundElement.classList.remove(className);
    });
  }
}

hover(reloj, home, "cls");

setInterval(() => {
  const dayElement = document.querySelector(".d");
  const hourElement = document.querySelector(".h");
  const minuteElement = document.querySelector(".m");
  const secondElement = document.querySelector(".s");
  const currentDate = new Date();
  const targetDate = new Date("2023 july 01 00:00:00 GMT-0400");

  const diffInMilliseconds = Math.floor(targetDate - currentDate);
  const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
  const days = Math.floor(diffInSeconds / (60 * 60 * 24));
  const hours = Math.floor((diffInSeconds / (60 * 60)) % 24);
  const minutes = Math.floor(diffInSeconds / 60) % 60;
  const seconds = Math.floor(diffInSeconds) % 60;

  dayElement.innerText = days;
  hourElement.innerText = hours;
  minuteElement.innerText = minutes;
  secondElement.innerText = seconds;
}, 1000);

document.addEventListener("DOMContentLoaded", () => {
  LoadMianPage(lde, hi, ct);

  scrollbar = Scrollbar.init(home, {
    alwaysShowTracks: true,
    damping: 0.07,
  });

  if (is_touch_enabled()) {
    document.querySelector("body").classList.add("IsTouch");
    document.querySelector(".page-content").classList.add("IsTouch");
    document.querySelector(".page-wrapper").classList.add("IsTouch");
  }

  scrollbar.addListener(({ offset }) => {
    GaspAnimtionLoad(offset, is_touch_enabled());
  });
});
