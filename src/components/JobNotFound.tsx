import { Link } from 'react-router-dom';

const JobNotFound = () => {
	return (
		<div className="text-center">
			<div className="bg-blue-400 text-white  text-[200px] p-4 font-semibold">
				404
			</div>
			<p className="text-blue-900	text-4xl p-6">Oops.. Job Not Found!</p>
			<p className="text-blue-800 text-2xl pb-4 mb-2">
				Looks like the Job you're trying to visit is inactive.
			</p>
			<Link
				to="/"
				className="bg-blue-500 text-white border-[1px] border-blue-600 hover:bg-blue-700 font-medium text-sm px-4 py-2 text-center"
			>
				Job Openings
			</Link>
		</div>
	);
};

export default JobNotFound;
