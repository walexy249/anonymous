import { MatProgressButtonOptions } from "mat-progress-buttons";

export let spinnerButtonOptions: MatProgressButtonOptions = {
  active: false,
  text: "Spinner Button",
  spinnerSize: 22,
  raised: true,
  stroked: false,
  // buttonColor: "primary",
  spinnerColor: "primary",
  fullWidth: false,
  // disabled: false,
  mode: "indeterminate",
  // buttonIcon: {
  //   fontIcon: "favorite",
  // },
};

export const fabSpinnerButtonOptions: MatProgressButtonOptions = {
  active: false,
  text: "Spinner Button",
  spinnerSize: 18,
  raised: true,
  fab: true,
  stroked: false,
  buttonColor: "primary",
  spinnerColor: "accent",
  fullWidth: false,
  disabled: false,
  mode: "indeterminate",
  // icon: {
  //   fontIcon: "favorite",
  // },
};

export const barButtonOptions: MatProgressButtonOptions = {
  active: false,
  text: "Progress Bar Button",
  buttonColor: "accent",
  barColor: "primary",
  raised: true,
  stroked: false,
  mode: "indeterminate",
  value: 0,
  // disabled: false,
  fullWidth: false,
  // buttonIcon: {
  //   fontIcon: "favorite",
  // },
};
