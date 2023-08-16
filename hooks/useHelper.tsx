export const useHelper = () => {
    const perPageOption = [10, 25, 50, 100];

    const attorneyStatus = [
        { key: '1', value: 'pending' },
        { key: '2', value: 'approved' },
        { key: '3', value: 'rejected' },
        { key: '4', value: 'deleted' },
    ];

    const isEmpty = (value: any) => {
        return value || '-';
    };

    const formatDate = (input: string) => {
        const date = new Date(input);
        const options: any = { day: '2-digit', month: 'long', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-GB', options);
        return formattedDate;
    };

    const getAttorneyStatus = (id: string) => {
        const status = attorneyStatus.find((item) => item.key == id);
        return status ? status.value : '';
    };

    return {
        perPageOption,
        getAttorneyStatus,
        isEmpty,
        formatDate,
    };
};
