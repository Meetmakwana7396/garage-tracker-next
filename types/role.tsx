export interface IPermission {
    id: string;
    name: string;
    slug: string;
    permissions: [
        {
            id: string;
            name: string;
            slug: string;
            featureId: string;
        }
    ];
}
