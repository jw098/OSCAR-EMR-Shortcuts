

var testSettings = {
  enabled: true, // default enabled
  allergyQuickAdd: true,

  billingCodeInput:{
    billingButtons: true,
    billingCodeInput_PageEnd: true,
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

  if(e.key == "Backspace"){
    e.target.value = "";
  }
  else {
    const theKeybinding = {
      ctrlKey: e.ctrlKey,
      shiftKey: e.shiftKey,
      altKey: e.altKey,
      key: e.key
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

}

function keybindingToText(theKeybinding){
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
function checkShortcutConflictFromEvent(e){
  const theTarget = e.target;
  const shortcutGroup = e.target.getAttribute('data-shortcutgroup');
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
    // console.log(anInput);
    // console.log(anInput.dataset.keybinding);
    const anInputKeybinding = JSON.parse(anInput.dataset.keybinding);
    const anInputWarning = anInput.parentNode.querySelector(".warning");

    if (isEmptyKeybinding(anInputKeybinding)){
      continue;
    }

    const restOfInputList = inputListInSameGroup.slice(i+1);
    for (let j = 0; j < restOfInputList.length; j++){
      const anInputFromRestOfList = restOfInputList[j];
      const anInputFromRestOfList_keybinding = JSON.parse(anInputFromRestOfList.dataset.keybinding);
      // console.log(anInputFromRestOfList);
      // console.log(anInput);
      if(isSameKeybinding(anInputKeybinding, anInputFromRestOfList_keybinding)){
        shortcutGroupsInConflict.add(shortcutGroup);
        const h1Warning = document.querySelector("h1").querySelector(".warning");
        h1Warning.classList.toggle("hide", false);

        anInputWarning.classList.toggle("hide", false);
        
        const anInputFromRestOfList_warning = anInputFromRestOfList.parentNode.querySelector(".warning");
        anInputFromRestOfList_warning.classList.toggle("hide", false);
      }
    }
  }
  

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

// return true if the given keybinding is empty
function isEmptyKeybinding(keybinding){
  return keybinding.ctrlKey == false
  && keybinding.altKey == false
  && keybinding.shiftKey == false
  && keybinding.key == "";

}

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

function add_BCBillingButtonBlank() {
  const div = document.createElement("div");
  div.setAttribute("class", "subRow1");
  div.innerHTML = `
  <input type="checkbox"/>
  <input id="bcBillingButton1_name" class="" type="text" value="" placeholder="button name"/>
  <input id="bcBillingButton1_serviceCode" class="" type="text" value="" placeholder="Service code"/>
  <input class="" type="text" value="" placeholder="Dx code 1"/>
  <input class="" type="text" value="" placeholder="Dx code 2"/>
  <input class="" type="text" value="" placeholder="Dx code 3"/>
  <button class="removeParent">X</button>
  <div class="subRow2">
    <div class="buttonShortcut">
      <input id="bcBillingButton1_addon" type="checkbox"/>
      <label for="bcBillingButton1_addon" class="enableButton">Billing Addon</label>
    </div>
    <div class="shortcut buttonShortcut">
      <input id="bcBillingButton1_shortcuts_enabled" type="checkbox" />
      <input
        id="bcBillingButton1_shortcuts_keybinding" 
        class="customKey"
        data-shortcutgroup="billingCodeInput_shortcut"
        data-keybinding="{\"ctrlKey\":false,\"shiftKey\":false,\"altKey\":false,\"key\":\"\"}"
        type="text"
        value=""
        placeholder="press a key"
      />
      <label class="warning hide" title="Conflicts only occur if the same keyboard shortcut is assigned to two different actions on the same page. There is no issue if the same shortcut appears on different pages. In case of conflicts, only one of the actions will be performed." >
        WARNING: Shortcut conflicts with another shortcut on the same page. 
      </label>
    </div>
  </div>
  `;
  
  const buttonGroup = document.getElementById("bcBillingButtonGroup1");
  buttonGroup.insertBefore(
    div,
    buttonGroup.children[buttonGroup.childElementCount - 1]
  );
}



async function checkAllSettings(){
  const settingsObject = await browser.storage.sync.get(defaultSettings);
  adjustAllSettings(true, settingsObject);
}

async function uncheckAllSettings(){
  const settingsObject = await browser.storage.sync.get(defaultSettings);
  adjustAllSettings(false, settingsObject);
}

function adjustAllSettings(checkAllSettings, settingsObject){
  for (const [key, value] of Object.entries(settingsObject)){
    if (typeof value == "boolean"){
      const theTarget = document.getElementById(key);
      theTarget.checked = checkAllSettings;
      highlightSaveButton(theTarget);
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
  chrome.storage.sync.set(
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
    console.log(await browser.storage.sync.get(defaultSettings));
    // console.log(await browser.storage.sync.get("tcDefaults"));
  })();

}

/* 
- given a settings object which provides the structure for the object, return a settings object with values taken from the options page.


 */
function setSettingsFromOptionsPage(settingsStructure){
  let newSettings = {};
  for (const [key, value] of Object.entries(settingsStructure)){
    if (typeof value == "boolean"){
      // console.log(key);
      newSettings[key] = document.getElementById(key).checked;
      // console.log(document.getElementById(key).checked);
    } else if(typeof value == "string"){
      // console.log(key);
      newSettings[key] = document.getElementById(key).value;
    } else if(key.includes("_keybinding")){
      newSettings[key] = JSON.parse(document.getElementById(key).dataset.keybinding);
      // console.log(value);
      // console.log(newSettings[key]);
    } else if (key.includes("bcBillingButtonGroup")){
      console.log('hihi');
      newSettings[key] = setSettingsFromOptionsPage_bcBillingButtons(key);
    }
    else{
      console.assert(typeof value == "object");
      newSettings[key] =  setSettingsFromOptionsPage(value);
    }

  }
  // console.log(newSettings);

  return newSettings;
}


function setSettingsFromOptionsPage_bcBillingButtons(bcBillingButtonGroup){
  const billingButtonGroup_Options = document.getElementById(bcBillingButtonGroup);
  const billingButtonList =  Array.from(billingButtonGroup_Options.querySelectorAll(".bcBillingButtonRow1"));
  console.log(billingButtonList);
  let billingButtonGroup_Settings = [];
  for (let i = 0; i < billingButtonList.length; i++){
    console.log("test1234");
    const oneBillingButton_Option = billingButtonList[i];
    console.log(oneBillingButton_Option);
    const oneBillingButton_Settings = createBillingButtonSettingFromOption(oneBillingButton_Option);
    billingButtonGroup_Settings.push(oneBillingButton_Settings);
  }

  console.log(billingButtonGroup_Settings);
  return billingButtonGroup_Settings;
}

function createBillingButtonSettingFromOption(oneBillingButton_Option) {
  const buttonEnabled = oneBillingButton_Option.querySelector(".bcBillingButton1_enabled").checked;
  console.log(buttonEnabled);
  const buttonName = oneBillingButton_Option.querySelector(".bcBillingButton1_name").value;
  const serviceCode = oneBillingButton_Option.querySelector(".bcBillingButton1_serviceCode").value;
  const dxCode1 = oneBillingButton_Option.querySelector(".bcBillingButton1_dxCode1").value;
  const dxCode2 = oneBillingButton_Option.querySelector(".bcBillingButton1_dxCode2").value;
  const dxCode3 = oneBillingButton_Option.querySelector(".bcBillingButton1_dxCode3").value;
  const addon = oneBillingButton_Option.querySelector(".bcBillingButton1_addon").checked;
  const shortcutEnabled = oneBillingButton_Option.querySelector(".bcBillingButton1_shortcuts_enabled").checked;
  const keybinding = JSON.parse(oneBillingButton_Option.querySelector(".bcBillingButton1_shortcuts_keybinding").dataset.keybinding);

  

  const oneBillingButton_Settings = {
    bcBillingButton1_enabled: buttonEnabled,
    bcBillingButton1_name: buttonName,
    bcBillingButton1_serviceCode: serviceCode,
    bcBillingButton1_dxCode1: dxCode1,
    bcBillingButton1_dxCode2: dxCode2,
    bcBillingButton1_dxCode3: dxCode3,

    bcBillingButton1_addon: addon,
    bcBillingButton1_shortcuts:{
      bcBillingButton1_shortcuts_enabled: shortcutEnabled,
      bcBillingButton1_shortcuts_keybinding: keybinding
    }

  };

  return oneBillingButton_Settings;
}


/* 
- Restores options from chrome.storage. 
- if a given setting wasn't present in storage, it takes the default value from defaultSettings. 
*/
function restore_options() {
  chrome.storage.sync.get(defaultSettings, function (storage) {
    // console.log(storage);
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
      restoreOptionsPageFromSettings_bcBillingButtons(value);
    }
    else{
      // console.log('hihi');
      console.assert(typeof value == "object");
      restoreOptionsPageFromSettings(value);
    }
  }
}

function restoreOptionsPageFromSettings_bcBillingButtons(settingsBCBillingButtonList){
  console.log(settingsBCBillingButtonList);
  
  for (let i in settingsBCBillingButtonList){
    const settingsBCBillingButton = settingsBCBillingButtonList[i];
    console.log(settingsBCBillingButton);
    add_BCBillingButtonFromSetting(settingsBCBillingButton);
  }
}


function add_BCBillingButtonFromSetting(settingsBCBillingButton) {
  const bcBillingButton1_enabled = settingsBCBillingButton.bcBillingButton1_enabled;
  const bcBillingButton1_name = settingsBCBillingButton.bcBillingButton1_name;
  const bcBillingButton1_serviceCode = settingsBCBillingButton.bcBillingButton1_serviceCode;
  const bcBillingButton1_dxCode1 = settingsBCBillingButton.bcBillingButton1_dxCode1;
  const bcBillingButton1_dxCode2 = settingsBCBillingButton.bcBillingButton1_dxCode2;
  const bcBillingButton1_dxCode3 = settingsBCBillingButton.bcBillingButton1_dxCode3;
  const bcBillingButton1_addon = settingsBCBillingButton.bcBillingButton1_addon;
  const bcBillingButton1_shortcuts = settingsBCBillingButton.bcBillingButton1_shortcuts;
  const bcBillingButton1_shortcuts_enabled = 
    bcBillingButton1_shortcuts. bcBillingButton1_shortcuts_enabled;
  const bcBillingButton1_shortcuts_keybinding = 
    bcBillingButton1_shortcuts. bcBillingButton1_shortcuts_keybinding;
  const keybindingText = keybindingToText(bcBillingButton1_shortcuts_keybinding);
  const keybindingJSONString = JSON.stringify(bcBillingButton1_shortcuts_keybinding);

  let bcBillingButton1_checked = "";
  if(bcBillingButton1_enabled){
    bcBillingButton1_checked = "checked";
  }

  let bcBillingButton1_addon_checked = "";
  if(bcBillingButton1_addon){
    bcBillingButton1_addon_checked = "checked";
  }

  let bcBillingButton1_shortcuts_checked = "";
  if (bcBillingButton1_shortcuts_enabled){
    bcBillingButton1_shortcuts_checked = "checked";
  }


  const div = document.createElement("div");
  div.setAttribute("class", "subRow1 bcBillingButtonRow1");
  div.innerHTML = `
  <input type="checkbox" class="bcBillingButton1_enabled" value=${bcBillingButton1_enabled}/ ${bcBillingButton1_checked}>
  <input id="bcBillingButton1_name" class="bcBillingButton1_name" type="text" value=${bcBillingButton1_name} placeholder="button name"/>
  <input id="bcBillingButton1_serviceCode" class="bcBillingButton1_serviceCode" type="text" value=${bcBillingButton1_serviceCode} placeholder="Service code"/>
  <input class="bcBillingButton1_dxCode1" type="text" value=${bcBillingButton1_dxCode1} placeholder="Dx code 1"/>
  <input class="bcBillingButton1_dxCode2" type="text" value=${bcBillingButton1_dxCode2} placeholder="Dx code 2"/>
  <input class="bcBillingButton1_dxCode3" type="text" value=${bcBillingButton1_dxCode3} placeholder="Dx code 3"/>
  <button class="removeParent">X</button>
  <div class="subRow2">
    <div class="buttonShortcut">
      <input id="bcBillingButton1_addon" class="bcBillingButton1_addon" type="checkbox" value=${bcBillingButton1_addon} ${bcBillingButton1_addon_checked}/>
      <label for="bcBillingButton1_addon" class="enableButton">Billing Addon</label>
    </div>
    <div class="shortcut buttonShortcut">
      <input id="bcBillingButton1_shortcuts_enabled" class="bcBillingButton1_shortcuts_enabled" type="checkbox" value=${bcBillingButton1_shortcuts_enabled} ${bcBillingButton1_shortcuts_checked}/>
      <input
        id="bcBillingButton1_shortcuts_keybinding" 
        class="customKey bcBillingButton1_shortcuts_keybinding"
        data-shortcutgroup="billingCodeInput_shortcut"
        data-keybinding=${keybindingJSONString}
        type="text"
        value=${keybindingText}
        placeholder="press a key"
      />
      <label class="warning hide" title="Conflicts only occur if the same keyboard shortcut is assigned to two different actions on the same page. There is no issue if the same shortcut appears on different pages. In case of conflicts, only one of the actions will be performed." >
        WARNING: Shortcut conflicts with another shortcut on the same page. 
      </label>
    </div>
  </div>
  `;
  console.log(div);
  const buttonGroup = document.getElementById("bcBillingButtonGroup1");
  buttonGroup.insertBefore(
    div,
    buttonGroup.children[buttonGroup.childElementCount - 1]
  );
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
  chrome.storage.sync.set(defaultSettings, function () {
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

function show_experimental() {
  document
    .querySelectorAll(".customForce")
    .forEach((item) => (item.style.display = "inline-block"));
}


// just for testing
async function setTestSettings(){
  browser.storage.sync.set(testSettings);
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
  console.log(enabled);
  console.log(suffix);
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
async function highlightSaveButton(theTarget){
  const isOptionsUnsaved = await checkOptionsUnsaved(theTarget);

  // if the current target is not saved to settings, add it to the set of unsavedChanges.
  if (isOptionsUnsaved){
    unsavedChanges.add(theTarget);
  }
  else {
    unsavedChanges.delete(theTarget);
  }
  // console.log(unsavedChanges);

  // toggle optionsUnsaved in the save button classlist, depending on if unsavedChanges is empty.
  document.getElementById("saveHeader").classList.toggle("optionsUnsaved", unsavedChanges.size != 0);
  
}

/* 
PURPOSE
- return true if the targetValue in options is different than the value in settings.
 */
async function checkOptionsUnsaved(theTarget){
  const targetID = theTarget.id;
  const settingsObject = await browser.storage.sync.get(defaultSettings);
  // console.log(targetID);
  const targetValueInSettings = getTargetValueFromSettings(targetID, settingsObject);

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
    targetValueInOptions = JSON.parse(theTarget.dataset.keybinding);
    isOptionsUnsaved = !keybindingMatches(targetValueInSettings, targetValueInOptions);
  }
  else if (theTarget.classList.contains("customFID")){
    targetValueInOptions = theTarget.value;
    isOptionsUnsaved = targetValueInSettings != targetValueInOptions;
  }
  else if (theTarget.classList.contains("customButtonTitle")){
    targetValueInOptions = theTarget.value;
    isOptionsUnsaved = targetValueInSettings != targetValueInOptions;
  }

  return isOptionsUnsaved;
}


function getTargetValueFromSettings(targetID, settingsStructure){
  // console.log(targetID);
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

  return targetValue;
}

document.addEventListener("DOMContentLoaded", async function () {
  // save_options();

  // await setTestSettings();
  // console.log(defaultSettings);
  // console.log(await browser.storage.sync.get(defaultSettings));

  // await checkStoredSettingsStructure();
  restore_options();

  const settingsStructure = await browser.storage.sync.get(defaultSettings)
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

  document.getElementById("add").addEventListener("click", add_BCBillingButtonBlank);
  document
    .getElementById("restore")
    .addEventListener("click", restore_defaults);
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

  function targetEventCaller(theTarget, className, funcName) {
    if (!theTarget.classList || !theTarget.classList.contains(className)) {
      return;
    }
    funcName(theTarget);
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
      eventCaller(event, "customKey", checkShortcutConflictFromEvent);
      targetEventCaller(theTarget, "customKey", highlightSaveButton);
      targetEventCaller(theTarget, "customFID", highlightSaveButton);
      targetEventCaller(theTarget, "customButtonTitle", highlightSaveButton);
      
    });

  document.addEventListener("click", (event) => {
    let theTarget = event.target;
    if(theTarget.type == "checkbox"){//theTarget.tagName  == "INPUT" && 
      setGreyout(theTarget);
      highlightSaveButton(theTarget);
    }

    if(theTarget.id == "enabled"){
      greyoutExtensionIcon();
    }
  });

  document.addEventListener("click", (event) => {
    eventCaller(event, "removeParent", function () {
      event.target.parentNode.remove();
    });
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




