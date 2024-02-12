"use client"

import Image from "next/image"

const EmptySearch = () => {
  return (
    <div className={"flex h-full flex-col items-center justify-center"}>
      <Image src={"/empty-search.svg"} alt={"Empty search"} width={140} height={140} />
      <h2 className={"mt-6 text-2xl font-semibold"}>No results found!</h2>
      <p className={"mt-2 text-sm text-muted-foreground"}>Try searching for something else</p>
    </div>
  )
}

export { EmptySearch }
