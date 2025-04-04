'use client';

import React from 'react';
import FaqAccordionNew from '@/components/FaqAccordionNew';

const faqItems = [
  {
    id: '01',
    question: 'Lorem ipsum dolor sit amet consectetur. Viverra.',
    answer: 'Lorem ipsum dolor sit amet consectetur. In augue ipsum tellus ultrices. Ac pharetra ultrices consectetur consequat tellus massa. Nec aliquam cras sagittis duis sed euismod arcu hac. Ornare amet ligula ornare lacus aliquam senien. Eu lacus imperdiet urna amet congue adipiscing. Faucibus magna nisl ullamcorper in facilisis consequat aliquam. Id placerat dui habitasse quisque nisl tincidunt facilisi mi id. Dictum elit velit.'
  },
  {
    id: '02',
    question: 'Lorem ipsum dolor sit amet consectetur. Viverra.',
    answer: 'Lorem ipsum dolor sit amet consectetur. In augue ipsum tellus ultrices. Ac pharetra ultrices consectetur consequat tellus massa. Nec aliquam cras sagittis duis sed euismod arcu hac.'
  },
  {
    id: '03',
    question: 'Lorem ipsum dolor sit amet consectetur. Viverra.',
    answer: 'Lorem ipsum dolor sit amet consectetur. In augue ipsum tellus ultrices. Ac pharetra ultrices consectetur consequat tellus massa. Nec aliquam cras sagittis duis sed euismod arcu hac.'
  },
  {
    id: '04',
    question: 'Lorem ipsum dolor sit amet consectetur. Viverra.',
    answer: 'Lorem ipsum dolor sit amet consectetur. In augue ipsum tellus ultrices. Ac pharetra ultrices consectetur consequat tellus massa. Nec aliquam cras sagittis duis sed euismod arcu hac.'
  }
];

export default function FaqNewPage() {
  return (
    <div className="bg-black">
      <FaqAccordionNew items={faqItems} />
    </div>
  );
}
