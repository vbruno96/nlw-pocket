export type PendingGoalsResponse = {
  id: string
  title: string
  desiredWeeklyFrequency: number
  completionCount: number
}[]

export async function getPendingGoals() {
  const response = await fetch('http://localhost:6969/pending-goals')
  const data = await response.json()

  return data.pendingGoals
}
