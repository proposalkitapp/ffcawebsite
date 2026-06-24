
-- Move has_role out of the API-exposed public schema so signed-in users
-- cannot execute the SECURITY DEFINER function directly via the Data API.
CREATE SCHEMA IF NOT EXISTS private;
REVOKE ALL ON SCHEMA private FROM PUBLIC, anon, authenticated;

CREATE OR REPLACE FUNCTION private.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

REVOKE ALL ON FUNCTION private.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;

-- Recreate policies on contact_submissions to use private.has_role
DROP POLICY IF EXISTS "Admins can delete messages" ON public.contact_submissions;
DROP POLICY IF EXISTS "Admins can update messages" ON public.contact_submissions;
DROP POLICY IF EXISTS "Admins can read messages" ON public.contact_submissions;

CREATE POLICY "Admins can delete messages" ON public.contact_submissions
  FOR DELETE TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins can update messages" ON public.contact_submissions
  FOR UPDATE TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins can read messages" ON public.contact_submissions
  FOR SELECT TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role));

-- Recreate user_roles admin policy
DROP POLICY IF EXISTS "Admins see all roles" ON public.user_roles;
CREATE POLICY "Admins see all roles" ON public.user_roles
  FOR SELECT TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role));

-- Keep a public.has_role wrapper that delegates, but revoke execute from clients.
-- Drop the old public function since app code (server functions) calls it via RPC.
-- Instead, replace with a thin wrapper that is NOT executable by anon/authenticated.
DROP FUNCTION IF EXISTS public.has_role(uuid, public.app_role);
