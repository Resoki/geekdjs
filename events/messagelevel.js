const client = require("..");
const global = require("../config.json");
const { QuickDB } = require("quick.db");
const { MongoDriver } = require("quickmongo");
const driver = new MongoDriver(global.mongoUrl);

const isExistUser = async (author) => {
  return driver.connect().then(async () => {
    const db = new QuickDB({ driver });
    const userLevelInfos = await db.get(`level_${author.id}`);
    return userLevelInfos;
  });
};

const createUser = async (author) => {
  return driver.connect().then(async () => {
    const db = new QuickDB({ driver });
    await db.set(`level_${author.id}`, {
      id: author.id,
      username: author.username,
      currentLevel: 0,
      currentLevelXp: 0,
      nextLevelXpNeeded: 50,
    });
    return;
  });
};

const addXpToUser = async (author, message) => {
  return driver.connect().then(async () => {
    const db = new QuickDB({ driver });
    await db.add(`level_${author.id}.currentLevelXp`, 1);
    const currentLevelXp = await db.get(`level_${author.id}.currentLevelXp`);
    const nextLevelXpNeeded = await db.get(
      `level_${author.id}.nextLevelXpNeeded`
    );
    if (currentLevelXp >= nextLevelXpNeeded) {
      await levelUpUser(author);
      await resetCurrentLevelXp(author);
      await increaseNextLevelXpNeeded(author);
      const currentLevel = await db.get(`level_${author.id}.currentLevel`);
      message.channel.send(
        `<@${author.id}> vient de passer au niveau **${currentLevel}** !`
      );
    }
  });
};

const levelUpUser = async (author) => {
  return driver.connect().then(async () => {
    const db = new QuickDB({ driver });
    await db.add(`level_${author.id}.currentLevel`, 1);
    return;
  });
};

const resetCurrentLevelXp = async (author) => {
  return driver.connect().then(async () => {
    const db = new QuickDB({ driver });
    await db.set(`level_${author.id}.currentLevelXp`, 0);
    return;
  });
};

const increaseNextLevelXpNeeded = async (author) => {
  return driver.connect().then(async () => {
    const db = new QuickDB({ driver });
    const currentNextLevelXpNeeded = await db.get(
      `level_${author.id}.nextLevelXpNeeded`
    );
    await db.set(
      `level_${author.id}.nextLevelXpNeeded`,
      currentNextLevelXpNeeded * 1.2
    );
    return;
  });
};

client.on("messageCreate", async (message) => {
  if (await isExistUser(message.author)) {
    await addXpToUser(message.author, message);
    return;
  }

  await createUser(message.author).then((res) =>
    console.log(`User crée, ${res}`)
  );

  driver.connect().then(async () => {
    const db = new QuickDB({ driver });
    const userLevelInfos = await db.get(`level_${message.author.id}`);
    console.log(userLevelInfos);
  });
});
