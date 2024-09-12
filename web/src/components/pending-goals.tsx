import { Plus } from 'lucide-react'
import { OutlineButton } from './ui/outline-button'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import {
  type PendingGoalsResponse,
  getPendingGoals,
} from '../http/get-pending-goals'
import { createGoalCompletion } from '../http/create-goal-completion'

export function PendingGoals() {
  const queryClient = useQueryClient()

  const { data: pendingGoals } = useQuery<PendingGoalsResponse>({
    queryKey: ['pending-goals'],
    queryFn: getPendingGoals,
    staleTime: 1000 * 60, // 60 seconds
  })

  if (!pendingGoals) {
    return null
  }

  async function handleCompleteGoal(goalId: string) {
    await createGoalCompletion(goalId)
    queryClient.invalidateQueries({ queryKey: ['summary'] })
    queryClient.invalidateQueries({ queryKey: ['pending-goals'] })
  }

  return (
    <div className="flex flex-wrap gap-3">
      {pendingGoals.map(pendingGoal => (
        <OutlineButton
          key={pendingGoal.id}
          onClick={() => handleCompleteGoal(pendingGoal.id)}
          disabled={
            pendingGoal.completionCount === pendingGoal.desiredWeeklyFrequency
          }
        >
          <Plus className="size-4 text-zinc-400" />
          {pendingGoal.title}
        </OutlineButton>
      ))}
    </div>
  )
}
