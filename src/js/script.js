import { leftNavBar } from './modules/left_nav_bar.js';
import { topBar } from './modules/top_bar.js';
import { soundDetails } from './modules/sound_details.js';
import { sound } from './modules/sound.js';

document.addEventListener('DOMContentLoaded', () => {
	leftNavBar();
	topBar();
	soundDetails();
	sound();
});
