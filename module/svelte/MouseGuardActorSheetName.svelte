<script>
    import {getContext} from "svelte";

    export let limited;

    let sheetData = getContext("sheetStore");
    let data;
    $: data = $sheetData.data;
</script>

<div class="namebox">
    <input name="name" disabled={limited} type="text" value={data.name}
           placeholder="{game.i18n.localize('MOUSEGUARD.Name')}"/>
</div>

<style>
    .namebox {
        flex: 0 0 60px;
    }

    .namebox input {
        background: rgba(0, 0, 0, 0) url("../assets/actor/NameBanner.svg") no-repeat;
        height: 60px;
        width: 300px;
        font-size: 24px;
        padding-left: 20px;
        padding-bottom: 14px;
        pointer-events: auto;
        border: none;
        box-shadow: none;
    }
</style>
