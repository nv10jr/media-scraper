// import http from 'k6/http'
// import { check } from 'k6'

// export const options = {
//   vus: 100, // 100 virtual users
//   iterations: 5000, // total 5000 requests
// }

// export default function () {
//   const url = 'http://localhost:3000/api/scrape'
//   const payload = JSON.stringify({
//     urls: ['https://znews.vn'],
//   })

//   const params = {
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: 'Basic YWRtaW46c2VjcmV0',
//     },
//   }

//   const res = http.post(url, payload, params)
//   check(res, {
//     'status is 200': (r) => r.status === 200,
//   })
// }
