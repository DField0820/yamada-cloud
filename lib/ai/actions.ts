'use server';

export type ProcessState = {
  processed?: string;
  error?: string;
};

export async function processTextFile(prevState: ProcessState, formData: FormData): Promise<ProcessState> {
  const file = formData.get('file');
  if (!file || !(file instanceof File)) {
    return { error: 'No file uploaded' };
  }
  try {
    const text = await file.text();
    const processed = text.toUpperCase();
    return { processed };
  } catch (err) {
    return { error: 'Failed to process file' };
  }
}