-- Supabase best-practice: automatically create a profile when a new user signs up

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  new_public_id text;
BEGIN
  -- Generate a random unique public ID (SS-XXXXXX)
  new_public_id := 'SS-' || floor(random() * 900000 + 100000)::text;

  INSERT INTO public.users (id, public_user_id, full_name, email)
  VALUES (
    new.id,
    new_public_id,
    COALESCE(new.raw_user_meta_data->>'full_name', 'SplitSmart User'),
    new.email
  );
  
  RETURN new;
END;
$$;

-- Attach the trigger to the hidden auth.users table
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
