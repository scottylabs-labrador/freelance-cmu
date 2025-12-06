import { useState, KeyboardEvent } from "react";

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  maxTags?: number;
  label?: string;
}

export default function TagInput({
  tags,
  onChange,
  placeholder = "Add a tag...",
  maxTags = 10,
  label,
}: TagInputProps) {
  const [inputValue, setInputValue] = useState("");

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim();

    // Validate tag
    if (!trimmedTag) return;
    if (tags.includes(trimmedTag)) return; // Prevent duplicates
    if (tags.length >= maxTags) return; // Check max limit

    onChange([...tags, trimmedTag]);
    setInputValue("");
  };

  const removeTag = (indexToRemove: number) => {
    onChange(tags.filter((_, index) => index !== indexToRemove));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // Add tag on Enter, comma, or Tab
    if (e.key === "Enter" || e.key === "," || e.key === "Tab") {
      e.preventDefault();
      addTag(inputValue);
    }

    // Remove last tag on Backspace if input is empty
    if (e.key === "Backspace" && !inputValue && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium theme-text-secondary mb-2">
          {label}
          {maxTags && (
            <span className="ml-2 text-xs theme-text-muted">
              ({tags.length}/{maxTags})
            </span>
          )}
        </label>
      )}

      <div className="w-full theme-input border theme-border rounded-lg px-4 py-2.5 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:border-transparent transition-all">
        {/* Tags Display */}
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-blue-600/20 text-blue-400 border border-blue-600/30 px-3 py-1 rounded-full text-xs flex items-center gap-2"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(index)}
                className="hover:text-blue-300 cursor-pointer text-sm transition-colors"
                aria-label={`Remove ${tag}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>

        {/* Input Field */}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={tags.length >= maxTags ? `Max ${maxTags} tags reached` : placeholder}
          disabled={tags.length >= maxTags}
          className="w-full bg-transparent text-sm theme-text-primary placeholder-gray-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>

      {tags.length >= maxTags && (
        <p className="text-yellow-400 text-xs mt-1">
          Maximum number of tags reached
        </p>
      )}
    </div>
  );
}
