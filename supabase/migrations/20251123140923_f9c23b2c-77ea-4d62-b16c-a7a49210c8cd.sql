-- Drop the SECURITY DEFINER function
DROP FUNCTION IF EXISTS public.get_professional_location(UUID);

-- Verify: List all policies on professionals table to ensure none expose full data
-- This is just a verification query, actual policies were already modified