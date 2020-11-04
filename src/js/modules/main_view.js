const d = document;
export function mainView() {
	const $ctn = d.querySelector('.mainView-ctn');
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
	if (isBrowser.chromeee()) {
		document.querySelector('.mainView-ctn').style.height = '480px';
	}
	$ctn.addEventListener('scroll', (e) => {
		const topDistance = $ctn.scrollTop;
		if (topDistance > 280) {
			// console.log('mayor a 280');
		} else {
			// console.log('Menor');
		}
	});
	let contador = 0;
	const carousel = (e) => {
		contador += 1;
	};
	d.addEventListener('click', (e) => {
		if (e.target === $aboutBtn) {
			$popularSection.classList.add('hide');
			$fansSection.classList.add('hide');
			$hrTag.classList.add('hide');
			$overviewBtn.classList.remove('active');
			$aboutBtn.classList.add('active');
			$aboutSection.classList.remove('hide');
		}
		if (e.target === $overviewBtn) {
			$popularSection.classList.remove('hide');
			$fansSection.classList.remove('hide');
			$hrTag.classList.remove('hide');
			$overviewBtn.classList.add('active');
			$aboutBtn.classList.remove('active');
			$aboutSection.classList.add('hide');
		}
		$thumbnailImg.forEach((el) => {
			el.addEventListener('click', (e) => {
				// $backgroundAllScreen.classList.remove('hide');
				$sliderItems.forEach((ele) => {
					ele.classList.add('hasldasldaskld');
				});
			});
			console.log(e.target);
		});
		if (e.target === $closeAllScreenBtn) {
			$backgroundAllScreen.classList.add('hide');
		}
		if (e.target === $nextBtn) {
			carousel(e);
		}
		if (e.target === $prevBtn) {
			carousel(e);
		}
	});
}
