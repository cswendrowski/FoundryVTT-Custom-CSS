import { SettingsForm } from './settingsForm.js';

export const modName = 'Custom Css';
const mod = 'custom-css';

/**
 * Provides functionality for interaction with module settings
 */
export class Settings {
    static getStylesheet() {
        return game.settings.get(mod, "stylesheet");
    }
    static async setStylesheet(css) {
        return game.settings.set(mod, "stylesheet", css);
    }

    static async updateStylesheet(css) {
        await this.setStylesheet(css);
        window.CustomCss.applyStyles();
    }

    /**
     * Registers all of the necessary game settings for the module
     */
    static registerSettings() {
        game.settings.register(mod, "stylesheet", {
            scopr: "world",
            config: false,
            type: String,
            default: "/* Custom CSS */"
        });

        game.settings.registerMenu(mod, 'settingsMenu', {
            name: 'Custom CSS Rules',
            label: 'Custom CSS Rules',
            icon: 'fas fa-wrench',
            type: SettingsForm,
            restricted: true
        });

        // For migration
        if (this.hasOldSettings) {
            game.settings.register(mod, "numberOfRules", {
                scope: 'world',
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

    static get hasOldSettings() { 
        return this.getMaxRules() > 0; 
    }

    static async migrate() {
        console.log(game.i18n.localize("CCSS.migration.startMessage"));
        Hooks.once("ready", () => ui.notifications.notify(game.i18n.localize("CCSS.migration.uiMessage")));

        let oldCSS = this.compileOldRules();
        await this.setStylesheet(this.getStylesheet() + oldCSS);

        await game.settings.set(mod, "numberOfRules", 0);

        console.log(game.i18n.localize("CCSS.migration.endMessage"));
    }

    static compileOldRules() {
        let css = "\n";
        for(let rule of Settings.rules()) {
            if (rule == "" || rule == "<DELETED>") continue;
            css += rule + "\n";
        }
        return css;
    }

    static getRule(index) {
        const rule = game.settings.storage.get("world").get(`${mod}.rule${index}`);
        return rule.substring(1, rule.length - 1);
    }

    static *rules() {
        for (var x = 1; x <= Settings.getMaxRules(); x++) {
            yield Settings.getRule(x);
        }
    }

    static getMaxRules() {
        return Number(game.settings.storage.get("world").get(`${mod}.numberOfRules`));
    }
}
