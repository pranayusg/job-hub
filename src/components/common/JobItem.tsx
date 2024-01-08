import { useEffect, useState } from 'react';
import { IJobItem } from '../../interfaces/jobsInterface';
import { useNavigate, useLocation } from 'react-router-dom';

interface JobItemProps {
	jobDetails: IJobItem;
}

const JobItem = ({ jobDetails }: JobItemProps) => {
	const [filteredJob, setFilteredJob] = useState<IJobItem>(jobDetails);
	const [isDetailsPage, setIsDetailsPage] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (location.pathname.includes('details')) setIsDetailsPage(true);
	}, []);

	useEffect(() => {
		setFilteredJob(jobDetails);
	}, [jobDetails]);

	return (
		<div className="flex justify-between mb-4 hover:bg-gray-100 p-1.5">
			<div>
				<h1 className="text-lg font-medium">{filteredJob.title}</h1>
				<div className="flex text-base ">
					<div className="mr-2 flex ">
						<svg
							className="w-5 h-4 text-gray-600 mt-1"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 18 18"
						>
							<path
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M3 1h12M3 1v16M3 1H2m13 0v16m0-16h1m-1 16H3m12 0h2M3 17H1M6 4h1v1H6V4Zm5 0h1v1h-1V4ZM6 8h1v1H6V8Zm5 0h1v1h-1V8Zm-3 4h2a1 1 0 0 1 1 1v4H7v-4a1 1 0 0 1 1-1Z"
							/>
						</svg>
						{filteredJob.department.title}
					</div>

					<div className="flex mr-2">
						<svg
							className="w-5 h-4 text-gray-600 mt-0.5"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 17 21"
						>
							<g
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
							>
								<path d="M8 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
								<path d="M13.8 12.938h-.01a7 7 0 1 0-11.465.144h-.016l.141.17c.1.128.2.252.3.372L8 20l5.13-6.248c.193-.209.373-.429.54-.66l.13-.154Z" />
							</g>
						</svg>
						{filteredJob.location.title}
					</div>
					{!isDetailsPage ? (
						<span className="bg-gray-200 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded">
							{filteredJob.type}
						</span>
					) : null}
				</div>
			</div>
			{!isDetailsPage ? (
				<div className="flex gap-2">
					<button
						type="button"
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							window.open(filteredJob.applyUrl, '_blank');
						}}
						className="bg-white text-blue-600 border-[1px] border-blue-600 hover:text-white hover:bg-blue-500 font-medium rounded-full text-sm px-4 py-2 text-center mb-2"
					>
						Apply
					</button>
					<button
						type="button"
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							navigate(`/details/${filteredJob.id}`);
						}}
						className="bg-white text-gray-600 border-[1px] border-gray-400 hover:text-white hover:bg-gray-400 font-medium rounded-full text-sm px-4 py-2 text-center mb-2"
					>
						View
					</button>
				</div>
			) : null}
		</div>
	);
};

export default JobItem;
