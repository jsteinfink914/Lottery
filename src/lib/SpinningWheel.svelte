<script>
  import { onMount } from 'svelte';

  export let teams = [];
  export let onSelect;

  let wheelCanvas;
  let selectedTeam = null;
  let spinning = false;
  let remainingTeams = [];

  onMount(() => {
    remainingTeams = [...teams];
    drawWheel();
  });

  function drawWheel() {
    if (!wheelCanvas) return;
    const ctx = wheelCanvas.getContext('2d');
    const size = wheelCanvas.width;
    const center = size / 2;
    const radius = size / 2;
    const anglePerSlice = (2 * Math.PI) / remainingTeams.length;

    ctx.clearRect(0, 0, size, size);

    remainingTeams.forEach((team, i) => {
      const start = i * anglePerSlice;
      const end = start + anglePerSlice;

      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.arc(center, center, radius, start, end);
      ctx.fillStyle = `hsl(${i * 60}, 70%, 60%)`;
      ctx.fill();

      ctx.save();
      ctx.translate(center, center);
      ctx.rotate(start + anglePerSlice / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#000';
      ctx.font = 'bold 14px sans-serif';
      ctx.fillText(team.name, radius - 10, 5);
      ctx.restore();
    });
  }

  function spinWheel() {
    if (spinning || remainingTeams.length === 0) return;

    spinning = true;
    const totalOdds = remainingTeams.reduce((sum, t) => sum + t.odds, 0);
    let rand = Math.random() * totalOdds;

    let winnerIndex = 0;
    for (let i = 0; i < remainingTeams.length; i++) {
      if (rand < remainingTeams[i].odds) {
        winnerIndex = i;
        break;
      }
      rand -= remainingTeams[i].odds;
    }

    const winner = remainingTeams[winnerIndex];
    selectedTeam = winner;

    setTimeout(() => {
      onSelect(winner);
      remainingTeams.splice(winnerIndex, 1);
      drawWheel();
      spinning = false;
    }, 2000);
  }
</script>

<style>
  .wheel-container {
    text-align: center;
    margin-top: 2rem;
  }

  canvas {
    border: 4px solid #0066cc;
    border-radius: 50%;
  }

  button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    background: #0066cc;
    color: white;
    border: none;
    border-radius: 5px;
  }

  button:hover {
    background: #004999;
  }
</style>

<div class="wheel-container">
  <canvas bind:this={wheelCanvas} width="400" height="400"></canvas>
  <div>
    <button on:click={spinWheel} disabled={spinning}>Spin Wheel</button>
  </div>
  {#if selectedTeam}
    <p>Selected: <strong>{selectedTeam.name}</strong></p>
  {/if}
</div>
