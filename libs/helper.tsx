export const specialtyStatus = [
    { key: '1', value: 'pending' },
    { key: '2', value: 'active' },
    { key: '3', value: 'rejected' },
];

export const attorneyStatus = [
    { key: '1', value: 'pending' },
    { key: '2', value: 'approved' },
    { key: '3', value: 'rejected' },
    { key: '4', value: 'deleted' },

];

export const caseStatus = [
    { key: '1', value: 'inprogress' },
    { key: '2', value: 'completed' },
    { key: '3', value: 'issued' },
];

export const expertStatus = [
    { key: '1', value: 'pending' },
    { key: '2', value: 'approved' },
    { key: '3', value: 'rejected' },
    { key: '4', value: 'deleted' },
];

export const invoiceStatus = [
    { key: '1', value: 'unpaid' },
    { key: '2', value: 'paid' },
    { key: '3', value: 'rejected' },
];

const helper = {
    perPageOption: [10, 25, 50, 100],
    isEmpty: (value: any) => {
        return value || '-';
    },
    getSpecialtyStatus: (id: string) => {
        const status = specialtyStatus.find((item) => item.key == id);
        return status ? status.value : '';
    },

    getAttorneyStatus: (id: string) => {
        const status = attorneyStatus.find((item) => item.key == id);
        return status ? status.value : '';
    },

    getCaseStatus: (id: string) => {
        const status = caseStatus.find((item) => item.key == id);
        return status ? status.value : '';
    },

    getExpertStatus: (id: string) => {
        const status = expertStatus.find((item) => item.key == id);
        return status ? status.value : '';
    },

    getInvoiceStatus: (id: string) => {
        const status = invoiceStatus.find((item) => item.key == id);
        return status ? status.value : '';
    },

    // To Display human Readable Date
    formatDate: (input: string) => {
        const date = new Date(input);
        const options: any = { day: '2-digit', month: 'long', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-GB', options);
        return formattedDate;
    },

    formatAddress: (city?: string, state?: string, zipCode?: string): string => {
        const addressComponents = [city, state, zipCode];
        const formattedAddress = addressComponents
            .filter((component) => component !== null && component !== undefined)
            .join(', ');
        return formattedAddress;
    },

    // To convert Date into field reliable format
    convertDate: (date: string) => {
        var today = new Date(date);
        return today.toISOString().split('T')[0];
    },

    currencyFormat(value: number) {
        return value ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value) : '0.00';
    },
};
export default helper;
