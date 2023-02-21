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

loadPHNToCareConnect();
async function loadPHNToCareConnect(){
	const PHNObject = await browser.storage.local.get("PHN");
	const PHN = PHNObject.PHN;
	console.log(PHN);
	if(PHN != undefined){
		console.log("Filled PHN from local storage");
		$('#search').val(PHN);
	}
}