/**
 * Validates if a given URL points to an image
 */
export function isImageUrl(url: string): boolean {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url.toLowerCase());
  }
  
  /**
   * Fetches an image from a URL and returns it as a File object
   */
  export async function fetchImageFromUrl(url: string): Promise<File> {
    try {
      // Validate URL format
      new URL(url);
  
      // Fetch the image
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Failed to fetch image from URL');
      }
  
      // Check content type
      const contentType = response.headers.get('content-type');
      if (!contentType?.startsWith('image/')) {
        throw new Error('URL does not point to a valid image');
      }
  
      // Get the image data
      const blob = await response.blob();
      
      // Create a File object
      const filename = url.split('/').pop() || 'image.jpg';
      return new File([blob], filename, { type: contentType });
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Invalid URL provided');
    }
  }