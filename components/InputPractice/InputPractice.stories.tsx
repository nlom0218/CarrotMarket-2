import { Meta, StoryObj } from '@storybook/react';

import InputPractice from './index';

const meta: Meta<typeof InputPractice> = {
  component: InputPractice,
};

export default meta;

type Story = StoryObj<typeof InputPractice>;

export const DefaultInputPractice: Story = {};
