export function leftNavBar() {
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
		document.querySelector('.list__playlist').style.height = '143px';
	}
}
