<script>
import Search from './Search.svelte';
import Settings from './Settings.svelte';

</script>

<div class="Header">

    <div class="Header-container">
        <div class="logo">
            <h1>Notes</h1>
        </div>

        <Search on:input />

        <Settings />
    </div>

</div>

<style>
    .Header-container{
        border-bottom: solid 1px #ccc;
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: space-between;
        padding: 10px;
    }

    h1{
        margin: 0;
        padding: 0;
    }
</style>