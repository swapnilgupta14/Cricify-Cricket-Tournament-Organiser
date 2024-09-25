import { useState, useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";

const TournamentCards = () => {
  const [activeTab, setActiveTab] = useState("Domestic");
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    // Fetch tournaments from local storage
    const storedTournaments =
      JSON.parse(localStorage.getItem("tournamentData")) || {};
    const tournamentsArray = Object.values(storedTournaments);
    setTournaments(tournamentsArray);
  }, []);

  // Filter tournaments by type
  const filteredTournaments = (type) => {
    return tournaments.filter(
      (tournament) =>
        tournament.selectedTournamentType.toLowerCase() === type.toLowerCase()
    );
  };

  const renderTabContent = () => {
    const tournamentsToDisplay = filteredTournaments(activeTab);

    return (
      <div className="w-full bg-white rounded-lg shadow-lg p-6 mb-6">
        {tournamentsToDisplay.length > 0 ? (
          tournamentsToDisplay.map((tournament) => (
            <div
              key={tournament.tournamentId}
              className="flex flex-col lg:flex-row lg:items-start space-y-4 lg:space-y-0 lg:space-x-6"
            >
              {/* Tournament Info */}
              <div className="flex-1">
                <h3 className="font-semibold text-xl text-blue-700 mb-2">
                  {tournament.tournamentName}
                </h3>
                <div className="grid grid-cols-2 gap-2 text-gray-600">
                  <p>
                    <strong>Tournament ID:</strong> {tournament.tournamentId}
                  </p>
                  <p>
                    <strong>Type:</strong> {tournament.selectedTournamentType}
                  </p>
                  <p>
                    <strong>Date Range:</strong>{" "}
                    {new Date(
                      tournament.selectedDateRange[0].startDate
                    ).toLocaleDateString()}{" "}
                    -{" "}
                    {new Date(
                      tournament.selectedDateRange[0].endDate
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Tournament Details */}
              <div className="flex-1 lg:border-l lg:pl-6 space-y-2">
                <p className="text-blue-600 font-semibold">
                  Tournament Details:
                </p>
                <div className="grid grid-cols-2 gap-2 text-gray-600">
                  <p>
                    <strong>Format:</strong>{" "}
                    {tournament.tournamentDetails.selectedFormat}
                  </p>
                  <p>
                    <strong>Structure:</strong>{" "}
                    {tournament.tournamentDetails.selectedTournamentFormat}
                  </p>
                  <p>
                    <strong>Overs:</strong> {tournament.tournamentDetails.overs}
                  </p>
                  <p>
                    <strong>Ball Type:</strong>{" "}
                    {tournament.tournamentDetails.ballType}
                  </p>
                  <p>
                    <strong>Number of Matches:</strong>{" "}
                    {tournament.tournamentDetails.numMatches}
                  </p>
                  <p>
                    <strong>Match Type:</strong>{" "}
                    {tournament.tournamentDetails.matchType}
                  </p>
                </div>
              </div>

              {/* Teams Details */}
              <div className="flex-1 lg:border-l lg:pl-6 space-y-2">
                <p className="text-blue-600 font-semibold">Teams:</p>
                {tournament.tournamentDetails.teamsDetails.map(
                  (team, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-3 gap-2 text-gray-600"
                    >
                      <p>
                        <strong>Team:</strong> {team.teamName}
                      </p>
                      <p>
                        <strong>Players:</strong> {team.numberOfPlayers}
                      </p>
                      <p>
                        <strong>Country:</strong> {team.country}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No tournaments to display.</p>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl p-6 sm-custom:p-4 shadow-lg m-4">
      {/* Header */}
      <h1 className="text-left text-xl font-semibold mb-6 flex items-center">
        Tournament Coverage
        <span className="ml-2 text-xl text-blue-600">
          <FiArrowRight className="inline-block" />
        </span>
      </h1>

      <div className="flex space-x-4 mb-6 border-b text-sm">
        {["Domestic", "International", "Club", "School"].map((type) => (
          <button
            key={type}
            className={`pb-2 px-4 focus:outline-none ${
              activeTab === type
                ? "border-b-2 border-blue-600 text-blue-600 font-semibold"
                : "text-gray-600 hover:text-blue-600"
            }`}
            onClick={() => setActiveTab(type)}
          >
            {type}
          </button>
        ))}
      </div>

      <div>{renderTabContent()}</div>
    </div>
  );
};

export default TournamentCards;
