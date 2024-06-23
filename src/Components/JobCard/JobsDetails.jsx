import { useContext, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { CredContext } from '../../Providers/AuthProvider/CredProvider';
import server from '../../Hooks/axioxSecure';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import toast from 'react-hot-toast';

const JobDetails = () => {
  const { user } = useContext(CredContext);
  const [startDate, setStartDate] = useState(new Date());
  const {
    buyer,
    category,
    deadline,
    description,
    job_title,
    max_price,
    min_price,
    _id,
  } = useLoaderData();
  console.log(buyer);
  //   submitting form =>
  const hanleFormSubmition = async event => {
    event.preventDefault();
    if(user?.email===buyer?.email) return toast.error('not permited')

    const formData = new FormData(event.target);
    const formValues = Object.fromEntries(formData.entries());

    const userEmail = user?.email;
    const job_id = _id;
    const price = parseFloat(formValues.price);
    if (price < parseInt(min_price) && price === 'NaN')
      return toast.error('Offer more or at least equal to Minimum Price');
    const buyer_email=buyer.email;
    const status = 'pending';

    const bidData = {
      ...formValues,
      job_id,
      userEmail,
      price,
      status,
      startDate,
      buyer_email
    };
    console.table(bidData);

    try {
      const response = await server.post('/bids', bidData);
      console.log(response.data);
      if (response.data.acknowledged) {
        toast.success('Data Posted');
        event.target.reset();
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex flex-col md:flex-row justify-around gap-5  items-center min-h-[calc(100vh-306px)] md:max-w-screen-xl mx-auto ">
      {/* Job Details */}
      <div className="flex-1  px-4 py-7 bg-white rounded-md shadow-md md:min-h-[350px]">
        <div className="flex items-center justify-between">
          <span className="text-sm font-light text-gray-800 "> Deadline  {new Date(deadline).toLocaleDateString()}</span>
          <span className="px-4 py-1 text-xs text-blue-800 uppercase bg-blue-200 rounded-full ">
            {category}
          </span>
        </div>

        <div>
          <h1 className="mt-2 text-3xl font-semibold text-gray-800 ">
            {job_title}
          </h1>

          <p className="mt-2 text-lg text-gray-600 ">{description}</p>
          <p className="mt-6 text-sm font-bold text-gray-600 ">
            Buyer Details:
          </p>



          <div className="flex items-center gap-5">
            <div>
              <p className="mt-2 text-sm  text-gray-600 ">Name: {buyer.name}</p>
              <p className="mt-2 text-sm  text-gray-600 ">
                Email: {buyer.email}
              </p>
            </div>
            <div className="rounded-full object-cover overflow-hidden w-14 h-14">
              <img src={buyer.photoUrl} alt="" />
            </div>
          </div>



          <p className="mt-6 text-lg font-bold text-gray-600 ">
            Range: <span>${min_price} </span> <span>${max_price} </span>
          </p>
        </div>
      </div>
      {/* Place A Bid Form */}
      <section className="p-6 w-full  bg-white rounded-md shadow-md flex-1 md:min-h-[350px]">
        <h2 className="text-lg font-semibold text-gray-700 capitalize ">
          Place A Bid
        </h2>

        <form onSubmit={hanleFormSubmition}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-gray-700 " htmlFor="price">
                Price
              </label>
              <input
                id="price"
                type="number"
                name="price"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-gray-700 " htmlFor="emailAddress">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                disabled
                defaultValue={user?.email}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-gray-700 " htmlFor="comment">
                Comment
              </label>
              <input
                id="comment"
                name="comment"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>
            <div className="flex flex-col gap-2 ">
              <label className="text-gray-700">Deadline</label>

              {/* Date Picker Input Field */}
              <DatePicker
                selected={startDate}
                onChange={date => setStartDate(date)}
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            >
              Place Bid
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default JobDetails;
