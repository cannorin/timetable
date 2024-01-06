import Image from "next/image";

import LogInOutButton from "@/components/compound/LogInOutButton";
import { auth } from "@/lib/auth";
import CreateEventDialog from "@/components/compound/CreateEventDialog";

export default async function Home() {
  const session = await auth();
  const user = session?.user;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section className="flex w-full max-w-5xl flex-col gap-5 p-10">
        <LogInOutButton />
        <CreateEventDialog />

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
  );
}
