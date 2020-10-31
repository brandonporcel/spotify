import { soundDetails } from './modules/sound_details.js';
import { sound } from './modules/sound.js';
import { topBar } from './modules/top_bar.js';

document.addEventListener('DOMContentLoaded', () => {
	soundDetails();
	sound();
	topBar();
});
