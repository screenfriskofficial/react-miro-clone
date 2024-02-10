"use client"

import { ChangeEvent, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "~/components/ui/input"
import { Search } from "lucide-react"
import qs from "query-string"
import { useDebounceCallback } from "usehooks-ts"

const NavbarSearchInput = () => {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const debouncedQuery = useDebounceCallback(setQuery, 500)

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: "/",
        query: {
          q: query,
        },
      },
      {
        skipEmptyString: true,
        skipNull: true,
      }
    )
    router.push(url)
  }, [query, router])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    debouncedQuery(e.target.value)
  }
  return (
    <div className={"relative w-full"}>
      <Search
        className={
          "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground"
        }
      />
      <Input
        className={"w-full max-w-[516px] pl-9"}
        placeholder={"Search boards"}
        defaultValue={query}
        onChange={handleChange}
      />
    </div>
  )
}

export { NavbarSearchInput }
