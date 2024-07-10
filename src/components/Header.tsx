import Link from "next/link";
import { Input } from "@/components/ui/input";

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function UserProfileIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export function Header() {
  return (
    <header className="bg-white text-black shadow-md py-4 px-6 flex flex-col items-center w-full">
      <div className="w-full flex items-center justify-between">
        <Link href="/" className="font-bold text-2xl" prefetch={false}>
          Travel
        </Link>
        <nav className="hidden md:flex gap-4 flex-1 justify-center">
          <Link href="/flights-search" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Flights
          </Link>
          <Link href="/destination-experiences" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Experiences
          </Link>
          <Link href="/cars-and-transfers" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Cars and Transfers
          </Link>
          <Link href="/market-insights" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Market Insights
          </Link>
          <Link href="/hotels" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Hotels
          </Link>
          <Link href="/itinerary-management" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Itinerary
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 p-2 bg-gray-100 rounded-full hover:bg-gray-200">
            <UserProfileIcon className="w-6 h-6 text-gray-500" />
            <span className="hidden md:block text-sm font-medium">Profile</span>
          </button>
        </div>
      </div>
      <div className="relative w-full max-w-2xl mt-4">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <SearchIcon className="w-5 h-5 text-gray-500" />
        </div>
        <Input
          type="search"
          placeholder="Search for flights, hotels, and more..."
          className="bg-gray-100 text-black placeholder:text-gray-500 rounded-full py-3 pl-12 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
      </div>
    </header>
  );
}
