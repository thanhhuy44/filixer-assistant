import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { getServerAuthSession } from "@/utils/auth";

async function Page() {
  const session = await getServerAuthSession();
  return (
    <main className="flex size-full items-center justify-center">
      <div className="flex flex-col items-center gap-y-4">
        <h1 className="text-center text-xl font-bold">
          Welcome to Filixer Assistant!
        </h1>
        {session ? (
          <Link href="/rooms/new">
            <Button variant="outline">New Chat</Button>
          </Link>
        ) : (
          <Link href="/login">
            <Button variant="default">Login</Button>
          </Link>
        )}
      </div>
    </main>
  );
}

export default Page;
