import axios from 'axios';

const getJob = async ({ params }) => {
  const { data } = await axios.get(`http://localhost:9000/job/${params.id}`);
  return data;
};
export default getJob;
