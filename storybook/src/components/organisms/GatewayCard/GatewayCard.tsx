import styled from "styled-components";
import { Surface } from "../../foundations/Surface/Surface";
import { Text } from "../../foundations/Text/Text";
import { Icon } from "../../foundations/Icon/Icon";
import { Divider } from "../../foundations/Divider/Divider";
import { Sparkline } from "../../foundations/Sparkline/Sparkline";
import { Header } from "../../atoms/Header/Header";
import { CounterGroup } from "../../atoms/CounterGroup/CounterGroup";
import { DataRow } from "../../atoms/DataRow/DataRow";
import { MetricPair } from "../../atoms/MetricPair/MetricPair";
import { ChipGroup } from "../../atoms/ChipGroup/ChipGroup";
import { Button } from "../../atoms/Button/Button";
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
      <Header name={data.device.name} />

      <Group $mt={8}>
        <CounterGroup
          items={[
            { icon: "gatewayCount", count: data.counts.gateway },
            { icon: "wiredCount", count: data.counts.wired },
            { icon: "wirelessCount", count: data.counts.wireless },
            { icon: "clientCount", count: data.counts.clients },
          ]}
        />
      </Group>

      <Group $gap={8} $mt={8}>
        <DataRow label="Gateway IP" value={data.status.gatewayIp} />
        <DataRow label="System Uptime" value={data.status.uptime} />
        <DataRow
          label={data.status.networkVersion}
          value="Up to date"
          trailing={
            <ClockIcon>
              <Icon name="clock" size={20} />
            </ClockIcon>
          }
        />
        <DataRow label={data.status.osVersion} value="Up to date" />
        <DataRow label="Devices" value="Up to date" />
      </Group>

      <Divider />

      <Group $gap={8}>
        <DataRow
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
        <DataRow label="IPv4 Address" value={data.isp.ipv4} />
        <DataRow label="Monthly Data Usage" value={data.isp.monthlyDataUsage} />
        <DataRow
          label="Throughput"
          value={<MetricPair down={data.isp.throughput.down} up={data.isp.throughput.up} />}
        />
      </Group>

      <SparkWrap>
        <Sparkline download={data.isp.history.download} upload={data.isp.history.upload} />
      </SparkWrap>

      <Group $mt={12}>
        <ChipGroup
          items={data.latency.map((l) => ({
            logo: latencyLogos[l.destination].logo,
            alt: latencyLogos[l.destination].alt,
            value: l.value,
          }))}
        />
      </Group>

      <Group $gap={8} $mt={12}>
        <Button icon="speedTest" label="ISP Speed Test" />
        <Button icon="wifiDoctor" label="WiFi Doctor" />
      </Group>
    </Card>
  );
}
