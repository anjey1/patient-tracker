import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MoodOption, MoodEntry } from '../../../types';
import { MoodHistoryChart } from './mood-history-chart';

interface MoodCardProps {
  selectedMood: number | null;
  moodHistory: MoodEntry[];
  showHistory: boolean;
  recentMoodEntries: MoodEntry[];
  moodStats: Record<string, number>;
  moodOptions: MoodOption[];
  onMoodSelect: (value: number) => void;
  onToggleHistory: () => void;
}

export function MoodCard({
  selectedMood,
  moodHistory,
  showHistory,
  recentMoodEntries,
  moodStats,
  moodOptions,
  onMoodSelect,
  onToggleHistory
}: MoodCardProps) {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Daily Mood Check-in</CardTitle>
          <Button variant="ghost" size="sm" onClick={onToggleHistory}>
            {showHistory ? 'Hide History' : 'View History'}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {showHistory ? (
          <MoodHistoryChart
            recentMoodEntries={recentMoodEntries}
            moodStats={moodStats}
            moodHistory={moodHistory}
          />
        ) : (
          <>
            <div className="flex justify-between space-x-2">
              {moodOptions.map((mood) => (
                <Button
                  key={mood.value}
                  variant={selectedMood === mood.value ? 'default' : 'outline'}
                  size="lg"
                  className="h-16 flex-1 flex-col p-2 text-2xl"
                  onClick={() => onMoodSelect(mood.value)}
                >
                  <span>{mood.emoji}</span>
                  <span className="mt-1 text-xs">{mood.label}</span>
                </Button>
              ))}
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              {selectedMood ? (
                <>
                  You reported feeling{' '}
                  <span className="font-medium">
                    {moodOptions
                      .find((m) => m.value === selectedMood)
                      ?.label.toLowerCase()}
                  </span>{' '}
                  today.
                  {moodHistory.some(
                    (entry) =>
                      entry.date === new Date().toISOString().split('T')[0]
                  ) && (
                    <span className="block text-green-500">✓ Submitted</span>
                  )}
                </>
              ) : (
                'How are you feeling today?'
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
