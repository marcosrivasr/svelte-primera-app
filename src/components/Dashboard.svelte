<script>
import NotePlaceholder from './NotePlaceholder.svelte';
import Note from './Note.svelte';

export let notes = [];
</script>

<div class="Dashboard">
    <div class="Dashboard-container">
        <div class="Notes-container">
            <NotePlaceholder on:click />
            {#each notes as { id, title, color, text } }
                <Note {id} bind:title={title} {color} bind:text={text} on:changecolor on:remove on:update/>
            {/each}
        </div>
    </div>
    
</div>

<style>
    .Dashboard-container{
        width: 100%;
        padding: 20px;
        box-sizing: border-box;
    }
    .Notes-container{
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        width: 100%;
        gap: 10px;
    }


</style>