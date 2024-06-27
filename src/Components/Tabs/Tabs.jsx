import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import JobCard from '../JobCard/JobCard';
import { useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';


const TheTabs = () => {
  const axiosSecure=useAxiosSecure();
  const [jobsData, setJobsData] = useState([]);
  console.log(jobsData);
  useEffect(() => {
    const getData = async () => {
      const { data } = await axiosSecure.get('/jobs');
      console.log('jobs data successfully fetched', data);
      setJobsData(data);
    };
    getData();
  }, []);

  return (
    <div className="mt-10">
      <div>
        <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl">
          Browse jobs by catagories
        </h1>

        <p className="max-w-2xl mx-auto my-6 text-center text-gray-500 ">
          Three categories available for the time being. They are Web
          Development, Graphics Design and Digital Marketing. Browse them by
          clicking on the tabs below.
        </p>
      </div>
      <Tabs className="mt-10 min-h-96">
        <TabList>
          <Tab>Web developement</Tab>
          <Tab>Graphics</Tab>
          <Tab>Gigital Marketing</Tab>
        </TabList>

        <TabPanel>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
            {jobsData
              .filter(j => j.category.toLowerCase() === 'web development')
              .map(job => (
                <JobCard key={job._id} job={job} />
              ))}
          </div>
        </TabPanel>

        <TabPanel>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
            {jobsData
              .filter(j => j.category.toLowerCase() === 'graphics design')
              .map(job => (
                <JobCard key={job._id} job={job} />
              ))}
          </div>
        </TabPanel>

        <TabPanel>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
            {jobsData
              .filter(j => j.category.toLowerCase() === 'digital marketing')
              .map(job => (
                <JobCard key={job._id} job={job} />
              ))}
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};
export default TheTabs;
