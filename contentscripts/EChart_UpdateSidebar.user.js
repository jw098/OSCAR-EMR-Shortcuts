// ==UserScript==
// @name           EChart_UpdateSidebar
// @namespace      oscar
// @include        */casemgmt/forward.jsp?action=view&*
// @description		Within the E-chart: Update the sidebar with newly created eForms, Consults, Ticklers, Medications when posted.
// @require   https://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @grant	   none
// ==/UserScript==


/////////////////////////////////////////////////////
// Focus Event Listener
/////////////////////////////////////////////////////

function updateAllSidebarOnFocusChange(){
	window.addEventListener("focus", function(event) { 
		setTimeout(updateEFormSidebar, 1000);
		setTimeout(updateConsultationsSidebar, 1000);
		setTimeout(updateMedicationsSidebar, 1000);
		setTimeout(updateTicklerSidebar, 1000);
		setTimeout(updateFormsSidebar, 1000);
		// console.log("window has focus ");
	  }, false);
}


/////////////////////////////////////////////////////
// Insert Block
/////////////////////////////////////////////////////

function addPostedEFormsBlock(){
	// if the postedItemsBlock exists, don't create another one.
	if (!!document.getElementById('postedEFormsBlock')){  
		return;
	}

	var targetDiv = document.getElementById('eformslist');
	var theBlock = document.createElement('div');
	theBlock.id = "postedEFormsBlock";
	theBlock.className = 'links';
	targetDiv.before(theBlock);
}

function addPostedConsultsBlock(){
	// if the postedItemsBlock exists, don't create another one.
	if (!!document.getElementById('postedConsultsBlock')){  
		return;
	}
	var targetDiv = document.getElementById('consultationlist');
	
	var theBlock = document.createElement('div');
	theBlock.id = "postedConsultsBlock";
	theBlock.className = 'links';
	targetDiv.before(theBlock);
}

function addPostedMedsBlock(){
	// if the postedItemsBlock exists, don't create another one.
	if (!!document.getElementById('postedMedsBlock')){  
		return;
	}
	var targetDiv = document.getElementById('Rxlist');
	
	var theBlock = document.createElement('div');
	theBlock.id = "postedMedsBlock";
	theBlock.className = 'links';
	targetDiv.before(theBlock);
}

function addPostedTicklersBlock(){

	// if the postedItemsBlock exists, don't create another one.
	if (!!document.getElementById('postedTicklersBlock')){  
		return;
	}
	var targetDiv = document.getElementById('ticklerlist');
	var theBlock = document.createElement('div');
	theBlock.id = "postedTicklersBlock";
	theBlock.className = 'links';
	targetDiv.before(theBlock);

}

function addPostedFormsBlock(){

	// if the postedItemsBlock exists, don't create another one.
	if (!!document.getElementById('postedFormsBlock')){  
		return;
	}
	var targetDiv = document.getElementById('formslist');
	var theBlock = document.createElement('div');
	theBlock.id = "postedFormsBlock";
	theBlock.className = 'links';
	targetDiv.before(theBlock);

}

/////////////////////////////////////////////////////
// Buttons, Click Even Listener
/////////////////////////////////////////////////////


// addButtonLoadPostedEForm();
 // wrap in block level element so button is next line.
 function addButtonLoadPostedEForm(){
	let targetDiv = document.getElementById('leftNavBar');
	
	var inputButton = document.createElement('input');
	inputButton.id = 'loadPostedEForm';
	inputButton.type = 'button';
	inputButton.value = 'Load Posted eForms';
	targetDiv.appendChild(inputButton);	
	loadPostedEFormButton_KeydownListener();
}
 
function loadPostedEFormButton_KeydownListener(){
  var theButton = document.getElementById('loadPostedEForm');
  if (theButton == null){
	console.log("Load Posted eForm buttons doesn't exist.");
	return;
  }
  theButton.addEventListener('click',function () { updateEFormSidebar(); },true);
}

/////////////////////////////////////////////////////
// Update eForm Sidebar
/////////////////////////////////////////////////////

/*
NOTE
- adds the forms that were posted today to the sidebar.
- for forms posted today that are already listed in the sidebar, these will be shown instead of my version.
*/
async function updateEFormSidebar() {
	const otherPageXMLText = await getXMLHTTP(urlAddedEForms());
	const otherPageHTML = new DOMParser().parseFromString(otherPageXMLText, "text/html");
	const postedItemsNodeList = otherPageHTML.querySelectorAll(".elements > tbody:nth-child(1) > tr"); 
	const postedItemsTodayList = findEFormsPostedToday(postedItemsNodeList);

	console.log('----eforms----');
	console.log(postedItemsTodayList);

	addPostedEFormsBlock();

	$("#postedEFormsBlock").html("");
	$("#postedEFormsBlock").append(eFormsObjectListToHTML(postedItemsTodayList));


}

// function removeEChartEFormsPostedToday(){
// 	const eChartPostedTodayEFormsNodeList = $("#eformslist > li > span > a:contains('" + todayDateDDMMMYYYY() + "')");

// 	for (i = 0; i < eChartPostedTodayEFormsNodeList.length; i++){
// 		eFormPostedTodayInEChart = eChartPostedTodayEFormsNodeList[i].parentNode.parentNode;
// 		// console.log(eFormPostedTodayInEChart);
// 		eFormPostedTodayInEChart.remove();
// 	}
//     // console.log(eChartPostedTodayEFormsNodeList);
// }

