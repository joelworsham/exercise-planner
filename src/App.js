import { ProvideAuth } from './auth';
import Navigator from './components/Navigator';

function App() {
  return (
    <ProvideAuth>
      <Navigator/>
    </ProvideAuth>
  );
}

export default App;
