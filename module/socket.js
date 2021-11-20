export default class MouseSocket {

    static async askGoal(data) { 
        data.this = this;
        renderTemplate('systems/mouseguard/templates/parts/conflict-manager.hbs', data).then(dlg => {
            new Dialog({
                title: `Conflict Manager`,
                content: dlg,
                buttons: {
                  ok: {
                    label: "Apply",
                    callback: async (html) => {
                      //Do the thing
                      data.this.goalManager(html,data);
                    },
                  },
                  cancel: {
                    label: "Cancel",
                  },
                },
              }).render(true);
        });

    }

    static async goalManager(html,data) {
        let conflictGoal = html.find("#conflict_goal")[0].value;
        console.log(data);
        await game.socket.emit('system.mouseguard', {action: "setGoal", combat: data.combat._id, goal:conflictGoal });
    }


    static async setGoal(data) {
        console.log(data);
        if (game.user.isGM) {
            let combat = await (game.combats.get(data.combat));
            console.log(combat);
            combat.setGoal(data.goal);
            combat.setFlag('mouseguard','goal',data.goal)
        }
    }

    static async askMoves(data) {
        //console.log(data);
        ui.combat.renderPopout(true);
        renderTemplate('systems/mouseguard/templates/parts/conflict-move-manager.hbs', data).then(dlg => {
                    new Dialog({
                        title: `Conflict Manager`,
                        content: dlg,
                        buttons: {
                        ok: {
                            label: game.i18n.localize("MOUSEGUARD.Send"),
                            callback: async (html) => {
                            //TODO: Loop this? 
                            let error = false;
                            let Move1Actor = html.find("#move0-actor")[0].value;
                            let Move1Move = html.find(".move0:checked").val()  //$('input[name="name_of_your_radiobutton"]:checked').val();
                            let Move2Actor = html.find("#move1-actor")[0].value;
                            let Move2Move = html.find(".move1:checked").val()  //$('input[name="name_of_your_radiobutton"]:checked').val();
                            let Move3Actor = html.find("#move2-actor")[0].value;
                            let Move3Move = html.find(".move2:checked").val()  //$('input[name="name_of_your_radiobutton"]:checked').val();
                            let CombatantData = {[Move1Actor]:[], [Move2Actor]:[], [Move3Actor]: []};
                            if ((!!Move1Move) == false) error = true;
                            if ((!!Move2Move) == false) error = true;
                            if ((!!Move3Move) == false) error = true;

                                if (error) { 
                                    ui.notifications.error("An error occured while setting your moves. Please select new moves.");
                                    this.askMoves(data)
                                    return
                                }

                            CombatantData[Move1Actor].push({id:randomID(), move: Move1Move, combatant: Move1Actor});
                            CombatantData[Move2Actor].push({id:randomID(),move: Move2Move, combatant: Move2Actor});
                            CombatantData[Move3Actor].push({id:randomID(),move: Move3Move, combatant: Move3Actor});
                            let moveData = {action: 'setMoves', combat:data.combat, data: CombatantData};

                            
                            if (data.npc == true){
                                moveData.combat = data.combat.data;
                                this.setMoves(moveData)
                            } else { 
                                await game.socket.emit('system.mouseguard',moveData); 
                            }

                        },
                        },
                        cancel: {
                            label: "Cancel",
                        },
                        },
                    }).render(true);
                });
    }

    static async moveManger(html,data){

    }

    static async setMoves(data) {
        if (game.user.isGM) {
            let combat = await(game.combats.get(data.combat._id));
            let x = Object.keys(data.data).length;

            for (const key of Object.keys(data.data)) {
                let combatant = await(combat.data.combatants.get(key));
                await combatant.setFlag('mouseguard','Moves',data.data[key]);
            }
        }
    }

}

