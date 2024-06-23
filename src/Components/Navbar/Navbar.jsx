import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { CredContext } from '../../Providers/AuthProvider/CredProvider';

const Navbar = () => {
  const { logOut, user } = useContext(CredContext);
  console.log(user, 'photourl');
  const links = (
    <>
      <li>
        <NavLink to="/"> Home </NavLink>
      </li>
      <li>
        <NavLink to="/login"> Login </NavLink>
      </li>
    </>
  );
  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {links}
            </ul>
          </div>

          <Link className="text-xl" to="/">
            {' '}
            SolisOrb{' '}
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="dropdown dropdown-end relative z-50">
              <div
                tabIndex="0"
                role="button"
                className="btn btn-ghost btn-circle avatar"
                title={user?.displayName}
              >
                <div className="w-10 rounded-full">
                  <img
                    referrerPolicy="no-referrer"
                    alt="Tailwind CSS Navbar component"
                    src={user?.photoURL}
                  />
                </div>
              </div>
              <ul
                tabIndex="0"
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <Link to='/addJobs'> Add jobs</Link>
                </li>
                <li>
                  <button onClick={logOut}>log out</button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login"> login</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
