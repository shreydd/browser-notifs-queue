/* eslint-disable react/prop-types */
import { CircleDot, GitPullRequestArrow, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

export default function IssuesCard({ item }) {
  return (
    <div
      className="border shadow-sm rounded-md p-4 flex flex-col gap-3 hover:shadow-md"
      key={item?.id}
    >
      <div className="flex items-center gap-2">
        <span className="">
          {item?.html_url.includes("pull") ? (
            <GitPullRequestArrow size={16} color="#3fb950" />
          ) : (
            <CircleDot size={16} color="#3fb950" />
          )}
        </span>
        <Link to={item?.html_url} target="_blank" className="text-base hover:underline">
          {item?.title}
        </Link>
      </div>
      <div className="text-xs text-gray-500 flex gap-1 items-center mt-auto ">
        <span className="">#{item?.number}</span>
        <span>·</span>
        <Link to={item?.user?.html_url} target="_blank" className="hover:underline">{item?.user?.login}</Link>
      </div>
      <div className="flex flex-col gap-2">
        <hr />
        <div className="flex gap-2">
          <Link to={item?.comments_url} className="flex text-xs hover:bg-gray-200 py-1 px-2 bg-gray-100 rounded gap-1 items-center">
            <MessageSquare size={12} />
            <span>{item?.comments}</span>
          </Link>
          <div className="text-xs flex items-center">
            {item?.labels.map(item => (
              <span className="py-1 px-3 rounded-full bg-blue-400 text-white" key={item?.node_id}>{item?.name}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
