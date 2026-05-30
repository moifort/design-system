/** Shape of the gateway summary widget, mirroring the real aggregated-dashboard API. */
export type GatewayCardData = {
  device: {
    name: string;
    /** wide product thumbnail alt / model label */
    model: string;
  };
  /** connectivity counters shown under the header */
  counts: {
    gateway: number;
    wired: number;
    wireless: number;
    clients: number;
  };
  status: {
    gatewayIp: string;
    uptime: string;
    networkVersion: string;
    osVersion: string;
    devicesUpToDate: boolean;
  };
  isp: {
    name: string;
    healthPercent: number;
    ipv4: string;
    monthlyDataUsage: string;
    throughput: { down: string; up: string };
    history: { download: number[]; upload: number[] };
  };
  latency: { destination: "microsoft" | "google" | "cloudflare"; value: string }[];
};
