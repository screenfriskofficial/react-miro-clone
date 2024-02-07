"use client";

import Image from "next/image";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { cn } from "~/lib/utils";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { Button } from "~/components/ui/button";
import { LayoutDashboard, Star } from "lucide-react";
import { useSearchParams } from "next/navigation";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const OrgSidebar = () => {
  const searchParams = useSearchParams();
  const favorites = searchParams.get("favorites");
  return (
    <div
      className={"hidden lg:flex flex-col space-y-6 width-[206px] pl-5 pt-5 "}
    >
      <Link href={"/"}>
        <div className={"flex items-center gap-x-2"}>
          <Image src={"/logo.svg"} alt={"logo"} width={60} height={60} />
          <span className={cn("font-semibold text-2xl", font.className)}>
            Demo
          </span>
        </div>
      </Link>
      <OrganizationSwitcher
        hidePersonal
        appearance={{
          elements: {
            rootBox: {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            },
            organizationSwitcherTrigger: {
              padding: "6px",
              width: "100%",
              borderRadius: "8px",
              border: "solid 1px #E5E7EB",
              justifyContent: "space-between",
              backgroundColor: "#fff",
            },
          },
        }}
      />
      <div className={"space-y-1 w-full"}>
        <Button
          asChild
          variant={favorites ? "ghost" : "secondary"}
          size={"lg"}
          className={"font-normal justify-start px-2 w-full"}
        >
          <Link href={"/"}>
            <LayoutDashboard className={"h-4 w-4 mr-2"} />
            Team Boards
          </Link>
        </Button>
        <Button
          asChild
          variant={favorites ? "secondary" : "ghost"}
          size={"lg"}
          className={"font-normal justify-start px-2 w-full"}
        >
          <Link
            href={{
              pathname: "/",
              query: { favorites: true },
            }}
          >
            <Star className={"h-4 w-4 mr-2"} />
            Favorite Boards
          </Link>
        </Button>
      </div>
    </div>
  );
};

export { OrgSidebar };
