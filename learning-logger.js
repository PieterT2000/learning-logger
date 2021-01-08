#!/usr/bin/env node
const readline = require("readline");
const config = require("./lib/config");
const colors = require("colors");
const { promisify } = require("util");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question[promisify.custom] = (question) => {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
};
const ask = promisify(rl.question);

// Custom end-of-line
const lSuffix = `\n> `;

const principles = [
  `Leave a problem if you're stuck for longer than 10 minutes.`,
  `Take a break every 25 minutes.`,
  `Focus 😉`,
];

/* learning-logger today -> What is the most important thing you learned today */
if (process.argv[2] === "today") {
  config.getUsername().then((name) =>
    ask(
      `Hello ${name}!\nWhat is the most important thing you learned today?${lSuffix}`
    ).then((ans) => {
      // ... Store in database
      process.exit(0);
    })
  );
}

/* learning-logger (default command) will record a new learning activity that has yet to start */
config.getUsername().then((name) => {
  ask(`Hello ${name}!\nWhat will you be learning?${lSuffix}`).then((ans) => {
    // Store in database and start recording time

    ask(`What problem does learning about ${ans} solve?${lSuffix}`)
      .then((ans) => {
        // Store in db.
      })
      .then(() => {
        ask(`How does it relate to what you already know?${lSuffix}`)
          .then((ans) => {
            // Store in db
          })
          .then(() => {
            console.log(`Good luck with learning ${name}!\n`);
            console.log(
              `Don't forget your learning principles:`.bgGray.brightGreen.bold
            );
            console.log();
            for (let principle of principles) {
              console.log(`  ✅ ${principle}`);
            }
            console.log();
            process.exit(0);
          });
      });
  });
});
