import { useContext, useEffect } from 'react';
import { CredContext } from '../../Providers/AuthProvider/CredProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import proccessCookie from '../../Hooks/proccessCookie';


const Login = () => {
  const { signInWithGoogle, signInWithEmailPass, user, loading } =
    useContext(CredContext);
  const navigate = useNavigate();
  const location = useLocation();
  const form = location.state || '/';

  //  Login  with email and passwrd   =>
  const handleLogin = async event => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formValues = Object.fromEntries(formData.entries());

    try {
      const { user } = await signInWithEmailPass(
        formValues.email,
        formValues.password
      );

      proccessCookie(user);

      toast.success('login successfull');
      navigate(form, { replace: true });
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    } finally {
      event.target.reset();
    }
  };
  // SIGN IN WITH GOOGLE =>
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      toast.success('Signin Successful');
      navigate(form, { replace: true });
      proccessCookie(result?.user);
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [navigate, user]);

  if (user || loading) return;
  return (
    <>
      <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl my-12">
        <div
          className="hidden bg-cover lg:block lg:w-1/2"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1606660265514-358ebbadc80d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1575&q=80')`,
          }}
        />

        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <div className="flex justify-center mx-auto">
            <img
              className="w-auto h-7 sm:h-8"
              src="https://merakiui.com/images/logo.svg"
              alt="Logo"
            />
          </div>

          <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
            Welcome back!
          </p>

          <a
            href="#"
            className="flex items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <div className="px-4 py-2">
              <svg className="w-6 h-6" viewBox="0 0 40 40">
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#FFC107"
                />
                <path
                  d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#FF3D00"
                />
                <path
                  d="M20 36.6667C24.2625 36.6667 27.9875 35.1458 30.6533 32.6117L25.5242 28.3458C23.9792 29.3958 22.0467 30 20 30C15.6475 30 11.955 27.2142 10.5808 23.3333H5.25497C6.87834 28.5342 12.0925 32.5 18.3333 32.5C22.0867 32.5 25.3817 30.9908 27.5683 28.3692L20 20H3.33335V20C3.33335 29.2042 10.7958 36.6667 20 36.6667Z"
                  fill="#4CAF50"
                />
                <path
                  d="M27.5683 28.3692C29.565 26.1092 31.6667 23.215 31.6667 20C31.6667 16.785 29.565 13.8908 27.5683 11.6308L20 20L10.5808 23.3333H5.25497C6.87834 28.5342 12.0925 32.5 18.3333 32.5C22.0867 32.5 25.3817 30.9908 27.5683 28.3692Z"
                  fill="#1976D2"
                />
              </svg>
            </div>
            <button onClick={handleGoogleLogin}>
              <span className="px-4 py-3 font-bold text-center">
                Sign in with Google
              </span>
            </button>
          </a>

          <div className="mt-6">
            {/*  form starting here =>  */}
            <form onSubmit={handleLogin}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm text-gray-800 dark:text-gray-200"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="example@example.com"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <div className="mt-4">
                <label
                  htmlFor="password"
                  className="block text-sm text-gray-800 dark:text-gray-200"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Your Password"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <div className="mt-6">
                <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400">
                  Sign In
                </button>
              </div>
            </form>
            {/* forn ended here =>  */}
          </div>

          <p className="mt-8 text-xs font-light text-center text-gray-400">
            Don't have an account?
            <Link
              to={'/register'}
              className="font-medium text-gray-700 dark:text-gray-200 hover:underline"
            >
              Create One
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
