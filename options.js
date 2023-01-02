

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

    e.target.keybinding = theKeybinding;

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
  console.log(shortcutGroup);
  const inputListInSameGroup = Array.from(document.querySelectorAll(`input[data-shortcutgroup=${shortcutGroup}]`));

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
    const anInputKeybinding = anInput.keybinding;
    const anInputWarning = anInput.parentNode.querySelector(".warning");

    if (isEmptyKeybinding(anInputKeybinding)){
      continue;
    }

    const restOfInputList = inputListInSameGroup.slice(i+1);
    for (let j = 0; j < restOfInputList.length; j++){
      const anInputFromRestOfList = restOfInputList[j];
      const anInputFromRestOfList_keybinding = anInputFromRestOfList.keybinding;
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

function add_shortcut() {
  var div = document.createElement("div");
  div.setAttribute("class", "row customs");
  div.innerHTML = `<select class="customDo">
  <option value="slower">Decrease speed</option>
  <option value="faster">Increase speed</option>
  <option value="rewind">Rewind</option>
  <option value="advance">Advance</option>
  <option value="reset">Reset speed</option>
  <option value="fast">Preferred speed</option>
  <option value="muted">Mute</option>
  <option value="pause">Pause</option>
  <option value="mark">Set marker</option>
  <option value="jump">Jump to marker</option>
  <option value="display">Show/hide controller</option>
  </select>
  <input class="customKey" type="text" placeholder="press a key"/>
  <input class="customValue" type="text" placeholder="value (0.10)"/>
  <select class="customForce">
  <option value="false">Do not disable website key bindings</option>
  <option value="true">Disable website key bindings</option>
  </select>
  <button class="removeParent">X</button>`;
  
  var customs_element = document.getElementById("customs");
  customs_element.insertBefore(
    div,
    customs_element.children[customs_element.childElementCount - 1]
  );
}

function createKeyBindings(item) {
  const action = item.querySelector(".customDo").value;
  const key = item.querySelector(".customKey").keyCode;
  const value = Number(item.querySelector(".customValue").value);
  const force = item.querySelector(".customForce").value;
  const predefined = !!item.id; //item.id ? true : false;

  keyBindings.push({
    action: action,
    key: key,
    value: value,
    force: force,
    predefined: predefined
  });
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
      console.log(key);
      newSettings[key] = document.getElementById(key).checked;
      // console.log(document.getElementById(key).checked);
    } else if(typeof value == "string"){
      console.log(key);
      newSettings[key] = document.getElementById(key).value;
    } else if(key.includes("_keybinding")){
      newSettings[key] = document.getElementById(key).keybinding;
      // console.log(value);
      // console.log(document.getElementById(key).keybinding);
    }
    else{
      console.assert(typeof value == "object");
      newSettings[key] =  setSettingsFromOptionsPage(value);
    }

  }
  // console.log(newSettings);

  return newSettings;
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
      document.getElementById(key).keybinding = value;
      document.getElementById(key).value = keybindingToText(value);
      
      // console.log(value);
      // console.log(document.getElementById(key).keybinding);
      // console.log(document.getElementById(key).value);
    }
    else{
      // console.log('hihi');
      console.assert(typeof value == "object");
      restoreOptionsPageFromSettings(value);
    }
  }
}

function findAllShortcutConflicts(settingsObject){
  // console.log(settingsObject);
  
  const allShortcutGroups = findAllShortcutGroups(settingsObject, new Set());
  console.log(allShortcutGroups);
  console.log('hi10');
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
- assumes the element is an input type checkbox.
 */
function setGreyout(theElement){
  const parentTarget = theElement.parentNode;
  let greyout;
  if(parentTarget.classList.contains("subRow")){
    greyout = "greyoutRow"
  }else {
    greyout = "greyoutBlock"
  }
  parentTarget.classList.toggle(greyout, !theElement.checked);
  const customTextInputList = parentTarget.getElementsByTagName("INPUT");
  for (i = 0 ;i < customTextInputList.length; i++){
    const customKeyInput = customTextInputList[i];
    customKeyInput.classList.toggle(greyout, !theElement.checked);  
  }
}


document.addEventListener("DOMContentLoaded", async function () {
  // save_options();

  // await setTestSettings();
  // console.log(defaultSettings);
  // console.log(await browser.storage.sync.get(defaultSettings));

  // await checkStoredSettingsStructure();
  restore_options();

  console.log(await browser.storage.sync.get(defaultSettings));

  document.getElementById("save").addEventListener("click", save_options);
  document.getElementById("saveHeader").addEventListener("click", save_options);
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

  // document.getElementById("add").addEventListener("click", add_shortcut);
  document
    .getElementById("restore")
    .addEventListener("click", restore_defaults);
  // document
  //   .getElementById("experimental")
  //   .addEventListener("click", show_experimental);

  function eventCaller(event, className, funcName) {
    if (!event.target.classList || !event.target.classList.contains(className)) {
      // console.log("no")
      // console.log(className)
      // console.log(event)
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
      eventCaller(event, "customFID", convertURLToFID);
      eventCaller(event, "customKey", checkShortcutConflictFromEvent);
    });

  document.addEventListener("click", (event) => {
    let theTarget = event.target;
    if(theTarget.type == "checkbox"){//theTarget.tagName  == "INPUT" && 
      setGreyout(theTarget);
    }
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



