import shortenUrl from "shorten-url";
import { db } from "../prisma/db.js";

export async function shortenUrlService(url: string): Promise<{
  id: string;
  url: string;
  shortenedUrl: string;
  createdAt: Date;
  updatedAt: Date;
  accessCount: number;
}> {
  const shortenedUrl = await shortenUrl(url, 30);

  const urlRecord = await db.orm.public.Url.
    create({
      url: url,
      shortenedUrl: shortenedUrl,
    });
  return {
    id: urlRecord.id,
    url: urlRecord.url,
    shortenedUrl: urlRecord.shortenedUrl,
    createdAt: urlRecord.createdAt,
    updatedAt: urlRecord.updatedAt,
    accessCount: urlRecord.accessCount,
  }
}

export async function geturlRecordfromshortenedUrl(shortenedUrl: string) {
  return db.orm.public.Url.
    where({
      shortenedUrl: shortenedUrl,
    }).first();
}

export async function geturlRecordfromOriginalUrl(originalUrl: string) {
  return db.orm.public.Url.
    where({
      url: originalUrl,
    });
}

export async function incrementAccessCount(url: string): Promise<void> {
  const urlRecord = await db.orm.public.Url
    .where({
      url,
    })
    .first();

  if (!urlRecord) {
    console.log(`URL record not found for URL: ${url}`);
    return;
  }

  await db.orm.public.Url
    .where({
      url: urlRecord.url,
    })
    .update({
      accessCount: urlRecord.accessCount + 1,
    });
}

export async function updateDate(shortenedUrl: string): Promise<void> {
  await db.orm.public.Url
    .where({
      shortenedUrl: shortenedUrl,
    })
    .update({
      updatedAt: new Date(),
    });
}

export async function deleteUrlRecord(shortenedUrl: string): Promise<void> {
  await db.orm.public.Url
    .where({
      shortenedUrl,
    })
    .delete();
}