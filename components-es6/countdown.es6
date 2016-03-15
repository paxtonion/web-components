(function() {

	'use strict';

	class KpCountdown extends HTMLElement {

		static generateHtml() {

			return `
				<style>
					.countdown {
						margin: 0 0 5px 0;
					}
				</style>

				<div class="countdown">
					<div>Time remaining until <span id="target-date"></span></div>
					<div id="time-remaining"></div>
				</div>
			`;
		}

		//noinspection JSUnusedGlobalSymbols
		createdCallback() {

			this.createShadowRoot();
			this.targetDate = null;
		}

		//noinspection JSUnusedGlobalSymbols
		attachedCallback() {

			this.shadowRoot.innerHTML = this.constructor.generateHtml();
			this.parseTargetDate();
		}

		//noinspection JSUnusedGlobalSymbols
		attributeChangedCallback() {

			this.parseTargetDate();
		}

		parseTargetDate() {

			let attrValue = this.getAttribute('target');
			if (attrValue != null) {
				this.targetDate = new Date(attrValue);
			}
			this.render();
		}

		render() {
			
			if (this.targetDate != null) {

				let $targetDate = this.shadowRoot.querySelector('#target-date');
				$targetDate.textContent = this.targetDate.toLocaleString();

				this.updateCountdown();
			}
		}

		updateCountdown() {

			let now = new Date();
			let diff = Math.floor((this.targetDate - now) / 1000);

			let $timeRemaining = this.shadowRoot.querySelector('#time-remaining');

			if (diff > 0) {
				$timeRemaining.textContent = diff + ' second(s)';
				setTimeout(() => this.updateCountdown(), 1000);
			}
			else {
					$timeRemaining.textContent = 'The time has arrived!';
			}
		}
	}

	document.registerElement('kp-countdown', KpCountdown);
})();