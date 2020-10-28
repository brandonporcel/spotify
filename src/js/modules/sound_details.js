export function soundDetails() {
	const d = document;
	const $tracklist = d.getElementById('track-list');
	const $progress = d.querySelector('.progress');
	const $likedIcon = d.querySelector('.control__btn-liked');
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
	$likedIcon.addEventListener('click', () => {
		if (likedIconTester === false) {
			$likedIcon.classList.remove('far', 'fa-heart');
			$likedIcon.classList.add('fas', 'fa-heart', 'active');
			likedIconTester = true;
		} else {
			$likedIcon.classList.remove('fas', 'fa-heart', 'active');
			$likedIcon.classList.add('far', 'fa-heart');
			likedIconTester = false;
		}
	});
}
