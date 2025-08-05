// ==UserScript==
// @name						Consultations_KeyboardShortcuts
// @namespace				oscar
// @include					*/oscarConsultationRequest/ConsultationFormRequest.jsp*
// @description			Within Consultations: Alt+1 to 'Submit Consultation Request'. Automatically pastes Past Medical history, Social history, and Family history to the Clinical information text area.
// @require 				http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @grant						GM.setValue
// @grant						GM.getValue
// @grant						GM.deleteValue
// ==/UserScript==
//"*://*/*/oscarEncounter/ViewRequest.do*"
 
///////////////////////////////////////////////////////////////////////////////////////////
// Check Enabled
///////////////////////////////////////////////////////////////////////////////////////////
// checkEnabled_Consultations_EchartPage();
// async function checkEnabled_Consultations_EchartPage(){
// 	const isEnabled = await browser.storage.local.get('enabled');
// 	console.log("Global enabled? " + isEnabled.enabled);
// 	if(!isEnabled.enabled){
// 		return;
// 	}
// 	else {
// 		const consultationsObj = await browser.storage.local.get('consultations');
// 		const consultations = consultationsObj.consultations;
// 		const consultations_keyboardShortcuts = consultations.consultations_keyboardShortcuts;

// 		if (consultations.postAllHistory){
// 			CPPMutationObserver();
// 		}
// 	}
// }

save_eform_info();

// void -> string
function get_eform_title(){
	const html_as_string = document.documentElement.innerHTML;
	try{
		const eform_title = html_as_string.split("setEformName='")[1].split("';<")[0];
		return eform_title;
	}catch{
		return "";
	}
}

// void -> string
// save the value of the subject line.
function get_eform_subject(){
	const subject_node = document.querySelector('#subject') 
						|| document.querySelector('[name="subject"]'); // see nullish coalescing operator.
	
	let eform_subject = "";
	if (subject_node != null){
		eform_subject = subject_node.value;
	}
	return eform_subject;
}

// document.addEventListener("blur", ()=>{
// 	console.log(get_eform_title());
// 	console.log(get_eform_subject());
// });

// void -> void
// save the eform title + subject to storage, on submit event.
function save_eform_info(){
	const eform_list_channel = new BroadcastChannel("update_eform_list");

	document.addEventListener("submit", async (event) =>{
		const eform_title = get_eform_title();
		const eform_title_subject = eform_title + ": " + get_eform_subject();
		console.log(eform_title_subject);
		eform_list_channel.postMessage(eform_title_subject);
	// setTimeout(async () => {
	// 	await browser.storage.local.set({
	// 		eform_title_subject: eform_title_subject
	// 	});		
	// }, 100);

	});
}
