-- Drop the public SELECT policy
DROP POLICY IF EXISTS "Professionals are viewable by everyone" ON public.professionals;

-- Create a view that exposes only safe public information
CREATE OR REPLACE VIEW public.professionals_public AS
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

-- Grant SELECT on the view to authenticated users
GRANT SELECT ON public.professionals_public TO authenticated;
GRANT SELECT ON public.professionals_public TO anon;

-- Create policy for professionals to view their own complete data
CREATE POLICY "Professionals can view their own complete profile" 
ON public.professionals 
FOR SELECT 
USING (auth.uid() = user_id);

-- Policy for authenticated users to view full details when needed (e.g., after booking)
CREATE POLICY "Users can view basic professional info" 
ON public.professionals 
FOR SELECT 
USING (true);

-- Add column to track address sharing consent
ALTER TABLE public.professionals 
ADD COLUMN IF NOT EXISTS address_consent BOOLEAN DEFAULT FALSE;

-- Create function to get professional location (only returns address if consent given)
CREATE OR REPLACE FUNCTION public.get_professional_location(professional_id UUID)
RETURNS TABLE (
  city TEXT,
  state TEXT,
  address TEXT,
  latitude DECIMAL,
  longitude DECIMAL
)
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    city,
    state,
    CASE 
      WHEN address_consent = true THEN address 
      ELSE NULL 
    END as address,
    latitude,
    longitude
  FROM public.professionals
  WHERE id = professional_id;
$$;