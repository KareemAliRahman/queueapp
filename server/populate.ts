import faker from 'faker';
import QRCode from 'qrcode';
import { getCustomRepository } from 'typeorm';
import { Queue } from './db/entity/Queue';
import { User } from './db/entity/User';
import { QueueRepo } from './db/repository/QueueRepo';
import { UserRepo } from './db/repository/UserRepo';

const generateFakeUser = () : Promise<User> => {
  const userrepo = getCustomRepository(UserRepo);
  return userrepo.registerNewUser(faker.name.firstName()
  , faker.name.lastName()
  , faker.internet.email()
  , faker.internet.password());
}

const generateFakeQueue = (user : User) : Promise<Queue> => {
  const queueRepo = getCustomRepository(QueueRepo);
  return queueRepo.createNewQueue(faker.name.jobArea(), user, 
    faker.company.companyName(), faker.company.catchPhrase());
}

const generateRandomMembers = (users : User[]) => {
  const queueRepo = getCustomRepository(QueueRepo);
  const fun = async (queue : Queue) => { 
    const ranstart = Math.floor(Math.random()*2);
    for (let i = ranstart; i < users.length; i+=2) {
      const element = users[i];
      if(queue.admin.id === element.id){
        continue;
      }
      await queueRepo.enlistInQueue(queue, element);
    }
  }
  return fun;
}

const generateQrCode = async (queue: Queue) => {
  const id : string = queue.id;
  const dataUrl = await QRCode.toDataURL(id.toString(), {type: 'image/png'});
  console.log(dataUrl);
  queue.qrcode = dataUrl;
  queue.save();
}

const generateSpecialUser = async () => {
  const userRepo = getCustomRepository(UserRepo);
  const queueRepo = getCustomRepository(QueueRepo);
  const kareem  = await userRepo.registerNewUser( "kareem", "Ali", "kareem@ali.com", "kareem");
  queueRepo.createNewQueue("queue1", kareem, "organization1", "description1");
  queueRepo.createNewQueue("queue2", kareem, "organization2", "description2");
}

const populate = async () => {
  await generateSpecialUser();
  Promise.all(new Array(30).fill(0).map(generateFakeUser)).then(
    users => {
      Promise.all(users.map(generateFakeQueue)).then(
        queues => {
          // Promise.all(queues.map(generateQrCode));
          Promise.all(queues.map(generateRandomMembers(users)))
          .catch(error => {
            console.log(error.message);
          });
        }
      );
    }
  );
}

populate();