<script>
    import {getContext} from "svelte";
    import MouseGuardActorSheetItemList from "./MouseGuardActorSheetItemList.svelte";

    let sheetData = getContext("sheetStore");
    let isNpc = $sheetData.actor.type !== 'character';
</script>

<div class="items">
    <ol class="items-list">
        <MouseGuardActorSheetItemList itemType="item" isNpc={isNpc}/>
    </ol>
</div>
<div class="contacts">
    <ol class="items-list">
        <MouseGuardActorSheetItemList itemType="contact" isNpc={isNpc}/>
    </ol>
</div>
