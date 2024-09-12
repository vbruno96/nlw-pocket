type CreateGoalRequest = {
  title: string
  desiredWeeklyFrequency: number
}

export async function createGoal({
  desiredWeeklyFrequency,
  title,
}: CreateGoalRequest) {
  await fetch('http://localhost:6969/goals', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      desiredWeeklyFrequency,
      title,
    }),
  })
}
