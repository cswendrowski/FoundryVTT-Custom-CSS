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
            title: "Custom CSS Rules",
            template: "./modules/custom-css/templates/settings.html",
            classes: ["sheet"],
            width: 500,
            closeOnSubmit: true
        });
    }

    getData() {

        var rulesArray = [];

        for (var x = 1; x <= Settings.getMaxRules(); x++) {
            rulesArray.push(Settings.getRule(x));
        }

        const data = {
            rules: this.getRulesList(rulesArray),
            cantRemove: Settings.getMaxRules() == 0
        };

        console.log(data);

        return data;
    }

    /** 
     * Executes on form submission.
     * @param {Object} e - the form submission event
     * @param {Object} d - the form data
     */
    async _updateObject(e, d) {
        var buttonPressed = $(document.activeElement).val();

        if (buttonPressed === "add") {
            Settings.addMaxRule();
        }
        else if (buttonPressed === "remove") {
            Settings.removeMaxRule();
        }

        for (var x = 1; x <= Settings.getMaxRules(); x++) {
            var ruleToUpdate = d["rule" + x];
            console.log("CustomCSS | Adding " + ruleToUpdate);
            Settings.setRule(x, ruleToUpdate);
        }
    }

    activateListeners(html) {
        super.activateListeners(html);
    }

    getRulesList(array) {
        let options = [];
        array.forEach((x, i) => {
            options.push({ value: x, index: i + 1 });
        });
        return options;
    }

    getSelectList(array, selected) {
        let options = [];
        array.forEach((x, i) => {
            options.push({ value: x, selected: i == selected });
        });
        return options;
    }
}
