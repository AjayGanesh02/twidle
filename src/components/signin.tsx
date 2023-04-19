import { signIn } from "next-auth/react";

export default function SignIn() {
  return (
    <>
      Sign in.
      <button onClick={() => void signIn()}>Sign In</button>
    </>
  );
}
