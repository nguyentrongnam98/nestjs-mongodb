import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schema/User.schema';
import { UserDto } from '../user/user.dto';
import { UserSetting } from 'src/schema/UserSetting.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(UserSetting.name) private userSettingModel: Model<UserSetting>,
  ) {}
  async createUser({ settings, ...user }: UserDto) {
    if (settings) {
      const userSetting = await this.userSettingModel.create(settings);
      userSetting.save();
      const newUser = await this.userModel.create({
        ...user,
        settings: userSetting._id,
      });
      return newUser.save();
    }
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  getUsers() {
    return this.userModel
      .find()
      .populate(['settings', 'post', 'product'])
      .exec();
  }

  getUserById(id: string) {
    return this.userModel.findById(id).populate('post').exec();
  }

  updateUser(id: string, user: UserDto) {
    return this.userModel.findByIdAndUpdate(id, user, { new: true }).exec();
  }

  deleteUser(id: string) {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
