import { media } from 'constants/media';
import { useMedia } from 'react-use';
export default function useMediaQueries(key: keyof typeof media) {
  return useMedia(media[key]);
}
