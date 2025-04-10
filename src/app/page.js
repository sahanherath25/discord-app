"use client"
import {SessionProvider, signIn, signOut, useSession} from 'next-auth/react';
import {Button} from "@nextui-org/react";

export default function Home() {

    const session=useSession();
    console.log("Session is ",session?.data);

  return (

      <div>
          <form action={signIn}>
              <Button type={"submit"}>SignIn</Button>
          </form>

          <form action={signOut}>
              <Button type={"submit"}>SignOut</Button>
          </form>
      </div>


  );
}


