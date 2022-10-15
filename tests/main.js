import http from "k6/http";

const stages = []

for (let i = 0; i < 12; i++) {
    stages.push(
        { duration: '30m', target: 300 },
        { duration: '30m', target: 0 },
    );
}

export const options = { stages };

export default function() {
    let response = http.get(`${__ENV.URL}`);
};
