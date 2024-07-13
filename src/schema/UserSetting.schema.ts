import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class UserSetting {
  @Prop({ required: false })
  receiveNotifications?: boolean;

  @Prop({ required: false })
  receiveEmails?: boolean;

  @Prop({ required: false })
  receiveSMS?: boolean;
}

export const UserSettingSchema = SchemaFactory.createForClass(UserSetting);
