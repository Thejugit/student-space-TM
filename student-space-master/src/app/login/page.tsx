// // src/app/login/page.tsx
// "use client";

// import { useState } from "react";
// import { supabase } from "../lib/supabase";
// import { useRouter } from "next/navigation";

// const LoginPage: React.FC = () => {
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const router = useRouter();

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const { error } = await supabase.auth.signInWithPassword({ email, password });

//     if (error) {
//       alert(error.message);
//       return;
//     }

//     const { data: userData } = await supabase.from("users").select("role").eq("email", email).single();
//     const role = userData?.role;

//     if (role === "STUDENT") router.push("/student");
//     else if (role === "TEACHER") router.push("/teacher");
//     else if (role === "ADMIN") router.push("/admin");
//     else if (role === "SUPER_ADMIN") router.push("/super-admin");
//   };

//   return (
//     <form onSubmit={handleLogin}>
//       <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//       <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default LoginPage;

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Mock login logic
    if (email === "student@example.com" && password === "password") {
      router.push("/student-dash");
    } else if (email === "teacher@example.com" && password === "password") {
      router.push("/teacher-dash");
    } else if (email === "admin@example.com" && password === "password") {
      router.push("/admin-dash");
    } else if (email === "superadmin@example.com" && password === "password") {
      router.push("/super-admin-dash");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
