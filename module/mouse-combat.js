/**
 * A specialized form used to pop out the editor.
 * @extends {Combat}
 *
 * OPTIONS:
 *
 *
 */

import MouseSocket from "./socket";

export default class MouseCombat extends Combat {
    constructor(object = {}, options = {}) {
        super(object, options);
    }

    /** @override */
    getData() {
        const context = super.getData();
        return context;
    }

    get getGoal1() {
        return this.getFlag("mouseguard", "goal1");
    }

    get getGoal2() {
        return this.getFlag("mouseguard", "goal2");
    }

    get getConflictCaptain() {
        return this.getFlag("mouseguard", "ConflictCaptain");
    }

    get getConflictCaptainTeam2() {
        return this.getFlag("mouseguard", "ConflictCaptain2");
    }

    async setConflictCaptain(value) {
        return this.setFlag("mouseguard", "ConflictCaptain", value);
    }

    async setConflictCaptainTeam2(value) {
        return this.setFlag("mouseguard", "ConflictCaptain2", value);
    }

    async _preCreate(data, options, user) {
        await super._preCreate(data, options, user);
        this.updateSource({
            flags: {
                mouseguard: {
                    ConflictCaptain: null,
                    ConflictCaptain2: null,
                    goal1: null,
                    goal2: null
                }
            }
        });
    }

    static _canUpdate(user, doc, data) {
        if (user.isGM) return true; // GM users can do anything
        const updateKeys = new Set(Object.keys(data));
        const allowedKeys = new Set(["_id", "initiative", "flags"]);
        return updateKeys.isSubset(allowedKeys); // Players may only update initiative scores and flags
    }

    async startCombat() {
        let goal = this.flags.mouseguard.goal;
        let CC = this.flags.mouseguard.ConflictCaptain;

        if (!CC) {
            ui.notifications.error(game.i18n.localize("COMBAT.NeedCC"));
            return false;
        }
        if (goal == null) {
            ui.notifications.error(game.i18n.localize("COMBAT.NeedGoal"));
            this.askGoal();
            return false;
        }

        if (!!goal != false && CC) {
            this.askMove();
            //ui.combat.renderPopout(true)
            return this.update({ round: 1, turn: 0 });
        }
        return false;
    }

    getCCPlayer() {
        let combatant = this.combatants.get(this.getConflictCaptain);
        let actor = game.actors.get(combatant.actorId);
        let player;

        // Loop through permisisons looking for not GM
        Object.keys(actor.ownership).forEach((key) => {
            if (actor.ownership[key] == 3) {
                //Check if GM if not it's owner
                let user = game.users.get(key);
                if (!user.isGM) player = user;
            }
        });
        return player;
    }

    async askGoal() {
        let CC = this.flags.mouseguard.ConflictCaptain;

        if (!CC) {
            ui.notifications.error("A Conflict Captain Must be set");
            return false;
        }

        let player = this.getCCPlayer();
        await game.socket.emit(
            "system.mouseguard",
            { action: "askGoal", combat: this },
            { recipients: [player._id] }
        );
    }

    async setGoal(goal) {
        this.setFlag("mouseguard", "goal1", goal).then((content) => {
            this.startCombat();
        });

        return true;
    }

    // Create a list of combatants for each team then send the conflict captains the modal for moves
    // Filter by combatant.team
    // Need to refactor to include Captains for both teams
    async askMove() {
        let CC = this.flags.mouseguard.ConflictCaptain;

        if (!CC) {
            ui.notifications.error(game.i18n.localize("COMBAT.NeedCC"));
            return false;
        }

        let data = { combat: this };
        let team1 = [];
        let team2 = [];

        //Team 1
        let combatants = this.combatants.filter((comb) => comb.team == "1");
        Object.keys(combatants).forEach((key) => {
            team1.push({
                combatant: combatants[key].id,
                name: combatants[key].token.name
            });
        });

        data.actors = team1;
        data.action = "askMoves";

        let player = this.getCCPlayer();

        await game.socket.emit("system.mouseguard", data, {
            recipients: [player._id]
        });

        //Team 2
        let team2combatants = this.combatants.filter(
            (comb) => comb.team == "2"
        );

        Object.keys(team2combatants).forEach((key) => {
            team2.push({
                combatant: team2combatants[key].id,
                name: team2combatants[key].token.name
            });
        });

        data.actors = team2;
        data.npc = true;

        await MouseSocket.askMoves(data);
    }

    async askNPCMove(data) {
        //console.log(data);
        MouseSocket.askMoves(data);
    }

    async nextRound() {
        let turn = 0;
        if (this.settings.skipDefeated) {
            turn = this.turns.findIndex((t) => {
                return !(
                    t.defeated ||
                    t.actor?.effects.find(
                        (e) =>
                            e.getFlag("core", "statusId") ===
                            CONFIG.Combat.defeatedStatusId
                    )
                );
            });
            if (turn === -1) {
                ui.notifications.warn("COMBAT.NoneRemaining", {
                    localize: true
                });
                turn = 0;
            }
        }
        let advanceTime =
            Math.max(this.turns.length - this.data.turn, 1) *
            CONFIG.time.turnTime;
        advanceTime += CONFIG.time.roundTime;
        this.askMove();
        return this.update(
            { round: this.round + 1, turn: turn },
            { advanceTime }
        );
    }
}
