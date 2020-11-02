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
	if (isBrowser.chromeee()) {
		document.querySelector('.mainView-ctn').style.height = '480px';
	}
	$ctn.addEventListener('scroll', (e) => {
		const topDistance = $ctn.scrollTop;
		if (topDistance > 280) {
			console.log('mayor a 280');
		} else {
			console.log('Menor');
		}
	});
}
