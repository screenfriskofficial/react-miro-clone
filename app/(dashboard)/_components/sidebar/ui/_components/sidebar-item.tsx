"use client";
import Image from "next/image";
import { useOrganizationList, useOrganization } from "@clerk/nextjs";
import { cn } from "~/lib/utils";
import { Hint } from "~/app/(dashboard)/_components/hint/ui/hint";

interface SidebarItemProps {
  id: string;
  name: string;
  imageUrl: string;
}

const SidebarItem = ({ id, name, imageUrl }: SidebarItemProps) => {
  const { organization } = useOrganization();
  const { setActive } = useOrganizationList();

  const isActive = organization?.id === id;

  const handleClick = () => {
    if (!setActive) return null;
    setActive?.({ organization: id });
  };
  return (
    <div className={"aspect-square relative "}>
      <Hint label={name} side={"right"} sideOffset={10} align={"center"}>
        <Image
          fill
          src={imageUrl}
          alt={name}
          onClick={handleClick}
          className={cn(
            "rounded-md cursor-pointer opacity-75 hover:opacity-100 transition-opacity duration-300",
            isActive && "opacity-100",
          )}
        />
      </Hint>
    </div>
  );
};

export { SidebarItem };
