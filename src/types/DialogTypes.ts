export interface DialogType<T> {
  open: boolean;
  refresh: () => void;
  onClose: () => void;
  editData: T;
}
