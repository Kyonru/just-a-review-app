export interface DropdownProps {
  onSelect(value: string): void;
  options: { label: string; value: string }[];
  label: string;
  selectedValue: string;
  primaryColor: string;
}
