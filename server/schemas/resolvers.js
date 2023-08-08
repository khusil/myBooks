const { AuthenticationError } = require('apollo-server-express');
const { User} = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id });
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No user found with this email address');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user };
        },
        saveBook: async (parent, args, context) => {
            console.log(args.bookdata, context.user);
            if (context.user) {
                try {
                    const updatedUser = await User.findOneAndUpdate(
                        { _id: context.user._id },
                        { $addToSet: { savedBooks: args.bookdata } },
                        { new: true, runValidators: true }
                    );
                    return updatedUser;
                } catch (err) {
                    console.log(err);
                    throw new AuthenticationError(err.message);
                }
            }

            throw new AuthenticationError('You need to be logged in!');
        },

        removeBook: async (parent, args, context) => {
            if (context.user) {

                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId: args.bookId } } },
                    { new: true }
                );
                if (!updatedUser) {

                    throw new AuthenticationError("Couldn't find user with this id!");
                }
                return updatedUser;

            }
            throw new AuthenticationError('You need to be logged in!');
        },

    },
};

module.exports = resolvers;
