# EcomStore - Next.js E-commerce Application

A modern e-commerce application built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## Features

- Product listing and management
- Image upload and storage with Supabase
- Responsive design with Tailwind CSS
- Type-safe database operations
- Server-side rendering for better SEO

## Prerequisites

- Node.js 18.x or later
- npm or yarn
- Supabase account

## Setup

1. Clone the repository:

```bash
git clone <your-repo-url>
cd ecom
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

4. Set up your Supabase database with the following schema:

```sql
create table products (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  price numeric not null,
  image_url text
);

-- Enable RLS
alter table products enable row level security;

-- Create policies
create policy "Enable read access for all users" on products for select using (true);
create policy "Enable insert for authenticated users only" on products for insert with check (auth.role() = 'authenticated');
create policy "Enable update for authenticated users only" on products for update using (auth.role() = 'authenticated');
create policy "Enable delete for authenticated users only" on products for delete using (auth.role() = 'authenticated');
```

5. Create a storage bucket named 'products' in your Supabase project for product images.

## Development

Run the development server:

```bash
npm run dev
# or
yarn dev
```

## Production Deployment

1. Build the application:

```bash
npm run build
# or
yarn build
```

2. Start the production server:

```bash
npm run start
# or
yarn start
```

### Deployment Checklist

- [ ] Set up environment variables in your deployment platform
- [ ] Configure Supabase security policies
- [ ] Set up proper CORS settings in Supabase
- [ ] Enable rate limiting for API routes
- [ ] Configure proper caching headers
- [ ] Set up error monitoring (e.g., Sentry)
- [ ] Configure proper security headers

## Type Safety

Run type checking:

```bash
npm run typecheck
# or
yarn typecheck
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License.
