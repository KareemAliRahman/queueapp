import faker, { fake } from 'faker';
import { createConnection, FileLogger, getCustomRepository } from 'typeorm';
import { Queue } from './db/entity/Queue';
import { User } from './db/entity/User';
import { QueueRepo } from './db/repository/QueueRepo';
import { UserRepo } from './db/repository/UserRepo';

const generateFakeUser = () : Promise<User> => {
  const userRepo = getCustomRepository(UserRepo);
  return userRepo.registerNewUser(faker.name.firstName()
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

export const populate = async () => {
  await createConnection();
  Promise.all(new Array(30).fill(0).map(generateFakeUser)).then(
    users => {
      Promise.all(users.map(generateFakeQueue)).then(
        queues => {
          Promise.all(queues.map(generateRandomMembers(users)))
          .catch(error => {
          });
        }
      );
    }
  );
}

populate();