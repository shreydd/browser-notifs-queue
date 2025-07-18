import { useEffect, useState } from "react";
import { PER_PAGE_SIZE } from "../constants";
import IssuesCard from "./IssuesCard";
import fallbackIssues from "/fallbackIssues.json";

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

      if (response.status === 403) {
        console.warn(
          "GitHub API rate limit hit (403). Loading from local JSON."
        );
        setIssues(fallbackIssues);
        setLoadingError(false);
      } else if (!response.ok) {
        // Handle other non-OK responses (e.g., 404, 500)
        const errorData = await response.json();
        console.log("🚀 ~ getIssuesData ~ errorData:", errorData)
      } else {
        const json = await response.json();
        console.log("🚀 ~ getIssuesData ~ json:", json);
        setIssues(json);
        setLoadingError(false); // Reset any previous error state
      }
    } catch (err) {
      console.error("Error fetching issues:", err);
      setLoadingError(true); // Indicate that an error occurred
      // You might still want to load from local JSON here if the fetch itself fails
      // For example, if there's a network error before even getting a 403 status
      console.warn("Loading from local JSON due to fetch error.");
      setIssues(fallbackIssues);
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

  if (isLoading) return <>loading...</>;
  if (loadingError) return <>loading error...</>;

  return (
    <main className="max-w-7xl mx-auto p-4">
      <h1 className="mb-10 font-bold underline">
        Github issues on React.js repo
      </h1>
      <div className="grid grid-cols-1 md:grid-col-2 xl:grid-cols-3 gap-4">
        {Array.isArray(issues) &&
          issues.map((item) => <IssuesCard key={item?.id} item={item} />)}
      </div>
      <div className="flex mt-10 justify-between text-sm">
        <button
          className="disabled:text-gray-300 cursor-pointer disabled:cursor-not-allowed"
          disabled={pageNumber === 1}
          onClick={() => handlePrevious()}
        >
          Previous
        </button>
        <div className="p-2">Page: {pageNumber}</div>
        <button
          className="cursor-pointer disabled:cursor-not-allowed"
          onClick={() => handleNext()}
        >
          Next
        </button>
      </div>
    </main>
  );
}
