import React, { Fragment, useContext } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { AuthContext } from "../../contexts/AuthContext";
import classNames from "../../helpers/classNames";
import ProfilePicture from "../profilePicture/ProfilePicture";
import useLogout from "../../hooks/useLogout";

const NavBar = () => {
  const { user } = useContext(AuthContext);
  const { logout } = useLogout();

  const handleClick = () => {
    logout();
  };

  return (
    <div className="border border-gray-100 bg-white">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto px-2">
          <div className="relative flex h-16 items-center justify-between">
            <Link className="flex shrink-0 items-center" to="/">
              <Logo className="mx-2 h-8 w-auto stroke-blue-600" />
              <span className="text-xl font-semibold text-blue-600">
                Acebook
              </span>
            </Link>

            <div className="absolute inset-y-0 right-0 flex items-center pr-2">
              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-3">
                <div>
                  <Menu.Button
                    data-cy="profile_button"
                    className="flex items-center rounded-full border border-gray-300 p-1 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="sr-only">Open user menu</span>
                    <p data-cy="user" className="mx-2">
                      {user.name}
                    </p>
                    <ProfilePicture
                      className="h-8 w-8"
                      publicId={user.imageId}
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items
                    data-cy="menu_items"
                    className="absolute right-0 z-10 mt-2 w-max origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  >
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/profile"
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          Your Profile
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          type="button"
                          onClick={handleClick}
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block w-full px-4 py-2 text-left text-sm text-gray-700"
                          )}
                        >
                          Sign out
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
