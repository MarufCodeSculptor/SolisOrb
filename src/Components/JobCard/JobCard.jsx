import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
  const { deadline, job_title, description, min_price, max_price ,_id} = job;
  return (
    <Link to={`/job/${_id}`}>
      <div className="w-full max-w-sm px-4 py-3 bg-white rounded-md shadow-md hover:scale-[1.05] transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs font-light text-gray-800 ">{deadline}</span>
          <span className="px-3 py-1 text-[8px] text-blue-800 uppercase bg-blue-200 rounded-full ">
            {job_title}
          </span>
        </div>
        <div>
          <h1 className="mt-2 text-lg font-semibold text-gray-800 ">
            {job_title}
          </h1>

          <p className="mt-2 text-sm text-gray-600 ">{description}</p>
          <p className="mt-2 text-sm font-bold text-gray-600 ">
            <span> ${min_price}-</span>
            <span>${max_price}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

JobCard.propTypes = {
  job: PropTypes.object.isRequired,
};

export default JobCard;
