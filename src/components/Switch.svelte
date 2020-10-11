<script>

    import { darkmode } from '../store/store.js';

	function changeTheme() {
        darkmode.update(x => !$darkmode);
	}
</script>

<div class="Switch">
    <div class={ ($darkmode? 'switch-container on': 'switch-container')}>
       <button class="circle" on:click={changeTheme} ></button>
    </div>
    
</div>


<style>
    .switch-container{
        background-color: #ccc;
        width: 50px;
        height: 25px;
        border-radius: 30px;
        margin: 0 10px;
    }

    .switch-container .circle{
        cursor: pointer;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        transition: all 0.2s;
    }

    .on .circle{
        margin-left: 25px;
    }

    .on{
        background-color: blue;
    }
</style>