import React, { useCallback } from 'react';
import { Attachment } from '../types';
import { ImagePlus, X, FileText } from 'lucide-react';

interface FileUploaderProps {
  attachments: Attachment[];
  setAttachments: React.Dispatch<React.SetStateAction<Attachment[]>>;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ attachments, setAttachments }) => {
  
  const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newAttachments: Attachment[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Basic validation
      if (!file.type.startsWith('image/') && file.type !== 'application/pdf') {
        alert(`Sorry, ${file.name} is not supported. Please upload Images or PDFs!`);
        continue;
      }

      // Read file to Base64
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
      });

      try {
        const base64 = await base64Promise;
        newAttachments.push({
          file,
          previewUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : '', // PDF doesn't need immediate preview url for this simple view
          base64,
          mimeType: file.type
        });
      } catch (e) {
        console.error("Error reading file", e);
      }
    }

    setAttachments(prev => [...prev, ...newAttachments]);
    
    // Reset input
    event.target.value = '';
  }, [setAttachments]);

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Hidden Input */}
      <input
        type="file"
        id="file-upload"
        multiple
        accept="image/*,application/pdf"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Preview Area */}
      {attachments.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-2 px-1">
          {attachments.map((att, idx) => (
            <div key={idx} className="relative shrink-0 animate-fade-in-up">
              <div className="w-16 h-16 rounded-xl border-2 border-cute-pink bg-white flex items-center justify-center overflow-hidden">
                {att.mimeType.startsWith('image/') ? (
                  <img src={att.previewUrl} alt="preview" className="w-full h-full object-cover" />
                ) : (
                  <FileText className="text-cute-text/50" />
                )}
              </div>
              <button
                onClick={() => removeAttachment(idx)}
                className="absolute -top-1 -right-1 bg-red-400 text-white rounded-full p-0.5 shadow-md hover:bg-red-500 transition-colors"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
      
      {/* Trigger Button handled in parent or here? Let's export a label/button */}
    </div>
  );
};
