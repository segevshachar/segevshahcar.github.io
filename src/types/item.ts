export interface Group {
  id: string;
  content: string;
  subgroupStack: boolean;
}

export interface Item {
  content: string;
  title: string;
  type: 'box' | 'point' | 'range' | 'background';
  start: Date;
  end: Date;
  group: string;
  subgroup: string;
  className: string;
}

export const colors = ['red', 'magenta', 'green', 'orange', 'purple', 'yellow' , 'blue'];
