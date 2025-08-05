// /api/fetchVideo.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { videoId } = req.query;
  const API_KEY = process.env.YT_API_KEY;
  if (!videoId || !API_KEY) {
    return res.status(400).json({ error: 'videoId or API key missing' });
  }

  // Récupère les données YouTube
  const videoRes = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${API_KEY}`
  );
  const videoData = await videoRes.json();

  // Récupère les infos de la chaîne
  const channelId = videoData.items?.[0]?.snippet.channelId;
  const chanRes = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${API_KEY}`
  );
  const chanData = await chanRes.json();

  res.status(200).json({ video: videoData.items[0], channel: chanData.items[0] });
}
