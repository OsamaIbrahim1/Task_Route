import db_Connection from "../DB/db_Connection.js";
import { globalResponse } from "./middlewares/global-response.middleware.js";
import { rollbackSavedDocuments } from "./middlewares/rollback-saved-Documents.js";
import { rollbackUploadedFiles } from "./middlewares/rollback-uploaded-files.middleware.js";
import * as routers from "./modules/index.routes.js";

export const initiateApp = (app, express) => {
  const port = +process.env.PORT || 4000;

  app.use(express.json());

  app.use("/users", routers.userRouter);
  app.use("/categories", routers.categoryRouter);

  app.use("*", (req, res, next) => {
    res.status(404).json({ message: "Not Found" });
  });

  app.use(globalResponse, rollbackUploadedFiles, rollbackSavedDocuments);

  db_Connection();
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
};
