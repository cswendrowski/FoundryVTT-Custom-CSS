(() => { })();

import { Settings } from "./settings.js";

Hooks.once('ready', async function() {
  const version = 1.0;  //Current Version

  //Bootstrap
  if (!window.CustomCss) {
    window.CustomCss = { loaded: 0 };
    window.CustomCss.setup = () => console.error('CustomCss | Failed to setup CustomCss');
    $(() => window.CustomCss.setup());
  }

  // if (window.CustomCss.loaded >= version) {
  //   return;
  // }
  window.CustomCss.loaded = version;

  window.CustomCss.setup = () => {
    console.log(`CustomCss | Initializing v` + version);
    RegisterConfigurationOptions();
    Settings.registerSettings();

     var sheet = window.document.styleSheets[0];

     if (Settings.getRule1() != "") {
      sheet.insertRule(Settings.getRule1(), sheet.cssRules.length);
     }
     if (Settings.getRule2() != "") {
      sheet.insertRule(Settings.getRule2(), sheet.cssRules.length);
     }
     if (Settings.getRule3() != "") {
      sheet.insertRule(Settings.getRule3(), sheet.cssRules.length);
     }
     if (Settings.getRule4() != "") {
      sheet.insertRule(Settings.getRule4(), sheet.cssRules.length);
     }
     if (Settings.getRule5() != "") {
      sheet.insertRule(Settings.getRule5(), sheet.cssRules.length);
     }
     if (Settings.getRule6() != "") {
      sheet.insertRule(Settings.getRule6(), sheet.cssRules.length);
     }
     if (Settings.getRule7() != "") {
      sheet.insertRule(Settings.getRule7(), sheet.cssRules.length);
     }
     if (Settings.getRule8() != "") {
      sheet.insertRule(Settings.getRule8(), sheet.cssRules.length);
     }
     if (Settings.getRule9() != "") {
      sheet.insertRule(Settings.getRule9(), sheet.cssRules.length);
     }
     
     console.log(sheet);
  };


  RegisterConfigurationOptions();

  function RegisterConfigurationOptions() {
    // console.log("CustomCss | Registering configuration options");
  
    // game.settings.register('custom-css', 'customCss', {
    //   name: game.i18n.localize("CCSS.SETTINGS.CustomCss"),
    //   hint: game.i18n.localize("CCSS.SETTINGS.CustomCssHint"),
    //   scope: 'world',
    //   config: true,
    //   default: ".test { display: block; }",
    //   type: String
    // });
  }

  function update(settings) {
    console.log(settings);
  }
});
