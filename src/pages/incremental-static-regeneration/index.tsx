import Layout from '@/components/Layout';
import { IUser } from '@/pages';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Static site page',
  description: 'Rendering pattern',
};
export default function IncrementalstaticRegeneration({
  user,
}: {
  user: IUser[];
}) {
  return (
    <Layout>
      <h1 className="text-5xl text-center mb-5 italic">
        Incremental static regeneration(ISR)
      </h1>
      <div className="grid grid-cols-2 gap-4">
        {user?.map((user: IUser) => (
          <div
            key={user.id}
            className="card card-side bg-base-100 shadow-xl static"
          >
            <figure>
              <Image src={user.avatar} alt="Profile" width={100} height={100} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {user.firstName + ' ' + user.lastName}
              </h2>
              <p>{user.email}</p>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
export async function getStaticProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/author`);
  const user = await res.json();

  return {
    props: {
      user,
    },
    revalidate: 5,
  };
}
