import { Link } from 'react-router-dom';
import { IJobItem } from '../interfaces/jobsInterface';
import JobItem from './common/JobItem';

interface DisplayJobDetailsProps {
	details: IJobItem;
	jobsFromSameDepartment: IJobItem[];
}

const DisplayJobDetails = ({
	details,
	jobsFromSameDepartment,
}: DisplayJobDetailsProps) => {
	return (
		<div>
			<div className="bg-blue-500 text-white mb-6">
				<div className="text-4xl p-4 text-center">{details.title}</div>
				<div className="2xl:flex 2xl:gap-2 text-base p-2 text-2xl m-auto w-6/12 sm:w-3/12 2xl:w-4/12 2xl:pl-24 lg:pl-16">
					<div className="flex p-1">
						<svg
							className="w-6 h-4 text-gray-600 mt-1"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 18 18"
						>
							<path
								stroke="white"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M3 1h12M3 1v16M3 1H2m13 0v16m0-16h1m-1 16H3m12 0h2M3 17H1M6 4h1v1H6V4Zm5 0h1v1h-1V4ZM6 8h1v1H6V8Zm5 0h1v1h-1V8Zm-3 4h2a1 1 0 0 1 1 1v4H7v-4a1 1 0 0 1 1-1Z"
							/>
						</svg>
						{details.department.title}
					</div>
					<div className="flex mr-2 p-1">
						<svg
							className="w-5 h-4 text-gray-600 mt-0.5"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 17 21"
						>
							<g
								stroke="white"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
							>
								<path d="M8 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
								<path d="M13.8 12.938h-.01a7 7 0 1 0-11.465.144h-.016l.141.17c.1.128.2.252.3.372L8 20l5.13-6.248c.193-.209.373-.429.54-.66l.13-.154Z" />
							</g>
						</svg>
						{details.location.title}
					</div>
					<span className="border-2 bg-blue-500 text-white text-sm px-2.5 py-0.5 rounded uppercase">
						{details.type}
					</span>
				</div>
			</div>
			<div className="m-auto w-9/12 gap-2 flex mb-8">
				<div
					className="basis-4/5"
					dangerouslySetInnerHTML={{ __html: details.description }}
				/>
				<div>
					<Link
						to={details.applyUrl}
						target="_blank"
						className="block w-full bg-blue-500 text-white border-[1px] border-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-4 py-3 text-center mb-8"
					>
						Apply for this position
					</Link>
					{jobsFromSameDepartment.length ? (
						<div className="bg-blue-100 p-4 mb-4">
							<h1 className="text-lg font-semibold uppercase">
								Other Job Openings
							</h1>
							<hr className="border-2 border-blue-500 w-[15%] bg-blue-900 text-blue-800 my-2" />
							{jobsFromSameDepartment.map((job, index) => (
								<div key={index}>
									<Link to={{ pathname: `/details/${job.id}` }}>
										<JobItem jobDetails={job} />
									</Link>
								</div>
							))}
						</div>
					) : null}
					<div className="p-4">
						<h1 className="text-lg font-semibold uppercase">
							Share Job Openings
						</h1>
						<hr className="border-2 border-blue-500 w-[15%] bg-blue-900 text-blue-800 my-2" />
						<div className="flex gap-2 justify-center mb-2 mt-3">
							<button
								type="button"
								className="rounded-full border-[1px] p-2 border-black hover:bg-gray-300"
							>
								<svg
									className="w-6 h-5 text-gray-800 dark:text-white"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									viewBox="0 0 8 19"
								>
									<path
										fillRule="evenodd"
										d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
										clipRule="evenodd"
									/>
								</svg>
							</button>
							<button
								type="button"
								className="rounded-full border-[1px] p-2 border-black hover:bg-gray-300"
							>
								<svg
									className="w-6 h-5 text-gray-800 dark:text-white"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									viewBox="0 0 15 15"
								>
									<path
										fillRule="evenodd"
										d="M7.979 5v1.586a3.5 3.5 0 0 1 3.082-1.574C14.3 5.012 15 7.03 15 9.655V15h-3v-4.738c0-1.13-.229-2.584-1.995-2.584-1.713 0-2.005 1.23-2.005 2.5V15H5.009V5h2.97ZM3 2.487a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
										clipRule="evenodd"
									/>
									<path d="M3 5.012H0V15h3V5.012Z" />
								</svg>
							</button>
							<button
								type="button"
								className="rounded-full border-[1px] p-2 border-black hover:bg-gray-300"
							>
								<svg
									className="w-6 h-5 text-gray-800 dark:text-white"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 20 20"
								>
									<path
										fill="currentColor"
										d="M12.186 8.672 18.743.947h-2.927l-5.005 5.9-4.44-5.9H0l7.434 9.876-6.986 8.23h2.927l5.434-6.4 4.82 6.4H20L12.186 8.672Zm-2.267 2.671L8.544 9.515 3.2 2.42h2.2l4.312 5.719 1.375 1.828 5.731 7.613h-2.2l-4.699-6.237Z"
									/>
								</svg>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DisplayJobDetails;
