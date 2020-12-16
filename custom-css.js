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

  window.CustomCss.loaded = version;

  window.CustomCss.setup = () => {
    console.log(`CustomCss | Initializing v` + version);
    Settings.registerSettings();

    const style = document.createElement("style");
    style.id = "CustomCSS";
    document.querySelector("head").appendChild(style);

    let css = "";
    for(let rule of Settings.rules()) {
      if (rule == "" || rule == "<DELETED>") continue;
      css += rule;
    }

    style.innerHTML = css;

     console.log(css);
  };
});
