-- Create storage bucket for professional images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'professional-images',
  'professional-images',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for professional images
CREATE POLICY "Anyone can view professional images"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'professional-images');

CREATE POLICY "Authenticated users can upload professional images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'professional-images' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Users can update their own professional images"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'professional-images' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Users can delete their own professional images"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'professional-images' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );