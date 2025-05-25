import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-hot-toast";

interface Props {
  onBook: () => void;
  fullWidth?: boolean;
}

export function BookNowButton({ onBook, fullWidth = false }: Props) {
  const { isLoggedIn } = useAuth();

  function handleClick() {
    if (!isLoggedIn) {
      toast.error("You must be logged in to book.");
      return;
    }
    onBook();
  }

  return (
    <button
      onClick={handleClick}
      className={`${
        fullWidth ? "w-full" : ""
      } text-sm sm:text-base md:text-lg px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white transition`}
    >
      Book now
    </button>
  );
}
