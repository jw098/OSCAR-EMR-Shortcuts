

var testSettings = {
  enabled: true, // default enabled
  allergyQuickAdd: true,

  billingCodeInput:{
    billingButtons22: true,
    billingCodeInput_PageEnd: true,
    bcBillingButtonGroup1:[
      {
        bcBillingButton1_enabled: true,
        bcBillingButton1_name: "test",
        bcBillingButton1_serviceCode: "00100",
        bcBillingButton1_dxCode1: "401",
        bcBillingButton1_dxCode2: "244",
        bcBillingButton1_dxCode3: "462",

        bcBillingButton1_addon: true,
        bcBillingButton1_shortcuts:{
          bcBillingButton1_1_shortcuts_enabled: true,
          bcBillingButton1_1_shortcuts_keybinding: {
            ctrlKey: false,
            shiftKey: false,
            altKey: true,
            key: '1'
          },
        }
      },
      {
        bcBillingButton1_2_enabled: true,
        bcBillingButton1_2_name: "test22",
        bcBillingButton1_2_serviceCode: "00150",
        bcBillingButton1_2_dxCode1: "411",
        bcBillingButton1_2_dxCode2: "250",
        bcBillingButton1_2_dxCode3: "595",

        bcBillingButton1_2_addon: false,
        bcBillingButton1_2_shortcuts:{
          bcBillingButton1_2_shortcuts_enabled: true,
          bcBillingButton1_2_shortcuts_keybinding: {
            ctrlKey: false,
            shiftKey: false,
            altKey: true,
            key: 'z'
          },
        }
      },
    ],

    billingCodeInput_keyboardShortcuts:{
      billingCodeInput_shortcuts_enabled: true,

      billingCodeInput_shortcut_continue_enabled: true,
      billingCodeInput_shortcut_continue_keybinding:{
        ctrlKey: false,
        shiftKey: false,
        altKey: true,
        key: '1'
      },
      billingCodeInput_shortcut_officeVisitInputCode_enabled: true,
      billingCodeInput_shortcut_officeVisitInputCode_keybinding:{
        ctrlKey: false,
        shiftKey: false,
        altKey: true,
        key: 'q'
      },
      billingCodeInput_shortcut_teleVisitInputCode_enabled: true,
      billingCodeInput_shortcut_teleVisitInputCode_keybinding:{
        ctrlKey: false,
        shiftKey: false,
        altKey: true,
        key: 'w'
      },
      billingCodeInput_shortcut_setFocusDxCode_enabled: true,
      billingCodeInput_shortcut_setFocusDxCode_keybinding:{
        ctrlKey: false,
        shiftKey: false,
        altKey: true,
        key: 'a'
      }

    }
  },
  
  billingDxCodeSearch:{
    billingDxCodeSearch_keyboardShortcuts: {
      billingDxCodeSearch_shortcuts_enabled: true,

      billingDxCodeSearch_shortcuts_confirm_enabled: true,
      billingDxCodeSearch_shortcuts_confirm_keybinding: {
        ctrlKey: false,
        shiftKey: false,
        altKey: true,
        key: '1'
      },
      billingDxCodeSearch_shortcuts_cancel_enabled: true,
      billingDxCodeSearch_shortcuts_cancel_keybinding: {
        ctrlKey: false,
        shiftKey: false,
        altKey: false,
        key: 'Escape'
      },
    }
  },

  billingConfirm:{
    billingConfirm_PageEnd: true,
    billingConfirm_keyboardShortcuts: {
      billingConfirm_shortcuts_enabled: true,

      billingConfirm_shortcuts_saveBill_enabled: true,
      billingConfirm_shortcuts_saveBill_keybinding: {
        ctrlKey: false,
        shiftKey: false,
        altKey: true,
        key: '1'
      },
      billingConfirm_shortcuts_pageEnd_enabled: true,
      billingConfirm_shortcuts_pageEnd_keybinding: {
        ctrlKey: false,
        shiftKey: false,
        altKey: false,
        key: 'a'
      },
    }
  },


  cortico: true,
  // cortico: {
  //   cortico_keyboardShortcuts: {
  //     cortico_shortcuts_enabled: true,

  //     cortico_shortcut_closeModal_enabled: true,
  //     cortico_shortcut_closeModal_keybinding: {
  //       ctrlKey: false,
  //       shiftKey: false,
  //       altKey: false,
  //       key: 'Escape'
  //     },
  //   }
  // },

  // consultations:{
  //   postPatientAgeGender: true,
  //   postAllHistory:true,
  //   consultations_keyboardShortcuts: {
  //     consultations_shortcuts_enabled: true,

  //     consultations_shortcuts_close_enabled: true,
  //     consultations_shortcuts_close_keybinding: {
  //       ctrlKey: false,
  //       shiftKey: false,
  //       altKey: true,
  //       key: 'w'
  //     },
  //     consultations_shortcuts_submit_enabled: true,
  //     consultations_shortcuts_submit_keybinding: {
  //       ctrlKey: false,
  //       shiftKey: false,
  //       altKey: false,
  //       key: 1
  //     },
  //   }
  // },

  consultations:{
    postPatientAgeGender: true,
    postAllHistory:true,
    consultations_keyboardShortcuts: true
  },

  schedule: {
    schedule_keyboardShortcuts: {
      schedule_shortcuts_enabled: true,

      schedule_shortcut_openEChart_enabled: true,
      schedule_shortcut_openEChart_keybinding: {
        ctrlKey: false,
        shiftKey: false,
        altKey: true,
        key: '1'
      },
      schedule_shortcut_openInbox_enabled: true,
      schedule_shortcut_openInbox_keybinding:{
        ctrlKey: false,
        shiftKey: false,
        altKey: true,
        key: 'z'
      }
    }
  }

};

var keyBindings = [];

var keyCodeAliases = {
  0: "null",
  null: "null",
  undefined: "null",
  32: "Space",
  37: "Left",
  38: "Up",
  39: "Right",
  40: "Down",
  96: "Num 0",
  97: "Num 1",
  98: "Num 2",
  99: "Num 3",
  100: "Num 4",
  101: "Num 5",
  102: "Num 6",
  103: "Num 7",
  104: "Num 8",
  105: "Num 9",
  106: "Num *",
  107: "Num +",
  109: "Num -",
  110: "Num .",
  111: "Num /",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  186: ";",
  188: "<",
  189: "-",
  187: "+",
  190: ">",
  191: "/",
  192: "~",
  219: "[",
  220: "\\",
  221: "]",
  222: "'",
  59:  ";",
  61:  "+",
  173: "-",
};

