import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { deleteCompletionGoal } from '../../functions/delete-completion-goal'

export const deleteCompletionRoute: FastifyPluginAsyncZod = async app => {
  app.delete(
    '/completions',
    {
      schema: {
        body: z.object({
          completionId: z.string(),
        }),
      },
    },
    async request => {
      const { completionId } = request.body

      await deleteCompletionGoal({ completionId })
    }
  )
}
