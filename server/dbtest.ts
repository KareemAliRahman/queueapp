import { createConnection, getConnection, getCustomRepository } from "typeorm";
import { Queue } from "./db/entity/Queue";
import { QueueRepo } from "./db/repository/QueueRepo";
import { UserRepo } from "./db/repository/UserRepo";

async function dbtest() {
  const connection = await createConnection();
  const queueRepo = getCustomRepository(QueueRepo)
  // let queues = await queueRepo.find({relations: ['admin']});
  // console.log(queues);
  // console.log(queues.length);

  // let queues = await connection.getRepository(Queue).createQueryBuilder("queue")
  //   .leftJoinAndSelect("queue.admin", "admin")
  //   .select([
  //     "queue.id",
  //     "name",
  //     "description",
  //     "organization",
  //     "admin.firstName AS adminFname",
  //     "admin.lastName AS adminLname"
  //   ])
  //   .getRawMany();
  // console.log(queues);
  // console.log(queues.length);

  // queues = await queueRepo.find(); 
  // console.log(queues);
  // console.log(queues.length);

  const userRepo = getCustomRepository(UserRepo);
  // const user = await userRepo.findOne("9f2a7381-1d40-47a7-8040-258e64ffc80e", {relations: ['queues']});
  // // await queueRepo.createNewQueue("queue1", user, "org1", "desc1");
  // console.log(user.queues);

  // const userid = "9f2a7381-1d40-47a7-8040-258e64ffc80e";
  // let queues = await connection.getRepository(Queue).createQueryBuilder("queue")
  //   .leftJoinAndSelect("queue.admin", "admin")
  //   .select([
  //     "queue.id",
  //     "name",
  //     "description",
  //     "organization",
  //     "admin.firstName AS adminfname",
  //     "admin.lastName AS adminlname"
  //   ])
  //   .where("queue.admin.id = :id", {id: userid})
  //   .getRawMany();
  //   console.log(queues);
  const user = await userRepo.findOne("9f2a7381-1d40-47a7-8040-258e64ffc80e", {relations: ['queues']});
  // await queueRepo.createNewQueue("queue2", user, "org2", "desc2");
  console.log(user.queues);

}

dbtest();