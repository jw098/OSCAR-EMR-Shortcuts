 
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

save_consults_info();

// void -> string
function get_service(){
	const service_node = $('#service option:selected');
	const service = service_node.text();
	// console.log(service);
	return service;
}

// void -> string
function get_consultant(){
	const consultant_node = $('#specialist option:selected');
	const consultant = consultant_node.text();
	// console.log(consultant);
	return consultant;
}

function get_reason_for_consult(){
	const reason_for_consult_node = document.querySelector("textarea[name='reasonForConsultation']");
	const reason_for_consult = reason_for_consult_node.value;
	// console.log(reason_for_consult);
	return reason_for_consult;
}

// void -> void
// on submit event, save the to storage the following info: Service, Consultant, Reason for consult
function save_consults_info(){
	const consults_list_channel = new BroadcastChannel("update_consults_list");

	const submit_node_list = document.querySelectorAll("input[value*='submit' i]");
	console.log(submit_node_list);
	for (const submit_node of submit_node_list){
		submit_node.addEventListener("click", (event) =>{
			const service = get_service();
			const consultant = get_consultant();
			const reason_for_consult = get_reason_for_consult();

			const consult_info = {
				service: service,
				consultant: consultant,
				reason_for_consult: reason_for_consult
			}
		
			consults_list_channel.postMessage(consult_info);			
		});	
	}

}
