import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import JobCard from '../../Components/JobCard/JobCard';
import { useState, useSyncExternalStore } from 'react';

const AllJobs = () => {
  const axiosSecure = useAxiosSecure();
  const [itemsPerpage, setItemsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState('');
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');

  const getJobsAndCount = async () => {
    try {
      const [jobsRes, countRes] = await Promise.all([
        axiosSecure.get(
          `/all-jobs?page=${currentPage}&size=${itemsPerpage}&filter=${filter}&sort=${sort}&search=${search}`
        ),
        axiosSecure(`/jobs-count?filter=${filter}`),
      ]);
      return { jobs: jobsRes.data, counts: countRes.data };
    } catch (error) {
      return error;
    }
  };
  //  tanstack query fetching data => => =>
  const { data, isLoading, refetch } = useQuery({
    queryFn: getJobsAndCount,
    queryKey: ['JobsAndCount'],
  });

  const handleReset = async () => {
    await setFilter('');
    await setSort('');
    await refetch();
  };

  if (isLoading) {
    return (
      <>
        <div className="min-h-screen flex items-center justify-center">
          <h3 className="text-5xl font-bold">Still Laoding ......</h3>
        </div>
      </>
    );
  }

  const handleCurrentPage = async pageNumber => {
    await setCurrentPage(pageNumber);
    await refetch();
  };

  const pageCountNumbers = Math.ceil(data.counts.count / itemsPerpage);
  const pageCountArray = [...Array(pageCountNumbers).keys()];
  const handleSearch = async e => {
    e.preventDefault();
     await setSearch(e.target.search.value)
     await refetch();

  };
  return (
    <div className="container px-6 py-10 mx-auto min-h-[calc(100vh-306px)] flex flex-col justify-between">
      <div>
        {/* catafory container => =>  */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-5 ">
          <div>
            <select
              name="category"
              onChange={async e => {
                await setFilter(e.target.value);
                await setCurrentPage(0);
                await refetch();
              }}
              id="category"
              className="border p-4 rounded-lg"
              value={filter}
            >
              <option value="">Filter By Category</option>
              <option value="Web Development">Web Development</option>
              <option value="Graphics Design">Graphics Design</option>
              <option value="Digital Marketing">Digital Marketing</option>
            </select>
          </div>

          <form onSubmit={handleSearch}>
            <div className="flex p-1 overflow-hidden border rounded-lg    focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
              <input
                className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent"
                type="text"
                name="search"
                placeholder="Enter Job Title"
                aria-label="Enter Job Title"
              />

              <button className="px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none">
                Search
              </button>
            </div>
          </form>
          <div>
            <select
              onChange={async e => {
                await setSort(e.target.value);
                await refetch();
              }}
              name="category"
              id="category"
              className="border p-4 rounded-md"
              value={sort}
            >
              <option value="">Sort By Deadline</option>
              <option value="dsc">Descending Order</option>
              <option value="asc">Ascending Order</option>
            </select>
          </div>
          <button onClick={handleReset} className="btn">
            Reset
          </button>
        </div>
        {/*  => => =>  ---the card container--- => => =>  */}
        <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.jobs.map(job => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-12">
        {/* The privious button   <=<=<=<<= */}
        <button
          disabled={currentPage === 0}
          onClick={() => currentPage > 0 && handleCurrentPage(currentPage - 1)}
          className="px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-blue-500  hover:text-white"
        >
          <div className="flex items-center -mx-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mx-1 rtl:-scale-x-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
            <span className="mx-1">previous</span>
          </div>
        </button>

        {pageCountArray.map(btnNum => (
          <button
            onClick={() => handleCurrentPage(btnNum)}
            key={btnNum}
            className={`hidden px-4 py-2 mx-1 transition-colors ${
              btnNum === currentPage ? 'bg-blue-500 text-white' : ''
            } duration-300 transform  rounded-md sm:inline hover:bg-blue-500  hover:text-white`}
          >
            {btnNum + 1}
          </button>
        ))}
        {/* the next button => => =>  */}
        <button
          disabled={currentPage === pageCountNumbers - 1}
          onClick={() =>
            currentPage < pageCountNumbers - 1 &&
            handleCurrentPage(currentPage + 1)
          }
          className="px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-blue-500 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500"
        >
          <div className="flex items-center -mx-1">
            <span className="mx-1">Next</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mx-1 rtl:-scale-x-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};

export default AllJobs;
