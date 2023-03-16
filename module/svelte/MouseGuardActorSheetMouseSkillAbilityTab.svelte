<script>
    import {getContext} from "svelte";

    import MouseGuardActorSheetItemList from "./MouseGuardActorSheetItemList.svelte";
    import MouseGuardActorSheetAbilityList from "./MouseGuardActorSheetAbilityList.svelte";

    let sheetData = getContext("sheetStore");
    let isNpc = $sheetData.actor.type !== 'character';
</script>

<div class="abilities">
    <ol class="items-list">
        <MouseGuardActorSheetAbilityList isNpc={isNpc}/>
    </ol>
</div>
<div class="items">
    <ol class="items-list">
        <MouseGuardActorSheetItemList itemType="wise" isNpc={isNpc}/>
        <MouseGuardActorSheetItemList itemType="skill" isNpc={isNpc}/>
        <MouseGuardActorSheetItemList itemType="trait" isNpc={isNpc}/>
    </ol>
</div>

<style>
    .abilities {
        flex: 0 0 200px;
    }

    .items-list {
        list-style: none;
        margin: 0;
        padding: 0;
        color: #7a7971;
        overflow-y: auto;
        scrollbar-width: thin;
    }
</style>
