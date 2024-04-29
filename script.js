import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    stages: [
      { duration: '10s', target: 10 },
      { duration: '10s', target: 20 },
      { duration: '10s', target: 30 },
      { duration: '10s', target: 0 },
    ],
  };

export default function () {
  http.get('https://unionfestival.kr/');
  sleep(1);
}