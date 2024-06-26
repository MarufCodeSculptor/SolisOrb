import PropTypes from 'prop-types';
import server from '../../Hooks/axioxSecure';
import toast from 'react-hot-toast';
const BidRequestCard = ({ request, getData }) => {
  const { job_title, email, deadline, price, category, status, _id } = request;

  const handleStatus = async (id, prevStatus, status) => {
    console.log(id, prevStatus, status);
   
    if( prevStatus ==='Rejected'){
      return toast.error('You cannot accept to rejected one ')
    }
    if (prevStatus === status) {
      return toast.error('No change in status.');
    }

    try {
      const { data } = await server().patch(`/bid-buyer/${id}`, { status });
      console.log(data);
      if (data.modifiedCount) {
        getData();
        toast.success(`Success! A new document was updated`);
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  return (
    <tr>
      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
        {job_title}
      </td>
      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
        {email}
      </td>

      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
        {new Date(deadline).toLocaleDateString()}
      </td>

      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
        ${price}
      </td>
      <td className="px-4 py-4 text-sm whitespace-nowrap">
        <div className="flex items-center gap-x-2">
          <p
            className="px-3 py-1 rounded-full text-blue-500 bg-blue-100/60
                    text-xs"
          >
            {category}
          </p>
        </div>
      </td>
      <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
        <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-yellow-100/60 text-yellow-500">
          <span className="h-1.5 w-1.5 rounded-full bg-yellow-500"></span>
          <h2 className="text-sm font-normal "> {status} </h2>
        </div>
      </td>
      <td className="px-4 py-4 text-sm whitespace-nowrap">
        <div className="flex items-center gap-x-6">
          {/* the accept button  */}
          <button
            onClick={() => handleStatus(_id, status, 'In Progress')}
            className="text-gray-500 transition-colors duration-200   hover:text-red-500 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 12.75 6 6 9-13.5"
              />
            </svg>
          </button>
          {/*  the decline button  */}
          <button
            onClick={() => handleStatus(_id, status, 'Rejected')}
            className="text-gray-500 transition-colors duration-200   hover:text-yellow-500 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
              />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
};

BidRequestCard.propTypes = {
  request: PropTypes.object.isRequired,
  getData: PropTypes.func.isRequired,
};

export default BidRequestCard;
