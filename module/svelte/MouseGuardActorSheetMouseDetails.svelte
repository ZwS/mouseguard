<script>
    import {getContext} from "svelte";

    import MouseGuardEditor from "./MouseGuardEditor.svelte";

    export let limited;

    let sheetData = getContext("sheetStore");
    let data;
    $: data = $sheetData.data;
</script>

<div class="characteristics flexcol">
    <label>{game.i18n.localize("MOUSEGUARD.Age")}: </label>
    <input name="system.details.age" disabled={limited} type="text" value={data.system.details.age}>
    <label>{game.i18n.localize("MOUSEGUARD.Home")}: </label>
    <input name="system.details.home" disabled={limited} type="text" value={data.system.details.home}>
    <label>{game.i18n.localize("MOUSEGUARD.Fur")}: </label>
    <input name="system.details.fur_color" disabled={limited} type="text" value={data.system.details.fur_color}>
    <label>{game.i18n.localize("MOUSEGUARD.Cloak")}: </label>
    <input name="system.details.cloak_color" disabled={limited} type="text" value={data.system.details.cloak_color}>

    <!-- TODO Make dropdown -->
    <label>{game.i18n.localize("MOUSEGUARD.GuardRank")}: </label>
    <input name="system.details.guard_rank" disabled={limited} type="text" value={data.system.details.guard_rank}>

    <label>{game.i18n.localize("MOUSEGUARD.Parents")}: </label>
    <input name="system.details.parents" disabled={limited} type="text" value={data.system.details.parents}>
    <label>{game.i18n.localize("MOUSEGUARD.Senior")}: </label>
    <input name="system.details.senior_artisan" disabled={limited} type="text"
           value={data.system.details.senior_artisan}>
    <label>{game.i18n.localize("MOUSEGUARD.Mentor")}: </label>
    <input name="system.details.mentor" disabled={limited} type="text" value={data.system.details.mentor}>
    <label>{game.i18n.localize("MOUSEGUARD.Friend")}: </label>
    <input name="system.details.friend" disabled={limited} type="text" value={data.system.details.friend}>
    <label>{game.i18n.localize("MOUSEGUARD.Enemy")}: </label>
    <input name="system.details.enemy" disabled={limited} type="text" value={data.system.details.enemy}>
</div>
<div class="biography">
    {#if !limited}
        <div class="reward">
            <label>{game.i18n.localize("MOUSEGUARD.Belief")}</label>
            <label class="sub">{@html game.i18n.localize("MOUSEGUARD.BeliefSub")}</label>
            <textarea name="system.rewards.belief">{data.system.rewards.belief}</textarea>
        </div>
        <div class="reward">
            <label>{game.i18n.localize("MOUSEGUARD.Instinct")}</label>
            <label class="sub">{@html game.i18n.localize("MOUSEGUARD.InstinctSub")}</label>
            <textarea name="system.rewards.instinct">{data.system.rewards.instinct}</textarea>
        </div>
        <div class="reward">
            <label>{game.i18n.localize("MOUSEGUARD.Goal")}</label>
            <label class="sub">{@html game.i18n.localize("MOUSEGUARD.GoalSub")}</label>
            <textarea name="system.rewards.goal">{data.system.rewards.goal}</textarea>
        </div>
        <MouseGuardEditor target="system.biography"/>
    {:else}
        {@html data.system.biography}
    {/if}
</div>

<style>
    .characteristics {
        flex: 0 0 200px;
        height: 100%;
        padding: 0 3px 3px;
    }

    .biography {
        height: 100%;
        overflow-y: auto;
    }

    label {
        width: 100%;
        display: block;
    }

    .sub {
        font-size: small;
    }
</style>
