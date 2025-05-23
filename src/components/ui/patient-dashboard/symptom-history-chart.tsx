import { SymptomEntry } from '../../../types';

interface SymptomHistoryChartProps {
  symptomHistory: SymptomEntry[];
  symptomLeaderboard: Record<string, { name: string; count: number }>;
}

export function SymptomHistoryChart({
  symptomHistory,
  symptomLeaderboard
}: SymptomHistoryChartProps) {
  return (
    <>
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Symptom History - Last 7 Days</h4>
        <div className="flex h-32 items-end gap-1 border-b">
          {[...symptomHistory]
            .sort(
              (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
            )
            .slice(-7)
            .map((entry) => {
              const maxCount = Math.max(
                1,
                ...symptomHistory.map((e) => e.count)
              );
              const heightPercentage = (entry.count / maxCount) * 100;
              const containerHeightPx = 128;
              const barHeightPx = (heightPercentage / 100) * containerHeightPx;
              const dynamicMinHeight = Math.max(8, barHeightPx * 0.5);

              return (
                <div
                  key={entry.date}
                  className="flex flex-1 flex-col items-center"
                >
                  <div
                    className="w-full rounded-t-sm bg-rose-100 transition-all duration-300"
                    style={{
                      height: `${heightPercentage}%`,
                      minHeight: `${dynamicMinHeight}px`
                    }}
                  />
                  <div className="mt-1 text-xs text-muted-foreground">
                    {new Date(entry.date).toLocaleDateString(undefined, {
                      day: 'numeric'
                    })}
                  </div>
                  <div className="mt-1 text-xs font-medium">{entry.count}</div>
                </div>
              );
            })}
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Most Reported Symptoms</h4>
        <div className="overflow-x-auto">
          <div className="min-w-[200px]">
            {Object.values(symptomLeaderboard)
              .sort((a, b) => b.count - a.count)
              .slice(0, 3)
              .map((symptom) => (
                <div
                  key={symptom.name}
                  className="flex justify-between py-1 text-sm"
                >
                  <span>{symptom.name}</span>
                  <span className="font-medium">{symptom.count} times</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
