import Image from "next/image";

import { getUser } from "@/lib/user";

export default async function Home() {
  const user = await getUser();

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <section className="flex w-full max-w-5xl flex-col gap-5 p-10">
          {user && (
            <ul className="flex flex-col gap-1">
              <li>{user.name}</li>
              <li>{user.id}</li>
              {user.image && (
                <Image
                  src={user.image}
                  alt={`${user.name}'s icon`}
                  width={120}
                  height={120}
                />
              )}
            </ul>
          )}
        </section>
      </main>
    </>
  );
}
