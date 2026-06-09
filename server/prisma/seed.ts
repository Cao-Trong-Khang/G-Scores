import { createReadStream } from "node:fs";
import { resolve } from "node:path";
import { parse } from "csv-parse";
import { Prisma } from "../src/generated/prisma/client";
import { prisma } from "../src/lib/prisma";

type RawExamScoreRow = {
  sbd: string;
  toan?: string;
  ngu_van?: string;
  ngoai_ngu?: string;
  vat_li?: string;
  hoa_hoc?: string;
  sinh_hoc?: string;
  lich_su?: string;
  dia_li?: string;
  gdcd?: string;
  ma_ngoai_ngu?: string;
};

const BATCH_SIZE = 1000;
const LOG_INTERVAL = 100_000;
const csvPath = resolve(process.cwd(), "data", "diem_thi_thpt_2024.csv");

function parseScore(value: string | undefined, fieldName: keyof RawExamScoreRow): number | null {
  const trimmedValue = value?.trim();

  if (!trimmedValue) {
    return null;
  }

  const score = Number(trimmedValue);

  if (Number.isNaN(score)) {
    throw new Error(`Invalid score value "${value}" in CSV field "${fieldName}".`);
  }

  return score;
}

function mapRow(row: RawExamScoreRow): Prisma.ExamScoreCreateManyInput {
  const registrationNumber = row.sbd?.trim();

  if (!registrationNumber) {
    throw new Error("CSV row is missing required field \"sbd\".");
  }

  return {
    registrationNumber,
    math: parseScore(row.toan, "toan"),
    literature: parseScore(row.ngu_van, "ngu_van"),
    foreignLanguage: parseScore(row.ngoai_ngu, "ngoai_ngu"),
    physics: parseScore(row.vat_li, "vat_li"),
    chemistry: parseScore(row.hoa_hoc, "hoa_hoc"),
    biology: parseScore(row.sinh_hoc, "sinh_hoc"),
    history: parseScore(row.lich_su, "lich_su"),
    geography: parseScore(row.dia_li, "dia_li"),
    civicEducation: parseScore(row.gdcd, "gdcd"),
    foreignLanguageCode: row.ma_ngoai_ngu?.trim() || null,
  };
}

async function insertBatch(batch: Prisma.ExamScoreCreateManyInput[]): Promise<number> {
  if (batch.length === 0) {
    return 0;
  }

  const result = await prisma.examScore.createMany({ data: batch });
  return result.count;
}

async function main(): Promise<void> {
  console.log("Seeding exam scores from CSV...");
  console.log(`CSV file: ${csvPath}`);

  await prisma.examScore.deleteMany();
  console.log("Deleted existing exam scores.");

  const parser = createReadStream(csvPath).pipe(
    parse({
      columns: true,
      bom: true,
      skip_empty_lines: true,
      trim: true,
    }),
  );

  let batch: Prisma.ExamScoreCreateManyInput[] = [];
  let totalImported = 0;

  for await (const row of parser as AsyncIterable<RawExamScoreRow>) {
    batch.push(mapRow(row));

    if (batch.length >= BATCH_SIZE) {
      totalImported += await insertBatch(batch);
      if (totalImported % LOG_INTERVAL === 0) {
        console.log(`Imported ${totalImported} rows...`);
      }
      batch = [];
    }
  }

  totalImported += await insertBatch(batch);
  console.log(`Seed completed. Imported ${totalImported} exam scores.`);
}

main()
  .catch((error: unknown) => {
    console.error("Seed failed.");
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
