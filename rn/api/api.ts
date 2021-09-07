import { Queue } from "../helper-compnents/QueueCard";

const serverIp: string = "http://192.168.1.20:4000";
// const serverIp: string = "http://102.46.66.249:4000";

//-------- utility functions --------------
interface HttpResponse<T> extends Response {
  parsedBody?: T;
}

export async function authenticated<T>(
  authenticationFun: () => void,
  httpFun: (accessToken: string) => Promise<HttpResponse<T>>,
  accessToken: string
) {
  try {
    return await httpFun(accessToken);
  } catch (error) {
    // console.log("failed failed ya fashel fashel");
    // access token or refresh token got expired
    await authenticationFun();
    return await httpFun(accessToken);
  }
}

export async function http<T>(request: RequestInfo): Promise<HttpResponse<T>> {
  try {
    const response: HttpResponse<T> = await fetch(request);
    // console.log(response.status);
    try {
      const parsedBody = await response.json();
      response.parsedBody = parsedBody;
    } catch {}
    if (!response.ok && response.parsedBody) {
      throw new Error(response.parsedBody.message);
    }
    return response;
  } catch (error) {
    throw error;
  }
}

export async function httpRegister(
  firstName: string,
  lastName: string,
  email: string,
  password: string
) {
  const response = await http<{ message: string }>(
    new Request(serverIp + "/users", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      }),
    })
  );
  return response;
}

export async function httpLogin(email: string, password: string) {
  const req = new Request(serverIp + "/login", {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
  const response = await http<{
    message: string;
    accessToken: string;
    refreshToken: string;
  }>(req);
  return response;
}

export async function httpLogout(refreshToken: string) {
  const req = new Request(serverIp + "/logout", {
    method: "delete",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refreshToken: refreshToken,
    }),
  });
  return await http<{}>(req);
}

export async function httpToken(refreshToken: string) {
  const req = new Request(serverIp + "/token", {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refreshToken: refreshToken,
    }),
  });
  const response = await http<{
    message: string;
    accessToken: string;
    refreshToken: string;
  }>(req);
  return response;
}

export async function httpAllQueues(accessToken: string) {
  const req = new Request(serverIp + "/queues/all", {
    method: "get",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  });
  const response = await http<{ queues: Queue[] }>(req);
  return response;
}

export async function httpMyQueues(accessToken: string) {
  const req = new Request(serverIp + "/queues", {
    method: "get",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  });
  const response = await http<{ queues: Queue[] }>(req);
  return response;
}
