<script>
    import {getContext} from "svelte";

    let sheetData = getContext("sheetStore");
    let data;
    $: data = $sheetData.data;
</script>

<div class="disposition-container form-group flexcol">
    <label class="header">{game.i18n.localize("MOUSEGUARD.Disposition")}</label>
    <div class="disposition input-group flexrow">
        <input name="system.disposition.starting" type="number" min="0" class="left"
               value={data.system.disposition.starting}
               data-tooltip="{game.i18n.localize('MOUSEGUARD.StartingDisposition')}">
        <div class="divider">/</div>
        <input name="system.disposition.current" type="number" min="0" class="right"
               value={data.system.disposition.current}
               data-tooltip="{game.i18n.localize('MOUSEGUARD.CurrentDisposition')}">
    </div>
</div>

<style>
    .disposition-container {
        flex: 0;
        margin-left: auto;
        border-left: 1px solid #c9c7b8;
        padding-left: 5px;
        padding-right: 5px;
    }

    .header {
        font-size: large;
        width: 100%;
        text-align: center;
    }

    input {
        text-align: center;
        height: 35px;
        font-size: large;
    }
</style>
