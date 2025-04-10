<script>
  import InputForm from '$lib/InputForm.svelte';
  import MonteCarloResults from '$lib/MonteCarloResults.svelte';
  import SpinningWheel from '$lib/SpinningWheel.svelte';
  import { runMonteCarlo } from '$lib/lottery';

  let teams = [
    { name: '', odds: 0 },
    { name: '', odds: 0 },
    { name: '', odds: 0 },
    { name: '', odds: 0 },
    { name: '', odds: 0 },
    { name: '', odds: 0 },
  ];

  let results = null;
  let numSimulations = 10000;

  let showWheel = false;
  let draftOrder = [];

  function updateTeams(updated) {
    teams = updated;
  }

  function runSim() {
    results = runMonteCarlo(teams, numSimulations);
  }

  function startWheel() {
    draftOrder = [];
    showWheel = true;
  }

  function handlePick(winner) {
    draftOrder.push(winner.name);
  }
</script>

<style>
  main {
    max-width: 800px;
    margin: auto;
    padding: 2rem;
    font-family: sans-serif;
    color: #333;
  }

  h1 {
    text-align: center;
    color: #0066cc;
  }

  .controls {
    margin-top: 2rem;
    text-align: center;
  }

  .draft-results {
    margin-top: 2rem;
    text-align: center;
  }

  ol {
    padding-left: 1.5rem;
    font-size: 1.1rem;
  }

  input[type="number"] {
    width: 80px;
    margin-left: 0.5rem;
  }

  button {
    margin-left: 1rem;
    padding: 0.5rem 1rem;
    background-color: #0066cc;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  button:hover {
    background-color: #004999;
  }
</style>

<main>
  <h1>Fantasy Football Draft Lottery</h1>

  <InputForm {teams} onUpdate={updateTeams} />

  <div class="controls">
    <label>Simulations:</label>
    <input type="number" bind:value={numSimulations} />
    <button on:click={runSim}>Run Simulation</button>
    <button on:click={startWheel}>Start Draft Lottery</button>
  </div>

  <MonteCarloResults {results} />

  {#if showWheel}
    <SpinningWheel {teams} onSelect={handlePick} />
  {/if}

  {#if draftOrder.length > 0}
    <div class="draft-results">
      <h2>Draft Order</h2>
      <ol>
        {#each draftOrder as name, i}
          <li>{i + 1}. {name}</li>
        {/each}
      </ol>
    </div>
  {/if}
</main>
