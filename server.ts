import Koa from 'koa';
import bodyParser from "koa-bodyparser";
import userRoute from "./routes/user.route";
import violationRoute from "./routes/violation.route";
import { connectToDatabase } from "./database";
import { errorHandler } from "./middleware/error-hendler";

export async function bootstrap() {
  const app = new Koa();

  app.use(errorHandler);
  app.use(bodyParser());

  app.use(userRoute.routes());
  app.use(userRoute.allowedMethods());

  app.use(violationRoute.routes());
  app.use(violationRoute.allowedMethods());

  await connectToDatabase();

  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`)
  });
}

bootstrap();
