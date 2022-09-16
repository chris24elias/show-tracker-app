// import React, { createContext, useState, useEffect, useContext } from "react";
// import { supabase } from "../api/initSupabase";
// import { Session } from "@supabase/supabase-js";

// type AuthPayload = {
//   email: string;
//   password: string;
// };
// type ContextProps = {
//   user: null | boolean;
//   session: Session | null;
//   register: (data: AuthPayload) => void;
//   login: (data: AuthPayload) => void;
//   forget: (email: string) => void;
//   logout: () => void;
// };

// const AuthContext = createContext<ContextProps>({});

// interface Props {
//   children: React.ReactNode;
// }

// const AuthProvider = (props: Props) => {
//   // user null = loading
//   const [user, setUser] = useState<null | boolean>(null);
//   const [session, setSession] = useState<Session | null>(null);

//   useEffect(() => {
//     const session = supabase.auth.session();
//     setSession(session);
//     setUser(session ? true : false);
//     const { data: authListener } = supabase.auth.onAuthStateChange(
//       async (event, session) => {
//         console.log(`Supabase auth event: ${event}`);
//         setSession(session);
//         setUser(session ? true : false);
//       }
//     );
//     return () => {
//       authListener!.unsubscribe();
//     };
//   }, [user]);

//   async function login({ email, password }: AuthPayload) {
//     // setLoading(true);
//     const { user, error } = await supabase.auth.signIn({
//       email: email,
//       password: password,
//     });
//     if (!error && !user) {
//       //   setLoading(false);
//       alert("Check your email for the login link!");
//     }
//     if (error) {
//       //   setLoading(false);
//       alert(error.message);
//     }
//   }

//   async function register({ email, password }: AuthPayload) {
//     // setLoading(true);
//     const { user, error } = await supabase.auth.signUp({
//       email: email,
//       password: password,
//     });

//     if (!error && !user) {
//       //   setLoading(false);
//       alert("Check your email for the login link!");
//     }
//     if (error) {
//       //   setLoading(false);
//       alert(error.message);
//     }
//   }

//   async function forget(email: string) {
//     // setLoading(true);
//     const { data, error } = await supabase.auth.api.resetPasswordForEmail(
//       email
//     );
//     if (!error) {
//       //   setLoading(false);
//       alert("Check your email to reset your password!");
//     }
//     if (error) {
//       //   setLoading(false);
//       alert(error.message);
//     }
//   }

//   async function logout() {
//     const { error } = await supabase.auth.signOut();
//     if (!error) {
//       alert("Signed out!");
//     }
//     if (error) {
//       alert(error.message);
//     }
//   }

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         session,
//         register,
//         login,
//         forget,
//         logout,
//       }}
//     >
//       {props.children}
//     </AuthContext.Provider>
//   );
// };

// const useAuth = () => useContext(AuthContext);

// export { AuthContext, AuthProvider, useAuth };
