-- CreateTable
CREATE TABLE "exam_scores" (
    "id" SERIAL NOT NULL,
    "registration_number" TEXT NOT NULL,
    "math" DOUBLE PRECISION,
    "literature" DOUBLE PRECISION,
    "foreign_language" DOUBLE PRECISION,
    "physics" DOUBLE PRECISION,
    "chemistry" DOUBLE PRECISION,
    "biology" DOUBLE PRECISION,
    "history" DOUBLE PRECISION,
    "geography" DOUBLE PRECISION,
    "civic_education" DOUBLE PRECISION,
    "foreign_language_code" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "exam_scores_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "exam_scores_registration_number_key" ON "exam_scores"("registration_number");
