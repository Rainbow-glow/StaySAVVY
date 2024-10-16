import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
        <div className="mx-auto">
          <SignIn path="/sign-in" routing="path" />
        </div>
    </div>
  );
}
