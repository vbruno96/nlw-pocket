import { eq } from 'drizzle-orm'
import { db } from '../db'
import { goalCompletions } from '../db/schema'

interface DeleteGoalCompletionRequest {
  completionId: string
}

export async function deleteCompletionGoal({
  completionId,
}: DeleteGoalCompletionRequest) {
  await db.delete(goalCompletions).where(eq(goalCompletions.id, completionId))
}
