export async function GET() {
  return Response.json({
    ok: true,
    app: 'outly',
    time: new Date().toISOString(),
  });
}
