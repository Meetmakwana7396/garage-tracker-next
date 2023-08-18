import FieldButton from '@/components/Field/FieldButton';
import axios from '@/libs/axios';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

export default function Verify() {
    const { handleSubmit, formState } = useForm({});
    const router = useRouter();

    const formHandler = async () => {
        try {
            await axios.post('/auth/forgot-password', { email: router.query.email });
        } catch (error) {}
    };
    return (
        <div className="relative flex min-h-screen flex-col dark:bg-black items-center justify-center overflow-hidden py-6 sm:py-12 bg-white">
            <form className="max-w-xl px-5 text-center space-y-6" onSubmit={handleSubmit(formHandler)}>
                <h2 className="mb-2 text-[42px] font-bold text-black dark:text-white-dark">Check your inbox</h2>
                <p className="mb-2 text-lg text-gray-500">
                    We are glad, that you’re with us ? We’ve sent you a verification link to the email address{' '}
                    <span className="font-medium text-primary">{router?.query?.email}</span>
                </p>
                <div>
                    <span className="text-gray-500">In case you haven&apos;t received email, Click below button.</span>
                    <FieldButton
                        loading={formState?.isSubmitting}
                        type="submit"
                        className="mt-3 btn-lg mx-auto btn btn-primary"
                    >
                        Resend verification email
                    </FieldButton>
                </div>
            </form>
        </div>
    );
}

Verify.layout = 'nosidebar';
