import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface SearchProps {
	searchText: string;
	setSearchText: Dispatch<SetStateAction<string>>;
}

const Search = ({ searchText, setSearchText }: SearchProps) => {
	const [currentText, setCurrentText] = useState(searchText);
	const [showCancelBtn, setShowCancelBtn] = useState(false);

	useEffect(() => {
		setCurrentText(searchText);
	}, [searchText]);

	const onSubmit = (e: any) => {
		e.preventDefault();
		setSearchText(currentText);
	};

	return (
		<>
			<form
				onSubmit={onSubmit}
				onMouseEnter={() => setShowCancelBtn(true)}
				onMouseLeave={() => setShowCancelBtn(false)}
			>
				<div className="relative w-full">
					<input
						type="search"
						value={currentText}
						id="search-dropdown"
						className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 border-2 border-gray-200 focus:ring-blue-300 hover:border-gray-300 focus:border-blue-300 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
						placeholder="Search for job"
						onChange={(e: any) => setCurrentText(e.target.value)}
					/>
					{showCancelBtn ? (
						<button
							type="button"
							className="absolute top-0 end-0 mr-9 text-sm font-medium h-full text-white border-blue-700 dark:bg-blue-600"
							onClick={() => {
								setCurrentText('');
								setSearchText('');
							}}
						>
							<svg
								className="w-2.5 h-4"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 14 14"
							>
								<path
									stroke="grey"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
								/>
							</svg>
						</button>
					) : null}

					<button
						type="submit"
						className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white border-blue-700 dark:bg-blue-600 "
					>
						<svg
							className="w-4 h-4"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 20 20"
						>
							<path
								stroke="blue"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
							/>
						</svg>
					</button>
				</div>
			</form>
		</>
	);
};

export default Search;
