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
                <h4 class="box-title" on:click={(e) => setMouseDice(sheet, item.name === "MOUSEGUARD.MNature" ?
                        item.system.tax : item.system.rating, game.i18n.localize(item.name))}>
                    {game.i18n.localize(item.name)}
                </h4>
            </div>
                <div class="item-detail item-rank input-group flexrow">
                    <input name={item.id} type="number" min="1" max="7" class="rating {item.name === 'MOUSEGUARD.MNature' ? 'left' : ''}"
                           value={item.system.rating}
                           data-tooltip="{game.i18n.localize('MOUSEGUARD.Rating')}"
                           on:change={(e) => updateRating(sheet, e.target.name, "rating", parseInt(e.target.value))}>
                    {#if item.name === "MOUSEGUARD.MNature"}
                        <!-- Handling Nature -->
                        <div class="divider">/</div>
                        <input name={item.id} type="number" min="0" max="{item.system.rating}" class="right"
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
                            {#each {length: parseInt(item.system.rating) + 1} as _, i}
                                <a on:click={(e) => updateRating(sheet, item.id, "pass", parseInt(item.system.pass) + advancementStep(item.system.pass, i))}
                                    ><i class="far {advancementStep(item.system.pass, i) < 0 ? 'fa-circle-check' : 'fa-circle'}"></i></a>
                            {/each}
                        </span>

                    </pass>
                    <fail>
                        <span data-tooltip="{game.i18n.localize('MOUSEGUARD.Fails')}">
                            {game.i18n.localize("MOUSEGUARD.FailsAbbr")}:
                            {#each {length: parseInt(item.system.rating)} as _, i}
                                <a on:click={(e) => updateRating(sheet, item.id, "fail", parseInt(item.system.fail) + advancementStep(item.system.fail, i))}
                                   ><i class="far {advancementStep(item.system.fail, i) < 0 ? 'fa-circle-check' : 'fa-circle'}"></i></a>
                            {/each}
                        </span>
                    </fail>
                </div>
            {/if}
        </li>
    </ol>
{/each}
<style>
    item-list .item {
        align-items: center;
        padding: 0 2px;
        border-top: 1px solid #c9c7b8;
        border-right: 1px solid #c9c7b8;
        justify-content: center;
    }

    .item-name {
        text-align: center;
        align-items: center;
    }

    .item .item-name {
        flex: 0 0 100%;
        font-size: 16px;
        line-height: 16px;
        padding: 0.25em 0.5em;
    }

    .item .item-detail {
        border-left: 0;
    }

    .item-rank input {
        text-align: center;
        height: 35px;
        font-size: large;
    }

    .box-title {
        font-family: var(--font-fancy);
        font-size: var(--text-sm);
        font-weight: 700;
        color: var(--color-text-dark-secondary);
        border-bottom: 1px solid var(--color-border-light-secondary);
    }

    .item-advancement {
        flex: 0 0 112px;
    }

    fail, pass {
        display: flex;
        width: 100%;
    }
</style>
