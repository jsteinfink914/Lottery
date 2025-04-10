<script>
  export let teams = [];
  export let onUpdate;

  function updateTeam(index, field, value) {
    teams[index][field] = field === 'odds' ? parseFloat(value) : value;
    onUpdate([...teams]);
  }
</script>

<style>
  .team-row {
    display: flex;
    gap: 1rem;
    margin-bottom: 0.5rem;
  }

  input {
    padding: 0.5rem;
    font-size: 1rem;
    flex: 1;
  }

  input[type="number"] {
    width: 80px;
  }
</style>

<div>
  {#each teams as team, i}
    <div class="team-row">
      <input type="text" placeholder="Team Name" bind:value={team.name} on:input={(e) => updateTeam(i, 'name', e.target.value)} />
      <input type="number" placeholder="Odds" bind:value={team.odds} on:input={(e) => updateTeam(i, 'odds', e.target.value)} />
    </div>
  {/each}
</div>
