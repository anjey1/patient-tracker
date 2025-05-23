import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Notification } from '../../../types';

interface NotificationCardProps {
  notifications: Notification[];
  onMarkAsRead: (id: number) => void;
}

export function NotificationCard({
  notifications,
  onMarkAsRead
}: NotificationCardProps) {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Notifications</CardTitle>
          <Badge variant="secondary">
            {notifications.filter((n) => !n.read).length} New
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`flex items-center space-x-4 rounded-md p-4 ${
              !notification.read ? 'bg-blue-50/50' : ''
            }`}
          >
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">
                {notification.title}
                {!notification.read && (
                  <span className="ml-2 inline-block h-2 w-2 rounded-full bg-blue-500"></span>
                )}
              </p>
              <p className="text-sm text-muted-foreground">
                {notification.message}
              </p>
              <p className="text-xs text-muted-foreground">
                {new Date(notification.date).toLocaleString()}
              </p>
            </div>
            <Checkbox
              className="h-5 w-5 rounded-full border-blue-300 text-blue-600"
              onClick={() => onMarkAsRead(notification.id)}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
