import type { Component } from 'vue'
import {
  GlobeIcon,
  SmartphoneIcon,
  CloudIcon,
  LightbulbIcon,
  PaletteIcon,
  WrenchIcon,
  CodeIcon,
  ServerIcon,
  ShieldIcon,
  RocketIcon,
  DatabaseIcon,
  ZapIcon,
  CpuIcon,
  LineChartIcon,
  PenToolIcon,
  HeadphonesIcon,
} from 'lucide-vue-next'

export const iconRegistry: Record<string, Component> = {
  globe: GlobeIcon,
  smartphone: SmartphoneIcon,
  cloud: CloudIcon,
  lightbulb: LightbulbIcon,
  palette: PaletteIcon,
  wrench: WrenchIcon,
  code: CodeIcon,
  server: ServerIcon,
  shield: ShieldIcon,
  rocket: RocketIcon,
  database: DatabaseIcon,
  zap: ZapIcon,
  cpu: CpuIcon,
  'line-chart': LineChartIcon,
  'pen-tool': PenToolIcon,
  headphones: HeadphonesIcon,
}

export const iconNames = Object.keys(iconRegistry)

export function getIcon(name: string): Component {
  return iconRegistry[name] ?? GlobeIcon
}
