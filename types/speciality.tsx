export interface IAddSpecialityModal {
    selectedData?: any;
    submit?: () => void | undefined;
    refresh?: Function | undefined;
}

export interface IAddSpecialityForm {
    name: string;
    status?: string;
}
