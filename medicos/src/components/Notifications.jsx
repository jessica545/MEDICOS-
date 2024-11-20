import React, { useState, useEffect } from 'react';
import '../styles/Notifications.css'; // Add styling as needed

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Dummy notifications to simulate fetching from a server
    const initialNotifications = [
      { id: 1, message: 'Your test result is available.', type: 'Test', read: false },
      { id: 2, message: 'You have a new assignment.', type: 'Assignment', read: false },
    ];
    setNotifications(initialNotifications);
    setUnreadCount(initialNotifications.filter((n) => !n.read).length);
  }, []);

  const addNotification = () => {
    // Simulate a new notification arriving
    const newNotification = {
      id: notifications.length + 1,
      message: `New notification at ${new Date().toLocaleTimeString()}`,
      type: 'General',
      read: false,
    };
    setNotifications((prev) => [newNotification, ...prev]);
    setUnreadCount((prev) => prev + 1);
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    setUnreadCount((prev) => prev - 1);
  };

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="notifications">
      <h3>Notifications</h3>
      <p>Unread Notifications: {unreadCount}</p>
      <button onClick={addNotification}>Simulate Notification</button>
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id} className={notification.read ? 'read' : 'unread'}>
            <span>{notification.message} ({notification.type})</span>
            <button onClick={() => markAsRead(notification.id)}>Mark as Read</button>
            <button onClick={() => deleteNotification(notification.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
