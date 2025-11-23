-- Enable RLS on professionals_public view
ALTER VIEW public.professionals_public SET (security_barrier = true);

-- Grant access to the view
GRANT SELECT ON public.professionals_public TO authenticated;
GRANT SELECT ON public.professionals_public TO anon;

-- Create anonymized reviews view
CREATE VIEW public.reviews_public AS
SELECT 
  id,
  professional_id,
  rating,
  comment,
  created_at
FROM public.reviews;

-- Grant access to reviews view
GRANT SELECT ON public.reviews_public TO authenticated;
GRANT SELECT ON public.reviews_public TO anon;

-- Update reviews policy to allow public viewing (without user_id exposure, use the view instead)
DROP POLICY IF EXISTS "Reviews are viewable by everyone" ON public.reviews;

CREATE POLICY "Users can view reviews they created" 
ON public.reviews 
FOR SELECT 
USING (auth.uid() = user_id);

-- Note: Applications should use reviews_public view for displaying reviews to protect reviewer identity