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
        return mergeObject(super.defaultOptions, {
            id: "customcss-settings-form",
            title: game.i18n.localize("CCSS.settings.settingsMenu.title"),
            template: "./modules/custom-css/templates/settings.html",
            classes: ["sheet"],
            width: 500,
            height: 500,
            closeOnSubmit: false,
            submitOnClose: true
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
     * Handles retrieving data from the form.
     *
     * @override Save the code editor instance before retrieving data to ensure the data is synchronised. 
     *
     * @param {array} args - All arguments passed to this method, which will be forwarded to super
     * @return {object} The form data 
     * @memberof SettingsForm
     */
    _getSubmitData(...args) {
        this.codeEditor.save();
        return super._getSubmitData(...args);
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

    /**
     * Activates all event listeners related to this form.
     *
     * @override Activates the CodeMirror code editor.
     *
     * @param {JQuery} html - The html content of the form.
     * @memberof SettingsForm
     */
    activateListeners(html) {
        super.activateListeners(html);

        this.codeEditor = CodeMirror.fromTextArea(html.find(".stylesheet")[0], { 
            mode: "css",
            ...CodeMirror.userSettings,
            lineNumbers: true,
            inputStyle: "contenteditable",
            autofocus: true
        });
    } 
}
