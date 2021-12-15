import faker from "faker";
import QRCode from "qrcode";
import { createConnection, getCustomRepository } from "typeorm";
import { Queue } from "./db/entity/Queue";
import { User } from "./db/entity/User";
import { QueueRepo } from "./db/repository/QueueRepo";
import { UserRepo } from "./db/repository/UserRepo";

const generateFakeUser = (): Promise<User> => {
  const userrepo = getCustomRepository(UserRepo);
  return userrepo.registerNewUser({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  });
};

const generateFakeQueue = (user: User): Promise<Queue> => {
  const queueRepo = getCustomRepository(QueueRepo);
  const address =
    faker.address.streetName() +
    ", " +
    faker.address.city() +
    ", " +
    faker.address.state();
  return queueRepo.createNewQueue(
    faker.name.jobArea(),
    user,
    faker.company.companyName(),
    faker.company.catchPhrase(),
    address,
    faker.date.soon()
  );
};

const generateRandomMembers = (users: User[]) => {
  const queueRepo = getCustomRepository(QueueRepo);
  const fun = async (queue: Queue) => {
    const ranstart = Math.floor(Math.random() * 2);
    for (let i = ranstart; i < users.length; i += 2) {
      const element = users[i];
      if (queue.admin.id === element.id) {
        continue;
      }
      try {
        await queueRepo.enlistInQueue(queue, element);
      } catch (error) {
        console.log(queue);
      }
    }
  };
  return fun;
};

const generateQrCode = async (queue: Queue) => {
  const id: string = queue.id;
  const dataUrl = await QRCode.toDataURL(id.toString(), { type: "image/png" });
  console.log(dataUrl);
  queue.qrcode = dataUrl;
  queue.save();
};

const generateSpecialUser = async () => {
  const userRepo = getCustomRepository(UserRepo);
  const queueRepo = getCustomRepository(QueueRepo);
  const kareem = await userRepo.registerNewUser({
    firstName: "kareem",
    lastName: "Ali",
    email: "kareem@ali.com",
    password: "kareem",
  });
  queueRepo.createNewQueue(
    "queue1",
    kareem,
    "organization1",
    "description1",
    "address1",
    new Date(2021, 3, 1, 9, 0, 0, 0)
  );
  queueRepo.createNewQueue(
    "queue2",
    kareem,
    "organization2",
    "description2",
    "address2",
    new Date(2021, 4, 1, 9, 0, 0, 0)
  );
};

const populate = async () => {
  await createConnection();
  await generateSpecialUser();
  Promise.all(new Array(30).fill(0).map(generateFakeUser)).then((users) => {
    Promise.all(users.map(generateFakeQueue)).then(async (queues) => {
      for (let index = 0; index < queues.length; index++) {
        const queue = queues[index];
        await generateRandomMembers(users)(queue);
      }
      // Promise.all(queues.map(generateRandomMembers(users)))
      // .catch(error => {
      //   console.log(error.message);
      // });
    });
  });
};

populate();
