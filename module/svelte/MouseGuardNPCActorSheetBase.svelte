<script>
    import { setContext } from "svelte";

    import MouseGuardActorSheetDisposition from "./MouseGuardActorSheetDisposition.svelte";
    import MouseGuardActorSheetMouseSkillAbilityTab from "./MouseGuardActorSheetMouseSkillAbilityTab.svelte";
    import MouseGuardActorSheetName from "./MouseGuardActorSheetName.svelte";
    import MouseGuardActorSheetMousePortrait from "./MouseGuardActorSheetPortrait.svelte";

    //Exports
    export let dataStore;
    setContext("sheetStore", dataStore);
    //let sheetData = getContext("sheetStore");
</script>

<header class="flexrow">
    <section class="left-col">
        <div class="flexrow">
            <MouseGuardActorSheetName/>
            <MouseGuardActorSheetDisposition/>
        </div>
        <div class="npc-info flexrow">
            <div class="npc-type">
                {game.i18n.localize('MOUSEGUARD.CharacterType')}:
                {game.i18n.localize('ACTOR.Type' + $dataStore.actor.type.capitalize())}
            </div>
            <div class="npc-size">
                <!-- TODO add size to actor sheet -->
            </div>
        </div>
    </section>
    <section class="right-col">
        <MouseGuardActorSheetMousePortrait/>
    </section>
</header>
<section class="sheet-body flexcol">
    <section class="flexrow">
        <MouseGuardActorSheetMouseSkillAbilityTab/>
    </section>
    <section class="flexrow">
        <!-- TODO add Disposition -->
    </section>
</section>

<style>
    .sheet-body {
        flex: 1;
        overflow: hidden;
    }

    .npc-info {
        flex: 0 0 45px;
        border-top: 1px solid #aaa;
        border-bottom: 1px solid #aaa;
        justify-content: center;
        line-height: 45px;
    }

    .right-col {
        flex: 0 0 100px;
        border-left: 1px solid #aaa;
    }
</style>
