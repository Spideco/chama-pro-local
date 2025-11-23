-- Fix SECURITY DEFINER view by enabling security_invoker for reviews_public
-- This ensures the view executes with permissions of the calling user, not the view creator
ALTER VIEW public.reviews_public SET (security_invoker = true);