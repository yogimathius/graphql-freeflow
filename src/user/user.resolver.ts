import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UsersArgs } from './dto/users.args';
import { NewUserInput } from './dto/new-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly usersService: UserService) {}

  @Query(() => User)
  async user(@Args('id') id: number): Promise<User> {
    return this.usersService.findOneById(id);
  }

  @Query(() => [User])
  users(@Args() usersArgs: UsersArgs): Promise<User[]> {
    return this.usersService.findAll(usersArgs);
  }

  @Mutation(() => User)
  async createUser(
    @Args('newUserData') newUserData: NewUserInput,
  ): Promise<User> {
    return this.usersService.create(newUserData);
  }

  @Mutation(() => User)
  async updateUser(
    @Args({ name: 'id', type: () => Number }) id: number,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<User> {
    return this.usersService.update(id, updateUserInput);
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args('id') id: number): Promise<boolean> {
    return this.usersService.remove(id);
  }
}
