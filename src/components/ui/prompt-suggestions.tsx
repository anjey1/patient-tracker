interface PromptSuggestionsProps {
  label: string;
  append: (message: { role: 'user'; content: string }) => void;
  suggestions: string[];
}

export function PromptSuggestions({
  label,
  append,
  suggestions
}: PromptSuggestionsProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-center text-2xl font-bold">{label}</h2>
      <div className="grid gap-3">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => append({ role: 'user', content: suggestion })}
            className="w-full rounded-lg border bg-background p-4 text-left transition-colors duration-200 hover:bg-muted"
          >
            <p className="font-medium">{suggestion}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
