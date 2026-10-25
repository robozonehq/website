
export const ARM = {
  base: { x: 320, y: 316 },
  upper: 160,
  fore: 135,
  benchY: 342,
} as const;

export type Config = "right" | "left";

export interface Pose {
  shoulder: number;
  bend: number;
}

const RAD = Math.PI / 180;
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

export const reach = {
  min: Math.hypot(ARM.upper, ARM.fore),
  max: ARM.upper + ARM.fore,
};

export function solve(x: number, y: number, previous: Config = "right"): { pose: Pose; config: Config } {
  const floorDy = ARM.base.y - ARM.benchY;
  let dx = x - ARM.base.x;
  let dy = ARM.base.y - Math.min(y, ARM.benchY);

  const config: Config = dx > 24 ? "right" : dx < -24 ? "left" : previous;

  const raw = Math.hypot(dx, dy);
  const d = clamp(raw, reach.min, reach.max);
  if (raw === 0) {
    dy = d;
  } else {
    dx *= d / raw;
    dy *= d / raw;
  }
  if (dy < floorDy) {
    dy = floorDy;
    dx = Math.sign(dx || 1) * Math.sqrt(d * d - dy * dy);
  }

  const cos = clamp((d * d - ARM.upper ** 2 - ARM.fore ** 2) / (2 * ARM.upper * ARM.fore), -1, 1);
  const magnitude = Math.acos(cos);
  const bend = config === "right" ? -magnitude : magnitude;

  let toTarget = Math.atan2(dy, dx);
  if (toTarget < -Math.PI / 2) toTarget += 2 * Math.PI;
  const shoulder = toTarget - Math.atan2(ARM.fore * Math.sin(bend), ARM.upper + ARM.fore * Math.cos(bend));

  return {
    pose: {
      shoulder: clamp(shoulder / RAD, 0, 180),
      bend: clamp(bend / RAD, -90, 90),
    },
    config,
  };
}

export function forward(pose: Pose) {
  const a = pose.shoulder * RAD;
  const b = (pose.shoulder + pose.bend) * RAD;
  const elbow = { x: ARM.base.x + ARM.upper * Math.cos(a), y: ARM.base.y - ARM.upper * Math.sin(a) };
  const tip = { x: elbow.x + ARM.fore * Math.cos(b), y: elbow.y - ARM.fore * Math.sin(b) };
  return { elbow, tip };
}

export function servoValues(pose: Pose) {
  return {
    shoulder: Math.round(pose.shoulder),
    elbow: Math.round(90 + pose.bend),
  };
}

export function arcPath(radius: number, a0: number, a1: number): string {
  if (Math.abs(a1 - a0) < 0.5) return "";
  const p = (a: number) => `${(radius * Math.cos(a * RAD)).toFixed(2)} ${(radius * Math.sin(a * RAD)).toFixed(2)}`;
  const sweep = a1 > a0 ? 1 : 0;
  const large = Math.abs(a1 - a0) > 180 ? 1 : 0;
  return `M ${p(a0)} A ${radius} ${radius} 0 ${large} ${sweep} ${p(a1)}`;
}

export const REST: Pose = { shoulder: 64, bend: -50 };
export const FOLDED: Pose = { shoulder: 96, bend: 88 };