function recordKeyPress(e) {

  let keyVal;
  if(e.key == "Backspace"){
    keyVal = "";
  }
  else {
    keyVal = e.key;
  }


  const theKeybinding = {
    ctrlKey: e.ctrlKey,
    shiftKey: e.shiftKey,
    altKey: e.altKey,
    key: keyVal
  }

  const keybindingText = keybindingToText(theKeybinding);
  e.target.value = keybindingText;

  // e.target.keybinding = theKeybinding;

  e.target.dataset.keybinding = JSON.stringify(theKeybinding);

  // console.log(e.target);
  // console.log(e.target.keybinding);
  // console.log(JSON.parse(e.target.dataset.keybinding));

  e.preventDefault();
  e.stopPropagation();

}

function keybindingToText(theKeybinding){
  if(theKeybinding == ""){
    return "";
  }
  const theKey = theKeybinding.key;    
  const theAltKey = theKeybinding.altKey;
  const theCtrlKey = theKeybinding.ctrlKey;
  const theShiftKey= theKeybinding.shiftKey;
  let keybindingText = "";

  if (theCtrlKey){
    keybindingText += "Ctrl+"
  }
  if (theShiftKey){
    keybindingText += "Shift+"
  }
  if (theAltKey){
    keybindingText += "Alt+"
  }
  if(theKey != "Control" && theKey != "Shift" && theKey != "Alt"){
    keybindingText += theKey;
  }
  return keybindingText;
}

function inputFilterNumbersOnly(e) {
  var char = String.fromCharCode(e.keyCode);
  if (!/[\d\.]$/.test(char) || !/^\d+(\.\d*)?$/.test(e.target.value + char)) {
    e.preventDefault();
    e.stopPropagation();
  }
}

function inputFocus(e) {
  // e.target.value = "";
}

function inputBlur(e) {
  const theTarget = e.target;
  // theTarget.value =
  //   keyCodeAliases[e.target.keyCode] || String.fromCharCode(e.target.keyCode);
}

/* 
PURPOSE
- if e.target.value is a URL, it will convert it to an FID.
*/
function convertURLToFID(e){
  const theTargetValue = e.target.value;
  if(theTargetValue.includes("fid=")){
    theFID = theTargetValue.split("fid=")[1].split("&")[0];
    console.log(theFID);
    e.target.value = theFID;
  }
}

let shortcutGroupsInConflict = new Set();

/* 
PURPOSE
- check conflicts in keyboard shortcuts on the same page/shortcut group, given event.
 */
function checkShortcutConflictFromCustomKeyFocusOut(e){
  const theTarget = e.target;
  const shortcutGroup = e.target.getAttribute('data-shortcutgroup');
  checkShortcutGroupConflict(shortcutGroup);
}


/* 
PURPOSE
- check conflicts in keyboard shortcuts on the same page/shortcut group, given removeParent.
 */
function checkShortcutConflictFromRemoveParentClick(event){
  const removeParent = event.target;
  const parent = removeParent.parentNode;
  const shortcutGroup = parent.querySelector(".customKey").getAttribute('data-shortcutgroup');
  parent.remove();
  checkShortcutGroupConflict(shortcutGroup);
}


/* 
PURPOSE
- check conflicts in keyboard shortcuts on the same page/shortcut group.
NOTES:
- first the clean slate
  - hides all warning labels in the group 
  - removes this group from the list of shortcutGroupsInConlict.
- then loops through all items, checking for conflicts
  - if conflict found, turns on the warning label for the two items found to be in conflict. and adds this shortcut group to shortcutGroupsInConflict.
- then check the size of shortcutGroupsInConflict. if empty, hides the warning label.
*/
function checkShortcutGroupConflict(shortcutGroup){
  // console.log(shortcutGroup);
  const inputListInSameGroup = Array.from(document.querySelectorAll(`input[data-shortcutgroup=${shortcutGroup}]`));

  // console.log(inputListInSameGroup);
  /* 
  - first the clean slate
    - hides all warning labels in the group 
    - removes this group from the list of shortcutGroupsInConlict.
  */
  for (let i = 0; i < inputListInSameGroup.length; i++){
    const anInput = inputListInSameGroup[i];
    const anInputWarning = anInput.parentNode.querySelector(".warning");
    anInputWarning.classList.toggle("hide", true);
  }
  shortcutGroupsInConflict.delete(shortcutGroup);
 
  /* 
  - then loops through all items, checking for conflicts
    - if conflict found, turns on the warning label for the two items found to be in conflict. and adds this shortcut group to shortcutGroupsInConflict.
  */
  for (let i = 0; i < inputListInSameGroup.length; i++){
    const anInput = inputListInSameGroup[i];
    let anInputKeybinding = anInput.dataset.keybinding;
    // console.log(anInputKeybinding);

    anInputKeybinding = JSON.parse(anInputKeybinding);
    if (isEmptyKeybinding(anInputKeybinding)){
      continue;
    }

    const anInputWarning = anInput.parentNode.querySelector(".warning");



    const restOfInputList = inputListInSameGroup.slice(i+1);
    for (let j = 0; j < restOfInputList.length; j++){
      const anInputFromRestOfList = restOfInputList[j];
      let anInputFromRestOfList_keybinding = anInputFromRestOfList.dataset.keybinding;
      // console.log(anInputFromRestOfList_keybinding);
      anInputFromRestOfList_keybinding = JSON.parse(anInputFromRestOfList_keybinding);
      if (isEmptyKeybinding(anInputFromRestOfList_keybinding)){
        continue;
      }
      // console.log(anInputFromRestOfList_keybinding);
      


      if(isSameKeybinding(anInputKeybinding, anInputFromRestOfList_keybinding)){
        // console.log(anInputKeybinding);
        // console.log(anInputFromRestOfList_keybinding);
        shortcutGroupsInConflict.add(shortcutGroup);
        const h1Warning = document.querySelector("h1").querySelector(".warning");
        h1Warning.classList.toggle("hide", false);

        anInputWarning.classList.toggle("hide", false);
        
        const anInputFromRestOfList_warning = anInputFromRestOfList.parentNode.querySelector(".warning");
        anInputFromRestOfList_warning.classList.toggle("hide", false);
      }
    }
  }

  // console.log(shortcutGroupsInConflict);
  

  /* 
  - then check the size of shortcutGroupsInConflict. if empty, hides the warning label.
  */
  if(shortcutGroupsInConflict.size == 0){
    const h1Warning = document.querySelector("h1").querySelector(".warning");
    h1Warning.classList.toggle("hide", true);
  }

}

