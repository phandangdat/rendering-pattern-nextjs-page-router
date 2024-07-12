import Layout from '@/components/Layout';
import Image from 'next/image';

export interface IUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export default function Home({ user }: { user: { data: IUser[] } }) {
  return (
    <Layout>
      <h1 className="text-5xl text-center mb-5 italic">
        Server side rendering(SSR)
      </h1>
      <div className="grid grid-cols-2 gap-4">
        {user?.data.map((user: IUser) => (
          <div
            key={user.id}
            className="card card-side bg-base-100 shadow-xl static"
          >
            <figure>
              <Image src={user.avatar} alt="Profile" width={100} height={100} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {user.first_name + ' ' + user.last_name}
              </h2>
              <p>{user.email}</p>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
export async function getServerSideProps() {
  const res = await fetch(
    `https://reqres.in/api/users?page=${Math.floor(Math.random() * 2) + 1}`
  );
  const user = await res.json();

  return { props: { user } };
}
