import server from './axioxSecure';

const getJob = async ({ params }) => {
  const {data} = await server.get(`/job/${params.id}`);
  return data;
};
export default getJob;
