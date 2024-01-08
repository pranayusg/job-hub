import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { IFilterItem, ILookupItem } from '../../interfaces/jobsInterface';

interface CustomDropDownProps {
	name: string;
	data: ILookupItem[];
	filters: IFilterItem[];
	setFilters: Dispatch<SetStateAction<IFilterItem[]>>;
	isClearFilter: boolean;
	setIsClearFilter: Dispatch<SetStateAction<boolean>>;
}

const CustomDropDown = ({
	name,
	data,
	filters,
	setFilters,
	isClearFilter,
	setIsClearFilter,
}: CustomDropDownProps) => {
	const [searchText, setSearchText] = useState('');
	const [isListOpen, setIsListOpen] = useState(false);
	const [filteredData, setFilteredData] = useState(data);
	let dropdownRef = useRef(null);

	useEffect(() => {
		const handler = (e: any) => {
			if (!(dropdownRef.current as any).contains(e.target))
				setIsListOpen(false);
		};
		document.addEventListener('mousedown', handler);

		return () => {
			document.removeEventListener('mousedown', handler);
		};
	});

	useEffect(() => {
		if (isClearFilter) {
			setSearchText('');
			setIsClearFilter(false);
		}
	}, [isClearFilter]);

	useEffect(() => {
		if (searchText === '') setFilteredData(data);
		else
			setFilteredData(
				data.filter((item) =>
					item.title
						.toLocaleLowerCase()
						.includes(searchText.toLocaleLowerCase())
				)
			);
	}, [data, searchText]);

	const onSelect = (lookupItem: ILookupItem) => {
		setIsListOpen(false);

		const isExistsInFilters = filters.some(
			(filter) => filter.type === name && filter.id === lookupItem.id
		);

		if (isExistsInFilters) {
			setFilters((currentFilter) =>
				currentFilter.filter((item) => {
					if (item.type === name && item.id === lookupItem.id) return false;
					return true;
				})
			);
		} else setFilters([...filters, { ...lookupItem, type: name }]);
	};

	const isSelected = (item: ILookupItem): boolean => {
		return filters.some(
			(filter) => filter.type === name && filter.id === item.id
		);
	};

	return (
		<div
			ref={dropdownRef}
			className="relative mb-2 2xl:w-[280px] xl:w-[235px] lg:w-[188px] md:w-[138px]"
		>
			<input
				type="search"
				id="dropdownDefaultButton"
				value={searchText}
				className="cursor-pointer w-full bg-gray-50 px-5 py-2.5 text-sm text-gray-900 bg-gray-50 border-2 border-gray-200 focus:ring-blue-300 hover:border-gray-300 focus:border-blue-300 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
				onClick={() => {
					if (isListOpen === false) setIsListOpen(true);
				}}
				onChange={(e: any) => setSearchText(e.target.value)}
				placeholder={name}
			/>

			{isListOpen ? (
				<svg
					className="w-2.5 h-2.5 ms-3 absolute top-4 end-3"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 10 6"
				>
					<path
						stroke="grey"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="m1 1 4 4 4-4"
					/>
				</svg>
			) : (
				<svg
					className="w-2.5 h-2.5 ms-3 absolute top-4 end-3"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 8 14"
				>
					<path
						stroke="grey"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"
					/>
				</svg>
			)}

			{isListOpen ? (
				<div id="dropdown" className="w-full absolute bg-white shadow-lg z-10">
					{filteredData.length > 0 ? (
						filteredData.map((item) => (
							<button
								key={item.id}
								className={`block w-full text-left p-2 text-sm text-gray-700 dark:text-gray-200  ${
									isSelected(item) ? 'bg-blue-100' : 'hover:bg-gray-100'
								}`}
								aria-labelledby="dropdownDefaultButton"
								onClick={() => {
									onSelect(item);
								}}
							>
								{item.title}
							</button>
						))
					) : (
						<div className="block w-full text-left p-4 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100">
							No data found
						</div>
					)}
				</div>
			) : null}
		</div>
	);
};

export default CustomDropDown;
