import Image from "next/image"

const EmptyFavorites = () => {
  return (
    <div className={"flex h-full flex-col items-center justify-center"}>
      <Image src={"/empty-favorites.svg"} alt={"Empty favorites"} width={140} height={140} />
      <h2 className={"mt-6 text-2xl font-semibold"}>No favorite boards!</h2>
      <p className={"mt-2 text-sm text-muted-foreground"}>Try favouring a board!</p>
    </div>
  )
}

export { EmptyFavorites }
