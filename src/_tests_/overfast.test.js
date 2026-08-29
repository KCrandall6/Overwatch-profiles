import { getPlayerStats } from '../api/overfast';

test('requires an explicit mode and platform for player stats', async () => {
  await expect(getPlayerStats('Example-1234', { platform: 'console' })).rejects.toThrow('explicit platform and gamemode');
});

test('sends explicit scope query parameters', async () => {
  global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => ({ heroes: {} }) });
  await getPlayerStats('Scoped-999', { platform: 'pc', gamemode: 'quickplay' });
  expect(global.fetch.mock.calls[0][0]).toContain('/stats/summary?platform=pc&gamemode=quickplay');
});
