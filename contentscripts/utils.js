function keybindingMatches(keybinding1, keybinding2){
	// if(isEmptyKeybinding(keybinding1)){
	// 	// console.log("empty1");
	// 	keybinding1 = returnEmptyKeybinding();
	// }

	// if(isEmptyKeybinding(keybinding2)){
	// 	// console.log("empty2");
	// 	keybinding2 = returnEmptyKeybinding();
	// }

	return keybinding1.ctrlKey == keybinding2.ctrlKey 
		&& keybinding1.altKey == keybinding2.altKey
		&& keybinding1.shiftKey == keybinding2.shiftKey
		&& keybinding1.key == keybinding2.key;
}

// return true if the given keybinding is empty
function isEmptyKeybinding(keybinding){
	// console.log(keybinding);
	// console.log(keybinding.ctrlKey);
	// (keybinding == "") || (keybinding == null) || (typeof keybinding == "undefined")
	console.assert((typeof keybinding.ctrlKey != "undefined"));
	return (keybinding.ctrlKey == false
		&& keybinding.altKey == false
		&& keybinding.shiftKey == false
		&& keybinding.key == "");
}

// return true if the given keybinding is empty
function isInvalidKeybinding(keybinding){
	// console.log(keybinding);
	return (keybinding == "") || (keybinding == null) || (typeof keybinding == "undefined")
	|| (keybinding.ctrlKey == false
		&& keybinding.altKey == false
		&& keybinding.shiftKey == false
		&& keybinding.key == "");
}

function returnEmptyKeybinding(){
	return {
	  ctrlKey: false,
	  shiftKey: false,
	  altKey: false,
	  key: ''
	};
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