/*
PURPOSE:
- given list of objects with properties URL, eFormTitle, addedInfo, date, produce HTML that produces links to the eForms in question.
*/
function eFormsObjectListToHTML(eFormsObjectList){
	let htmlResult = "";
	// eFormsObjectList.length
	for (let i = 0; i < eFormsObjectList.length; i++){
		eFormObject = eFormsObjectList[i];
		// console.log(eFormObject);

		htmlResult += 
		`<li style="overflow: hidden; clear:both; position:relative; display:block; white-space:nowrap; ">
			<a border="0" style="text-decoration:none; width:7px; z-index: 100; background-color: white; position:relative; margin: 0px; padding-bottom: 0px;  vertical-align: bottom; display: inline; float: right; clear:both;"><img id="imgeformsZ`+ i + `" src="/oscar/images/clear.gif">&nbsp;&nbsp;</a>
			<span style=" z-index: 1; position:absolute; margin-right:10px; width:90%; overflow:hidden;  height:1.5em; white-space:nowrap; float:left; text-align:left; ">
			<a class="links" style="" onmouseover="this.className='linkhover'" onmouseout="this.className='links'" href="#" onclick = "window.open('` + eFormObject.URL + `', '_blank', 'scrollbars=yes,status=yes');return false;" title="` + eFormObject.addedInfo + `">` + 
			eFormObject.eFormTitle + ': ' + eFormObject.addedInfo + 
			`</a>
			</span>
			<span style="z-index: 100; background-color: white; overflow:hidden;   position:relative; height:1.5em; white-space:nowrap; float:right; text-align:right;">
			...<a class="links" style="margin-right: 2px;" onmouseover="this.className='linkhover'" onmouseout="this.className='links'" href="#" onclick = "window.open('`+ eFormObject.URL + `', '_blank', 'scrollbars=yes,status=yes');return false;" title="` + eFormObject.addedInfo + `">` 
			+ eFormObject.date + `			
			</a>
			</span>
		</li>`
	}
	// console.log(htmlResult);
	return htmlResult;
}


/*
PURPOSE:
- takes the node list and outputs objects describing each eForm, with URL, title, Additional Info, and date.
- only outputs objects with eforms that match today's date.
NOTE:
- avoid posting items already posted in eChart. If item from other page matches FDID of first element in eChart, then stop. Assumes that eForms are sorted by date.
*/
function findEFormsPostedToday(postedEFormsNodeList){
	//console.log(postedEFormsNodeList);

	const firstEChartEFormFDID = getFirstEChartEFormFDID();
	let postedEFormsObjectList = [];
	for (let i=1; i < postedEFormsNodeList.length; i++){
		currentTableRow = postedEFormsNodeList[i]; 
		currentTableDataList = currentTableRow.children;
		// console.log(currentTableDataList);
		if (currentTableDataList[0].innerText == "No data!"){
			break;
		}

		const currentRowData = HTMLNodeListToInnerHTMLList(currentTableDataList);
		// console.log(currentRowData);

		const nodeFDID = getFDID(currentRowData); 
		const nodeDate = getEFormDate(currentRowData);
		// console.log(nodeFDID);
		// console.log(nodeDate);
		
		/*
		- stops when the eForm date doesn't match today's date. assumes dates are sorted.
		- also stops if eForm from other page matches FDID of first eForm in eChart.
		*/
		if (!isToday(nodeDate) || firstEChartEFormFDID == nodeFDID){
			break;
		}

		const nodeURL = getEFormURL(currentRowData); 
		const nodeEFormTitle = getEFormTitle(currentRowData);
		const nodeAddedInfo = currentRowData[2];

		const postedEFormObject = {
			URL: nodeURL,
			eFormTitle: nodeEFormTitle,
			addedInfo: nodeAddedInfo,
			date: nodeDate
		}
		postedEFormsObjectList.push(postedEFormObject);
		// console.log(nodeURL);
		// console.log(nodeAddedInfo);
		// console.log(nodeDate);
	}
	return postedEFormsObjectList;
}

// list(string) -> string
function getEFormURL(currentRowData){
	for (text of currentRowData){
		if (text.includes("fdid=")){
			return getURLOrigin() + 'eform/'+ text.split("\'")[1];
		}
	}
	throw new Error("Can't find FDID within the eform list row data.");
}

// list(string) -> string
function getEFormTitle(currentRowData){
	for (text of currentRowData){
		if (text.includes("fdid=")){
			return text.split(">\n")[1].split("</")[0].trim();
		}
	}
	throw new Error("Can't find FDID within the eform list row data.");
}

// list(string) -> string
function getEFormDate(currentRowData){
	for (text of currentRowData){
		if (isDate(text)){
			return text;
		}
	}
	throw new Error("Can't find Date within the eform list row data.");
}



// list(string) -> string
function getFDID(currentRowData){
	for (text of currentRowData){
		if (text.includes("fdid=")){
			return text.split("fdid=")[1].split("&")[0];
		}
	}
	throw new Error("Can't find FDID within the eform list row data.");
}
 // list(HTML nodes) -> list(String)
function HTMLNodeListToInnerHTMLList(htmlNodes){
	let textDataList = [];
	for (node of htmlNodes){
		textDataList.push(node.innerHTML);
	}
	return textDataList;
}

 // list(HTML nodes) -> list(String)
 function HTMLNodeListToInnerTextList(htmlNodes){
	let textDataList = [];
	for (node of htmlNodes){
		textDataList.push(node.innerText);
	}
	return textDataList;
}

function getFirstEChartEFormFDID(){
	const eChartEFormList = $("#eformslist > li > span:nth-child(2) > a:nth-child(1)"); 
	// console.log(eChartEFormList[0].outerHTML);
	if (eChartEFormList.length == 0){
		return null;
	}
	else {
		const firstFDID = eChartEFormList[0].outerHTML.split("fdid=")[1].split("&")[0];
		console.log(firstFDID);
		return firstFDID;	
	}
	
}


/////////////////////////////////////////////////////
// Update Consultations Sidebar
/////////////////////////////////////////////////////

/*
NOTE
- adds the consultations that were posted today to the sidebar.
- for consultations posted today that are already listed in the sidebar, these will be shown instead of my version.
*/
async function updateConsultationsSidebar() {
	const otherPageXMLText = await getXMLHTTP(urlAddedConsults());
	const otherPageHTML = new DOMParser().parseFromString(otherPageXMLText, "text/html");
	const postedItemsNodeList = otherPageHTML.querySelectorAll(".MainTableRightColumn > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr"); 
	const postedItemsTodayList = findConsultsPostedToday(postedItemsNodeList);

	console.log('---consults---');
	console.log(postedItemsTodayList);

	addPostedConsultsBlock();
	
	$("#postedConsultsBlock").html("");
	$("#postedConsultsBlock").append(consultsObjectListToHTML(postedItemsTodayList));
	


}



// function removeEChartConsultsPostedToday(){
// 	const eChartPostedTodayEFormsNodeList = $("#eformslist > li > span > a:contains('" + todayDateDDMMMYYYY() + "')");

