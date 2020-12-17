import { Settings } from "./settings.js";

/**
 * A class that handles the primary functions of the Custom CSS module
 *
 * @class CustomCSS
 */
class CustomCSS {  
    static onInit() {
        window.CustomCss = new CustomCSS();
    }
    
    constructor() {
        this.setup();
    }

    get style() { 
        if (!this._style) this.createStyleElement();
        return this._style; 
    }
    get css() { return this.style.innerHTML; }
    set css(css) { this.style.innerHTML = css; } 
    
    async setup() {
        Settings.registerSettings();
        if (Settings.hasOldSettings) await Settings.migrate();

        this.createStyleElement();
        this.applyStyles();
        console.log(this.css);
    }

    createStyleElement() {
        this._style = document.createElement("style");
        this._style.id = "custom-css";
        document.querySelector("head").appendChild(this._style);
    }

    applyStyles() {
        this.css = Settings.getStylesheet();
    }
}

Hooks.once('init', CustomCSS.onInit);
