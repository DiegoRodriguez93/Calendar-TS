import { store } from './redux/store';
import { Provider } from 'react-redux';

import Calendar from './components/Calendar';
import { AddReminderModal } from './components/Reminder/AddReminderModal';

function App() {
  return (
    <Provider store={store}>
      <AddReminderModal />
      <Calendar />
    </Provider>
  );
}

export default App;
