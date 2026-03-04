import 'jquery'
import svg4everybody from 'svg4everybody';
import objectFitImages from 'object-fit-images';
import LazyLoad from 'lazyload';

// import '~components/input'
import '~components/hero/hero.js';
import '~components/hero-about/hero-about.js';
import '~components/about-content/about-news.js';
import '~components/header/header.js';
import '~components/form-block/form-block.js';
import '~components/planet/planet.js';
import '~components/trust-slider/trust-slider.js';
import '../scss/style.scss'
import { each } from 'jquery';

$(document).ready(function() {
    // adds SVG External Content support to all browsers
    svg4everybody();

    // Polyfill object-fit/object-position on <img>
    objectFitImages();

    // lazyload
    let images = document.querySelectorAll("img.lazyload");
    new LazyLoad(images);
});

// Ждем загрузки GSAP из CDN
window.addEventListener('load', function() {
    // Проверяем что GSAP и ScrollTrigger доступны
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.error('GSAP или ScrollTrigger не загружены!');
        return;
    }

    console.log('✅ GSAP загружен успешно!');

    // Регистрация плагина ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Проверяем наличие элементов
    const lines = document.querySelectorAll('.features__title .line');
    const cards = document.querySelectorAll('.float-card');

    console.log(`Найдено строк: ${lines.length}`);
    console.log(`Найдено карточек: ${cards.length}`);

    // Устанавливаем начальное состояние элементов - далеко снизу
    gsap.set('.features__title .line', {
        y: 500, // Летят издалека снизу
        opacity: 0
    });

    // Весь блок features прячем снизу
    gsap.set('.features', {
        y: 600, // Весь блок летит издалека снизу
        opacity: 0
    });

    // Блок features__bottom появляется в самом конце
    gsap.set('.features__bottom', {
        y: 40,
        opacity: 0
    });

    console.log('✅ Начальное состояние установлено');

    // 1) Таймлайн появления при скролле: строки → карточки
    const tlIntro = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
            trigger: '.section-features',
            start: 'top 75%', // Начинает когда секция достигает 75% высоты viewport
            end: 'top 25%',
            toggleActions: 'play none none none',
            markers: true, // Для отладки
            once: true, // Анимация только один раз
            onEnter: () => console.log('🎬 Анимация началась!'),
            onLeave: () => console.log('✅ Анимация завершена!')
        }
    });

    console.log('✅ Timeline создан с ScrollTrigger');

    // строки заголовка по очереди снизу вверх - видно как летят
    tlIntro.to('.features__title .line', {
        y: 0,
        opacity: 1,
        duration: 0.8, // Увеличена длительность чтобы видеть полет
        stagger: 0.12, // Задержка между строками
        ease: "power2.out"
    });

    // после строк — весь блок .features прилетает снизу целиком
    tlIntro.to(".features", {
        y: 0,
        opacity: 1,
        duration: 0.85, // Оптимальная длительность
        ease: "power2.out", // Плавное замедление в конце
        force3D: true
    }, "+=0.2"); // Небольшая пауза после текста

    // в самом конце — блок features__bottom появляется снизу
    tlIntro.to(".features__bottom", {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out"
    }, "+=0.25");

    // 2) Магнитный эффект на ховере карточек - карточки притягиваются к курсору
    document.querySelectorAll('.float-card').forEach((el) => {
        const strength = parseFloat(el.dataset.strength || '0.1');

        function move(e) {
            const r = el.getBoundingClientRect();
            const cx = r.left + r.width / 2;
            const cy = r.top + r.height / 2;

            // Расстояние от центра карточки до курсора
            const dx = e.clientX - cx;
            const dy = e.clientY - cy;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Радиус действия магнита (в пикселях)
            const magnetRadius = 250;

            // Если курсор в зоне действия
            if (distance < magnetRadius) {
                // Сила притяжения зависит от расстояния
                const force = (1 - distance / magnetRadius) * strength;
                const pullX = dx * force * 25; // Слабое притягивание
                const pullY = dy * force * 25;

                // Небольшой наклон в сторону курсора
                const tilt = gsap.utils.clamp(-4, 4, (dx * 0.01));

                gsap.to(el, {
                    x: pullX,
                    y: pullY,
                    rotation: tilt,
                    scale: 1.02,
                    duration: 1.2, // Медленное движение
                    ease: "power1.out",
                    overwrite: "auto"
                });
            } else {
                // Возвращаем на место если курсор далеко
                gsap.to(el, {
                    x: 0,
                    y: 0,
                    rotation: 0,
                    scale: 1,
                    duration: 1.0,
                    ease: "power2.out",
                    overwrite: "auto"
                });
            }
        }

        // Слушаем движение мыши глобально для плавающего эффекта
        window.addEventListener('mousemove', move, { passive: true });
    });
});

