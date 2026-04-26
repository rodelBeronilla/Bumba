export type Arm = 'left' | 'right';

export type HrSample = {
  hr: number;
  rr: number[];
  ts: number;
};

export type MotionSample = {
  ax: number;
  ay: number;
  az: number;
  ts: number;
};

export type SensorStatus =
  | 'idle'
  | 'scanning'
  | 'connecting'
  | 'connected'
  | 'error'
  | 'unsupported';
