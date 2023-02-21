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

	//Reserve line in header
	var header = document.getElementById('encounterHeader');
	var headerReserve = header.innerHTML;
	header.innerHTML += '<br><br>'

	// $("#encounterHeader").append('<br>');
	// $("#encounterHeader").append($("<div id='headerDemographic1'>"));


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

	const HCN = demoArrayVal[7].replace(/\s/g,'');
	browser.storage.local.set({PHN: HCN});
	// console.log(await browser.storage.local.get({PHN: HCN}))
	// console.log(HCN)
	
	const HCN_First4Digits = HCN.slice(0, 4)
	const HCN_Next3Digits = HCN.slice(4, 7)
	const HCN_Last3Digits = HCN.slice(7)
	const HCNWithSpaces = HCN_First4Digits + " " + HCN_Next3Digits + " " + HCN_Last3Digits;
	const HCType = demoArrayVal[9];

	header.innerHTML = headerReserve
	var headerHomePhone = '<b>Home: </b>' + telLink(demoArrayVal[2]);
	var headerCellPhone = '<b>Cell: </b>' + telLink(demoArrayVal[0]);
	var headerWorkPhone = '<b>Work: </b>' + telLink(demoArrayVal[8]);
	var headerAddress = '<b>Address: </b>' + demoArrayVal[3] + ', ' + demoArrayVal[4] + ', ' + demoArrayVal[5] + " &nbsp; ";
	var headerPHN = '<b>PHN: </b>' + "<span class='copyable'>" + HCNWithSpaces + "</span>" + " &nbsp; ";
	const headerHCType = highlightHealthCardType(HCType);
	var headerExtra2 = 'Age: '
	var headerExtra3 = 'File#: '

	header.innerHTML += (headerHomePhone  +  headerCellPhone  + headerWorkPhone  + headerAddress  + headerPHN + headerHCType + 
		'<br>' +
		'<b>eMail: </b>' + "<span class='copyable'>" + demoArrayVal[1] + "</span>" +
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
		// window.open("https://health.careconnect.ca", "newWindow", target = "_blank");
		window.open("https://health.careconnect.ca");
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
		// document.execCommand('copy');
		navigator.clipboard.writeText(textArea.value);
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
