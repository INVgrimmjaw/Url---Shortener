import {Request, Response} from 'express';
import { incrementAccessCount, updateDate, geturlRecordfromOriginalUrl, geturlRecordfromshortenedUrl, shortenUrlService, deleteUrlRecord } from '../services/url.service.js';

export async function shortenUrlController(req: Request, res: Response): Promise<void> {
  try {
    const { url } = req.body;
    const urlrecord = await shortenUrlService(url);
    res.status(200).json({ id: urlrecord.id, url: urlrecord.url, shortenedUrl: urlrecord.shortenedUrl, createdAt: urlrecord.createdAt, updatedAt: urlrecord.updatedAt, accessCount: urlrecord.accessCount });
  } catch (error) {
    console.error('Error in shortenUrlController:', error);
    res.status(500).json({ error: 'Failed to shorten URL' });
  }
}

export async function expandUrlController(req: Request, res: Response): Promise<void> {
  try {
    const { shortenedUrl } = req.body;
    const urlRecord: any = await geturlRecordfromshortenedUrl(shortenedUrl);
    
    if (urlRecord) {
      await incrementAccessCount(urlRecord.url);
      res.status(200).json({ id: urlRecord.id, url: urlRecord.url, shortenedUrl: urlRecord.shortenedUrl, createdAt: urlRecord.createdAt, updatedAt: urlRecord.updatedAt, accessCount: urlRecord.accessCount });
    } else {
      res.status(404).json({ error: 'URL not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to expand URL' });
  }
}

export async function getstatsController(req: Request, res: Response): Promise<void> {
  try {
    const { shortenedUrl } = req.body;
    const urlRecord: any = await geturlRecordfromshortenedUrl(shortenedUrl);
    if (urlRecord) {
      res.status(200).json({ id: urlRecord.id, createdAt: urlRecord.createdAt, updatedAt: urlRecord.updatedAt, url: urlRecord.url, accessCount: urlRecord.accessCount });
    } else {
      res.status(404).json({ error: 'URL not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to get URL stats' });
  }
}

export  async function updateUrlController(req: Request, res: Response): Promise<void> {
  const { originalUrl } = req.body;
  const urlRecord: any = await geturlRecordfromOriginalUrl(originalUrl);
  try {
    await updateDate(urlRecord.shortenedUrl);
    res.status(200).json({ id: urlRecord.id, createdAt: urlRecord.createdAt, updatedAt: urlRecord.updatedAt, url: urlRecord.url});
  } catch (error) {
    res.status(500).json({ error: 'Failed to get all URLs' });
  }
}

export async function deleteUrlController(req: Request, res: Response): Promise<void> {
  try {
    const { shortenedUrl } = req.body;
    await deleteUrlRecord(shortenedUrl);
    res.status(200).json({ message: 'URL deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete URL' });
  }
}