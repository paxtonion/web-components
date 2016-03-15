(function () {

	'use strict';

	class KpStarRater extends HTMLElement {

		static generateHtml() {

			return `
				<style>

					.star-rater {
						display: block;
						margin: 0 0 5px 0;
					}

					.star-rater #stars {
						list-style-type: none;
						margin: 0;
						padding: 0;
					}

					.star-rater #stars li.star {
						display: inline-block;
						margin: 0;
						padding: 0;
						width: 32px;
						height: 32px;
						cursor: pointer;
						background: url('data:image/png;base64,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');
						background-size: 32px 32px;
					}

					.star-rater #stars li.star:not(:first-child) {
						margin: 0 0 0 5px;
					}

					.star-rater #stars li.star.filled {
						background-image: url('data:image/png;base64,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');
					}

				</style>

				<div class="star-rater">
					<ul id="stars"></ul>
				</div>
			`;
		}

		//noinspection JSUnusedGlobalSymbols
		createdCallback() {

			this.createShadowRoot();
			this.rating = null;
		}

		//noinspection JSUnusedGlobalSymbols
		attachedCallback() {

			this.shadowRoot.innerHTML = this.constructor.generateHtml();
			this.handleMaxRating();
		}

		//noinspection JSUnusedGlobalSymbols
		attributeChangedCallback() {

			this.handleMaxRating();
		}

		handleMaxRating() {

			var maxRating = parseInt(this.getAttribute('max-rating'), 10);

			if (isNaN(maxRating)) {
				maxRating = 5;
			}

			this.maxRating = maxRating;
			this.render();
		}

		raiseEvent(eventName) {

			let e = new CustomEvent(eventName);
			this.dispatchEvent(e);
		}

		render() {

			let $stars = this.shadowRoot.querySelector('#stars');
			$stars.innerHTML = ``;

			for (let idx = 1; idx <= this.maxRating; idx++) {
				let $star = document.createElement('li');
				$star.classList.add('star');

				if (this.rating && idx <= this.rating) {
					$star.classList.add('filled');
				}

				$star.addEventListener('click', () => {
					this.value = idx;
				});

				$stars.appendChild($star);
			}
		}

		// API

		//noinspection JSUnusedGlobalSymbols
		get value() {

			return this.rating || 0;
		}

		//noinspection JSUnusedGlobalSymbols
		set value(value) {

			if (value != this.rating) {

				this.rating = value;
				this.render();

				this.raiseEvent('change');
			}
		}
	}

	document.registerElement('kp-star-rater', KpStarRater);
})();