// Требуется: gsap, ScrollTrigger, Swiper (core/bundle)
gsap.registerPlugin(ScrollTrigger);

// === Константы ===
const HOLD = 10; // сек на слайд (можно менять от 8 до 12)
const EASE = "none";

// === Ини Swiper (без автоплея, без свайпа мышью — управляем сами) ===
const swiper = new Swiper(".services__swiper", {
    slidesPerView: 1,
    allowTouchMove: true, // тач — можно; колесо/скролл — управляет GSAP
    resistanceRatio: 0, // без резинки
    speed: 450, // скорость анимации Swiper при slideTo
});

// === Узлы ===
const section = document.querySelector("#services");
const slides = [...document.querySelectorAll(".services__swiper .swiper-slide")];
const barElements = [...document.querySelectorAll(".service__bar")]; // родительские элементы для класса is-active
const bars = [...document.querySelectorAll(".service__bar-fill")]; // элементы для анимации заполнения
const titleEl = section ? section.querySelector(".service__title") : null;
const descEl = section ? section.querySelector(".service__desc") : null;
const gifDesk = section ? section.querySelector(".device__gif-desktop") : null;
const gifMob = section ? section.querySelector(".device__gif-mobile") : null;

// Проверка наличия элементов
console.log('Services elements:', {
    section,
    slides: slides.length,
    barElements: barElements.length,
    bars: bars.length,
    titleEl,
    descEl,
    gifDesk,
    gifMob
});

// === Вспомогалки ===
function setActive(idx) {
    swiper.slideTo(idx);

    const s = slides[idx];
    if (!s || !s.dataset) return;

    const title = s.dataset.title;
    const desc = s.dataset.desc;
    const dGif = s.dataset.gifDesktop;
    const mGif = s.dataset.gifMobile;

    console.log(`setActive(${idx})`, { title, desc, dGif, mGif });

    // Переключаем класс is-active на прогресс-барах
    barElements.forEach((bar, i) => {
        bar.classList.toggle('is-active', i === idx);
    });

    // Сбрасываем все прогресс-бары кроме текущего
    bars.forEach((bar, i) => {
        if (i !== idx) {
            gsap.set(bar, { scaleY: 0 });
        }
    });

    // Плавная смена текста с fade-эффектом
    if (title && titleEl) {
        gsap.to(titleEl, {
            opacity: 0,
            duration: 0.2,
            onComplete: function() {
                titleEl.textContent = title;
                gsap.to(titleEl, { opacity: 1, duration: 0.3 });
            }
        });
    }
    if (desc && descEl) {
        gsap.to(descEl, {
            opacity: 0,
            duration: 0.2,
            onComplete: function() {
                // Если есть разделитель ||, создаём несколько параграфов
                if (desc.includes('||')) {
                    const paragraphs = desc.split('||').map(p => p.trim());
                    descEl.innerHTML = paragraphs.map(p => '<p>' + p + '</p>').join('');
                } else {
                    descEl.textContent = desc;
                }
                gsap.to(descEl, { opacity: 1, duration: 0.3 });
            }
        });
    }

    // Меняем гифки
    if (dGif && gifDesk) {
        gifDesk.src = dGif;
        console.log('Desktop gif changed to:', dGif);
    }
    if (mGif && gifMob) {
        gifMob.src = mGif;
        console.log('Mobile gif changed to:', mGif);
    }
}

// === Главный TL: длительность = HOLD * slidesCount (сек), пинится на 100vh ===
// Каждому слайду даём «сегмент» HOLD сек. В сегменте:
//  - растёт прогресс-бар слева
//  - по достижении сегмента — смена активного слайда/гифки
const totalDur = HOLD * slides.length;
const tl = gsap.timeline({ paused: true });

