import { SettingsForm } from './settingsForm.js';

export const modName = 'Custom Css';
const mod = 'custom-css';

/**
 * Provides functionality for interaction with module settings
 */
export class Settings {

    //#region getters and setters
    static getRule(index) {
        return game.settings.get(mod, 'rule' + index);
    }

    static setRule(index, val) {
        game.settings.set(mod, 'rule' + index, val).then(function() {
            var sheet = window.document.styleSheets[0];

            for (var x = 1; x <= Settings.getMaxRules(); x++) {
             var rule = Settings.getRule(x);
             if (rule != "") {
               console.log("CustomCSS | Inserting rule " + rule);
               sheet.insertRule(rule, sheet.cssRules.length);
              }
            }
            
            ui.players.render();
        });;
    }

    static getMaxRules() {
        return game.settings.get(mod, 'numberOfRules');
    }

    static setMaxRules(val) {
        game.settings.set(mod, 'numberOfRules', val);
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

    //#endregion CSS Getters

    /**
     * Registers all of the necessary game settings for the module
     */
    static registerSettings() {

        game.settings.register(mod, "numberOfRules", {
            scope: 'world',
            config: false,
            type: Number,
            default: 3
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
    }
}
