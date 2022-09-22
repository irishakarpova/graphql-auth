import {
  Resolver,
  Query,
  Mutation,
  Arg,
  ObjectType,
  Field,
  Ctx,
  UseMiddleware,
  Int,
} from 'type-graphql';
import { User } from './entity/User';
import { compare, hash } from 'bcryptjs';
import { MyContext } from './myContext';
import { createAccessToken, createRefreshToken } from './utils/auth';
import { isAuth } from './utils/isAuth';
import { sendRefreshToken } from './utils/sendRefreshToken';
import { verify } from 'jsonwebtoken';
import { AppDataSource } from './data-source';
import { isValid } from './utils/isValid';

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
  @Field(() => User)
  user: User;
}

@Resolver()
export class UserResolver {
  @Query(() => String)
  @UseMiddleware(isAuth)
  currentUser(@Ctx() { payload }: MyContext) {
    return `your user id is ${payload?.userId}`;
  }

  @Query(() => [User])
  users() {
    return User.find();
  }

  @Query(() => User, { nullable: true })
  loggedInUser(@Ctx() context: MyContext) {
    const authorization = context.req.headers['authorization'];
    if (!authorization) {
      return null;
    }
    try {
      const token = authorization.split(' ')[1];
      const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);
      return User.findOne({ where: { id: payload.userId } });
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { res }: MyContext) {
    sendRefreshToken(res, '');
    return true;
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg('userId', () => Int) userId: number) {
    await AppDataSource.getRepository(User).delete({ id: userId });
    return true;
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { res }: MyContext
  ): Promise<LoginResponse> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error('could not find user');
    }

    const valid = await compare(password, user.password);

    if (!valid) {
      throw new Error('bad password');
    }

    sendRefreshToken(res, createRefreshToken(user));

    return {
      accessToken: createAccessToken(user),
      user,
    };
  }

  @Mutation(() => Boolean)
  async register(
    @Arg('email', { validate: true }) email: string,
    @Arg('password') password: string
  ) {
    const hashedPassword = await hash(password, 10);
    const validatedArgs = await isValid(email, password);

    if (validatedArgs) {
      try {
        await User.insert({
          email,
          password: hashedPassword,
        });
      } catch (errors) {
        return false;
      }
      return true;
    }
    return false;
  }
}
