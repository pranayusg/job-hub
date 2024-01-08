import { useEffect, useState } from 'react';
import { IFilterItem, IJobItem } from '../interfaces/jobsInterface';
import { jobsService } from '../services/jobs.service';
import { CONSTANTS } from '../constants/constants';
import JobItem from './common/JobItem';
import { Link } from 'react-router-dom';

interface JobsProps {
	searchText: string;
	filters: IFilterItem[];
}

const Jobs = ({ searchText, filters }: JobsProps) => {
	const [filteredJobs, setFilteredJobs] = useState<IJobItem[]>([]);
	const [departments, setDepartments] = useState<string[]>([]);

	useEffect(() => {
		getFilteredJobs();
	}, [searchText, filters]);

	useEffect(() => {
		setDepartments(
			Array.from(
				new Set(filteredJobs.map((filteredJob) => filteredJob.department.title))
			)
		);
	}, [filteredJobs]);

	const getFilteredJobs = async () => {
		const departmentIds = filters
			.filter((filter) => filter.type === CONSTANTS.DEPARTMENT)
			.map((department) => department.id);

		const locationsIds = filters
			.filter((filter) => filter.type === CONSTANTS.LOCATION)
			.map((department) => department.id);

		const functionIds = filters
			.filter((filter) => filter.type === CONSTANTS.FUNCTION)
			.map((department) => department.id);

		const jobsResp = await jobsService.getAllJobs(
			searchText,
			departmentIds,
			locationsIds,
			functionIds
		);

		const jobsMockResp = await jobsService.getAllMockJobs(
			searchText,
			departmentIds,
			locationsIds,
			functionIds
		);

		setFilteredJobs(jobsMockResp);
	};

	return (
		<div>
			{departments.length ? (
				departments.map((department, index) => (
					<div key={index} className="mb-7">
						<div className="mb-4">
							<h1 className="text-xl font-semibold">{department}</h1>
							<hr className="border-2 border-blue-500 w-[8%] bg-blue-900 text-blue-800 my-2" />
						</div>
						{filteredJobs
							.filter(
								(filteredJob) => filteredJob.department.title === department
							)
							.map((job, index) => (
								<div key={index}>
									<Link to={`/details/${job.id}`}>
										<JobItem jobDetails={job} />
									</Link>
								</div>
							))}
					</div>
				))
			) : (
				<div className="text-2xl text-gray-600 text-center p-6">
					No Current Openings
				</div>
			)}
		</div>
	);
};

export default Jobs;
