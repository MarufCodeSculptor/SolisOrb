import axios from 'axios';

const proccessCookie = async user => {
  if (user.accessToken) {
    try {
      const { data } = await axios.post(
        `http://localhost:9000/user`,
        { email: user?.email },
        {
          withCredentials: true,
        }
      );
      console.log(`The token from  --->`, data);
    } catch (err) {
      console.log(err);
    }
  }
};
export default proccessCookie;
