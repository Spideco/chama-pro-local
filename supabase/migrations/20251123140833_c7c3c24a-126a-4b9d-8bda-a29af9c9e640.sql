-- Drop the problematic SECURITY DEFINER view
DROP VIEW IF EXISTS public.professionals_public;

-- Drop the policy that exposes all data
DROP POLICY IF EXISTS "Users can view basic professional info" ON public.professionals;

-- Keep only the policy for professionals to see their own data
-- The policy "Professionals can view their own complete profile" already exists

-- For public queries, we'll handle data filtering in the application layer
-- Only city, state, rating will be exposed through API queries

-- Fix profiles table - restrict to only allow viewing own profile
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;

-- Users can only view their own profile
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = id);

-- Create limited view for professional public info (without SECURITY DEFINER)
CREATE VIEW public.professionals_public AS
SELECT 
  id,
  business_name,
  category,
  description,
  city,
  state,
  rating,
  total_reviews,
  created_at
FROM public.professionals;

-- Enable RLS on the view
ALTER VIEW public.professionals_public SET (security_invoker = true);

-- Note: Applications should query professionals_public view for listings
-- Full address is only accessible by the professional owner through direct table access