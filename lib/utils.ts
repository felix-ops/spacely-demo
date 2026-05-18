/**
 * Calculates the linear projection of an input value onto an output range, based on an input range.
 *
 * @param inputRange A tuple representing the start and end of the input range (inclusive).
 * @param outputRange A tuple representing the start and end of the output range (inclusive).
 * @param inputVal The input value to project onto the output range.
 * @returns The output value corresponding to the input value projected onto the output range.
 */
export function linearProjection(
  inputRange: [start: number, end: number],
  outputRange: [start: number, end: number],
  inputVal: number,
) {
  const outputVal =
    outputRange[0] +
    ((inputVal - inputRange[0]) * (outputRange[1] - outputRange[0])) /
      (inputRange[1] - inputRange[0]);

  return outputVal;
}

/**
 * Maps an input value from one range to another.  But unlike linearProjection with
 * mapRange we can pass any value as an inputval and when the inputval is within ActivationRange the values are directly
 * mapped to outputRange, otherwise the values will be clamped to the min and max of outputRange
 *
 * if inputVal is less than ActivationRange[start] the function will return outputRange[min], if its greater than ActivationRange[end]
 * it'll return outputRange[max].
 *
 * @param inputVal The input value to be mapped.
 * @param fromRange The range of the desired starting and ending point as a array [start, End].
 * @param toRange The desired output range as a array [min, max] "in the outputRange the argument min should be smaller than the max.
 * If you want to invert the mapping switch the 'Start' and 'End' values in the ActivationRange".
 * @returns The mapped output value within the specified output range.
 */

export function mapRange(
  inputVal: number,
  fromRange: [min: number, max: number],
  toRange: [min: number, max: number],
  clamp: boolean = true,
) {
  //If min is greater then max swap the values
  if (toRange[1] < toRange[0]) {
    toRange = [toRange[1], toRange[0]];
    fromRange = [fromRange[1], fromRange[0]];
  }

  let mapped_output = linearProjection(
    [fromRange[0], fromRange[1]],
    [toRange[0], toRange[1]],
    inputVal,
  );
  if (clamp)
    mapped_output = Math.max(toRange[0], Math.min(toRange[1], mapped_output));

  return mapped_output;
}

/**
 * takes two inputs a and b and returns a boolean of weather they are almost equal or not
 *
 * @param a value 1 for comparision
 * @param b value 2 for comparision
 * @param epsilon a small value which defines the precision of the comparision
 * @returns The boolean of whether they are almost equal or not
 */
export function almostEqual(
  a: number,
  b: number,
  epsilon: number = Number.EPSILON,
): boolean {
  return Math.abs(a - b) < epsilon;
}

/**
 * Fetches a PNG file from a given URL and parses its binary chunks to extract the 'max_depth' metadata value.
 * This is typically stored in a tEXt chunk by image processing libraries like PIL.
 *
 * @param url The URL of the PNG image to fetch and parse.
 * @returns A promise that resolves to the parsed max_depth float value if found, or null if it cannot be found or parsing fails.
 */
export async function fetchMaxDepthFromPng(url: string): Promise<number | null> {
  try {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    const dataView = new DataView(buffer);

    // Check PNG signature
    if (
      dataView.getUint32(0) !== 0x89504e47 ||
      dataView.getUint32(4) !== 0x0d0a1a0a
    ) {
      return null;
    }

    let offset = 8;
    while (offset < buffer.byteLength) {
      const length = dataView.getUint32(offset);
      const type = String.fromCharCode(
        dataView.getUint8(offset + 4),
        dataView.getUint8(offset + 5),
        dataView.getUint8(offset + 6),
        dataView.getUint8(offset + 7),
      );

      if (type === "tEXt") {
        const dataOffset = offset + 8;
        let keyword = "";
        let i = 0;
        while (i < length) {
          const charCode = dataView.getUint8(dataOffset + i);
          if (charCode === 0) break;
          keyword += String.fromCharCode(charCode);
          i++;
        }

        if (keyword === "max_depth") {
          i++; // Skip null terminator
          let valueStr = "";
          while (i < length) {
            valueStr += String.fromCharCode(dataView.getUint8(dataOffset + i));
            i++;
          }
          const parsed = parseFloat(valueStr);
          if (!isNaN(parsed)) return parsed;
        }
      }

      if (type === "IEND") break;
      offset += 12 + length;
    }
  } catch (err) {
    console.error("Failed to parse PNG metadata:", err);
  }
  return null;
}

let activeBlobUrls: string[] = [];

/**
 * Preloads a list of image URLs in parallel, tracks the download progress percentage,
 * and returns local Object URLs (blobs) to avoid redundant network queries and ensure
 * instant resolution in client frameworks (e.g., Babylon.js texture loading).
 * Automatically handles revoking previous Object URLs to prevent browser memory leaks.
 *
 * @param urls An array of image URLs to fetch and cache locally.
 * @param onProgress An optional callback invoked with the completion percentage (0-100).
 * @returns A promise that resolves to an array of local Object URLs (or original URLs on fetch failure).
 */
export const preloadImages = async (
  urls: string[],
  onProgress?: (percent: number) => void,
): Promise<string[]> => {
  // Revoke previous blob URLs to prevent memory leaks
  activeBlobUrls.forEach((url) => {
    if (url.startsWith("blob:")) {
      URL.revokeObjectURL(url);
    }
  });
  activeBlobUrls = [];

  let loadedCount = 0;
  onProgress?.(0);

  const results = await Promise.all(
    urls.map(async (url) => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Fetch failed for ${url}`);
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        loadedCount++;
        onProgress?.(Math.round((loadedCount / urls.length) * 100));
        activeBlobUrls.push(blobUrl);
        return blobUrl;
      } catch (e) {
        console.warn("Preload failed, falling back to direct URL:", e);
        loadedCount++;
        onProgress?.(Math.round((loadedCount / urls.length) * 100));
        return url;
      }
    })
  );
  return results;
};