// function removeFromArray(array, item){
//   var index = array.indexOf(item);
//   if (index !== -1) {
//     array.splice(index, 1);
//   }
// }





// return true if the given keybindings are the same
function isSameKeybinding(keybinding1, keybinding2){
  return keybinding1.ctrlKey == keybinding2.ctrlKey 
  && keybinding1.altKey == keybinding2.altKey
  && keybinding1.shiftKey == keybinding2.shiftKey
  && keybinding1.key == keybinding2.key;

}

function updateShortcutInputText(inputId, keyCode) {
  document.getElementById(inputId).value =
    keyCodeAliases[keyCode] || String.fromCharCode(keyCode);
  document.getElementById(inputId).keyCode = keyCode;
}

function updateCustomShortcutInputText(inputItem, keyCode) {
  inputItem.value = keyCodeAliases[keyCode] || String.fromCharCode(keyCode);
  inputItem.keyCode = keyCode;
}

// List of custom actions for which customValue should be disabled
var customActionsNoValues = ["pause", "muted", "mark", "jump", "display"];






async function checkAllSettings(){
  const settingsObject = await browser.storage.local.get(defaultSettings);
  adjustAllSettings(true, settingsObject);
}

async function uncheckAllSettings(){
  const settingsObject = await browser.storage.local.get(defaultSettings);
  adjustAllSettings(false, settingsObject);
}

function adjustAllSettings(checkAllSettings, settingsObject){
  for (const [key, value] of Object.entries(settingsObject)){
    if (typeof value == "boolean"){
      const theTarget = document.getElementById(key);
      theTarget.checked = checkAllSettings;
      checkHighlightSaveButton(theTarget);
      setGreyout(theTarget);

      if(key == "enabled"){
        greyoutExtensionIcon();
      }
    } else if(key.includes("_keybinding")){
      continue;      
    }
    else if (typeof value == "object"){
      adjustAllSettings(checkAllSettings, value);
    }
  }
}


/* 
- Saves options to chrome.storage. 

NOTE:
- if the storedSettings object doesn't match the structure of defaultSettings, storedSettings will have its structure updated to match settingsStructure. (This can happen if options.js and defaultSettings was updated, but the user has an old version still stored in storage).
  - but the values will be from options, instead of from the default values of defaultSettings.
*/
function save_options() {
  reorderBillingButtonIDs();

  chrome.storage.local.set(
    setSettingsFromOptionsPage(defaultSettings),
    function () {
      // Update status to let user know options were saved.
      var status = document.getElementById("status");
      status.textContent = "Options saved";
      setTimeout(function () {
        status.textContent = "";
      }, 1000);

      var statusHeader = document.getElementById("statusHeader");
      statusHeader.textContent = "Options saved";
      setTimeout(function () {
        statusHeader.textContent = "";
      }, 1000);

      // remove optionsUnSaved from saveHeader classlist
      document.getElementById("saveHeader").classList.toggle("optionsUnsaved", false);

    }
  );

  (async function() {
    console.log(await browser.storage.local.get(defaultSettings));
    // console.log(await browser.storage.local.get("tcDefaults"));
  })();

}

/* 
- given a settings object which provides the structure for the object, return a settings object with values taken from the options page.


 */
function setSettingsFromOptionsPage(settingsStructure){
  let newSettings = {};
  for (const [key, value] of Object.entries(settingsStructure)){
    // console.log(`${key}: ${value}`);
    if (typeof value == "boolean"){
      // console.log(key);
      newSettings[key] = document.getElementById(key).checked;
      // console.log(document.getElementById(key).checked);
    } else if(typeof value == "string"){
      // console.log(key);
      newSettings[key] = document.getElementById(key).value;
    } else if(key.includes("_keybinding")){
      // console.log(key);
      // console.log(value);
      // console.log(document.getElementById(key).dataset.keybinding);
      newSettings[key] = JSON.parse(document.getElementById(key).dataset.keybinding);
      // console.log(value);
      // console.log(newSettings[key]);
    } else if (key.includes("bcBillingButtonGroup")){
      newSettings[key] = setSettingsFromOptionsPage_bcBillingButtons(key, value);
    }
    else{
      console.assert(typeof value == "object");
      newSettings[key] =  setSettingsFromOptionsPage(value);
    }

  }
  // console.log(newSettings);

  return newSettings;
}


function setSettingsFromOptionsPage_bcBillingButtons(bcBillingButtonGroup_ID, settingsStructureArray){
  console.assert(settingsStructureArray.length > 0);
  const billingButtonGroup_Options = document.getElementById(bcBillingButtonGroup_ID);
  const billingButtonList =  Array.from(billingButtonGroup_Options.querySelectorAll(".bcBillingButtonGroup"));
  const settingsStructure = settingsStructureArray[0];
  // console.log(billingButtonList);
  const groupNum = bcBillingButtonGroup_ID.split("bcBillingButtonGroup")[1].substring(0,1);
  let billingButtonGroup_Settings = [];
  for (let i = 0; i < billingButtonList.length; i++){
    const oneBillingButton_Option = billingButtonList[i];
    // console.log(oneBillingButton_Option);
    const oneBillingButton_Settings = 
      createBillingButtonSettingFromOption(oneBillingButton_Option);

    createBillingButtonSettingFromOption2(groupNum, i+1, settingsStructure);
    billingButtonGroup_Settings.push(oneBillingButton_Settings);
  }

  // console.log(billingButtonGroup_Settings);
  return billingButtonGroup_Settings;
}

