"use client";

//TODO: in order to make this work, must follow instructions here:  https://supabase.com/docs/guides/auth/social-login/auth-github

import { Button } from "@/components/ui/button";
import { createBrowserClient } from "@supabase/ssr";

export default function OAuthForm() {
  //put in seperate funciton and import when needed
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const loginWithGithub = async () => {
    supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${location.origin}/auth-server-action/callback/`,
      },
    });
  };

  return (
    <Button className="w-full" onClick={loginWithGithub}>
      Login With Github (todo)
    </Button>
  );
}
