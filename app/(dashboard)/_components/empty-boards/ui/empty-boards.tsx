"use client";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import { api } from "~/convex/_generated/api";
import { useOrganization } from "@clerk/nextjs";
import { useApiMutation } from "~/hooks/use-api-mutation";
import { toast } from "sonner";

const EmptyBoards = () => {
  const { mutate, pending } = useApiMutation(api.board.create);
  const { organization } = useOrganization();

  const handleClick = () => {
    if (!organization) return;
    mutate({
      orgId: organization.id,
      title: "Untitled",
    })
      .then((_) => {
        toast.success("Board created");
      })
      .catch((_) => {
        toast.error("Failed to create board");
      });
  };
  return (
    <div className={"h-full flex flex-col justify-center items-center"}>
      <Image src={"/note.svg"} alt={"Empty boards"} width={110} height={110} />
      <h2 className={"text-2xl font-semibold mt-6"}>Create your first board</h2>
      <p className={"text-muted-foreground text-sm mt-2"}>
        Start by creating a board for your organization
      </p>
      <div className={"mt-6"}>
        <Button disabled={pending} size={"lg"} onClick={handleClick}>
          Create board
        </Button>
      </div>
    </div>
  );
};

export { EmptyBoards };
