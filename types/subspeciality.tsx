export interface IAddSubSpecialtyModal {
    selectedData?: any;
    submit?: () => void | undefined;
    refresh?: Function | undefined;
    specialtyList: any;
}

export interface IAddSubSpecialtyForm {
    name: string;
    status: string;
    specialty?: string;
}
