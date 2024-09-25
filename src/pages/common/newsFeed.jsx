import { fetchCricbuzzNews } from "../../utils/API/fetch";
import { useState, useEffect } from "react";

const NewsFeed = () => {
  const [feedData, setFeedData] = useState(null);

  const fetchFeed = async () => {
    const data = await fetchCricbuzzNews();
    setFeedData(data);
    console.log(data);
  };

  // const fetchImage = async () => {
  //   const res = await fetchImageById(549922); // Assuming imageId = 549922
  // };

  useEffect(() => {
    fetchFeed();
    // fetchImage();
  }, []);

  if (!feedData) {
    return (
      <div className="bg-white rounded-xl my-[1rem] p-[2rem] sm-custom:p-[1rem] shadow-md sm-custom:m-[1rem] h-[100vh] overflow-y-scroll">
        <h1 className="w-[100%] flex font-semibold text-lg border-b-2 mb-[1rem]">
          Featured News
        </h1>
        <div>Loading...</div>;
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl my-[1rem] p-[2rem] sm-custom:p-[1rem] shadow-md sm-custom:m-[1rem] h-[100vh] overflow-y-scroll">
      <h1 className="w-[100%] flex font-semibold text-lg border-b-2 mb-[1rem]">
        Featured News
      </h1>
      {feedData.storyList.map(
        (item, index) =>
          item?.story && (
            <div
              key={index}
              className="flex sm-custom:flex-col mb-[2rem] bg-gray-100 rounded-xl"
            >
              {/* <div className="w-[30%] mb-[0.5rem] p-2 flex justify-center items-center">
                <img
                  src={imageUrl}
                  className="h-fit w-fit object-cover rounded-lg"
                />
              </div> */}

              <div className="flex-1 sm-custom::pl-[1.5rem] text-start p-4">
                <h2 className="font-semibold text-md mb-[0.5rem]">
                  {item?.story?.hline}
                </h2>
                <p className="text-sm text-gray-700 mb-[0.5rem]">
                  {item?.story?.intro}
                </p>
                {/* <p className="text-xs text-gray-500">
                  {new Date(item?.story?.pubTime * 1000).toLocaleDateString(
                    "en-GB",
                    {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    }
                  )}
                </p> */}
              </div>
            </div>
          )
      )}
    </div>
  );
};

export default NewsFeed;
