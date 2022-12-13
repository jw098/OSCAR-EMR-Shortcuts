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
    postPatientAgeGender: true,
    postAllHistory:true,
    consultations_keyboardShortcuts: {
      consultations_shortcuts_enabled: true,

      consultations_shortcuts_close_enabled: true,
      consultations_shortcuts_close_keybinding: {
        ctrlKey: false,
        shiftKey: false,
        altKey: true,
        key: 'w'
      },
      consultations_shortcuts_submit_enabled: true,
      consultations_shortcuts_submit_keybinding: {
        ctrlKey: false,
        shiftKey: false,
        altKey: true,
        key: 1
      },
    }
  },

  eChart:{
    updateSidebar: true,
    eformSearchBar_enabled: true,

    eChartButtons:{
      eChartButtons_enabled: true,

      eChartButtonVitals:{
        eChartButtonVitals_enabled: true,

        eChartButtonVitals_button_enabled: true,
        eChartButtonVitals_shortcuts:{
          eChartButtonVitals_shortcuts_enabled: true,
          eChartButtonVitals_shortcuts_keybinding: {
            ctrlKey: false,
            shiftKey: false,
            altKey: true,
            key: 'x'
          },
        }
      },
      eChartButton1:{
        eChartButton1_enabled: true,
        eChartButton1_name: "Lab Req",
        eChartButton1_fid: "",

        eChartButton1_button_enabled: true,
        eChartButton1_shortcuts:{
          eChartButton1_shortcuts_enabled: true,
          eChartButton1_shortcuts_keybinding: {
            ctrlKey: false,
            shiftKey: true,
            altKey: true,
            key: 'Q'
          }
        }
      },
      eChartButton2:{
        eChartButton2_enabled: true,
        eChartButton2_name: "X-ray",
        eChartButton2_fid: "",

        eChartButton2_button_enabled: true,
        eChartButton2_shortcuts:{
          eChartButton2_shortcuts_enabled: true,
          eChartButton2_shortcuts_keybinding: {
            ctrlKey: false,
            shiftKey: true,
            altKey: true,
            key: 'W'
          }
        }
        
      },
      eChartButton3:{
        eChartButton3_enabled: true,
        eChartButton3_name: "U/S",
        eChartButton3_fid: "",

        eChartButton3_button_enabled: true,
        eChartButton3_shortcuts:{
          eChartButton3_shortcuts_enabled: true,
          eChartButton3_shortcuts_keybinding: {
            ctrlKey: false,
            shiftKey: true,
            altKey: true,
            key: 'Z'
          }
        }
        
      },
      eChartButton4:{
        eChartButton4_enabled: true,
        eChartButton4_name: "Doctors Note",
        eChartButton4_fid: "",

        eChartButton4_button_enabled: true,
        eChartButton4_shortcuts:{
          eChartButton4_shortcuts_enabled: true,
          eChartButton4_shortcuts_keybinding: {
            ctrlKey: false,
            shiftKey: true,
            altKey: true,
            key: 'X'
          }
        }
        
      },
      eChartButton5:{
        eChartButton5_enabled: false,
        eChartButton5_name: "",
        eChartButton5_fid: "",

        eChartButton5_button_enabled: false,
        eChartButton5_shortcuts:{
          eChartButton5_shortcuts_enabled: false,
          eChartButton5_shortcuts_keybinding: {
            ctrlKey: false,
            shiftKey: false,
            altKey: false,
            key: ''
          }
        }
        
      },
      eChartButton6:{
        eChartButton6_enabled: false,
        eChartButton6_name: "",
        eChartButton6_fid: "",

        eChartButton6_button_enabled: false,
        eChartButton6_shortcuts:{
          eChartButton6_shortcuts_enabled: false,
          eChartButton6_shortcuts_keybinding: {
            ctrlKey: false,
            shiftKey: false,
            altKey: false,
            key: ''
          }
        }
        
      },
    },
    eChart_mainWindow_keyboardShortcuts:{
      eChart_mainWindow_shortcuts_enabled: true,

      eformSearchBar_shortcuts_enabled: true,
      eformSearchBar_shortcuts_keybinding: {
        ctrlKey: false,
        shiftKey: true,
        altKey: true,
        key: 'A'
      },
      eChart_shortcut_meds_enabled: true,
      eChart_shortcut_meds_keybinding:{
        ctrlKey: false,
        shiftKey: false,
        altKey: true,
        key: 'q'
      },
      eChart_shortcut_eforms_enabled: true,
      eChart_shortcut_eforms_keybinding:{
        ctrlKey: false,
        shiftKey: false,
        altKey: true,
        key: 'a'
      },
      eChart_shortcut_consults_enabled: true,
      eChart_shortcut_consults_keybinding:{
        ctrlKey: false,
        shiftKey: false,
        altKey: true,
        key: 'w'
      },
      eChart_shortcut_tickler_enabled: true,
      eChart_shortcut_tickler_keybinding:{
        ctrlKey: false,
        shiftKey: false,
        altKey: true,
        key: 'z'
      },
      eChart_shortcut_SignSaveBill_enabled: true,
      eChart_shortcut_SignSaveBill_keybinding: {
        ctrlKey: false,
        shiftKey: false,
        altKey: true,
        key: '1'
      },
      eChart_shortcut_save_enabled: true,
      eChart_shortcut_save_keybinding:{
        ctrlKey: false,
        shiftKey: false,
        altKey: true,
        key: '2'
      },
      eChart_shortcut_signSave_enabled: true,
      eChart_shortcut_signSave_keybinding:{
        ctrlKey: false,
        shiftKey: false,
        altKey: true,
        key: '3'
      },
      eChart_shortcut_exit_enabled: true,
      eChart_shortcut_exit_keybinding:{
        ctrlKey: false,
        shiftKey: false,
        altKey: true,
        key: '4'
      }
    },
    eChart_CPPWindow_keyboardShortcuts:{
      eChart_CPPWindow_shortcuts_enabled: true,

      CPPWindow_shortcut_signSave_enabled: true,
      CPPWindow_shortcut_signSave_keybinding: {
        ctrlKey: false,
        shiftKey: false,
        altKey: true,
        key: 1
      },
      CPPWindow_shortcut_cancel_enabled: true,
      CPPWindow_shortcut_cancel_keybinding: {
        ctrlKey: false,
        shiftKey: false,
        altKey: false,
        key: 'Escape'
      }
    }
    

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
  },

  apptEdit:{
    apptEdit_keyboardShortcuts: {
      apptEdit_shortcuts_enabled: true,

      apptEdit_shortcut_updateAppt_enabled: true,
      apptEdit_shortcut_updateAppt_keybinding: {
        ctrlKey: false,
        shiftKey: false,
        altKey: true,
        key: '1'
      },
    }

  },


  eFormIndividual:{
    eFormIndividual_keyboardShortcuts: {
      eFormIndividual_shortcuts_enabled: true,

      eFormIndividual_shortcut_submit_enabled: true,
      eFormIndividual_shortcut_submit_keybinding: {
        ctrlKey: false,
        shiftKey: false,
        altKey: true,
        key: '1'
      },
      eFormIndividual_shortcut_printSubmit_enabled: true,
      eFormIndividual_shortcut_printSubmit_keybinding: {
        ctrlKey: false,
        shiftKey: false,
        altKey: true,
        key: '2'
      },
    }
  },

  
  eFormLibrary:{
    eFormLibrary_keyboardShortcuts: {
      eFormLibrary_shortcuts_enabled: true,

      eFormLibrary_shortcut_close_enabled: true,
      eFormLibrary_shortcut_close_keybinding: {
        ctrlKey: false,
        shiftKey: false,
        altKey: true,
        key: 'a'
      },
    }
  },

  inbox:{
    inbox_buttons: true,
    
    inbox_keyboardShortcuts: {
      inbox_shortcuts_enabled: true,

      inbox_shortcut_close_enabled: true,
      inbox_shortcut_close_keybinding: {
        ctrlKey: false,
        shiftKey: false,
        altKey: true,
        key: 'z'
      },
      inbox_shortcut_openResult_enabled: true,
      inbox_shortcut_openResult_keybinding: {
        ctrlKey: false,
        shiftKey: false,
        altKey: true,
        key: '1'
      },
    }
  },

  inboxItem:{
    inboxItem_labelLabs: true,

    inboxItem_keyboardShortcuts: {
      inboxItem_shortcuts_enabled: true,

      inboxItem_shortcut_acknowledge_enabled: true,
      inboxItem_shortcut_acknowledge_keybinding: {
        ctrlKey: false,
        shiftKey: false,
        altKey: true,
        key: '1'
      },
      inboxItem_shortcut_openEChart_enabled: true,
      inboxItem_shortcut_openEChart_keybinding: {
        ctrlKey: false,
        shiftKey: false,
        altKey: true,
        key: 'q'
      },
      inboxItem_shortcut_openTickler_enabled: true,
      inboxItem_shortcut_openTickler_keybinding: {
        ctrlKey: false,
        shiftKey: false,
        altKey: true,
        key: 'w'
      },

    }
  },


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
