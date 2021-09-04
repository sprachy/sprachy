require('kip-migrate').migrate(async sql => {
  await sql`
    CREATE TABLE public.patterns (
        id bigint NOT NULL,
        created_at timestamp with time zone DEFAULT now() NOT NULL,
        updated_at timestamp with time zone DEFAULT now() NOT NULL,
        slug text NOT NULL,
        title text NOT NULL,
        published boolean DEFAULT false NOT NULL
    );
  `
})