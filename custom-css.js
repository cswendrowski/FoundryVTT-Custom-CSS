import { Settings } from "./settings.js";

/**
 * A class that handles the primary functions of the Custom CSS module
 *
 * @class CustomCSS
 */
class CustomCSS { 
    /**
     * Handles the init Hook.
     *
     * Creates an instance of this class and stores it
     * in a global location.
     *
     * @static
     * @memberof CustomCSS
     */
    static onInit() {
        window.CustomCss = new CustomCSS();
        
    }
    
    /**
     * Creates an instance of CustomCSS.
     * @memberof CustomCSS
     */
    constructor() {
        this.setup();
        
    }

    /**
     * Returns the <style> element used to inject CSS into the page.
     * If it doesn't already exist, creates it.
     *
     * @readonly
     * @memberof CustomCSS
     */
    get style() { 
        if (!this._style) this.createStyleElement();
        return this._style; 
    }

    /**
     * @type {string} - The innerHTML content of the <style> element
     * @memberof CustomCSS
     */
    get css() { return this.style.innerHTML; }
    /** @param {string} css - A new CSS string to inject into the <style> element */
    set css(css) { this.style.innerHTML = css; } 
    
    /**
     * Prepare the class for use.
     *
     * Register settigns, initiate migration if needed, set up socket
     * add the <style> element to the page, and inject styles.
     *
     * @memberof CustomCSS
     */
    async setup() {
        Settings.registerSettings();
        if (Settings.hasOldSettings) await Settings.migrate();

        this.openSocket();

        this.createStyleElement();
        this.applyStyles();
        console.log(this.css);
    }

    /**
     * Creates a new <style> element at the end of the <head>
     * of the document, and store its reference in this.
     *
     * @memberof CustomCSS
     */
    createStyleElement() {
        this._style = document.createElement("style");
        this._style.id = "custom-css";
        document.querySelector("head").appendChild(this._style);
    }

    /**
     * Inject the stylesheet data stored in settings
     * into the <style> element.
     *
     * @memberof CustomCSS
     */
    applyStyles() {
        this.css = Settings.getStylesheet();
    }

    /**
     * Prepares for socket connections.
     *
     * @memberof CustomCSS
     */
    openSocket() {
        Hooks.once("ready", () => 
            game.socket.on("module.custom-css", this.applyStyles.bind(this))
        );
    }
}

Hooks.once('init', CustomCSS.onInit);