// 	for (i = 0; i < eChartPostedTodayEFormsNodeList.length; i++){
// 		eFormPostedTodayInEChart = eChartPostedTodayEFormsNodeList[i].parentNode.parentNode;
// 		// console.log(eFormPostedTodayInEChart);
// 		eFormPostedTodayInEChart.remove();
// 	}
//     // console.log(eChartPostedTodayEFormsNodeList);
// }

/*
PURPOSE:
- given list of objects with properties URL, eFormTitle, addedInfo, date, produce HTML that produces links to the eForms in question.
*/
function consultsObjectListToHTML(itemsObjectList){
	let htmlResult = "";
	// itemsObjectList.length
	for (let i = 0; i < itemsObjectList.length; i++){
		itemObject = itemsObjectList[i];
		// console.log(itemObject);

		htmlResult += 

		`<li style="overflow: hidden; clear:both; position:relative; display:block; white-space:nowrap; ">
			<a border="0" style="text-decoration:none; width:7px; z-index: 100; background-color: white; position:relative; margin: 0px; padding-bottom: 0px;  vertical-align: bottom; display: inline; float: right; clear:both;"><img id="imgconsultationZ`+ i + `" src="/oscar/images/clear.gif">&nbsp;&nbsp;</a>
			<span style=" z-index: 1; position:absolute; margin-right:10px; width:90%; overflow:hidden;  height:1.5em; white-space:nowrap; float:left; text-align:left; ">
			<a class="links" style="" onmouseover="this.className='linkhover'" onmouseout="this.className='links'" href="#" onclick = "window.open('` + itemObject.URL + `', '_blank', 'height=700,width=800,scrollbars=yes,status=yes');return false;" title="` + itemObject.itemTitle + " " +itemObject.date + '&#10;Requesting Physician: Dr. ' + itemObject.requestingDoc + `">` + 
			itemObject.itemTitle + 
			`</a>
			</span>
			<span style="z-index: 100; background-color: white; overflow:hidden;   position:relative; height:1.5em; white-space:nowrap; float:right; text-align:right;">
			...<a class="links" style="margin-right: 2px;" onmouseover="this.className='linkhover'" onmouseout="this.className='links'" href="#" onclick = "window.open('`+ itemObject.URL + `', '_blank', 'height=700,width=800,scrollbars=yes,status=yes');return false;" title="` + itemObject.itemTitle + " " +itemObject.date + '&#10;Requesting Physician: Dr. ' + itemObject.requestingDoc + `">` 
			+ itemObject.date + `			
			</a>
			</span>
		</li>`
	}
	// console.log(htmlResult);
	return htmlResult;
}


/*
PURPOSE:
- takes the node list and outputs objects describing each item, with Service, referral date.
- only outputs objects with items that match today's date.
*/
function findConsultsPostedToday(postedItemNodeList){
	let postedItemObjectList = [];
	for (let i=1; i < postedItemNodeList.length; i++){
		currentNode = postedItemNodeList[i];
		nodeChildren = currentNode.children;
		// console.log(nodeChildren);
		const currentRowInnerHTML = HTMLNodeListToInnerHTMLList(currentNode.children);
		const currentRowText = HTMLNodeListToInnerTextList(currentNode.children);
		// console.log(currentRowInnerHTML);
		// console.log(currentRowText);

		const nodeURLInnerHTML = currentRowInnerHTML[1]; //nodeChildren[1].children[0].outerHTML;
		/*
		- gets the URL portion of the HTML in the <a> element, by using split("\'"). and selecting the item at index 1.
		- then removes the "../.." with substring(6)
		- then replaces &amp; with &
		*/
		const nodeURL = getURLOrigin() + nodeURLInnerHTML.split("\'")[1].substring(6).replace(/&amp;/g, "&");
		const nodeServiceRequested = currentRowText[3].replace(/[\r\n\t]/g, ""); // nodeChildren[3].children[0].innerText.replace(/[\r\n\t]/g, "");
		const nodeRequestingDoc = currentRowText[2]; // nodeChildren[2].textContent;
		const nodeDate = currentRowText[4]; // nodeChildren[4].textContent;
		const nodeReqID = nodeURL.split("requestId=")[1].split("&")[0];
		// console.log(nodeURL);
		// console.log(nodeServiceRequested);
		// console.log(nodeRequestingDoc);
		// console.log(nodeDate);
		
		/*
		- stops when the consult date doesn't match today's date. assumes dates are sorted (which they are, but are unfortunately sorted in reverse order within a given day)
		*/
		if (!isToday(nodeDate)){
			break;
		}
		/*
		- if consult from other page matches reqID of any posted consult in the eChart, move onto next item.		
		*/
		if (isMatchingConsultReqID(nodeReqID)){
			continue;
		}

		const postedItemObject = {
			URL: nodeURL,
			itemTitle: nodeServiceRequested,
			// consultantDoc: nodeConsultantDoc,
			requestingDoc: nodeRequestingDoc,
			date: nodeDate
		}

		console.log(postedItemObject);
		postedItemObjectList.push(postedItemObject);
	}
	return postedItemObjectList;
}


/*
- returns true if given otherPageReqID matches any of the reqID in the consult list in the eChart.
NOTES
- limits to checking only a max of 10 of posted eChart consults. 10 submitted consults in one day should be more than enough. 
*/
function isMatchingConsultReqID(otherPageReqID){
	const eChartConsultListReqIDs = $("#consultationlist > li > span:nth-child(2) > a:nth-child(1)"); 
	// console.log(firstEChartConsultReqID[0].outerHTML);
	for (i = 0; i < Math.min(eChartConsultListReqIDs.length, 10); i++){
		eChartConsultReqID = eChartConsultListReqIDs[i];
		const reqID = eChartConsultReqID.outerHTML.split("requestId=")[1].split("&")[0];
		if (reqID == otherPageReqID){
			return true;
		}
	}
	
	return false;
}


