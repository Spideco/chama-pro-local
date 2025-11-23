-- Remove security_barrier that's causing issues
ALTER VIEW public.professionals_public SET (security_barrier = false);
ALTER VIEW public.reviews_public SET (security_barrier = false);

-- Add explicit policies to block anonymous access to sensitive tables
CREATE POLICY "Block anonymous access to profiles" 
ON public.profiles 
FOR ALL 
USING (auth.role() = 'authenticated');

CREATE POLICY "Block anonymous access to professionals" 
ON public.professionals 
FOR ALL 
USING (auth.role() = 'authenticated' AND auth.uid() = user_id);