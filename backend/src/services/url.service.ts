import shortenUrl from "shorten-url";
import { db } from "../prisma/db.js";

export async function shortenUrlService(url: string): Promise<string> {
  const shortenedUrl = await shortenUrl(url, 30);

  await db.orm.public.Url.
    create({
      url: url,
      shortenedUrl: shortenedUrl,
    });

  return shortenedUrl;
}

export async function geturlRecordfromshortenedUrl(shortenedUrl: string) {
  return db.orm.public.Url.
    where({
      shortenedUrl: shortenedUrl,
    });
}

export async function geturlRecordfromOriginalUrl(originalUrl: string) {
  return db.orm.public.Url.
    where({
      url: originalUrl,
    });
}

export async function incrementAccessCount(shortenedUrl: string): Promise<void> {
  const urlRecord = await db.orm.public.Url
    .where({
      shortenedUrl,
    })
    .first();

  if (!urlRecord) {
    return;
  }

  await db.orm.public.Url
    .where({
      shortenedUrl,
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