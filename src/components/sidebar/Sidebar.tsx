const Sidebar = () => {
  return (
    <div className="flex flex-col w-64 bg-gray-50 border-r border-gray-200 h-full p-4">
      

      <h2 className="text-3xl font-bold text-red-600 mb-6">Filters</h2>

      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
          Job Category
        </h3>
        <div className="flex flex-col space-y-3">

          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-lg text-gray-700">Delivery</span>
            <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600 rounded" />
          </label>

          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-lg text-gray-700">General Errand</span>
            <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600 rounded" />
          </label>

          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-lg text-gray-700">Other</span>
            <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600 rounded" />
          </label>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
          Payment Preference
        </h3>
        <div className="flex flex-col space-y-3">
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-lg text-gray-700">Cash Payment</span>
            <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600 rounded" />
          </label>
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-lg text-gray-700">Digital Payment (Venmo/Zelle)</span>
            <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600 rounded" />
          </label>
        </div>
      </div>
      
      <button className="mt-auto w-full py-3 px-4 bg-white text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-opacity-75 transition duration-150 ease-in-out">
        Clear All Filters
      </button>

    </div>
  );
};

export default Sidebar;
