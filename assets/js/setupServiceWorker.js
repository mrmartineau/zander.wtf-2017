export default () => {
	setupServiceWorker();
}

/**
 * Setup Service Worker
 */
const setupServiceWorker = () => {
	if ('serviceWorker' in navigator) {
		// Attempt to register it
		navigator.serviceWorker.register('/serviceWorker.js').then(() => {
			// Success Message
			console.log('ServiceWorker: 👍');
		}).catch(err => {
			// Error Message
			console.log('ServiceWorker: 👎: ', err);
		})
	}
}
