import { API_ENDPOINTS, api } from '../api/apiEndpoints';
import mockData from './mockData.json';

const getJobsData = (
	searchText: string,
	departmentIds?: number[] | null,
	locationIds?: number[] | null,
	functionIds?: number[] | null
) => {
	const jobsMockData = mockData.data;

	if (
		searchText === '' &&
		departmentIds === undefined &&
		locationIds === undefined &&
		functionIds === undefined
	)
		return Promise.resolve(jobsMockData);

	let filteredData = jobsMockData;
	if (searchText !== '')
		filteredData = filteredData.filter((item) =>
			item.title.toLowerCase().includes(searchText.toLowerCase())
		);

	if (departmentIds?.length)
		filteredData = filteredData.filter((item) =>
			departmentIds.includes(item.department.id)
		);

	if (locationIds?.length)
		filteredData = filteredData.filter((item) =>
			locationIds.includes(item.location.id)
		);

	if (functionIds?.length)
		filteredData = filteredData.filter((item) =>
			functionIds.includes(item.function.id)
		);

	return Promise.resolve(filteredData);
};

export class jobsService {
	public static async getAllJobs(
		searchText?: string,
		departmentIds?: number[] | null,
		locationIds?: number[] | null,
		functionIds?: number[] | null
	) {
		let data;
		try {
			const res = await api.get(
				`${API_ENDPOINTS.getAllJobs}?q=${searchText ? searchText : ''}${
					departmentIds?.length ? `&dept=${departmentIds}` : ''
				}${locationIds?.length ? `&loc=${locationIds}` : ''}${
					functionIds?.length ? `&fun=${functionIds}` : ''
				}`,
				{
					headers: {
						Accept: `application/json`,
					},
				}
			);
			data = res.data;
		} catch (e: any) {
			return e.response;
		}
		return data;
	}

	public static async getJobByID(jobId: number) {
		let data;
		try {
			const res = await api.get(`${API_ENDPOINTS.getAllJobs}/${jobId}`, {
				headers: {
					Accept: `application/json`,
				},
			});
			data = res.data;
		} catch (e: any) {
			return e.response;
		}
		return data;
	}

	public static async getAllMockJobs(
		searchText = '',
		departmentIds?: number[] | null,
		locationIds?: number[] | null,
		functionIds?: number[] | null
	) {
		const res = await getJobsData(
			searchText,
			departmentIds,
			locationIds,
			functionIds
		);
		return res;
	}

	public static async getMockJobByID(jobId: number) {
		return Promise.resolve(mockData.data.filter((job) => job.id === jobId));
	}

	public static async getAllDepartments() {
		let data;
		try {
			const res = await api.get(`${API_ENDPOINTS.departments}`, {
				headers: {
					Accept: `application/json`,
				},
			});
			data = res.data;
		} catch (e: any) {
			return e.response;
		}
		return data;
	}

	public static async getAllLocations() {
		let data;
		try {
			const res = await api.get(`${API_ENDPOINTS.locations}`, {
				headers: {
					Accept: `application/json`,
				},
			});
			data = res.data;
		} catch (e: any) {
			return e.response;
		}
		return data;
	}

	public static async getAllFunctions() {
		let data;
		try {
			const res = await api.get(`${API_ENDPOINTS.functions}`, {
				headers: {
					Accept: `application/json`,
				},
			});
			data = res.data;
		} catch (e: any) {
			return e.response;
		}
		return data;
	}
}
