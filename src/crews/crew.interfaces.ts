export interface IAddress {
	street: string;
	city: string;
	state: string;
	zipCode: string;
}

export interface ICrew {
	name: string;
	description: string;
	meetingDay: string;
	locationName: string;
	address: IAddress;
	time: string;
	leaders: string[];
	members?: string[];
}
