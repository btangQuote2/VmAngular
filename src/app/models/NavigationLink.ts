// Defines the NavigationLinks model as returned by /Shared/Navigation

export class NavigationLink {
  '$id': string;
  'Ordinal': number;
  'Action': string;
  'Children': NavigationLink[];
  'Key': string;
  'System': number;
  'Title': string;
  'iconName': string;
  'Visible': boolean;
  'expandFull': boolean;
}
