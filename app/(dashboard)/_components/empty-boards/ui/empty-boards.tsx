"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useOrganization } from "@clerk/nextjs"
import { Button } from "~/components/ui/button"
import { api } from "~/convex/_generated/api"
import { useApiMutation } from "~/hooks/use-api-mutation"
import { toast } from "sonner"

const EmptyBoards = () => {
  const router = useRouter()
  const { mutate, pending } = useApiMutation(api.board.create)
  const { organization } = useOrganization()

  const handleClick = () => {
    if (!organization) return
    mutate({
      orgId: organization.id,
      title: "Untitled",
    })
      .then((id) => {
        toast.success("Board created")
        router.push(`/board/${id}`)
      })
      .catch(() => {
        toast.error("Failed to create board")
      })
  }
  return (
    <div className={"flex h-full flex-col items-center justify-center"}>
      <Image src={"/note.svg"} alt={"Empty boards"} width={110} height={110} />
      <h2 className={"mt-6 text-2xl font-semibold"}>Create your first board</h2>
      <p className={"mt-2 text-sm text-muted-foreground"}>
        Start by creating a board for your organization
      </p>
      <div className={"mt-6"}>
        <Button disabled={pending} size={"lg"} onClick={handleClick}>
          Create board
        </Button>
      </div>
    </div>
  )
}

export { EmptyBoards }
