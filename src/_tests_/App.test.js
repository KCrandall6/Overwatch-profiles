import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PlayerCard from '../pages/Home/PlayerCard';
import { formatDuration, getTopHeroes, profileStatus, sortHeroStats } from '../utils/playerStats';

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
