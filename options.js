var regStrip = /^[\r\t\f\v ]+|[\r\t\f\v ]+$/gm;

var settings = {
  enabled: true, // default enabled
  allergyQuickAdd: true,

  billingButtons: true,
  billingCodeInput_PageEnd: true,
  billingCodeInput_keyboardShortcuts: true,
  billingDxCodeSearch_keyboardShortcuts: true,
  billingConfirm_keyboardShortcuts: true,
  billingConfirm_PageEnd: true,

  cortico: true,

  consultations:{
    consultations_keyboardShortcuts: true,
    postPatientAgeGender: true,
    postAllHistory:true
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
  // ,

  // speed: 1.0, // default:
  // displayKeyCode: 86, // default: V
  // rememberSpeed: false, // default: false
  // audioBoolean: false, // default: false
  // startHidden: false, // default: false
  // forceLastSavedSpeed: false, //default: false
  
  // controllerOpacity: 0.3, // default: 0.3
  // keyBindings: [
  //   { action: "display", key: 86, value: 0, force: false, predefined: true }, // V
  //   { action: "slower", key: 83, value: 0.1, force: false, predefined: true }, // S
  //   { action: "faster", key: 68, value: 0.1, force: false, predefined: true }, // D
  //   { action: "rewind", key: 90, value: 10, force: false, predefined: true }, // Z
  //   { action: "advance", key: 88, value: 10, force: false, predefined: true }, // X
  //   { action: "reset", key: 82, value: 1, force: false, predefined: true }, // R
  //   { action: "fast", key: 71, value: 1.8, force: false, predefined: true } // G
  // ],
  // blacklist: `www.instagram.com
  //   twitter.com
  //   imgur.com
  //   teams.microsoft.com
  // `.replace(regStrip, "")
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

// let keybindingMap = new Map();

function recordKeyPress(e) {

  if(e.key == "Backspace" || e.key == "Escape"){
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
    // keybindingMap.set()

    e.target.keybinding = theKeybinding;
    console.log(e.target);
    // console.log(e.target.keybinding);
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

// function keyEventToText(e){
//   const theKey = e.key;    
//   const theAltKey = e.altKey;
//   const theCtrlKey = e.ctrlKey;
//   const theShiftKey= e.shiftKey;
//   let keybindingText = "";

//   if (theCtrlKey){
//     keybindingText += "Ctrl+"
//   }
//   if (theShiftKey){
//     keybindingText += "Shift+"
//   }
//   if (theAltKey){
//     keybindingText += "Alt+"
//   }
//   if(theKey != "Control" && theKey != "Shift" && theKey != "Alt"){
//     keybindingText += theKey;
//   }

//   return keybindingText;
// }

function inputFilterNumbersOnly(e) {
  var char = String.fromCharCode(e.keyCode);
  if (!/[\d\.]$/.test(char) || !/^\d+(\.\d*)?$/.test(e.target.value + char)) {
    e.preventDefault();
    e.stopPropagation();
  }
}

function inputFocus(e) {
  console.log('hello');
  e.target.value = "";
}

function inputBlur(e) {
  e.target.value =
    keyCodeAliases[e.target.keyCode] || String.fromCharCode(e.target.keyCode);
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

// Saves options to chrome.storage
function save_options() {
  // if (validate() === false) {
  //   return;
  // }
  keyBindings = [];
  Array.from(document.querySelectorAll(".customs")).forEach((item) =>
    createKeyBindings(item)
  ); // Remove added shortcuts

  const enabled = document.getElementById("enabled").checked;

  const allergyQuickAdd = document.getElementById("allergyQuickAdd").checked;

  const billingButtons = document.getElementById("billingButtons").checked;
  const billingCodeInput_PageEnd = document.getElementById("billingCodeInput_PageEnd").checked;
  const billingCodeInput_keyboardShortcuts = document.getElementById("billingCodeInput_keyboardShortcuts").checked;
  const billingDxCodeSearch_keyboardShortcuts = document.getElementById("billingDxCodeSearch_keyboardShortcuts").checked;
  const billingConfirm_keyboardShortcuts = document.getElementById("billingConfirm_keyboardShortcuts").checked;
  const billingConfirm_PageEnd = document.getElementById("billingConfirm_PageEnd").checked;

  const cortico = document.getElementById("cortico").checked;

  const consultations_keyboardShortcuts = document.getElementById("consultations_keyboardShortcuts").checked;
  const postPatientAgeGender = document.getElementById("postPatientAgeGender").checked;
  const postAllHistory = document.getElementById("postAllHistory").checked;

  const schedule_shortcuts_enabled = document.getElementById("schedule_shortcuts_enabled").checked;
  const schedule_shortcut_openEChart_enabled = document.getElementById("schedule_shortcut_openEChart_enabled").checked;
  const schedule_shortcut_openEChart_keybinding = document.getElementById("schedule_shortcut_openEChart_keybinding").keybinding;
  const schedule_shortcut_openInbox_enabled = document.getElementById("schedule_shortcut_openInbox_enabled").checked;
  const schedule_shortcut_openInbox_keybinding = document.getElementById("schedule_shortcut_openInbox_keybinding").keybinding;

  console.log(document.getElementById("schedule_shortcut_openEChart_keybinding").keybinding)

  // chrome.storage.sync.remove([
  //   "resetSpeed",
  //   "speedStep",
  //   "fastSpeed",
  //   "rewindTime",
  //   "advanceTime",
  //   "resetKeyCode",
  //   "slowerKeyCode",
  //   "fasterKeyCode",
  //   "rewindKeyCode",
  //   "advanceKeyCode",
  //   "fastKeyCode"
  // ]);

  chrome.storage.sync.set(
    {
      enabled: enabled,

      allergyQuickAdd: allergyQuickAdd,

      billingCodeInput: {
        billingButtons: billingButtons,
        billingCodeInput_PageEnd: billingCodeInput_PageEnd,
        billingCodeInput_keyboardShortcuts: billingCodeInput_keyboardShortcuts
      },

      billingDxCodeSearch_keyboardShortcuts: billingDxCodeSearch_keyboardShortcuts,

      billingConfirm:{
        billingConfirm_keyboardShortcuts: billingConfirm_keyboardShortcuts,
        billingConfirm_PageEnd: billingConfirm_PageEnd
      },

      cortico: cortico,

      consultations:{
        consultations_keyboardShortcuts: consultations_keyboardShortcuts,
        postPatientAgeGender: postPatientAgeGender,
        postAllHistory:postAllHistory
      },

      schedule: {
        schedule_keyboardShortcuts: {
          schedule_shortcuts_enabled: schedule_shortcuts_enabled,
          schedule_shortcut_openEChart_enabled: schedule_shortcut_openEChart_enabled,
          schedule_shortcut_openEChart_keybinding: schedule_shortcut_openEChart_keybinding,
          schedule_shortcut_openInbox_enabled: schedule_shortcut_openInbox_enabled,
          schedule_shortcut_openInbox_keybinding: schedule_shortcut_openInbox_keybinding
        }
      }
    },
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
}

// Restores options from chrome.storage
function restore_options() {
  (async function() {
    console.log(await browser.storage.sync.get());
    // console.log(await browser.storage.sync.get("tcDefaults"));
  })();

  chrome.storage.sync.get(settings, function (storage) {
    // console.log(storage);

    restoreOptionsPageFromSettings(storage);


    // document.getElementById("allergyQuickAdd").checked = storage.allergyQuickAdd;

    // document.getElementById("billingButtons").checked = storage.billingButtons;
    // document.getElementById("billingCodeInput_PageEnd").checked = storage.billingCodeInput_PageEnd;
    // document.getElementById("billingCodeInput_keyboardShortcuts").checked = storage.billingCodeInput_keyboardShortcuts;
    // document.getElementById("billingDxCodeSearch_keyboardShortcuts").checked = storage.billingDxCodeSearch_keyboardShortcuts;
    // document.getElementById("billingConfirm_keyboardShortcuts").checked = storage.billingConfirm_keyboardShortcuts;
    // document.getElementById("billingConfirm_PageEnd").checked = storage.billingConfirm_PageEnd;
  
    // document.getElementById("cortico").checked = storage.cortico;
  
    // document.getElementById("consultations_keyboardShortcuts").checked = storage.consultations_keyboardShortcuts;
    // document.getElementById("postPatientAgeGender").checked = storage.postPatientAgeGender;
    // document.getElementById("postAllHistory").checked = storage.postAllHistory;

    // document.getElementById("schedule_shortcuts_enabled").checked = storage.schedule.schedule_keyboardShortcuts.enabled;
    // document.getElementById("schedule_shortcut_openEChart_enabled").checked = storage.schedule.schedule_keyboardShortcuts.openEChart_enabled;
    // document.getElementById("schedule_shortcut_openEChart_keybinding").keybinding = storage.schedule.schedule_keyboardShortcuts.openEChart_keybinding;
    // document.getElementById("schedule_shortcut_openEChart_keybinding").value = keybindingToText(storage.schedule.schedule_keyboardShortcuts.openEChart_keybinding);
    // document.getElementById("schedule_shortcut_openInbox_enabled").keybinding = storage.schedule.schedule_keyboardShortcuts.openInbox_enabled;
    // document.getElementById("schedule_shortcut_openInbox_keybinding").keybinding = storage.schedule.schedule_keyboardShortcuts.openInbox_keybinding;
    // document.getElementById("schedule_shortcut_openInbox_keybinding").value = keybindingToText(storage.schedule.schedule_keyboardShortcuts.openInbox_keybinding);


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
      // console.log(document.getElementById(key).checked);
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

function restore_defaults() {
  chrome.storage.sync.set(settings, function () {
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

document.addEventListener("DOMContentLoaded", function () {
  restore_options();


  document.getElementById("save").addEventListener("click", save_options);
  document.getElementById("saveHeader").addEventListener("click", save_options);
  window.addEventListener('keydown', function(theEvent) {
		var theKey = theEvent.key;
		var theAltKey = theEvent.altKey;
		var theCtrlKey = theEvent.ctrlKey;
		var theShiftKey= theEvent.shiftKey;
		let theTarget;		
		switch(true){				
			case (theAltKey && theKey ==  1):				// Alt+1 to Confirm.
      document.getElementById("save").click();
				break;	
		}
	}, true);

  document.getElementById("add").addEventListener("click", add_shortcut);
  document
    .getElementById("restore")
    .addEventListener("click", restore_defaults);
  document
    .getElementById("experimental")
    .addEventListener("click", show_experimental);

  function eventCaller(event, className, funcName) {
    if (!event.target.classList || !event.target.classList.contains(className)) {
      return;
    }
    funcName(event);
  }



  document.getElementById("schedule_shortcut_openInbox_keybinding").value = "hihi10"; 
  document.addEventListener("keypress", (event) => {
    eventCaller(event, "customValue", inputFilterNumbersOnly);
  });
  document.addEventListener("focus", (event) => {
    eventCaller(event, "customKey", inputFocus);
  });
  document.addEventListener("blur", (event) => {
    eventCaller(event, "customKey", inputBlur);
  });
  document.addEventListener("keydown", (event) => {
    eventCaller(event, "customKey", recordKeyPress);
    // console.log(event);
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




// window.addEventListener('keyup',
//     function(e){
//         keys[e.keyCode] = false;
//         document.body.innerHTML = "Keys currently pressed: " + getNumberArray(keys);
//     },
// false);

// function getNumberArray(arr){
//     var newArr = new Array();
//     for(var i = 0; i < arr.length; i++){
//         if(typeof arr[i] == "number"){
//             newArr[newArr.length] = arr[i];
//         }
//     }
//     return newArr;
// }
