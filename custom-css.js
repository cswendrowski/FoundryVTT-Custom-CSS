import { Settings } from "./settings.js";

class CustomCSS {
    static get version() { return 1.0; } //Current Version
    
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
    
    setup() {
        console.log(`CustomCss | Initializing v` + this.constructor.version);

        Settings.registerSettings();
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
        let css = Settings.getStylesheet();

        for(let rule of Settings.rules()) {
            if (rule == "" || rule == "<DELETED>") continue;
            css += rule;
        }
        this.css = css;
    }
}

Hooks.once('init', CustomCSS.onInit);
