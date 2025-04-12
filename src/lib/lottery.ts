export interface Team {
  name: string;
  odds: number;
}

export function pickOrder(teams: Team[]): string[] {
  const order: string[] = [];
  let pool = [...teams];
  for (let pick = 1; pool.length > 0; pick++) {
    const totalOdds = pool.reduce((sum, t) => sum + t.odds, 0);
    let r = Math.random() * totalOdds;
    let cumulative = 0;
    for (let i = 0; i < pool.length; i++) {
      cumulative += pool[i].odds;
      if (r <= cumulative) {
        order.push(pool[i].name);
        pool.splice(i, 1);
        break;
      }
    }
  }
  return order;
}

export function monteCarlo(teams: Team[], rounds: number): Record<string, number[]> {
  const results: Record<string, number[]> = {};
  teams.forEach(t => {
    results[t.name] = Array(teams.length).fill(0);
  });
  for (let i = 0; i < rounds; i++) {
    const order = pickOrder(teams);
    order.forEach((name, idx) => {
      results[name][idx]++;
    });
  }
  return results;
}