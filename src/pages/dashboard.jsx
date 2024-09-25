import { useEffect } from "react";
// import { fetchCricbuzzSchedule } from "../utils/API/fetch";

import NewsFeed from "./common/newsFeed";
import Rankings from "./common/Rankings";
import MatchCards from "../components/MatchCards";
import SeriesCoverage from "./seriesCoverage";

import Navbar from "../components/Navbar";
import SearchBar from "../components/common/SearchBar";
import Breadcrumbs from "../components/common/Breadcrumbs";
import TournamentCards from "../components/TournamentCards";

import seriesCoverage from "../utils/DummyData/seriesCoverage.json";
import { cricketMatches } from "../utils/DummyData/cricketMatches";

const Dashboard = () => {useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    // const data = await fetchCricbuzzSchedule();
    // console.log("Data", data);
    // console.log("hii");
  };

  return (
    <div className="flex flex-col justify-center items-center text-font-primary h-[100%] w-full">
      <div className="bg-dashboard-bg bg-cover w-[100%] flex flex-col justify-center items-center">
        <Navbar />
        <div className="h-1/3 flex w-[96.3%] justify-center items-center p-1 my-2">
          <MatchCards cricketMatches={cricketMatches} />
        </div>
      </div>

      <div className="bg-gray-200 flex-1 w-[100%] rounded-t-3xl flex flex-col justify-center items-center">
        <div className="rounded-t-3xl w-[100%] flex flex-row justify-between items-center">
          <Breadcrumbs />
          <SearchBar />
        </div>
        <div className="flex w-[95%] sm-custom:flex-col justify-center">
          <div className="flex flex-col flex-1">
            <TournamentCards />
            <SeriesCoverage data={seriesCoverage} />
          </div>
          <div className="w-[30%] sm-custom:w-[100%]">
            <NewsFeed />
            <Rankings />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
