import { useEffect, useState } from "react";
import { PER_PAGE_SIZE } from "../constants";
import IssuesCard from "./IssuesCard";
import { CircleChevronLeft, CircleChevronRight } from "lucide-react";
import Loader from "./Loader";

export default function IssuesTracker() {
  const [issues, setIssues] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  async function getIssuesData() {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://api.github.com/repos/facebook/react/issues?page=${pageNumber}&per_page=${PER_PAGE_SIZE}`
      );
      if (!response.ok) {
        const errorData = await response.json();
        console.log("🚀 ~ getIssuesData ~ errorData:", errorData);
        setLoadingError(true);
      } else {
        const jsonData = await response.json();
        setIssues(jsonData);
        setLoadingError(false);
      }
    } catch (err) {
      console.error("Error fetching issues:", err);
      setLoadingError(true);
      console.warn("Loading from local JSON due to fetch error.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleNext() {
    if (pageNumber >= 1) {
      setPageNumber((prev) => prev + 1);
    }
  }

  function handlePrevious() {
    if (pageNumber > 1) {
      setPageNumber((prev) => prev - 1);
    }
  }

  useEffect(() => {
    getIssuesData();
  }, [pageNumber]);

  if (loadingError)
    return (
      <p className="text-red-400 text-center">
        Oops! please check back later we have an error
      </p>
    );

  return (
    <main className="max-w-7xl mx-auto p-4 mt-6">
      <h1 className="mb-6 text-center font-bold text-xl">
        Github issues on React.js
      </h1>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-col-2 xl:grid-cols-3 gap-4">
            {Array.isArray(issues) &&
              issues.map((item) => <IssuesCard key={item?.id} item={item} />)}
          </div>
          <div className="flex mt-12 justify-center gap-3 items-center text-gray-500 text-xs">
            <button
              className="disabled:text-gray-300 cursor-pointer disabled:cursor-not-allowed"
              disabled={pageNumber === 1}
              onClick={() => handlePrevious()}
            >
              <CircleChevronLeft size={20} />
            </button>
            <div className="p-2">Page: {pageNumber}</div>
            <button
              className="cursor-pointer disabled:cursor-not-allowed"
              onClick={() => handleNext()}
            >
              <CircleChevronRight size={20} />
            </button>
          </div>
        </>
      )}
    </main>
  );
}
