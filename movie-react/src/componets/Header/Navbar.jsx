import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <header className="fixed top-0 z-10 w-full backdrop-blur-sm">
      <nav className="transition duration-500 ease-in-out bg-black">
        <div className="px-4 mx-auto max-w-8xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  className="h-6 cursor-pointer w-18"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png"
                  alt="NETFLIX"
                />
              </div>
              <div className="hidden md:block">
                <div className="flex items-center ml-10 space-x-4">
                  <Link
                    to="/"
                    className="py-2 font-medium text-white transition ease-in-out delay-150 rounded-md cursor-pointer hover:text-red-800 lg:px-3 text-m"
                  >
                    Home
                  </Link>
                  <Link
                    to="/series"
                    className="py-2 font-medium text-white transition ease-in-out delay-150 rounded-md cursor-pointer hover:text-red-800 lg:px-3 text-m"
                  >
                    Series
                  </Link>
                  <Link
                    to="/history"
                    className="py-2 font-medium text-white transition ease-in-out delay-150 rounded-md cursor-pointer hover:text-red-800 lg:px-3 text-m"
                  >
                    History
                  </Link>
                  <Link
                    to="/liked"
                    className="py-2 font-medium text-white transition ease-in-out delay-150 rounded-md cursor-pointer hover:text-red-800 lg:px-3 text-m"
                  >
                    Liked
                  </Link>
                  <Link
                    to="/mylist"
                    className="py-2 font-medium text-white transition ease-in-out delay-150 rounded-md cursor-pointer hover:text-red-800 lg:px-3 text-m"
                  >
                    My List
                  </Link>
                </div>
              </div>
            </div>
            <div className="ml-auto">
              <div className="flex">
                <Link to="/search">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="items-center w-10 h-10 pr-4 mt-auto mb-auto text-white hover:text-red-800 cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </Link>
                <Link to="/profile">
                  <img
                    className="h-10 w-10 rounded-full cursor-pointer"
                    src="https://www.citypng.com/public/uploads/preview/profile-user-round-red-icon-symbol-download-png-11639594337tco5j3n0ix.png"
                    alt="NETFLIX"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