function createBillingButtonSettingFromOption(oneBillingButton_Option) {


  const groupNumButtonNum = oneBillingButton_Option.querySelector(".bcBillingButton_enabled").id.split("bcBillingButton")[1].split("_enabled")[0];


  // console.log(groupNumButtonNum)
  const buttonEnabled = oneBillingButton_Option.querySelector(".bcBillingButton_enabled").checked;
  const buttonName = oneBillingButton_Option.querySelector(".bcBillingButton_name").value;
  // console.log(buttonName);

  const serviceCode1 = oneBillingButton_Option.querySelector(".bcBillingButton_serviceCode1").value;
  const serviceCode2 = oneBillingButton_Option.querySelector(".bcBillingButton_serviceCode2").value;
  const serviceCode3 = oneBillingButton_Option.querySelector(".bcBillingButton_serviceCode3").value;
  const dxCode1 = oneBillingButton_Option.querySelector(".bcBillingButton_dxCode1").value;
  const dxCode2 = oneBillingButton_Option.querySelector(".bcBillingButton_dxCode2").value;
  const dxCode3 = oneBillingButton_Option.querySelector(".bcBillingButton_dxCode3").value;
  const addon = oneBillingButton_Option.querySelector(".bcBillingButton_addon").value;
  const shortcutEnabled = oneBillingButton_Option.querySelector(".bcBillingButton_shortcuts_enabled").checked;

  let keybinding = oneBillingButton_Option.querySelector(".bcBillingButton_shortcuts_keybinding").dataset.keybinding;
  if(keybinding != ""){
    keybinding = JSON.parse(keybinding);
  }
  

  

  const oneBillingButton_Settings = {
    [`bcBillingButton${groupNumButtonNum}_enabled`]: buttonEnabled,
    [`bcBillingButton${groupNumButtonNum}_name`]: buttonName,
    [`bcBillingButton${groupNumButtonNum}_serviceCode1`]: serviceCode1,
    [`bcBillingButton${groupNumButtonNum}_serviceCode2`]: serviceCode2,
    [`bcBillingButton${groupNumButtonNum}_serviceCode3`]: serviceCode3,
    [`bcBillingButton${groupNumButtonNum}_dxCode1`]: dxCode1,
    [`bcBillingButton${groupNumButtonNum}_dxCode2`]: dxCode2,
    [`bcBillingButton${groupNumButtonNum}_dxCode3`]: dxCode3,

    [`bcBillingButton${groupNumButtonNum}_addon`]: addon,
    [`bcBillingButton${groupNumButtonNum}_shortcuts`]:{
      [`bcBillingButton${groupNumButtonNum}_shortcuts_enabled`]: shortcutEnabled,
      [`bcBillingButton${groupNumButtonNum}_shortcuts_keybinding`]: keybinding
    }

  };

  return oneBillingButton_Settings;
}

function createBillingButtonSettingFromOption2(groupNum, buttonNum, settingsStructure) {

  const oldGroupNumButtonNum = groupNum + "_1_";
  const newGroupNumButtonNum = groupNum + "_" + buttonNum + "_";
  console.log(oldGroupNumButtonNum);
  console.log(newGroupNumButtonNum);
  const renamedSettingsStructure = getRenamedSettingsStructure(settingsStructure, oldGroupNumButtonNum, newGroupNumButtonNum);

  const newSettings = setSettingsFromOptionsPage(renamedSettingsStructure);
  console.log(newSettings);

}

/* 
- return new settingsStructure, with oldNum in each key replaced with newNum
 */
function getRenamedSettingsStructure(settingsStructure, oldNum, newNum){
  let newSettings = {};
  for (let [key, value] of Object.entries(settingsStructure)){
    // console.log(`${key}: ${value}`);
    const keySplit = key.split(oldNum);
    console.assert(keySplit.length == 2);
    key = keySplit[0] + newNum + keySplit[1];

    if (typeof value == "boolean" || typeof value == "string" || typeof value == "number" || key.includes("_keybinding")){
      // console.log(key);
      newSettings[key] = value
    } 
    else{
      console.assert(typeof value == "object");
      newSettings[key] =  getRenamedSettingsStructure(value, oldNum, newNum);
    }
  }
  // console.log(newSettings);

  return newSettings;
}

/* 
PURPOSE
- renames the IDs of html elements for billing buttons.
- this is because adding deleting buttons can disrupt the order. This function renames all billing button IDs to be in order.
 */
function reorderBillingButtonIDs(){
  reorderBillingButtonIDs_buttonGroup(1);
  reorderBillingButtonIDs_buttonGroup(2);
  reorderBillingButtonIDs_buttonGroup(3);
}

function reorderBillingButtonIDs_buttonGroup(groupNum){
  const billingButtonGroup = document.getElementById("bcBillingButtonGroup" + groupNum);
  const billingButtonList =  Array.from(billingButtonGroup.querySelectorAll(".bcBillingButtonGroup"));
  // console.log(billingButtonList);
  for (let i = 0; i < billingButtonList.length; i++){
    const oneBillingButton = billingButtonList[i];
    reorderBillingButtonIDs_button(oneBillingButton, groupNum, i+1);
  }
}


function reorderBillingButtonIDs_button(oneBillingButton, groupNum, buttonNum){
  oneBillingButton.querySelector(".bcBillingButton_enabled").id = 
  `bcBillingButton${groupNum}_${buttonNum}_enabled`;
  oneBillingButton.querySelector(".bcBillingButton_name").id = 
  `bcBillingButton${groupNum}_${buttonNum}_name`;
  oneBillingButton.querySelector(".bcBillingButton_serviceCode1").id = 
  `bcBillingButton${groupNum}_${buttonNum}_serviceCode1`;
  oneBillingButton.querySelector(".bcBillingButton_serviceCode2").id = 
  `bcBillingButton${groupNum}_${buttonNum}_serviceCode2`;
  oneBillingButton.querySelector(".bcBillingButton_serviceCode3").id = 
  `bcBillingButton${groupNum}_${buttonNum}_serviceCode3`;
  oneBillingButton.querySelector(".bcBillingButton_dxCode1").id = 
  `bcBillingButton${groupNum}_${buttonNum}_dxCode1`;
  oneBillingButton.querySelector(".bcBillingButton_dxCode2").id = 
  `bcBillingButton${groupNum}_${buttonNum}_dxCode2`;
  oneBillingButton.querySelector(".bcBillingButton_dxCode3").id = 
  `bcBillingButton${groupNum}_${buttonNum}_dxCode3`;
  oneBillingButton.querySelector(".bcBillingButton_addon").id = 
  `bcBillingButton${groupNum}_${buttonNum}_addon`;
  oneBillingButton.querySelector(".bcBillingButton_shortcuts_enabled").id = 
  `bcBillingButton${groupNum}_${buttonNum}_shortcuts_enabled`;
  oneBillingButton.querySelector(".bcBillingButton_shortcuts_keybinding").id = 
  `bcBillingButton${groupNum}_${buttonNum}_shortcuts_keybinding`;
}

