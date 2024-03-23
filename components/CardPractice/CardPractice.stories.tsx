import { Meta, StoryObj } from '@storybook/react';

import CardPractice from './index';

const meta: Meta<typeof CardPractice> = {
  component: CardPractice,
};

export default meta;

type Story = StoryObj<typeof CardPractice>;

export const DefaultCardPractice: Story = {};
