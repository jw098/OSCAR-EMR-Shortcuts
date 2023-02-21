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
		'Phone(W)',
		'Health Card Type'
	]

	const theURL = getMasterDemographicURL();
	const demoArrayVal = await getDemographicInfo(demographicArray, theURL);

	var passPHN = demoArrayVal[7].substr(0, 10);
	// localStorage.setItem("LinkPHN", passPHN); //STORE PHN
	// GM.setValue("LinkPHN", passPHN);
	// console.log(`Saved PHN to GM global values: ${passPHN}`);

	const HCType = demoArrayVal[9];
	console.log(HCType)
	var HCN = demoArrayVal[7].trim();
	console.log(HCN)
	res = HCN.slice(0, 4)
	res = res + ' ' + HCN.slice(4, 7)
	res = res + ' ' + HCN.slice(7)
	HCN = res
	header.innerHTML = headerReserve
	var headerHomePhone = '<b>Home: </b>' + telLink(demoArrayVal[2]);
	var headerCellPhone = '<b>Cell: </b>' + telLink(demoArrayVal[0]);
	var headerWorkPhone = '<b>Work: </b>' + telLink(demoArrayVal[8]);
	var headerAddress = '<b>Address: </b>' + demoArrayVal[3] + ', ' + demoArrayVal[4] + ', ' + demoArrayVal[5] + " &nbsp; ";
	var headerPHN = '<b>PHN: </b>' + "<span class='copyable'>" + HCN + "</span>" + " &nbsp; ";
	const headerHCType = highlightHealthCardType(HCType);
	var headerExtra2 = 'Age: '
	var headerExtra3 = 'File#: '

	header.innerHTML += (headerHomePhone  +  headerCellPhone  + headerWorkPhone  + headerAddress  + headerPHN + headerHCType + 
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


	document.getElementById("button13").onclick = openCareConnect;
	document.getElementById("button13").setAttribute('style', 'color:green;'); //font-size:10px; 
	function openCareConnect() {
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
		$(this).css('background-color', '#c1a7f1');
		textArea.setAttribute('style', 'position:absolute; top:32px; left:660px; width:150px; height:20px; font-size:13px; resize:none;');
		textArea.setAttribute('title', 'Clipboard');
	//	textArea.remove();  // to hide text area
	})


	// $('#enTemplate').width("160px"); //widens search field

}

function highlightHealthCardType(HCType){
	if (HCType == "OT" || HCType == "US"){
		return `<span id='hcType' style='background-color: #da4d4d'><b>HC Type: ${HCType}</b></span>` ;
	}
	else {
		return `<span id='hcType'><b>HC Type: </b>${HCType}</span>`;
	}
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




async function getDemographicInfo(demographicArray, URL){
	const otherPageXMLText = await getXMLHTTP(URL);
	// const str = otherPageXMLText;
	const otherPageHTML = new DOMParser().parseFromString(otherPageXMLText, "text/html");

	let demoArrayValues = [];
	for (let i = 0; i < demographicArray.length; i++){
		const measureKey = demographicArray[i];
		const measureHTMLKey = otherPageHTML.evaluate(`//span[contains(.,'${measureKey}')]`,otherPageHTML,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
		
		const measureHTMLVal = measureHTMLKey.nextElementSibling;
		const measureVal = measureHTMLVal.innerText;
		demoArrayValues.push(measureVal);

		// console.log(measureVal);

		// switch (measureKey) {
		// 	case "Phone(H)":
		// 		var myReString = '<span class="label">[\n\r\t]*\s*' + 'Phone' + '[(][' + 'H' + '][)]' + '(.|[\n])*'
		// 		break;
		// 	case "Phone(W)":
		// 		var myReString = '<span class="label">[\n\r\t]*\s*' + 'Phone' + '[(][' + 'W' + '][)]' + '(.|[\n])*'
		// 		break;
		// 	default:
		// 		var myReString = '<span class="label">[\n\r\t]*\s*' + measureKey + '(.|[\n])*'
		// }
	
		// var myRe = new RegExp(myReString, 'g');
		// var myArray
		// while ((myArray = myRe.exec(str)) !== null) {
		// 	const y = myArray.toString()
		// 	var z = y.indexOf('info')
		// 	var mycode = y.substring(z + 6)
		// 	var mycode2 = mycode.indexOf('</span>')
		// 	var mycode3 = mycode.substring(mycode + 9, mycode2) //alert(j+measure + ' is ' + mycode3)
		// 	console.log(mycode3);
		// 	demoArrayValues.push(mycode3);
		// }
		
	}
	
	return demoArrayValues;
}

function telLink(number){
	console.log(number.trim());
	if(number.trim() == ""){
		return "&nbsp;".repeat(20);
	}
	else {
		const numberl = number.replace(/\D/g,'');
		const l = "<a href='tel:9"+numberl+"'><span class='copyable'>"+number+"</span></a> &nbsp; ";
		return l;
	}

}

