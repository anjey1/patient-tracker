import { useState, useEffect } from 'react';
import {
  MoodCard,
  NotificationCard,
  SymptomTrackerCard,
  CareTasksCard
} from '@/components/ui/patient-dashboard';
import {
  initialMoodHistory,
  initialSymptoms,
  initialTasks,
  initialNotifications,
  moodOptions,
  initialSymptomHistory
} from '../../constants/data';
import {
  DashProps,
  MoodEntry,
  Symptom,
  SymptomEntry,
  Task,
  Notification
} from '../../types';

export default function Dash(props: DashProps) {
  // Mood data and history
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>(
    props.initialMoodHistory || initialMoodHistory
  );
  const [showHistory, setShowHistory] = useState(false);

  // Symptom tracker
  const [symptomState, setSymptomState] = useState<Symptom[]>(
    props.initialSymptoms || initialSymptoms
  );
  const [symptomHistory, setSymptomHistory] = useState<SymptomEntry[]>(
    initialSymptomHistory
  );

  // Care tasks
  const [tasks, setTasks] = useState<Task[]>(
    props.initialTasks || initialTasks
  );
  const completedTasks = tasks.filter((task) => task.completed).length;
  const taskProgress = (completedTasks / tasks.length) * 100;
  const allTasksCompleted = tasks.length > 0 && completedTasks === tasks.length;

  // Notifications
  const [notifications, setNotifications] = useState<Notification[]>(
    props.initialNotifications || initialNotifications
  );

  // Set today's mood if already logged
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const todayMood = moodHistory.find((entry) => entry.date === today);
    if (todayMood) {
      setSelectedMood(todayMood.moodValue);
    }
  }, [moodHistory]);

  // Calculate mood statistics
  const moodStats = moodHistory.reduce(
    (acc, entry) => {
      acc[entry.moodLabel] = (acc[entry.moodLabel] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  // Calculate symptom leaderboard
  const symptomLeaderboard = symptomHistory.reduce(
    (acc, entry) => {
      entry.symptoms.forEach((symptom) => {
        acc[symptom.id] = acc[symptom.id] || { name: symptom.name, count: 0 };
        acc[symptom.id].count += 1;
      });
      return acc;
    },
    {} as Record<string, { name: string; count: number }>
  );

  // Get last 5 mood entries including today
  const recentMoodEntries = [...moodHistory]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  // Handlers
  const handleMoodSelect = (value: number) => {
    const today = new Date().toISOString().split('T')[0];
    const mood = moodOptions.find((m) => m.value === value);

    setSelectedMood(value);

    const newHistory = moodHistory.filter((entry) => entry.date !== today);
    setMoodHistory([
      ...newHistory,
      {
        date: today,
        moodValue: value,
        moodLabel: mood?.label || '',
        emoji: mood?.emoji || ''
      }
    ]);
  };

  const toggleSymptom = (id: string) => {
    setSymptomState((prev) =>
      prev.map((symptom) =>
        symptom.id === id ? { ...symptom, checked: !symptom.checked } : symptom
      )
    );
  };

  const submitSymptoms = () => {
    const today = new Date().toISOString().split('T')[0];
    const selectedSymptoms = symptomState.filter((s) => s.checked);

    const newHistory = symptomHistory.filter((entry) => entry.date !== today);
    setSymptomHistory([
      ...newHistory,
      {
        date: today,
        symptoms: selectedSymptoms.map((s) => ({ id: s.id, name: s.name })),
        count: selectedSymptoms.length
      }
    ]);
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const markNotificationAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  return (
    <div className="grid h-full gap-4 overflow-y-auto p-0 md:grid-cols-2 lg:grid-cols-4">
      <MoodCard
        selectedMood={selectedMood}
        moodHistory={moodHistory}
        showHistory={showHistory}
        recentMoodEntries={recentMoodEntries}
        moodStats={moodStats}
        moodOptions={moodOptions}
        onMoodSelect={handleMoodSelect}
        onToggleHistory={() => setShowHistory(!showHistory)}
      />

      <NotificationCard
        notifications={notifications}
        onMarkAsRead={markNotificationAsRead}
      />

      <SymptomTrackerCard
        symptomState={symptomState}
        symptomHistory={symptomHistory}
        symptomLeaderboard={symptomLeaderboard}
        onToggleSymptom={toggleSymptom}
        onSubmitSymptoms={submitSymptoms}
      />

      <CareTasksCard
        tasks={tasks}
        completedTasks={completedTasks}
        taskProgress={taskProgress}
        allTasksCompleted={allTasksCompleted}
        onToggleTask={toggleTask}
      />
    </div>
  );
}
