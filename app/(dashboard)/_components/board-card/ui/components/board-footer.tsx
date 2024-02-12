import { MouseEvent } from "react"
import { cn } from "~/lib/utils"
import { Star } from "lucide-react"

interface BoardFooterProps {
  authorLabel: string
  createdAtLabel: string
  disabled: boolean
  isFavorite: boolean
  title: string
  onClick: () => void
}

const BoardFooter = ({
  authorLabel,
  createdAtLabel,
  disabled,
  title,
  isFavorite,
  onClick,
}: BoardFooterProps) => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    e.preventDefault()
    onClick()
  }

  return (
    <footer className={"relative bg-white p-3"}>
      <p className={"max-w-[calc(100%-20px)] truncate text-[13px]"}>{title}</p>
      <p
        className={
          "truncate text-[11px] text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
        }
      >
        {authorLabel},&nbsp;{createdAtLabel}
      </p>
      <button
        disabled={disabled}
        onClick={handleClick}
        className={cn(
          "absolute right-3 top-3 text-muted-foreground opacity-0 transition hover:text-blue-600 group-hover:opacity-100",
          disabled && "cursor-not-allowed opacity-75"
        )}
      >
        <Star className={cn("h-4 w-4", isFavorite && "fill-blue-600 text-blue-600")} />
      </button>
    </footer>
  )
}

export { BoardFooter }
