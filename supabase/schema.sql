-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- USERS
create table public.users (
  id uuid references auth.users not null primary key,
  public_user_id text unique not null,
  full_name text not null,
  email text not null,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- GROUPS
create table public.groups (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  created_by uuid references public.users(id) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- GROUP MEMBERS
create table public.group_members (
  group_id uuid references public.groups(id) on delete cascade not null,
  user_id uuid references public.users(id) on delete cascade not null,
  joined_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (group_id, user_id)
);

-- EXPENSES
create table public.expenses (
  id uuid default gen_random_uuid() primary key,
  group_id uuid references public.groups(id) on delete cascade,
  description text not null,
  amount numeric not null,
  paid_by uuid references public.users(id) not null,
  split_type text not null, -- 'Equal', 'Exact', 'Percentage'
  receipt_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- EXPENSE SPLITS
create table public.expense_splits (
  id uuid default gen_random_uuid() primary key,
  expense_id uuid references public.expenses(id) on delete cascade not null,
  user_id uuid references public.users(id) not null,
  amount_owed numeric not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- SETTLEMENTS
create table public.settlements (
  id uuid default gen_random_uuid() primary key,
  payer_id uuid references public.users(id) not null,
  payee_id uuid references public.users(id) not null,
  group_id uuid references public.groups(id) on delete cascade,
  amount numeric not null,
  status text not null default 'completed',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.users enable row level security;
alter table public.groups enable row level security;
alter table public.group_members enable row level security;
alter table public.expenses enable row level security;
alter table public.expense_splits enable row level security;
alter table public.settlements enable row level security;

-- USERS POLICIES
create policy "Users can view all users" on public.users for select using (true);
create policy "Users can update their own profile" on public.users for update using (auth.uid() = id);
create policy "Users can insert their own profile" on public.users for insert with check (auth.uid() = id);

-- GROUPS POLICIES
-- Users can view groups they are members of
create policy "Users can view groups they are members of" on public.groups for select using (
  exists (select 1 from public.group_members where group_id = id and user_id = auth.uid())
);
-- Users can create groups
create policy "Users can create groups" on public.groups for insert with check (auth.uid() = created_by);
-- Creators can update/delete groups
create policy "Creators can update groups" on public.groups for update using (auth.uid() = created_by);
create policy "Creators can delete groups" on public.groups for delete using (auth.uid() = created_by);

-- GROUP MEMBERS POLICIES
-- Users can view members of their groups
create policy "Users can view group members" on public.group_members for select using (
  exists (select 1 from public.group_members gm where gm.group_id = group_id and gm.user_id = auth.uid())
);
-- Users can insert group members if they are already in the group (or group creator handles it)
create policy "Members can add others to group" on public.group_members for insert with check (
  exists (select 1 from public.groups where id = group_id and created_by = auth.uid()) OR
  exists (select 1 from public.group_members where group_id = group_members.group_id and user_id = auth.uid())
);
-- Members can remove themselves or creator can remove anyone
create policy "Members can remove members" on public.group_members for delete using (
  auth.uid() = user_id OR
  exists (select 1 from public.groups where id = group_id and created_by = auth.uid())
);

-- EXPENSES POLICIES
-- Users can view expenses in their groups, or expenses they are involved in
create policy "Users can view expenses" on public.expenses for select using (
  exists (select 1 from public.group_members where group_id = expenses.group_id and user_id = auth.uid()) OR
  paid_by = auth.uid() OR
  exists (select 1 from public.expense_splits where expense_id = id and user_id = auth.uid())
);
-- Users can insert expenses
create policy "Users can insert expenses" on public.expenses for insert with check (
  auth.uid() = paid_by
);

-- EXPENSE SPLITS POLICIES
-- Users can view splits for expenses they can view
create policy "Users can view expense splits" on public.expense_splits for select using (
  exists (select 1 from public.expenses where id = expense_id and (
    paid_by = auth.uid() OR
    exists (select 1 from public.group_members where group_id = public.expenses.group_id and user_id = auth.uid())
  ))
);
-- Users can insert splits
create policy "Users can insert expense splits" on public.expense_splits for insert with check (
  true -- ideally verify the user is inserting for an expense they created
);

-- SETTLEMENTS POLICIES
create policy "Users can view settlements" on public.settlements for select using (
  payer_id = auth.uid() OR payee_id = auth.uid() OR
  (group_id is not null and exists (select 1 from public.group_members where group_id = settlements.group_id and user_id = auth.uid()))
);
create policy "Users can insert settlements" on public.settlements for insert with check (
  payer_id = auth.uid() OR payee_id = auth.uid()
);

-- STORAGE BUCKETS
insert into storage.buckets (id, name, public) values ('receipts', 'receipts', true) on conflict (id) do nothing;

create policy "Users can view receipts" on storage.objects for select using ( bucket_id = 'receipts' );
create policy "Users can upload receipts" on storage.objects for insert with check ( bucket_id = 'receipts' and auth.role() = 'authenticated' );

