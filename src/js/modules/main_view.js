const d = document;
export function mainView() {
	const isBrowser = {
		chromeee: () => navigator.userAgent.match(/chrome/i),
		safarai: () => navigator.userAgent.match(/safarai/i),
		firefoxSAPEEEE: () => navigator.userAgent.match(/firefox/i),
		opera: () => navigator.userAgent.match(/opera|opera mini/i),
		ie: () => navigator.userAgent.match(/msie|iemobile/i),
		edge: () => navigator.userAgent.match(/edge/i),
		any: function () {
			return (
				this.ie() ||
				this.edge() ||
				this.chromeee() ||
				this.safarai() ||
				this.firefoxSAPEEEE() ||
				this.opera()
			);
		},
	};
	const $albumPics = d.querySelectorAll('.album__pic');
	const $albumBtns = d.querySelectorAll('.album__pic-btn');
	const $aboutBtn = d.querySelector('.background__a-about');
	const $overviewBtn = d.querySelector('.background__a-overview');
	const $popularSection = d.querySelector('.section-popular-fans');
	const $fansSection = d.querySelector('.albumes__ctn');
	const $hrTag = d.querySelector('.mainView__hr');
	const $aboutSection = d.querySelector('.mainView__about');
	const $thumbnailImg = d.querySelectorAll('.about__thumbnail');
	const $backgroundAllScreen = d.querySelector('.allScreen');
	const $closeAllScreenBtn = d.querySelector('.allScreen__close-btn');
	const $nextBtn = d.querySelector('.allScreen__next-btn');
	const $prevBtn = d.querySelector('.allScreen__prev-btn');
	const $sliderItems = d.querySelectorAll('.allScreen__img-item');
	// contador para el slider
	let contador = 0;
	if (isBrowser.chromeee()) {
		document.querySelector('.mainView-ctn').style.height = '480px';
	}
	// cuando toque cualquier miniatura, se va a permitir mostrar el fondo/slider
	$thumbnailImg.forEach((el) => {
		el.addEventListener('click', () => {
			$backgroundAllScreen.classList.remove('hide');
		});
	});
	$albumPics.forEach((item) => {
		item.addEventListener('mouseover', () => {
			item.classList.add('active');
			// $albumBtns.forEach((btn) => {
			// item.classList.add('hola');
			// btn.classList.remove('hide');
			// });
		});
		item.addEventListener('mouseleave', () => {
			item.classList.remove('active');
			// $albumBtns.forEach((btn) => {
			// btn.classList.add('hide');
			// });
		});
	});

	d.addEventListener('click', (e) => {
		// click en la seccion about
		if (e.target === $aboutBtn) {
			$popularSection.classList.add('hide');
			$fansSection.classList.add('hide');
			$hrTag.classList.add('hide');

			$overviewBtn.classList.remove('active');
			$aboutBtn.classList.add('active');
			$aboutSection.classList.remove('hide');
		}
		// vuelta a la seccion overview
		if (e.target === $overviewBtn) {
			$popularSection.classList.remove('hide');
			$fansSection.classList.remove('hide');
			$hrTag.classList.remove('hide');

			$overviewBtn.classList.add('active');
			$aboutBtn.classList.remove('active');
			$aboutSection.classList.add('hide');
		}
		// click en la primer miniatura
		if (
			e.target.matches('.about__thumbnail-one') ||
			e.target.matches('.about__thumbnail-one *')
		) {
			d.querySelector('.allScreen__img-item-three').classList.remove('active');
			d.querySelector('.allScreen__img-item-three').classList.add('hide');
			d.querySelector('.allScreen__img-item-two').classList.remove('active');
			d.querySelector('.allScreen__img-item-two').classList.add('hide');

			d.querySelector('.allScreen__img-item-one').classList.remove('hide');
			d.querySelector('.allScreen__img-item-one').classList.add('active');
			contador = 0;
		}
		// segunda
		if (
			e.target.matches('.about__thumbnail-two') ||
			e.target.matches('.about__thumbnail-two *')
		) {
			d.querySelector('.allScreen__img-item-three').classList.remove('active');
			d.querySelector('.allScreen__img-item-three').classList.add('hide');
			d.querySelector('.allScreen__img-item-one').classList.remove('active');
			d.querySelector('.allScreen__img-item-one').classList.add('hide');

			d.querySelector('.allScreen__img-item-two').classList.remove('hide');
			d.querySelector('.allScreen__img-item-two').classList.add('active');
			contador = 1;
		}
		// y va el tercero
		if (
			e.target.matches('.about__thumbnail-three') ||
			e.target.matches('.about__thumbnail-three *')
		) {
			d.querySelector('.allScreen__img-item-one').classList.remove('active');
			d.querySelector('.allScreen__img-item-one').classList.add('hide');
			d.querySelector('.allScreen__img-item-two').classList.remove('active');
			d.querySelector('.allScreen__img-item-two').classList.add('hide');

			d.querySelector('.allScreen__img-item-three').classList.remove('hide');
			d.querySelector('.allScreen__img-item-three').classList.add('active');
			contador = 2;
		}
		// cerrar el slider
		if (e.target === $closeAllScreenBtn) {
			$backgroundAllScreen.classList.add('hide');
			d.querySelectorAll('.allScreen__img-item.active').forEach((element) => {
				element.classList.remove('active');
			});
		}
		if (e.target === $nextBtn) {
			contador += 1;
			$sliderItems[contador - 1].classList.remove('active');
			$sliderItems[contador - 1].classList.add('hide');
			// pregutno si estoy en el ultimo item(6)  el length es de 7,por eso resto
			// tambien funcaria de la sig. forma
			if (contador > $sliderItems.length - 1) {
				contador = 0;
			}
			$sliderItems[contador].classList.add('active');
			$sliderItems[contador].classList.remove('hide');
		}
		if (e.target === $prevBtn) {
			contador -= 1;
			$sliderItems[contador + 1].classList.remove('active');
			$sliderItems[contador + 1].classList.add('hide');
			if (contador < 0) {
				contador = $sliderItems.length - 1;
			}
			$sliderItems[contador].classList.add('active');
			$sliderItems[contador].classList.remove('hide');
		}
	});
}
