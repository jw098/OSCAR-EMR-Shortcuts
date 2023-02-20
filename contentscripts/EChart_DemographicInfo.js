// ==UserScript==
// @name Pagescraper V3 JY eMail, Care Connect, copyable Telephone links
// @namespace Stanscripts
// @description adds demographic details to echart with helpful links
// @include */casemgmt/forward.jsp?action=view&demographic*
// @include  *careconnect*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @grant       GM.setValue
// @grant       GM.getValue
// @version 17.2 Fixed eMAIL for FF ESR 91.3; remove Doxy, eMail, and QuickLinks
// ==/UserScript== 



var demoArrayVal2 = []


async function loadDemographicInfo(){
	// if(window.location.href.indexOf("careconnect") != -1){
	// 	// in CareConnect
	// 	loadPHNToCareConnect();
	// }

	//Reserve line in header
	var header = document.getElementById('encounterHeader');
	var headerReserve = header.innerHTML;
	header.innerHTML += '<br>'

	const demographicArray = [
		'Cell Phone',
		'Email',
		'Phone(H)',
		'Address',
		'City',
		'Postal',
		'Age',
		'Health Ins',
		'Phone(W)'
	]

	const theURL = getMasterDemographicURL();
	const demoArrayVal = await getMeasures2(demographicArray, theURL);
	// console.log(demographicArrayValues);
	// for (j = 0; j < demographicArray.length; j++) {
	// 	// await getMeasures2(demographicArray[j], theURL);
	// 	getMeasures(demographicArray[j]);
	// }
	//alert(demoArrayVal)
	var passPHN = demoArrayVal[7].substr(0, 10);
	// localStorage.setItem("LinkPHN", passPHN); //STORE PHN
	// GM.setValue("LinkPHN", passPHN);
	// console.log(`Saved PHN to GM global values: ${passPHN}`);

	var HCN = demoArrayVal[7]
	res = HCN.slice(0, 4)
	res = res + ' ' + HCN.slice(4, 7)
	res = res + ' ' + HCN.slice(7)
	HCN = res
	header.innerHTML = headerReserve
	var headerExtra1 = 'Cell: '
	var headerExtra2 = 'Age: '
	var headerExtra3 = 'File#: '
	var headerExtra4 = 'PHN: '
	var headerExtra5 = 'Address: '
	var headerExtra6 = 'Work: '
	var headerExtra7 = 'Home: '

	header.innerHTML += (headerExtra7.bold() + telLink(demoArrayVal[2]) +  headerExtra1.bold() + telLink(demoArrayVal[0]) + headerExtra6.bold() + telLink(demoArrayVal[8]) + headerExtra5.bold() + demoArrayVal[3] + ', ' + demoArrayVal[4] + ', ' + demoArrayVal[5] + ' ' + headerExtra4.bold() + "<span class='copyable'>" + HCN + "</span>" 	+
		'<br>' +
		' eMail: '.bold() + "<span class='copyable'>" + demoArrayVal[1] + "</span>" +
		'&nbsp;' + 
		'<a href="mailto:' + demoArrayVal[1] + '<' + demoArrayVal[1] + '>' + '?Subject=Confidential medical information" target="_blank">Send eMail</a>' +
		'&nbsp;&nbsp;' + 

	//	'<button type="button" id="button10">Send email</button>' +
	//	'&nbsp;' + 

	//	'<button type="button" id="button11">Doxy</button>' +
	//	'&nbsp;' + 
	//	'<button type="button" id="button12">Quick Links</button>' +
	//	'&nbsp;' + 
		'<button type="button" id="button13"">Care Connect</button>'
	);


	document.getElementById("button13").onclick = ButtonFunction13;
	document.getElementById("button13").setAttribute('style', 'font-size:10px; color:green;');
	function ButtonFunction13() {
		// window.open("https://health.careconnect.ca?" + passPHN, "newWindow", target = "_blank")
		window.open("https://health.careconnect.ca", "newWindow", target = "_blank")
	}

	var Clipboard=document.createElement("input");
	Clipboard.type="button";
	Clipboard.value="Clipboard:";
	Clipboard.setAttribute("style", "position:absolute; top:32px; left:580px; width:75px; font-size:12px; text-align:center; background-color:pink;");
	document.body.appendChild(Clipboard); 

	$(".copyable").click(function() {
		var textArea = document.createElement("textarea");
		textArea.value = this.innerHTML;
		document.body.appendChild(textArea);
		textArea.select();
		document.execCommand('copy');
		$(this).css('background-color', 'pink')
		textArea.setAttribute('style', 'position:absolute; top:32px; left:660px; width:250px; height:20px; font-size:13px; resize:none;');
		textArea.setAttribute('title', 'Clipboard');
	//	textArea.remove();  // to hide text area
	})


	// $('#enTemplate').width("160px"); //widens search field

}

