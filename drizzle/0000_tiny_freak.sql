CREATE TABLE `progress_items` (
	`user_id` integer NOT NULL,
	`pattern_id` text NOT NULL,
	`experience` integer DEFAULT 0 NOT NULL,
	`initially_learned_at` integer NOT NULL,
	`last_experience_gain_at` integer NOT NULL,
	PRIMARY KEY(`pattern_id`, `user_id`),
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`hashed_password` text NOT NULL,
	`username` text NOT NULL,
	`display_name` text NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`is_admin` integer DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `email` ON `users` (`username`);--> statement-breakpoint
CREATE UNIQUE INDEX `username` ON `users` (`username`);