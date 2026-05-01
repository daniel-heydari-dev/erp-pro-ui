import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent } from "storybook/test";

import { BellIcon } from "../../icons";
import { Button } from "../../forms/button";
import { StorySurface } from "../../shared/storybook";
import { DropdownMenu } from "./DropdownMenu";

const meta: Meta<typeof DropdownMenu> = {
  title: "Layout/DropdownMenu",
  component: DropdownMenu,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-xl ui:flex ui:justify-end">
      <DropdownMenu
        align="end"
        trigger={
          <Button
            type="button"
            variant="tertiary"
            size="small"
            className="ui:h-9 ui:w-9 ui:rounded-full ui:p-0!"
            aria-label="Open notifications"
          >
            <BellIcon className="ui:h-5 ui:w-5" />
          </Button>
        }
      >
        <div className="ui:w-72 ui:p-3">
          <p className="ui:text-sm ui:font-semibold ui:text-ds-1">Notifications</p>
          <p className="ui:mt-1 ui:text-xs ui:text-ds-3">No new notifications</p>
        </div>
      </DropdownMenu>
    </StorySurface>
  ),
  play: async ({ canvas }) => {
    const button = await canvas.findByLabelText("Open notifications");
    await userEvent.click(button);
    await expect(canvas.getByText("Notifications")).toBeTruthy();
  },
};

export const RTL: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-xl">
      <div dir="rtl" className="ui:flex ui:w-full ui:justify-start">
        <DropdownMenu
          align="start"
          trigger={
            <Button
              type="button"
              variant="tertiary"
              size="small"
              className="ui:h-9 ui:w-9 ui:rounded-full ui:p-0!"
              aria-label="باز کردن اعلان‌ها"
            >
              <BellIcon className="ui:h-5 ui:w-5" />
            </Button>
          }
        >
          <div className="ui:w-72 ui:p-3">
            <p className="ui:text-sm ui:font-semibold ui:text-ds-1">اعلان‌ها</p>
            <p className="ui:mt-1 ui:text-xs ui:text-ds-3">اعلان جدیدی وجود ندارد</p>
          </div>
        </DropdownMenu>
      </div>
    </StorySurface>
  ),
  play: async ({ canvas }) => {
    const button = await canvas.findByLabelText("باز کردن اعلان‌ها");
    await userEvent.click(button);
    await expect(canvas.getByText("اعلان‌ها")).toBeTruthy();
  },
};
