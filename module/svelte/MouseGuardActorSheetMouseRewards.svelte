<script>
    import {getContext} from "svelte";

    let sheetData = getContext("sheetStore");
    let data;
    $: data = $sheetData.data;
</script>

<fatebox>
    <label class="header">{game.i18n.localize("MOUSEGUARD.Fate")}</label>
    <input
            name="system.rewards.fate"
            type="number"
            value={data.system.rewards.fate}
            placeholder="0"/>
</fatebox>
<personabox>
    <label class="header">{game.i18n.localize("MOUSEGUARD.Persona")}</label>
    <input
            name="system.rewards.persona"
            type="number"
            value={data.system.rewards.persona}
            placeholder="0"/>
</personabox>
<checksbox>
    <label class="header">{game.i18n.localize("MOUSEGUARD.Checks")}</label>
    <input
            name="system.rewards.check"
            type="number"
            value={data.system.rewards.check}
            placeholder="0"/>
</checksbox>

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

    fatebox, personabox, checksbox {
        display: block;
    }

    fatebox input, personabox input, checksbox input {
        width: 70px;
        height: 70px;
        margin-left: 15px;
        text-align: center;
        font-size: large;
    }

    fatebox input {
        background: rgba(0, 0, 0, 0) url("../assets/actor/Fate.svg") center no-repeat;
    }

    personabox input {
        background: rgba(0, 0, 0, 0) url("../assets/actor/Persona.svg") center no-repeat;
    }

    checksbox input {
        background: rgba(0, 0, 0, 0) url("../assets/actor/Checks.svg") center no-repeat;
    }
</style>
