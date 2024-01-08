export interface ILookupItem {
	id: number;
	title: string;
}

export interface IFilterItem {
	id: number;
	title: string;
	type: string;
}

export interface IJobItem {
	id: number;
	code: string;
	title: string;
	description: any;
	type: string;
	positions: number;
	experience: string;
	salary: string;
	industry: string;
	location: {
		id: number;
		title: string;
		city: string;
		state: string;
		country: string;
		zip: number;
	};
	department: {
		id: number;
		title: string;
	};
	division: {
		id: number;
		title: string;
	};
	function: {
		id: number;
		title: string;
	};
	postedDate: string;
	closingDate: string;
	hostedUrl: string;
	applyUrl: string;
}
