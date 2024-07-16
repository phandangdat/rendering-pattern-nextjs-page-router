import Layout from '@/components/Layout';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { IUser } from '..';

export default function ClientSide() {
  const [user, setUser] = useState<IUser[]>();

  const fetchData = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users?_page=${
        Math.floor(Math.random() * 3) + 1
      }&_per_page=4`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    setUser(result.data);
  };
  useEffect(() => {
    fetchData().catch((e) => {
      console.error('An error occurred while fetching the data: ', e);
    });
  }, []);
  return (
    <Layout>
      <h1 className="text-5xl text-center mb-5 italic">
        Client side rendering(CSR)
      </h1>
      <div className="grid grid-cols-2 gap-4">
        {user?.map((user: IUser) => (
          <div
            key={user.id}
            className="card card-side bg-base-100 shadow-xl static"
          >
            <figure>
              <Image
                src={user.avatar}
                alt="Profile"
                width={100}
                height={100}
                priority
              />
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
