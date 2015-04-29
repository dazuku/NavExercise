/**
 * Module who control the navbar in phone
 * @constructor
 * @param {Object} settings - This have the next optional fields:
 * <ul>
 * <li>items: {Array} items of the navbar.
 * <li>container: {Element} container of the navbar.
 * <li>mask: {Element} div of the translucid mask.
 * <li>logo: {Element: img} img of the logo.
 * <li>pushItems: {Element} div container of the content of the app.
 * <li>open: {Element} button to open navbar
 * <li>close: {Element} button to close navbar
 * </ul>
 *
 * @author - Daniel Camilo Daza Díaz.
 */

var PhoneNavbar = function(settings) {
	var DEFAULT_SETTINGS = {
		items: [],
		container: document.getElementById('phone-options'),
		mask: document.getElementById('translucid-mask'),
		logo: document.getElementById('phone-logo'),
		pushItems: document.getElementById('push-items'),
		buttons: {
			open: document.getElementById('toggle-open'),
			close: document.getElementById('toggle-close'),
		}
	};

	var _self = this,
		config = {
			items: settings.items || DEFAULT_SETTINGS.items,
			container: settings.container || DEFAULT_SETTINGS.container,
			mask: settings.mask || DEFAULT_SETTINGS.mask,
			logo: settings.logo || DEFAULT_SETTINGS.logo,
			list: {},
			uiElements: {},
			pushItems: settings.pushItems || DEFAULT_SETTINGS.pushItems,
			buttons: {
				open: DEFAULT_SETTINGS.buttons.open,
				close: DEFAULT_SETTINGS.buttons.close
			}
		};

	_init();

	var option, li, img;

	/**
	 * Function to create a child item and insert inside in the float-menu
	 * @param {Object} object who represent a option, this have two requireds fields: label and url; and an optional field: items
	 * @param {String} the label of the father
	 */
	function _createSubOption(item, classOption) {
		option = document.createElement('a');
		option.setAttribute('href', item.url);
		option.setAttribute('id', item.label.replace(/ /g,''));

		li = document.createElement('li');
		li.innerHTML = item.label;
		li.classList.add('subitem');
		li.classList.add('hide');
		li.classList.add(classOption + '-phone');

		option.appendChild(li);
		config.list.appendChild(option);

		option.addEventListener('click', _onOptionClick);
	}

	/**
	 * Function to create a father item and insert in the float-menu
	 * @param {Object} object who represent a option, this have two requireds fields: label and url; and an optional field: items
	 */
	function _createOption(item) {
		option = document.createElement('a');
		option.setAttribute('href', item.url);

		li = document.createElement('li');
		li.innerHTML = item.label;
		if (item.items.length > 0) {
			img = document.createElement('img');
			img.setAttribute('src', 'images/down-arrow.png');
			li.appendChild(img);
			li.classList.add('expandable');
			li.setAttribute('id', item.label.replace(/ /g,'') + '-phone');
			config.uiElements[item.label.replace(/ /g,'') + '-phone'] = option;
		}

		option.appendChild(li);
		config.list.appendChild(option);

		option.addEventListener('click', _onOptionClick);

		for (var i = 0; i < item.items.length; i++) {
			_createSubOption(item.items[i], item.label);
		}
	}

	/**
	 * Function who trigger when user wants to show navbar
	 */
	function _onOpenNavbar(event) {
		config.buttons.close.classList.remove('hide');
		config.container.classList.remove('hide');
		config.logo.classList.remove('hide');

		config.mask.classList.remove('no-mask');
		config.mask.classList.add('mask');

		config.container.classList.remove('push-options-reverse');
		config.container.classList.add('push-options');

		config.pushItems.classList.remove('pushed-reverse');
		config.pushItems.classList.add('pushed');

		config.buttons.close.classList.remove('close-dismiss');
		config.buttons.close.classList.add('close-show');

		config.buttons.open.classList.remove('open-show');
		config.buttons.open.classList.add('open-dismiss');

		config.logo.classList.remove('push-logo-reverse');
		config.logo.classList.add('push-logo');
	}

	/**
	 * Function who trigger when user wants to close navbar
	 */
	function _onCloseNavbar(event) {
		config.mask.classList.add('no-mask');
		config.mask.classList.remove('mask');

		config.container.classList.add('push-options-reverse');
		config.container.classList.remove('push-options');

		config.pushItems.classList.remove('pushed');
		config.pushItems.classList.add('pushed-reverse');

		config.buttons.close.classList.remove('close-show');
		config.buttons.close.classList.add('close-dismiss');

		config.buttons.open.classList.remove('open-dismiss');
		config.buttons.open.classList.add('open-show');

		config.logo.classList.add('push-logo-reverse');
		config.logo.classList.remove('push-logo');
	}

	/**
	 * Function who trigger when click in father or child item
	 */
	function _onOptionClick(event) {
		var items;
		if (config.uiElements[event.toElement.id]) {
			items = document.querySelectorAll('.' + event.toElement.id);
			if (event.toElement.classList.toggle('open')) {
				event.toElement.classList.remove('close');
				for (var i = 0; i < items.length; i++) {
					items[i].classList.remove('hide');
				}
			} else {
				event.toElement.classList.add('close');
				for (var i = 0; i < items.length; i++) {
					items[i].classList.add('hide');
				}
			}
		} else {
			window.location.href = 'http://www.hugeinc.com';
		}
	}

	/**
	 * Function to initialize variables
	 */
	function _init() {
		console.log(config, DEFAULT_SETTINGS);
		if (config.container && config.container.firstElementChild && config.container.firstElementChild.tagName === 'UL') {
			config.list = config.container.firstElementChild;
		} else {
			ul = document.createElement('ul');
			config.list = ul;
			config.container.appendChild(ul);
		}

		config.buttons.open.addEventListener('click', _onOpenNavbar);
		config.buttons.close.addEventListener('click', _onCloseNavbar);
		config.mask.addEventListener('click', _onCloseNavbar);

		for (var i = 0; i < config.items.length; i++) {
			_createOption(config.items[i]);
		}
	}
}