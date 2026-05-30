import styled from "styled-components";
import { Surface } from "../../atoms/Surface/Surface";
import { Text } from "../../atoms/Text/Text";
import { Icon } from "../../atoms/Icon/Icon";
import { Divider } from "../../atoms/Divider/Divider";
import { Sparkline } from "../../atoms/Sparkline/Sparkline";
import { DeviceHeader } from "../../molecules/DeviceHeader/DeviceHeader";
import { ConnectionCounts } from "../../molecules/ConnectionCounts/ConnectionCounts";
import { StatRow } from "../../molecules/StatRow/StatRow";
import { Throughput } from "../../molecules/Throughput/Throughput";
import { LatencyRow } from "../../molecules/LatencyRow/LatencyRow";
import { ActionButton } from "../../molecules/ActionButton/ActionButton";
import type { GatewayCardData } from "../../../types/dashboard";

import freeSas from "../../../assets/brands/free-sas.png";
import microsoft from "../../../assets/brands/microsoft.png";
import google from "../../../assets/brands/google.png";
import cloudflare from "../../../assets/brands/cloudflare.svg";

const Card = styled(Surface)`
  width: 280px;
`;

/** A vertical group; first child sits flush, later groups get an 8px gap. */
const Group = styled.div<{ $gap?: number; $mt?: number }>`
  display: flex;
  flex-direction: column;
  gap: ${({ $gap = 0 }) => $gap}px;
  margin-top: ${({ $mt = 0 }) => $mt}px;
`;

const IspName = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const FreeLogo = styled.img`
  width: 20px;
  height: 20px;
  object-fit: contain;
  filter: ${({ theme }) => (theme.mode === "eink" ? "grayscale(1) brightness(0)" : "none")};
`;

const SparkWrap = styled.div`
  margin-top: 12px;
  padding-left: 96px;
`;

/** The blue "up to date" clock that trails the Network version row. */
const ClockIcon = styled.span`
  display: flex;
  color: ${({ theme }) => theme.color.link};
`;

const latencyLogos: Record<
  GatewayCardData["latency"][number]["destination"],
  { logo: string; alt: string }
> = {
  microsoft: { logo: microsoft, alt: "Microsoft" },
  google: { logo: google, alt: "Google" },
  cloudflare: { logo: cloudflare, alt: "Cloudflare" },
};

export function GatewayCard({ data }: { data: GatewayCardData }) {
  return (
    <Card>
      <DeviceHeader name={data.device.name} />

      <Group $mt={8}>
        <ConnectionCounts
          items={[
            { icon: "gatewayCount", count: data.counts.gateway },
            { icon: "wiredCount", count: data.counts.wired },
            { icon: "wirelessCount", count: data.counts.wireless },
            { icon: "clientCount", count: data.counts.clients },
          ]}
        />
      </Group>

      <Group $gap={8} $mt={8}>
        <StatRow label="Gateway IP" value={data.status.gatewayIp} />
        <StatRow label="System Uptime" value={data.status.uptime} />
        <StatRow
          label={data.status.networkVersion}
          value="Up to date"
          trailing={
            <ClockIcon>
              <Icon name="clock" size={20} />
            </ClockIcon>
          }
        />
        <StatRow label={data.status.osVersion} value="Up to date" />
        <StatRow label="Devices" value="Up to date" />
      </Group>

      <Divider />

      <Group $gap={8}>
        <StatRow
          label={
            <IspName>
              <FreeLogo src={freeSas} alt={data.isp.name} />
              <Text $tone="link">{data.isp.name}</Text>
            </IspName>
          }
          value={
            <Text $tone="success" $strong>
              {data.isp.healthPercent} %
            </Text>
          }
        />
        <StatRow label="IPv4 Address" value={data.isp.ipv4} />
        <StatRow label="Monthly Data Usage" value={data.isp.monthlyDataUsage} />
        <StatRow
          label="Throughput"
          value={<Throughput down={data.isp.throughput.down} up={data.isp.throughput.up} />}
        />
      </Group>

      <SparkWrap>
        <Sparkline download={data.isp.history.download} upload={data.isp.history.upload} />
      </SparkWrap>

      <Group $mt={12}>
        <LatencyRow
          items={data.latency.map((l) => ({
            logo: latencyLogos[l.destination].logo,
            alt: latencyLogos[l.destination].alt,
            value: l.value,
          }))}
        />
      </Group>

      <Group $gap={8} $mt={12}>
        <ActionButton icon="speedTest" label="ISP Speed Test" />
        <ActionButton icon="wifiDoctor" label="WiFi Doctor" />
      </Group>
    </Card>
  );
}
