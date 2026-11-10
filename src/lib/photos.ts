import { captions } from '../data/photos'

export interface Photo { src: string; alt: string; caption?: string }

// Every .webp inside src/assets/photos is picked up automatically (sorted by file name).
const files = import.meta.glob('../assets/photos/**/*.webp', { eager: true, query: '?url', import: 'default' }) as Record<string, string>

/** photosIn('projects/robotics') or photosIn('moments') */
export function photosIn(folder: string): Photo[] {
  const prefix = `../assets/photos/${folder}/`
  return Object.keys(files)
    .filter((k) => k.startsWith(prefix))
    .sort()
    .map((k) => {
      const name = k.slice(prefix.length)
      const caption = captions[`${folder}/${name}`]
      return { src: files[k], caption, alt: caption ?? 'Photograph' }
    })
}
