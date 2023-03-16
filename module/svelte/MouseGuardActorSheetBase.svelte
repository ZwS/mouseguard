<script>
    import {setContext} from "svelte";

    // Component imports
    //TODO: IMPORTS
    import MouseGuardActorSheetMouseDetails from "./MouseGuardActorSheetMouseDetails.svelte";
    import MouseGuardActorSheetMouseRewards from "./MouseGuardActorSheetMouseRewards.svelte";
    import MouseGuardActorSheetMouseSkillAbilityTab from "./MouseGuardActorSheetMouseSkillAbilityTab.svelte";
    import MouseGuardActorSheetDisposition from "./MouseGuardActorSheetDisposition.svelte";
    import MouseGuardActorSheetPortrait from "./MouseGuardActorSheetPortrait.svelte";
    import MouseGuardActorSheetName from "./MouseGuardActorSheetName.svelte";

    //Exports
    export let dataStore;
    setContext("sheetStore", dataStore);

    let items = [
        {
            label: game.i18n.localize("MOUSEGUARD.Characteristics"),
            component: MouseGuardActorSheetMouseSkillAbilityTab
        },
        {
            label: game.i18n.localize("MOUSEGUARD.About"),
            component: MouseGuardActorSheetMouseDetails
        }
        // TODO add inventory
    ];

    export let activeTabValue = items[0].component;
    const handleClick = tabValue => () => (activeTabValue = tabValue);
</script>

<header class="flexrow">
    <section class="left-col">
        <div class="flexrow">
            <MouseGuardActorSheetName/>
            <MouseGuardActorSheetDisposition/>
        </div>
        <nav class="sheet-navigation tabs">
            {#each items as item}
                <a class="item {activeTabValue === item.component ? 'active' : ''}"
                   on:click={handleClick(item.component)}>
                    {item.label}
                </a>
            {/each}
        </nav>
    </section>
    <section class="right-col">
        <MouseGuardActorSheetPortrait/>
    </section>
</header>
<section class="sheet-body flexrow">
    <section class="tab flexrow">
        {#if activeTabValue}
            <svelte:component this={activeTabValue}/>
        {/if}
    </section>
    <section class="right-col flexcol">
        <MouseGuardActorSheetMouseRewards/>
    </section>
</section>

<style>
    .tabs {
        flex: 0 0 40px;
        border-top: 1px solid #aaa;
        border-bottom: 1px solid #aaa;
    }

    .tabs .item {
        line-height: 40px;
        font-weight: bold;
    }


    .tabs .item.active {
        text-shadow: 0 0 10px var(--color-shadow-primary);
        border-bottom: 3px solid #58180d;
    }

    .sheet-body {
        flex: 1;
        overflow: hidden;
    }

    .right-col {
        flex: 0 0 100px;
        border-left: 1px solid #aaa;
    }

    .tab {
        height: 100%;
    }
</style>
