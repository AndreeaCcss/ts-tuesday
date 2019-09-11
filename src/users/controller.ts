import {
  JsonController,
  Get,
  Param,
  Body,
  Post,
  Put,
  NotFoundError
} from "routing-controllers";
import User from "./entity";

@JsonController()
export default class UserController {
  @Get("/users/:id")
  getPage(@Param("id") id: number) {
    return User.findOne(id);
  }

  @Get("/users")
  async allPages() {
    const users = await User.find();
    return { users };
  }

  @Put("/users/:id")
  async updatePage(@Param("id") id: number, @Body() update: User) {
    const user = await User.findOne(id);
    if (!user) throw new NotFoundError("Cannot find user");

    return User.merge(user, update).save();
  }

  @Post("/users")
  async createUser(@Body() user: User) {
    const { password, ...rest } = user;
    const entity = User.create(rest);
    await entity.setPassword(password);
    return entity.save();
  }
}
