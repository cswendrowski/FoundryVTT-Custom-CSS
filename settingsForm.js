import { Settings } from './settings.js';

/**
 * A form for inputting Custom CSS settings.
 *
 * @export
 * @class SettingsForm
 * @extends {FormApplication}
 */
export class SettingsForm extends FormApplication {
    /**
     * Default Options for this FormApplication
     *
     * @readonly
     * @static
     * @memberof SettingsForm
     */
    static get defaultOptions() {
        var me = this;
        return mergeObject(super.defaultOptions, {
            id: "customcss-settings-form",
            title: "Custom CSS Rules",
            template: "./modules/custom-css/templates/settings.html",
            classes: ["sheet"],
            width: 500,
            closeOnSubmit: true
        });
    }

    /**
     * Construct an object of data to be passed to this froms HTML template.
     *
     * @return {object} The data being supplied to the template.
     * @memberof SettingsForm
     */
    getData() {
        return { stylesheet: Settings.getStylesheet() };
    }

    /**
     * Executes on form submission.
     *
     * @param {Event} event - the form submission event
     * @param {object} data - the form data
     * @memberof SettingsForm
     */
    async _updateObject(event, data) {
        await Settings.updateStylesheet(data["stylesheet"]);
    }
}
