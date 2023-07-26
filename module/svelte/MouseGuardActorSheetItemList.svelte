<script>
    import {getContext} from "svelte";
    import {updateRating, setMouseDice} from "./MouseGuardCommon.svelte";

    export let itemType;
    export let isNpc;

    let sheetData = getContext("sheetStore");
    let {sheet} = $sheetData;
    let data;
    $: data = $sheetData.data;
    $: items = $sheetData.data.system.itemTypes[itemType];
    $: displayDescription = {};

    let itemTypeConfigs = {
        // abilities do not supported here, they utilize their own template
        wise: {
            header: game.i18n.localize("MOUSEGUARD.Wises"),
            add: () => () => {
                let cls = getDocumentClass("Item");
                return cls.create(
                    {
                        name: game.i18n.localize("MOUSEGUARD.ItemNew"),
                        type: "wise"
                    },
                    { parent: sheet.actor }
                );
            }, //FIXME does not work
            showRating: true,
            ratingPropertyName: game.i18n.localize("MOUSEGUARD.Rank"),
            showAdvance: true,
            ratingProperty: "rank",
            maxRating: 7
        },
        skill: {
            header: game.i18n.localize("MOUSEGUARD.Skills"),
            add: () => () => game.packs.get("mouseguard.skills").render(true),
            showRating: true,
            ratingPropertyName: game.i18n.localize("MOUSEGUARD.Rank"),
            showAdvance: true,
            ratingProperty: "rank",
            maxRating: 7
        },
        trait: {
            header: game.i18n.localize("MOUSEGUARD.Traits"),
            add: () => () => game.packs.get("mouseguard.traits").render(true),
            showRating: true,
            ratingPropertyName: game.i18n.localize("MOUSEGUARD.Level"),
            ratingProperty: "level",
            maxRating: 3
        }
        // TODO add support for items and connections
    };
    let itemTypeConfig = itemTypeConfigs[itemType];

    const advancementStep = (advancement, position) => advancement > position ? -1 : 1;
</script>

