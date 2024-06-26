import server from "./axioxSecure";

 const proccessCookie= async (user)=>{
     if (user.accessToken) {
          try {
            const { data } = await server().post(
              `/user`,
              { email: user?.email },
              {
                withCredentials: true,
              }
            );
            console.log(`The token from server --->`, data);
          } catch (err) {
            console.log(err);
          }
        }
};
export default proccessCookie;