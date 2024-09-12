export type SummaryResponse = {
  completed: number
  total: number
  goalsPerDay: Record<
    string,
    { id: string; title: string; completedAt: string }[]
  >
}

export async function getSummary() {
  const response = await fetch('http://localhost:6969/summary')
  const data = await response.json()

  return data.summary
}
