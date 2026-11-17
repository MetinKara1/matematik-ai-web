import { Buffer } from 'node:buffer';
import { DATA_IMAGE, MAX_IMAGE_BYTES } from './sharedSolutionImage.mjs';

export function decodeSolutionImage(value) {
  if (typeof value !== 'string' || value.length > 11_200_000) return null;
  const match = DATA_IMAGE.exec(value);
  if (!match) return null;
  const base64 = value.slice(match[0].length).replace(/\s/g, '');
  if (!base64 || base64.length % 4 !== 0 || !/^[A-Za-z0-9+/]*={0,2}$/.test(base64)) return null;
  const bytes = Buffer.from(base64, 'base64');
  if (!bytes.length || bytes.length > MAX_IMAGE_BYTES) return null;
  const type = match[1].toLowerCase().replace('jpg', 'jpeg');
  const magic = type === 'jpeg' ? bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff
    : type === 'png' ? bytes.length >= 8 && bytes.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10]))
    : bytes.length >= 12 && bytes.toString('ascii', 0, 4) === 'RIFF' && bytes.toString('ascii', 8, 12) === 'WEBP';
  return magic ? { bytes, contentType: `image/${type}` } : null;
}
