
    import React, { createContext, useState, useEffect, useContext } from 'react';
    import { supabase } from '@/lib/supabaseClient';
    import { useToast } from "@/components/ui/use-toast";

    const AuthContext = createContext(null);

    const MOCK_USER_DEV_MODE = {
      id: 'dev-user-id',
      email: 'dev@noah.rn',
      user_metadata: { full_name: 'Dev Nurse' },
      app_metadata: { provider: 'email', providers: ['email'] },
      aud: 'authenticated',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    export const AuthProvider = ({ children }) => {
      const { toast } = useToast();
      
      const [user, setUser] = useState(() => {
        if (import.meta.env.DEV) {
          return MOCK_USER_DEV_MODE;
        }
        return null;
      });

      const [loading, setLoading] = useState(() => {
        return !import.meta.env.DEV;
      });

      useEffect(() => {
        if (import.meta.env.DEV && user?.id === MOCK_USER_DEV_MODE.id) {
           toast({
            title: "Developer Mode Active",
            description: "Logged in as Mock User (Dev Nurse). Real auth is bypassed for initial load.",
            className: "bg-brand-goldOchre text-brand-parchmentWhite border-brand-byzantineBlue"
          });
        }
      }, [toast, user?.id]);


      useEffect(() => {
        if (import.meta.env.DEV) {
          // In DEV mode, initial state is set, listener handles explicit Supabase auth actions
          const { data: authListener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
              if (session?.user) { // If a real Supabase session occurs
                setUser(session.user);
                setLoading(false);
              } else if (event === "SIGNED_OUT" && user?.id !== MOCK_USER_DEV_MODE.id) { 
                // If real user signs out, or if mock user was replaced by real and then signs out
                setUser(null); 
                setLoading(false);
              } else if (event === "SIGNED_OUT" && user?.id === MOCK_USER_DEV_MODE.id) {
                // If mock user is active and a sign out occurs (e.g. manual supabase.auth.signOut() call)
                setUser(null);
                setLoading(false);
              }
              // If no session and not signed out, and still in DEV mode, keep mock user or handle as needed
            }
          );
          return () => {
            if (authListener && authListener.subscription) {
              authListener.subscription.unsubscribe();
            }
          };
        }

        // Production mode: fetch session and set up listener
        const getSessionAndListen = async () => {
          try {
            const { data: { session }, error } = await supabase.auth.getSession();
            if (error) {
              console.error("Error getting session:", error.message);
              toast({ title: "Auth Error", description: "Failed to retrieve session.", variant: "destructive" });
            }
            setUser(session?.user ?? null);
          } catch (e) {
            console.error("Exception in getSession:", e);
            setUser(null);
          } finally {
            setLoading(false);
          }

          const { data: authListener } = supabase.auth.onAuthStateChange(
            (event, session) => {
              setUser(session?.user ?? null);
              setLoading(false);
            }
          );

          return () => {
            if (authListener && authListener.subscription) {
              authListener.subscription.unsubscribe();
            }
          };
        };
        
        getSessionAndListen();

      }, [toast, user?.id]);

      const login = async (email, password) => {
        // If in DEV mode and trying to log in while mock user is active,
        // it might be an attempt to switch to a real user.
        // Or, if no user is set (e.g., after mock logout), allow Supabase login.
        setLoading(true);
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (data.user) {
          setUser(data.user);
        } else if (error && import.meta.env.DEV && user?.id !== MOCK_USER_DEV_MODE.id) {
          // if login fails in dev and not already mock user, re-set mock user to avoid broken state
          // but this case might be complex; typically dev would rely on mock or successful real login
        }
        setLoading(false);
        return { data, error };
      };

      const register = async (email, password, fullName) => {
        setLoading(true);
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
          },
        });
        if (data.user) setUser(data.user);
        // If sign up requires confirmation, user might not be set immediately here.
        // onAuthStateChange should handle it.
        setLoading(false);
        return { data, error };
      };

      const logout = async () => {
        const currentUserId = user?.id;
        setLoading(true);
        const { error } = await supabase.auth.signOut();
        setUser(null); // Clear user immediately

        if (error) {
          toast({ title: "Logout Failed", description: error.message, variant: "destructive" });
        } else {
           toast({ title: "Logged Out", description: "You have been successfully logged out.", className: "bg-brand-byzantineBlue text-brand-parchmentWhite" });
        }
        
        if (import.meta.env.DEV && currentUserId === MOCK_USER_DEV_MODE.id && !error) {
          // If mock user was logged out, specific toast
           toast({ title: "Dev Mode", description: "Mock user logged out. You can log in with real credentials or refresh to re-activate mock user.", className: "bg-brand-byzantineBlue text-brand-parchmentWhite" });
        }
        
        // Decide if we need to re-instate mock user immediately after logout in DEV mode
        // For now, logout means logged out. Refresh would bring back mock user if no real session.
        // Or, explicitly set mock user again if that's the desired DEV flow after any logout:
        // if (import.meta.env.DEV) { setUser(MOCK_USER_DEV_MODE); setLoading(false); return { error: null }; }


        setLoading(false);
        return { error };
      };

      const value = {
        user,
        login,
        register,
        logout,
        isLoading: loading, 
        isAuthenticated: !!user,
      };

      return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
    };

    export const useAuth = () => {
      const context = useContext(AuthContext);
      if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
      }
      return context;
    };
  