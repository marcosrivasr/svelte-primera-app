<script>
	import { onMount } from 'svelte';
	import { darkmode } from './store/store.js';

	import Header from './components/Header.svelte';
	import Dashboard from './components/Dashboard.svelte';

	import {v4} from 'uuid';

	let notes = [];
	let copyNotes = [];
	$:count = notes.length;

	onMount(async () => {
		//const response = await fetch('/api/api.json');
		const response = await fetch('http://localhost:3001');
		const data = await response.json(); 
		notes = [...data.notes];
		copyNotes = [...data.notes];

		darkmode.set(data.settings.darkmode);
		
	});

	function handleNew(){
		const color = generateColor();
		const note = {
			id: v4(),
			title: '',
			text: '',
			color: color
		};

		const dataPost = new FormData();
		dataPost.append('empresa', 'DesarrolloWeb.com');
		dataPost.append('CIF', 'ESB00001111');
		dataPost.append('formacion_profesional', 'EscuelaIT');

		fetch("http://localhost:3001/add", { 
			// Adding method type 
			method: "POST", 
				
			// Adding body or contents to send 
			body: JSON.stringify(note), 
				
			// Adding headers to the request 
			headers: { 
				"Content-type": "application/json; charset=UTF-8"
			} 
		}).then(response => response.text())
		.then(res => console.log(res));


		notes = [note, ...notes];
		copyNotes = [...notes];
	}

	function generateColor(){
		const colors = ['#DDFFC2', '#FFC2C2', '#FFEAC2', '#C2FFD3', '#C2FFEC', '#C2FAFF', '#C2E2FF', '#CBC2FF', '#EBC2FF', '#FFC2F7', '#FFC2D8'];
		const index = Math.floor(Math.random() * (colors.length));
		return colors[index];
	}

	function handleChangeColor(event){
		const id = event.detail.id;
		const index = notes.findIndex(note => note.id === id);
		notes[index].color = generateColor();
		copyNotes[index].color = generateColor();

		fetch("http://localhost:3001/update", { 
			// Adding method type 
			method: "POST", 
				
			// Adding body or contents to send 
			body: JSON.stringify(notes[index]), 
				
			// Adding headers to the request 
			headers: { 
				"Content-type": "application/json; charset=UTF-8"
			} 
		}).then(response => response.json())
		.then(res => console.log(res));
	}

	function handleQuery(e){
		const q = e.target.value.toLowerCase();
		
		if(q == ''){
			copyNotes = [...notes];
			return false;
		}
		
		const results = notes.filter(note => {
			const title = note.title.toLowerCase();
			const text = note.text.toLowerCase();

			return title.indexOf(q) > -1 || text.indexOf(q) > -1;
		});

		copyNotes = [...results];
	}

	function handleRemove(e){
		const id = e.detail.id;
		const results = notes.filter(node => node.id != id);

		notes = [...results];
		copyNotes = [...notes];

		fetch("http://localhost:3001/remove", { 
			// Adding method type 
			method: "POST", 
				
			// Adding body or contents to send 
			body: JSON.stringify({id: id}), 
				
			// Adding headers to the request 
			headers: { 
				"Content-type": "application/json; charset=UTF-8"
			} 
		}).then(response => response.json())
		.then(res => console.log(res));

		
	}

	function handleUpdate(e){
		const note = e.detail;
		const index = notes.findIndex(note => note.id === e.detail.id);
		notes[index] = e.detail;

		console.log(e.detail);

		fetch("http://localhost:3001/update", { 
			// Adding method type 
			method: "POST", 
				
			// Adding body or contents to send 
			body: JSON.stringify(e.detail), 
				
			// Adding headers to the request 
			headers: { 
				"Content-type": "application/json; charset=UTF-8"
			} 
		}).then(response => response.json())
		.then(res => console.log(res));

		
	}

</script>

<main class={$darkmode? 'darkmode' : ''}>
	<Header on:input={handleQuery}/>
	<div class="count-notes">{count} notas</div>
	<Dashboard 
		bind:notes={copyNotes} 
		on:click={handleNew} 
		on:changecolor={handleChangeColor} 
		on:remove={handleRemove}
		on:update={handleUpdate} />
</main>

<style>

	:global(body){
		margin: 0;
		padding: 0;
		height: 100%;
	}

	main{
		height: 100%;
	}

	:global(main.darkmode, main.darkmode textarea, main.darkmode input){
		background-color: black;
		color: white;
	}

	.count-notes{
		padding: 20px 20px 0 20px;
		text-align: right;
	}

</style>