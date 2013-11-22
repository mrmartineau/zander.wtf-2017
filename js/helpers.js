// ==================
// === HELPERS.js ===
// ==================

// Array Remove - By John Resig (MIT Licensed)
// http://ejohn.org/blog/javascript-array-remove/
if ( !Array.prototype.remove ) {
	Array.prototype.remove = function(from, to) {
		var rest = this.slice((to || from) + 1 || this.length);
		this.length = from < 0 ? this.length + from : from;
		return this.push.apply(this, rest);
	};
}

// Get/Set CSS styles with ease
function styler(el) {
	return {
		/* Get CSS style
		 * @prop : String - CSS property name e.g 'width', 'height'
		 * @int  : Boolean
		 */
		get : function(prop, int) {
			/* TODO:
			 * Get multiple CSS properties. prop could be comma separated list
			 * Allow get all css values
			 * Throw errors when args not in correct format
			 */
			var int = int || false;

			if (int === true) {
				return parseInt(window.getComputedStyle(el, null).getPropertyValue(prop), 10);
			} else{
				return window.getComputedStyle(el, null).getPropertyValue(prop);
			}
		},

		/* Set CSS style
		 * @prop : String - CSS property name e.g 'width', 'height'
		 * @val  : String - CSS property value e.g. '200px'
		 */
		set : function(prop, val) {
			/* TODO:
			 * Set multiple CSS properties. prop could be comma separated list
			 * Throw errors when args not in correct format
			 */
			return el.style[prop] = val;
		}
	};
};