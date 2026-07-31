(function initHeaderTopbarScroll() {
	const header = document.querySelector('.header');
	if (!header || !header.classList.contains('header--with-topbar')) return;

	const topbar = document.querySelector('.hero__topbar');
	if (!topbar) return;

	let ticking = false;
	function updateTopbarCompact() {
		ticking = false;
		const pastTopbar = topbar.getBoundingClientRect().bottom <= 0;
		header.classList.toggle('header--topbar-compact', pastTopbar);
	}
	function onScrollOrResize() {
		if (!ticking) {
			ticking = true;
			requestAnimationFrame(updateTopbarCompact);
		}
	}
	window.addEventListener('scroll', onScrollOrResize, { passive: true });
	window.addEventListener('resize', onScrollOrResize);
	updateTopbarCompact();
})();

/*
(() => {
	if (typeof gsap === 'undefined') return;

	const header = document.querySelector('.header');
	if (!header) return;

	const headerInner = header.querySelector('.header__inner');
	const nav = header.querySelector('.header__nav');
	const burger = header.querySelector('.header__burger');
	const mqDesktop = window.matchMedia('(min-width: 1025px)');

	let isCollapsed = false;

	function setInitial() {
		if (!mqDesktop.matches) {
			gsap.set(headerInner, { clearProps: 'all' });
			gsap.set(nav, { clearProps: 'all' });
			gsap.set(burger, { clearProps: 'all' });
			header.classList.remove('header--collapsed');
			isCollapsed = false;
			return;
		}
		gsap.set(headerInner, { scaleX: 1, transformOrigin: 'left center' });
		gsap.set(nav, { width: 'auto', opacity: 1 });
		gsap.set(burger, { opacity: 0, scale: 0.8 });
		header.classList.remove('header--collapsed');
		isCollapsed = false;
	}
	setInitial();
	mqDesktop.addEventListener('change', setInitial);

	function collapseDesktop() {
		if (!mqDesktop.matches || isCollapsed) return;
		isCollapsed = true;

		header.classList.add('header--collapsed');

		gsap.timeline()
			.to(headerInner, {               // основное движение
					paddingLeft: 50,
					duration: 0.45,
					ease: 'power2.out'
				}, 0)
				.to(headerInner, {                // лёгкое перерастяжение
					paddingLeft: 58,
					duration: 0.12,
					ease: 'power2.out'
				})
				.to(headerInner, {                // возврат с пружиной
					paddingLeft: 50,
					duration: 0.22,
					ease: 'back.out(2)'
				})
			.to(
				nav,
				{
					width: 0,
					opacity: 0,
					duration: 0.45,
					ease: 'power2.in'
				},
				0
			)
			.to(
				burger,
				{
					opacity: 1,
					scale: 1,
					duration: 0.8,
					ease: 'back.out(1.6)'
				},
				'0'
			);
	}

	function expandDesktop() {
		if (!mqDesktop.matches || !isCollapsed) return;
		isCollapsed = false;

		gsap.timeline()
			.to(
				headerInner,
				{
					// scaleX: 1,
					duration: 0.55,
					ease: 'back.out(1.4)'
				},
				0
			)
			.to(
				nav,
				{
					width: 'auto',
					opacity: 1,
					duration: 0.5,
					ease: 'power2.out'
				},
				0
			)
			.to(
				burger,
				{
					opacity: 0,
					scale: 0.8,
					duration: 0.25,
					ease: 'power2.in'
				},
				0
			)
			.eventCallback('onComplete', () => {
				header.classList.remove('header--collapsed');
			});
	}

	headerInner.addEventListener('click', e => {
		if (
			e.target.closest(
				'a, button, select, input, .header__burger, [data-no-collapse]'
			)
		)
			return;
		collapseDesktop();
	});

	burger.addEventListener('click', () => {
		if (mqDesktop.matches) expandDesktop();
	});
})();
*/

