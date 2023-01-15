// ==UserScript==
// @name Inbox_StyleChange
// @namespace   PMscripts
// @description  Changes the fonts and colors in the inbox.
// @include     *oscar/lab/CA/ALL/labDisplay.jsp*
// @include     *oscar/dms/inboxManage.do*
// @include     *kaiemr/#/inbox*
// @require   https://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @grant       none
// @version 15.2
// ==/UserScript==


// checkEnabled_InboxStyleChange();
async function checkEnabled_InboxStyleChange(){
	const isEnabled = await browser.storage.sync.get('enabled');
	console.log(await browser.storage.sync.get(null));
	
	console.log("enabled? " + isEnabled.enabled);
	if(!isEnabled.enabled){
		return;
	}
	else {
		const inboxItemObj = await browser.storage.sync.get('inboxItem');
		const inboxItem = inboxItemObj.inboxItem;
		const inboxItem_styleChange = inboxItem.inboxItem_styleChange;
        if (inboxItem_styleChange){
            modifyStyles();
            
            // modifyStyles2("Inbox_StyleChange");
            // console.log(document);
        }

	}
}

function modifyStyles2(file){
    var link = document.createElement("link");
    // link.href = chrome.extension.getURL('contentscript/' + file + '.css');
    link.href = browser.runtime.getURL("contentscripts/Inbox_StyleChange.css");
    // console.log(link.href);
    // console.log(browser.runtime.getURL("emptyFID.html"));
    // console.log(browser.runtime.getURL("emptyFID.css"));
    // window.open(browser.runtime.getURL("contentscript/Inbox_StyleChange.css"));
    link.id = file;
    link.type = "text/css";
    link.rel = "stylesheet";
    console.log(link);
    document.getElementsByTagName("html")[0].appendChild(link);
}

function modifyStyles(){

    $(".NarrativeRes, .NormalRes, .AbnormalRes, .HiLoRes, pre").css("font-family", "Helvetica, Arial, sans-serif");
    $(".NarrativeRes, .NormalRes, .AbnormalRes, .HiLoRes").css("font-size", "1.2em");
    $(".NarrativeRes").css("font-weight", "normal");
    $(".NarrativeRes td, .NormalRes td, .AbnormalRes td, .HiLoRes td").css("padding", "5px");
    $(".NormalRes, .AssignedRes").css("background-color", "#efefef");
    $(".modal-card-body").css("background-color", "#f00")
    
    
    
    
    $(".MainTableTopRowRightColumn, .MainTableTopRowRightColumn, .MainTableTopRow").css("background-color", "#050505");
    //$(".MainTableBottomRowRightColumn").css("background-color", "#050505");
    
    // $(".MainTableBottomRowRightColumn").hide();
    
    $(".Cell").css("background-color", "#888");
    
    $("td object").css("height", "1080px");
    
    // $("#tblDiscs").prev().css("background-color", "#efefef");
    // $("#tblDiscs, #readerViewTable, #categoryList, #docViews").css("background-color", "#efefef");
    $('table[name ="tblDiscs"]').css("background-color", "#efefef");
    $('table[name ="tblDiscs"]').css("font-family", "Helvetica, Arial, sans-serif");
    $('table[name ="tblDiscs"]').css("font-size", "1.2em");
    $("#tblDiscs").css("background-color", "#efefef");
    $("#tblDiscs").css("font-family", "Helvetica, Arial, sans-serif")
    
    // $(".Title2").hide();
    
    
    $(".labReqDate").prev().prev().prev().css("background-color", "#efefef");
    
    $(".labReqDate").parent().parent().css("background-color", "#efefef");
    
    $(".labReqDate").css("color", "#000");
    
    $("#createLabel_309233").css("background-color", "#eee");
    $("#createLabel_309233").css("padding", "2px");
}
