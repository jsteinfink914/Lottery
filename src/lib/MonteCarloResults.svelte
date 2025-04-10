<script>
  export let results;
</script>

<style>
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 2rem;
    font-size: 0.9rem;
  }

  th, td {
    padding: 0.75rem;
    text-align: center;
    border: 1px solid #ddd;
  }

  th {
    background-color: #f2f2f2;
    color: #0066cc;
  }

  td {
    background-color: #fff;
  }

  tr:hover {
    background-color: #f9f9f9;
  }
</style>

{#if results}
  <table>
    <thead>
      <tr>
        <th>Team</th>
        <th>1st</th>
        <th>2nd</th>
        <th>3rd</th>
        <th>4th</th>
        <th>5th</th>
        <th>6th</th>
      </tr>
    </thead>
    <tbody>
      {#each Object.entries(results) as [team, odds]}
        <tr>
          <td>{team}</td>
          {#each odds as o}
            <td>{o}%</td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
{/if}
