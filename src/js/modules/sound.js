export function sound() {
	const d = document;
	const $nameSong = d.getElementById('info-name');
	// input file
	const $btnFiles = d.getElementById('add-files');
	const $nextBtn = d.getElementById('next-btn');
	const $prevBtn = d.getElementById('prev-btn');
	const $playBtn = d.getElementById('play-btn');
	const $pauseBtn = d.getElementById('pause-btn');
	// etiqueta audio
	const $audioAdded = d.getElementById('audio-added');
	const $tracklist = d.getElementById('track-list');
	const $progress = d.querySelector('.progress');
	const $playbackProgressText = d.querySelector('.playback__progress-text');
	const $playbackDurationText = d.querySelector('.playback__duration');
	// donde salen los nombres de las canciones que se pusierpn
	const $repeatSongBtn = d.getElementById('btn-auto-track');
	const $volumeInput = d.getElementById('volume-bar');
	const urlTracks = [];
	let listaCanciones = [];
	const audioPositionTracklist = [];
	let contadorPositionTracklist = 0;
	let audioPorciento = 0;
	let nextTrackActive = false;

	const play = () => {
		$audioAdded.play();
		$nameSong.classList.add('active');
		$nameSong.innerText = `${urlTracks[contadorPositionTracklist].archivo.name}`;
		setInterval(() => {
			let Totalsegundos = parseInt($audioAdded.currentTime, 10);
			Totalsegundos %= 3600;
			const minutos = Math.floor(Totalsegundos / 60);
			let segundos = Totalsegundos % 60;
			if (segundos < 10) segundos = `0${segundos}`;
			$playbackProgressText.innerHTML = `${minutos}:${segundos}`;
			audioPorciento = Math.round(
				($audioAdded.currentTime * 100) / $audioAdded.duration
			);
		}, 1000);
		$playbackDurationText.innerHTML = `${Math.floor(
			$audioAdded.duration / 60
		)}:${Math.floor($audioAdded.duration % 60)}`;
		setInterval(() => {
			/* const audioPorciento = Math.round(
					($audioAdded.currentTime * 100) / $audioAdded.duration
				); */
			$progress.style.width = `${parseInt(
				($audioAdded.currentTime * 100) / $audioAdded.duration,
				10
			)}%`;
		}, 400);
	};
	// cuando haga click en una cancion del select(html)
	const musicaDeTracklist = () => {
		console.log('musica del traklsisisisisi');
		for (let iterator = 0; iterator < listaCanciones.length; iterator += 1) {
			console.log('kujstaa cabnciones');
			listaCanciones.forEach((el) => {
				console.log('s');
				el.addEventListener('click', (e) => {
					console.log('clickkkk dn item');
					if (e.target.innerHTML === urlTracks[iterator].archivo.name) {
						$audioAdded.src = urlTracks[iterator].url;
						$nameSong.innerText = `${urlTracks[iterator].archivo.name}`;
						// por esta linea eslint me dice que no cumplo un par de reglas.i dont care
						contadorPositionTracklist = iterator;
					}
					play();
				});
			});
		}
	};
	const obtenerMusica = () => {
		// segun la cantidad de archivos seleccionados
		for (let iterator = 0; iterator < $btnFiles.files.length; iterator += 1) {
			// obtengo la url del item(audio)
			// https://stackoverflow.com/questions/30864573/what-is-a-blob-url-and-why-it-is-used
			// btn.files(obtengo los archivos)[iterator](en cada posicion,o sea, todos ya que es un for)
			const objetoURL = URL.createObjectURL($btnFiles.files[iterator]);
			// pongo las url en modo de objeto en este array
			urlTracks.push({
				archivo: $btnFiles.files[iterator],
				url: objetoURL,
			});
			audioPositionTracklist.push({
				musica: $btnFiles.files[iterator],
				posicion: contadorPositionTracklist,
			});
			// le pongo que canciones selecciono, es += para que no se quede solo con el ultimo item
			contadorPositionTracklist += 1;
			$tracklist.classList.add('active');
			$tracklist.innerHTML += `
			<option class="tracklist__name" >${urlTracks[iterator].archivo.name}</option>
			`;
		}
		// cuando tenga agregue audios,ahi voya  poder elegir canciones del select
		listaCanciones = d.querySelectorAll('.tracklist__name');
		musicaDeTracklist();
		// lo regreso a 0 para que siempre empiece en this number
		contadorPositionTracklist = 0;
		// ahora la etiqueta tiene el src y ahora puedo reproducirlo
		$audioAdded.src = urlTracks[contadorPositionTracklist].url;
	};
	const pause = () => {
		$audioAdded.pause();
	};
	// Automatizar musica siguiente
	const musicaSiguiente = () => {
		contadorPositionTracklist += 1;
		if (contadorPositionTracklist > urlTracks.length - 1) {
			contadorPositionTracklist = 0;
		}
		$audioAdded.src = urlTracks[contadorPositionTracklist].url;
		play();
	};
	// manejador del volumen bruh
	const controlAudio = (e) => {
		$audioAdded.volume = e.target.value;
		if ($audioAdded.volume === 0) {
			console.log('cerro');
			d.querySelector('.control__btn-volume').classList.remove('fa-volume-up');
			d.querySelector('.control__btn-volume').classList.remove(
				'fa-volume-down'
			);
			d.querySelector('.control__btn-volume').classList.add('fa-volume-mute');
		}
		if ($audioAdded.volume <= 0.5 && $audioAdded.volume > 0) {
			d.querySelector('.control__btn-volume').classList.remove(
				'fa-volume-mute'
			);
			d.querySelector('.control__btn-volume').classList.remove('fa-volume-up');
			d.querySelector('.control__btn-volume').classList.add('fa-volume-down');
		}
		if ($audioAdded.volume > 0.5) {
			console.log('Mayor a 5');
			d.querySelector('.control__btn-volume').classList.remove(
				'fa-volume-down'
			);
			d.querySelector('.control__btn-volume').classList.remove(
				'fa-volume-mute'
			);
			d.querySelector('.control__btn-volume').classList.add('fa-volume-up');
		}
	};
	const cancionSiguiente = () => {
		contadorPositionTracklist += 1;
		if (contadorPositionTracklist > urlTracks.length - 1) {
			contadorPositionTracklist = 0;
		}
		$audioAdded.src = urlTracks[contadorPositionTracklist].url;
		play();
	};
	const cancionAnterior = () => {
		contadorPositionTracklist -= 1;
		if (contadorPositionTracklist < 0) {
			contadorPositionTracklist = urlTracks.length - 1;
		}
		$audioAdded.src = urlTracks[contadorPositionTracklist].url;
		play();
	};
	// para verificar ciuando termina un tema. lo pongo aca y no en una funcoion para qu efuncione
	setInterval(() => {
		if (audioPorciento === 100) {
			musicaSiguiente();
		}
		if ($playbackDurationText.innerHTML === 'NaN:NaN') {
			$playbackDurationText.innerHTML = `${Math.floor(
				$audioAdded.duration / 60
			)}:${Math.floor($audioAdded.duration % 60)}`;
		}
	}, 1000);
	const finalMusica = () => {
		if (nextTrackActive === false) {
			$audioAdded.setAttribute('loop', '');
			d.querySelector('.control-btn-repeat').classList.add('active');
			nextTrackActive = true;
		} else {
			nextTrackActive = false;
			d.querySelector('.control-btn-repeat').classList.remove('active');
			$audioAdded.removeAttribute('loop');
		}
	};
	$playBtn.addEventListener('click', play);
	$btnFiles.addEventListener('change', obtenerMusica);
	$pauseBtn.addEventListener('click', pause);
	$repeatSongBtn.addEventListener('click', finalMusica);
	$volumeInput.addEventListener('change', controlAudio);
	$nextBtn.addEventListener('click', cancionSiguiente);
	$prevBtn.addEventListener('click', cancionAnterior);
	musicaSiguiente();
}
