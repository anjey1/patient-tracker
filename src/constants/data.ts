import { NavItem, SymptomEntry } from '@/types';

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/',
    icon: 'dashboard',
    label: 'Dashboard'
  },
  {
    title: 'Chat',
    href: '/ai',
    icon: 'user',
    label: 'Chat'
  }
];

// Patient Dashboard
import { MoodEntry, Symptom, Task, Notification } from '../types';

export const initialMoodHistory: MoodEntry[] = [
  { date: '2023-11-11', moodValue: 2, moodLabel: 'Poor', emoji: '🙁' },
  { date: '2023-11-12', moodValue: 3, moodLabel: 'Neutral', emoji: '😐' },
  { date: '2023-11-13', moodValue: 3, moodLabel: 'Neutral', emoji: '😐' },
  { date: '2023-11-14', moodValue: 4, moodLabel: 'Good', emoji: '🙂' },
  { date: '2023-11-15', moodValue: 4, moodLabel: 'Good', emoji: '🙂' }
];

export const initialSymptoms: Symptom[] = [
  {
    id: 'headache',
    name: 'Headache',
    checked: false,
    level: ''
  },
  {
    id: 'fatigue',
    name: 'Fatigue',
    checked: true,
    level: ''
  },
  {
    id: 'nausea',
    name: 'Nausea',
    checked: false,
    level: ''
  },
  {
    id: 'dizziness',
    name: 'Dizziness',
    checked: true,
    level: ''
  },
  {
    id: 'insomnia',
    name: 'Insomnia',
    checked: false,
    level: ''
  }
];

export const initialTasks: Task[] = [
  { id: 'meds-am', name: 'Take morning medication', completed: true },
  { id: 'pt', name: 'Physical therapy exercises', completed: true },
  { id: 'journal', name: 'Journal entry', completed: false },
  { id: 'bp', name: 'Check blood pressure', completed: false },
  { id: 'meds-pm', name: 'Evening medication', completed: false }
];

export const initialNotifications: Notification[] = [
  {
    id: 1,
    title: 'New message from your care team',
    message: 'Dr. Smith sent you a message about your treatment plan.',
    date: '2023-11-15T10:30:00',
    read: false
  },
  {
    id: 2,
    title: 'Appointment reminder',
    message: 'Your next appointment is tomorrow at 2:00 PM.',
    date: '2023-11-14T09:15:00',
    read: false
  }
];

export const moodOptions = [
  { emoji: '😢', label: 'Very poor', value: 1 },
  { emoji: '🙁', label: 'Poor', value: 2 },
  { emoji: '😐', label: 'Neutral', value: 3 },
  { emoji: '🙂', label: 'Good', value: 4 },
  { emoji: '😄', label: 'Excellent', value: 5 }
];

export const initialSymptomHistory: SymptomEntry[] = [
  {
    date: '2023-11-11',
    symptoms: [
      {
        id: 'headache',
        name: 'Headache',
        level: ''
      }
    ],
    count: 1
  },
  {
    date: '2023-11-12',
    symptoms: [
      {
        id: 'headache',
        name: 'Headache',
        level: ''
      },
      {
        id: 'fatigue',
        name: 'Fatigue',
        level: ''
      },
      {
        id: 'dizziness',
        name: 'Dizziness',
        level: ''
      }
    ],
    count: 3
  },
  {
    date: '2023-11-13',
    symptoms: [
      {
        id: 'fatigue',
        name: 'Fatigue',
        level: ''
      },
      {
        id: 'dizziness',
        name: 'Dizziness',
        level: ''
      }
    ],
    count: 2
  },
  {
    date: '2023-11-14',
    symptoms: [
      {
        id: 'headache',
        name: 'Headache',
        level: ''
      },
      {
        id: 'fatigue',
        name: 'Fatigue',
        level: ''
      },
      {
        id: 'nausea',
        name: 'Nausea',
        level: ''
      }
    ],
    count: 3
  },
  {
    date: '2023-11-15',
    symptoms: [
      {
        id: 'fatigue',
        name: 'Fatigue',
        level: ''
      },
      {
        id: 'dizziness',
        name: 'Dizziness',
        level: ''
      }
    ],
    count: 2
  }
];
