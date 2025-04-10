export function runMonteCarlo(teams, numSimulations = 10000) {
  const results = {};
  teams.forEach(team => {
    results[team.name] = Array(teams.length).fill(0);
  });

  for (let i = 0; i < numSimulations; i++) {
    const draftOrder = runSingleLottery(teams);
    draftOrder.forEach((team, pick) => {
      results[team.name][pick] += 1;
    });
  }

  Object.keys(results).forEach(name => {
    results[name] = results[name].map(count => (count / numSimulations * 100).toFixed(2));
  });

  return results;
}

function runSingleLottery(teams) {
  const pool = teams.map(t => ({ ...t }));
  const order = [];

  while (pool.length > 0) {
    const totalOdds = pool.reduce((sum, t) => sum + t.odds, 0);
    let rand = Math.random() * totalOdds;

    for (let i = 0; i < pool.length; i++) {
      if (rand < pool[i].odds) {
        order.push(pool[i]);
        pool.splice(i, 1);
        break;
      }
      rand -= pool[i].odds;
    }
  }

  return order;
}
