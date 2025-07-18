/* eslint-disable react/prop-types */
import { CircleDot } from "lucide-react";
import { Link } from "react-router-dom";

export default function IssuesCard({ item }) {
  return (
    <div
      className="border shadow-sm rounded-md p-4 flex flex-col gap-3"
      key={item?.id}
    >
      <div className="flex items-center gap-2">
        <CircleDot size={16} color="#3fb950" />
        <h6 className="text-base font-medium">{item?.title}</h6>
      </div>
      <div className="">
        <p className="text-sm text-gray-500">#{item?.number}</p>
      </div>
      <hr />
      <div className="flex flex-wrap gap-2">
        <Link to={item?.html_url} className="">
          {" "}
          pull request
        </Link>
        <Link to={item?.comments_url}>Comments</Link>
      </div>
    </div>
  );
}
