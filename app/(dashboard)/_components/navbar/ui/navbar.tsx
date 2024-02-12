"use client"

import { OrganizationSwitcher, useOrganization, UserButton } from "@clerk/nextjs"

import { NavbarInviteButton } from "./_components/navbar-invite-button"
import { NavbarSearchInput } from "./_components/navbar-search-input"

const Navbar = () => {
  const { organization } = useOrganization()
  return (
    <header className={"flex items-center gap-x-4 p-5"}>
      <div className={"hidden lg:flex lg:flex-1"}>
        <NavbarSearchInput />
      </div>
      <div className={"block flex-1 lg:hidden"}>
        <OrganizationSwitcher
          hidePersonal
          appearance={{
            elements: {
              rootBox: {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                maxWidth: "376px",
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
      </div>
      {organization && <NavbarInviteButton />}
      <UserButton />
    </header>
  )
}

export { Navbar }
