import Link from 'next/link';

export default function Custom404() {
    return (
        <div className="dark">
            <section className="flex items-center h-screen p-16 dark:bg-black dark:text-gray-100">
                <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                    <div className="max-w-md text-center">
                        <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-600">
                            <span className="sr-only">Error</span>404
                        </h2>
                        <p className="text-2xl font-semibold md:text-3xl">Sorry, we couldn't find this page.</p>
                        <p className="mt-4 mb-8 text-gray-500 dark:text-gray-400">
                            But dont worry, you can find plenty of other things on our homepage.
                        </p>
                        <Link href="/" className="btn btn-primary w-fit mx-auto">
                            Back to homepage
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

Custom404.layout = 'nosidebar';
