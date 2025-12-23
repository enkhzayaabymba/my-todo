"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navigation from "../components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (error) {
      console.error("Error signing in with Google:", error);
      alert("Error signing in with Google");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;

      // Check if email confirmation is required
      if (data.user && !data.session) {
        alert(
          "Account created! Please check your email for the confirmation link."
        );
        setEmail("");
        setPassword("");
      } else if (data.user && data.session) {
        // Email confirmation is disabled, user is automatically signed in
        alert("Account created successfully!");
        router.push("/");
        router.refresh();
      }
    } catch (error: any) {
      alert(error.message || "Error signing up. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });
      if (error) throw error;
      if (data.user) {
        router.push("/");
        router.refresh();
      }
    } catch (error: any) {
      alert(
        error.message || "Error signing in. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navigation />
      <div className="flex justify-center items-center min-h-screen p-4">
        <div className="bg-white rounded-3xl shadow-lg w-full max-w-md p-8 relative">
          <header className="flex mb-8 justify-center">
            <p className="text-purple-600 font-bold text-4xl">my</p>
            <p className="text-black font-bold text-4xl">Account</p>
          </header>

          <h2 className="text-center text-xl font-semibold mb-6">
            Create An Account
          </h2>

          {/* Google Sign In Button */}
          <Button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl py-3 mb-4 font-semibold"
          >
            <svg
              className="w-5 h-5 mr-2"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </Button>

          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or</span>
            </div>
          </div>

          {/* Email and Password Form */}
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4 mb-6">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-xl"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full rounded-xl"
            />
            <div className="flex gap-2">
              <Button
                type="button"
                onClick={handleEmailSignUp}
                disabled={loading || !email || !password}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white rounded-xl disabled:opacity-50"
              >
                {loading ? "Loading..." : "Sign Up"}
              </Button>
              <Button
                type="button"
                onClick={handleEmailSignIn}
                disabled={loading || !email || !password}
                variant="outline"
                className="flex-1 rounded-xl disabled:opacity-50"
              >
                {loading ? "Loading..." : "Sign In"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
