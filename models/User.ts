import mongoose, { Schema } from "mongoose";

export interface IUser extends Document {
  // Основная информация
  name: string;
  surname: string;
  email: string;
  password: string;
  role: string;

  // Профильная информация
  age: number | null;
  birthDate: Date | null;
  gender: string | null;
  city: string;
  bio: string;
  interests: string[];

  // Медиа
  avatar: string;
  photos: string[];

  // Социальные связи
  friends: Schema.Types.ObjectId[];
  friendsRequests: Schema.Types.ObjectId[];
  subscribers: Schema.Types.ObjectId[];
  blockedUsers: Schema.Types.ObjectId[];
  groups: Schema.Types.ObjectId[];

  // Статус и метаданные
  isOnline: boolean;
  createdAt: Date;
  updatedAt: Date | null;
}

export interface UserPreview extends Document {
  _id: string;
  name: string;
  surname: string;
  age: number | null;
  city: string;
  avatar: string;
}

const UserSchema = new Schema<IUser>({
  // Основная информация
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },

  // Профильная информация
  birthDate: {
    type: Date,
    default: null,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    default: null,
  },
  city: {
    type: String,
    default: "",
  },
  bio: {
    type: String,
    default: "",
  },
  interests: {
    type: [String],
    default: [],
  },

  // Медиа
  avatar: {
    type: String,
    default: "",
  },
  photos: {
    type: [String],
    default: [],
  },

  // Социальные связи
  friends: {
    type: [Schema.Types.ObjectId],
    ref: "User",
    default: [],
  },
  friendsRequests: {
    type: [Schema.Types.ObjectId],
    ref: "User",
    default: [],
  },
  subscribers: {
    type: [Schema.Types.ObjectId],
    ref: "User",
    default: [],
  },
  blockedUsers: {
    type: [Schema.Types.ObjectId],
    ref: "User",
    default: [],
  },
  groups: {
    type: [Schema.Types.ObjectId],
    default: [],
  },

  // Статус и метаданные
  isOnline: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: null,
  },
});

UserSchema.virtual('age').get(function() {
  if (!this.birthDate) return null;

  const today = new Date();
  const birthDate = this.birthDate;
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
});

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);
