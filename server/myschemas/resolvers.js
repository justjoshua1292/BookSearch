const { UserInputError } = require('apollo-server-errors');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

module.exports = {
    Mutation: {
        addUser: async (_parent, args, context, _info) => {
            console.log('addUser -->', { args, context })
            const user = await User.create(args);

            if (!user) {
                throw new UserInputError('Error!', { args });
            }

            const token = signToken(user);
            return {
                token,
                user,
            }

        },

        login: async (_parent, args, context, _info) => {
            console.log("args", args);
      
            const user = await User.findOne({ $or: [{ password: args.password }, { email: args.email }] });
            if (!user) {
                throw new UserInputError('Cant find user');
            }

            const correctPw = await user.isCorrectPassword(args.password);
            if (!correctPw) {
                throw new UserInputError("wrong password given");

            }
            const token = signToken(user);
            return {
                token,
                user
            }
        },
        saveBook: async (_parent, args, context, _info) => {
            console.log('saveBook -->', { args, context })
            const { user } = context;
            try {
                const UpdatedUser = await User.findOneAndUpdate(
                    { _id: user._id },
                    { $addToSet: { savedBooks: args } },
                    { new: true, runValidators: true }
                )
                return UpdatedUser;
            } catch (err) {
                console.log(err);
                throw new UserInputError('Something is wrong!', { args });
            }
        },
        removeBook: async (_parent, args, context, _info) => {
            console.log('removeBook -->', args, context);

            const { user } = context;
            const UpdatedUser = await User.findOneAndUpdate(
                { _id: user._id },
                { $pull: { savedBooks: { bookId: args.bookId } } },
                { new: true }
            );

            if (!UpdatedUser) {
                throw new UserInputError("Couldnt find user with this id!");
            }
            return UpdatedUser;

        }
    },
    Query: {
        me: async (_parent, args, context, _info) => {
            const { user } = context;
            const foundUser = await User.findOne({
                $or: [{ _id: user._id }, { username: user.username }],
            });

            console.log('foundUser -->', foundUser);

            if (!foundUser) {
                throw new UserInputError("Cannot find a user with this id!");
            }

            return foundUser;
        }
    }
}