import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  StoryIntro,
  StorySection,
  StoryStack,
  StorySurface,
} from "../../shared/storybook";

import { TopProductsCard } from "./TopProductsCard";
import type { TopProductItem } from "./TopProductsCard";

const baseItems: TopProductItem[] = [
  {
    id: 1,
    rank: 1,
    name: "Premium Wireless Headphones",
    category: "Electronics",
    soldCount: 4820,
  },
  {
    id: 2,
    rank: 2,
    name: "Ergonomic Office Chair",
    category: "Furniture",
    soldCount: 3710,
  },
  {
    id: 3,
    rank: 3,
    name: "Stainless Steel Water Bottle",
    category: "Sports & Outdoors",
    soldCount: 3290,
  },
  {
    id: 4,
    rank: 4,
    name: "Mechanical Keyboard TKL",
    category: "Electronics",
    soldCount: 2940,
  },
];

const itemsWithImages: TopProductItem[] = baseItems.map((item) => ({
  ...item,
  image: `https://placehold.co/44x44/e2e8f0/64748b?text=${item.rank}`,
}));

const meta: Meta<typeof TopProductsCard> = {
  title: "Data Display/Dashboard Cards/TopProductsCard",
  component: TopProductsCard,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Ranked product leaderboard with rank badge, product name, category, sold count, and optional thumbnail.",
      },
    },
  },
  argTypes: {
    title: { control: "text", description: "Card heading label." },
    items: {
      control: false,
      description:
        "Array of TopProductItem: { id, rank, name, category, soldCount, image? }.",
    },
    className: { control: false, description: "Custom classes for the outer container." },
    onMenuClick: { control: false, description: "Callback for the ellipsis menu button." },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultSource = `import { TopProductsCard } from 'erp-pro-ui';
import type { TopProductItem } from 'erp-pro-ui';

const items: TopProductItem[] = [
  { id: 1, rank: 1, name: 'Premium Wireless Headphones', category: 'Electronics', soldCount: 4820 },
  { id: 2, rank: 2, name: 'Ergonomic Office Chair', category: 'Furniture', soldCount: 3710 },
  { id: 3, rank: 3, name: 'Stainless Steel Water Bottle', category: 'Sports & Outdoors', soldCount: 3290 },
  { id: 4, rank: 4, name: 'Mechanical Keyboard TKL', category: 'Electronics', soldCount: 2940 },
];

export function TopProductsCardExample() {
  return <TopProductsCard items={items} />;
}`;

export const Default: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-md">
      <TopProductsCard items={baseItems} />
    </StorySurface>
  ),
  parameters: {
    docs: { source: { code: defaultSource } },
  },
};

const withImagesSource = `import { TopProductsCard } from 'erp-pro-ui';
import type { TopProductItem } from 'erp-pro-ui';

const items: TopProductItem[] = [
  { id: 1, rank: 1, name: 'Premium Wireless Headphones', category: 'Electronics', soldCount: 4820, image: '/products/headphones.png' },
  { id: 2, rank: 2, name: 'Ergonomic Office Chair', category: 'Furniture', soldCount: 3710, image: '/products/chair.png' },
];

export function TopProductsCardWithImagesExample() {
  return <TopProductsCard items={items} title="Best Sellers" />;
}`;

export const WithImages: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-md">
      <StoryStack className="ui:gap-5">
        <StoryIntro
          title="With product thumbnails"
          description="Set the image property on each item to display a product thumbnail. Falls back to a placeholder icon when image is omitted."
        />
        <StorySection>
          <TopProductsCard items={itemsWithImages} title="Best Sellers" />
        </StorySection>
      </StoryStack>
    </StorySurface>
  ),
  parameters: {
    docs: { source: { code: withImagesSource } },
  },
};
