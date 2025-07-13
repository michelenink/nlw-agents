ALTER TABLE "questions" ALTER COLUMN "answer" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "questions" ALTER COLUMN "created_at" SET NOT NULL;