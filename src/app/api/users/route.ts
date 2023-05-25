export async function GET(request: Request) {
  return new Response(String({
    username: "usuário"
  }))
}
