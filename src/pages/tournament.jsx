import { useState } from "react";
import { FiArrowRight, FiArrowLeft, FiCheckCircle } from "react-icons/fi";
import { Link } from "react-router-dom";
import { isRequired, isNumber, isValidOvers } from "./common/validation";

import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { addDays } from "date-fns";

import { createTournament } from "../utils/API/fetch";
import { useNavigate } from "react-router-dom";

const Tournament = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);

  const [tournamentName, setTournamentName] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("");
  const [tournamentId, setTournamentId] = useState("");
  const [selectedTournamentFormat, setSelectedTournamentFormat] = useState("");

  const [selectedTournamentType, setSelectedTournamentType] = useState("");

  const [numMatches, setNumMatches] = useState(1);
  const [matchType, setMatchType] = useState("day");
  // const [matchGroup, setMatchGroup] = useState("");

  const [overs, setOvers] = useState("");
  const [ballType, setBallType] = useState("");

  const [teamsDetails, setTeamsDetails] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [errors, setErrors] = useState({});

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const navigate = useNavigate();

  const [currentTeam, setCurrentTeam] = useState({
    teamName: "",
    numberOfPlayers: "",
    country: "",
  });
  const [selectedDateRange, setSelectedDateRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  const formats = ["T10", "T20", "ODI", "Test Match"];
  const tournamentFormat = ["Round Robin", "Knockout", "League", "Custom"];
  const tournamentType = ["Domestic", "International", "Club", "School"];
  const oversOptions = ["10", "20", "50", "Test Match (Unlimited)"];
  const ballTypes = [
    "Red Ball",
    "White Ball",
    "Pink Ball",
    "Tennis Ball",
    "Rubber Ball",
    "SG Test",
    "SG Club",
    "Kookaburra Cricket Ball",
    "Kookaburra White Ball",
    "Dukes Test Ball",
  ];

  const countries = [
    "India",
    "Australia",
    "England",
    "South Africa",
    "Pakistan",
    "New Zealand",
    "Sri Lanka",
    "Bangladesh",
    "West Indies",
    "Afghanistan",
    "Zimbabwe",
    "Ireland",
    "Nepal",
    "Scotland",
    "Netherlands",
    "United Arab Emirates",
    "Oman",
    "Namibia",
    "USA",
    "Papua New Guinea",
  ];

  // const [secondsLeft, setSecondsLeft] = useState(30);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setSecondsLeft((prevSeconds) => {
  //       if (prevSeconds === 1) {
  //         navigate("/scheduledTournament");
  //         clearInterval(timer);
  //       }
  //       return prevSeconds - 1;
  //     });
  //   }, 1000);
  //   return () => clearInterval(timer);
  // }, [navigate]);


  const submitTournament = async () => {
    if (numMatches < 1) {
      alert("Number of matches should be greater than 0.");
      return;
    }

    const tournamentId = Math.floor(10000000 + Math.random() * 90000000);
    setTournamentId(tournamentId);
    const formDataObj = {
      tournamentId,
      tournamentName,
      selectedTournamentType,
      selectedDateRange,
      tournamentDetails: {
        selectedFormat,
        selectedTournamentFormat,
        overs,
        ballType,
        teamsDetails,
        numMatches,
        matchType,
      },
    };

    const success = await handleFormSubmission(formDataObj);
    if (success) {
      setShowSuccessPopup(true);
    }
  };

  const handleFormSubmission = async (formDataObj) => {
    const res = await createTournament(formDataObj);
    if (res.status === 200) {
      return true;
    }
    return false;
  };

  const handleClosePopup = () => {
    setShowSuccessPopup(false);
    navigate("/");
  };

  const handleSelect = (ranges) => {
    setSelectedDateRange([{ ...ranges.selection }]);
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!isRequired(tournamentName))
      newErrors.tournamentName = "Tournament name is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!isRequired(selectedFormat))
      newErrors.selectedFormat = "Match format is required.";
    if (!isRequired(selectedTournamentFormat))
      newErrors.selectedTournamentFormat = "Tournament format is required.";
    if (!isRequired(selectedTournamentType))
      newErrors.selectedTournamentType = "Tournament type is required.";
    if (!isValidOvers(overs)) newErrors.overs = "Invalid number of overs.";
    if (!isRequired(ballType)) newErrors.ballType = "Ball type is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors = {};

    if (!isRequired(currentTeam.teamName)) {
      newErrors.teamName = "Team name is required.";
    }
    if (!isNumber(currentTeam.numberOfPlayers)) {
      newErrors.numberOfPlayers = "Number of players should be a valid number.";
    }
    if (teamsDetails.length >= 16) {
      newErrors.teamLimit = "You can add a maximum of 16 teams.";
    }
    if (teamsDetails?.length > 0) {
      teamsDetails.forEach((team) => {
        if (team.teamName === currentTeam.teamName && selectedIndex === null) {
          newErrors.teamExists =
            "Team name already exists. Please choose another name.";
        }
      });
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    let valid = false;
    switch (currentStep) {
      case 0:
        valid = validateStep1();
        break;
      case 1:
        valid = validateStep2();
        break;
      case 2:
        valid = teamsDetails.length < 16 && teamsDetails.length > 0;
        break;
      case 3:
        valid = true;
        break;
      default:
        valid = true;
    }
    console.log(valid);
    if (valid) {
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep]);
      }
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleTeamSelect = (index) => {
    if (index === null) {
      setSelectedIndex(null);
      setCurrentTeam({
        teamName: "",
        numberOfPlayers: "",
        country: "",
      });
    } else {
      setSelectedIndex(index);
      setCurrentTeam(teamsDetails[index]);
    }
  };

  const handleInputChange = (field, value) => {
    setCurrentTeam((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTeamSubmit = (e) => {
    e.preventDefault();
    if (
      currentTeam.teamName &&
      currentTeam.numberOfPlayers &&
      currentTeam.country
    ) {
      if (selectedIndex !== null) {
        const updatedTeams = [...teamsDetails];
        updatedTeams[selectedIndex] = currentTeam;
        setTeamsDetails(updatedTeams);
      } else {
        setTeamsDetails((prev) => [...prev, currentTeam]);
      }
      setCurrentTeam({
        teamName: "",
        numberOfPlayers: "",
        country: "",
      });
      setSelectedIndex(null);
    }
    validateStep3();
  };

  const handleStepClick = (index) => {
    if (index <= currentStep || completedSteps.includes(index - 1)) {
      setCurrentStep(index);
    }
  };

  // const handleMatchChange = (index, value) => {
  //   const updatedMatches = [...scheduledMatches];
  //   updatedMatches[index].matchDate = value;
  //   setScheduledMatches(updatedMatches);
  // };

  // const addMatch = () => {
  //   setScheduledMatches([...scheduledMatches, { matchDate: "" }]);
  // };

  const steps = [
    {
      title: "Instructions",
      content: (
        <>
          <div className="flex flex-col items-start justify-start sm-custom:items-start">
            <h2 className="text-lg sm-custom:text-[1.5rem] font-bold text-gray-800 text-start">
              Instructions -
            </h2>
            <p className="text-gray-600 mt-4 text-lg leading-relaxed text-start">
              Excited to host your very own cricket tournament? Select formats,
              manage teams, define rules, create detailed schedules — get it all
              done in one place with our tournament organizer.
            </p>
            <p className="text-gray-600 mt-5 text-lg leading-relaxed text-start">
              Ready to dive in? Let’s begin by setting up the foundational
              details of your tournament. Just follow the guided steps to
              organize the tournament.
            </p>
            <div className="my-[2rem] flex justify-center items-center flex-col w-[100%] text-md">
              <h2 className="sm-custom:text-[1.5rem] font-bold text-gray-800 text-start">
                Enter Tournament/Series Name
              </h2>
              <input
                type="text"
                maxLength={50}
                placeholder={
                  errors.tournamentName
                    ? `${errors.tournamentName}`
                    : "Enter name here"
                }
                className={`mt-2 p-3 border-2 ${
                  errors.tournamentName &&
                  !isRequired(tournamentName) &&
                  "border-red-600"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-[50%] sm-custom:w-[100%] sm-custom:mt-3 text-md`}
                value={tournamentName}
                onChange={(e) => setTournamentName(e.target.value)}
              />
            </div>
            <div className="flex justify-center items-center w-[100%] flex-col">
              <button
                className="mt-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-500 transition-all duration-200"
                onClick={handleNext}
              >
                <span className="flex justify-center items-center">
                  Get Started <FiArrowRight className="inline ml-2" />
                </span>
              </button>
            </div>
          </div>
        </>
      ),
    },
    {
      title: "Select Match Format",
      content: (
        <div className="text-md">
          <h2 className="text-md sm-custom:text-[1.5rem] font-bold text-gray-800 text-start">
            Select Formats -
          </h2>
          <div className="flex justify-center items-center gap-[1rem] w-[100%]">
            <div className="flex-1">
              {errors.selectedTournamentFormat && !selectedTournamentFormat ? (
                <p className="text-red-600 mt-4 leading-relaxed text-start">
                  {errors.selectedTournamentFormat}
                </p>
              ) : (
                <p className="text-gray-600 mt-4 leading-relaxed text-start">
                  Choose the format of the tournament.
                </p>
              )}
              <select
                className={`mt-2 p-3 border-2 ${
                  errors.selectedTournamentFormat &&
                  !selectedTournamentFormat &&
                  "border-red-600"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-full`}
                value={selectedTournamentFormat}
                onChange={(e) => setSelectedTournamentFormat(e.target.value)}
              >
                <option value="">Select Tournament Format</option>
                {tournamentFormat.map((format, idx) => (
                  <option key={idx} value={format.toLowerCase()}>
                    {format}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              {errors.selectedTournamentType && !selectedTournamentType ? (
                <p className="text-red-600 mt-4 leading-relaxed text-start">
                  {errors.selectedTournamentType}
                </p>
              ) : (
                <p className="text-gray-600 mt-4 leading-relaxed text-start">
                  Choose the tournament type.
                </p>
              )}
              <select
                className={`mt-2 p-3 border-2 ${
                  errors.selectedTournamentType &&
                  !selectedTournamentType &&
                  "border-red-600"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-full`}
                value={selectedTournamentType}
                onChange={(e) => setSelectedTournamentType(e.target.value)}
              >
                <option value="">Select Tournament Type</option>
                {tournamentType.map((type, idx) => (
                  <option key={idx} value={type.toLowerCase()}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              {errors.selectedFormat && !selectedFormat ? (
                <p className="text-red-600 mt-4 leading-relaxed text-start">
                  {errors.selectedFormat}
                </p>
              ) : (
                <p className="text-gray-600 mt-4 leading-relaxed text-start">
                  Choose the format that suits your matches.
                </p>
              )}
              <select
                className={`mt-2 p-3 border-2 ${
                  errors.selectedFormat && !selectedFormat && "border-red-600"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-full`}
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value)}
              >
                <option value="">Select Match Format</option>
                {formats.map((format, idx) => (
                  <option key={idx} value={format.toLowerCase()}>
                    {format}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="my-[2rem]">
            <h2 className="text-md sm-custom:text-[1.5rem] font-bold text-gray-800 text-start">
              Match Rules in Tournament -
            </h2>
            <p className="text-gray-600 mt-4 leading-relaxed text-start">
              Set basic match rules like{" "}
              <span className={`${errors.overs && !overs && "text-red-600"}`}>
                {errors.overs && !overs ? "number of overs" : "overs"}
              </span>{" "}
              and{" "}
              <span
                className={`${errors.ballType && !ballType && "text-red-600"}`}
              >
                {errors.ballType && !ballType
                  ? "please select ball type"
                  : "ball type"}
              </span>
            </p>

            <div className="relative">
              <input
                type="number"
                onChange={(e) =>
                  e.target.value && e.target.value < 1
                    ? setOvers(1)
                    : setOvers(e.target.value)
                }
                placeholder="Number of Overs (e.g., 10, 20, 50)"
                className={`mt-2 p-3 border-2 ${
                  errors.overs && !overs && "border-red-600"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-full`}
                list="overs-list"
                value={overs}
              />
              <datalist id="overs-list">
                {oversOptions.map((overOption, idx) => (
                  <option key={idx} value={overOption}>
                    {overOption}
                  </option>
                ))}
              </datalist>
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Ball Type (e.g., Tennis, Leather)"
                className={`mt-2 p-3 border-2 ${
                  errors.ballType && !ballType && "border-red-600"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-full`}
                list="ball-type-list"
                value={ballType}
                onChange={(e) => setBallType(e.target.value)}
              />
              <datalist id="ball-type-list">
                {ballTypes.map((type, idx) => (
                  <option key={idx} value={type}>
                    {type} Ball
                  </option>
                ))}
              </datalist>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Add Team(s) Details",
      content: (
        <>
          <div>
            <h2 className="text-md sm-custom:text-[1.5rem] font-bold text-gray-800 text-start">
              Add Teams and their details -
            </h2>

            <div className="flex justify-start items-center text-sm m-[1rem] mb-[0.5rem]">
              <>
                {teamsDetails.map((team, index) => (
                  <div
                    key={index}
                    className={`mb-2 flex justify-center items-center flex-col`}
                    onClick={() => handleTeamSelect(index)}
                  >
                    <div
                      className={`border rounded-full shadow-sm ${
                        index === selectedIndex ? "bg-blue-600" : "bg-black"
                      } h-[2.8rem] m-[0.5rem] w-[2.8rem] cursor-pointer`}
                    ></div>
                    <p className="text-black text-center text-xs truncate">
                      {team.teamName || "N/A"}
                    </p>
                  </div>
                ))}
                <div
                  className={`mb-2 flex justify-center items-center flex-col`}
                  onClick={() => handleTeamSelect(null)}
                >
                  <div
                    className={`border rounded-full bg-gray-200 shadow-sm h-[2.8rem] m-[0.5rem] w-[2.8rem] cursor-pointer text-xl font-bold flex justify-center items-center`}
                  >
                    {" "}
                    +{" "}
                  </div>
                  <p className="text-black text-center text-xs truncate">
                    New Team
                  </p>
                </div>
              </>
            </div>

            <form onSubmit={handleTeamSubmit}>
              <div className="mb-4">
                <h1 className="w-[100%] text-start">
                  Enter basic team details to add a team.
                </h1>
                <div className="flex justify-center items-center gap-[1rem] ">
                  <input
                    type="text"
                    placeholder={
                      errors.teamName
                        ? `${errors.teamName}`
                        : "Enter team name here"
                    }
                    className={`mt-2 p-3 border-2 ${
                      errors.teamName &&
                      currentTeam.teamName.length < 1 &&
                      "border-red-600"
                    } mt-2 p-3 text-md border flex-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
                    value={currentTeam.teamName}
                    onChange={(e) =>
                      handleInputChange("teamName", e.target.value)
                    }
                  />
                  <input
                    type="number"
                    placeholder={
                      errors.numberOfPlayers
                        ? `${errors.numberOfPlayers}`
                        : "Number of Players"
                    }
                    className={`mt-2 p-3 border-2 ${
                      errors.numberOfPlayers &&
                      currentTeam.numberOfPlayers < 1 &&
                      "border-red-600"
                    } mt-2 p-3 text-md border flex-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
                    onChange={(e) =>
                      e.target.value && e.target.value < 1
                        ? handleInputChange("numberOfPlayers", 1)
                        : handleInputChange("numberOfPlayers", e.target.value)
                    }
                    value={currentTeam.numberOfPlayers}
                  />
                  <select
                    className="mt-2 p-3 text-md border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 flex-1"
                    value={currentTeam.country}
                    onChange={(e) =>
                      handleInputChange("country", e.target.value)
                    }
                  >
                    <option value="">Select Country (optional)</option>
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                  <div className="flex justify-center items-center max-w-fit">
                    <button
                      type="submit"
                      className="mt-2 p-3 py-2 h-[100%] bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-bg duration-200"
                    >
                      {selectedIndex !== null ? "Update Team" : "Add Team"}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </>
      ),
    },
    {
      title: "Schedule Tournament",
      content: (
        <>
          <div>
            <h2 className="text-md sm-custom:text-[1.5rem] font-bold text-gray-800 text-start">
              Schedule Tournament
            </h2>

            <div className="mt-4 w-[100%]">
              <DateRange
                ranges={selectedDateRange}
                onChange={handleSelect}
                moveRangeOnFirstSelection={false}
                showSelectionPreview={true}
                months={2}
                direction="horizontal"
                rangeColors={["#3b82f6"]}
              />
            </div>
          </div>
        </>
      ),
    },
    {
      title: "Review and Submit",
      content: (
        <>
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-md sm-custom:text-[1.5rem] font-bold text-gray-800 text-start">
              Review Your Tournament Details Once -
            </h2>

            <div className="flex gap-2 w-[80%] mt-10">
              <div className="mt-4 flex-1">
                <label
                  htmlFor="numMatches"
                  className="block text-gray-700 text-start"
                >
                  Number of Matches:
                </label>
                <input
                  type="number"
                  id="numMatches"
                  min="1"
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                  placeholder="Enter number of matches"
                  onChange={(e) => setNumMatches(e.target.value)}
                  required
                  value={numMatches}
                />
              </div>

              <div className="mt-4 flex-1">
                <label
                  htmlFor="matchType"
                  className="block text-gray-700 text-start"
                >
                  Match Type:
                </label>
                <select
                  id="matchType"
                  className="mt-1 p-3 border border-gray-300 rounded w-full"
                  onChange={(e) => setMatchType(e.target.value)}
                  value={matchType}
                >
                  <option value="day">Day Match</option>
                  <option value="night">Night Match</option>
                </select>
              </div>
            </div>

            <div className="m-4 mt-10 p-3 bg-yellow-100 border border-yellow-300 rounded-md">
              <p className="text-yellow-700 font-semibold">
                ⚠️ Please review all the details by going through all the steps
                of your tournament before submitting.
              </p>
            </div>
            <button
              className="mt-6 px-6 py-3 bg-blue-700 text-white font-semibold rounded-full shadow-lg hover:bg-black transition-all duration-200"
              onClick={submitTournament}
            >
              Create Tournament
            </button>
          </div>

          {showSuccessPopup && (
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
              <div className="bg-white p-16 w-[50%] rounded-lg shadow-lg text-center">
                {" "}
                <h2 className="text-2xl font-bold text-green-700 mb-4">
                  {" "}
                  Tournament Created Successfully!
                </h2>
                <p className="mb-4 text-lg">
                  {" "}
                  Click on Go to Scheduled Tournaments Button and you will be redirected to the Scheduled Tournaments page where you can schedule matches{" "}
                  {/* {secondsLeft} seconds... */}
                </p>
                <div className="flex justify-center gap-4 mt-4">
                  <button
                    className="px-6 py-3 bg-blue-600 text-white rounded-md shadow hover:bg-blue-800 transition-all"
                    onClick={() => navigate(`/scheduledTournament/${tournamentId}`)}
                  >
                    Go to Scheduled Tournaments
                  </button>
                  <button
                    className="px-6 py-3 bg-red-600 text-white rounded-md shadow hover:bg-red-800 transition-all"
                    onClick={handleClosePopup}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      ),
    },
  ];

  return (
    <div className="h-[100vh] w-screen flex justify-center items-center bg-dashboard-bg bg-cover bg-center">
      <div className="bg-green-100 backdrop-filter backdrop-blur-lg bg-opacity-60 overflow-hidden rounded-lg shadow-black-shadow h-[95%] w-[80%] sm-custom:w-[98%] sm-custom:h-[98%] flex flex-col justify-start items-center border border-white/40">
        <div className="flex w-[100%] px-10 m-6 sm-custom:px-3 sm-custom:m-3 sm-custom:justify-start sm-custom:items-center">
          <h1
            className="text-black text-lg font-semibold tracking-wide
               drop-shadow-lg shadow-white-900 sm-custom:text-lg sm-custom:mb-1"
          >
            <span className="flex justify-center items-center">
              <Link to="/" className="flex items-center">
                <FiArrowLeft className="inline mr-2" />
              </Link>
              Complete the Following Steps
            </span>
          </h1>
        </div>
        <div className="flex justify-center my-[1.5rem] sm-custom:my-[1rem] mx-[5rem] sm-custom:mx-[1rem]">
          {steps.map((step, index) => (
            <div
              key={index}
              className={
                "flex-1 text-center font-semibold mb-4 sm-custom:mb-2 "
              }
              onClick={() => handleStepClick(index)}
            >
              <div
                className={`w-16 h-16 sm-custom:h-8 sm-custom:w-8 mx-auto sm-custom:mx-5 rounded-full flex items-center justify-center cursor-pointer text-xl font-bold shadow-black-shadow
                  hover:shadow-xl hover:scale-105 transition-all duration-400 hover:bg-black hover:text-white
                  border border-gray-800
                  ${
                    index < currentStep || completedSteps.includes(index)
                      ? "bg-gray-900 text-white text-xl "
                      : index === currentStep
                      ? "bg-gray-300 text-blue-800"
                      : "bg-gray-300 text-gray-800"
                  }
                  ${
                    index > Math.max(...completedSteps, -1) + 1
                      ? "cursor-not-allowed opacity-50"
                      : ""
                  }`}
                onClick={
                  index <= Math.max(...completedSteps, -1) + 1
                    ? () => handleStepClick(index)
                    : null
                }
              >
                {completedSteps.includes(index) ? <FiCheckCircle /> : index + 1}
              </div>
              <p
                className={`mt-1 font-semibold p-5 sm-custom:p-1 sm-custom:text-[0.7rem] ${
                  index < currentStep || completedSteps.includes(index)
                    ? "text-black"
                    : "text-white text-shadow"
                }`}
              >
                {step.title}
              </p>
            </div>
          ))}
        </div>

        <div
          className="bg-white overflow-hidden flex-1 mb-[2rem] bg-opacity-80 backdrop-filter backdrop-blur-lg 
        rounded-xl w-[85%] sm-custom:w-[95%] sm-custom:mb-[0.5rem] p-6 overflow-y-auto no-scrollbar shadow-black-shadow"
        >
          <div className="flex-1 h-[85%] sm-custom:h-[90%]">
            {steps[currentStep].content}
          </div>
          <div className="mt-6 flex justify-end w-[100%] gap-4 text-sm">
            {currentStep > 0 && (
              <button
                className="px-3 py-2 bg-black text-white rounded-3xl hover:bg-gray-900 transition-all duration-200"
                onClick={handlePrevious}
              >
                <FiArrowLeft className="inline mr-2" /> Previous
              </button>
            )}

            {currentStep !== 0 && currentStep < steps.length - 1 ? (
              <button
                className="px-3 py-2 bg-white text-black rounded-3xl hover:bg-gray-300 transition-all duration-200"
                onClick={handleNext}
              >
                Next <FiArrowRight className="inline ml-2" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tournament;
