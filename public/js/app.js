(function() {
	var http = new XMLHttpRequest();
	var navbar, phoneNavbar, items;

	http.onreadystatechange = function() {
		if(http.readyState == 4 && http.status == 200) {
			console.log(JSON.parse(http.responseText).items);

			items = JSON.parse(http.responseText).items;
			navbar = new Navbar({
				items: items
			});

			phoneNavbar = new PhoneNavbar({
				items: items
			});
		}
	};

	http.open('GET', '/api/nav.json', true);
	http.send();
})();