import type { Meta, StoryObj } from "@storybook/react-vite";

import { StorySurface, StorySection, StoryStack, StoryIntro } from "../../shared/storybook";
import { ShipmentStatisticsCard } from "./ShipmentStatisticsCard";
import { VehicleConditionCard } from "./VehicleConditionCard";
import { VehiclesOverviewCard } from "./VehiclesOverviewCard";

import type { ShipmentDataPoint } from "./ShipmentStatisticsCard";
import type { VehicleConditionItem } from "./VehicleConditionCard";
import type { VehiclesOverviewItem } from "./VehiclesOverviewCard";

const meta: Meta = {
  title: "Data Display / Dashboard Cards / Orders / Gallery",
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj;

const SHIPMENT_DATA: ShipmentDataPoint[] = [
  { date: "1 May",  shipment: 78, delivery: 72 },
  { date: "5 May",  shipment: 91, delivery: 85 },
  { date: "8 May",  shipment: 64, delivery: 61 },
  { date: "12 May", shipment: 88, delivery: 80 },
  { date: "15 May", shipment: 95, delivery: 91 },
  { date: "19 May", shipment: 72, delivery: 68 },
  { date: "22 May", shipment: 84, delivery: 79 },
  { date: "26 May", shipment: 97, delivery: 94 },
  { date: "29 May", shipment: 89, delivery: 86 },
];

const FLEET_CONDITION: VehicleConditionItem[] = [
  { label: "On Route",     sublabel: "8 vans active",     percentage: 72, color: "#22c55e", badge: "+2" },
  { label: "At Warehouse", sublabel: "3 vans loading",    percentage: 24, color: "#6366f1", badge: "3"  },
  { label: "Maintenance",  sublabel: "1 van scheduled",   percentage: 8,  color: "#f97316", badge: "1"  },
  { label: "Idle",         sublabel: "2 available now",   percentage: 16, color: "#94a3b8", badge: "2"  },
];

const ROUTE_STATUS: VehiclesOverviewItem[] = [
  { label: "In Transit",  duration: "2hr 40min", percentage: 72 },
  { label: "At Loading",  duration: "45min",     percentage: 15 },
  { label: "Idle",        duration: "1hr 10min", percentage: 13 },
];

export const Default: Story = {
  name: "All Orders Cards",
  render: () => (
    <StorySurface>
      <StoryIntro
        title="Orders Cards"
        description="Purchase order, delivery, and logistics cards for the tools store. Track inbound PO fulfillment rates, outbound delivery performance, and fleet utilisation."
      />

      <StorySection title="Delivery Performance">
        <StoryStack direction="horizontal" wrap>
          <div className="min-w-[480px] flex-1">
            <ShipmentStatisticsCard
              title="Delivery Rate"
              subtitle="PO shipments vs on-time deliveries"
              data={SHIPMENT_DATA}
              months={["May 2025", "Apr 2025", "Mar 2025"]}
              defaultMonth="May 2025"
              shipmentLabel="Orders Shipped"
              deliveryLabel="On-Time Delivered"
              shipmentColor="#f97316"
              deliveryColor="#6366f1"
            />
          </div>
        </StoryStack>
      </StorySection>

      <StorySection title="Fleet & Logistics">
        <StoryStack direction="horizontal" wrap>
          <div className="w-[340px]">
            <VehicleConditionCard
              title="Delivery Fleet"
              items={FLEET_CONDITION}
            />
          </div>
          <div className="w-[340px]">
            <VehiclesOverviewCard
              title="Route Status"
              items={ROUTE_STATUS}
            />
          </div>
        </StoryStack>
      </StorySection>
    </StorySurface>
  ),
};
