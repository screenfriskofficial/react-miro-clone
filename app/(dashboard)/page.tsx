"use client"

import { useOrganization } from "@clerk/nextjs"

import { BoardList } from "./_components/board-list"
import { EmptyOrg } from "./_components/empty-org"

interface DashboardPageProps {
  searchParams: {
    q?: string
    favorites?: string
  }
}

const DashboardPage = ({ searchParams }: DashboardPageProps) => {
  const { organization } = useOrganization()
  return (
    <div className={"h-[calc(100%-80px)] flex-1 p-6"}>
      {!organization ? (
        <EmptyOrg />
      ) : (
        <BoardList orgId={organization.id} query={searchParams} />
      )}
    </div>
  )
}

export default DashboardPage
