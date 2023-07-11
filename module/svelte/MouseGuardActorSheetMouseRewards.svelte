<script>
    import {getContext} from "svelte";

    let sheetData = getContext("sheetStore");
    let data;
    $: data = $sheetData.data;
</script>

<div class="form-group">
    <label class="header">{game.i18n.localize("MOUSEGUARD.Fate")}</label>
    <input
            class="fatebox"
            name="system.rewards.fate"
            type="number"
            value={data.system.rewards.fate}
            placeholder="0"/>
</div>
<div class="form-group">
    <label class="header">{game.i18n.localize("MOUSEGUARD.Persona")}</label>
    <input
            class="personabox"
            name="system.rewards.persona"
            type="number"
            value={data.system.rewards.persona}
            placeholder="0"/>
</div>
<div class="form-group">
    <label class="header">{game.i18n.localize("MOUSEGUARD.Checks")}</label>
    <input
            class="checksbox"
            name="system.rewards.check"
            type="number"
            value={data.system.rewards.check}
            placeholder="0"/>
</div>

<style>
    label {
        margin-top: 3px;
    }

    input {
        border: none;
    }

    .header {
        font-size: large;
        width: 100%;
        text-align: center;
        display: block;
    }

    .form-group {
        display: block;
    }

    .form-group input {
        width: 70px;
        height: 70px;
        margin-left: 15px;
        text-align: center;
        font-size: large;
    }

    .fatebox {
        background: rgba(0, 0, 0, 0) url("../assets/actor/Fate.svg") center no-repeat;
    }

    .personabox {
        background: rgba(0, 0, 0, 0) url("../assets/actor/Persona.svg") center no-repeat;
    }

    .checksbox {
        background: rgba(0, 0, 0, 0) url("../assets/actor/Checks.svg") center no-repeat;
    }
</style>
