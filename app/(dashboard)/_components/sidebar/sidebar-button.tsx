"use client";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import { Plus } from "lucide-react";
import { CreateOrganization } from "@clerk/nextjs";
import { Hint } from "../hint";

const SidebarButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className={"aspect-square"}>
          <Hint
            label={"Create Organization"}
            side={"right"}
            sideOffset={10}
            align={"center"}
          >
            <button
              className={
                "bg-white/25 h-full w-full flex items-center justify-center rounded-md shadow-md opacity-60 hover:opacity-100 transition-opacity duration-300"
              }
            >
              <Plus className={"text-white"} />
            </button>
          </Hint>
        </div>
      </DialogTrigger>
      <DialogContent className={"p-0 bg-transparent border-none max-w-[480px]"}>
        <CreateOrganization />
      </DialogContent>
    </Dialog>
  );
};

export { SidebarButton };
