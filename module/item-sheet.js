/**
 * Extend the basic ItemSheet with some very simple modifications
 * @extends {ItemSheet}
 */
export class MouseGuardItemSheet extends ItemSheet {
    /** @inheritdoc */
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ["mouseguard", "sheet", "item"],
            template: "systems/mouseguard/templates/item-sheet.html",
            width: 520,
            height: 480,
            tabs: [
                {
                    navSelector: ".sheet-tabs",
                    contentSelector: ".sheet-body",
                    initial: "description"
                }
            ],
            scrollY: [".attributes"]
        });
    }

    /* -------------------------------------------- */

    /** @inheritdoc */
    async getData(options) {
        const context = await super.getData(options);
        const item = context.item;

        foundry.utils.mergeObject(context, {
            system: item.system
        });

        return context;
    }

    /* -------------------------------------------- */
}
