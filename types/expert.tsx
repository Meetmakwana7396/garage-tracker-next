export interface IEditExpertDetailModal {
    selectedData?: any;
    submit?: () => void | undefined;
    refresh?: Function | undefined;
    specialtyData?: any;
    allAvailableStates?: any;
    // expertId?: string;
}

export interface IEditExpertDetailForm {
    first_name: string;
    last_name: string;
    email: string;
    city: string;
    state: string;
    zipcode: string;
    status: string;
    phone: string;
    bio: string;
    cv: any;
    profile: any;
    specialty_id: string;
    sub_specialty_id?: Array<string>;
}
