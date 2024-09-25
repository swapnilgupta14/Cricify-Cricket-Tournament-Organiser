import axiosInstance from "./axiosInstance";

export const fetchCricbuzzSchedule = async () => {
  try {
    const response = await axiosInstance.get(
      "https://cricbuzz-cricket.p.rapidapi.com/matches/v1/recent"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching Cricbuzz schedule:", error);
    return null;
  }
};

export const fetchCricbuzzNews = async () => {
  try {
    const response = await axiosInstance.get(
      "https://cricbuzz-cricket.p.rapidapi.com/news/v1/index"
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching Cricbuzz news:", error);
    return null;
  }
};

export const fetchImageById = async (id) => {
  try {
    const response = await axiosInstance.get(
      `https://cricbuzz-cricket.p.rapidapi.com/img/v1/i1/c${id}/i.jpg`
    );
    return response.data;
  } catch {
    console.group("Error getting image");
    return null;
  }
};

export const fetchPlayerRankings = async (param) => {
  try {
    const response = await axiosInstance.get(
      "https://cricbuzz-cricket.p.rapidapi.com/stats/v1/rankings/batsmen",
      param
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching player rankings:", error);
    return null;
  }
};

export const createTournament = async (formDataObj) => {
  try {
    console.log("Tournament Data:", formDataObj);

    const tournamentId = formDataObj.tournamentId;
    const existingTournaments =
      JSON.parse(localStorage.getItem("tournamentData")) || {};
    existingTournaments[tournamentId] = formDataObj;

    localStorage.setItem("tournamentData", JSON.stringify(existingTournaments));

    return { status: 200 };
  } catch (error) {
    console.error("Error creating tournament:", error);
    return null;
  }
};
