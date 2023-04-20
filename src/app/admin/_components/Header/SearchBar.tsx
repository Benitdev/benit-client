"use client"

type Props = {}

const SearchBar = (props: Props) => {
  return (
    <form className="w-[35%] min-w-[300px]">
      <label
        htmlFor="default-search"
        className="text-sm sr-only mb-2 font-medium text-gray-900 dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            aria-hidden="true"
            className="h-5 w-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="text-sm block w-full rounded-lg bg-slate-700 p-3 pl-10 pr-[95px] outline-none focus:ring-1 focus:ring-pink-600"
          placeholder="Search Mockups, Logos..."
          required
        />
        <button
          type="submit"
          className="text-sm absolute right-1.5 top-1/2 -translate-y-1/2 rounded-lg bg-pink-700/50 px-4 py-2 font-medium text-white hover:bg-pink-700 focus:outline-none"
        >
          Search
        </button>
      </div>
    </form>
  )
}

export default SearchBar
