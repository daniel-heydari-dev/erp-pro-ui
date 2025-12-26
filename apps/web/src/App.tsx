import { Button } from '@repo/ui';
import { formatDate } from '@repo/shared';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Monorepo Template
        </h1>
        <p className="text-gray-600 mb-8">
          Welcome to your new production-ready monorepo. Today is{' '}
          {formatDate(new Date())}.
        </p>
        <div className="flex gap-4 justify-center">
          <Button onClick={() => alert('Clicked!')}>Primary Button</Button>
          <Button
            variant="secondary"
            onClick={() => alert('Secondary Clicked!')}
          >
            Secondary Button
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
