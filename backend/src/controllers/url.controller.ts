import {Request, Response} from 'express';
import shortenUrlService from '../services/url.service';

export async function shortenUrlController(req: Request, res: Response): Promise<void> {
  try {
    const { url } = req.body;
    const shortenedUrl = await shortenUrlService(url);
    res.status(200).json({ shortenedUrl });
  } catch (error) {
    res.status(500).json({ error: 'Failed to shorten URL' });
  }
}