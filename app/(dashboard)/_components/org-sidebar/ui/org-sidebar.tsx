"use client"

import { Poppins } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { OrganizationSwitcher } from "@clerk/nextjs"
import { Button } from "~/components/ui/button"
import { cn } from "~/lib/utils"
import { LayoutDashboard, Star } from "lucide-react"

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
})

const OrgSidebar = () => {
  const searchParams = useSearchParams()
  const favorites = searchParams.get("favorites")
  return (
    <div
      className={"width-[206px] hidden flex-col space-y-6 pl-5 pt-5 lg:flex "}
    >
      <Link href={"/"}>
        <div className={"flex items-center gap-x-2"}>
          <Image src={"/logo.svg"} alt={"logo"} width={60} height={60} />
          <span className={cn("text-2xl font-semibold", font.className)}>
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
      <div className={"w-full space-y-1"}>
        <Button
          asChild
          variant={favorites ? "ghost" : "secondary"}
          size={"lg"}
          className={"w-full justify-start px-2 font-normal"}
        >
          <Link href={"/"}>
            <LayoutDashboard className={"mr-2 h-4 w-4"} />
            Team Boards
          </Link>
        </Button>
        <Button
          asChild
          variant={favorites ? "secondary" : "ghost"}
          size={"lg"}
          className={"w-full justify-start px-2 font-normal"}
        >
          <Link
            href={{
              pathname: "/",
              query: { favorites: true },
            }}
          >
            <Star className={"mr-2 h-4 w-4"} />
            Favorite Boards
          </Link>
        </Button>
      </div>
    </div>
  )
}

export { OrgSidebar }
