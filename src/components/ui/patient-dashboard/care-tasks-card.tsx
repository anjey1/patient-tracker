import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Trophy } from 'lucide-react';
import { Task } from '../../../types';

interface CareTasksCardProps {
  tasks: Task[];
  completedTasks: number;
  taskProgress: number;
  allTasksCompleted: boolean;
  onToggleTask: (id: string) => void;
}

export function CareTasksCard({
  tasks,
  completedTasks,
  taskProgress,
  allTasksCompleted,
  onToggleTask
}: CareTasksCardProps) {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Care Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        {allTasksCompleted ? (
          <div className="flex flex-col items-center justify-center space-y-2 py-8 text-center">
            <Trophy className="h-8 w-8 text-yellow-500" />
            <p className="font-medium">Great job!</p>
            <p className="text-sm text-muted-foreground">Come back tomorrow</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <div className="mb-1 flex justify-between">
                <span className="text-sm font-medium">Daily Progress</span>
                <span className="text-sm text-muted-foreground">
                  {completedTasks}/{tasks.length}
                </span>
              </div>
              <Progress value={taskProgress} className="h-2" />
            </div>
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center space-x-2">
                <Checkbox
                  id={task.id}
                  checked={task.completed}
                  onCheckedChange={() => onToggleTask(task.id)}
                  disabled={allTasksCompleted}
                />
                <label
                  htmlFor={task.id}
                  className={`text-sm ${
                    task.completed ? 'text-muted-foreground line-through' : ''
                  }`}
                >
                  {task.name}
                </label>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
