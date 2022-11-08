import chalk from "chalk";
import mongoose from "mongoose";
import debugCreator from "debug";

const debug = debugCreator("robots:database:root");

const connectDatabase = async (url: string) => {
  try {
    await mongoose.connect(url);
    debug(chalk.green("Connection to data base was succesfull"));
  } catch (error: unknown) {
    debug(chalk.red("Error on connection", (error as Error).message));
  }
};

export default connectDatabase;
