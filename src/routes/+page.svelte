<svelte:head>
  <script src="https://cdn.jsdelivr.net/npm/winwheel@2.7.0/Winwheel.min.js"></script>
</svelte:head>


<script lang="ts">
  import { Team, pickOrder, monteCarlo } from '$lib/lottery';
  import { onMount } from 'svelte';
  let teams: Team[] = Array(6).fill(null).map(() => ({ name: '', odds: 1 }));
  let picks: string[] = [];
  let spinning = false;
  let rounds = 1000;
  let mcResults: Record<string, number[]> = {};
  let wheel;

  function initWheel() {
    wheel = new Winwheel({
      'canvasId': 'wheelCanvas',
      'numSegments': teams.length,
      'segments': teams.map(t => ({ 'text': t.name || 'Team', 'fillStyle': '#' + Math.floor(Math.random()*16777215).toString(16) })),
      'animation': {
        'type': 'spinToStop',
        'duration': 5,
        'spins': 8,
        'callbackFinished': onFinish
      }
    });
  }

  onMount(() => {
    initWheel();
  });

  function spin() {
    if (spinning) return;
    spinning = true;
    wheel.startAnimation();
  }

  function onFinish() {
    const segment = wheel.getIndicatedSegment();
    picks.push(segment.text);
    const remaining = teams.filter(t => !picks.includes(t.name));
    teams = remaining;
    initWheel();
    spinning = false;
  }

  function runMC() {
    mcResults = monteCarlo(teams, rounds);
  }
</script>

<h1>Fantasy Draft Lottery</h1>
<div>
  <h2>Teams & Odds</h2>
  {#each teams as team, i}
    <div>
      <input placeholder="Team Name" bind:value={teams[i].name} />
      <input type="number" placeholder="Odds" bind:value={teams[i].odds} min="1" />
    </div>
  {/each}
</div>
<div>
  <h2>Draft Wheel</h2>
  <canvas id="wheelCanvas" width="500" height="500"></canvas>
  <button on:click={spin} disabled={spinning}>Spin</button>
  <h3>Picks:</h3>
  <ol>
    {#each picks as pick}<li>{pick}</li>{/each}
  </ol>
</div>
<div>
  <h2>Monte Carlo Simulation</h2>
  <input type="number" bind:value={rounds} min="1" />
  <button on:click={runMC}>Run Simulation</button>
  {#if Object.keys(mcResults).length}
    <table>
      <thead>
        <tr>
          <th>Team</th>
          {#each Array(teams.length) as _, idx}
            <th>Pick {idx+1}</th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each Object.keys(mcResults) as team}
          <tr>
            <td>{team}</td>
            {#each mcResults[team] as count}
              <td>{count}</td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</div>

<style>
  div { margin-bottom: 1rem; }
  input { margin-right: 0.5rem; }
</style>