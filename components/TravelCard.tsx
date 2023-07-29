import React from "react";

const TravelCard = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-center min-h-screen">
        <div className="max-w-md w-full p-4 py-6">
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            <div
              className="bg-cover bg-center h-16 p-4 flex justify-end items-center"
              style={{
                backgroundImage:
                  "url(https://mosscm.com/wp-content/uploads/2017/11/news-dallas-skyline.jpg)",
              }}
            >
              <p className="uppercase tracking-widest text-sm text-white bg-black py-1 px-2 rounded opacity-75 shadow-lg">
                Dallas, TX
              </p>
            </div>
            <div className="p-4 text-gray-700 flex justify-between">
              <div>
                <p className="text-3xl text-gray-900">
                  <i className="wi wi-day-sunny text-yellow-500"></i> 84°
                  <span className="text-lg text-gray-500">/ 67°</span>
                </p>
                <p className="text-sm w-56">
                  Mostly sunny throughout the day.
                  <br />
                  4-8 MPH winds.
                </p>
              </div>
              <div className="leading-loose text-sm">
                <div className="flex items-center">
                  <i className="mr-2 wi wi-horizon-alt text-yellow-500"></i>
                  <p>
                    <span className="font-bold">6:57</span>{" "}
                    <span className="text-xs text-gray-600">AM</span>
                  </p>
                </div>
                <div className="flex items-center">
                  <i className="mr-2 wi wi-horizon text-purple-400"></i>
                  <p>
                    <span className="font-bold">5:42</span>{" "}
                    <span className="text-xs text-gray-600">PM</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center p-4 border-t border-gray-300 text-gray-600">
              <div className="flex items-center">
                <i className="mr-2 wi wi-hot"></i>
                <p>
                  <span className="text-gray-900 font-bold">7</span>{" "}
                  <span className="text-sm">UV</span>
                </p>
              </div>
              <div className="flex items-center">
                <i className="mr-2 wi wi-rain"></i>
                <p>
                  <span className="text-gray-900 font-bold">8%</span>{" "}
                  <span className="text-sm">Precip</span>
                </p>
              </div>
              <div className="flex items-center">
                <i className="mr-2 wi wi-thermometer"></i>
                <p>
                  <span className="text-gray-900 font-bold">59°</span>{" "}
                  <span className="text-sm">Dew Point</span>
                </p>
              </div>
            </div>
          </div>

          <div className="text-gray-600 my-3 text-center">
            <i className="fas fa-ellipsis-v"></i>
          </div>
          <div className="text-xs uppercase text-gray-400 tracking-wider text-center leading-none">
            EST Time to Airport: <span className="font-bold text-sm">32 min</span>
          </div>
          <div className="text-gray-600 my-3 text-center">
            <i className="fas fa-ellipsis-v"></i>
          </div>

          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            <div
              className="bg-cover bg-center h-16 p-4 flex justify-end items-center"
              style={{
                backgroundImage:
                  "url(https://content.api.news/v3/images/bin/11990db1d540d5c13ea8ca3e01f2083c)",
              }}
            >
              <p className="uppercase tracking-widest text-sm text-white bg-black py-1 px-2 rounded opacity-75 shadow-lg">
                DFW <span className="tracking-normal">--&gt;</span> SEA
              </p>
            </div>
            <div className="px-4 pb-3 pt-4 border-b border-gray-300 bg-gray-100 flex justify-between">
              <div className="text-xs uppercase font-bold text-gray-600 tracking-wide">
                TSA: <span className="font-normal">5-12 min</span>
              </div>
              <div className="text-xs uppercase font-bold text-gray-600 tracking-wide">
                Airport Status:{" "}
                <span className="font-normal text-green-600">Normal</span>
              </div>
            </div>
            <div className="p-4 text-gray-700 flex justify-between items-start">
              <div>
                <p className="text-3xl text-gray-900 leading-none my-1">AA 792</p>
                <p className="text-xs w-56">American Airlines</p>
                <p className="text-sm w-56">7:11 am --&gt; 10:10 am</p>
              </div>
              <div className="leading-loose bg-green-500 text-white p-1 px-2 rounded-lg uppercase text-xs tracking-wider">
                On Time
              </div>
            </div>
            <div className="flex justify-between items-center p-4 border-t border-gray-300 text-gray-600">
              <div className="flex items-center">
                <p>
                  <span className="text-sm pr-1">Terminal</span>{" "}
                  <span className="text-gray-900 font-bold">C</span>
                </p>
              </div>
              <div className="flex items-center">
                <p>
                  <span className="text-sm pr-1">Gate</span>{" "}
                  <span className="text-gray-900 font-bold">C24</span>
                </p>
              </div>
              <div className="flex items-center">
                <p>
                  <span className="text-sm pr-1">Seats</span>{" "}
                  <span className="text-gray-900 font-bold">12D, 12E</span>
                </p>
              </div>
            </div>
          </div>

          <div className="text-gray-600 my-3 text-center">
            <i className="fas fa-ellipsis-v"></i>
          </div>
          <div className="text-xs uppercase text-gray-400 tracking-wider text-center leading-none">
            EST Flight Time: <span className="font-bold text-sm">2 hr 14 min</span>
          </div>
          <div className="text-gray-600 my-3 text-center">
            <i className="fas fa-ellipsis-v"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelCard;
