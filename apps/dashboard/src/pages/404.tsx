import { Button } from '@gardentify/ui';
import Layout from '@modules/layout/components/layout';
import Link from 'next/link';
import React from 'react';

const NotFoundPage: React.FC = (props) => {
  const {} = props;

  return (
    <Layout
      headProps={{
        title: 'Page not found | Faustino Zanetto',
        description:
          'Home page of my personal portfolio, where you can find more information about me and the projects ive worked on.',
      }}
    >
      <section className="container mx-auto w-full max-w-5xl items-start justify-center p-4 lg:p-8">
        <div className="flex flex-col items-center space-y-4 text-center text-neutral-900 dark:text-neutral-100">
          {/* Titles */}
          <div className="leading-snug">
            <h1 className="text-primary-500 dark:text-primary-300 text-4xl font-bold md:text-5xl">Oops!, 404</h1>
            <h2 className="text-3xl font-semibold md:text-4xl">
              The page your requested{' '}
              <span className="text-primary-500 dark:text-primary-300 font-extrabold">does not exist!</span>
            </h2>
          </div>

          {/* Paragraph */}
          <p className="text-sm md:max-w-4xl md:text-base">
            Oops! The page you were looking for doesn&apos;t seem to exist. It may have been moved, deleted or the link
            you followed might be incorrect. Don&apos;t worry though, you can try using the navigation menu to find what
            you&apos;re looking for. If you continue to have trouble, feel free to contact us for assistance.
          </p>
          {/* Buttons */}
          <Link href="/" className="w-full md:w-40">
            <Button className="w-full">Go Home</Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default NotFoundPage;
