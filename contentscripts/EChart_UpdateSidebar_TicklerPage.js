 
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

save_tickler_info();
console.log(get_service_date());

// void -> string
function get_tickler_message(){
	const messageTextArea = 
		document.evaluate("//textarea",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	const messageText = messageTextArea.value;
	return messageText;
}

// void -> string
function get_service_date(){
	const service_date_node = 
		document.querySelector("body > table:nth-child(3) > tbody:nth-child(4) > tr:nth-child(2) > td:nth-child(2) > input:nth-child(1)");
	const service_date = service_date_node.value;
	return service_date;
}


// void -> void
// on submit event, save the to storage the following info: Service, Consultant, Reason for consult
function save_tickler_info(){
	const tickler_list_channel = new BroadcastChannel("update_tickler_list");

	const submit_node_list = document.querySelectorAll("input[value*='submit' i]");
	// console.log(submit_node_list);
	for (const submit_node of submit_node_list){
		submit_node.addEventListener("click", (event) =>{
			const message = get_tickler_message();
			const service_date = get_service_date();
			const tickler_info = {
				message: message,
				service_date: service_date,
			}			
		
			tickler_list_channel.postMessage(tickler_info);			
		});	
	}

}
