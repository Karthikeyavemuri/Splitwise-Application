-- Fix for infinite recursion in group_members

-- Drop the recursive policies
DROP POLICY IF EXISTS "Users can view group members" ON public.group_members;
DROP POLICY IF EXISTS "Members can add others to group" ON public.group_members;

-- Create a security definer function to check membership without triggering RLS recursively
CREATE OR REPLACE FUNCTION public.is_group_member(check_group_id uuid)
RETURNS boolean
LANGUAGE sql SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM group_members
    WHERE group_id = check_group_id AND user_id = auth.uid()
  );
$$;

-- Re-create the SELECT policy using the new function
CREATE POLICY "Users can view group members" ON public.group_members FOR SELECT USING (
  is_group_member(group_id)
);

-- Re-create the INSERT policy using the new function
CREATE POLICY "Members can add others to group" ON public.group_members FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.groups WHERE id = group_id AND created_by = auth.uid()) OR
  is_group_member(group_id)
);
