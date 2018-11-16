import { delay, filter, mapTo } from 'rxjs/operators'

export const PING = 'PING'
export const PONG = 'PONG'

export const messageEpic = action$ => action$.pipe(
  filter(action => action.type === PING),
  delay(1000), // Asynchronously wait 1000ms then continue
  mapTo({ type: PONG })
);
