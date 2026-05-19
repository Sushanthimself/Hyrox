import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { cssInterop } from 'nativewind';

cssInterop(GestureHandlerRootView, { className: 'style' });
cssInterop(SafeAreaView, { className: 'style' });
