"use client"

import {Button} from "@nextui-org/react";
import * as actions from "@/app/actions"
export default function Home() {
  return (

      <form action={actions.signInUser}>
        <Button type={"submit"}>Click Me</Button>
      </form>
  );
}
