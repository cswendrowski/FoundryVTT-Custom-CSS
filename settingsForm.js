import { Settings } from './settings.js';

export class SettingsForm extends FormApplication {

    constructor(object, options = {}) {
        super(object, options);
    }

    /**
    * Default Options for this FormApplication
    */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: "customcss-settings-form",
            title: "Custom CSS - Settings",
            template: "./modules/custom-css/templates/settings.html",
            classes: ["sheet"],
            width: 500,
            closeOnSubmit: true
        });
    }

    getData() {
        const data = {
            rule1: Settings.getRule1(),
            rule2: Settings.getRule2(),
            rule3: Settings.getRule3(),
            rule4: Settings.getRule4(),
            rule5: Settings.getRule5(),
            rule6: Settings.getRule6(),
            rule7: Settings.getRule7(),
            rule8: Settings.getRule8(),
            rule9: Settings.getRule9(),
        };

        return data;
    }

    /** 
     * Executes on form submission.
     * @param {Object} e - the form submission event
     * @param {Object} d - the form data
     */
    async _updateObject(e, d) {
        Settings.setRule1(d.rule1);
        Settings.setRule2(d.rule2);
        Settings.setRule3(d.rule3);
        Settings.setRule4(d.rule4);
        Settings.setRule5(d.rule5);
        Settings.setRule6(d.rule6);
        Settings.setRule7(d.rule7);
        Settings.setRule8(d.rule8);
        Settings.setRule9(d.rule9);
    }

    activateListeners(html) {
        super.activateListeners(html);
    }

    getSelectList(array, selected) {
        let options = [];
        array.forEach((x, i) => {
            options.push({ value: x, selected: i == selected });
        });
        return options;
    }
}