/////////////////////////////////////////////////////
// Update Medications Sidebar
/////////////////////////////////////////////////////
// updateMedicationsSidebar();
/*
NOTE
- adds the Medications that were posted today to the sidebar.
- for medications posted today that are already listed in the sidebar, these will be shown instead of my version.

Side note
- prescriptions with days to expire 30 or greater will be considered a current Drug and colored blue.
- if days to expire is 29 or less, its class will be expireInReference, and colored
*/
async function updateMedicationsSidebar() {
	/*
	- The Print meds page doesn't have a unique URL for each patient, so I'm guessing that the server updates that page based on which patient chart is open. But the print page isn't automatically updated to the correct patient the moment you open the eChart. It seems to take 10-30s if you just stay on the eChart. But if you open the Medications page, it seems to update the print page to the correct patient right away.
	- The below code block requests to open the Medications page. This in turn updates the print meds page to the correct patient right away.
	- Addendum: Actually, it seems that calling an XHR request to the Medications page causes medications to fail to save and print. Instead of the medication showing up on the Print page, just a blank page. Likewise, no medication is saved.
	*/
	// let xmlhttp2 = new XMLHttpRequest();
	// xmlhttp2.open("GET", urlAddedMedications(), false);
	// xmlhttp2.send();


	const otherPageXMLText = await getXMLHTTP(urlPrintedMedications());
	const otherPageHTML = new DOMParser().parseFromString(otherPageXMLText, "text/html");

	console.log("----meds---");

	/* 
	Check current patient name matches. 
	*/
	let currentPatientName = document.querySelectorAll(".Header > a:nth-child(1)")[0].innerText.replace(/[\s]/g, "");

	const printPagePatientNameHTML = otherPageHTML.querySelectorAll("#AutoNumber1 > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(1)")[0];
	if(printPagePatientNameHTML == undefined){
		console.log("Print page patient name undefined. Likely because Medications hasn't been visited yet.");
		return;
	}
	let printPagePatientName = printPagePatientNameHTML.innerHTML.split('-->')[1].split('<')[0].replace(/[\n\s]/g, "");

	currentPatientName = currentPatientName.toUpperCase().split("(")[0];
	printPagePatientName = printPagePatientName.toUpperCase().split("(")[0];
	console.log(currentPatientName);
	console.log(printPagePatientName);
	if(currentPatientName != printPagePatientName){
		console.log("Print page patient name doesn't match current patient name.");
		return;
	}

	/* 
	Get posted items list.
	 */
	const postedItemsNodeList = otherPageHTML.querySelectorAll("tr[rxdate='"+ todayDateYYYYMMDD() + "']"); 
	// console.log(postedItemsNodeList);
	const postedItemsTodayList = findMedsPostedToday(postedItemsNodeList);

	
	console.log(postedItemsTodayList);

	addPostedMedsBlock();
	$("#postedMedsBlock").html("");
	$("#postedMedsBlock").append(medsObjectListToHTML(postedItemsTodayList));

    
}

/*
PURPOSE:
- takes the node list and outputs objects describing each item, with Medication name, and date.
- only outputs objects with items that are not duplicates of meds already posted in eChart.
NOTE
- assumes given a list of nodes that match today's date
*/
function findMedsPostedToday(postedItemNodeList){
    let postedItemObjectList = [];
    for (rowNode of postedItemNodeList){
		const rowTextData = HTMLNodeListToInnerTextList(rowNode.children);
		// console.log(rowTextData);

        nodeMed = rowTextData[3].trim();

        if (isMatchingPostedMeds(nodeMed)){
        	continue;
        }

        const postedItemObject = {
			date: todayDateYYYYMMDD(),
			med: nodeMed
		}
        postedItemObjectList.push(postedItemObject);
        
    }
    return postedItemObjectList;
}

/*
- returns true if given printedMed matches any of the medications listed in the eChart.

*/
function isMatchingPostedMeds(printedMed){
	const eChartMedList = $("#Rxlist > li > span:nth-child(2) > a:nth-child(1)"); 
	// console.log(firstEChartConsultReqID[0].outerHTML);
	for (i = 0; i < eChartMedList.length; i++){
		printedMed = printedMed.replace(/  +/g, ' ').trim();
		eChartMed = eChartMedList[i].innerText;
		// console.log(printedMed);
		// console.log(eChartMed);
		
		if (eChartMed == printedMed){
			return true;
		}
	}
	
	return false;
}


/*
PURPOSE:
- given list of objects with properties URL, eFormTitle, addedInfo, date, produce HTML that produces links to the eForms in question.
*/
function medsObjectListToHTML(eFormsObjectList){
	let htmlResult = "";
	// eFormsObjectList.length
	for (let i = 0; i < eFormsObjectList.length; i++){
		eFormObject = eFormsObjectList[i];
		// console.log(eFormObject);


// const postedItemObject = {
// 					date: currentDate,
// 					med: nodeText
// 				}

		htmlResult += 

		`<li style="overflow: hidden; clear:both; position:relative; display:block; white-space:nowrap; ">
			<a border="0" style="text-decoration:none; width:7px; z-index: 100; background-color: white; position:relative; margin: 0px; padding-bottom: 0px;  vertical-align: bottom; display: inline; float: right; clear:both;"><img id="imgRxZ`+ i + `" src="/oscar/images/clear.gif">&nbsp;&nbsp;</a>
			<span style=" z-index: 1; position:absolute; margin-right:10px; width:90%; overflow:hidden;  height:1.2em; white-space:nowrap; float:left; text-align:left; ">
				<a class="links" style="" onmouseover="this.className='linkhover'" onmouseout="this.className='links'" href="#" onclick = "window.open('` + urlAddedMedications() + `', '_blank', 'height=700,width=800,scrollbars=yes,status=yes');return false;" title="` + eFormObject.med + `">
					<span class="currentDrug ">` + eFormObject.med + `</span>
				</a>
			</span>
		</li>`
	}
	// console.log(htmlResult);
	return htmlResult;
}




/////////////////////////////////////////////////////
// Update Tickler Sidebar
/////////////////////////////////////////////////////

/*
NOTE
- adds the ticklers that were posted today to the sidebar.
- for ticklers posted today that are already listed in the sidebar, these will be shown instead of my version.
*/
async function updateTicklerSidebar() {
	const otherPageXMLText = await getXMLHTTP(urlAddedTicklers());
	const otherPageHTML = new DOMParser().parseFromString(otherPageXMLText, "text/html");


	console.log("----ticklers---");
	const postedItemsNodeList = otherPageHTML.querySelectorAll("body > form:nth-child(3) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(4) > tbody:nth-child(1) > tr"); 
	const postedItemsTodayList = findTicklersPostedToday(postedItemsNodeList);
	console.log(postedItemsTodayList);

	addPostedTicklersBlock();
	$("#postedTicklersBlock").html("");
	$("#postedTicklersBlock").append(ticklersObjectListToHTML(postedItemsTodayList));


}

