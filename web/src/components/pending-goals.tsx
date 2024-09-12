import { Plus } from 'lucide-react'
import { OutlineButton } from './ui/outline-button'
import { useQuery } from '@tanstack/react-query'
import {
  type PendingGoalsResponse,
  getPendingGoals,
} from '../http/get-pending-goals'

export function PendingGoals() {
  const { data: pendingGoals } = useQuery<PendingGoalsResponse>({
    queryKey: ['pending-goals'],
    queryFn: getPendingGoals,
    staleTime: 1000 * 60, // 60 seconds
  })

  if (!pendingGoals) {
    return null
  }

  return (
    <div className="flex flex-wrap gap-3">
      {pendingGoals.map(pendingGoal => (
        <OutlineButton key={pendingGoal.id}>
          <Plus className="size-4 text-zinc-400" />
          {pendingGoal.title}
        </OutlineButton>
      ))}
    </div>
  )
}
