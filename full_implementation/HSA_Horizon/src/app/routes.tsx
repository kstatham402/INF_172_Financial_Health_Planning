import { createBrowserRouter } from 'react-router';
import { LandingPage } from './pages/landing-page';
import { SurveyPage } from './pages/survey-page';
import { SimulationPage } from './pages/simulation-page';

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4">404 - Page Not Found</h1>
        <a href="/" className="text-[#FF8A5C] hover:underline">
          Return to Home
        </a>
      </div>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    Component: LandingPage
  },
  {
    path: '/survey',
    Component: SurveyPage
  },
  {
    path: '/simulation',
    Component: SimulationPage
  },
  {
    path: '*',
    Component: NotFound
  }
]);
