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

    //#region getters and setters
    static getRule(index) {
        const rule = game.settings.storage.get("world").get(`${mod}.rule${index}`);
        return rule.substring(1, rule.length - 1);
    }

    static async setRule(index, val) {
        if (val == undefined || !window.CustomCss) return;

        await game.settings.set(mod, 'rule' + index, val);
        
        window.CustomCss.applyStyles();
    }

    static *rules() {
        for (var x = 1; x <= Settings.getMaxRules(); x++) {
            yield Settings.getRule(x);
        }
    }

    static getFolder(index) {
        return game.settings.get(mod, 'folder' + index);
    }

    static setFolder(index, val) {
        if (val == undefined) return;
        game.settings.set(mod, 'folder' + index, val).then(function() {            
            ui.players.render();
        });
    }

    static getMaxRules() {
        return Number(game.settings.storage.get("world").get(`${mod}.numberOfRules`));
    }

    static setMaxRules(val) {
        game.settings.set(mod, 'numberOfRules', val);
    }

    static getMaxFolders() {
        return game.settings.get(mod, 'numberOfFolders');
    }

    static setMaxFolders(val) {
        game.settings.set(mod, 'numberOfFolders', val);
    }

    static getOrder() {
        return game.settings.get(mod, 'order');
    }

    static setOrder(val) {
        game.settings.set(mod, 'order', val);
    }

    static addMaxRule() {
        var newMax = this.getMaxRules() + 1;
        game.settings.register(mod, 'rule' + newMax, {
            scope: 'world',
            config: false,
            type: String,
            default: ""
        });
        game.settings.set(mod, 'numberOfRules', newMax);
    }

    static removeMaxRule() {
        var maxRules = this.getMaxRules();
        if (maxRules == 0) {
            console.log("CustomCSS | Cannot have less than 0 rules");
            return;
        }
        game.settings.set(mod, 'numberOfRules', maxRules - 1);
    }

    static addMaxFolder() {
        var newMax = this.getMaxFolders() + 1;
        game.settings.register(mod, 'folder' + newMax, {
            scope: 'world',
            config: false,
            type: String,
            default: ""
        });
        game.settings.set(mod, 'numberOfFolders', newMax);
    }

    static removeMaxFolder() {
        var max = this.getMaxFolders();
        if (max == 0) {
            console.log("CustomCSS | Cannot have less than 0 folders");
            return;
        }
        game.settings.set(mod, 'numberOfFolders', max - 1);
    }

    //#endregion CSS Getters

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


        game.settings.register(mod, "numberOfRules", {
            scope: 'world',
            config: false,
            type: Number,
            default: 3
        })

        game.settings.register(mod, "numberOfFolders", {
            scope: 'world',
            config: false,
            type: Number,
            default: 0
        })

        game.settings.register(mod, "order", {
            scope: 'world',
            config: false,
            type: Object,
            default: {}
        })

        game.settings.registerMenu(mod, 'settingsMenu', {
            name: 'Custom CSS Rules',
            label: 'Custom CSS Rules',
            icon: 'fas fa-wrench',
            type: SettingsForm,
            restricted: true
        });

        for (var x = 1; x <= Settings.getMaxRules(); x++) {
            game.settings.register(mod, 'rule' + x, {
                scope: 'world',
                config: false,
                type: String,
                default: ""
            });
        }

        for (var x = 1; x <= Settings.getMaxFolders(); x++) {
            game.settings.register(mod, 'folder' + x, {
                scope: 'world',
                config: false,
                type: String,
                default: ""
            });
        }
    }
}
