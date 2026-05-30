import type { GatewayCardData } from "../types/dashboard";

/**
 * Hard-coded data transcribed verbatim from the live device's
 * `proxy/network/v2/api/site/default/aggregated-dashboard` response.
 */
export const gatewayCardMock: GatewayCardData = {
  device: { name: "TiGatewayUltra", model: "UCG Ultra" },
  counts: { gateway: 1, wired: 0, wireless: 2, clients: 21 },
  status: {
    gatewayIp: "192.168.1.1",
    uptime: "2d 23h 34m 23s",
    networkVersion: "Network 10.4.57",
    osVersion: "UniFi OS 5.1.12",
    devicesUpToDate: true,
  },
  isp: {
    name: "Free SAS",
    healthPercent: 100,
    ipv4: "78.192.81.11",
    monthlyDataUsage: "88.3 GB",
    throughput: { down: "92.4 Kbps", up: "86.3 Kbps" },
    history: {
      download: [
        5, 6, 5, 7, 6, 8, 7, 9, 8, 10, 9, 11, 10, 13, 12, 15, 14, 17, 16, 19, 18, 21, 20, 24,
      ],
      upload: [4, 4, 5, 5, 6, 5, 6, 7, 7, 8, 8, 9, 9, 10, 11, 10, 12, 13, 12, 14, 13, 15, 14, 16],
    },
  },
  latency: [
    { destination: "microsoft", value: "<1ms" },
    { destination: "google", value: "1ms" },
    { destination: "cloudflare", value: "3ms" },
  ],
};
