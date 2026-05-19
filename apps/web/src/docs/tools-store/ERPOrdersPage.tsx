import {
  BarBreakdownCard,
  DataTable,
  StatCard,
  TopSellingItemsCard,
} from "erp-pro-ui";
import type {
  BarBreakdownCategory,
  BarBreakdownDataPoint,
  DataTableColumn,
  DataTableRowAction,
  TopSellingItem,
} from "erp-pro-ui";

// ── Types ──────────────────────────────────────────────────────────────────────

interface PurchaseOrder {
  id: string;
  poNo: string;
  datePlaced: string;
  expectedDate: string;
  supplier: string;
  category: string;
  itemCount: number;
  totalValue: number;
  status: "draft" | "confirmed" | "in-transit" | "received" | "cancelled";
}

// ── Mock data ──────────────────────────────────────────────────────────────────

const ORDERS: PurchaseOrder[] = [
  { id: "1",  poNo: "PO-2025-0041", datePlaced: "2025-05-16", expectedDate: "2025-05-23", supplier: "Bosch GmbH",       category: "Power Tools", itemCount: 6,  totalValue: 3420.00, status: "in-transit" },
  { id: "2",  poNo: "PO-2025-0040", datePlaced: "2025-05-15", expectedDate: "2025-05-22", supplier: "DeWalt Distribution",category: "Power Tools", itemCount: 4,  totalValue: 2188.00, status: "in-transit" },
  { id: "3",  poNo: "PO-2025-0039", datePlaced: "2025-05-14", expectedDate: "2025-05-21", supplier: "Hilti AG",          category: "Power Tools", itemCount: 3,  totalValue: 4260.00, status: "confirmed"  },
  { id: "4",  poNo: "PO-2025-0038", datePlaced: "2025-05-13", expectedDate: "2025-05-19", supplier: "Knipex GmbH",       category: "Hand Tools",  itemCount: 10, totalValue: 1840.00, status: "received"   },
  { id: "5",  poNo: "PO-2025-0037", datePlaced: "2025-05-13", expectedDate: "2025-05-20", supplier: "Wera Tools",        category: "Hand Tools",  itemCount: 8,  totalValue: 1760.00, status: "received"   },
  { id: "6",  poNo: "PO-2025-0036", datePlaced: "2025-05-12", expectedDate: "2025-05-18", supplier: "3M Europe",         category: "Accessories", itemCount: 20, totalValue: 924.00,  status: "received"   },
  { id: "7",  poNo: "PO-2025-0035", datePlaced: "2025-05-12", expectedDate: "2025-05-24", supplier: "Würth Group",       category: "Hardware",    itemCount: 15, totalValue: 648.00,  status: "confirmed"  },
  { id: "8",  poNo: "PO-2025-0034", datePlaced: "2025-05-11", expectedDate: "2025-05-17", supplier: "Fischer Group",     category: "Hardware",    itemCount: 12, totalValue: 412.00,  status: "received"   },
  { id: "9",  poNo: "PO-2025-0033", datePlaced: "2025-05-10", expectedDate: "2025-05-16", supplier: "Makita Europe",     category: "Power Tools", itemCount: 5,  totalValue: 2860.00, status: "received"   },
  { id: "10", poNo: "PO-2025-0032", datePlaced: "2025-05-10", expectedDate: "2025-05-16", supplier: "Stanley Black&Decker",category:"Hand Tools", itemCount: 14, totalValue: 1428.00, status: "received"   },
  { id: "11", poNo: "PO-2025-0031", datePlaced: "2025-05-09", expectedDate: "2025-05-15", supplier: "Bosch GmbH",        category: "Accessories", itemCount: 8,  totalValue: 1184.00, status: "received"   },
  { id: "12", poNo: "PO-2025-0030", datePlaced: "2025-05-08", expectedDate: "2025-05-14", supplier: "Hilti AG",          category: "Power Tools", itemCount: 2,  totalValue: 3196.00, status: "received"   },
  { id: "13", poNo: "PO-2025-0029", datePlaced: "2025-05-07", expectedDate: "2025-05-13", supplier: "DeWalt Distribution",category: "Accessories", itemCount: 6, totalValue: 876.00,  status: "received"   },
  { id: "14", poNo: "PO-2025-0028", datePlaced: "2025-05-06", expectedDate: "2025-05-12", supplier: "3M Europe",         category: "Accessories", itemCount: 25, totalValue: 1050.00, status: "received"   },
  { id: "15", poNo: "PO-2025-0027", datePlaced: "2025-05-05", expectedDate: "2025-05-19", supplier: "Würth Group",       category: "Hardware",    itemCount: 30, totalValue: 960.00,  status: "in-transit" },
  { id: "16", poNo: "PO-2025-0026", datePlaced: "2025-05-17", expectedDate: "2025-05-28", supplier: "Knipex GmbH",       category: "Hand Tools",  itemCount: 12, totalValue: 2208.00, status: "draft"      },
  { id: "17", poNo: "PO-2025-0025", datePlaced: "2025-05-17", expectedDate: "2025-05-30", supplier: "Wera Tools",        category: "Hand Tools",  itemCount: 10, totalValue: 2200.00, status: "draft"      },
  { id: "18", poNo: "PO-2025-0024", datePlaced: "2025-04-28", expectedDate: "2025-05-05", supplier: "Fischer Group",     category: "Hardware",    itemCount: 20, totalValue: 660.00,  status: "cancelled"  },
  { id: "19", poNo: "PO-2025-0023", datePlaced: "2025-05-02", expectedDate: "2025-05-09", supplier: "Makita Europe",     category: "Power Tools", itemCount: 4,  totalValue: 2288.00, status: "received"   },
  { id: "20", poNo: "PO-2025-0022", datePlaced: "2025-05-01", expectedDate: "2025-05-08", supplier: "Bosch GmbH",        category: "Power Tools", itemCount: 7,  totalValue: 3990.00, status: "received"   },
];

