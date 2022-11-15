
// @name        EChart_Buttons
// @namespace   Stanscripts
// @description Various navigation buttons for e-chart screen (e.g. Lab req, Ultrasound req, X-ray req).  Set your own specific fid (form number ID) or Measurement groupName. Alt+Shift+Q,W,Z opens the eForms specified.
// @include     */casemgmt/forward.jsp?action=view&demographic*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @grant       none
// ==/UserScript==


///////////////////////////////////////////////////////////////////////////////////////////
// Check Enabled
///////////////////////////////////////////////////////////////////////////////////////////
checkEnabled_EChart();
async function checkEnabled_EChart(){
	const isEnabled = await browser.storage.sync.get('enabled');
	console.log("Global enabled? " + isEnabled.enabled);
	if(!isEnabled.enabled){
		return;
	}
	else {
		// Buttons
		keydownEventListener_openEForm();
		loadAllEFormButtons();
		
		// eFormSearch
		keydownEventListener_eformSearch();
        addSearchBar();

		// KeyboardShortcuts
		keydownEventListener_eChart();

		// UpdateSidebar
		updateAllSidebarOnFocusChange();
	}
}
