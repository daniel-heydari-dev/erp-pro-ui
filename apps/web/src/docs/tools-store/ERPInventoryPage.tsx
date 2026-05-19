import { useMemo } from "react";

import { DataTable, InventoryCards, StatCard } from "erp-pro-ui";
import type { DataTableColumn, DataTableRowAction } from "erp-pro-ui";

// ── Types ──────────────────────────────────────────────────────────────────────

interface RawItem {
  id: string; name: string; sku: string; category: string;
  qty: number; minQty: number; buyPrice: number; sellPrice: number;
  qtyTrend?: number; profitTrend?: number;
}

interface InventoryRow extends RawItem {
  totalCost: number;
  potentialRevenue: number;
  potentialProfit: number;
  margin: number;
  status: "ok" | "low" | "out";
}

// ── Mock data ──────────────────────────────────────────────────────────────────

const RAW_ITEMS: RawItem[] = [
  { id: "1",  name: "Bosch Drill GSB 18V",       sku: "BSH-D18V", category: "Power Tools",  qty: 34,  minQty: 5, buyPrice: 45.00,  sellPrice: 89.99,  qtyTrend: 12,   profitTrend: 8   },
  { id: "2",  name: "DeWalt Circular Saw DWE",    sku: "DWT-CS7",  category: "Power Tools",  qty: 12,  minQty: 5, buyPrice: 88.00,  sellPrice: 169.00, qtyTrend: 5,    profitTrend: 3   },
  { id: "3",  name: "Makita Angle Grinder 115mm", sku: "MKT-AG4",  category: "Power Tools",  qty: 18,  minQty: 5, buyPrice: 52.00,  sellPrice: 99.95,  qtyTrend: -4,   profitTrend: -2  },
  { id: "4",  name: "Hilti Hammer Drill TE 6",    sku: "HLT-TE6",  category: "Power Tools",  qty: 7,   minQty: 5, buyPrice: 142.00, sellPrice: 268.00, qtyTrend: 18,   profitTrend: 15  },
  { id: "5",  name: "B+D Jigsaw JS10",            sku: "BD-JS10",  category: "Power Tools",  qty: 3,   minQty: 5, buyPrice: 38.00,  sellPrice: 74.99,  qtyTrend: -22,  profitTrend: -18 },
  { id: "6",  name: "Stanley Hammer 16oz",        sku: "STN-H16",  category: "Hand Tools",   qty: 62,  minQty: 5, buyPrice: 12.50,  sellPrice: 24.99,  qtyTrend: 2,    profitTrend: 1   },
  { id: "7",  name: "Knipex Pliers 200mm",        sku: "KNP-P20",  category: "Hand Tools",   qty: 2,   minQty: 5, buyPrice: 18.40,  sellPrice: 34.95,  qtyTrend: -31,  profitTrend: -28 },
  { id: "8",  name: "Wera Screwdriver Set 6pc",   sku: "WRA-SD6",  category: "Hand Tools",   qty: 29,  minQty: 5, buyPrice: 22.00,  sellPrice: 44.95,  qtyTrend: 7,    profitTrend: 5   },
  { id: "9",  name: "Irwin Adjustable Wrench",    sku: "IRW-AW8",  category: "Hand Tools",   qty: 41,  minQty: 5, buyPrice: 9.80,   sellPrice: 19.99,  qtyTrend: 4,    profitTrend: 2   },
  { id: "10", name: "Bahco Hacksaw 300mm",        sku: "BAH-HS30", category: "Hand Tools",   qty: 0,   minQty: 5, buyPrice: 14.20,  sellPrice: 27.50,  qtyTrend: -100, profitTrend: -100},
  { id: "11", name: "DeWalt Saw Blade Set 5pc",   sku: "DWT-BL5",  category: "Accessories",  qty: 24,  minQty: 5, buyPrice: 18.60,  sellPrice: 36.99,  qtyTrend: 9,    profitTrend: 6   },
  { id: "12", name: "Bosch Drill Bit Set 32pc",   sku: "BSH-DB32", category: "Accessories",  qty: 4,   minQty: 5, buyPrice: 24.00,  sellPrice: 46.95,  qtyTrend: -15,  profitTrend: -12 },
  { id: "13", name: "3M Safety Glasses",          sku: "3M-SG10",  category: "Accessories",  qty: 88,  minQty: 5, buyPrice: 4.20,   sellPrice: 8.99,   qtyTrend: 6,    profitTrend: 4   },
  { id: "14", name: "Milwaukee Work Gloves L",    sku: "MLW-GLV",  category: "Accessories",  qty: 55,  minQty: 5, buyPrice: 6.80,   sellPrice: 13.99,  qtyTrend: 3,    profitTrend: 2   },
  { id: "15", name: "DeWalt Toolbox 19\"",        sku: "DWT-TB19", category: "Accessories",  qty: 9,   minQty: 5, buyPrice: 34.00,  sellPrice: 64.95,  qtyTrend: 11,   profitTrend: 8   },
  { id: "16", name: "Würth Screws 6x50 (100pcs)", sku: "WRT-S650", category: "Hardware",     qty: 142, minQty: 5, buyPrice: 3.20,   sellPrice: 6.50,   qtyTrend: 1,    profitTrend: 1   },
  { id: "17", name: "Fischer Anchors SX8 (50pcs)",sku: "FSH-SX8",  category: "Hardware",     qty: 96,  minQty: 5, buyPrice: 2.80,   sellPrice: 5.75,   qtyTrend: 8,    profitTrend: 5   },
  { id: "18", name: "Hilti Epoxy Adhesive 300ml", sku: "HLT-EP3",  category: "Hardware",     qty: 0,   minQty: 5, buyPrice: 16.50,  sellPrice: 31.95,  qtyTrend: -100, profitTrend: -100},
  { id: "19", name: "3M Masking Tape 48mm×50m",   sku: "3M-MT48",  category: "Hardware",     qty: 78,  minQty: 5, buyPrice: 2.60,   sellPrice: 5.25,   qtyTrend: 5,    profitTrend: 3   },
  { id: "20", name: "Wago Connectors 221 (100pcs)",sku: "WGO-221", category: "Hardware",     qty: 61,  minQty: 5, buyPrice: 14.80,  sellPrice: 28.95,  qtyTrend: 14,   profitTrend: 10  },
];