function getMasterDemographicURL(){
	var elements = (window.location.pathname.split('/', 2))
	const firstElement = (elements.slice(1))
	const vPath = ('https://' + location.host + '/' + firstElement + '/')
	// const vPath = '../'
	var myParam = location.search.split('demographicNo=')[1]
	var res = myParam.indexOf('&')

	var pathArray = window.location.pathname.split('/');
	var demo_no = myParam.substring(0, res);
	var newURL = vPath + '/demographic/demographiccontrol.jsp?demographic_no=' + demo_no + '&displaymode=edit&dboperation=search_detail';

	console.log(newURL);
	return newURL;
}

function loadPHNToCareConnect(){
	(async () => {
		var phn = await GM.getValue("LinkPHN");
		if (phn != undefined) {
		  console.log("Filled PHN from GM global value");
		  $('#search').val(phn);
	  }
	  })();
}

async function getMeasures2(demographicArray, URL){
	const otherPageXMLText = await getXMLHTTP(URL);
	const str = otherPageXMLText;
	// const otherPageHTML = new DOMParser().parseFromString(otherPageXMLText, "text/html");

	let demoArrayValues = [];
	for (let i = 0; i < demographicArray.length; i++){
		const measure = demographicArray[i];

		switch (measure) {
			case "Phone(H)":
				var myReString = '<span class="label">[\n\r\t]*\s*' + 'Phone' + '[(][' + 'H' + '][)]' + '(.|[\n])*'
				break;
			case "Phone(W)":
				var myReString = '<span class="label">[\n\r\t]*\s*' + 'Phone' + '[(][' + 'W' + '][)]' + '(.|[\n])*'
				break;
			default:
				var myReString = '<span class="label">[\n\r\t]*\s*' + measure + '(.|[\n])*'
		}
	
		var myRe = new RegExp(myReString, 'g');
		var myArray
		while ((myArray = myRe.exec(str)) !== null) {
			const y = myArray.toString()
			//alert(y)
			var z = y.indexOf('info')
			var mycode = y.substring(z + 6)
			var mycode2 = mycode.indexOf('</span>')
			var mycode3 = mycode.substring(mycode + 9, mycode2) //alert(j+measure + ' is ' + mycode3)
			demoArrayValues.push(mycode3);
		}
		
	}
	
	return demoArrayValues;
}

function getMeasures(measure) {
	xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			//alert(xmlhttp.responseText)
			//var str = xmlhttp.responseText.replace(/\s/g, '')
			var str = xmlhttp.responseText
			if (!str) {
				return;
			}

			switch (measure) {
				case "Phone(H)":
					var myReString = '<span class="label">[\n\r\t]*\s*' + 'Phone' + '[(][' + 'H' + '][)]' + '(.|[\n])*'
					break;
				case "Phone(W)":
					var myReString = '<span class="label">[\n\r\t]*\s*' + 'Phone' + '[(][' + 'W' + '][)]' + '(.|[\n])*'
					break;
				default:
					var myReString = '<span class="label">[\n\r\t]*\s*' + measure + '(.|[\n])*'
			}

			var myRe = new RegExp(myReString, 'g');
			var myArray
			while ((myArray = myRe.exec(str)) !== null) {
				y = myArray.toString()
				//alert(y)
				var z = y.indexOf('info')
				var mycode = y.substring(z + 6)
				var mycode2 = mycode.indexOf('</span>')
				var mycode3 = mycode.substring(mycode + 9, mycode2) //alert(j+measure + ' is ' + mycode3)
				demoArrayVal2[j] = mycode3
			}
		}
	}
	xmlhttp.open('GET', getMasterDemographicURL(), false);
	xmlhttp.send();
}

function telLink(number){
	var numberl = number.replace(/\D/g,'');
	var l = "<a href='tel:9"+numberl+"'><span class='copyable'>"+number+"</span></a> &nbsp; ";
	return l;
}

