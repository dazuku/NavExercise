/**
 * Module who control the navbar in desktop
 * @constructor
 * @param {Object} settings - This have the next optional fields:
 * <ul>
 * <li>items: {Array} items of the navbar.
 * <li>container: {Element} container of the navbar.
 * <li>mask: {Elemenl} div of the translucid mask.
 * <li>navbar: {Element} area who the user can't exit of the options.
 * <li>floatMenu: {Element} the Div who show the option of the navbar.
 * </ul>
 *
 * @author - Daniel Camilo Daza Díaz.
 */

var Navbar = function(settings) {
	// Default values
	var DEFAULT_SETTINGS = {
		items: [],
		container: document.getElementById('desktop-nav'),
		mask: document.getElementById('translucid-mask'),
		navbar: document.getElementById('desktop-navbar'),
		floatMenu: document.getElementById('huge-float')
	};

	var _self = this,
		itemSelected = -1,
		config = {
			items: settings && settings.items || DEFAULT_SETTINGS.items,
			container: settings && settings.container || DEFAULT_SETTINGS.container,
			mask: settings && settings.mask || DEFAULT_SETTINGS.mask,
			navbar: settings && settings.navbar || DEFAULT_SETTINGS.navbar,
			floatMenu: settings && settings.floatMenu || DEFAULT_SETTINGS.floatMenu,
			floatMenuList: {},
			uiElements: {},
			selected: '',
		}

	_init();

	var option, optionDiv;

	/**
	 * Function to create a father item and insert in the float-menu
	 * @param {Object} object who represent a option, this have two requireds fields: label and url; and an optional field: items
	 */
	function _createOption(item) {
		option = document.createElement('a');
		option.setAttribute('href', item.url);
		option.setAttribute('id', item.label.replace(/ /g,''))
			//optionDiv = document.createElement('div');
		option.classList.add('option');
		option.innerHTML = item.label;
		//option.appendChild(optionDiv);
		config.container.appendChild(option);
		if (item.items.length > 0) {
			config.uiElements[item.label.replace(/ /g,'')] = option;
		}

		option.addEventListener('click', _onClick);

		for (var j = 0; j < item.items.length; j++) {
			_createSubOption(item.items[j], item.label.replace(/ /g,''));
		}
	}

	/**
	 * Function to create a child item and insert inside in the float-menu
	 * @param {Object} object who represent a option, this have two requireds fields: label and url; and an optional field: items
	 * @param {String} the label of the father
	 */
	function _createSubOption(item, fatherLabel) {
		option = document.createElement('a');
		option.setAttribute('href', item.url);
		optionDiv = document.createElement('li');
		optionDiv.classList.add(fatherLabel);
		optionDiv.classList.add('hide');
		optionDiv.innerHTML = item.label;
		option.appendChild(optionDiv);
		config.floatMenuList.appendChild(option);

		option.addEventListener('click', _onClick);
	}

	/**
	 * Function to initialize variables
	 */
	function _init() {
		var ul;

		if (config.floatMenu && config.floatMenu.firstElementChild && config.floatMenu.firstElementChild.tagName === 'UL') {
			config.floatMenuList = config.floatMenu.firstElementChild;
		} else {
			ul = document.createElement('ul');
			config.floatMenuList = ul;
			config.floatMenu.appendChild(ul);
		}

		config.floatMenu.classList.add('hide');

		for (var i = 0; i < config.items.length; i++) {
			_createOption(config.items[i]);
		}

		config.mask.addEventListener('click', _onClickOutside);
		config.navbar.addEventListener('click', _onClickOutside);
	}


	/**
	 * Function who trigger when click outside the navbar when is activated
	 */
	function _onClickOutside() {
		if (config.selected) {
			config.uiElements[config.selected].classList.remove('active');
		}

		config.floatMenu.classList.add('hide');

		if (config.selected) {
			config.uiElements[config.selected].classList.remove('active');
			items = document.querySelectorAll('.' + config.selected);

			for (i = 0; i < items.length; i++) {
				items[i].classList.add('hide');
			}
		}

		config.selected = '';
		config.mask.classList.remove('mask');
		config.mask.classList.add('no-mask');
	}

	/**
	 * Function who trigger when click in father or child item
	 */
	function _onClick(event) {
		event.stopPropagation();

		var items, i;
		if (!(config.uiElements[event.toElement.id])) {
			window.location.href = 'http://www.hugeinc.com';
			return;
		}

		if (config.selected) {
			config.uiElements[config.selected].classList.remove('active');
			items = document.querySelectorAll('.' + config.selected);

			for (i = 0; i < items.length; i++) {
				items[i].classList.add('hide');
			}
		} else {
			config.mask.classList.add('mask');
			config.mask.classList.remove('no-mask');
		}
		config.uiElements[config.selected = event.toElement.id].classList.add('active');
		items = document.querySelectorAll('.' + config.selected);

		for (i = 0; i < items.length; i++) {
			items[i].classList.remove('hide');
		}

		config.floatMenu.style.left = (event.toElement.offsetLeft + event.toElement.offsetParent.offsetLeft) + 'px';

		config.floatMenu.classList.remove('hide');
	}
};