import { fetchPlayerRankings } from "../../utils/API/fetch";
import { useEffect, useState } from "react";

const Rankings = () => {
  const [format, setFormat] = useState("test");
  const [testRankings, setTestRankings] = useState(null);
  const [odisRankings, setOdisRankings] = useState(null);
  const [t20sRankings, setT20sRankings] = useState(null);

  const fetchPlayerRank = async (format) => {
    const param = {
      params: {
        formatType: format,
      },
    };
    const data = await fetchPlayerRankings(param);
    if (data) {
      switch (format) {
        case "test":
          setTestRankings(data);
          break;
        case "odis":
          setOdisRankings(data);
          break;
        case "t20s":
          setT20sRankings(data);
          break;
        default:
          break;
      }
    }
  };

  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    fetchPlayerRank(format);
  }, [format]);

  const getCurrentRankings = () => {
    switch (format) {
      case "test":
        return testRankings;
      case "odis":
        return odisRankings;
      case "t20s":
        return t20sRankings;
      default:
        return null;
    }
  };

  const topRankings = getCurrentRankings()
    ? getCurrentRankings().rank.slice(0, 10)
    : [];

  return (
    <div className="bg-white rounded-xl my-4 p-6 sm:p-4 shadow-md h-auto">
      <h1 className="w-full flex justify-start font-semibold text-lg mb-4">
        ICC Rankings - Batters
      </h1>

      <div className="flex space-x-4 mb-6 border-b text-sm">
        {["test", "odis", "t20s"].map((item, index) => (
          <button
            key={index}
            className={`pb-2 font-medium transition-colors duration-200 ${
              format === item
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
            onClick={() => setFormat(item)}
          >
            {capitalizeFirstLetter(item)}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        {topRankings.length > 0 ? (
          <table className="min-w-full text-center border border-gray-300 rounded-lg shadow-sm">
            <thead className="rounded-xl">
              <tr className="bg-zinc-600 text-white font-semibold">
                <th className="py-3 px-4">Rank</th>
                <th className="py-3 px-4">Player</th>
                <th className="py-3 px-4">Country</th>
                <th className="py-3 px-4">Rating</th>
              </tr>
            </thead>
            <tbody>
              {topRankings.map((player) => (
                <tr
                  key={player.id}
                  className="border-t hover:bg-gray-100 transition duration-200"
                >
                  <td className="py-2 px-4">{player.rank}</td>
                  <td className="py-2 px-4">{player.name}</td>
                  <td className="py-2 px-4">{player.country}</td>
                  <td className="py-2 px-4">{player.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500">Loading rankings...</p>
        )}
      </div>
    </div>
  );
};

export default Rankings;
