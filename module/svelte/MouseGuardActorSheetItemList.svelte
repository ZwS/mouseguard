<script>
    import {getContext} from "svelte";
    import {updateRating, setMouseDice, toggleSpeciality} from "./MouseGuardCommon.svelte";

    export let itemType;
    export let isNpc;

    let sheetData = getContext("sheetStore");
    let {sheet} = $sheetData;
    let data;
    $: data = $sheetData.data;
    $: items = $sheetData.data.system.itemTypes[itemType];
    $: displayDescription = {};

    let addItem = () => () => {
        let cls = getDocumentClass("Item");
        return cls.create(
            {
                name: game.i18n.localize("MOUSEGUARD.ItemNew"),
                type: itemType
            },
            {parent: sheet.actor}
        );
    };

    let itemTypeConfigs = {
        // abilities do not supported here, they utilize their own template
        wise: {
            header: game.i18n.localize("MOUSEGUARD.Wises"),
            add: addItem,
            limit: 4
        },
        skill: {
            header: game.i18n.localize("MOUSEGUARD.Skills"),
            add: () => () => game.packs.get("mouseguard.skills").render(true),
            showRating: true,
            ratingPropertyName: game.i18n.localize("MOUSEGUARD.Rank"),
            ratingProperty: "rank",
            rollable: true,
            maxRating: 6,
            limit: 24
        },
        trait: {
            header: game.i18n.localize("MOUSEGUARD.Traits"),
            add: () => () => game.packs.get("mouseguard.traits").render(true),
            showRating: true,
            ratingPropertyName: game.i18n.localize("MOUSEGUARD.Level"),
            ratingProperty: "level",
            maxRating: 3,
            limit: 5
        },
        item: {
            header: game.i18n.localize("MOUSEGUARD.Items"),
            add: addItem,
        },
        contact: {
            header: game.i18n.localize("MOUSEGUARD.Contacts"),
            add: addItem,
        }
    };
    let itemTypeConfig = itemTypeConfigs[itemType];

    const advancementStep = (advancement, position) => advancement > position ? -1 : 1;
</script>

