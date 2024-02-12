import { auth, currentUser } from "@clerk/nextjs"
import { Liveblocks } from "@liveblocks/node"
import { api } from "~/convex/_generated/api"
import { ConvexHttpClient } from "convex/browser"

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

const liveblocks = new Liveblocks({
  secret: "sk_dev_cgIpRrgznw4NMYo5Gj4Rd3SZ9OIl35Rtq0e2S_reNAzo_846_ChnTJ58C7G6W3_Z",
})

export async function POST(request: Request) {
  const authorization = auth()
  const user = await currentUser()

  if (!authorization && !user) {
    return new Response("Unauthorized", { status: 403 })
  }

  const { room } = await request.json()
  const board = await convex.query(api.board.get, { id: room })

  if (board?.orgId !== authorization.orgId) {
    return new Response("Unauthorized", { status: 403 })
  }

  const userInfo = {
    name: user?.firstName || "Teammate",
    picture: user?.imageUrl,
  }
  const session = liveblocks.prepareSession(user!.id, { userInfo })

  if (room) {
    session.allow(room, session.FULL_ACCESS)
  }

  const { status, body } = await session.authorize()

  return new Response(body, { status })
}
