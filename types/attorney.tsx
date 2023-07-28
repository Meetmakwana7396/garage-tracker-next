export interface IEditAttorneyDetailModal {
    selectedData?: any;
    submit?: () => void | undefined;
    refresh?: Function | undefined;
    allAvailableStates: any;
}

export interface IEditAttorneyDetailForm {
    first_name: string;
    last_name: string;
    email: string;
    status: string;
    city: string;
    state: string;
    zipcode: string;
    phone: string;
    profile?: any;
    attorney_license: string;
}