<li class="items-header {itemType} flexrow">
    <h3 class="item-name flexrow">{itemTypeConfig.header}</h3>
    {#if itemTypeConfig.limit}
    <div class="item-slots">
        {items.length} / {itemTypeConfig.limit}
    </div>
    {/if}
    {#if itemTypeConfig.showRating}
        <div class="item-detail item-rank">{itemTypeConfig.ratingPropertyName}</div>
    {/if}
    {#if !isNpc}
        {#if itemType === 'trait'}
            <div class="item-detail item-uses">{game.i18n.localize("MOUSEGUARD.Uses")}</div>
        {:else if itemType !== 'item' && itemType !== 'contact'}
            <div class="item-detail item-advancement">{game.i18n.localize("MOUSEGUARD.Advancement")}</div>
        {:else}
            <div class="item-detail item-type">{game.i18n.localize("MOUSEGUARD.Type")}</div>
        {/if}
    {/if}
    <div class="item-controls flexrow">
        <a class="item-control item-create" on:click={itemTypeConfig.add()}>
            <i class="fas fa-plus"></i> {game.i18n.localize("MOUSEGUARD.Add")}
        </a>
    </div>
</li>
{#each items as item}
    <ol class="item-list {itemType}" name="{item.id}">
        <li class="item flexrow">
            {#if itemTypeConfig.rollable}
                <div class="item-name flexrow rollable">
                    <div class="item-image" style="background-image: url({item.img})"
                         on:click={(e) => setMouseDice(sheet, item.system[itemTypeConfig.ratingProperty], game.i18n.localize(item.name))}></div>
                    <h4 on:click={(e) => displayDescription[item.id] = !displayDescription[item.id]}>
                        {item.name}
                    </h4>
                </div>
            {:else}
                <div class="item-name flexrow">
                    <div class="item-image" style="background-image: url({item.img})"></div>
                    <h4 on:click={(e) => displayDescription[item.id] = !displayDescription[item.id]}>
                        {item.name}
                    </h4>
                </div>
            {/if}
            {#if itemTypeConfig.showRating}
                <div class="item-detail item-rank flexrow">
                    <input name={item.id} type="number" min="1" max="{itemTypeConfig.maxRating}"
                           value={item.system[itemTypeConfig.ratingProperty]}
                           on:change={(e) => updateRating(sheet, e.target.name, itemTypeConfig.ratingProperty, parseInt(e.target.value))}>
                </div>
            {/if}
            {#if !isNpc}
                {#if itemType === 'skill'}
                    <div class="item-detail item-advancement">
                        <pass>
                            <span data-tooltip="{game.i18n.localize('MOUSEGUARD.Passes')}">
                                {game.i18n.localize("MOUSEGUARD.PassesAbbr")}:
                                {#each {length: parseInt(item.system[itemTypeConfig.ratingProperty]) + 1} as _, i}
                                    <a on:click={(e) => updateRating(sheet, item.id, "pass", parseInt(item.system.pass) + advancementStep(item.system.pass, i))}
                                        ><i class="far {advancementStep(item.system.pass, i) < 0 ? 'fa-circle-check' : 'fa-circle'}"></i></a>
                                {/each}
                            </span>
                        </pass>
                        <fail>
                            <span data-tooltip="{game.i18n.localize('MOUSEGUARD.Fails')}">
                                {game.i18n.localize("MOUSEGUARD.FailsAbbr")}:
                                {#each {length: parseInt(item.system[itemTypeConfig.ratingProperty])} as _, i}
                                    <a on:click={(e) => updateRating(sheet, item.id, "fail", parseInt(item.system.fail) + advancementStep(item.system.fail, i))}
                                        ><i class="far {advancementStep(item.system.fail, i) < 0 ? 'fa-circle-check' : 'fa-circle'}"></i></a>
                                {/each}
                            </span>
                        </fail>
                    </div>
                {/if}
                {#if itemType === 'item'}
                    <div class="item-detail item-type">
                        <select bind:value="{item.itemType}" on:change={updateRating(sheet, item.id, "itemType", item.itemType)}>
                            <option value="weapon">{game.i18n.localize("MOUSEGUARD.Weapon")}</option>
                            <option value="item">{game.i18n.localize("MOUSEGUARD.Item")}</option>
                        </select>
                    </div>
                {/if}
                {#if itemType === 'contact'}
                    <div class="item-detail item-type">
                        <select bind:value="{item.itemType}" on:change={updateRating(sheet, item.id, "itemType",  item.itemType)}>
                            <option value="parent">{game.i18n.localize("MOUSEGUARD.Parents")}</option>
                            <option value="friend">{game.i18n.localize("MOUSEGUARD.Friend")}</option>
                            <option value="enemy">{game.i18n.localize("MOUSEGUARD.Enemy")}</option>
                            <option value="senior">{game.i18n.localize("MOUSEGUARD.Senior")}</option>
                            <option value="mentor">{game.i18n.localize("MOUSEGUARD.Mentor")}</option>
                        </select>
                    </div>
                {/if}
                {#if itemType === 'wise'}
                    <div class="item-detail item-advancement">
                        <pass>
                            <a on:click={(e) => updateRating(sheet, item.id, "pass", parseInt(item.system.pass) + advancementStep(item.system.pass, 1))}>
                                <i class="far {advancementStep(item.system.pass, 1) < 0 ? 'fa-circle-check' : 'fa-circle'}"></i>
                                {game.i18n.localize("MOUSEGUARD.WisePass")}
                            </a>
                        </pass>
                        <fail>
                            <a on:click={(e) => updateRating(sheet, item.id, "fail", parseInt(item.system.fail) + advancementStep(item.system.fail, 1))}>
                                <i class="far {advancementStep(item.system.fail, 1) < 0 ? 'fa-circle-check' : 'fa-circle'}"></i>
                                {game.i18n.localize("MOUSEGUARD.WiseFail")}
                            </a>
                        </fail>
                        <fate>
                            <a on:click={(e) => updateRating(sheet, item.id, "fate", parseInt(item.system.fate) + advancementStep(item.system.fate, 1))}>
                                <i class="far {advancementStep(item.system.fate, 1) < 0 ? 'fa-circle-check' : 'fa-circle'}"></i>
                                {game.i18n.localize("MOUSEGUARD.WiseFate")}
                            </a>
                        </fate>
                        <persona>
                            <a on:click={(e) => updateRating(sheet, item.id, "persona", parseInt(item.system.persona) + advancementStep(item.system.persona, 1))}>
                                <i class="far {advancementStep(item.system.persona, 1) < 0 ? 'fa-circle-check' : 'fa-circle'}"></i>
                                {game.i18n.localize("MOUSEGUARD.WisePersona")}
                            </a>
                        </persona>
                    </div>
                {/if}
                {#if itemType === 'trait'}
                    <div class="item-detail item-uses">
                        <for>
                            <span data-tooltip="{game.i18n.localize('MOUSEGUARD.UsedFor')}">
                                {game.i18n.localize("MOUSEGUARD.UsedForAbbr")}:
                                {#if item.system.level < 3}
                                    {#each {length: parseInt(item.system.level)} as _, i}
                                        <a on:click={(e) => updateRating(sheet, item.id, "usedfor",  parseInt(item.system.usedfor) + advancementStep(item.system.usedfor, i))}
                                            ><i class="far {advancementStep(item.system.usedfor, i) < 0 ? 'fa-circle-check' : 'fa-circle'}"></i></a>
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
                                    <a on:click={(e) => updateRating(sheet, item.id, "usedagainst", parseInt(item.system.usedagainst) + advancementStep(item.system.usedagainst, i))}
                                        ><i class="far {advancementStep(item.system.usedagainst, i) < 0 ? 'fa-circle-check' : 'fa-circle'}"></i></a>
                                {/each}
                            </span>
                        </against>
                    </div>
                {/if}
            {/if}
            <div class="item-controls flexrow">
                {#if itemType === 'skill'}
                    <a class="item-control item-toggle {item.system.speciality ? 'active' : ''}"
                       data-tooltip="{game.i18n.localize('MOUSEGUARD.Speciality')}"
                       on:click={toggleSpeciality(sheet, item.id, !item.system.speciality)}>
                        <i class="fas fa-sun"></i>
                    </a>
                {/if}
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
    fail, pass, for, against {
        display: flex;
        width: 100%;
    }

    .item-list.wise .item-advancement {
        column-count: 2;
    }

    .item-list.wise .item-advancement, .items-header.wise .item-advancement {
        flex: 0 0 162px;
    }

    .wise fail, .wise pass, .wise fate, .wise persona {
        display: flex;
        width: 50%;
    }
</style>
