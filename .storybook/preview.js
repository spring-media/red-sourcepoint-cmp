import { addParameters } from '@storybook/vue';

const viewports = {
  medium: {
    name: '600px',
    styles: {
      width: '600px',
      height: '600px',
    },
  },
  small: {
    name: '400px',
    styles: {
      width: '400px',
      height: '600px',
    },
  },
  tiny: {
    name: '300px',
    styles: {
      width: '300px',
      height: '600px',
    }
  }
};

addParameters({
  docs: {
    inlineStories: true,
  },
  viewport: {
    viewports,
  },
});
