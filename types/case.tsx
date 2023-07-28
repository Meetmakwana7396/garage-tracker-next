export interface IAssignExpertModal {
    caseData?: any;
    refresh?: Function | undefined;
}

export interface IAssignExpertForm {
    status: string;
    title: string;
    expert_id: string;
}

export interface ICreateInvoiceModal {
    caseData?: any;
    refresh?: Function | undefined;
}

export interface ICreateInvoiceForm {
    title?: string;
    status: string;
    invoice: any | null | undefined;
    amount: string;
    due_date: string;
    notes: string;
}
