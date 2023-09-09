import IconEdit from '@/components/Icon/IconEdit';
import IconFile from '@/components/Icon/IconFile';
import { useHelper } from '@/hooks/useHelper';
import axios from '@/libs/axios';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useRouter } from 'next/router';
import useSWRImmutable from 'swr/immutable';
import Sheet from '@/components/Essentials/Sheet';
import EditUser from '@/components/User/EditUser';
import { useRef } from 'react';
import CenteredPageTitle from '@/components/Essentials/CenteredPageTitle';

const fetchUserDetails = async (url: any) => {
    try {
        const { data } = await axios.get(url);
        return data.data;
    } catch (error) {}
};

const UserDetail = () => {
    const editUserRef = useRef<any>(null);
    const router = useRouter();
    const { formatDate } = useHelper();

    const {
        data: UserDetails,
        isLoading,
        mutate,
    } = useSWRImmutable([router.isReady ? `/users/${router.query.id}` : null], ([url]) => fetchUserDetails(url));

    return (
        <div className="space-y-10">
            <div className="container max-w-6xl break-words flex justify-center">
                <div className="!w-full space-y-8">
                    <CenteredPageTitle title="User Details" />
                    <div className="dark:bg-black bg-supporting rounded p-4">
                        <h2 className="text-3xl items-center flex mb-4 justify-between">
                            <div className="flex items-center gap-3">
                                <IconFile />
                                Basic Details
                            </div>
                            <Tippy content="Edit User">
                                <span onClick={() => editUserRef?.current?.open()} className='p-1.5 hover:bg-black/10 dark:hover:bg-supporting/10 cursor-pointer rounded hover:text-primary'>
                                    <IconEdit/>
                                </span>
                            </Tippy>
                        </h2>
                        <table className="border-0">
                            <tr>
                                <td className="font-semibold py-2 whitespace-nowrap pr-8">First name</td>
                                <td className="break-words">{UserDetails?.firstName}</td>
                            </tr>
                            <tr>
                                <td className="font-semibold py-2 whitespace-nowrap pr-8">Last name</td>
                                <td className="break-words">{UserDetails?.lastName}</td>
                            </tr>
                            <tr>
                                <td className="font-semibold py-2 whitespace-nowrap pr-8">Email</td>
                                <td className="break-words">{UserDetails?.email}</td>
                            </tr>
                            <tr>
                                <td className="font-semibold py-2 whitespace-nowrap pr-8">Status</td>
                                <td>
                                    <div
                                        className={`status capitalize status-${UserDetails?.status?.toLowerCase()}`}
                                        // className="status status-approved"
                                    >
                                        {UserDetails?.status}
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="font-semibold py-2 whitespace-nowrap pr-8">Role id</td>
                                <td className="break-words">{UserDetails?.roleId}</td>
                            </tr>
                            <tr>
                                <td className="font-semibold py-2 whitespace-nowrap pr-8">Created date</td>
                                <td>
                                    <div className="whitespace-nowrap">{formatDate(UserDetails?.createdAt)}</div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
            <Sheet ref={editUserRef} width="600px">
                <EditUser data={UserDetails} refresh={mutate} close={() => editUserRef?.current?.close()} />
            </Sheet>
        </div>
    );
};

export default UserDetail;

UserDetail.middleware = { auth: true };
