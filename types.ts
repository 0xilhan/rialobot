export interface Attachment {
  file: File;
  previewUrl: string;
  base64: string;
  mimeType: string;
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface GenerateContentParams {
  prompt: string;
  knowledgeBase: string;
}
