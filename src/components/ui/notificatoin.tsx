import React from 'react';

interface NotificationProps {
  message: string;
  success : boolean
  visible: boolean;
}

const Notification: React.FC<NotificationProps> = ({ message, success, visible }) => {
  if (!visible) return null;

  return (
    <div
    className={`fixed bottom-5 left-5 px-5 py-2 text-white rounded-md shadow-md transition-opacity duration-300 ${
      visible ? "opacity-100" : "opacity-0"
    } ${success ? "bg-green-500" : "bg-red-500"}`}
    >
      {message}
    </div>
  );
};

export default Notification;