<li class="items-header flexrow">
    <h3 class="item-name flexrow">{itemTypeConfig.header}</h3>
    {#if itemTypeConfig.showRating}
        <div class="item-detail item-rank">{itemTypeConfig.ratingPropertyName}</div>
    {/if}
    {#if itemTypeConfig.showAdvance && !isNpc}
        <div class="item-detail item-advancement">{game.i18n.localize("MOUSEGUARD.Advancement")}</div>
    {/if}
    {#if itemType === 'trait' && !isNpc}
        <div class="item-detail item-uses">{game.i18n.localize("MOUSEGUARD.Uses")}</div>
    {/if}
    <div class="item-controls flexrow">
        <a class="item-control item-create" on:click={itemTypeConfig.add()}>
            <i class="fas fa-plus"></i> {game.i18n.localize("MOUSEGUARD.Add")}
        </a>
    </div>
</li>
{#each items as item}
    <ol class="item-list" name="{item.id}">
        <li class="item flexrow">
            <div class="item-name flexrow rollable">
                <div class="item-image" style="background-image: url({item.img})"
                     on:click={(e) => setMouseDice(sheet, item.system[itemTypeConfig.ratingProperty], game.i18n.localize(item.name))}>
                </div>
                <h4 on:click={(e) => displayDescription[item.id] = !displayDescription[item.id]}>
                    {item.name}
                </h4>
            </div>
            {#if itemTypeConfig.showRating}
                <div class="item-detail item-rank flexrow">
                    <input name={item.id} type="number" min="1" max="{itemTypeConfig.maxRating}"
                           value={item.system[itemTypeConfig.ratingProperty]}
                           on:change={(e) => updateRating(sheet, e.target.name, itemTypeConfig.ratingProperty, parseInt(e.target.value))}>
                </div>
            {/if}
            {#if itemTypeConfig.showAdvance && !isNpc}
                <div class="item-detail item-advancement">
                    <pass>
                        <span data-tooltip="{game.i18n.localize('MOUSEGUARD.Passes')}">
                            {game.i18n.localize("MOUSEGUARD.PassesAbbr")}:
                            {#each {length: parseInt(item.system[itemTypeConfig.ratingProperty]) + 1} as _, i}
                                <i class="far {advancementStep(item.system.pass, i) < 0 ? 'fa-circle-check' : 'fa-circle'}"
                                   on:click={(e) => updateRating(sheet, item.id, "pass",
                                        parseInt(item.system.pass) + advancementStep(item.system.pass, i))}></i>
                            {/each}
                        </span>
                    </pass>
                    <fail>
                        <span data-tooltip="{game.i18n.localize('MOUSEGUARD.Fails')}">
                            {game.i18n.localize("MOUSEGUARD.FailsAbbr")}:

                            {#each {length: parseInt(item.system[itemTypeConfig.ratingProperty])} as _, i}
                                <i class="far {advancementStep(item.system.fail, i) < 0 ? 'fa-circle-check' : 'fa-circle'}"
                                   on:click={(e) => updateRating(sheet, item.id, "fail",
                                        parseInt(item.system.fail) + advancementStep(item.system.fail, i))}></i>
                            {/each}
                        </span>
                    </fail>
                </div>
            {/if}
            {#if itemType === 'trait' && !isNpc}
                <div class="item-detail item-uses">
                    <for>
                        <span data-tooltip="{game.i18n.localize('MOUSEGUARD.UsedFor')}">
                            {game.i18n.localize("MOUSEGUARD.UsedForAbbr")}:
                            {#if item.system.level < 3}
                                {#each {length: parseInt(item.system.level)} as _, i}
                                    <i class="far {advancementStep(item.system.usedfor, i) < 0 ? 'fa-circle-check' : 'fa-circle'}"
                                       on:click={(e) => updateRating(sheet, item.id, "usedfor",
                                        parseInt(item.system.usedfor) + advancementStep(item.system.usedfor, i))}></i>
                                {/each}
                            {:else}
                                <strong>&infin;</strong>
                            {/if}
                        </span>
                    </for>
                    <against>
                        <span data-tooltip="{game.i18n.localize('MOUSEGUARD.UsedAgainst')}">
                            {game.i18n.localize("MOUSEGUARD.UsedAgainstAbbr")}:
                            {#each {length: 6} as _, i}
                                <i class="far {advancementStep(item.system.usedagainst, i) < 0 ? 'fa-circle-check' : 'fa-circle'}"
                                   on:click={(e) => updateRating(sheet, item.id, "usedagainst",
                                        parseInt(item.system.usedagainst) + advancementStep(item.system.usedagainst, i))}></i>
                            {/each}
                        </span>
                    </against>
                </div>
            {/if}
            <div class="item-controls flexrow">
                <a class="item-control item-edit" on:click={sheet?._onItemUpdate(item.id)}>
                    <i class="fas fa-edit"></i>
                </a>
                <a class="item-control item-delete" on:click={sheet?._onItemDelete(item.id)}>
                    <i class="fas fa-trash"></i>
                </a>
            </div>
            {#if displayDescription[item.id] && item.system.description}
                <div class="item-summary">
                    {@html item.system.description}
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
        border-bottom: 1px solid #c9c7b8;
    }

    .rollable:hover {
        text-shadow: 0 0 10px var(--color-shadow-primary);
    }

    .rollable:hover .item-image {
        background-image: url('../assets/dice/dicesword.webp') !important;
    }

    .item-image {
        flex: 0 0 35px;
        height: 40px;
        background-size: cover;
        background-position: 50% 0;
        border: none;
        margin-right: 5px;
    }

    .item-name {
        flex: 2;
        margin: 0;
        overflow: hidden;
        font-size: 14px;
        text-align: left;
        align-items: center;
    }

    .item .item-name {
        line-height: 40px;
    }

    .item-name h4 {
        margin-bottom: 0;
    }

    .item-detail {
        flex: 0 0 70px;
        font-size: 12px;
        text-align: center;
        border-right: 1px solid #c9c7b8;
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

    .item-advancement, .item-uses {
        flex: 0 0 112px;
    }

    .item .item-advancement, .item .item-uses {
        text-align: left;
    }

    .item-controls {
        flex: 0 0 50px;
        justify-content: space-between;
    }

    .item-controls a {
        font-size: 12px;
        text-align: center;
    }

    .item-summary {
        flex: 0 0 100%;
        font-size: 12px;
        line-height: 16px;
        padding: 0.25em 0.5em;
        color: #191813;
        border-top: 1px solid #c9c7b8;
    }

    fail, pass, for, against {
        display: flex;
        width: 100%;
    }
</style>
