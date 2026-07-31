import 'jquery'

window.$ = $;
window.jQuery = jQuery;
import svg4everybody from 'svg4everybody';
import objectFitImages from 'object-fit-images';
import LazyLoad from 'lazyload';

// import '~components/input'
import '~components/hero/hero.js';
import '~components/hero-about/hero-about.js';
import '~components/about-content/about-news.js';
import '~components/header/header.js';
import '~components/popup/popup.js';
import '~components/site-popups/site-popups.js';
import '~components/form-block/form-block.js';
import '~components/create-account-form/create-account-form.js';
import '~components/login-form/login-form.js';
import '~components/password-recovery-popup/password-recovery-popup.js';
import '~components/news-page/news-page.js';
import '~components/market/market.js';
import '~components/planet/planet.js';
import '~components/trust-slider/trust-slider.js';
import '~components/training-page/training-page.js';
import '~components/training-course-page/training-course-page.js';
import '~components/lesson-page/lesson-page.js';
import '~components/lk-page/lk-page.js';
import initServicesCatalog from '~components/services/services.js';
import initTariffsTabs from '~components/tariffs/tariffs.js';
import initDisclosurePage from '~components/disclosure-page/disclosure-page.js';
import initContentToc from '~components/content-page/content-page.js';
import initProductTrust from '~components/product-trust/product-trust.js';
import '../scss/style.scss'
import { each } from 'jquery';

function updateDynamicViewport() {
    const viewport = document.getElementById('dynamicViewport');
    if (!viewport) return;

    const width = window.innerWidth || document.documentElement.clientWidth;
    const content = width < 768
        ? 'width=375, user-scalable=no'
        : 'width=device-width, initial-scale=1';

    viewport.setAttribute('content', content);
}

updateDynamicViewport();
window.addEventListener('resize', updateDynamicViewport);
window.addEventListener('orientationchange', updateDynamicViewport);

document.addEventListener('rioni:open-create-account', function () {
    $.magnificPopup.close();
    setTimeout(function () {
        $.magnificPopup.open({
            items: { src: '#create-account-form' },
            type: 'inline',
            mainClass: 'mfp-zoom-in',
            closeMarkup: '<button title="Закрыть" type="button" class="mfp-close popup__close"></button>',
            removalDelay: 500
        });
    }, 600);
});

