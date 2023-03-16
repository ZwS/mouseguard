<script>
    import {getContext} from "svelte";
    import {updateRating, setMouseDice} from "./MouseGuardCommon.svelte";

    export let isNpc;

    let sheetData = getContext("sheetStore");
    let {sheet} = $sheetData;
    let data;
    $: data = $sheetData.data;
    $: items = $sheetData.data.system.itemTypes.ability;

    const advancementStep = (advancement, position) => advancement > position ? -1 : 1;
</script>

<li class="items-header flexrow">
    <h3 class="item-name flexrow">{game.i18n.localize("MOUSEGUARD.Abilities")}</h3>
</li>
{#each items as item}
    <ol class="item-list" name="{item.id}">
        <li class="item flexrow">
            <div class="item-name rollable">
                <h4 on:click={(e) => setMouseDice(sheet, item.system.rating, game.i18n.localize(item.name))}>
                    {game.i18n.localize(item.name)}
                </h4>
            </div>
                <div class="item-detail item-rank flexrow">
                    <input name={item.id} type="number" min="1" max="7"
                           value={item.system.rating}
                           data-tooltip="{game.i18n.localize('MOUSEGUARD.Rating')}"
                           on:change={(e) => updateRating(sheet, e.target.name, "rating", parseInt(e.target.value))}>
                    {#if item.name === "MOUSEGUARD.MNature"}
                        <!-- Handling Nature -->
                        <div class="divider">/</div>
                        <input name={item.id} type="number" min="0" max="{item.system.rating}"
                               value={item.system.tax}
                               data-tooltip="{game.i18n.localize('MOUSEGUARD.Tax')}"
                               on:change={(e) => updateRating(sheet, e.target.name, "tax", parseInt(e.target.value))}/>
                    {/if}
                </div>
            {#if !isNpc}
                <div class="item-detail item-advancement">
                    <pass>
                        <span data-tooltip="{game.i18n.localize('MOUSEGUARD.Passes')}">
                            {game.i18n.localize("MOUSEGUARD.PassesAbbr")}:
                        </span>
                        {#each {length: parseInt(item.system.rating) + 1} as _, i}
                            <div class="{advancementStep(item.system.pass, i) < 0 ? 'checkmark' : 'no-checkmark'}"
                                 on:click={(e) => updateRating(sheet, item.id, "pass",
                                    parseInt(item.system.pass) + advancementStep(item.system.pass, i))}></div>
                        {/each}
                    </pass>
                    <fail>
                        <span data-tooltip="{game.i18n.localize('MOUSEGUARD.Fails')}">
                            {game.i18n.localize("MOUSEGUARD.FailsAbbr")}:
                        </span>
                        {#each {length: parseInt(item.system.rating)} as _, i}
                            <div class="{advancementStep(item.system.fail, i) < 0 ? 'checkmark' : 'no-checkmark'}"
                                 on:click={(e) => updateRating(sheet, item.id, "fail",
                                    parseInt(item.system.fail) + advancementStep(item.system.fail, i))}></div>
                        {/each}
                    </fail>
                </div>
            {/if}
        </li>
    </ol>
{/each}
<style>
    .items-header > * {
        font-size: 12px;
        text-align: center;
    }

    .items-header {
        height: 28px;
        margin: 2px 0;
        padding: 0;
        align-items: center;
        background: rgba(0, 0, 0, 0.05);
        border: 2px groove #eeede0;
        font-weight: bold;
    }

    .items-header h3 {
        padding-left: 5px;
        font-weight: 700;
        text-align: left;
        font-size: 16px;
        border: none;
        margin-bottom: 0;
    }

    .item-list {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    .item {
        align-items: center;
        padding: 0 2px;
        border-top: 1px solid #c9c7b8;
        border-right: 1px solid #c9c7b8;
        justify-content: center;
    }

    .rollable:hover {
        text-shadow: 0 0 10px var(--color-shadow-primary);
    }

    .item-name {
        flex: 2;
        margin: 0;
        overflow: hidden;
        font-size: 13px;
        text-align: center;
        align-items: center;
    }

    .item .item-name {
        flex: 0 0 100%;
        font-size: 16px;
        line-height: 16px;
        padding: 0.25em 0.5em;
        border-top: 1px solid #c9c7b8;
    }

    .item-name h4 {
        margin-bottom: 0;
    }

    .item-detail {
        flex: 0 0 70px;
        font-size: 12px;
        text-align: center;
        word-break: break-word;
        white-space: nowrap;
        overflow: hidden;
    }

    .item-rank {
        flex: 0 0 60px;
        border-left: 1px solid #c9c7b8;
        border-right: 1px solid #c9c7b8;
    }

    .item-rank input {
        border: none;
        text-align: center;
        background-color: white;
        height: 35px;
        font-size: large;
    }

    .item-rank input:hover {
        box-shadow: none;
    }

    .item-rank .divider {
        text-align: center;
        background-color: white;
        height: 35px;
        font-size: large;
        line-height: 35px;
    }

    .item-advancement {
        flex: 0 0 130px;
    }

    .item .item-advancement {
        text-align: left;
    }

    .item-controls a {
        font-size: 12px;
        text-align: center;
    }

    fail, pass {
        display: flex;
        width: 100%;
    }

    .checkmark:after {
        content: "✔";
        display: block;
        width: 12px;
        height: 12px;
        text-align: center;
        font-size: 10px;
        border: 1px solid #aaa;
        background: #f8f8f8;
        border-radius: 50%;
        box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3);
    }

    .no-checkmark:after {
        content: " ";
        display: block;
        width: 12px;
        height: 12px;
        text-align: center;
        font-size: 10px;
        border: 1px solid #aaa;
        background: #f8f8f8;
        border-radius: 50%;
        box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3);
    }
</style>
