import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import PlayerCard from '../pages/Home/PlayerCard';
import PlayerModal from '../pages/Home/PlayerModal';
import { getPlayerStats } from '../api/overfast';
import { formatDuration, formatProfileUpdated, getTopHeroes, profileStatus, sortHeroStats } from '../utils/playerStats';

jest.mock('../api/overfast', () => ({ ...jest.requireActual('../api/overfast'), getPlayerStats: jest.fn() }));

const scope = { platform: 'console', gamemode: 'competitive' };

test('sorts most-played heroes by time played without mutating stats', () => {
  const heroes = { ana: { time_played: 20 }, dva: { time_played: 90 }, mercy: { time_played: 40 } };
  expect(getTopHeroes(heroes, 2).map(([key]) => key)).toEqual(['dva', 'mercy']);
  expect(Object.keys(heroes)).toEqual(['ana', 'dva', 'mercy']);
});

test('formats durations defensively', () => {
  expect(formatDuration(7260)).toBe('2h 1m');
  expect(formatDuration(120)).toBe('2m');
  expect(formatDuration(undefined)).toBe('—');
});

test('sorts hero statistics using accurately labelled average values', () => {
  const entries = [['ana', { average: { damage: 10 } }], ['dva', { average: { damage: 50 } }]];
  expect(sortHeroStats(entries, 'damage')[0][0]).toBe('dva');
  expect(entries[0][0]).toBe('ana');
});

test('maps only reliable API statuses to specific unavailable states', () => {
  expect(profileStatus({ status: 404 }).title).toBe('Player not found');
  expect(profileStatus({ status: 500 }).title).toBe('Stats temporarily unavailable');
});

test('keeps a tracked player card visible when data is unavailable', () => {
  render(<PlayerCard player="Example-1234" state={{ status: 'error', error: { status: 500 } }} scope={scope} heroes={[]} isFavorite={false} onFavorite={() => {}} onRetry={() => {}} />);
  expect(screen.getByRole('heading', { name: 'Example' })).toBeInTheDocument();
  expect(screen.getByText('Stats temporarily unavailable')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument();
});

test('formats Blizzard profile freshness defensively', () => {
  const now = Date.parse('2026-08-29T14:00:00Z');
  expect(formatProfileUpdated('2026-08-29T13:23:00Z', now)).toBe('Blizzard profile updated 37 min ago');
  expect(formatProfileUpdated(null, now)).toBe('');
  expect(formatProfileUpdated('not-a-date', now)).toBe('');
});

test('restores initial competitive stats after viewing quick play', async () => {
  getPlayerStats.mockResolvedValue({ general: { games_played: 22 }, heroes: {} });
  render(<PlayerModal player="Example-1234" initialSummary={{ username: 'API Name', competitive: { console: { season: 18 } } }} initialStats={{ general: { games_played: 11 }, heroes: {} }} initialScope={scope} heroes={[]} show onHide={() => {}} isFavorite={false} onFavorite={() => {}} />);
  expect(screen.getByText('11')).toBeInTheDocument();
  userEvent.click(screen.getByRole('button', { name: 'Quick Play' }));
  expect(await screen.findByText('22')).toBeInTheDocument();
  userEvent.click(screen.getByRole('button', { name: 'Competitive' }));
  await waitFor(() => expect(screen.getByText('11')).toBeInTheDocument());
  expect(getPlayerStats).toHaveBeenCalledTimes(1);
});

test('renders season and Open Queue separately with an unranked fallback', () => {
  render(<PlayerModal player="Example-1234" initialSummary={{ competitive: { console: { season: 18, tank: {}, damage: {}, support: {}, open: null } } }} initialStats={{ heroes: {} }} initialScope={scope} heroes={[]} show onHide={() => {}} isFavorite={false} onFavorite={() => {}} />);
  expect(screen.getByText('Console · Season 18')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Role Queue' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Open Queue' })).toBeInTheDocument();
  expect(screen.getAllByText('Unranked')).toHaveLength(4);
});
