import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">Welcome to SwipeHire</h1>
        <p className="text-xl text-muted-foreground mb-8">Start your job discovery journey!</p>
        <div className="flex gap-4 justify-center">
             <Link href="/login">
                <Button>Login</Button>
             </Link>
             <Link href="/discovery">
                <Button variant="outline">Guest Discovery</Button>
             </Link>
        </div>
      </div>
    </div>
  );
}