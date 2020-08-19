import { mount } from '@vue/test-utils';
import { EmbedPodigee } from './';

const HEIGHT = 500;

const VALID_EVENT = new MessageEvent('message', {
  data: `{"context":"podigee", "height": ${HEIGHT} }`,
});

const INVALID_EVENTS = [
  new MessageEvent('message', {
    data: `{"height": ${HEIGHT} }`,
  }),
  new MessageEvent('message', {
    data: `{"context":"podigee"}`,
  }),
  new MessageEvent('message', {
    data: `{}`,
  }),
  new MessageEvent('message'),
];

interface Combined extends Vue {
  podigeeEvent: (event: MessageEvent) => void;
  addHeightStyle: (height: number) => void;
}

describe('EmbedPodigee component', () => {
  it('should render given (html) content', () => {
    const wrapper = mount(EmbedPodigee, {
      propsData: {
        content: '<div>some (html) content</div>',
      },
    });

    expect(wrapper.element).toMatchInlineSnapshot(`
      <div>
        <div>
          some (html) content
        </div>
      </div>
    `);
  });

  it('adds event listener on created hook', () => {
    const windowSpy = jest.spyOn(window, 'addEventListener').mockImplementation();
    mount<Combined>(EmbedPodigee, {
      propsData: {
        content: '<div>some (html) content</div>',
      },
    });

    expect(windowSpy).toHaveBeenCalled();
  });

  it('removes event listener on beforeDestroy hook', () => {
    const windowSpy = jest.spyOn(window, 'removeEventListener').mockImplementation();
    const wrapper = mount<Combined>(EmbedPodigee, {
      propsData: {
        content: '<div>some (html) content</div>',
      },
    });

    wrapper.destroy();
    expect(windowSpy).toHaveBeenCalled();
  });

  it('should call addHeightStyle if podigee gets a valid event', () => {
    const wrapper = mount<Combined>(EmbedPodigee, {
      propsData: {
        content: '<div>some (html) content</div>',
      },
    });

    const heightSpy = jest.spyOn(wrapper.vm, 'addHeightStyle').mockImplementation();
    const windowSpy = jest.spyOn(window, 'removeEventListener').mockImplementation();

    expect(() => wrapper.vm.podigeeEvent(VALID_EVENT)).not.toThrow();
    expect(heightSpy).toHaveBeenCalledWith(HEIGHT);
    expect(windowSpy).toHaveBeenCalledWith('message', wrapper.vm.podigeeEvent);
  });

  it.each(INVALID_EVENTS)('should not call addHeightStyle if podigee gets an invalid event', (event) => {
    const wrapper = mount<Combined>(EmbedPodigee, {
      propsData: {
        content: '<div>some (html) content</div>',
      },
    });

    const heightSpy = jest.spyOn(wrapper.vm, 'addHeightStyle').mockImplementation();

    expect(() => wrapper.vm.podigeeEvent(event)).not.toThrow();
    expect(heightSpy).not.toHaveBeenCalledWith(HEIGHT);
  });

  it('should change the height to the value in the podigee message event', () => {
    const wrapper = mount<Combined>(EmbedPodigee, {
      propsData: {
        content: '<div>some (html) content</div>',
      },
    });

    wrapper.vm.addHeightStyle(HEIGHT);

    expect((wrapper.element.firstChild as HTMLElement).style.height).toBe(`${HEIGHT}px`);
  });

  it('should not change the height if no child element is present', () => {
    const wrapper = mount<Combined>(EmbedPodigee, {
      propsData: {
        content: 'some (html) content',
      },
    });

    wrapper.vm.addHeightStyle(HEIGHT);

    expect((wrapper.element.firstChild as HTMLElement).style).toBeUndefined();
  });
});