// ── Bar chart data (ordered vs received by category) ──────────────────────────

const BAR_CATS: BarBreakdownCategory[] = [
  { key: "ordered",  label: "Ordered",  color: "#6366f1" },
  { key: "received", label: "Received", color: "#22c55e" },
];

const CAT_ORDER = ["Power Tools", "Hand Tools", "Accessories", "Hardware"];
const CAT_SHORT: Record<string, string> = { "Power Tools": "Power", "Hand Tools": "Hand", Accessories: "Acc.", Hardware: "HW" };

const BAR_DATA: BarBreakdownDataPoint[] = CAT_ORDER.map((cat) => {
  const catOrders = ORDERS.filter((o) => o.category === cat && o.status !== "cancelled");
  const ordered   = catOrders.reduce((s, o) => s + o.totalValue, 0);
  const received  = ORDERS
    .filter((o) => o.category === cat && o.status === "received")
    .reduce((s, o) => s + o.totalValue, 0);
  return { name: CAT_SHORT[cat] ?? cat, ordered: Math.round(ordered), received: Math.round(received) };
});

const totalOrdered  = ORDERS.filter((o) => o.status !== "cancelled").reduce((s, o) => s + o.totalValue, 0);
const totalReceived = ORDERS.filter((o) => o.status === "received").reduce((s, o) => s + o.totalValue, 0);
const pendingCount  = ORDERS.filter((o) => o.status === "confirmed" || o.status === "in-transit").length;
const draftCount    = ORDERS.filter((o) => o.status === "draft").length;
const receivedCount = ORDERS.filter((o) => o.status === "received").length;
const onTimeRate    = Math.round((receivedCount / (receivedCount + 1)) * 100);

// ── Top ordered items ─────────────────────────────────────────────────────────

const TOP_SUPPLIERS: TopSellingItem[] = [
  { id: "1", name: "Bosch GmbH",          category: "Power Tools", qty: 21,  revenue: 8594,  revenueTrend: 8  },
  { id: "2", name: "Hilti AG",            category: "Power Tools", qty: 5,   revenue: 7456,  revenueTrend: 12 },
  { id: "3", name: "DeWalt Distribution", category: "Power Tools", qty: 10,  revenue: 3064,  revenueTrend: 5  },
  { id: "4", name: "Knipex GmbH",         category: "Hand Tools",  qty: 22,  revenue: 4048,  revenueTrend: -3 },
  { id: "5", name: "Wera Tools",          category: "Hand Tools",  qty: 18,  revenue: 3960,  revenueTrend: 7  },
  { id: "6", name: "3M Europe",           category: "Accessories", qty: 45,  revenue: 1974,  revenueTrend: 4  },
  { id: "7", name: "Würth Group",         category: "Hardware",    qty: 45,  revenue: 1608,  revenueTrend: 2  },
  { id: "8", name: "Makita Europe",       category: "Power Tools", qty: 9,   revenue: 5148,  revenueTrend: 9  },
];

// ── Columns ───────────────────────────────────────────────────────────────────