/*
PURPOSE:
- takes the node list and outputs objects describing each item, with Tickler message, and date.
- only outputs objects with items that are not duplicates of ticklers already posted in eChart.

*/
function findTicklersPostedToday(postedItemNodeList){
    let postedItemObjectList = [];
    for (let i=1; i < postedItemNodeList.length-1; i++){
        const currentNode = postedItemNodeList[i];
        const nodeChildren = currentNode.children;

		if (nodeChildren[0].innerText == "No Tickler Messages"){
			break;
		}
		
        const nodeCreateDate = nodeChildren[5].innerText.replace(/[\r\n\t]/g, "");
        const nodeMessage = nodeChildren[9].childNodes[0].textContent.replace(/[\r\n\t]/g, "");
		const nodeServiceDate = nodeChildren[4].innerText.replace(/[\r\n\t]/g, "");
        if (isMatchingPostedTicklers(nodeMessage)){
        	continue;
        }

        const postedItemObject = {
			serviceDate: nodeServiceDate,
			createDate: nodeCreateDate,
			message: nodeMessage
		}
        postedItemObjectList.push(postedItemObject);
        // console.log(postedItemObject);
    }
    return postedItemObjectList;
}

/*
- returns true if given postedTickler matches any of the ticklers listed in the eChart.

*/
function isMatchingPostedTicklers(postedTickler){
	const eChartTicklerList = $("#ticklerlist > li > span:nth-child(2) > a:nth-child(1)"); 
	// console.log(firstEChartConsultReqID[0].outerHTML);
	for (i = 0; i < eChartTicklerList.length; i++){
		eChartTickler = eChartTicklerList[i].innerText;
		postedTickler = postedTickler.trim();
		// console.log(postedTickler);
		// console.log(eChartTickler);
		
		if (eChartTickler == postedTickler){
			return true;
		}
	}
	
	return false;
}



/*
PURPOSE:
- given list of objects with properties URL, eFormTitle, addedInfo, date, produce HTML that produces links to the eForms in question.
*/
function ticklersObjectListToHTML(itemObjectList){
	let htmlResult = "";
	// itemObjectList.length
	for (let i = 0; i < itemObjectList.length; i++){
		itemObject = itemObjectList[i];
		// console.log(itemObject);


  //       const postedItemObject = {
		// 	createDate: nodeCreateDate,
		// 	message: nodeMessage
		// }

		htmlResult += 
		`<li style="overflow: hidden; clear:both; position:relative; display:block; white-space:nowrap; ">
			<a border="0" style="text-decoration:none; width:7px; z-index: 100; background-color: white; position:relative; margin: 0px; padding-bottom: 0px;  vertical-align: bottom; display: inline; float: right; clear:both;"><img id="imgeformsZ`+ i + `" src="/oscar/images/clear.gif">&nbsp;&nbsp;</a>
			<span style=" z-index: 1; position:absolute; margin-right:10px; width:90%; overflow:hidden;  height:1.5em; white-space:nowrap; float:left; text-align:left; ">
				<a class="links" style="" onmouseover="this.className='linkhover'" onmouseout="this.className='links'" href="#" onclick = "window.open('` + urlAddedTicklers() + `', '_blank', 'scrollbars=yes,status=yes');return false;" title="` + itemObject.message + itemObject.serviceDate + `">` + 
				itemObject.message  + 
				`</a>
			</span>
			<span style="z-index: 100; background-color: white; overflow:hidden;   position:relative; height:1.5em; white-space:nowrap; float:right; text-align:right;">
			...<a class="links" style="margin-right: 2px;" onmouseover="this.className='linkhover'" onmouseout="this.className='links'" href="#" onclick = "window.open('`+ urlAddedTicklers() + `', '_blank', 'scrollbars=yes,status=yes');return false;" title="` + itemObject.message + itemObject.serviceDate + `">` 
			+ itemObject.serviceDate + `			
			</a>
			</span>
		</li>`
	}
	// console.log(htmlResult);
	return htmlResult;
}


/////////////////////////////////////////////////////
// Update Forms Sidebar
/////////////////////////////////////////////////////

/*
NOTE
- adds the Forms that were posted today to the sidebar.
- for items posted today that are already listed in the sidebar, these will be shown instead of my version.

*/
async function updateFormsSidebar() {
	const otherPageXMLText = await getXMLHTTP(urlAddedForms());
	const otherPageHTML = new DOMParser().parseFromString(otherPageXMLText, "text/html");

	
	console.log("----Forms---");
	const postedItemsNodeList = otherPageHTML.querySelectorAll(".MainTableRightColumn > table:nth-child(1) > tbody:nth-child(1) > tr"); 
	// console.log(postedItemsNodeList);
	const postedItemsTodayList = findFormsPostedToday(postedItemsNodeList);
	console.log(postedItemsTodayList);

	addPostedFormsBlock();
	$("#postedFormsBlock").html("");
	$("#postedFormsBlock").append(formsObjectListToHTML(postedItemsTodayList));

}

