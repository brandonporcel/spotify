const d = document;
export function mainView() {
	const $ctn = d.querySelector('.mainView-ctn');
	$ctn.addEventListener('scroll', () => {
		const topDistance = $ctn.scrollTop;
		if (topDistance > 100) {
			console.log('mayor a 100');
		} else {
			console.log('Menor');
		}
	});
}
