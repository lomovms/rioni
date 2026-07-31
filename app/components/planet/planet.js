/**
 * Секция «Планета»: автономная GSAP-анимация при входе секции в экран.
 */
(function () {
  const section = document.querySelector('.section-planet');
  if (!section) return;

  function startWhenVisible(callback) {
		if (!('IntersectionObserver' in window)) {
			callback();
			return;
		}

		const observer = new IntersectionObserver(
			function(entries) {
				entries.forEach(function(entry) {
					if (!entry.isIntersecting || entry.intersectionRatio < 0.95)
						return;

					observer.disconnect();
					callback();
				});
			},
			{
				threshold: 0.95
			}
		);

		observer.observe(section);
  }

  if (window.matchMedia('(max-width: 767px)').matches) {
		initMobilePlanet();
		return;
  }

  const container = section.querySelector('.planet__container');
  const clients = section.querySelector('.planet__clients');
  const light = section.querySelector('.planet__light');
  const light2 = section.querySelector('.planet__light2');
  const titleWrap = section.querySelector('.planet__title-wrap');
  const title = section.querySelector('.planet__title');
  const content = section.querySelector('.planet__content');
  const playButton = section.querySelector('.planet__play');
  const progressInput = section.querySelector('.planet__progress-input');
  const progressValue = section.querySelector('.planet__progress-value');

  if (
		!container ||
		!clients ||
		!light ||
		!light2 ||
		!titleWrap ||
		!title ||
		!content
  )
		return;

  const planetStartY = 789;
  const planetRisenY = 481;
  const titleStartY = 725;
  const titleRisenY = 88;
  const lightStartYPercent = -43;
  const planetFinalX = -789;
  const planetFinalY = -53;
  const planetFinalScale = 790 / 1004;
  const finalHoldDuration = 2;
  const autoDuration = 10;
  const hold = { value: 0 };

  let clientsBlinkTween = null;
  let planetTimeline = null;
  let planetAutoTween = null;
  let planetProgress = { value: 0 };
  let hasInitialized = false;
  let hasCompleted = false;

  function scaleScene(value) {
		return value;
  }

  function scaleY(value) {
		return scaleScene(value);
  }

  function contentFinalX() {
		return 700;
  }

  function isGeorgianPage() {
		var lang = (
			document.documentElement.getAttribute('lang') || ''
		).toLowerCase();
		var path = window.location.pathname.toLowerCase();
		var search = window.location.search.toLowerCase();
		var currentLangOption = document.querySelector(
			'.header__lang-option[data-lang-code="ge"]'
		);
		var currentLangFlag = document.querySelector(
			'.header__lang-flag--current[alt="GE"]'
		);

		return (
			lang === 'ge' ||
			lang === 'ka' ||
			path.indexOf('/ge/') === 0 ||
			path === '/ge' ||
			search.indexOf('lang=ge') !== -1 ||
			(!currentLangOption && Boolean(currentLangFlag))
		);
  }

  function isEnglishPage() {
		var lang = (
			document.documentElement.getAttribute('lang') || ''
		).toLowerCase();
		var path = window.location.pathname.toLowerCase();
		var search = window.location.search.toLowerCase();
		var currentLangOption = document.querySelector(
			'.header__lang-option[data-lang-code="en"]'
		);
		var currentLangFlag = document.querySelector(
			'.header__lang-flag--current[alt="EN"]'
		);

		return (
			lang === 'en' ||
			path.indexOf('/en/') === 0 ||
			path === '/en' ||
			search.indexOf('lang=en') !== -1 ||
			(!currentLangOption && Boolean(currentLangFlag))
		);
  }

  function titleFinalX() {
		return isGeorgianPage() ? 166 : 274;
  }

  function titleFinalY() {
		return 300;
  }

  function lightFinalX() {
		return -282.68;
  }

  function lightFinalY() {
		return -204.37;
  }

  function planetFinalScaleValue() {
		return planetFinalScale;
  }

  function mobileTitleFinalX() {
		if (isGeorgianPage()) return -26;
		if (isEnglishPage()) return -26;

		return -24;
  }

  function startClientsBlink() {
		if (clientsBlinkTween) return;

		clientsBlinkTween = gsap.to(clients, {
			opacity: 0.5,
			duration: 1,
			ease: 'sine.inOut',
			repeat: -1,
			yoyo: true
		});
  }

  function stopClientsBlink() {
		if (!clientsBlinkTween) return;

		clientsBlinkTween.kill();
		clientsBlinkTween = null;
		gsap.set(clients, { opacity: 1 });
  }

  function updateClientsBlink() {
		if (!planetTimeline) return;

		updateProgressControl(planetTimeline.progress());

		if (planetTimeline.progress() >= 0.985) {
			startClientsBlink();
		} else {
			stopClientsBlink();
		}
  }

  function updateProgressControl(progress) {
		if (progressInput) progressInput.value = Math.round(progress * 1000);
		if (progressValue)
			progressValue.textContent = (progress * 100).toFixed(1) + '%';
  }

  function completePlanet() {
		if (!planetTimeline || hasCompleted) return;

		hasCompleted = true;
		planetProgress.value = 1;
		planetTimeline.progress(1);
		updateClientsBlink();

		if (planetAutoTween) {
			planetAutoTween.kill();
			planetAutoTween = null;
		}
  }

  function startAutoPlay() {
		if (!planetTimeline || planetProgress.value >= 1) return;

		if (planetAutoTween) {
			planetAutoTween.kill();
		}

		planetAutoTween = gsap.to(planetProgress, {
			value: 1,
			duration: Math.max(0.1, (1 - planetProgress.value) * autoDuration),
			ease: 'none',
			onUpdate: function() {
				planetTimeline.progress(planetProgress.value);
				updateClientsBlink();
			},
			onComplete: completePlanet
		});
  }

  function setInitialState() {
		gsap.set(section, { overflow: 'hidden' });
		gsap.set(container, {
			xPercent: -50,
			x: 0,
			y: scaleY(planetStartY),
			scale: 1,
			rotation: 0,
			transformOrigin: '50% 100%'
		});
		gsap.set(clients, {
			opacity: 0,
			x: 0,
			y: 0,
			xPercent: -37,
			yPercent: -66,
			rotation: 0,
			scale: 1
		});
		gsap.set(titleWrap, {
			left: '50%',
			top: 0,
			right: 'auto',
			xPercent: -50,
			yPercent: 0,
			x: 0,
			y: scaleY(titleStartY),
			opacity: 1
		});
		gsap.set(title, {
			fontSize: '70px',
			scale: 1,
			transformOrigin: '0 0',
			force3D: true
		});
		gsap.set(content, {
			opacity: 0,
			left: 0,
			right: 'auto',
			top: '50%',
			x: 0,
			xPercent: 0,
			y: scaleY(166),
			yPercent: -50
		});
		gsap.set(light, {
			opacity: 1,
			scale: 0.9,
			x: 0,
			y: 0,
			xPercent: -50,
			yPercent: lightStartYPercent
		});
		if (light2) gsap.set(light2, { x: '100%', y: scaleY(143), opacity: 0 });
		stopClientsBlink();
  }

  function createTimeline() {
		setInitialState();
		planetProgress.value = 0;
		hasCompleted = false;

		planetTimeline = gsap.timeline({
			defaults: { ease: 'none' },
			paused: true,
			onUpdate: updateClientsBlink
		});

		planetTimeline
			.to(
				container,
				{
					y: scaleY(planetRisenY),
					duration: 2,
					ease: 'power3.out'
				},
				0
			)
			.to(
				titleWrap,
				{
					y: scaleY(titleRisenY),
					xPercent: -50,
					yPercent: 0,
					duration: 2,
					ease: 'power3.out'
				},
				0
			)
			.to(
				light,
				{
					opacity: 1,
					scale: 1,
					xPercent: -50,
					yPercent: lightStartYPercent,
					duration: 0.4,
					ease: 'power2.out'
				},
				0.3
			)
			.to(titleWrap, {
				x: titleFinalX(),
				y: scaleY(titleFinalY()),
				xPercent: 0,
				yPercent: 0,
				duration: 1.5,
				ease: 'power2.inOut'
			})
			.to(
				title,
				{
					scale: 42 / 70,
					duration: 1.5,
					ease: 'power2.inOut',
					force3D: true
				},
				'<'
			)
			.to(
				container,
				{
					x: scaleScene(planetFinalX),
					y: scaleY(planetFinalY),
					scale: planetFinalScaleValue(),
					rotation: 47,
					duration: 3,
					ease: 'power2.inOut'
				},
				'<'
			)
			.to(
				light2,
				{
					x: scaleScene(288),
					y: scaleY(143),
					opacity: 1,
					duration: 3,
					ease: 'power2.inOut'
				},
				'<'
			)
			.to(
				clients,
				{
					x: 0,
					y: 0,
					xPercent: -39,
					yPercent: -66,
					rotation: -47,
					scale: 1,
					duration: 3,
					ease: 'power2.inOut'
				},
				'<'
			)
			.to(
				light,
				{
					x: lightFinalX(),
					y: lightFinalY(),
					xPercent: -50,
					yPercent: -32,
					scale: 0.8,
					duration: 3,
					ease: 'power2.inOut'
				},
				'<'
			)
			.to(
				content,
				{
					opacity: 1,
					left: 0,
					right: 'auto',
					x: contentFinalX(),
					y: scaleY(166),
					yPercent: -50,
					duration: 1,
					ease: 'power2.out'
				},
				'-=1'
			)
			.to(
				clients,
				{
					opacity: 1,
					duration: 0.3,
					ease: 'power2.out'
				},
				'<+=0.4'
			)
			.to(hold, {
				value: 0,
				duration: finalHoldDuration
			});
  }

  function initPlanet() {
		if (hasInitialized) return;

		if (typeof gsap === 'undefined') {
			window.setTimeout(initPlanet, 100);
			return;
		}

		hasInitialized = true;
		createTimeline();

		if (progressInput) {
			progressInput.addEventListener('input', function() {
				if (planetAutoTween) {
					planetAutoTween.kill();
					planetAutoTween = null;
				}

				hasCompleted = false;
				planetProgress.value = Number(progressInput.value) / 1000;
				planetTimeline.progress(planetProgress.value);
				updateClientsBlink();
			});
		}

		if (playButton) {
			playButton.addEventListener('click', function() {
				if (planetProgress.value >= 1) {
					hasCompleted = false;
					planetProgress.value = 0;
					planetTimeline.progress(0);
				}

				startAutoPlay();
			});
		}

		startWhenVisible(startAutoPlay);
  }

  if (document.readyState === 'complete') {
		initPlanet();
  } else {
		window.addEventListener('load', initPlanet);
  }

  function initMobilePlanet() {
		const mobile = section.querySelector('.planet__mobile');
		const heroScreen = section.querySelector(
			'.planet__mobile-screen--hero'
		);
		const detailsScreen = section.querySelector(
			'.planet__mobile-screen--details'
		);
		const detailsCopy = detailsScreen
			? detailsScreen.querySelector('.planet__mobile-copy')
			: null;
		const detailsTitle = detailsScreen
			? detailsScreen.querySelector('.planet__mobile-title--left')
			: null;
		const detailsStats = detailsScreen
			? detailsScreen.querySelector('.planet__mobile-stats')
			: null;
		const detailsText = detailsScreen
			? detailsScreen.querySelector('.planet__mobile-text')
			: null;
		const detailsGlobe = detailsScreen
			? detailsScreen.querySelector('.planet__mobile-globe--details')
			: null;
		const detailsLight = detailsScreen
			? detailsScreen.querySelector('.planet__mobile-light')
			: null;
		const detailsClients = detailsScreen
			? detailsScreen.querySelector('.planet__mobile-clients')
			: null;

		if (
			!mobile ||
			!detailsScreen ||
			!detailsCopy ||
			!detailsTitle ||
			!detailsStats ||
			!detailsText ||
			!detailsGlobe
		)
			return;

		let hasInitializedMobile = false;
		let mobileClientsBlinkTween = null;
		let mobileTimeline = null;
		let mobileAutoTween = null;
		let mobileScrollTrigger = null;
		let isMobileAutoplayActive = false;
		let hasCompletedMobile = false;

		function startMobileClientsBlink() {
			if (!detailsClients || mobileClientsBlinkTween) return;

			mobileClientsBlinkTween = gsap.to(detailsClients, {
				opacity: 0.55,
				duration: 1,
				ease: 'sine.inOut',
				repeat: -1,
				yoyo: true
			});
		}

		function stopMobileClientsBlink() {
			if (!mobileClientsBlinkTween) return;

			mobileClientsBlinkTween.kill();
			mobileClientsBlinkTween = null;
			if (detailsClients) gsap.set(detailsClients, { opacity: 1 });
		}

		function setMobileInitialState() {
			gsap.set(section, { overflow: 'hidden' });
			if (heroScreen)
				gsap.set(heroScreen, { autoAlpha: 0, display: 'none' });
			gsap.set(detailsScreen, { autoAlpha: 1, zIndex: 1 });
			gsap.set(detailsCopy, { y: 0, autoAlpha: 1 });
			gsap.set(detailsTitle, {
				x: 0,
				y: 430,
				scale: 1,
				autoAlpha: 1,
				textAlign: 'center',
				transformOrigin: '0 0',
				force3D: true
			});
			gsap.set([detailsStats, detailsText], { y: 42, autoAlpha: 0 });
			gsap.set(detailsGlobe, {
				x: -118,
				y: 0,
				scale: 1.25,
				rotation: 0,
				autoAlpha: 1
			});
			if (detailsLight)
				gsap.set(detailsLight, { scale: 0.9, autoAlpha: 0.45 });
			if (detailsClients) gsap.set(detailsClients, { autoAlpha: 0 });
			stopMobileClientsBlink();
		}

		function createMobileTimeline() {
			setMobileInitialState();

			return gsap
				.timeline({
					defaults: { ease: 'none' },
					paused: true,
					onUpdate: function() {
						if (this.progress() >= 0.985) {
							startMobileClientsBlink();
						} else {
							stopMobileClientsBlink();
						}
					}
				})
				.to(
					detailsTitle,
					{
						y: 108,
						scale: 1,
						duration: 1.4,
						ease: 'power3.out'
					},
					0
				)
				.to(detailsTitle, {
					x: mobileTitleFinalX(),
					y: 0,
					scale: 0.8,
					textAlign: 'center',
					duration: 1.25,
					ease: 'power2.inOut',
					force3D: true
				})
				.to(
					detailsGlobe,
					{
						x: 0,
						y: 0,
						scale: 1,
						rotation: 0,
						duration: 1.9,
						ease: 'power2.inOut'
					},
					'<'
				)
				.to(
					detailsLight,
					{
						scale: 1,
						autoAlpha: 0.95,
						duration: 1.4,
						ease: 'power2.out'
					},
					'<+=0.2'
				)
				.to(
					[detailsStats, detailsText],
					{
						y: 0,
						autoAlpha: 1,
						duration: 0.85,
						stagger: 0.12,
						ease: 'power2.out'
					},
					'<+=0.6'
				)
				.to(
					detailsClients,
					{
						autoAlpha: 1,
						duration: 0.4,
						ease: 'power2.out'
					},
					'<+=0.5'
				)
				.to(
					{},
					{
						duration: 0.8
					}
				);
		}

		function killMobileAutoPlay() {
			if (mobileAutoTween) {
				mobileAutoTween.kill();
			}

			mobileAutoTween = null;
			isMobileAutoplayActive = false;
		}

		function startMobileAutoPlay() {
			if (
				!mobileTimeline ||
				!mobileScrollTrigger ||
				hasCompletedMobile ||
				mobileTimeline.progress() >= 1
			)
				return;

			killMobileAutoPlay();
			isMobileAutoplayActive = true;

			mobileAutoTween = gsap.to(mobileTimeline, {
				progress: 1,
				duration: Math.max(0.1, (1 - mobileTimeline.progress()) * 8),
				ease: 'none',
				onUpdate: function() {
					var progress = mobileTimeline.progress();
					var scrollY =
						mobileScrollTrigger.start +
						progress *
							(mobileScrollTrigger.end -
								mobileScrollTrigger.start);
					window.scrollTo(0, scrollY);
				},
				onComplete: function() {
					isMobileAutoplayActive = false;
					hasCompletedMobile = true;
					startMobileClientsBlink();
				}
			});
		}

		function initMobile() {
			if (hasInitializedMobile) return;

			if (typeof gsap === 'undefined') {
				window.setTimeout(initMobile, 100);
				return;
			}

			hasInitializedMobile = true;

			mobileTimeline = createMobileTimeline();

			if (typeof ScrollTrigger === 'undefined') {
				mobileTimeline.play();
				return;
			}

			gsap.registerPlugin(ScrollTrigger);

			mobileScrollTrigger = ScrollTrigger.create({
				trigger: section,
				start: 'top top',
				end: function() {
					return '+=' + Math.max(window.innerHeight * 2, 1200);
				},
				pin: true,
				scrub: true,
				anticipatePin: 1,
				invalidateOnRefresh: true,
				onUpdate: function(self) {
					if (isMobileAutoplayActive) return;
					if (hasCompletedMobile) {
						mobileTimeline.progress(1);
						return;
					}

					mobileTimeline.progress(self.progress);
				},
				onEnter: startMobileAutoPlay,
				onEnterBack: function() {
					killMobileAutoPlay();
					if (hasCompletedMobile) {
						mobileTimeline.progress(1);
						startMobileClientsBlink();
					}
				},
				onLeave: function() {
					killMobileAutoPlay();
					hasCompletedMobile = true;
					mobileTimeline.progress(1);
					startMobileClientsBlink();
				},
				onLeaveBack: function() {
					killMobileAutoPlay();
					if (hasCompletedMobile) {
						mobileTimeline.progress(1);
						startMobileClientsBlink();
						return;
					}

					mobileTimeline.progress(0);
					stopMobileClientsBlink();
				}
			});
		}

		if (document.readyState === 'complete') {
			initMobile();
		} else {
			window.addEventListener('load', initMobile);
		}
  }
})();
