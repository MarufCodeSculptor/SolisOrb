import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { CredContext } from '../../Providers/AuthProvider/CredProvider';
import server from '../../Hooks/axioxSecure';
import toast from 'react-hot-toast';
const Navbar = () => {
  const { logOut, user } = useContext(CredContext);
  const handleLogout = async () => {
    try {
      await logOut();
      const { data } = await server.get(`/logout`, { withCredentials: true });
      console.log(data);
      toast.success('log out success');
    } catch (err) {
      console.log(err?.message);
    }
  };

  const links = (
    <>
      <li>
        <NavLink to="/"> Home </NavLink>
      </li>
      {!user && (
        <li>
          <NavLink to="/login"> Login </NavLink>
        </li>
      )}
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
                  <Link to="my-posted-jobs"> My Posted Jobs</Link>
                </li>
                <li>
                  <Link to="/addJobs"> Add jobs</Link>
                </li>
                <li>
                  <Link to="/my-bids"> My Bids </Link>
                </li>
                <li>
                  <Link to="/bid-request"> Bid Request </Link>
                </li>
                <li>
                  <button onClick={() => handleLogout()}>log out</button>
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
