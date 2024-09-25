import { useState } from "react";
import { useParams } from "react-router-dom";

const ScheduledTournament = () => {
  const { id } = useParams();
  const tournamentData = JSON.parse(localStorage.getItem("tournamentData"))?.[id];

  if (!tournamentData) {
    return <div className="text-center text-red-500">No tournament data found for this ID.</div>;
  }

  const savedMatches = JSON.parse(localStorage.getItem(`matches_${id}`)) || [];
  const [matches, setMatches] = useState(savedMatches);

  const [matchDetails, setMatchDetails] = useState({
    teamA: "",
    teamB: "",
    date: "",
    venue: ""
  });

  const handleAddMatch = () => {
    const newMatches = [...matches, matchDetails];
    setMatches(newMatches);
    setMatchDetails({ teamA: "", teamB: "", date: "", venue: "" });
    localStorage.setItem(`matches_${id}`, JSON.stringify(newMatches));
  };

  const handleRemoveMatch = (indexToRemove) => {
    const updatedMatches = matches.filter((_, index) => index !== indexToRemove);
    setMatches(updatedMatches);
    localStorage.setItem(`matches_${id}`, JSON.stringify(updatedMatches));
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Tournament Header */}
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-blue-700">{tournamentData.tournamentName}</h1>
        <p className="text-gray-600">Tournament ID: {tournamentData.tournamentId}</p>
      </header>

      {/* Tournament Details */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-blue-700">Tournament Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <strong>Type:</strong> {tournamentData.selectedTournamentType}
          </div>
          <div>
            <strong>Date Range:</strong>{" "}
            {new Date(tournamentData.selectedDateRange[0].startDate).toLocaleDateString()} -{" "}
            {new Date(tournamentData.selectedDateRange[0].endDate).toLocaleDateString()}
          </div>
          <div>
            <strong>Format:</strong> {tournamentData.tournamentDetails.selectedFormat}
          </div>
          <div>
            <strong>Ball Type:</strong> {tournamentData.tournamentDetails.ballType}
          </div>
          <div>
            <strong>Match Type:</strong> {tournamentData.tournamentDetails.matchType}
          </div>
        </div>

        <h3 className="text-lg font-semibold mt-4">Teams</h3>
        <ul className="list-disc list-inside mt-2">
          {tournamentData.tournamentDetails.teamsDetails.map((team, index) => (
            <li key={index}>
              {team.teamName} ({team.country}) - {team.numberOfPlayers} Players
            </li>
          ))}
        </ul>
      </section>

      {/* Schedule a Match */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-blue-700">Schedule a Match</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <input
            type="text"
            placeholder="Team A"
            value={matchDetails.teamA}
            onChange={(e) => setMatchDetails({ ...matchDetails, teamA: e.target.value })}
            className="p-3 border border-gray-300 rounded-lg w-full"
          />
          <input
            type="text"
            placeholder="Team B"
            value={matchDetails.teamB}
            onChange={(e) => setMatchDetails({ ...matchDetails, teamB: e.target.value })}
            className="p-3 border border-gray-300 rounded-lg w-full"
          />
          <input
            type="date"
            value={matchDetails.date}
            onChange={(e) => setMatchDetails({ ...matchDetails, date: e.target.value })}
            className="p-3 border border-gray-300 rounded-lg w-full"
          />
          <input
            type="text"
            placeholder="Venue"
            value={matchDetails.venue}
            onChange={(e) => setMatchDetails({ ...matchDetails, venue: e.target.value })}
            className="p-3 border border-gray-300 rounded-lg w-full"
          />
        </div>
        <button
          onClick={handleAddMatch}
          className="bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition duration-300"
        >
          Add Match
        </button>
      </section>

      {/* Scheduled Matches */}
      <section className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-blue-700">Scheduled Matches</h2>
        {matches.length === 0 ? (
          <p>No matches scheduled yet.</p>
        ) : (
          <ul className="space-y-4">
            {matches.map((match, index) => (
              <li key={index} className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-md">
                <div>
                  <h3 className="text-lg font-semibold text-blue-700">
                    {match.teamA} vs {match.teamB}
                  </h3>
                  <p>Date: {new Date(match.date).toLocaleDateString()}</p>
                  <p>Venue: {match.venue}</p>
                </div>
                <button
                  onClick={() => handleRemoveMatch(index)}
                  className="bg-red-600 text-white py-1 px-3 rounded-lg hover:bg-red-700 transition duration-300"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default ScheduledTournament;
