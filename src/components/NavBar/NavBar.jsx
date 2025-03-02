import React, { useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { initFlowbite } from "flowbite";
import logo from "../../assets/logo.jpg";
import { tokenContext } from "../../contexts/tokenContext";
import { CartContext } from "../../contexts/cartContext";
import { useWishlist } from "../../contexts/WishlistContext ";

export default function NavBar() {
  let { token, setToken } = useContext(tokenContext);
  let navigate = useNavigate();
  const { cartCount } = useContext(CartContext);
  const{wishListCount}=useWishlist();

  const signOut = () => {
    localStorage.removeItem("authToken");
    setToken(null);
    navigate("/login");
  };

  useEffect(() => {
    initFlowbite();
  }, [wishListCount]);

  const navLinkClass = ({ isActive }) =>
    `block py-2 px-3 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-red-700 md:p-0 dark:text-white md:dark:hover:text-red-500 dark:hover:bg-gray-700 md:dark:hover:bg-transparent ${
      isActive
        ? "text-red-700 dark:text-red-500"
        : "text-gray-900 dark:hover:text-white"
    }`;

  return (
    <nav className="border-b-4 bg-gray-200 border-gray-200 dark:bg-gray-900 font-bold">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <span className="flex items-center gap-3">
          <img src={logo} className="h-12 rounded-xl" alt="SBO Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            SBO
          </span>
        </span>

        <div className="flex items-center gap-4">
          {token ? (
            <button
              onClick={signOut}
              className="text-white bg-red-600 rounded-lg p-2"
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink
                to="login"
                className="text-white bg-green-400 rounded-lg p-2"
              >
                Login
              </NavLink>
              <NavLink
                to="register"
                className="text-white bg-green-400 rounded-lg p-2"
              >
                Sign Up
              </NavLink>
            </>
          )}
        </div>

        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-label="Toggle navigation"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 17 14">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:gap-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {token && (
              <>
                <li>
                  <NavLink to="home" className={navLinkClass} end>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="products" className={navLinkClass}>
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink to="categories" className={navLinkClass}>
                    Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink to="brands" className={navLinkClass}>
                    Brands
                  </NavLink>
                </li>
                <li>
                  <NavLink to="cart" className={navLinkClass}>
                    <div className="flex items-center gap-1">
                      Cart
                      {cartCount > 0 && (
                        <span className="inline-flex items-center justify-center w-6 h-6 ml-1 text-xs font-bold text-white bg-red-500 rounded-full">
                          {cartCount}
                        </span>
                      )}
                    </div>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="wishlist" className={navLinkClass}>
                    <div className="flex items-center gap-1">
                      WishList
                      {wishListCount > 0 && (
                        <span className="inline-flex items-center justify-center w-6 h-6 ml-1 text-xs font-bold text-white bg-red-500 rounded-full">
                          {wishListCount}
                        </span>
                      )}
                    </div>
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
