-- Grant SELECT access to public views for authenticated and anonymous users
GRANT SELECT ON public.professionals_public TO authenticated, anon;
GRANT SELECT ON public.reviews_public TO authenticated, anon;