import axios from 'axios';
import { config } from 'dotenv';
import { readFileSync, writeFileSync, createWriteStream } from 'fs';

/**
 * Example artwork data:
 * ```json
 * {
 *	"fullName": "Ethan Davidson's artwork",
 *  "picture": "ethan-davidson-artwork.png",
 * }
 * ```
 */
const ARTWORK_FILENAME = './src/lib/constants/artwork.json';

/**
 * Parses the first instance of an image URL from a markdown string.
 */
function parseImgSrcFromMd(markdown) {
  // https://regex101.com/r/cSbfvF/3/
  const mdPattern = /!\[[^\]]*\]\((?<filename>.*?)(?="|\))(?<optionalpart>".*")?\)/m;
  let match = mdPattern.exec(markdown);
  if (match !== null) return match.groups.filename;

  // https://stackoverflow.com/a/450117
  const htmlPattern = /src\s*=\s*"(.+?)"/m;
  match = htmlPattern.exec(markdown);
  if (match !== null) return match[1];
  return null;
}

async function downloadArtworkImage(url, artName) {
  const cleanArtName = artName.trim().toLowerCase().replace(/\s/g, '-');
  const filename = `${encodeURIComponent(cleanArtName)}.png`;
  const imagePath = `./static/assets/artwork/${filename}`;
  const response = await axios({ url, responseType: 'stream' });
  return await new Promise((resolve, reject) =>
    response.data
      .pipe(createWriteStream(imagePath))
      .on('finish', () => resolve(filename))
      .on('error', reject)
  );
}

async function updateArtwork() {
  const TIERS_JSON = JSON.parse(readFileSync('./src/lib/constants/tiers.json'));
  const result = JSON.parse(readFileSync(ARTWORK_FILENAME));

  const {
    ['artwork Name']: fullName,
    ['Overwrite artwork Picture']: picture,
  } = JSON.parse(process.env.FORM_DATA);

  const isValidFullName = fullName?.trim().length > 0 ?? false;
  if (!isValidFullName) {
    console.error(`received invalid artwork name, ${fullName}`);
    return false;
  }

  let artworkIndex = result.findIndex((artwork) => artwork.fullName === fullName);
  if (artworkIndex === -1) {
    // artwork fullName not found, so let's create a new artwork
    result.push({ fullName, positions: {} });
    artworkIndex = result.length - 1;
  }

  const tierValue = TIERS_JSON.indexOf(rawTier);
  if (tierValue !== -1 && term.trim().length > 0 && title !== 'DELETE') {
    position.tier = tierValue;
  }

  if (title !== 'DELETE') {
    result[artworkIndex].positions[abbreviatedTerm] = position;
  }

  const displayNameNeedsUpdate = displayName !== undefined && displayName.trim().length > 0;
  if (displayNameNeedsUpdate) {
    result[artworkIndex].displayName = displayName.trim();
  }

  const pictureNeedsUpdate = picture !== undefined && picture.trim().length > 0;
  if (pictureNeedsUpdate) {
    const imgSrc = parseImgSrcFromMd(picture);
    if (imgSrc === null) {
      console.error(`received invalid artwork picture '${picture}'`);
      return false;
    }
    const relativeImgSrc = await downloadArtworkImage(imgSrc, fullName);
    if (typeof relativeImgSrc === 'string') result[artworkIndex].picture = relativeImgSrc;
  }

  console.log(`${fullName.trim()}'s updated artwork data: `, result[artworkIndex]);

  // Do not forget to make our linter happy by adding a new line at the end of the generated file
  writeFileSync(ARTWORK_FILENAME, JSON.stringify(result, null, 2) + '\n');
  return true;
}

try {
  config();
  const success = await updateArtwork();
  if (success) process.exit(0);
} catch (error) {
  console.error(error);
}

process.exit(1);
