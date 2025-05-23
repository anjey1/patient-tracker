import { MoodEntry } from '../../../types';

interface MoodHistoryChartProps {
  recentMoodEntries: MoodEntry[];
  moodStats: Record<string, number>;
  moodHistory: MoodEntry[];
}

export function MoodHistoryChart({
  recentMoodEntries,
  moodStats,
  moodHistory
}: MoodHistoryChartProps) {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="mb-2 text-sm font-medium">Mood Trend (Last 5 Days)</h4>
        <div className="flex items-end gap-1">
          {recentMoodEntries.map((entry) => (
            <div key={entry.date} className="flex flex-1 flex-col items-center">
              <div
                className="w-full rounded-t-sm bg-primary"
                style={{ height: `${(entry.moodValue / 5) * 100}%` }}
              />
              <div className="mt-1 text-xl">{entry.emoji}</div>
              <div className="text-xs text-muted-foreground">
                {new Date(entry.date).toLocaleDateString(undefined, {
                  weekday: 'short'
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="mb-2 text-sm font-medium">Mood Distribution</h4>
          <div className="flex flex-wrap gap-2">
            {Object.entries(moodStats).map(([label, count]) => (
              <div key={label} className="flex items-center">
                <div className="mr-2 h-4 w-4 rounded-full bg-primary" />
                <span className="text-sm">
                  {label}: {count}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="mb-2 text-sm font-medium">Average Mood</h4>
          <div className="text-2xl font-bold">
            {moodHistory.length > 0
              ? (
                  moodHistory.reduce((sum, entry) => sum + entry.moodValue, 0) /
                  moodHistory.length
                ).toFixed(1)
              : '--'}
            /5
          </div>
        </div>
      </div>
    </div>
  );
}
