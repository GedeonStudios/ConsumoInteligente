import Scrollbar from 'smooth-scrollbar';
import { ScrollbarPlugin } from 'smooth-scrollbar';

const header_menu = document.querySelector('.header-menu'),
    not_loaded_class = 'not-loaded',
    home = document.getElementById('faq'),
    lde = document.querySelector('.loader'),
    ct = document.querySelector('.page-wrapper');
var scrollbar

function is_touch_enabled() {
    return ('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0);
}

class ScaleSpeedPlugin extends ScrollbarPlugin {
    static pluginName = 'scaleSpeed';

    static defaultOptions = {
        speed: 1,
    };

    transformDelta(delta) {
        const { speed } = this.options;

        return {
            x: delta.x * speed,
            y: delta.y * speed,
        };
    }
}

Scrollbar.use(ScaleSpeedPlugin);

function LoadMianPage(LoadElemt, ContentElemt) {
    if (!LoadElemt) {
        return console.error('Parámetros no válidos.');
    }

    LoadElemt.classList.add('loaded');

    setTimeout(() => {
        if (ContentElemt) {
            LoadElemt.style.display = 'none';
            ContentElemt.style.display = 'block';
        }

        if (!header_menu.classList.contains(not_loaded_class)) {
            console.error(`El elemento ${header_menu} no tiene la clase de pre-carga: ${not_loaded_class}`);
        } else {
            header_menu.classList.remove(not_loaded_class);
        }
    }, 500);
}

document.addEventListener('DOMContentLoaded', () => {
    LoadMianPage(lde, ct)

    scrollbar = Scrollbar.init(home, {
        alwaysShowTracks: true,
        damping: 0.07,
        plugins: {
            scaleSpeed: {
                speed: .95,
            },
        },
    });


    if (is_touch_enabled()) {
        document.querySelector('body').classList.add('IsTouch')
        document.querySelector('.page-wrapper').classList.add('IsTouch')
    }

});

