export function soundDetails() {
	const d = document;
	const $tracklist = d.getElementById('track-list');
	const $progress = d.querySelector('.progress');
	const $likedIcons = d.querySelectorAll('.control__btn-liked');
	const $device = d.querySelector('.device__browser');
	let likedIconTester = false;
	d.querySelector('.control__btn-trackplaying').addEventListener(
		'click',
		() => {
			$tracklist.classList.toggle('active');
		}
	);
	d.querySelector('.playback').addEventListener('mouseover', () => {
		$progress.classList.add('active');
	});
	d.querySelector('.playback').addEventListener('mouseout', () => {
		$progress.classList.remove('active');
	});

	$likedIcons.forEach((el) => {
		el.addEventListener('click', () => {
			if (likedIconTester === false) {
				el.classList.remove('far', 'fa-heart');
				el.classList.add('fas', 'fa-heart', 'active');
				likedIconTester = true;
			} else {
				el.classList.remove('fas', 'fa-heart', 'active');
				el.classList.add('far', 'fa-heart');
				likedIconTester = false;
			}
		});
	});
	console.log($likedIcons);
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
	$device.innerHTML = `${isBrowser.any()}`;
}