/* 
- Restores options from chrome.storage. 
- if a given setting wasn't present in storage, it takes the default value from defaultSettings. 
*/
function restore_options() {
  chrome.storage.local.get(defaultSettings, function (storage) {
    console.log(storage);
    restoreOptionsPageFromSettings(storage);
    findAllShortcutConflicts(storage);
    greyoutExtensionIcon();
  });
}





/* 
- with given settings object, set the values on the options page.
 */
function restoreOptionsPageFromSettings(settingsObject){
  // console.log(settingsObject);
  for (const [key, value] of Object.entries(settingsObject)){
    // console.log(`${key}: ${value}`);
    // console.log(typeof value == "boolean");
    // console.log(key.includes("_keybinding"));
    if (typeof value == "boolean"){
      document.getElementById(key).checked = value;
      setGreyout(document.getElementById(key));
      // console.log(document.getElementById(key).checked);
    } else if(typeof value == "string"){
      document.getElementById(key).value = value;
    } else if(key.includes("_keybinding")){
      document.getElementById(key).dataset.keybinding = JSON.stringify(value);
      document.getElementById(key).value = keybindingToText(value);
      
      // console.log(value);
      // console.log(document.getElementById(key).keybinding);
      // console.log(document.getElementById(key).value);
    } else if (key.includes("bcBillingButtonGroup")){
      const groupNum = key.split("bcBillingButtonGroup")[1];
      // console.log(groupNum);
      restoreOptionsPageFromSettings_bcBillingButtons(value, groupNum);
    }
    else{
      // console.log('hihi');
      console.assert(typeof value == "object");
      restoreOptionsPageFromSettings(value);
    }
  }
}

function restoreOptionsPageFromSettings_bcBillingButtons(settingsBCBillingButtonList, groupNum){
  // console.log(settingsBCBillingButtonList);
  
  for (let i = 0; i < settingsBCBillingButtonList.length; i++){
    const settingsBCBillingButton = settingsBCBillingButtonList[i];
    // console.log(settingsBCBillingButton);
    add_BCBillingButtonFromSetting(settingsBCBillingButton, groupNum, i+1);
  }
}

function add_BCBillingButtonFromSetting(settingsBCBillingButton, groupNum, buttonNum) {
  const bcBillingButton_serviceCode1 = 
    settingsBCBillingButton[`bcBillingButton${groupNum}_${buttonNum}_serviceCode1`];
  const isAgeBasedCode = checkIsAgeBasedCode(bcBillingButton_serviceCode1);

  add_BCBillingButtonBlank(groupNum, isAgeBasedCode);
  restoreOptionsPageFromSettings(settingsBCBillingButton);
}

function checkIsAgeBasedCode(serviceCode){
  for (const [key, value] of Object.entries(ageBasedCodeList)){
    // console.log(serviceCode);
    // console.log(key);
    if (serviceCode == key){
      return true;
    }
  }
  return false;
}

let ageBasedCodeList = {
  officeVisit: "Office Visit",
  counselling: "Counselling",
  consultation: "Consultation",
  completeExam: "Complete Exam",
  teleVisit: "Tele Visit",
  teleCounselling: "Tele Counselling",
  teleConsultation: "Tele Consultation"
}


