import { Meta, StoryObj } from '@storybook/react';

import ListPractice from './index';

const meta: Meta<typeof ListPractice> = {
  component: ListPractice,
};

export default meta;

type Story = StoryObj<typeof ListPractice>;

export const DefaultListPractice: Story = {};
