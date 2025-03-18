export interface TimeRunnerInterface {
  id: number;
  start: (callback: VoidFunction) => TimeRunnerInterface['id'];
  stop: () => boolean;
}
