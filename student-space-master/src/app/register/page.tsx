// // src/app/register/page.tsx
// "use client";

// import { useState } from "react";
// import { supabase } from "../lib/supabase";

// const RegisterPage: React.FC = () => {
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [role, setRole] = useState<string>("STUDENT");

//   const handleRegister = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const { error } = await supabase.auth.signUp({ email, password });

//     if (error) {
//       alert(error.message);
//       return;
//     }

//     await supabase.from("users").insert([{ email, role }]);
//     alert("User registered successfully!");
//   };

//   return (
//     <form onSubmit={handleRegister}>
//       <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//       <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      
//       <select value={role} onChange={(e) => setRole(e.target.value)}>
//         <option value="STUDENT">Student</option>
//         <option value="TEACHER">Teacher</option>
//         <option value="ADMIN">Admin</option>
//         <option value="SUPER_ADMIN">Super Admin</option>
//       </select>

//       <button type="submit">Register</button>
//     </form>
//   );
// };

// export default RegisterPage;

"use client";

import { useState } from "react";

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("STUDENT");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    // Mock registration logic
    if (!email || !password) {
      alert("Please fill out all fields.");
      return;
    }

    // Simulate success
    alert(`User registered successfully!\nEmail: ${email}\nRole: ${role}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
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
        <div className="mb-4">
          <label htmlFor="role" className="block text-sm font-medium mb-1">
            Role
          </label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="STUDENT">Student</option>
            <option value="TEACHER">Teacher</option>
            <option value="ADMIN">Admin</option>
            <option value="SUPER_ADMIN">Super Admin</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