slides.forEach((_, i) => {
    const startTime = tl.duration();

    // Смена контента в НАЧАЛЕ сегмента
    tl.call(() => setActive(i), null, startTime);

    // Прогресс-бар заполняется снизу вверх в течение HOLD секунд
    tl.fromTo(bars[i], { scaleY: 0 }, { scaleY: 1, duration: HOLD, ease: EASE }, startTime);
});

// ScrollTrigger: пиним секцию; скрабим таймлайн
const st = ScrollTrigger.create({
    trigger: section,
    start: "top top",
    end: () => "+=" + (window.innerHeight * slides.length), // по 100vh на слайд
    pin: true,
    scrub: 1,
    onUpdate: self => {
        // Если автоплей активен, пропускаем обновление
        if (isAutoplayActive) return;

        // переводим прогресс ST (0..1) в время TL
        const t = self.progress * totalDur;
        tl.time(t);

        // любое движение скролла пользователем — стоп автоплей и перезапуск таймера
        stopAutoplayDebounced();
    },
    onEnter: startAutoplay,
    onEnterBack: startAutoplay,
    onLeave: stopAutoplay,
    onLeaveBack: stopAutoplay,
});

// === Автоплей, когда пользователь не скроллит ===
let ap; // gsap tween, который «течёт» по tl.time()
let apTimer; // перезапуск с задержкой после скролла
let isAutoplayActive = false; // флаг для отслеживания автоплея

function startAutoplay() {
    killAutoplay();
    isAutoplayActive = true;
    console.log('🎬 Autoplay started from time:', tl.time().toFixed(2), 'sec, duration:', totalDur, 'sec');

    ap = gsap.to(tl, {
        time: totalDur,
        duration: (totalDur - tl.time()),
        ease: "linear",
        onUpdate: () => {
            // Синхронизируем позицию скролла с таймлайном
            const scrollPos = st.start + (tl.time() / totalDur) * (st.end - st.start);
            window.scrollTo(0, scrollPos);
        },
        onComplete: () => {
            isAutoplayActive = false;
            console.log('✅ Autoplay completed');
        }
    });
}

function killAutoplay() {
    if (ap) ap.kill();
    ap = null;
    isAutoplayActive = false;
}

function stopAutoplay() {
    console.log('⏸️ Autoplay stopped');
    killAutoplay();
    clearTimeout(apTimer);
}

function stopAutoplayDebounced() {
    killAutoplay();
    clearTimeout(apTimer);
    apTimer = setTimeout(() => {
        // если секция видна и пользователь отпустил скролл — вновь запускаем
        if (ScrollTrigger.isInViewport(section, 0.3)) {
            console.log('⏯️ Autoplay resumed after scroll pause');
            startAutoplay();
        }
    }, 600); // небольшая задержка после прокрутки
}

// === Клики по прогресс-барам (ручная навигация) ===
barElements.forEach((el, i) => {
    el.addEventListener("click", () => {
        const targetTime = i * HOLD + 0.001;
        setActive(i); // Сразу делаем бар активным
        gsap.to(tl, { time: targetTime, duration: 0.45, ease: "power2.out" });
        stopAutoplayDebounced();
    });
});

// === Предзагрузка гифов (чтобы без «мигания» при первой смене) ===
slides.forEach(s => {
    const d = s.dataset.gifDesktop,
        m = s.dataset.gifMobile;
    if (d) {
        const img = new Image();
        img.src = d;
    }
    if (m) {
        const img = new Image();
        img.src = m;
    }
});

// === Обработка ручного скролла пользователя ===
let userScrollTimeout;
window.addEventListener('wheel', () => {
    if (isAutoplayActive && ScrollTrigger.isInViewport(section, 0.1)) {
        clearTimeout(userScrollTimeout);
        userScrollTimeout = setTimeout(() => {
            stopAutoplayDebounced();
        }, 50);
    }
}, { passive: true });

window.addEventListener('touchmove', () => {
    if (isAutoplayActive && ScrollTrigger.isInViewport(section, 0.1)) {
        stopAutoplayDebounced();
    }
}, { passive: true });

// Стартовое состояние
gsap.set(bars, { transformOrigin: "top center", scaleY: 0 });
setActive(0); // Установит первый бар как активный

// Автоплей запустится автоматически через ScrollTrigger (onEnter)
// Но если секция уже видна при загрузке, запускаем вручную
if (ScrollTrigger.isInViewport(section, 0.3)) {
    startAutoplay();
}