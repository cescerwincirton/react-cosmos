import { render } from '@testing-library/react';
import React from 'react';
import {
  mockCore,
  mockPlug,
  mockRendererCore,
  mockRouter,
  mockStorage,
} from 'react-cosmos-shared2/ui';
import { loadPlugins, resetPlugins, Slot } from 'react-plugin';

beforeEach(() => jest.isolateModules(() => require('..')));

afterEach(resetPlugins);

function registerTestPlugins() {
  mockStorage({
    loadCache: () => Promise.resolve(null),
  });
  mockRouter({
    getSelectedFixtureId: () => ({ path: 'foo.js' }),
  });
  mockCore({
    getFixtureFileVars: () => ({
      fixturesDir: '__fixtures__',
      fixtureFileSuffix: 'fixture',
    }),
  });
  mockRendererCore({
    isRendererConnected: () => true,
    getFixtures: () => ({}),
    isValidFixtureSelected: () => true,
  });
}

async function loadTestPlugins() {
  loadPlugins();
  const utils = render(<Slot name="root" />);
  await utils.findByTestId('root');
  return utils;
}

it('renders "navRow" slot', async () => {
  registerTestPlugins();
  mockPlug('navRow', () => <>we are the robots</>);

  const { getByText } = await loadTestPlugins();
  getByText(/we are the robots/i);
});

it('renders "rendererPreview" slot', async () => {
  registerTestPlugins();
  mockPlug('rendererPreview', () => <>we are the robots</>);

  const { getByText } = await loadTestPlugins();
  getByText(/we are the robots/i);
});

it('renders "contentOverlay" slot', async () => {
  registerTestPlugins();
  mockPlug('contentOverlay', () => <>we are the robots</>);

  const { getByText } = await loadTestPlugins();
  getByText(/we are the robots/i);
});

it('renders "global" plugs', async () => {
  mockPlug('global', () => <>first</>);
  mockPlug('global', () => <>second</>);
  mockPlug('global', () => <>third</>);
  registerTestPlugins();

  const { getByText } = await loadTestPlugins();
  getByText(/first/i);
  getByText(/second/i);
  getByText(/third/i);
});
