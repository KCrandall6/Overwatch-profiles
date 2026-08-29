import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../pages/Home/Home';
import PlayerCard from '../pages/Home/PlayerCard';

const stats = {
  general: { games_played: 1 },
  roles: {},
  heroes: {},
};

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('shows an unavailable message when profile stats cannot be loaded', async () => {
  global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 404 });

  render(<Home />);

  expect(await screen.findAllByText('Profile data is currently unavailable.')).toHaveLength(5);
  expect(screen.getByText('PhilMckavity-1588')).toBeInTheDocument();
});

test('shows a fallback card when a player summary cannot be loaded', async () => {
  global.fetch = jest.fn().mockRejectedValue(new Error('offline'));

  render(<PlayerCard user="Example-1234" data={stats} isFav={false} onFav={() => {}} />);

  await waitFor(() => {
    expect(screen.getByText('Profile summary is currently unavailable.')).toBeInTheDocument();
  });
  expect(screen.getByText('Example')).toBeInTheDocument();
});