$(document).ready(function() {
    // adds SVG External Content support to all browsers
    svg4everybody();

    // Polyfill object-fit/object-position on <img>
    objectFitImages();

    // lazyload
    let images = document.querySelectorAll("img.lazyload");
    new LazyLoad(images);

    initServicesCatalog();
    initTariffsTabs();
    initDisclosurePage();
    initContentToc();
    initProductTrust();
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
    const featuresSection = document.querySelector('.section-features');
    const lines = document.querySelectorAll('.features__title--desktop .line');
    const cards = document.querySelectorAll('.float-card');
    if (!featuresSection) {
        return;
    }

    if (window.matchMedia('(max-width: 768px)').matches) {
        gsap.set('.features, .features__bottom, .float-card', {
            clearProps: 'all'
        });

        gsap.set('.features__title--mobile .line', {
            y: 120,
            opacity: 0
        });

        gsap.timeline({
            defaults: { ease: "power2.out" },
            scrollTrigger: {
                trigger: '.section-features',
                start: 'top 75%',
                end: 'top 35%',
                toggleActions: 'play none none none',
                once: true,
                markers: false
            }
        }).to('.features__title--mobile .line', {
            y: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.08
        });

        return;
    }

    console.log(`Найдено строк: ${lines.length}`);
    console.log(`Найдено карточек: ${cards.length}`);

    // Устанавливаем начальное состояние элементов - далеко снизу
    gsap.set('.features__title--desktop .line', {
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
            markers: false,
            once: true, // Анимация только один раз
            onEnter: () => console.log('🎬 Анимация началась!'),
            onLeave: () => console.log('✅ Анимация завершена!')
        }
    });

    console.log('✅ Timeline создан с ScrollTrigger');

    // строки заголовка по очереди снизу вверх - видно как летят
    tlIntro.to('.features__title--desktop .line', {
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

// Секция #services (слайдер с прогресс-барами)
(function initServicesSection() {
    const section = document.querySelector("#services");
    const slides = [...document.querySelectorAll(".services__swiper .swiper-slide")];
    if (!section || slides.length === 0) return;

    const HOLD = 5; // сек на слайд
    const EASE = "none";
    const SECTION_SERVICES_MAX_HEIGHT_PX = 832;
    const AUTOPLAY_RESUME_DELAY = 600;

    const swiper = new Swiper(".services__swiper", {
        slidesPerView: 1,
        allowTouchMove: true,
        resistanceRatio: 0,
        speed: 450,
    });

    const barElements = [...document.querySelectorAll(".service__bar")];
    const bars = [...document.querySelectorAll(".service__bar-fill")];
    const titleEl = section.querySelector(".service__title");
    const descEl = section.querySelector(".service__desc");
    const gifDesk = section.querySelector(".device__gif-desktop");
    const gifMob = section.querySelector(".device__gif-mobile");

// === Вспомогалки ===
function setActive(idx) {
    swiper.slideTo(idx, 0);

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
            gsap.set(bar, { height: '0%' });
        }
    });

    gsap.killTweensOf([titleEl, descEl].filter(Boolean));

    // Смена текста должна быть атомарной: при быстром скролле отдельные fade-твины
    // успевают рассинхронизировать заголовок и описание.
    if (title && titleEl) {
        titleEl.textContent = title;
        gsap.set(titleEl, { opacity: 1 });
    }
    if (desc && descEl) {
        // Если есть разделитель ||, создаём несколько параграфов
        if (desc.includes('||')) {
            const paragraphs = desc.split('||').map(p => p.trim());
            descEl.innerHTML = paragraphs.map(p => '<p>' + p + '</p>').join('');
        } else {
            descEl.textContent = desc;
        }
        gsap.set(descEl, { opacity: 1 });
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

// === Главный TL: длительность = HOLD * slidesCount (сек), пинится на макс. 832px на слайд ===
// Каждому слайду даём «сегмент» HOLD сек. В сегменте:
//  - растёт прогресс-бар слева
//  - по достижении сегмента — смена активного слайда/гифки
const totalDur = HOLD * slides.length;
const tl = gsap.timeline({ paused: true });
let renderedServiceIndex = -1;

// Timeline используется только как шкала времени. Процент fill вычисляем напрямую:
// вложенный height-tween нестабильно обновлялся после Bitrix-склейки JS.
tl.to({}, { duration: totalDur, ease: EASE });

function renderServicesAt(time) {
    const clampedTime = gsap.utils.clamp(0, totalDur, time);
    const index = Math.min(slides.length - 1, Math.floor(clampedTime / HOLD));
    const segmentStart = index * HOLD;
    const segmentProgress = clampedTime >= totalDur
        ? 1
        : gsap.utils.clamp(0, 1, (clampedTime - segmentStart) / HOLD);

    if (index !== renderedServiceIndex) {
        setActive(index);
        renderedServiceIndex = index;
    }

    bars.forEach((bar, barIndex) => {
        gsap.set(bar, { height: barIndex === index ? `${segmentProgress * 100}%` : '0%' });
    });
}

// Высота зоны пина: макс. 832px (на маленьких экранах — по вьюпорту)
const sectionServicesPinHeight = () => Math.min(SECTION_SERVICES_MAX_HEIGHT_PX, window.innerHeight) * slides.length;

// === Автоплей, когда пользователь дошел до pinned-зоны ===
let ap; // gsap tween, который «течёт» по tl.time()
let apTimer; // перезапуск с задержкой после скролла
let isAutoplayActive = false; // флаг для отслеживания автоплея

// ScrollTrigger: пиним секцию; скрабим таймлайн
const st = ScrollTrigger.create({
    trigger: section,
    start: "top top",
    end: () => "+=" + sectionServicesPinHeight(),
    pin: true,
    scrub: true,
    onUpdate: self => {
        // Если автоплей активен, пропускаем обновление
        if (isAutoplayActive) return;

        // переводим прогресс ST (0..1) в время TL
        const t = self.progress * totalDur;
        tl.time(t);
        renderServicesAt(t);

        // любое движение скролла пользователем — стоп автоплей и перезапуск таймера
        stopAutoplayDebounced();
    },
    onEnter: startAutoplay,
    onEnterBack: stopAutoplay,
    onLeave: stopAutoplay,
    onLeaveBack: stopAutoplay,
});

function startAutoplay() {
    killAutoplay();
    isAutoplayActive = true;
    console.log('🎬 Autoplay started from time:', tl.time().toFixed(2), 'sec, duration:', totalDur, 'sec');

    ap = gsap.to(tl, {
        time: totalDur,
        duration: (totalDur - tl.time()),
        ease: "linear",
        onUpdate: () => {
            renderServicesAt(tl.time());
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
        if (st.isActive && tl.time() < totalDur) {
            startAutoplay();
        }
    }, AUTOPLAY_RESUME_DELAY);
}

// === Клики по прогресс-барам (ручная навигация) ===
barElements.forEach((el, i) => {
    el.addEventListener("click", () => {
        const targetTime = i * HOLD + 0.001;
        gsap.to(tl, {
            time: targetTime,
            duration: 0.45,
            ease: "power2.out",
            onUpdate: () => renderServicesAt(tl.time()),
        });
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
        stopAutoplayDebounced();
    }
}, { passive: true });

window.addEventListener('touchmove', () => {
    if (isAutoplayActive && ScrollTrigger.isInViewport(section, 0.1)) {
        stopAutoplayDebounced();
    }
}, { passive: true });

// Стартовое состояние
gsap.set(bars, { height: '0%' });
renderServicesAt(0);
})();

// Параллакс футера: зона раскрытия равна реальной высоте футера.
(function footerParallax() {
    const cover = document.querySelector('.footer-parallax-cover');
    const footer = document.querySelector('.footer');
    if (!cover || !footer) return;

    const mqMobile = window.matchMedia('(max-width: 768px)');
    const releaseOffset = 40;

    function getRevealHeight() {
        if (mqMobile.matches) {
            return window.innerHeight;
        }

        return Math.ceil(footer.getBoundingClientRect().height);
    }

    function update() {
        const vh = window.innerHeight;
        const revealHeight = getRevealHeight();
        document.documentElement.style.setProperty('--footer-reveal-height', `${revealHeight}px`);
        const scrollTop = window.scrollY || document.documentElement.scrollTop;

        if (mqMobile.matches) {
            document.documentElement.classList.remove('footer-parallax-released');

            const footerTop = footer.getBoundingClientRect().top + scrollTop;
            const revealStart = footerTop - vh;
            const revealEnd = footerTop - releaseOffset;
            const revealDistance = Math.max(1, revealEnd - revealStart);
            const progress = Math.min(1, Math.max(0, (scrollTop - revealStart) / revealDistance));

            cover.style.transform = `translateY(-${progress * vh}px)`;
            return;
        }

        const maxScroll = document.documentElement.scrollHeight - vh;
        const revealStart = maxScroll - revealHeight;
        const progress = maxScroll <= 0 ? 1 : Math.min(1, Math.max(0, (scrollTop - revealStart) / revealHeight));
        document.documentElement.classList.remove('footer-parallax-released');
        cover.style.transform = `translateY(-${progress * revealHeight}px)`;
    }

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    window.addEventListener('load', update);

    if ('ResizeObserver' in window) {
        const footerResizeObserver = new ResizeObserver(update);
        footerResizeObserver.observe(footer);
    }

    update();
})();

// About: параллакс-цитата как отдельный fixed-экран в пределах своей секции
(function aboutQuoteParallax() {
    const section = document.querySelector('.section-about-quote');
    const track = section ? section.querySelector('.section-about-quote__track') : null;
    const quote = section ? section.querySelector('.section-about-quote__sticky') : null;
    if (!section || !track || !quote) return;

    let currentState = '';
    let rafId = null;

    function updateViewportVars() {
        const viewport = window.visualViewport;
        const viewportHeight = viewport && viewport.height ? viewport.height : window.innerHeight;
        const vh = Math.round(viewportHeight) + 'px';

        section.style.setProperty('--about-quote-vh', vh);
        section.style.setProperty('--about-quote-vh-negative', '-' + vh);
    }

    function setState(state) {
        if (state === currentState) return;
        currentState = state;
        quote.classList.toggle('is-fixed', state === 'fixed');
        quote.classList.toggle('is-bottom', state === 'bottom');
    }

    function update() {
        const trackRect = track.getBoundingClientRect();
        const sectionRect = section.getBoundingClientRect();

        if (trackRect.top > 0) {
            setState('top');
            return;
        }

        // Держим цитату fixed до конца секции: следующий блок должен наезжать поверх нее снизу.
        if (sectionRect.bottom <= 0) {
            setState('bottom');
            return;
        }

        setState('fixed');
    }

    function requestUpdate() {
        if (rafId) return;
        rafId = requestAnimationFrame(function() {
            rafId = null;
            updateViewportVars();
            update();
        });
    }

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', requestUpdate);
        window.visualViewport.addEventListener('scroll', requestUpdate, { passive: true });
    }
    updateViewportVars();
    update();
})();

// Страница «Услуги / Инструменты / Продукты»: hero-слайдер, материалы, слайдер инструментов
(function initProductsPage() {
    var heroSwiper = null;
    var HERO_PRODUCTS_AUTOPLAY_DELAY = 5000;
    function init() {
        if (typeof Swiper === 'undefined') return;
        var heroEl = document.querySelector('[data-hero-products-slider]');
        var progressEl = document.querySelector('[data-hero-products-progress]');
        if (!heroEl || !progressEl) return;
        var bars = progressEl.querySelectorAll('.hero-products__bar');
        var fills = progressEl.querySelectorAll('.hero-products__bar-fill');
        var heroProgressRafId = null;
        var heroProgressStateId = 0;

        function resetHeroProgressFill(fill) {
            if (!fill) return;
            fill.style.transition = 'none';
            fill.style.transform = 'scaleX(0)';
            fill.offsetWidth;
        }

        function resetAllHeroProgressFills() {
            heroProgressStateId += 1;
            if (heroProgressRafId !== null) {
                cancelAnimationFrame(heroProgressRafId);
                heroProgressRafId = null;
            }
            fills.forEach(function(fill) {
                resetHeroProgressFill(fill);
            });
        }

        function activateHeroBar(index) {
            resetAllHeroProgressFills();

            bars.forEach(function(bar, i) {
                bar.classList.toggle('is-active', i === index);
            });

            var activeFill = fills[index];
            if (!activeFill) return;
            var currentStateId = heroProgressStateId;
            heroProgressRafId = requestAnimationFrame(function() {
                if (currentStateId !== heroProgressStateId) return;
                activeFill.style.transition = 'transform ' + HERO_PRODUCTS_AUTOPLAY_DELAY + 'ms linear';
                activeFill.style.transform = 'scaleX(1)';
                heroProgressRafId = null;
            });
        }

        heroSwiper = new Swiper(heroEl, {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true,
            effect: 'fade',
            fadeEffect: { crossFade: true },
            speed: 500,
            grabCursor: true,
            allowTouchMove: true,
            simulateTouch: true,
            autoplay: {
                delay: HERO_PRODUCTS_AUTOPLAY_DELAY,
                disableOnInteraction: false
            },
            on: {
                init: function(swiper) {
                    activateHeroBar(swiper.realIndex);
                },
                touchStart: function() {
                    resetAllHeroProgressFills();
                },
                slideChange: function(swiper) {
                    activateHeroBar(swiper.realIndex);
                }
            }
        });
        progressEl.addEventListener('click', function(e) {
            var bar = e.target.closest('.hero-products__bar');
            if (!bar || !heroSwiper) return;
            var i = Array.prototype.indexOf.call(bars, bar);
            if (i !== -1) {
                heroSwiper.slideToLoop(i, 500);
                if (heroSwiper.autoplay) {
                    heroSwiper.autoplay.start();
                }
            }
        });
        var instrumentsEl = document.querySelector('[data-instruments-slider]');
        if (instrumentsEl) {
            var prevBtn = document.querySelector('[data-instruments-prev]');
            var nextBtn = document.querySelector('[data-instruments-next]');
            var instrumentsWrapper = instrumentsEl.querySelector('.swiper-wrapper');
            var sourceSlides = instrumentsWrapper
                ? Array.prototype.slice.call(instrumentsWrapper.children)
                : [];
            var minInstrumentsSlides = 6;

            function updateInstrumentsActiveSlide(swiper) {
                var slides = swiper.slides;
                var slidesPerView = Number(swiper.params.slidesPerView) || 1;
                var activeIdx = swiper.activeIndex + Math.floor(slidesPerView / 2);
                if (activeIdx > slides.length - 1) activeIdx = slides.length - 1;

                slides.forEach(function(slide, i) {
                    var card = slide.querySelector('.instrument-card');
                    if (!card) return;
                    card.classList.toggle('instrument-card--active', i === activeIdx);
                });
            }

            if (instrumentsWrapper && sourceSlides.length && sourceSlides.length < minInstrumentsSlides) {
                var cloneIndex = 0;
                while (instrumentsWrapper.children.length < minInstrumentsSlides) {
                    instrumentsWrapper.appendChild(sourceSlides[cloneIndex % sourceSlides.length].cloneNode(true));
                    cloneIndex += 1;
                }
            }

            var instrumentsSlidesCount = instrumentsEl.querySelectorAll('.swiper-slide').length;
            var instrumentsSwiper = new Swiper(instrumentsEl, {
                slidesPerView: 'auto',
                spaceBetween: 16,
                loop: false,
                centeredSlides: false,
                speed: 400,
                navigation: prevBtn && nextBtn ? { nextEl: nextBtn, prevEl: prevBtn } : false,
                breakpoints: {
                    769: {
                        slidesPerView: 3,
                        spaceBetween: 4
                    }
                },
                on: {
                    init: function(swiper) {
                        updateInstrumentsActiveSlide(swiper);
                    },
                    slideChange: function(swiper) {
                        updateInstrumentsActiveSlide(swiper);
                    },
                    resize: function(swiper) {
                        updateInstrumentsActiveSlide(swiper);
                    }
                }
            });

            requestAnimationFrame(function() {
                instrumentsSwiper.update();
            });

            setTimeout(function() {
                instrumentsSwiper.update();
            }, 120);

            window.addEventListener('resize', function() {
                instrumentsSwiper.update();
            });
        }
    }
    if (document.readyState === 'complete') {
        init();
    } else {
        window.addEventListener('load', init);
    }
})();
