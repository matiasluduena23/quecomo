import { auth } from "@/auth";
import { SignIn } from "./components/sign-in";
import { redirect } from "next/navigation";
import InitialChat from "./components/InitialChat";

export default async function Home() {
  // const session = await auth();
  // if (session?.user) redirect("./chat");

  return (
    <main>
      <div className="container mx-auto">
        <h1 className="text-center text-4xl mt-[7rem]">Que como</h1>
        <div className="flex items-center justify-center mt-[10rem] ">
          {/* <SignIn /> */}
          <InitialChat />
        </div>
      </div>
    </main>
  );
}
