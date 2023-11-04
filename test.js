async function test() {
  for (let i = 0; i < 10000; i++) {
    const answer = await (
      await fetch("http://localhost:8080/update_balance?userId=1&balance=2")
    ).text();
    console.log(answer);
  }
}

test().then();
