import { SettingsForm } from './settingsForm.js';

export const modName = 'Custom Css';
const mod = 'custom-css';

/**
 * Provides functionality for interaction with module settings
 */
export class Settings {

    //#region getters and setters
    static getRule1() {
        return game.settings.get(mod, 'rule1');
    }

    static setRule1(val) {
        game.settings.set(mod, 'rule1', val);
    }

    static getRule2() {
        return game.settings.get(mod, 'rule2');
    }

    static setRule2(val) {
        game.settings.set(mod, 'rule2', val);
    }

    static getRule3() {
        return game.settings.get(mod, 'rule3');
    }

    static setRule3(val) {
        game.settings.set(mod, 'rule3', val);
    }

    static getRule4() {
        return game.settings.get(mod, 'rule4');
    }

    static setRule4(val) {
        game.settings.set(mod, 'rule4', val);
    }

    static getRule5() {
        return game.settings.get(mod, 'rule5');
    }

    static setRule5(val) {
        game.settings.set(mod, 'rule5', val);
    }

    static getRule6() {
        return game.settings.get(mod, 'rule6');
    }

    static setRule6(val) {
        game.settings.set(mod, 'rule6', val);
    }

    static getRule7() {
        return game.settings.get(mod, 'rule7');
    }

    static setRule7(val) {
        game.settings.set(mod, 'rule7', val);
    }

    static getRule8() {
        return game.settings.get(mod, 'rule8');
    }

    static setRule8(val) {
        game.settings.set(mod, 'rule8', val);
    }

    static getRule9() {
        return game.settings.get(mod, 'rule9');
    }

    static setRule9(val) {
        game.settings.set(mod, 'rule9', val);
    }

    //#endregion CSS Getters

    /**
     * Registers all of the necessary game settings for the module
     */
    static registerSettings() {

        game.settings.registerMenu(mod, 'settingsMenu', {
            name: 'Custom CSS Rules',
            label: 'Custom CSS Rules',
            icon: 'fas fa-wrench',
            type: SettingsForm,
            restricted: true
        });

        game.settings.register(mod, 'rule1', {
            scope: 'world',
            config: false,
            type: String,
            default: ""
        });

        game.settings.register(mod, 'rule2', {
            scope: 'world',
            config: false,
            type: String,
            default: ""
        });

        game.settings.register(mod, 'rule3', {
            scope: 'world',
            config: false,
            type: String,
            default: ""
        });

        game.settings.register(mod, 'rule4', {
            scope: 'world',
            config: false,
            type: String,
            default: ""
        });

        game.settings.register(mod, 'rule5', {
            scope: 'world',
            config: false,
            type: String,
            default: ""
        });

        game.settings.register(mod, 'rule6', {
            scope: 'world',
            config: false,
            type: String,
            default: ""
        });

        game.settings.register(mod, 'rule7', {
            scope: 'world',
            config: false,
            type: String,
            default: ""
        });

        game.settings.register(mod, 'rule8', {
            scope: 'world',
            config: false,
            type: String,
            default: ""
        });

        game.settings.register(mod, 'rule9', {
            scope: 'world',
            config: false,
            type: String,
            default: ""
        });
    }
}
