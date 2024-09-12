export async function deleteCompletion(completionId: string) {
  await fetch('http://localhost:6969/completions', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      completionId,
    }),
  })
}
