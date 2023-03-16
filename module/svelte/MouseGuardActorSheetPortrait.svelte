<script>
    import {getContext} from "svelte";

    export let limited;

    let sheetData = getContext("sheetStore");
    let {actor, sheet} = $sheetData;
    let data;
    $: data = $sheetData.data;

    /**
     * Opens a File Picker and updates the actor accordingly.
     */
    const filePicker = (event) => {
        if (limited) {
            return;
        }
        const attr = event.currentTarget.dataset.edit;
        const current = getProperty(data, attr);
        const fp = new FilePicker({
            type: "image",
            current: current,
            callback: (path) => {
                actor.update({[attr]: path});
            },
            top: sheet.position.top + 40,
            left: sheet.position.left + 10
        });
        return fp.browse();
    };
</script>

<img class="profile-img" data-edit="img" src={data.img} title={data.name} on:click={filePicker}>

<style>
    .profile-img {
        display: block;
        object-fit: contain;
        height: 100%;
        border: none;
        border-bottom: 1px solid #aaa;
    }
</style>
