import { useEffect, useState } from 'react';
import Search from '../components/Search';
import CustomDropDown from '../components/common/CustomDropDown';
import { jobsService } from '../services/jobs.service';
import { IFilterItem } from '../interfaces/jobsInterface';
import AppliedFilters from '../components/AppliedFilters';
import Jobs from '../components/Jobs';
import { CONSTANTS } from '../constants/constants';

const getInitialFilterState = () => {
	const retainedFilters = localStorage.getItem(CONSTANTS.FILTERS);
	if (retainedFilters) return JSON.parse(retainedFilters);
	return [];
};

const JobList = () => {
	const [departments, setDepartments] = useState([]);
	const [locations, setLocations] = useState([]);
	const [functions, setFunctions] = useState([]);
	const [searchText, setSearchText] = useState(
		localStorage.getItem(CONSTANTS.SEARCH_TEXT) ?? ''
	);
	const [filters, setFilters] = useState<IFilterItem[]>(
		getInitialFilterState()
	);
	const [isClearFilter, setIsClearFilter] = useState(false);

	useEffect(() => {
		loadListPage();
	}, []);

	useEffect(() => {
		localStorage.setItem(CONSTANTS.SEARCH_TEXT, searchText);
	}, [searchText]);

	useEffect(() => {
		localStorage.setItem(CONSTANTS.FILTERS, JSON.stringify(filters));
	}, [filters]);

	const loadListPage = async () => {
		const departmentsResp = await jobsService.getAllDepartments();
		const locationsResp = await jobsService.getAllLocations();
		const functionsResp = await jobsService.getAllFunctions();

		if (departmentsResp.length > 0) setDepartments(departmentsResp);
		if (locationsResp.length > 0) setLocations(locationsResp);
		if (functionsResp.length > 0) setFunctions(functionsResp);
	};

	return (
		<div className="m-auto w-9/12">
			<div className=" text-center py-2">
				<h2 className="text-3xl font-semibold pb-1 text-blue-900">
					Discover your next role
				</h2>
				<p className="font-light text-lg text-gray-700">
					We are looking for smart, talented professionals with an obsession for
					building quality software products.
				</p>
			</div>
			<div className="bg-gray-100">
				<div className="pt-6 py-3 m-auto w-9/12">
					<Search searchText={searchText} setSearchText={setSearchText} />
				</div>
				<div className="pt-3 pb-6 m-auto w-9/12 md:flex justify-between">
					<CustomDropDown
						name={CONSTANTS.DEPARTMENT}
						data={departments}
						filters={filters}
						setFilters={setFilters}
						isClearFilter={isClearFilter}
						setIsClearFilter={setIsClearFilter}
					/>
					<CustomDropDown
						name={CONSTANTS.LOCATION}
						data={locations}
						filters={filters}
						setFilters={setFilters}
						isClearFilter={isClearFilter}
						setIsClearFilter={setIsClearFilter}
					/>
					<CustomDropDown
						name={CONSTANTS.FUNCTION}
						data={functions}
						filters={filters}
						setFilters={setFilters}
						isClearFilter={isClearFilter}
						setIsClearFilter={setIsClearFilter}
					/>
				</div>
			</div>
			{filters.length > 0 ? (
				<div className="mt-4 bg-gray-100">
					<AppliedFilters
						filters={filters}
						setFilters={setFilters}
						setSearchText={setSearchText}
						setIsClearFilter={setIsClearFilter}
					/>
				</div>
			) : null}
			<div className="mt-4">
				<Jobs searchText={searchText} filters={filters} />
			</div>
		</div>
	);
};

export default JobList;