function add_BCBillingButtonBlank(groupNum, isAgeBasedCode) {
  const buttonGroup = document.getElementById("bcBillingButtonGroup" + groupNum);
  const buttonNum = buttonGroup.children.length;
  const emptyKeybinding = JSON.stringify(returnEmptyKeybinding());

  const div = document.createElement("div");
  div.setAttribute("class", "subRow1 bcBillingButtonGroup");

  let enabled = document.createElement('input');
  enabled.id = `bcBillingButton${groupNum}_${buttonNum}_enabled`;
  enabled.type = "checkbox";
  enabled.className = "bcBillingButton_enabled";
  div.appendChild(enabled);

  let name = document.createElement('input');
  name.id = `bcBillingButton${groupNum}_${buttonNum}_name`;
  name.type = "text";
  name.className = "bcBillingButton_name billingButtonCustomText";
  name.placeholder = "button name";
  div.appendChild(name);

  let serviceCodeInput1;
  if(isAgeBasedCode){
    serviceCodeInput1 = document.createElement('select');
    serviceCodeInput1.id = `bcBillingButton${groupNum}_${buttonNum}_serviceCode1`;
    serviceCodeInput1.className = "bcBillingButton_serviceCode1 billingButtonCustomText ageBasedServiceCode";
    serviceCodeInput1.placeholder = "Service code";
    addAgeBasedCodeOptions(serviceCodeInput1);
  }
  else{
    serviceCodeInput1 = document.createElement('input');
    serviceCodeInput1.id = `bcBillingButton${groupNum}_${buttonNum}_serviceCode1`;
    serviceCodeInput1.className = "bcBillingButton_serviceCode1 billingButtonCustomText";
    serviceCodeInput1.type = "text";
    serviceCodeInput1.placeholder = "Service code";
  }
  div.appendChild(serviceCodeInput1);

  let serviceCodeInput2 = document.createElement('input');
  serviceCodeInput2.id = `bcBillingButton${groupNum}_${buttonNum}_serviceCode2`;
  serviceCodeInput2.className = "bcBillingButton_serviceCode2 billingButtonCustomText";
  serviceCodeInput2.type = "text";
  serviceCodeInput2.placeholder = "Service code";
  div.appendChild(serviceCodeInput2);

  let serviceCodeInput3 = document.createElement('input');
  serviceCodeInput3.id = `bcBillingButton${groupNum}_${buttonNum}_serviceCode3`;
  serviceCodeInput3.className = "bcBillingButton_serviceCode3 billingButtonCustomText";
  serviceCodeInput3.type = "text";
  serviceCodeInput3.placeholder = "Service code";
  div.appendChild(serviceCodeInput3);

  let dxCode1 = document.createElement('input');
  dxCode1.id = `bcBillingButton${groupNum}_${buttonNum}_dxCode1`;
  dxCode1.type = "text";
  dxCode1.className = "bcBillingButton_dxCode1 billingButtonCustomText";
  dxCode1.placeholder = "Dx code 1";
  div.appendChild(dxCode1);

  let dxCode2 = document.createElement('input');
  dxCode2.id = `bcBillingButton${groupNum}_${buttonNum}_dxCode2`;
  dxCode2.type = "text";
  dxCode2.className = "bcBillingButton_dxCode2 billingButtonCustomText";
  dxCode2.placeholder = "Dx code 2";
  div.appendChild(dxCode2);

  let dxCode3 = document.createElement('input');
  dxCode3.id = `bcBillingButton${groupNum}_${buttonNum}_dxCode3`;
  dxCode3.type = "text";
  dxCode3.className = "bcBillingButton_dxCode3 billingButtonCustomText";
  dxCode3.placeholder = "Dx code 3";
  div.appendChild(dxCode3);

  let removeParent = document.createElement('button');
  removeParent.className = "removeParent";
  removeParent.innerText = "X";
  div.appendChild(removeParent);

  const divSubRow2 = document.createElement("div");
  divSubRow2.setAttribute("class", "subRow2");

    const divAddon = document.createElement("div");
    divAddon.setAttribute("class", "buttonShortcut");

      let addonLabel = document.createElement('label');
      addonLabel.for = `bcBillingButton${groupNum}_${buttonNum}_addon`;
      addonLabel.className = "bcBillingButton_addon_label";
      addonLabel.innerText = "Billing code type: ";
      divAddon.appendChild(addonLabel);

      let addon = document.createElement('select');
      addon.id = `bcBillingButton${groupNum}_${buttonNum}_addon`;
      addon.className = "bcBillingButton_addon";
      addon.innerHTML = `<option value="standardBilling">Standard billing code</option>
                        <option value="addonBilling">Billing addon</option>`;
      divAddon.appendChild(addon);

    const divShortcut = document.createElement("div");
    divShortcut.setAttribute("class", "shortcut buttonShortcut");

      let shortcutEnable = document.createElement('input');
      shortcutEnable.id = `bcBillingButton${groupNum}_${buttonNum}_shortcuts_enabled`;
      shortcutEnable.className = "bcBillingButton_shortcuts_enabled";
      shortcutEnable.type = "checkbox"
      divShortcut.appendChild(shortcutEnable);

      let shortcut = document.createElement('input');
      shortcut.id = `bcBillingButton${groupNum}_${buttonNum}_shortcuts_keybinding`;
      shortcut.className = "customKey bcBillingButton_shortcuts_keybinding";
      shortcut.dataset.shortcutGroup = "billingCodeInput_shortcut";
      shortcut.dataset.keybinding = emptyKeybinding;
      shortcut.type = "text";
      shortcut.placeholder = "press a key";
      divShortcut.appendChild(shortcut);

      let warning = document.createElement('label');
      warning.className = "warning hide";
      warning.title = "Conflicts only occur if the same keyboard shortcut is assigned to two different actions on the same page. There is no issue if the same shortcut appears on different pages. In case of conflicts, only one of the actions will be performed.";
      warning.innerText = "WARNING: Shortcut conflicts with another shortcut on the same page.";
      divShortcut.appendChild(warning);
  
  divSubRow2.appendChild(divAddon);
  divSubRow2.appendChild(divShortcut);

  div.appendChild(divSubRow2);

  buttonGroup.insertBefore(
    div,
    buttonGroup.children[buttonGroup.childElementCount - 1]
  );
}

function getAgeBasedCodeOptions(){
  let optionsList = "";
  for (const [key, value] of Object.entries(ageBasedCodeList)){
    const oneOption = `<option value="${key}">${value}</option>`
    optionsList += oneOption;
  }
  return optionsList;
}

function addAgeBasedCodeOptions(serviceCodeInput1){
  for (const [key, value] of Object.entries(ageBasedCodeList)){
    let oneOption = document.createElement('option'); //`<option value="${key}">${value}</option>`
    oneOption.value = key;
    oneOption.innerText = value;
    serviceCodeInput1.appendChild(oneOption);
  }
}


function findAllShortcutConflicts(settingsObject){
  // console.log(settingsObject);
  
  const allShortcutGroups = findAllShortcutGroups(settingsObject, new Set());
  // console.log(allShortcutGroups);
  for (let shortcutGroup of allShortcutGroups){
    checkShortcutGroupConflict(shortcutGroup);
  }

}

function findAllShortcutGroups(settingsObject, shortcutGroupsSeenSoFar){
  for (const [key, value] of Object.entries(settingsObject)){
    if(key.includes("_keybinding")){
      const shortcutGroup = document.getElementById(key).getAttribute('data-shortcutgroup');
      shortcutGroupsSeenSoFar.add(shortcutGroup);
    }
    else if(typeof value == "object"){
      findAllShortcutGroups(value, shortcutGroupsSeenSoFar);
    }
  }

  // console.log(shortcutGroupsSeenSoFar);
  return shortcutGroupsSeenSoFar;
}


/* 
- stores the default settings to storage.
 */
function restore_defaults() {
  chrome.storage.local.set(defaultSettings, function () {
    restore_options();
    document
      .querySelectorAll(".removeParent")
      .forEach((button) => button.click()); // Remove added shortcuts
    // Update status to let user know options were saved.
    var status = document.getElementById("status");
    status.textContent = "Default options restored";
    setTimeout(function () {
      status.textContent = "";
    }, 1000);
  });
}

