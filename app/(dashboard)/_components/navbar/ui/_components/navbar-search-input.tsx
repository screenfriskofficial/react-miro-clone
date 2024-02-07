"use client";

import qs from "query-string";
import { useDebounceCallback } from "usehooks-ts";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "~/components/ui/input";

const NavbarSearchInput = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounceCallback(setQuery, 500);

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
      },
    );
    router.push(url);
  }, [query, router]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    debouncedQuery(e.target.value);
  };
  return (
    <div className={"w-full relative"}>
      <Search
        className={
          "absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground h-4 w-4"
        }
      />
      <Input
        className={"w-full max-w-[516px] pl-9"}
        placeholder={"Search boards"}
        defaultValue={query}
        onChange={handleChange}
      />
    </div>
  );
};

export { NavbarSearchInput };
