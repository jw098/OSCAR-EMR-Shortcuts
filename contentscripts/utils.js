function keybindingMatches(keybinding, theEvent){
	return keybinding.ctrlKey == theEvent.ctrlKey 
		&& keybinding.altKey == theEvent.altKey
		&& keybinding.shiftKey == theEvent.shiftKey
		&& keybinding.key == theEvent.key;
}

/*
- returns a promise that returns the xmlhttp response text
*/
function getXMLHTTP(theURL){
	let myPromise = new Promise(function (resolve, reject){
		let xmlhttp = new XMLHttpRequest();
		xmlhttp.open("GET", theURL, true);
		
		xmlhttp.onload = function(){
			if (xmlhttp.status == 200) {
				resolve(xmlhttp.responseText);
      		} 
			else {
				reject(new Error("File not Found"));
      		}
		};
		xmlhttp.onerror = function () {
			reject(new Error("File not Found"));
		};
		xmlhttp.send();
	});

	return myPromise;
}