import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
        <div className="mx-auto">
          <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
        </div>
    </div>
  );
}
