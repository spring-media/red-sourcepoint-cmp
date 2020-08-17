import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import { sourcepoint } from '../index';
import { reloadPageOnReject } from './reload-page-on-reject';

const createStore = (): Store<Record<string, unknown>> => {
  Vue.use(Vuex);

  return new Vuex.Store({
    modules: {
      sourcepoint,
    },
  });
};

const { location } = window;

const CLOSE_DELAY = 500;

describe('effect reloadPageOnReject', () => {
  beforeEach(() => {
    delete window.location;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.location = {
      reload: jest.fn(),
    };
    jest.useFakeTimers();
  });

  afterEach(() => {
    window.location = location;
    jest.useRealTimers();
  });

  it('should not reload the page if no vendor has been rejected', () => {
    const store = createStore();

    reloadPageOnReject(store);

    store.commit('sourcepoint/setCustomVendorConsents', [{ _id: '123' }, { _id: '456' }]);
    store.commit('sourcepoint/setCustomVendorConsents', [{ _id: '123' }, { _id: '456' }]);

    jest.advanceTimersByTime(CLOSE_DELAY);

    expect(window.location.reload).not.toHaveBeenCalled();
  });

  it('should not reload the page if no purpose has been rejected', () => {
    const store = createStore();

    reloadPageOnReject(store);

    store.commit('sourcepoint/setCustomPurposeConsents', [{ _id: '123' }, { _id: '456' }]);
    store.commit('sourcepoint/setCustomPurposeConsents', [{ _id: '123' }, { _id: '456' }]);

    jest.advanceTimersByTime(CLOSE_DELAY);

    expect(window.location.reload).not.toHaveBeenCalled();
  });

  it('should reload the page if (at least) one vendor has been rejected', () => {
    const store = createStore();

    reloadPageOnReject(store);

    store.commit('sourcepoint/setCustomVendorConsents', [{ _id: '123' }, { _id: '456' }]);
    store.commit('sourcepoint/setCustomVendorConsents', [{ _id: '456' }]);

    jest.advanceTimersByTime(CLOSE_DELAY);

    expect(window.location.reload).toHaveBeenCalled();
  });

  it('should reload the page if (at least) one purpose has been rejected', () => {
    const store = createStore();

    reloadPageOnReject(store);

    store.commit('sourcepoint/setCustomPurposeConsents', [{ _id: '123' }, { _id: '456' }]);
    store.commit('sourcepoint/setCustomPurposeConsents', [{ _id: '456' }]);

    jest.advanceTimersByTime(CLOSE_DELAY);

    expect(window.location.reload).toHaveBeenCalled();
  });
});
