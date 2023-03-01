export interface Item {
  content: string;
  title: string;
  type: 'box' | 'point' | 'range' | 'background';
  start: Date;
  end: Date;
  group: string;
  subgroup: string;
}
