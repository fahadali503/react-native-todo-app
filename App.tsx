import { NativeBaseProvider, Box } from 'native-base';
import { Provider } from 'react-redux';
import { store } from './store';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Todos } from './components/Todo';

export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <SafeAreaView>
          <Todos />
        </SafeAreaView>
      </NativeBaseProvider>
    </Provider>
  );
}

