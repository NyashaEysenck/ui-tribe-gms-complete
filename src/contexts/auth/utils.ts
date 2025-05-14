
import { User, UserRole } from "@/types/auth";
import { db } from "@/integrations/supabase/typedClient";

export async function fetchUserProfile(userId: string): Promise<User | null> {
  try {
    console.log("Fetching user profile for ID:", userId);
    const { data: profile, error } = await db
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }

    if (profile) {
      console.log("Found profile:", profile);
      
      // Ensure role is one of the valid roles
      let role = profile.role as UserRole;
      
      // Map role values to ensure they match expected values
      if (role === 'grant_office' || role === 'grantoffice' as any) {
        role = 'grant_office';
      } else if (role === 'admin') {
        role = 'admin';
      } else {
        // Default to researcher if role is invalid or missing
        role = 'researcher';
      }
      
      console.log("Mapped role:", role);
      
      return {
        id: profile.id,
        name: profile.name,
        email: profile.email,
        role: role,
        department: profile.department || undefined,
        profileImage: "/placeholder.svg" // Default image
      };
    }
    
    return null;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
}

export function createBasicUserFromSession(session: any): User {
  return {
    id: session.user.id,
    name: session.user.user_metadata?.name || "User",
    email: session.user.email || "",
    role: (session.user.user_metadata?.role as UserRole) || "researcher",
    profileImage: "/placeholder.svg"
  };
}
