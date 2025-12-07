-- Add DELETE policy for messages table to allow users to delete their own sent messages
CREATE POLICY "Users can delete their own sent messages"
  ON public.messages
  FOR DELETE
  USING (auth.uid() = sender_id);