function restore_defaults2() {
  restore_defaults();

  setTimeout(() => {
    console.log('restored2')
    document.getElementById("eChartButton1_fid").value = "510";
    document.getElementById("eChartButton2_fid").value = "359";
    document.getElementById("eChartButton3_fid").value = "293";
    document.getElementById("eChartButton4_fid").value = "291";
    document.getElementById("inboxItem_styleChange").click();
  }, 1000);
  
}

function show_experimental() {
  document
    .querySelectorAll(".customForce")
    .forEach((item) => (item.style.display = "inline-block"));
}


// just for testing
async function setTestSettings(){
  browser.storage.local.set(testSettings);
}

/* 
PURPOSE: 
- adds greyout to classlist of the given element. so that it can be greyed out using CSS.
ASSUME: the element is an input type checkbox.
NOTE:
- gets greyout type: 
  - if under a row: type is greyoutBlock. if under a subRow1, type is greyoutRow1. if under subRow2, type is greyoutRow2.
- toggles greyoutType in the classlist of the given element's parent and all the child inputs.
- greyoutType is used so that a given element can have multiple greyoutTypes, and will only stop being grey when all greyoutTypes are removed from teh classlist.
 */
function setGreyout(theElement){
  if (theElement.id == "enabled"){
    setGreyoutAllSettings();
    return;
  }
  const greyoutType = getGreyoutType(theElement);
  const parentTarget = theElement.parentNode;
  parentTarget.classList.toggle(greyoutType, !theElement.checked);
  const customTextInputList = parentTarget.getElementsByTagName("INPUT");
  for (let i = 0 ; i < customTextInputList.length; i++){
    const customKeyInput = customTextInputList[i];
    customKeyInput.classList.toggle(greyoutType, !theElement.checked);  
  }
}


function getGreyoutType(theElement){
  const parentTarget = theElement.parentNode;
  const parentClassList = parentTarget.classList;
  if(parentClassList.contains("row")){
    return "greyoutBlock"
  } else if(parentClassList.contains("subRow1")){
    return "greyoutRow1"
  } else if (parentClassList.contains("subRow2")){
    return "greyoutRow2"
  } else {
    return getGreyoutType(parentTarget);
  }
}

function setGreyoutAllSettings(){
  const globalEnable = document.getElementById("enabled");
  const allSettings = document.getElementById("allSettings");
  const greyoutType = "greyoutAll"
  allSettings.classList.toggle(greyoutType, !globalEnable.checked);
  const customTextInputList = allSettings.getElementsByTagName("INPUT");
  for (let i = 0 ; i < customTextInputList.length; i++){
    const customKeyInput = customTextInputList[i];
    customKeyInput.classList.toggle(greyoutType, !globalEnable.checked);  
  }
}
/* 
PURPOSE
- greys out the extension icon if enabled is false.
 */
function greyoutExtensionIcon(){
  const globalEnable = document.getElementById("enabled");
  const enabled = globalEnable.checked;
  const suffix = `${enabled ? "" : "_disabled"}.png`;
  // console.log(enabled);
  // console.log(suffix);
  chrome.browserAction.setIcon({
    path: {
      "16": "icons/OSCAR_16px" + suffix,
      "32": "icons/OSCAR_32px" + suffix
    }
  });
}

let unsavedChanges = new Set();

/* 
PURPOSE
- check if targetValue in options matches the value settings. If not, add it to set of unsavedChanges
- toggle optionsUnsaved in the save button classlist, depending on if unsavedChanges is empty.
*/
async function checkHighlightSaveButton(theTarget){
  // console.log(theTarget);
  const isOptionsUnsaved = await checkOptionsUnsaved(theTarget);

  // if the current target is not saved to settings, add it to the set of unsavedChanges.
  if (isOptionsUnsaved){
    unsavedChanges.add(theTarget);
  }
  else {
    unsavedChanges.delete(theTarget);
  }
  console.log(unsavedChanges);

  // toggle optionsUnsaved in the save button classlist, depending on if unsavedChanges is empty.
  document.getElementById("saveHeader").classList.toggle("optionsUnsaved", unsavedChanges.size != 0);
  
}


function targetEventCaller(theTarget, className, funcName) {
  if (!theTarget.classList || !theTarget.classList.contains(className)) {
    return;
  }
  funcName(theTarget);
}


/* 
- get one of the sibling elements of the remove button.
- check if it exists in stored settings. 
  - if exists, add it to the set of unsavedChanges, since we just removed the stored element. 
  - if "not found", then it never existed to begin with, so no change was made. also, iterate over unsavedChanges. removing all elements from the unsavedChanges set that are children of this parent.
- finally, toggle highlighting of the save button depending on whether unsavedChanges are present.
*/
async function highlightSaveButtonOnRemove(event){
  const removeButton = event.target;
  const theParent = removeButton.parentNode;
  const childCheckbox = theParent.querySelector("[class*='_enabled']");
  const childCheckboxID = childCheckbox.id;

  const settingsObject = await browser.storage.local.get(defaultSettings);
  const targetValueInSettings = getTargetValueFromSettings(childCheckboxID, settingsObject);
  console.log(targetValueInSettings)
  if(targetValueInSettings == "not found"){
    /* 
    - iterate over unsavedChanges. removing all elements from the unsavedChanges set that are children of this parent.
    */
    for (let unsavedElement of unsavedChanges){
      if(unsavedElement.parentNode == theParent){
        unsavedChanges.delete(unsavedElement);
      }
    }
  }
  else {
    unsavedChanges.add(childCheckbox);
    // document.getElementById("saveHeader").classList.toggle("optionsUnsaved", true);
  }
  console.log(unsavedChanges);
  // toggle optionsUnsaved in the save button classlist, depending on if unsavedChanges is empty.
  document.getElementById("saveHeader").classList.toggle("optionsUnsaved", unsavedChanges.size != 0);
    
}

/* 
PURPOSE
- return true if the targetValue in options is different than the value in settings.
 */
async function checkOptionsUnsaved(theTarget){
  const targetID = theTarget.id;
  const settingsObject = await browser.storage.local.get(defaultSettings);
  // console.log(targetID);
  const targetValueInSettings = getTargetValueFromSettings(targetID, settingsObject);
  console.log(targetValueInSettings)


  /*
  - get targetValue from options page. compare to the targetValue from saved settings.
  - the targetValue from options will be different depending on the type of target.
   */
  let isOptionsUnsaved;
  let targetValueInOptions;
  if (theTarget.type == "checkbox"){
    targetValueInOptions = theTarget.checked;
    isOptionsUnsaved = targetValueInSettings != targetValueInOptions;
  }
  else if (theTarget.classList.contains("customKey")){
    targetValueInOptions = theTarget.dataset.keybinding;
    // console.log(targetValueInOptions);
    // if(!isEmptyKeybinding(targetValueInOptions)){
    // }
    targetValueInOptions = JSON.parse(targetValueInOptions);

    isOptionsUnsaved = !keybindingMatches(targetValueInSettings, targetValueInOptions);
  }
  else if (theTarget.classList.contains("customFID") 
  || theTarget.classList.contains("customButtonTitle") 
  || theTarget.classList.contains("billingButtonCustomText")
  || theTarget.classList.contains("bcBillingButton_addon")){

    targetValueInOptions = theTarget.value;
    isOptionsUnsaved = targetValueInSettings != targetValueInOptions;
  }

  // console.log(isOptionsUnsaved);
  
  return isOptionsUnsaved;
}


function getTargetValueFromSettings(targetID, settingsStructure){
  // console.log(targetID);
  // console.log(settingsStructure);
  let targetValue = "not found";
  for (const [key, value] of Object.entries(settingsStructure)){
    // console.log(key);
    if(key == targetID){
      targetValue = value;
      break;
    } 
    else if(key.includes("_keybinding")){
      continue;
    }
    else if(typeof value == "object"){
      targetValue = getTargetValueFromSettings(targetID, value);
      if (targetValue != "not found"){
        break;
      }
    }
  }
  // console.log(targetValue);
  return targetValue;
}

document.addEventListener("DOMContentLoaded", async function () {
  // save_options();

  // await setTestSettings();
  // console.log(defaultSettings);
  // console.log(await browser.storage.local.get(defaultSettings));

  // await checkStoredSettingsStructure();
  restore_options();

  const settingsStructure = await browser.storage.local.get(defaultSettings)
  // console.log(settingsStructure);

  document.getElementById("save").addEventListener("click", save_options);
  document.getElementById("saveHeader").addEventListener("click", save_options);
  // document.getElementById("checkAllSettings").addEventListener("click", checkAllSettings);
  // document.getElementById("uncheckAllSettings").addEventListener("click", uncheckAllSettings);

  window.addEventListener('keydown', function(theEvent) {
		var theKey = theEvent.key;
		var theAltKey = theEvent.altKey;
		var theCtrlKey = theEvent.ctrlKey;
		var theShiftKey= theEvent.shiftKey;
		let theTarget;		
		switch(true){				
			case (theCtrlKey && theAltKey && theKey ==  'z'):
      document.getElementById("save").click();
				break;	
		}
	}, true);
  
  document.getElementById("addAgeBasedButton1").addEventListener("click", function() {
    add_BCBillingButtonBlank(1, true);
  });
  document.getElementById("addAgeBasedButton2").addEventListener("click", function() {
    add_BCBillingButtonBlank(2, true);
  });
  document.getElementById("addAgeBasedButton3").addEventListener("click", function() {
    add_BCBillingButtonBlank(3, true);
  });

  document.getElementById("add1").addEventListener("click", function() {
    add_BCBillingButtonBlank(1, false);
  });
  document.getElementById("add2").addEventListener("click", function() {
    add_BCBillingButtonBlank(2, false);
  });
  document.getElementById("add3").addEventListener("click", function() {
    add_BCBillingButtonBlank(3, false);
  });

  document.getElementById("restore").addEventListener("click", restore_defaults);
  document.getElementById("restore2").addEventListener("click", restore_defaults2);
  // document
  //   .getElementById("experimental")
  //   .addEventListener("click", show_experimental);

  function eventCaller(event, className, funcName) {
    if (!event.target.classList || !event.target.classList.contains(className)) {
      // console.log(event.target)
      // console.log(event.target.classList)
      return;
    }
    funcName(event);
  }



  // document.getElementById("schedule_shortcut_openInbox_keybinding").value = "hihi100"; 
  document.addEventListener("keypress", (event) => {
    eventCaller(event, "customValue", inputFilterNumbersOnly);
  });

  // use focusin instead of focus, because focusin bubbles
  document.addEventListener("focusin", (event) => {
    eventCaller(event, "customKey", inputFocus);
  });

  document.addEventListener("keydown", (event) => {
    eventCaller(event, "customKey", recordKeyPress);
    // console.log(event);
  });

    // use focusout instead of blur, because focusout bubbles
    document.addEventListener("focusout", (event) => {
      let theTarget = event.target;
      eventCaller(event, "customFID", convertURLToFID);
      eventCaller(event, "customKey", checkShortcutConflictFromCustomKeyFocusOut);
      
      targetEventCaller(theTarget, "customKey", checkHighlightSaveButton);
      targetEventCaller(theTarget, "customFID", checkHighlightSaveButton);
      targetEventCaller(theTarget, "customButtonTitle", checkHighlightSaveButton);
      targetEventCaller(theTarget, "billingButtonCustomText", checkHighlightSaveButton);
      targetEventCaller(theTarget, "bcBillingButton_addon", checkHighlightSaveButton);
    });

  document.addEventListener("click", (event) => {
    let theTarget = event.target;
    if(theTarget.type == "checkbox"){//theTarget.tagName  == "INPUT" && 
      setGreyout(theTarget);
      checkHighlightSaveButton(theTarget);
    }

    if(theTarget.id == "enabled"){
      greyoutExtensionIcon();
    }
  });

  document.addEventListener("click", (event) => {
    eventCaller(event, "removeParent", checkShortcutConflictFromRemoveParentClick);
    eventCaller(event, "removeParent", highlightSaveButtonOnRemove);
  });

  document.addEventListener("change", (event) => {
    eventCaller(event, "customDo", function () {
      if (customActionsNoValues.includes(event.target.value)) {
        event.target.nextElementSibling.nextElementSibling.disabled = true;
        event.target.nextElementSibling.nextElementSibling.value = 0;
      } else {
        event.target.nextElementSibling.nextElementSibling.disabled = false;
      }
    });
  });
});





