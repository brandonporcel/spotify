export function sound() {
	const d = document;
	const $playBtn = d.getElementById('play-btn');
	const $nextBtn = d.getElementById('next-btn');
	// input file
	const $btnFiles = d.getElementById('add-files');
	// etiqueta audio
	const $audioAdded = d.getElementById('audio-added');
	const $tracklist = d.querySelector('.list');
	const $progress = d.querySelector('.progress');
	const $playbackProgressText = d.querySelector('.playback__progress-text');
	const $playbackDurationText = d.querySelector('.playback__duration');
	// donde sale el titulo de la cancion que suena
	const trackPlayingNow = d.getElementById('playing-now');
	// donde salen los nombres de las canciones que se pusierpn
	const $repeatSongBtn = d.getElementById('btn-auto-track');
	const urlTracks = [];
	const audioPositionTracklist = [];
	let contadorPositionTracklist = 0;
	let contador = 0;
	let audioPorciento = 0;
	let verificarPausa = false;
	let nextTrackActive = false;
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
			// le pongo que canciones selecciono, es += para que no se quede solo con el ultimo item
			$tracklist.innerHTML += `<b class"name-track">${urlTracks[iterator].archivo.name}</b>`;
			// guardo su posicion en otro array
			audioPositionTracklist.push({
				musica: $btnFiles.files[iterator],
				posicion: contadorPositionTracklist,
			});
			contadorPositionTracklist += 1;
		}
		// lo regreso a 0 para que siempre empiece en this number
		contadorPositionTracklist = 0;
		// ahora la etiqueta tiene el src y ahora puedo reproducirlo
		$audioAdded.src = urlTracks[contador].url;
	};
	const play = () => {
		if (verificarPausa === false) {
			$audioAdded.play();
			trackPlayingNow.innerText = `escuchando ${urlTracks[contador].archivo.name}`;
			d.querySelector('.control__btn-start.fa-play').classList.remove(
				'fa-play'
			);
			d.querySelector('.control__btn-start').classList.add('fa-pause');
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
			verificarPausa = true;
		} else {
			d.querySelector('.control__btn-start.fa-pause').classList.remove(
				'fa-pause'
			);
			d.querySelector('.control__btn-start').classList.add('fa-play');
			$audioAdded.pause();
			verificarPausa = false;
		}
	};
	const musicaSiguiente = () => {
		console.log('nex btn ');
		contador += 1;
		if (contador > urlTracks.length - 1) {
			contador = 0;
		}
		$audioAdded.src = urlTracks[contador].url;
		play();
		verificarPausa = false;
	};

	// Automatizar musica siguiente
	const finalMusica = () => {
		if (nextTrackActive === false) {
			nextTrackActive = true;
			$audioAdded.removeAttribute('loop');
			$repeatSongBtn.innerText = 'AutoTrack-Off';
		} else {
			nextTrackActive = false;
			$audioAdded.setAttribute('loop', '');
			$repeatSongBtn.innerText = 'AutoTrack-On';
		}

		setInterval(() => {
			if (audioPorciento === 100) {
				console.log('llegooo');
				$nextBtn.click();
				verificarPausa = true;
			}
		}, 1000);
	};
	$playBtn.addEventListener('click', play);
	$nextBtn.addEventListener('click', musicaSiguiente);
	$repeatSongBtn.addEventListener('click', finalMusica);
	$btnFiles.addEventListener('change', obtenerMusica);
	trackPlayingNow.addEventListener('click', () => console.log(verificarPausa));
	obtenerMusica();
	finalMusica();
	musicaSiguiente();
}