/*
PURPOSE:
- takes the node list and outputs objects describing each item, with Form, and date.
- only outputs objects with items that are not duplicates of Forms already posted in eChart.
NOTE: 
- when you open, edit and close a previously posted Form, it will automatically update the list in the eChart.
- so we only want items that haven't been previously posted. 
- also, note that formIDs are not unique to each form.
- no need to filter for forms that are posted today, because if it hasn't already been posted to the eChart, it must be a form that has been posted today.

*/
function findFormsPostedToday(postedItemNodeList){
    let postedItemObjectList = [];
	let formTitlesInEChart = getFormTitlesInEChart();
	// console.log(formTitlesInEChart);
	let formTitlesSeenInFormListSoFar = new Set();
    for (let i=1; i < postedItemNodeList.length; i++){
        const currentTableRow = postedItemNodeList[i];
        const currentTableDataList = currentTableRow.children;

		if (currentTableDataList[0].innerText.trim() == "Next Page"){
			console.log(currentTableDataList[0].innerText.trim());
			continue;
		}
		const nodeURLOuterHTML = currentTableDataList[0].children[0].outerHTML;
		
		const nodeURL = getURLOrigin() + nodeURLOuterHTML.split("\'")[1].substring(3).replace(/&amp;/g, "&");
		// console.log(nodeURLOuterHTML);
		const nodeFormID = nodeURL.split("formId=")[1].split("&")[0];
		
		const nodeDate = currentTableDataList[2].textContent;
		const nodeFormTitle = currentTableDataList[0].children[0].textContent.trim();
		const nodeDateOnly = nodeDate.split(" ")[0];
	
		// console.log(nodeFormTitle);


		/*
		- if Form is already listed in eChart, move on to next item
		*/
		if (formTitlesInEChart.has(nodeFormTitle)){
			continue;
		}

		/*
		- if form title already seen, move on to next item
		- we do not want to post duplicates of the same form.
		*/
		if(formTitlesSeenInFormListSoFar.has(nodeFormTitle)){
			continue;
		} else{
			formTitlesSeenInFormListSoFar.add(nodeFormTitle);
		}


		// /*
		// - if Form date doesn't match today's date, move on to next item
		// - the Forms are not sorted overall (althought they are sorted within each Form type)
		// */
		// if (!isTodayShortDate(nodeDateOnly)){
		// 	console.log(2);
		// 	continue;
		// }

        const postedItemObject = {
			URL: nodeURL,
			editDate: nodeDate,
			form: nodeFormTitle
		}


        postedItemObjectList.push(postedItemObject);
    }
    return postedItemObjectList;
}

function isMatchFormsInEChart(){

}

function getFormTitlesInEChart(){
	const formListInEChart = $("#formslist > li > span:nth-child(2) > a:nth-child(1)"); 
	let formTitleSetInEChart = new Set();
	for (i = 0; i < Math.min(formListInEChart.length, 10); i++){
		const formInEChart = formListInEChart[i];
		const formTitle = formInEChart.innerText
		formTitleSetInEChart.add(formTitle);
	}
	return formTitleSetInEChart;
}





/*
PURPOSE:
- given list of objects with properties URL, eFormTitle, addedInfo, date, produce HTML that produces links to the eForms in question.
*/
function formsObjectListToHTML(itemObjectList){
	let htmlResult = "";
	// itemObjectList.length
	for (let i = 0; i < itemObjectList.length; i++){
		itemObject = itemObjectList[i];
		// console.log(itemObject);


  //       const postedItemObject = {
		// 	createDate: nodeCreateDate,
		// 	message: nodeMessage
		// }

		htmlResult += 
		`<li style="overflow: hidden; clear:both; position:relative; display:block; white-space:nowrap; ">
			<a border="0" style="text-decoration:none; width:7px; z-index: 100; background-color: white; position:relative; margin: 0px; padding-bottom: 0px;  vertical-align: bottom; display: inline; float: right; clear:both;"><img id="imgeformsZ`+ i + `" src="/oscar/images/clear.gif">&nbsp;&nbsp;</a>
			<span style=" z-index: 1; position:absolute; margin-right:10px; width:90%; overflow:hidden;  height:1.5em; white-space:nowrap; float:left; text-align:left; ">
				<a class="links" style="" onmouseover="this.className='linkhover'" onmouseout="this.className='links'" href="#" onclick = "window.open('${itemObject.URL}', '_blank', 'scrollbars=yes,status=yes');return false;" title="${itemObject.form}  ${itemObject.editDate}">${itemObject.form}</a>
			</span>
			<span style="z-index: 100; background-color: white; overflow:hidden;   position:relative; height:1.5em; white-space:nowrap; float:right; text-align:right;">
			...<a class="links" style="margin-right: 2px;" onmouseover="this.className='linkhover'" onmouseout="this.className='links'" href="#" onclick = "window.open('${itemObject.URL} ', '_blank', 'scrollbars=yes,status=yes');return false;" title="${itemObject.form}  ${itemObject.editDate}">${itemObject.editDate}</a>
			</span>
		</li>`
	}
	// console.log(htmlResult);
	return htmlResult;
}


/////////////////////////////////////////////////////
// Date
/////////////////////////////////////////////////////

function isDate(val){
	const d = Date.parse(val);
    return !isNaN(d);
}

function isToday(eFormFullDate){
	const splitEFormFullDate = eFormFullDate.split('-');
	const eFormYear = splitEFormFullDate[0];
	const eFormMonth = splitEFormFullDate[1];
	const eFormDate = splitEFormFullDate[2];
	
	const today = new Date();
	const todayDate = today.getDate();
	const todayMonth = today.getMonth() + 1;
	const todayYear = today.getFullYear();

	// console.log(eFormDate == todayDate && eFormMonth == todayMonth && eFormYear == todayYear);
	return eFormDate == todayDate && eFormMonth == todayMonth && eFormYear == todayYear;
}

function isTodayShortDate(nodeShortDate){
	const splitNodeShortDate = nodeShortDate.split('/');
	const eFormYear = "20" + splitNodeShortDate[0];
	const eFormMonth = splitNodeShortDate[1];
	const eFormDate = splitNodeShortDate[2];
	
	const today = new Date();
	const todayDate = today.getDate();
	const todayMonth = today.getMonth() + 1;
	const todayYear = today.getFullYear();

	// console.log(eFormDate == todayDate && eFormMonth == todayMonth && eFormYear == todayYear);
	return eFormDate == todayDate && eFormMonth == todayMonth && eFormYear == todayYear;
}




/////////////////////////////////////////////////////
// get URL, URL elements
/////////////////////////////////////////////////////

/*
PURPOSE
- get URL of the eForms already added.
*/
function urlAddedEForms(){
	var newURL = getURLOrigin() + "eform/efmpatientformlist.jsp?demographic_no="+ getDemographicNum() + "&apptProvider=null&appointment=null&parentAjaxId=eforms";

	return newURL;
}

function urlAddedConsults(){
	var newURL = getURLOrigin() + "oscarEncounter/oscarConsultationRequest/DisplayDemographicConsultationRequests.jsp?de="+ getDemographicNum() + "&appNo=null";

	return newURL;
}

