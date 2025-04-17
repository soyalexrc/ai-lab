import axios from 'axios';

export async function getBase64FromImageUrl(url: string): Promise<string> {
  const response = await axios.get(url, {
    responseType: 'arraybuffer',
  });

  const base64 = Buffer.from(response.data, 'binary').toString('base64');
  const contentType = response.headers['content-type'] || 'image/png';

  return `data:${contentType};base64,${base64}`;
}
