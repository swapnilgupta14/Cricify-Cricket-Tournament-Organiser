import { useState } from "react";
import PropTypes from "prop-types";
import { FiArrowRight } from "react-icons/fi";

const SeriesCoverage = ({ data }) => {
  const [activeTab, setActiveTab] = useState(0);
  const { typeMatches } = data;

  return (
    <div className="bg-white rounded-xl m-[1rem] p-[2rem] sm-custom:p-[1rem] shadow-md sm-custom:m-[1rem]">
      <h1 className="text-left text-xl font-semibold flex justify-start items-center mb-5">
        Recent Series{" "}
        <span className="text-lg m-1">
          {" "}
          <FiArrowRight className="inline mr-2" />
        </span>{" "}
      </h1>

      <div className="flex space-x-4 mb-6 border-b text-sm">
        {typeMatches.map((item, index) => (
          <button
            key={index}
            className={`pb-2 ${
              activeTab === index
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab(index)}
          >
            {item.matchType}
          </button>
        ))}
      </div>

      <div>
        <div className="flex flex-col w-[100%] text-sm">
          {typeMatches[activeTab]?.seriesMatches.map(
            (item) =>
              !item.adDetail && (
                <div
                  key={item?.seriesAdWrapper?.seriesId}
                  className="flex flex-col sm-custom:w-[100%] bg-zinc-600 mb-3 p-3 rounded-xl border border-gray-400"
                >
                  <h1 className="flex font-semibold mt-3 mx-1 text-white">
                    {item?.seriesAdWrapper?.seriesName}
                  </h1>
                  <div className="space-y-1 text-md ">
                    {item?.seriesAdWrapper?.matches.map((match) => (
                      <div
                        key={match?.matchInfo?.matchId}
                        className="border border-gray-500 bg-gray-100 p-2 my-4 flex items-center w-[100%] rounded-lg"
                      >
                        <div className="text-sm flex-grow justify-between">
                          <div className="flex justify-between items-center p-2">
                            <div className="flex-1 flex items-center">
                              <p className="font-semibold text-gray-500">
                                {match?.matchInfo?.matchDesc} on{" "}
                                {new Date(
                                  parseInt(match?.matchInfo?.startDate)
                                ).toLocaleDateString("en-GB", {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                })}
                              </p>
                            </div>

                            <div className="mx-auto flex-shrink-0">
                              <div className="bg-gray-300 text-xs rounded-xl flex justify-center items-center border border-gray-700 font-semibold px-3 py-1 text-center">
                                {match?.matchInfo?.matchFormat}
                              </div>
                            </div>

                            <div className="flex-1 flex justify-end items-center gap-1">
                              <p className="text-gray-600 rounded-lg m-2">
                                {match?.matchInfo?.status}
                              </p>

                              {match?.matchInfo?.status ===
                                "Match abandoned due to rain" && (
                                <img
                                  src={`/cloud.png`}
                                  className="h-8 w-8 m-1"
                                />
                              )}

                              <div
                                className={`bg-black rounded-xl px-2 py-1 m-1 text-white text-xs flex justify-center items-center ${
                                  match?.matchInfo?.state === "Complete"
                                    ? "bg-green-600"
                                    : match?.matchInfo?.state === "Live"
                                    ? "bg-red-600"
                                    : "bg-blue-600"
                                }`}
                              >
                                {match?.matchInfo?.state}
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-center items-center">
                            <div className="flex justify-around items-center m-2 w-[70%]">
                              <div className="flex items-center flex-1">
                                <img
                                  src={`/india.webp`}
                                  alt={match?.matchInfo?.team1?.teamName}
                                  className="h-8 w-8 rounded-full m-1"
                                />
                                <div className="text-gray-700 text-left mx-2">
                                  <p>{match?.matchInfo?.team1?.teamSName}</p>
                                  <p className="text-sm">
                                    {
                                      match?.matchScore?.team1Score?.inngs1
                                        ?.runs
                                    }
                                    /
                                    {
                                      match?.matchScore?.team1Score?.inngs1
                                        ?.wickets
                                    }{" "}
                                    (
                                    {
                                      match?.matchScore?.team1Score?.inngs1
                                        ?.overs
                                    }{" "}
                                    ov)
                                  </p>
                                </div>
                              </div>

                              <div className="flex-shrink-0 px-4">
                                <p className="text-gray-600 font-bold text-center">
                                  VS
                                </p>
                              </div>

                              <div className="flex items-center space-x-1 flex-1 justify-end">
                                <div className="text-gray-700 text-right mx-2">
                                  <p>{match?.matchInfo?.team2?.teamSName}</p>
                                  <p className="text-sm">
                                    {
                                      match?.matchScore?.team2Score?.inngs1
                                        ?.runs
                                    }
                                    /
                                    {
                                      match?.matchScore?.team2Score?.inngs1
                                        ?.wickets
                                    }{" "}
                                    (
                                    {
                                      match?.matchScore?.team2Score?.inngs1
                                        ?.overs
                                    }{" "}
                                    ov)
                                  </p>
                                </div>
                                <img
                                  src={`/australia.webp`}
                                  alt={match?.matchInfo?.team2?.teamName}
                                  className="h-8 w-8 rounded-full m-1"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="text-gray-500 mt-1">
                            <p className="truncate">
                              {match?.matchInfo?.venueInfo?.ground},{" "}
                              {match?.matchInfo?.venueInfo?.city}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

// PropType validation
SeriesCoverage.propTypes = {
  data: PropTypes.shape({
    typeMatches: PropTypes.arrayOf(
      PropTypes.shape({
        matchType: PropTypes.string.isRequired,
        seriesMatches: PropTypes.arrayOf(
          PropTypes.shape({
            seriesAdWrapper: PropTypes.shape({
              seriesId: PropTypes.string.isRequired,
              seriesName: PropTypes.string.isRequired,
              matches: PropTypes.arrayOf(
                PropTypes.shape({
                  matchInfo: PropTypes.shape({
                    matchId: PropTypes.string.isRequired,
                    matchDesc: PropTypes.string.isRequired,
                    startDate: PropTypes.string.isRequired,
                    matchFormat: PropTypes.string.isRequired,
                    status: PropTypes.string.isRequired,
                    venueInfo: PropTypes.shape({
                      ground: PropTypes.string.isRequired,
                      city: PropTypes.string.isRequired,
                    }).isRequired,
                    team1: PropTypes.shape({
                      teamName: PropTypes.string.isRequired,
                      teamSName: PropTypes.string.isRequired,
                    }).isRequired,
                    team2: PropTypes.shape({
                      teamName: PropTypes.string.isRequired,
                      teamSName: PropTypes.string.isRequired,
                    }).isRequired,
                    state: PropTypes.string.isRequired,
                  }).isRequired,
                  matchScore: PropTypes.shape({
                    team1Score: PropTypes.shape({
                      inngs1: PropTypes.shape({
                        runs: PropTypes.number,
                        wickets: PropTypes.number,
                        overs: PropTypes.number,
                      }).isRequired,
                    }).isRequired,
                    team2Score: PropTypes.shape({
                      inngs1: PropTypes.shape({
                        runs: PropTypes.number,
                        wickets: PropTypes.number,
                        overs: PropTypes.number,
                      }).isRequired,
                    }).isRequired,
                  }).isRequired,
                })
              ).isRequired,
            }).isRequired,
            adDetail: PropTypes.bool,
          })
        ).isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default SeriesCoverage;
