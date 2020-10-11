<script>

    import { darkmode } from '../store/store.js';

	function changeTheme() {
        darkmode.update(x => !$darkmode);

        fetch("http://localhost:3001/darkmode", { 
			// Adding method type 
			method: "POST", 
				
			// Adding body or contents to send 
			body: JSON.stringify({darkmode: $darkmode}), 
				
			// Adding headers to the request 
			headers: { 
				"Content-type": "application/json; charset=UTF-8"
			} 
		}).then(response => response.json())
		.then(res => console.log(res));
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