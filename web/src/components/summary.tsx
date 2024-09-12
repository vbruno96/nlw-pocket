import { CheckCircle2Icon, Plus } from 'lucide-react'
import { Button } from './ui/button'
import { DialogTrigger } from './ui/dialog'
import { InOrbitIcon } from './in-orbit-icon'
import { Progress, ProgressIndicator } from './ui/progress-bar'
import { Separator } from './ui/separator'
import { getSummary, type SummaryResponse } from '../http/get-summary'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import { PendingGoals } from './pending-goals'
import { deleteCompletion } from '../http/delete-completion'

dayjs.locale('pt-br')

export function Summary() {
  const queryClient = useQueryClient()
  const { data: summary } = useQuery<SummaryResponse>({
    queryKey: ['summary'],
    queryFn: getSummary,
    staleTime: 1000 * 60, // 60 seconds
  })

  if (!summary) {
    return null
  }

  const completedGoalsPercent = Math.round(
    (summary.completed * 100) / summary.total
  )

  const firstDayOfWeek = dayjs().startOf('week').format('D MMM')
  const lastDayOfWeek = dayjs().endOf('week').format('D MMM')

  async function handleDeleteCompletion(completionId: string) {
    await deleteCompletion(completionId)
    queryClient.invalidateQueries({ queryKey: ['summary'] })
    queryClient.invalidateQueries({ queryKey: ['pending-goals'] })
  }

  return (
    <div className="py-10 max-w-[30rem] px-5 mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <InOrbitIcon />
          <span className="text-lg font-semibold capitalize">{`${firstDayOfWeek} - ${lastDayOfWeek}`}</span>
        </div>
        <DialogTrigger asChild>
          <Button size="sm">
            <Plus className="size-4" />
            Cadastrar meta
          </Button>
        </DialogTrigger>
      </div>

      <div className="flex flex-col gap-3">
        <Progress value={summary.completed} max={summary.total}>
          <ProgressIndicator style={{ width: `${completedGoalsPercent}%` }} />
        </Progress>

        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>
            Você completou{' '}
            <span className="text-zinc-100">{summary.completed}</span> de{' '}
            <span className="text-zinc-100">{summary.total}</span> metas nessa
            semana
          </span>
          <span>{`${completedGoalsPercent}%`}</span>
        </div>
      </div>

      <Separator />

      <PendingGoals />

      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-medium">Sua semana</h2>

        {Object.entries(summary.goalsPerDay).map(([date, goals]) => (
          <div key={date} className="flex flex-col gap-4">
            <h3 className="font-medium">
              <span className="capitalize">{dayjs(date).format('dddd')}</span>{' '}
              <span className="text-zinc-400 text-xs">{`(${dayjs(date).format('D[ de ]MMMM')})`}</span>
            </h3>

            <ul className="flex flex-col gap-3">
              {goals.map(goal => (
                <li key={goal.id} className="flex items-center gap-2">
                  <CheckCircle2Icon className="size-4 text-pink-500" />
                  <span className="text-sm text-zinc-400">
                    Você completou{' '}
                    <span className="text-zinc-100">{`"${goal.title}"`}</span>{' '}
                    às{' '}
                    <span className="text-zinc-100">
                      {dayjs(goal.completedAt).format('HH:mm[h]')}
                    </span>
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDeleteCompletion(goal.id)}
                    className="underline text-zinc-500 text-xs"
                  >
                    Desfazer
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
