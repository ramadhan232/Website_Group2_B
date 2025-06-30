export async function requireRole(request, expectedRoles) {
  const session = await getServerSession(); // hanya bisa dipakai di route.js atau middleware
  if (!session || !expectedRoles.includes(session.user.role)) {
    return new Response('⛔ Unauthorized', { status: 403 });
  }
  return session;
}
