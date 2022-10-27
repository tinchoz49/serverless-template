export const handler = async () => {
  return {
    statusCode: 200,
    headers: {
      'content-type': 'text/json'
    },
    body: JSON.stringify({ hello: 'world' })
  }
}
