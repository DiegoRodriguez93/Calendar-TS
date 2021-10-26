export interface CurrentlyDate {
  monthIndex: number;
  year: number;
}

export type ReminderType = {
  id: string;
  title: string;
  date: string;
  time: string;
  color: string;
  creation_date: string;
};

export type RemindersType = {
  reminders: Record<string, Array<ReminderType>>;
  isOpenReminderFormModal: boolean;
  isEditMode: boolean;
  reminderToEdit: ReminderType;
  recentlyUsedColors: Array<ReminderType['color']>;
};

export type DeletePayloadType = {
  id: string;
  date: string;
};
