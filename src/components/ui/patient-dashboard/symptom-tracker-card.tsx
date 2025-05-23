import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Symptom, SymptomEntry } from '../../../types';
import { SymptomHistoryChart } from './symptom-history-chart';

interface SymptomTrackerCardProps {
  symptomState: Symptom[];
  symptomHistory: SymptomEntry[];
  symptomLeaderboard: Record<string, { name: string; count: number }>;
  onToggleSymptom: (id: string) => void;
  onSubmitSymptoms: () => void;
}

export function SymptomTrackerCard({
  symptomState,
  symptomHistory,
  symptomLeaderboard,
  onToggleSymptom,
  onSubmitSymptoms
}: SymptomTrackerCardProps) {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Symptom Tracker</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Today's Symptoms</h4>
          {symptomState.map((symptom) => (
            <div key={symptom.id} className="flex items-center space-x-2">
              <Checkbox
                id={symptom.id}
                checked={symptom.checked || false}
                onCheckedChange={() => onToggleSymptom(symptom.id)}
              />
              <label
                htmlFor={symptom.id}
                className={`text-sm ${symptom.checked ? 'font-medium' : ''}`}
              >
                {symptom.name}
              </label>
            </div>
          ))}
          <Button
            variant="outline"
            className="mt-2 w-full"
            onClick={onSubmitSymptoms}
          >
            Submit Symptoms
          </Button>
        </div>

        <SymptomHistoryChart
          symptomHistory={symptomHistory}
          symptomLeaderboard={symptomLeaderboard}
        />
      </CardContent>
    </Card>
  );
}
