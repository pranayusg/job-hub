import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { jobsService } from '../services/jobs.service';
import { IJobItem } from '../interfaces/jobsInterface';
import DisplayJobDetails from '../components/DisplayJobDetails';
import PageNotFound from '../components/common/PageNotFound';
import { CONSTANTS } from '../constants/constants';

const JobDetails = () => {
	let { jobId } = useParams();
	const [details, setDetails] = useState<IJobItem>(CONSTANTS.INITIAL_JOB_ITEM);
	const [jobsFromSameDepartment, setJobsFromSameDepartment] = useState<
		IJobItem[]
	>([]);

	useEffect(() => {
		loadJobDetails();
	}, [jobId]);

	const loadJobDetails = async () => {
		if (jobId && !isNaN(Number(jobId))) {
			const jobsResp = await jobsService.getJobByID(Number(jobId));
			const mockJobsResp = await jobsService.getMockJobByID(Number(jobId));
			if (mockJobsResp.length) {
				setDetails(mockJobsResp[0]);
				const jobsAll = await jobsService.getAllJobs();
				const mockJobsAll = await jobsService.getAllMockJobs();
				if (mockJobsAll.length)
					setJobsFromSameDepartment(
						mockJobsAll.filter(
							(job) =>
								job.department.id === mockJobsResp[0].department.id &&
								job.id !== mockJobsResp[0].id
						)
					);
			}
		}
	};

	return (
		<div>
			{details.id !== 0 ? (
				<DisplayJobDetails
					details={details}
					jobsFromSameDepartment={jobsFromSameDepartment}
				/>
			) : (
				<PageNotFound isInvalidRoute={false} />
			)}
		</div>
	);
};

export default JobDetails;
