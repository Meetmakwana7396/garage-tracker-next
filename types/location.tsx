export interface IAddLocationModal {
    selectedData?: any;
    submit?: () => void | undefined;
    refresh?: Function | undefined;
}

export interface IAddLocationForm {
    state_name: string;
}
