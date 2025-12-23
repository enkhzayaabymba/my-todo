"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { User, LogOut } from "lucide-react";

export default function Navigation() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Error logging out. Please try again.");
    }
  };

  return (
    <div className="flex justify-between items-center p-5">
      <Link href="/" className="flex text-lg">
        <p className="text-purple-800 font-bold">my</p>
        <p className="text-black font-bold">Todo</p>
      </Link>

      {loading ? (
        <div className="w-20"></div>
      ) : user ? (
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-purple-600">
            <User className="h-5 w-5" />
            <span className="font-semibold text-sm">
              {user.email?.split("@")[0] || "User"}
            </span>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="flex items-center gap-2 rounded-xl"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        </div>
      ) : (
        <Link href="/login" className="cursor-pointer">
          <p className="font-bold text-lg">Login</p>
        </Link>
      )}
    </div>
  );
}