document.querySelectorAll('.header__cta').forEach((cta) => {
  const tDefault = cta.querySelector('.text-default');
  const tHover   = cta.querySelector('.text-hover');

  // начальные состояния: дефолт по центру, ховер-текст спрятан сверху
  gsap.set(tDefault, { yPercent: -50 });   // центр (translateY(-50%))
  gsap.set(tHover,   { yPercent: -250 });  // выше центра (скрыт)

  // таймлайн «шторки»: дефолт уходит вниз, ховер опускается в центр
  const tl = gsap.timeline({
		paused: true,
		defaults: { duration: 0.3, ease: 'back.out(1.5)' }
  });
  tl.to(tDefault, { yPercent: 250 }, 0)    // вниз за пределы
    .to(tHover,   { yPercent: -50 }, 0);   // в центр сверху

  // фон/цвет можно оставить на CSS :hover, либо анимировать тут:
  // const bgTl = gsap.timeline({ paused: true }).to(cta, { backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--elements-green-extra'), duration: 0.25 }, 0);

  cta.addEventListener('mouseenter', () => {
    tl.play();
    // bgTl.play();
  });

  cta.addEventListener('mouseleave', () => {
    tl.reverse();
    // bgTl.reverse();
  });

  // клавиатура/тач (дружелюбно к доступности)
  cta.addEventListener('focus', () => tl.play());
  cta.addEventListener('blur',  () => tl.reverse());
});

(function initHeaderLangSelect() {
	const langWrap = document.querySelector('.js-header-lang');
	if (!langWrap) return;

	const trigger = langWrap.querySelector('.header__lang-trigger');
	const menu = langWrap.querySelector('.header__lang-menu');
	if (!trigger || !menu) return;

	function setOpenState(isOpen) {
		langWrap.classList.toggle('is-open', isOpen);
		trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
		menu.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
	}

	trigger.addEventListener('click', function () {
		setOpenState(!langWrap.classList.contains('is-open'));
	});

	document.addEventListener('click', function (event) {
		if (!langWrap.contains(event.target)) {
			setOpenState(false);
		}
	});

	document.addEventListener('keydown', function (event) {
		if (event.key === 'Escape') {
			setOpenState(false);
		}
	});
})();

(function initHeaderMobileDrawer() {
	const header = document.querySelector('.header');
	if (!header) return;

	const burger = header.querySelector('.header__burger');
	const drawer = header.querySelector('.header__drawer');
	const backdrop = header.querySelector('.header__drawer-backdrop');
	const drawerClose = header.querySelector('.header__drawer-close');
	if (!burger || !drawer || !backdrop) return;

	const drawerLinks = drawer.querySelectorAll('.header__drawer-link');
	const closeTargets = drawer.querySelectorAll('.header__drawer-link, .header__drawer-btn');
	const mqMobile = window.matchMedia('(max-width: 1024px)');

	function setOpenState(isOpen) {
		header.classList.toggle('header--drawer-open', isOpen);
		burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
		document.body.style.overflow = isOpen ? 'hidden' : '';
	}

	function closeDrawer() {
		setOpenState(false);
	}

	function toggleDrawer() {
		if (!mqMobile.matches) return;
		setOpenState(!header.classList.contains('header--drawer-open'));
	}

	burger.addEventListener('click', function() {
		toggleDrawer();
	});

	backdrop.addEventListener('click', closeDrawer);
	if (drawerClose) drawerClose.addEventListener('click', closeDrawer);

	closeTargets.forEach(function(target) {
		target.addEventListener('click', function() {
			if (target.classList.contains('header__drawer-link')) {
				drawerLinks.forEach(function(link) {
					link.classList.remove('header__drawer-link--active');
				});
				target.classList.add('header__drawer-link--active');
			}
			closeDrawer();
		});
	});

	document.addEventListener('keydown', function(event) {
		if (event.key === 'Escape') {
			closeDrawer();
		}
	});

	mqMobile.addEventListener('change', function() {
		if (!mqMobile.matches) {
			closeDrawer();
		}
	});
})();
