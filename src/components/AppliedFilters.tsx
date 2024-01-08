import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { IFilterItem } from '../interfaces/jobsInterface';

interface FiltersProps {
	filters: IFilterItem[];
	setFilters: Dispatch<SetStateAction<IFilterItem[]>>;
	setSearchText: Dispatch<SetStateAction<string>>;
	setIsClearFilter: Dispatch<SetStateAction<boolean>>;
}

const AppliedFilters = ({
	filters,
	setFilters,
	setSearchText,
	setIsClearFilter,
}: FiltersProps) => {
	const [groupedFilters, setGroupedFilters] = useState<IFilterItem[]>(filters);

	useEffect(() => {
		setGroupedFilters(filters);
	}, [filters]);

	const removeItem = (item: IFilterItem) => {
		setFilters((currentFilter) =>
			currentFilter.filter((filterItem) => {
				if (filterItem.type === item.type && filterItem.id === item.id)
					return false;
				return true;
			})
		);
	};

	return (
		<div className="p-4 flex ">
			<div className="basis-11/12">
				{groupedFilters.map((groupedFilter, index) => (
					<span
						key={index}
						id="badge-dismiss-default"
						className="inline-flex items-center px-2 py-1 m-0.5 text-sm bg-white dark:bg-blue-900 dark:text-blue-300"
					>
						{groupedFilter.title}
						<button
							type="button"
							className="inline-flex items-center p-1 ms-2 text-sm text-blue-400 bg-transparent rounded-sm hover:bg-blue-200 hover:text-blue-900 dark:hover:bg-blue-800 dark:hover:text-blue-300"
							aria-label="Remove"
							onClick={() => {
								removeItem(groupedFilter);
							}}
						>
							<svg
								className="w-2 h-2"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 14 14"
							>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
								/>
							</svg>
							<span className="sr-only">Remove badge</span>
						</button>
					</span>
				))}
			</div>
			<div>
				<button
					type="button"
					className="text-sm text-blue-400 hover:text-blue-700"
					aria-label="Remove"
					onClick={() => {
						setFilters([]);
						setSearchText('');
						setIsClearFilter(true);
					}}
				>
					Clear All
				</button>
			</div>
		</div>
	);
};

export default AppliedFilters;
