import { test } from "node:test";
import assert from "node:assert/strict";
import { ARM, forward, reach, servoValues, solve, arcPath } from "../src/lib/servo-arm.ts";

const dist = (a: { x: number; y: number }, x: number, y: number) => Math.hypot(a.x - x, a.y - y);

test("the gripper lands on any reachable target, on either side", () => {
  const targets = [
    [480, 140], [150, 200], [560, 300], [90, 320], [400, 90], [230, 110], [620, 330], [40, 330],
  ];
  for (const [x, y] of targets) {
    const d = Math.hypot(x - ARM.base.x, ARM.base.y - y);
    if (d < reach.min || d > reach.max) continue;
    const { pose } = solve(x, y);
    assert.ok(dist(forward(pose).tip, x, y) < 1, `target ${x},${y} → tip ${JSON.stringify(forward(pose).tip)}`);
  }
});

test("targets out of reach get a straight arm pointing at them", () => {
  const { pose } = solve(620, 20);
  assert.ok(Math.abs(pose.bend) < 0.5, `bend ${pose.bend}`);
  const tip = forward(pose).tip;
  const angleToTarget = Math.atan2(ARM.base.y - 20, 620 - ARM.base.x);
  const angleToTip = Math.atan2(ARM.base.y - tip.y, tip.x - ARM.base.x);
  assert.ok(Math.abs(angleToTarget - angleToTip) < 0.01);
});

test("servo values always stay within 0–180, wherever the cursor is", () => {
  for (let x = -400; x <= 1040; x += 37) {
    for (let y = -400; y <= 800; y += 41) {
      const v = servoValues(solve(x, y).pose);
      assert.ok(v.shoulder >= 0 && v.shoulder <= 180, `shoulder ${v.shoulder} at ${x},${y}`);
      assert.ok(v.elbow >= 0 && v.elbow <= 180, `elbow ${v.elbow} at ${x},${y}`);
    }
  }
});

test("the gripper never dips below the bench", () => {
  for (let x = 0; x <= 640; x += 20) {
    const tip = forward(solve(x, 900).pose).tip;
    assert.ok(tip.y <= ARM.benchY + 1, `tip y ${tip.y} at x ${x}`);
  }
});

test("a straight arm reads 90 on the elbow servo", () => {
  assert.equal(servoValues({ shoulder: 45, bend: 0 }).elbow, 90);
});

test("the elbow bend direction holds steady near the middle (no flicker)", () => {
  assert.equal(solve(ARM.base.x + 10, 100, "left").config, "left");
  assert.equal(solve(ARM.base.x - 10, 100, "right").config, "right");
  assert.equal(solve(ARM.base.x + 60, 100, "left").config, "right");
});

test("arc paths", () => {
  assert.equal(arcPath(10, 0, 0), "");
  assert.match(arcPath(10, 0, -90), /^M 10\.00 0\.00 A 10 10 0 0 0 0\.00 -10\.00$/);
});
