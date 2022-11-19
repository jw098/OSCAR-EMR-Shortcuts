var defaultSettings = {
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
        altKey: true,
        key: 'a'
      },
    }
  },

  cortico: {
    cortico_keyboardShortcuts: {
      cortico_shortcuts_enabled: true,

      cortico_shortcut_closeModal_enabled: true,
      cortico_shortcut_closeModal_keybinding: {
        ctrlKey: false,
        shiftKey: false,
        altKey: false,
        key: 'Escape'
      },
    }
  },

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

};


/* 
- rebuild the settings object according to the structure of settingsStructure (derived from defaultSettings), 
- if structure is the same, retain the value of storedSettings. if different, take on the value of defaultSettings

*/
function rebuildSettingsStructure(settingsStructure, storedSettings){
  let rebuiltSettings = {};
  for (const [key, value] of Object.entries(settingsStructure)){
    // console.log(storedSettings);
    const storedValue = storedSettings[key];
    // console.log(value);
    // console.log(storedValue);
    if (typeof value != typeof storedValue){
      rebuiltSettings[key] = value;
    } else { // value types match
      if (typeof value == "object" && typeof storedValue == "object"){
        rebuiltSettings[key] = rebuildSettingsStructure(value, storedValue);
      } else { // value types match and both aren't objects. i.e. they are primitives or functions.
        rebuiltSettings[key] = storedValue;
      }
    }
  }
  return rebuiltSettings;
}

/* 
- ensure stored settings matches the given settings object. if doesn't match. then fixes it.
NOTE
- this rebuilds the settings according to the structure of settingsStructure and stores it in storage.
 */
async function checkStoredSettingsStructure(){
  const storedSettings = await browser.storage.sync.get(defaultSettings);
  const rebuiltSettings = rebuildSettingsStructure(defaultSettings, storedSettings);
  // console.log(rebuiltSettings);
  await browser.storage.sync.set(rebuiltSettings);
  console.log(await browser.storage.sync.get(defaultSettings));
}