function urlAddedMedications(){
	var newURL = getURLOrigin() + "oscarRx/choosePatient.do?providerNo=null&demographicNo="+ getDemographicNum() + "&autoSaveOpenerOnOpen=true";

	return newURL;
}

function urlPrintedMedications(){
	var newURL = getURLOrigin() + "/oscarRx/PrintDrugProfile2.jsp?";

	return newURL;
}

function urlAddedTicklers(){
	var newURL = getURLOrigin() + "tickler/ticklerDemoMain.jsp?demoview="+ getDemographicNum() + "&parentAjaxId=tickler&appointmentNoForSearchResults=null&updateParent=true";

	return newURL;
}

function urlAddedMeasurements(){
	var newURL = getURLOrigin() + "oscarEncounter/oscarMeasurements/SetupHistoryIndex.do";

	return newURL;
}

function urlAddedForms(){
	var newURL = getURLOrigin() + "oscarEncounter/formlist.jsp?demographic_no=" + 
	getDemographicNum();

	return newURL;
}



function getDemographicNum(){
	var params = {}; //Get Params
	if (location.search) {
	    var parts = location.search.substring(1).split('&');
	    for (var i = 0; i < parts.length; i++) {
	        var nv = parts[i].split('=');
	        if (!nv[0]) continue;``
	        params[nv[0]] = nv[1] || true;
	    }
	}

	return params.demographicNo;

}

//////////////////////////////////////////////////////////////////////////////////////////////////
// Unused, experimental functions
//////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////
// Update Consultations Async Sidebar
/////////////////////////////////////////////////////

// /*
// NOTE
// - adds the forms that were posted today to the sidebar.
// - for forms posted today that are already listed in the sidebar, my version override it and will be posted instead.

// Difference between this version and the current version:
// - this version: gets the consultant doctor name and adds it to the postedItemObject. but this is slow
// - old version: does not include the consultant doctor name. but this runs much faster.
// */
// function updateConsultationsSidebarAsync() {
// 	console.log('---consults---');
//     let xmlhttp = new XMLHttpRequest();
//     xmlhttp.onreadystatechange = async function() {
//         if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
//             const otherPageXMLText = xmlhttp.responseText;   
//             if (!otherPageXMLText) { 
//                 return;
//             }
            
//             const otherPageHTML = new DOMParser().parseFromString(otherPageXMLText, "text/html");
//             const postedItemsNodeList = otherPageHTML.querySelectorAll(".MainTableRightColumn > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr"); 
            
//             const postedItemsTodayList = await findConsultsPostedTodayAsync(postedItemsNodeList);
//             console.log(postedItemsTodayList);
//             addPostedConsultsBlock();
            
//             $("#postedConsultsBlock").html("");
// 			$("#postedConsultsBlock").append(consultsObjectListToHTMLAsync(postedItemsTodayList));

//         }
//     };
// 	xmlhttp.open("GET", urlAddedConsults(), true);
// 	xmlhttp.send();
// }

// /*
// PURPOSE:
// - given list of objects with properties URL, eFormTitle, addedInfo, date, produce HTML that produces links to the eForms in question.
// */
// function consultsObjectListToHTMLAsync(itemsObjectList){
//     let htmlResult = "";
//     // itemsObjectList.length
//     for (let i = 0; i < itemsObjectList.length; i++){
//         itemObject = itemsObjectList[i];
//         // console.log(itemObject);

//         htmlResult += 

//         `<li style="overflow: hidden; clear:both; position:relative; display:block; white-space:nowrap; ">
//             <a border="0" style="text-decoration:none; width:7px; z-index: 100; background-color: white; position:relative; margin: 0px; padding-bottom: 0px;  vertical-align: bottom; display: inline; float: right; clear:both;"><img id="imgconsultationZ`+ i + `" src="/oscar/images/clear.gif">&nbsp;&nbsp;</a>
//             <span style=" z-index: 1; position:absolute; margin-right:10px; width:90%; overflow:hidden;  height:1.5em; white-space:nowrap; float:left; text-align:left; ">
//             <a class="links" style="" onmouseover="this.className='linkhover'" onmouseout="this.className='links'" href="#" onclick = "window.open('` + itemObject.URL + `', '_blank', 'height=700,width=800,scrollbars=yes,status=yes');return false;" title="` + itemObject.itemTitle + " " +itemObject.date + '&#10;Requesting Physician: Dr. ' + itemObject.requestingDoc + '&#10;Consultant Physician: Dr. ' + itemObject.consultantDoc + `">` + 
//             itemObject.itemTitle + 
//             `</a>
//             </span>
//             <span style="z-index: 100; background-color: white; overflow:hidden;   position:relative; height:1.5em; white-space:nowrap; float:right; text-align:right;">
//             ...<a class="links" style="margin-right: 2px;" onmouseover="this.className='linkhover'" onmouseout="this.className='links'" href="#" onclick = "window.open('`+ itemObject.URL + `', '_blank', 'height=700,width=800,scrollbars=yes,status=yes');return false;" title="` + itemObject.itemTitle + " " +itemObject.date + '&#10;Requesting Physician: Dr. ' + itemObject.requestingDoc + '&#10;Consultant Physician: Dr. ' + itemObject.consultantDoc + `">` 
//             + itemObject.date + `           
//             </a>
//             </span>
//         </li>`
//     }
//     // console.log(htmlResult);
//     return htmlResult;
// }

// /*
// PURPOSE:
// - takes the node list and outputs objects describing each item, with Service, referral date.
// - only outputs objects with items that match today's date.
// */
// async function findConsultsPostedTodayAsync(postedItemNodeList){
//     let postedItemObjectList = [];
//     for (let i=1; i < postedItemNodeList.length; i++){
//         currentNode = postedItemNodeList[i];
//         nodeChildren = currentNode.children;
//         // console.log(nodeChildren);
//         nodeURLOuterHTML = nodeChildren[1].children[0].outerHTML;
//         /*
//         - gets the URL portion of the HTML in the <a> element, by using split("\'"). and selecting the item at index 1.
//         - then removes the "../.." with substring(6)
//         - then replaces &amp; with &
//         */
//         nodeURL = getURLOrigin() + nodeURLOuterHTML.split("\'")[1].substring(6).replace(/&amp;/g, "&");
//         nodeItemsTitle = nodeChildren[3].children[0].innerText.replace(/[\r\n\t]/g, "");
//         nodeRequestingDoc = nodeChildren[2].textContent;
//         nodeDate = nodeChildren[4].textContent;
//         nodeReqID = nodeURL.split("requestId=")[1].split("&")[0];
        
        
//         const xhrText = await getXMLHTTP(nodeURL);
//         nodeConsultantDoc = getConsultantDoctor(xhrText);
//         // console.log(nodeConsultantDoc);

