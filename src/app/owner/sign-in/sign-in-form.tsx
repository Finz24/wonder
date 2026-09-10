"use client";

import { useActionState } from "react";

import { signInAction, type SignInState } from "@/auth/actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const initialState: SignInState = { error: null };

export function SignInForm() {
  const [state, formAction, pending] = useActionState(signInAction, initialState);

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <p className="font-utility text-xs font-bold tracking-[0.12em]">Wonder · By Hila</p>
        <CardTitle>
          <span className="mt-3 block font-display text-3xl leading-tight">כניסת הילה</span>
        </CardTitle>
        <CardDescription>
          <span className="mt-2 block">המרחב האישי שלך — כניסה לבעלת הסטודיו בלבד.</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="owner-email" className="text-sm font-semibold">
              כתובת דוא״ל
            </label>
            <input
              id="owner-email"
              name="email"
              type="email"
              autoComplete="username"
              required
              dir="ltr"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-left text-base outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="owner-password" className="text-sm font-semibold">
              סיסמה
            </label>
            <input
              id="owner-password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              dir="ltr"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-left text-base outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          {state?.error ? (
            <p role="alert" className="text-sm leading-6 text-destructive">
              {state.error}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-md bg-primary px-4 py-2.5 font-utility text-sm font-bold text-primary-foreground transition-opacity disabled:opacity-60"
          >
            {pending ? "נכנסת…" : "כניסה לסטודיו"}
          </button>
        </form>
      </CardContent>
    </Card>
  );
}