const STATUS_LABEL = { draft: "Draft", confirmed: "Confirmed", "in-transit": "In Transit", received: "Received", cancelled: "Cancelled" } as const;
const STATUS_CLS: Record<PurchaseOrder["status"], string> = {
  draft:        "bg-ds-surface-2 text-ds-3",
  confirmed:    "bg-blue-100   text-blue-700   dark:bg-blue-900/30   dark:text-blue-400",
  "in-transit": "bg-amber-100  text-amber-700  dark:bg-amber-900/30  dark:text-amber-400",
  received:     "bg-green-100  text-green-700  dark:bg-green-900/30  dark:text-green-400",
  cancelled:    "bg-red-100    text-red-700    dark:bg-red-900/30    dark:text-red-400",
};

const poFmt = (v: number) => `€${v.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const COLUMNS: DataTableColumn<PurchaseOrder>[] = [
  {
    id: "poNo", label: "PO Number",
    renderCell: ({ row }) => <span className="font-mono text-xs font-semibold text-ds-1">{row.poNo}</span>,
  },
  {
    id: "datePlaced", label: "Placed",
    renderCell: ({ row }) => <span className="text-sm text-ds-2">{row.datePlaced}</span>,
  },
  {
    id: "supplier", label: "Supplier",
    renderCell: ({ row }) => (
      <div>
        <p className="text-sm font-medium text-ds-1">{row.supplier}</p>
        <p className="text-[11px] text-ds-3">{row.category}</p>
      </div>
    ),
  },
  {
    id: "itemCount", label: "Lines",
    renderCell: ({ row }) => <span className="text-sm text-ds-3">{row.itemCount}</span>,
  },
  {
    id: "totalValue", label: "Value",
    renderCell: ({ row }) => <span className="text-sm font-bold text-ds-1">{poFmt(row.totalValue)}</span>,
  },
  {
    id: "expectedDate", label: "Expected",
    renderCell: ({ row }) => <span className="text-sm text-ds-2">{row.expectedDate}</span>,
  },
  {
    id: "status", label: "Status",
    filterable: true,
    renderCell: ({ row }) => (
      <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${STATUS_CLS[row.status]}`}>
        {STATUS_LABEL[row.status]}
      </span>
    ),
  },
];

const ROW_ACTIONS: DataTableRowAction<PurchaseOrder>[] = [
  { id: "view",    label: "View PO"           },
  { id: "confirm", label: "Confirm order"     },
  { id: "cancel",  label: "Cancel", variant: "destructive" },
];

// ── Page ───────────────────────────────────────────────────────────────────────

export default function ERPOrdersPage() {
  return (
    <div className="space-y-5 p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-ds-1">Purchase Orders</h1>
        <p className="mt-1 text-sm text-ds-3">
          Supplier orders &amp; delivery tracking · {pendingCount} in transit or awaiting confirmation
        </p>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard size="sm" title="Total Ordered"   value={`€${Math.round(totalOrdered / 1_000)}K`}  dateRange="active POs"       badge={{ value: "+9.2%",  direction: "up"   }} />
        <StatCard size="sm" title="Received"        value={`€${Math.round(totalReceived / 1_000)}K`} dateRange="value confirmed"  badge={{ value: "+6.8%",  direction: "up"   }} />
        <StatCard size="sm" title="Pending"         value={String(pendingCount)}                      dateRange="confirmed + transit" />
        <StatCard size="sm" title="On-Time Rate"    value={`${onTimeRate}%`}                          dateRange="last 30 days"     badge={{ value: "+2.1%",  direction: "up"   }} />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <BarBreakdownCard
            title="Ordered vs Received by Category"
            variant="full"
            headlines={[
              { label: "Total Ordered",  value: `€${Math.round(totalOrdered / 1_000)}K`  },
              { label: "Total Received", value: `€${Math.round(totalReceived / 1_000)}K` },
            ]}
            metrics={[
              { label: "Pending Value", primary: `€${Math.round((totalOrdered - totalReceived) / 1_000)}K` },
              { label: "Drafts",        primary: String(draftCount) },
            ]}
            categories={BAR_CATS}
            data={BAR_DATA}
            periods={["This Month"]}
            defaultPeriod="This Month"
          />
        </div>
        <TopSellingItemsCard
          title="Top Suppliers"
          subtitle="Ranked by order value"
          items={TOP_SUPPLIERS}
          showTrend
          defaultMetric="revenue"
          labels={{ byRevenueLabel: "By Value", byQtyLabel: "By Lines" }}
        />
      </div>

      {/* PO table */}
      <DataTable<PurchaseOrder>
        columns={COLUMNS}
        data={ORDERS}
        pageSize={10}
        rowActions={ROW_ACTIONS}
        showExportButton
        showRefreshButton
      />
    </div>
  );
}