function buildRow(item: RawItem): InventoryRow {
  const totalCost         = item.qty * item.buyPrice;
  const potentialRevenue  = item.qty * item.sellPrice;
  const potentialProfit   = potentialRevenue - totalCost;
  const margin            = Math.round(((item.sellPrice - item.buyPrice) / item.sellPrice) * 100);
  const status: InventoryRow["status"] =
    item.qty === 0 ? "out" : item.qty < item.minQty ? "low" : "ok";
  return { ...item, totalCost, potentialRevenue, potentialProfit, margin, status,
           qtyTrend: item.qtyTrend, profitTrend: item.profitTrend };
}

const fmt = (v: number) =>
  v >= 1_000 ? `€${v.toLocaleString("de-DE", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
             : `€${v.toFixed(2)}`;

const STATUS_LABEL = { ok: "In Stock", low: "Low Stock", out: "Out of Stock" };
const STATUS_CLS   = {
  ok:  "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  low: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  out: "bg-red-100   text-red-700   dark:bg-red-900/30   dark:text-red-400",
};

// ── Column definitions ─────────────────────────────────────────────────────────

const COLUMNS: DataTableColumn<InventoryRow>[] = [
  {
    id: "name", label: "Item",
    renderCell: ({ row }) => (
      <div>
        <p className="font-semibold text-ds-1 text-sm">{row.name}</p>
        <p className="text-[11px] text-ds-3">{row.category}</p>
      </div>
    ),
  },
  {
    id: "sku", label: "SKU",
    renderCell: ({ row }) => (
      <span className="font-mono text-xs text-ds-3">{row.sku}</span>
    ),
  },
  {
    id: "qty", label: "Qty",
    renderCell: ({ row }) => (
      <div className="min-w-[64px]">
        <div className="flex items-center justify-between mb-1">
          <span className={`text-sm font-bold ${row.qty === 0 ? "text-red-500" : row.qty < row.minQty ? "text-amber-500" : "text-ds-1"}`}>
            {row.qty}
          </span>
          <span className="text-[10px] text-ds-3">/{row.minQty} min</span>
        </div>
        <div className="h-1 w-full rounded-full bg-ds-border-3/40 overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              width: `${Math.min(100, Math.round((row.qty / (row.minQty * 4)) * 100))}%`,
              backgroundColor: row.qty === 0 ? "#ef4444" : row.qty < row.minQty ? "#f59e0b" : "#22c55e",
            }}
          />
        </div>
      </div>
    ),
  },
  {
    id: "buyPrice", label: "Buy Price",
    renderCell: ({ row }) => <span className="text-sm text-ds-2">{fmt(row.buyPrice)}</span>,
  },
  {
    id: "sellPrice", label: "Sell Price",
    renderCell: ({ row }) => <span className="text-sm font-semibold text-ds-1">{fmt(row.sellPrice)}</span>,
  },
  {
    id: "totalCost", label: "Total Cost",
    renderCell: ({ row }) => <span className="text-sm text-ds-3">{fmt(row.totalCost)}</span>,
  },
  {
    id: "potentialRevenue", label: "If Sold All",
    renderCell: ({ row }) => <span className="text-sm text-ds-2">{fmt(row.potentialRevenue)}</span>,
  },
  {
    id: "potentialProfit", label: "Potential Profit",
    renderCell: ({ row }) => (
      <span className="text-sm font-bold" style={{ color: "#22c55e" }}>
        {fmt(row.potentialProfit)}
      </span>
    ),
  },
  {
    id: "margin", label: "Margin",
    renderCell: ({ row }) => (
      <span className="text-sm font-semibold" style={{ color: "var(--ds-color-accent)" }}>
        {row.margin}%
      </span>
    ),
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

const ROW_ACTIONS: DataTableRowAction<InventoryRow>[] = [
  { id: "edit",    label: "Edit item"  },
  { id: "reorder", label: "Mark for reorder" },
  { id: "delete",  label: "Delete",    variant: "destructive" },
];

// ── Page ───────────────────────────────────────────────────────────────────────

export default function ERPInventoryPage() {
  const rows = useMemo(() => RAW_ITEMS.map(buildRow), []);

  const stats = useMemo(() => {
    const totalSKUs       = rows.length;
    const totalUnits      = rows.reduce((s, r) => s + r.qty, 0);
    const totalCost       = rows.reduce((s, r) => s + r.totalCost, 0);
    const potRevenue      = rows.reduce((s, r) => s + r.potentialRevenue, 0);
    const potProfit       = rows.reduce((s, r) => s + r.potentialProfit, 0);
    const lowOrOut        = rows.filter((r) => r.status !== "ok").length;
    return { totalSKUs, totalUnits, totalCost, potRevenue, potProfit, lowOrOut };
  }, [rows]);

  return (
    <div className="space-y-5 p-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ds-1">Inventory</h1>
          <p className="mt-1 text-sm text-ds-3">
            Stock levels, costs &amp; profit potential · {stats.lowOrOut} item{stats.lowOrOut !== 1 ? "s" : ""} need attention
          </p>
        </div>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <StatCard size="sm" title="Total SKUs"       value={String(stats.totalSKUs)}          dateRange="product lines" />
        <StatCard size="sm" title="Total Units"      value={stats.totalUnits.toLocaleString()} dateRange="pieces in stock" />
        <StatCard size="sm" title="Stock Value"      value={`€${Math.round(stats.totalCost / 1000)}K`}    dateRange="at buy price" />
        <StatCard size="sm" title="If Sold All"      value={`€${Math.round(stats.potRevenue / 1000)}K`}   dateRange="potential revenue" />
        <StatCard size="sm" title="Potential Profit" value={`€${Math.round(stats.potProfit / 1000)}K`}    dateRange="if all units sold"
          badge={{ value: `${Math.round((stats.potProfit / stats.potRevenue) * 100)}% margin`, direction: "up" }}
        />
      </div>

      {/* Chart cards */}
      <InventoryCards
        rows={rows}
        categoryLabels={{ "Power Tools": "Power", "Hand Tools": "Hand", Accessories: "Acc.", Hardware: "HW" }}
        revenueChangePct={8.4}
        costChangePct={3.1}
        marginChangePct={2.3}
      />

      {/* Inventory table */}
      <DataTable<InventoryRow>
        columns={COLUMNS}
        data={rows}
        pageSize={10}
        rowActions={ROW_ACTIONS}
        onRowAction={(action, row) => {
          if (action === "reorder") {
            // eslint-disable-next-line no-alert
            window.alert(`Marked "${row.name}" for reorder`);
          }
        }}
        showExportButton
        showRefreshButton
      />
    </div>
  );
}
