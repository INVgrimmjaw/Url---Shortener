import shortenUrl from "shorten-url";
import { prisma } from "../prisma/db";

async function shortenUrlService(url: string): Promise<string> {
  const shortenedUrl = await shortenUrl(url, 30);
  return shortenedUrl;
}

async function expandUrlService(shortenedUrl: string): Promise<string> {
    return prisma.urlMapping.findUnique({
        where: {
            shortenedUrl: shortenedUrl,
        }
    });
}