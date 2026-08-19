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
checkEnabled_Consultations_ConsultsPage();
async function checkEnabled_Consultations_ConsultsPage(){
	const isEnabled = await browser.storage.local.get('enabled');
	console.log("Global enabled? " + isEnabled.enabled);
	if(!isEnabled.enabled){
		return;
	}
	else {
		const consultationsObj = await browser.storage.local.get('consultations');
		const consultations = consultationsObj.consultations;
		const consultations_keyboardShortcuts = consultations.consultations_keyboardShortcuts;
		if (consultations.postPatientAgeGender){
			postPatientAgeGender();
		}
		if (consultations.postAllHistory){
			getAllHistory();
		}
	}
}


////////////////////////////////
// Patient Age and Gender
////////////////////////////////



function postPatientAgeGender(){
	const theTarget = document.evaluate("//textarea[@name='reasonForConsultation']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	
	const genderAndAge = document.querySelectorAll(".Header")[0].childNodes[2].nodeValue.trim().split("\t");
	
	const age2 = genderAndAge[1];

	const birthDate = document.querySelectorAll("td.tite4:nth-child(2) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(7) > td:nth-child(2)")[0].innerText;
	const genderLetter = document.querySelectorAll("td.tite4:nth-child(2) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(8) > td:nth-child(2)")[0].innerText;

	const age = calcPatientAge(birthDate);
	const gender = getGender(genderLetter);
	console.log(age2);


	theTarget.value = "Please see this " + age + gender + " for ";
}

function getGender(genderLetter){
	let gender = "";
	switch(genderLetter){
		case "M":
			gender = " male";
			break;
		case "F":
			gender = " female";
			break;
		case "O":
			gender = " (sex: Other)";
			break;
		case "U":
			gender = " (sex: Undefined)";
			break;
		case "T":
			gender = " transgender";
			break;
	}

	return gender;
}

function calcPatientAge(birthDate){
  const ageYears = yearsDiff(new Date(), new Date(birthDate));

  if (ageYears >= 2){
		return ageYears + "-year-old";
  }
  else {
  	const ageMonths = monthsDiff(new Date(), new Date(birthDate));
  	return ageMonths + "-month-old";
  }

  
}

function monthsDiff(d1, d2){
	const diffTime = Math.abs(d1 - d2); // time difference in milliseconds
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	return Math.floor(diffDays/30);
	// return (
	//     d1.getMonth() -
	//     d2.getMonth() +
	//     12 * (d1.getFullYear() - d2.getFullYear())
	//   );
}

function yearsDiff(d1, d2) {    
	const diffTime = Math.abs(d1 - d2); // time difference in milliseconds
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  var timeFromEpoch = new Date(diffTime);  // the date diffTime miliseconds from the epoch (1970)
  console.log(timeFromEpoch);
  const yearsDiff = Math.abs(timeFromEpoch.getUTCFullYear() - 1970);
	return yearsDiff;
}

/////////////////////////////////////////////////////////////////
// Past Medical History, Social History, Family History
/////////////////////////////////////////////////////////////////



async function getAllHistory() {

	// const [medHistory, socHistory, famHistory, otherMeds] = await Promise.all([getHistory(urlMedHistory()), getHistory(urlSocHistory()), getHistory(urlFamHistory()), getHistory(urlOtherMeds())]);
	const medical_history_obj = await browser.storage.local.get('medical_history');
	const social_history_obj = await browser.storage.local.get('social_history');
	const family_history_obj = await browser.storage.local.get('family_history');
	const other_meds_obj = await browser.storage.local.get('other_meds');

	const medical_history_text = medical_history_obj.medical_history;	
	const family_history_text = family_history_obj.family_history;
	const social_history_text = social_history_obj.social_history;

	const allHistory = "Past Medical History:\n" + medical_history_text + "\nSocial History:\n" + social_history_text + "\nFamily History:\n"  + family_history_text;
	// console.log(allHistory);
	
	const clinInfoTextBox = document.getElementById('clinicalInformation');
	clinInfoTextBox.value = allHistory;

	const currentMedsBox = document.getElementById('currentMedications');
	currentMedsBox.value += "\n\nOther Meds:\n"  + other_meds_obj.other_meds;
}
