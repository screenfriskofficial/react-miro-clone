import Image from "next/image";

const EmptyFavorites = () => {
  return (
    <div className={"h-full flex flex-col justify-center items-center"}>
      <Image
        src={"/empty-favorites.svg"}
        alt={"Empty favorites"}
        width={140}
        height={140}
      />
      <h2 className={"text-2xl font-semibold mt-6"}>No favorite boards!</h2>
      <p className={"text-muted-foreground text-sm mt-2"}>
        Try favouring a board!
      </p>
    </div>
  );
};

export { EmptyFavorites };
