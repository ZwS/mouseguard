/**
 * A specialized form used to pop out the editor.
 * @extends {CombatTracker}
 *
 * OPTIONS:
 *
 *
 */

export default class MouseCombatTracker extends CombatTracker {
    constructor(options) {
        super(options);
    }

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            id: "combat",
            template:
                "systems/mouseguard/templates/sidebar/combat-tracker.html",
            title: "COMBAT.SidebarTitle",
            scrollY: [".directory-list"],
            dragDrop: [
                {
                    dragSelector: "li.combatant.actor.directory-item.flexrow",
                    dropSelector: "li[data-team]"
                }
            ]
        });
    }

    _canDragStart(ev) {
        //console.log(ev);
        if (game.user.isGM) return true;
        return false;
    }

    _canDragDrop(ev) {
        //console.log(ev);
        if (game.user.isGM) return true;
        return false;
    }

    _onDragDrop(ev) {
        super._onDrop(ev);
        // console.log(ev);
    }

    async _onDrop(ev) {
        super._onDrop(ev);
        if (JSON.parse(ev.dataTransfer?.getData("text/plain")).id == "0") {
            return false;
        }
        let dropped_id = JSON.parse(ev.dataTransfer?.getData("text/plain")).id;
        let target = ev.target.closest("li").dataset.team;
        // console.log(target);
        await this.viewed.combatants.get(dropped_id).setTeam(target);
    }

    _onDragStart(ev) {
        //super._onDragStart(ev);
        //console.log(ev);
        let valid = this.viewed.combatants.get(ev.target.dataset.combatantId);
        if (valid.flags.mouseguard.ConflictCaptain) {
            ui.notifications.error(game.i18n.localize("COMBAT.CCERROR"));
            ev.dataTransfer.setData(
                "text/plain",
                JSON.stringify({
                    id: "0"
                })
            );
            return false;
        } else {
            ev.dataTransfer.setData(
                "text/plain",
                JSON.stringify({ id: ev.target.dataset.combatantId })
            );
        }
        //console.log(ev);
    }

    _getEntryContextOptions() {
        return [
            {
                name: "COMBAT.ConflictCaptain",
                icon: '<i class="fas fa-crown"></i>',
                callback: (li) => {
                    const combatant = this.viewed.combatants.get(
                        li.data("combatant-id")
                    );

                    // Each team needs a Captain
                    //combatant.team
                    // This entire function should be refactored to be a single statement
                    let Team = "";
                    if (combatant.team == 2) Team = "2";
                    if (combatant.team == 0) return;
                    console.log(Team);
                    if (
                        this.viewed.flags.mouseguard[
                            "ConflictCaptain" + Team
                        ] == combatant.id
                    ) {
                        //Unset if self
                        this.viewed.setFlag(
                            "mouseguard",
                            "ConflictCaptain" + Team,
                            NaN
                        );
                        return combatant.setFlag(
                            "mouseguard",
                            "ConflictCaptain",
                            false
                        );
                    }

                    if (
                        !!this.viewed.flags.mouseguard[
                            "ConflictCaptain" + Team
                        ] == false
                    ) {
                        // New Captain Never had an old one
                        if (combatant) {
                            //Set Flag on New Captain
                            this.viewed.setFlag(
                                "mouseguard",
                                "ConflictCaptain" + Team,
                                li.data("combatant-id")
                            );
                            return combatant.setFlag(
                                "mouseguard",
                                "ConflictCaptain",
                                true
                            );
                        }
                    } else {
                        ui.notifications.error(
                            game.i18n.localize("COMBAT.CCSet")
                        );
                        return false;
                    }

                    //Should never get here
                    console.log(this);
                }
            },
            {
                name: "COMBAT.CombatantUpdate",
                icon: '<i class="fas fa-edit"></i>',
                callback: this._onConfigureCombatant.bind(this)
            },
            {
                name: "COMBAT.CombatantRemove",
                icon: '<i class="fas fa-trash"></i>',
                callback: (li) => {
                    const combatant = this.viewed.combatants.get(
                        li.data("combatant-id")
                    );
                    if (combatant) return combatant.delete();
                }
            }
        ];
    }

    /**
     * Handle a Combatant control toggle
     * @private
     * @param {Event} event   The originating mousedown event
     */
    async _onCombatantControl(event) {
        event.preventDefault();
        event.stopPropagation();
        const btn = event.currentTarget;
        const li = btn.closest(".combatant");
        const combat = this.viewed;
        const c = combat.combatants.get(li.dataset.combatantId);

        // Switch control action
        switch (btn.dataset.control) {
            case "doMove":
                return c.doMove(btn.dataset.move);
            // Toggle combatant visibility
            case "toggleHidden":
                return c.update({ hidden: !c.hidden });

            // Toggle combatant defeated flag
            case "toggleDefeated":
                return this._onToggleDefeatedStatus(c);

            // Roll combatant initiative
            case "rollInitiative":
                return combat.rollInitiative([c.id]);

            // Actively ping the Combatant
            case "pingCombatant":
                return this._onPingCombatant(c);
        }
    }

    async getData(options) {
        let context = await super.getData(options);
        if (context.combat) {
            for (let [i, combatant] of context.combat.turns.entries()) {
                context.turns[i].flags = combatant.flags;
                context.turns[i].isFirstOwner = this.isFirstOwner(
                    combatant.actor
                );
                context.turns[i].hasPlayerOwner = this.hasPlayerOwner(
                    combatant.actor
                );
            }
        }

        //console.log(context);
        return context;
    }

    firstOwner(doc) {
        /* null docs could mean an empty lookup, null docs are not owned by anyone */
        if (!doc) return false;

        const gmOwners = Object.entries(doc.ownership)
            .filter(
                ([id, level]) =>
                    game.users.get(id)?.isGM &&
                    game.users.get(id)?.active &&
                    level === 3
            )
            .map(([id, level]) => id);
        const otherOwners = Object.entries(doc.ownership)
            .filter(
                ([id, level]) =>
                    !game.users.get(id)?.isGM &&
                    game.users.get(id)?.active &&
                    level === 3
            )
            .map(([id, level]) => id);

        if (otherOwners.length > 0) return game.users.get(otherOwners[0]);
        else return game.users.get(gmOwners[0]);
    }

    isFirstOwner(doc) {
        //console.log(this.firstOwner(doc).id)
        return game.user.id === this.firstOwner(doc).id;
    }

    hasPlayerOwner(doc) {
        if (!doc) return false;

        const gmOwners = Object.entries(doc.ownership)
            .filter(
                ([id, level]) =>
                    game.users.get(id)?.isGM &&
                    game.users.get(id)?.active &&
                    level === 3
            )
            .map(([id, level]) => id);
        const otherOwners = Object.entries(doc.ownership)
            .filter(
                ([id, level]) =>
                    !game.users.get(id)?.isGM &&
                    game.users.get(id)?.active &&
                    level === 3
            )
            .map(([id, level]) => id);

        if (otherOwners.length > 0) return true;
        else return false;
    }
}
