const data = new Array(125).fill('B');
const reqPerMlSec = 3000;
const maxReq = 10;
const time = reqPerMlSec;

test(0);

async function test(index) {

    await delay(2000);
    console.log('BOMBO');
}

function delay(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {

        }, time);
    });
};