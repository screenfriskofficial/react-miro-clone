import Image from "next/image"
import { CreateOrganization } from "@clerk/nextjs"
import { Button } from "~/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog"

const EmptyOrg = () => {
  return (
    <div className={"flex h-full flex-col items-center justify-center"}>
      <Image src={"/elements.svg"} alt={"elements"} height={200} width={200} />
      <h2 className={"mt-6 text-2xl font-semibold"}>Welcome to Board</h2>
      <p className={"mt-2 text-sm text-muted-foreground"}>Create organization to get started!</p>
      <div className={"mt-6"}>
        <Dialog>
          <DialogTrigger asChild>
            <Button size={"lg"}>Create organization</Button>
          </DialogTrigger>
          <DialogContent className={"max-w-[480px] border-none bg-transparent p-0"}>
            <CreateOrganization />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export { EmptyOrg }
