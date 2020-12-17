import { SettingsForm } from './settingsForm.js';

export const modName = 'Custom Css';
const mod = 'custom-css';

/**
 * Provides functionality for interaction with module settings
 *
 * @export
 * @class Settings
 */
export class Settings {
    /**
     * Retrieves the stylesheet data from settings.
     *
     * @static
     * @return {string} The CSS stored in the stylesheet setting.
     * @memberof Settings
     */
    static getStylesheet() {
        return game.settings.get(mod, "stylesheet");
    }
    /**
     * Stores data in the stylesheet settings.
     *
     * @static
     * @param {string} css - The new CSS to be stored
     * @return {Promise} A promise fulfilled once the setting has been stored. 
     * @memberof Settings
     */
    static async setStylesheet(css) {
        return game.settings.set(mod, "stylesheet", css);
    }

    /**
     * Saves new stylesheet data, then reapplies the styles.
     *
     * @static
     * @param {string} css - The new CSS to be updated.
     * @memberof Settings
     */
    static async updateStylesheet(css) {
        await this.setStylesheet(css);
        window.CustomCss.applyStyles();
    }

    /**
     * Registers all of the necessary game settings for the module
     *
     * @static
     * @memberof Settings
     */
    static registerSettings() {
        game.settings.register(mod, "stylesheet", {
            scopr: "world",
            config: false,
            type: String,
            default: "/* Custom CSS */"
        });

        game.settings.registerMenu(mod, 'settingsMenu', {
            name: game.i18n.localize("CCSS.settings.settingsMenu.name"),
            label: game.i18n.localize("CCSS.settings.settingsMenu.label"),
            icon: "fas fa-wrench",
            type: SettingsForm,
            restricted: true
        });

        // For migration
        if (this.hasOldSettings) {
            game.settings.register(mod, "numberOfRules", {
                scope: "world",
                config: false,
                type: Number,
                default: 0
            })
        }
    }

   /**********************************************************************************
    *
    * Migration and legacy methods
    *
    * The following methods exist to handle old Custom CSS data and perform migration.
    *
    *********************************************************************************/

    /**
     * @type {Boolean} - True if old v1 settings data is detected
     * @readonly
     * @static
     * @memberof Settings
     */
    static get hasOldSettings() { 
        return this.getMaxRules() > 0; 
    }

    /**
     * Loads the old v1 settings, and converts them to new v2 settings.
     *
     * @static
     * @memberof Settings
     */
    static async migrate() {
        console.log(game.i18n.localize("CCSS.migration.startMessage"));
        Hooks.once("ready", () => ui.notifications.notify(game.i18n.localize("CCSS.migration.uiMessage")));

        let oldCSS = this.compileOldRules();
        await this.setStylesheet(this.getStylesheet() + oldCSS);

        await game.settings.set(mod, "numberOfRules", 0);

        console.log(game.i18n.localize("CCSS.migration.endMessage"));
    }

    /**
     * Compiles v1 CSS rules into a single string.
     *
     * @static
     * @return {string} The compiled rules. 
     * @memberof Settings
     */
    static compileOldRules() {
        let css = "\n";
        for(let rule of Settings.rules()) {
            if (rule == "" || rule == "<DELETED>") continue;
            css += rule + "\n";
        }
        return css;
    }

    /**
     * Retrieves a v1 rule from the settings storage.
     *
     * Old v1 rules were individually named "rule{inedex}" to allow for multiple rules.
     *
     * These rules are stored in strings, and the strings have quotation marks stored in them.
     * Strips away the quotes and returns the clean string.
     *
     * @static
     * @param {number} index - The "index" of a rule. 
     * @return {string} The text of the rule. 
     * @memberof Settings
     */
    static getRule(index) {
        const rule = game.settings.storage.get("world").get(`${mod}.rule${index}`);
        return rule.substring(1, rule.length - 1);
    }

    /**
     * Iterates over the v1 rules storage.
     *
     * @yields {string} - A v1 rule string.
     * @generator
     * @static
     * @memberof Settings
     */
    static *rules() {
        for (var x = 1; x <= Settings.getMaxRules(); x++) {
            yield Settings.getRule(x);
        }
    }

    /**
     * Retrieves the quantity of stored v1 rules.
     *
     * @static
     * @return {number} The quantity of v1 rules.
     * @memberof Settings
     */
    static getMaxRules() {
        return Number(game.settings.storage.get("world").get(`${mod}.numberOfRules`));
    }
}
