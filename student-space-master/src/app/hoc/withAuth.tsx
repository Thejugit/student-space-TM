// // src/hoc/withAuth.tsx
// "use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { supabase } from "../lib/supabase";

// // type WithAuthProps = {
// //   allowedRoles: string[];
// // };

// const withAuth = <P extends object>(
//   WrappedComponent: React.ComponentType<P>,
//   allowedRoles: string[]
// ) => {
//   const ComponentWithAuth = (props: P) => {
//     const [userRole, setUserRole] = useState<string | null>(null);
//     const router = useRouter();

//     useEffect(() => {
//       const fetchUserRole = async () => {
//         const user = await supabase.auth.getUser();

//         if (!user.data.user) {
//           router.push("/login");
//           return;
//         }

//         const { data } = await supabase.from("users").select("role").eq("email", user.data.user.email).single();
//         if (!data || !allowedRoles.includes(data.role)) {
//           router.push("/403"); // Unauthorized page
//           return;
//         }

//         setUserRole(data.role);
//       };

//       fetchUserRole();
//     }, [router]);

//     if (!userRole) return null; // Show nothing while loading

//     return <WrappedComponent {...props} />;
//   };

//   return ComponentWithAuth;
// };

// export default withAuth;
