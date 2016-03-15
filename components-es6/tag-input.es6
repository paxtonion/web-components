(function () {

	'use strict';

	class KpTagInput extends HTMLElement {

		static generateHtml() {

			return `
				<style>

					.input-entry {
						box-sizing: border-box;
						display: flex;
						flex-wrap: wrap;
						max-width: 100%;
						border: 1px solid #000000;
						margin: 0 0 5px 0;
					}

					.input-entry #tags {
						display: inline-block;
						flex-grow: 0;
						align-content: flex-start;
						margin: 0;
						padding: 0;
						list-style: none;
						font-size: 14px;
					}

					.input-entry #tags li {
						display: inline-block;
						flex-grow: 0;
						margin: 0;
						padding: 4px 8px;
						border-right: 1px solid #000000;
						background: #eeeeee;
						color: #000000;
						cursor: default;
					}

					.input-entry #tags li:hover {
						background: #dddddd;
					}

					.input-entry #tags li span.label {
						display: inline-block;
					}

					.input-entry #tags li span.remove {
						display: inline-block;
						vertical-align: middle;
						margin: 0 0 0 5px;
						cursor: pointer;
						font-size: 18px;
						line-height: 14px;
						font-weight: bold;
						opacity: 0.4
					}

					.input-entry #tags li:hover span.remove:hover {
						opacity: 1;
					}

					.input-entry #newTag {
						flex-grow: 1;
						display: inline-block;
						order: 200;
						padding: 6px 8px;
						border: 0;
						outline: none;
						font-size: 14px;
					}
				</style>

				<div class="input-entry">
					<ul id="tags"></ul>
					<input type="text" id="newTag" />
				</div>
			`;
		}

		//noinspection JSUnusedGlobalSymbols
		createdCallback() {

			this.createShadowRoot();
			this.tags = [];
		}

		//noinspection JSUnusedGlobalSymbols
		attachedCallback() {

			this.shadowRoot.innerHTML = this.constructor.generateHtml();

			let $newTagInput = this.shadowRoot.querySelector('#newTag');

			$newTagInput.addEventListener('keydown', e => {

				let newTag = $newTagInput.value;

				// ENTER or TAB
				if (e.keyCode == 13 || e.keyCode == 9) {

					e.preventDefault();

					if ($newTagInput.value) {

						let tags = newTag.split(/[,]/);
						for (let i = 0; i < tags.length; i++) {
							if (tags[i].trim()) {
								this.addTag(tags[i].trim());
							}
						}
					}
					return false;
				}

				// DELETE
				if (e.keyCode == 8) {

					if ($newTagInput.value.length == 0) {

						this.removeTag(this.tags.length - 1);
					}
				}
			});

			this.render();
		}

		addTag(tag) {

			this.tags.push(tag);
			this.render();
		}

		removeTag(index) {

			this.tags.splice(index, 1);
			this.render();
		}

		render() {

			let $tags = this.shadowRoot.querySelector('#tags');
			let $newTagInput = this.shadowRoot.querySelector('#newTag');

			$tags.innerHTML = ``;

			this.tags.forEach((tag, idx) => {

				let $li = document.createElement('li');
				$li.classList.add('tag');

				let $tagLabel = document.createElement('span');
				$tagLabel.classList.add('label');
				$tagLabel.textContent = tag;
				$li.appendChild($tagLabel);

				let $tagRemove = document.createElement('span');
				$tagRemove.innerHTML = '&times;';
				$tagRemove.classList.add('remove');
				$tagRemove.addEventListener('click', () => {
					this.removeTag(idx);
				});
				$li.appendChild($tagRemove);

				$tags.appendChild($li);
			});

			$newTagInput.value = '';
		}

		// API

		//noinspection JSUnusedGlobalSymbols
		set value(value) {

			if (Array.isArray(value)) {
				this.tags = value;
				this.render();
			}

			if (typeof (value) === 'string') {
				this.tags = [value];
				this.render();
			}
		}

		//noinspection JSUnusedGlobalSymbols
		get value() {

			return this.tags;
		}

		//noinspection JSUnusedGlobalSymbols
		clear() {

			this.tags = [];
			this.render();
		}
	}

	document.registerElement('kp-tag-input', KpTagInput);
})();