//         /*
//         - stops when the consult date doesn't match today's date. assumes dates are sorted (which they are, but are unfortunately sorted in reverse order within a given day)
//         */
//         if (!isToday(nodeDate)){
//             break;
//         }
//         /*
//         - if consult from other page matches reqID of first consult in eChart, move onto next item.     
//         */
//         if (isMatchingConsultReqID(nodeReqID)){
//             continue;
//         }

//         const postedItemObject = {
//             URL: nodeURL,
//             itemTitle: nodeItemsTitle,
//             consultantDoc: nodeConsultantDoc,
//             requestingDoc: nodeRequestingDoc,
//             date: nodeDate
//         }
//         // console.log(postedItemObject);
//         postedItemObjectList.push(postedItemObject);
        
//     }
//     return postedItemObjectList;
// }


// function getConsultantDoctor2(consultItemURL){
//     let xmlhttp = new XMLHttpRequest();
//     xmlhttp.onreadystatechange = function() {
//         if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
//             const otherPageXMLText = xmlhttp.responseText;   
//             if (!otherPageXMLText) { 
//                 return;
//             }
            
//             // console.log(otherPageXMLText);
//             const consultantDoc = otherPageXMLText.split("initService")[2].split("'")[7];
//             if (consultantDoc == ""){
//                 consultantDoc == "N/A";
//             }
//             console.log(consultantDoc);
//             return consultantDoc;
//         }
//     };
//     xmlhttp.open("GET", consultItemURL, false);
//     xmlhttp.send();
// }



// function getConsultantDoctor(xhrText){
// 	const otherPageXMLText = xhrText   
//     if (!otherPageXMLText) { 
//         return;
//     }
    
// 	// console.log(otherPageXMLText);
// 	const consultantDoc = otherPageXMLText.split("initService")[2].split("'")[7];
// 	if (consultantDoc == ""){
// 		consultantDoc == "N/A";
// 	}
// 	return consultantDoc;
// }

// /////////////////////////////////////////////////////
// // Update Medications Sidebar2
// /////////////////////////////////////////////////////
// // updateMedicationsSidebar();
// /*
// NOTE
// - adds the forms that were posted today to the sidebar.
// - for forms posted today that are already listed in the sidebar, my version override it and will be posted instead.

// Side note
// - prescriptions with days to expire 30 or greater will be considered a current Drug and colored blue.
// - if days to expire is 29 or less, its class will be expireInReference, and colored

// Difference between this version and the current version
// - this version: looks at the items under reprint on this page
// - current version: looks at the print page, and gets a more updated medication list.
// */
// function updateMedicationsSidebar2() {
	
//     let xmlhttp = new XMLHttpRequest();
//     xmlhttp.onreadystatechange = function() {
//         if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
//             const otherPageXMLText = xmlhttp.responseText;   
//             if (!otherPageXMLText) { 
//                 return;
//             }
            
// // drugProfile
//             const otherPageHTML = new DOMParser().parseFromString(otherPageXMLText, "text/html");
//             const postedItemsNodeList = otherPageHTML.querySelectorAll("#reprint")[0].children; // > tbody:nth-child(1) > tr
//             const postedItemsTodayList = findMedsPostedToday2(postedItemsNodeList);

//             // console.log("----meds2---");
//             console.log(postedItemsTodayList);

//             addPostedMedsBlock();
//             $("#postedMedsBlock").html("");
// 			$("#postedMedsBlock").append(medsObjectListToHTML(postedItemsTodayList));

//         }
//     };
// 	xmlhttp.open("GET", urlAddedMedications(), false);
// 	xmlhttp.send();
// }

// /*
// PURPOSE:
// - takes the unordered node list and outputs objects describing each item, with Service, referral date.
// - only outputs objects with items that match today's date.
// */
// function findMedsPostedToday2(postedItemNodeList){
// 	// console.log(postedItemNodeList);
// 	let postedItemObjectList = [];
// 	let currentDate = "";
// 	for (let i=0; i < postedItemNodeList.length; i++){
// 		const currentNode = postedItemNodeList[i];
// 		const nodeText = currentNode.innerText;

// 		// filters out nodes that are neither medication nor the date.
// 		if (nodeText == "" || nodeText.includes("\n") || nodeText == String.fromCharCode(160)){
// 			continue;
// 		}
// 		// console.log(currentNode);
// 		// console.log(nodeText);

// 		if (isDate(nodeText)){
// 			currentDate = nodeText;
// 			/*
// 			- stops when the medication date doesn't match today's date. assumes dates are sorted.
// 			*/
// 			if (!isToday(currentDate)){
// 				break;
// 			}
// 			continue;
// 		}
// 		else {  // assumes that any other remaining nodes just contain the medication as the text.
// 			if(!isDuplicateMed(nodeText, postedItemObjectList)){
// 				const postedItemObject = {
// 					date: currentDate,
// 					med: nodeText
// 				}

// 				postedItemObjectList.push(postedItemObject);
// 				// console.log(postedItemObject);
// 			}
			
// 		}
		
// 		// postedItemObjectList.push(postedItemObject);

// 	}
// 	// console.log(postedItemObjectList);
// 	return postedItemObjectList;
// }




// /*
// - returns true if the given selectMed is already within medListSoFar.
// - medListSoFar is an objects with properties date, med.
// */
// function isDuplicateMed(selectMed, medListSoFar){
// 	for (i = 0; i < medListSoFar.length; i++){
// 		const oneMed = medListSoFar[i].med;
// 		if (oneMed == selectMed){
// 			return true;
// 		}
// 	}
// 	return false;
// }

