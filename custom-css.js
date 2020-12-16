(() => { })();

import { Settings } from "./settings.js";

Hooks.once('init', async function() {
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

    const style = document.createElement("style");
    style.id = "CustomCSS";
    document.querySelector("head").appendChild(style);

    let css = "";
    for (var x = 1; x <= Settings.getMaxRules(); x++) {
      let rule = Settings.getRule(x);
      if (rule == "" || rule == "<DELETED>") continue;
      css += rule;
    }

    style.innerHTML = css;

/*     var sheet = window.document.styleSheets[0];

     for (var x = 1; x <= Settings.getMaxRules(); x++) {
      var rule = Settings.getRule(x);
      if (rule != "" && rule != "<DELETED>") {
        //console.log("CustomCSS | Inserting rule " + rule);
        sheet.insertRule(rule, sheet.cssRules.length);
       }
     }
  */   
     console.log(css);
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
