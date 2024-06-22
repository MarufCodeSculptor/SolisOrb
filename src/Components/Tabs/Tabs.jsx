import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import JobCard from '../JobCard/JobCard';

const TheTabs = () => {
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
          <Tab>Web</Tab>
          <Tab>Graphics</Tab>
          <Tab>Gigital Marketing</Tab>
        </TabList>

        <TabPanel>
          <JobCard />
        </TabPanel>

        <TabPanel>
          <JobCard />
        </TabPanel>

        <TabPanel>
          <JobCard />
        </TabPanel>
      </Tabs>
    </div>
  );
};
export default TheTabs;
