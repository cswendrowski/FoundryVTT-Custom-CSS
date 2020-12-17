import { Settings } from './settings.js';

export class SettingsForm extends FormApplication {

    constructor(object, options = {}) {
        super(object, options);
    }

    /**
    * Default Options for this FormApplication
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

    getData() {
        return { stylesheet: Settings.getStylesheet() };
    }

    /** 
     * Executes on form submission.
     * @param {Object} e - the form submission event
     * @param {Object} d - the form data
     */
    async _updateObject(e, d) {
        var buttonPressed = $(document.activeElement).val();

        console.log(buttonPressed);

        if (buttonPressed === "addRule") {
            Settings.addMaxRule();
        }
        else if (buttonPressed === "removeRule") {
            Settings.removeMaxRule();
        }
        else if (buttonPressed === "addFolder") {
            Settings.addMaxFolder();
        }

        for (var x = 1; x <= Settings.getMaxRules(); x++) {
            var toUpdate = d["rule" + x];
            console.log("CustomCSS | Adding Rule " + toUpdate);
            Settings.setRule(x, toUpdate);
        }

        for (var x = 1; x <= Settings.getMaxFolders(); x++) {
            var toUpdate = d["folder" + x];
            console.log("CustomCSS | Adding Folder " + toUpdate);
            Settings.setFolder(x, toUpdate);
        }
        
        Settings.updateStylesheet(d["stylesheet"]);
    }

    activateListeners(html) {
        super.activateListeners(html);

        var list = document.getElementById("customcssrules");

        new Sortable(list, {
            animation: 150,
            ghostClass: 'blue-background-class',
            handle: '.handle',
            store: {
                /**
                 * Get the order of elements. Called once during initialization.
                 * @param   {Sortable}  sortable
                 * @returns {Array}
                 */
                get: function (sortable) {
                    var order = Settings.getOrder();
                    try {
                        return order ? order.split('|') : [];
                    }
                    catch {
                        return [];
                    }
                },
        
                /**
                 * Save the order of elements. Called onEnd (when the item is dropped).
                 * @param {Sortable}  sortable
                 */
                set: function (sortable) {
                    var order = sortable.toArray();
                    Settings.setOrder(order.join('|'));
                }
            }
        });

        $('.folder-delete').click(function() {
            var folderId = $(this).data('folderid');
            $(this).parent().remove();
            Settings.setFolder(folderId, '<DELETED>');
        });

        
        $('.rule-delete').click(function() {
            var ruleId = $(this).data('ruleid');
            $(this).parent().remove();
            Settings.setRule(ruleId, '<DELETED>');
        });

    }

    getIndexValueList(array) {
        let options = [];
        array.forEach((x, i) => {
            if (x != '<DELETED>') {
                options.push({ value: x, index: i + 1 });
            }
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
