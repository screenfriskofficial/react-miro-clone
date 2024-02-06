import { UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <header className={"flex items-center gap-x-4 p-5 bg-green-400"}>
      <div className={"hidden lg:flex lg:flex-1 bg-amber-300"}>Search</div>
      <UserButton />
    </header>
  );
};

export { Navbar };
