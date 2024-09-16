import { useState } from "react";
import { FiArrowRight, FiArrowLeft, FiCheckCircle } from "react-icons/fi";

const Tournament = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);

  const handleNext = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleStepClick = (index) => {
    if (index <= currentStep || completedSteps.includes(index - 1)) {
      setCurrentStep(index);
    }
  };

  const steps = [
    {
      title: "Introduction",
      content: (
        <>
          <h2 className="text-3xl sm:text-lg font-bold">
            Welcome to Tournament Organizer
          </h2>
          <p className="text-gray-600 mt-4 text-lg leading-relaxed">
            Ready to organize your cricket tournament? Follow these simple steps
            to set up your tournament’s format, teams, rules, and schedule.
            We’ll guide you through the entire process.
          </p>
          <button
            className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-500 transition-all duration-200"
            onClick={() => handleNext()}
          >
            Lets Start
          </button>
        </>
      ),
    },
    {
      title: "Step 1: Select Tournament Format",
      content: (
        <>
          <h2 className="text-2xl font-bold text-accent">
            Select Tournament Format
          </h2>
          <p className="text-gray-500 mt-2 mb-4">
            Choose the format that suits your tournament. Learn more about
            formats by hovering over the options.
          </p>
          <select className="mt-2 p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option value="">Select Format</option>
            <option
              value="knockout"
              title="Single elimination, where teams are eliminated after one loss."
            >
              One Day
            </option>
            <option
              value="roundrobin"
              title="Every team plays every other team."
            >
              T20i
            </option>
            <option
              value="hybrid"
              title="Combination of knockout and round-robin formats."
            >
              Test Match
            </option>
          </select>
        </>
      ),
    },
    {
      title: "Step 2: Add Team Details",
      content: (
        <>
          <h2 className="text-2xl font-bold text-black">Add Team Details</h2>
          <p className="text-white mt-2 mb-4">
            Provide team names and captains. You can add up to 16 teams.
          </p>
          <input
            type="text"
            placeholder="Team Name"
            className="mt-2 p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Captain Name"
            className="mt-2 p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button className="mt-4 text-blue-600 underline">
            + Add Another Team
          </button>
        </>
      ),
    },
    {
      title: "Step 3: Set Match Rules and Regulations",
      content: (
        <>
          <h2 className="text-2xl font-bold text-accent">
            Match Rules and Regulations
          </h2>
          <p className="text-gray-500 mt-2 mb-4">
            Set basic match rules like overs, umpire details, and ball type.
          </p>
          <input
            type="number"
            placeholder="Number of Overs (e.g., 20)"
            className="mt-2 p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Ball Type (e.g., Tennis, Leather)"
            className="mt-2 p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </>
      ),
    },
    {
      title: "Step 4: Schedule Matches",
      content: (
        <>
          <h2 className="text-2xl font-bold text-accent">Schedule Matches</h2>
          <p className="text-gray-500 mt-2 mb-4">
            Select the date and time for each match. You can add multiple
            matches here.
          </p>
          <input
            type="datetime-local"
            className="mt-2 p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button className="mt-4 text-blue-600 underline">
            + Add Another Match
          </button>
        </>
      ),
    },
    {
      title: "Review and Submit",
      content: (
        <>
          <h2 className="text-2xl font-bold text-accent">
            Review Your Tournament Details
          </h2>
          <p className="text-gray-600 mt-2 leading-relaxed">
            All the details will be displayed here for final review.
            Double-check your tournament info before submitting.
          </p>
          <button
            className="mt-6 px-6 py-3 bg-green-600 text-white font-semibold rounded-full shadow-lg hover:bg-green-500 transition-all duration-200"
            onClick={() => alert("Tournament Submitted!")}
          >
            Submit Tournament
          </button>
        </>
      ),
    },
  ];

  return (
    <div className="h-[100vh] w-screen flex justify-center items-center bg-dashboard-bg bg-cover bg-center">
      <div className="bg-white overflow-hidden bg-opacity-15 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg h-[95%] w-[80%] sm-custom:w-[95%] flex flex-col justify-start items-center border border-white/40">
        <div className="flex w-[100%] px-10 m-6 sm-custom:justify-center sm-custom:items-center">
          <h1
            className="text-gray-200 text-lg font-semibold tracking-wide
               drop-shadow-lg shadow-white-900 mb- sm-custom:text-lg sm-custom:mb-2"
          >
            Completing the Following Steps
          </h1>
        </div>
        <div className="flex flex-wrap justify-center my-[3rem] sm-custom:my-[1rem] mx-[5rem] sm-custom:mx-[1rem]">
          {steps.map((step, index) => (
            <div
              key={index}
              className={
                "flex-1 text-center font-semibold mb-4 sm-custom:mb-2 "
              }
              onClick={() => handleStepClick(index)}
            >
              <div
                className={`w-16 h-16 sm-custom:h-10 sm-custom:w-10 mx-auto sm-custom:mx-10 rounded-full flex items-center justify-center cursor-pointer text-lg ${
                  index < currentStep || completedSteps.includes(index)
                    ? "bg-blue-600 text-white"
                    : index === currentStep
                    ? "bg-gray-300 text-black"
                    : "bg-gray-300 text-gray-700"
                }`}
              >
                {completedSteps.includes(index) ? <FiCheckCircle /> : index + 1}
              </div>
              <p
                className={`mt-1 font-semibold p-5 sm-custom:p-1 sm-custom:text-[0.5rem] ${
                  index < currentStep || completedSteps.includes(index)
                    ? "text-blue-600"
                    : "text-white"
                }`}
              >
                {step.title}
              </p>
            </div>
          ))}
        </div>

        <div className="w-[85%]">{steps[currentStep].content}</div>

        <div className="mt-6 flex justify-between w-[85%]">
          {currentStep > 0 && (
            <button
              className="px-6 py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-all duration-200"
              onClick={handlePrevious}
            >
              <FiArrowLeft className="inline mr-2" /> Previous
            </button>
          )}

          {currentStep !== 0 && currentStep < steps.length - 1 ? (
            <button
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all duration-200"
              onClick={handleNext}
            >
              Next <FiArrowRight className="inline ml-2" />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Tournament;
