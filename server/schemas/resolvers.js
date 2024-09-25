const { signToken, AuthenticationError } = require('../utils/auth');
const { User } = require('../models');
//See Activity 21 within the MERN Module for more utilities (ie AuthenticationError)

const resolvers = {
    Query: 
    {
        user: async (parent, args, context) => 
        {
            if (context.user) //See MERN Module 21 Activity 25 for syntax/usage of CONTEXT and CONTEXT.USER.xxx
            {
              const userData = await User.findOne({ _id: context.user._id }); //UPDATE: replace with parameter argument for "_id"
              return userData;
            }
            throw AuthenticationError('Authentication Error');
        },
    },

    Mutation: 
    {
        login: async (parent, { email }) => 
        {
            const userLogin = await User.findOne(email); //Check DB for user by email address (email address should be non-nullible and unique, also more memorable than a generative ID)
            return userLogin;
        },
        signUp: async (parent, { username, email, password }) => 
        {
            // Create the user instance and return it with token 
            const user = await User.create
            (
                {
                    username: username,
                    password: password,
                    email: email,
                }
            );
            const token = signToken(user);
            return { token, user };
        },        
        saveBook: async (parent,  args) => 
        {
            return User.findOneAndUpdate(
                { _id: context.user._id },
                { $push: { savedBooks: { bookId } }}, //update, replace with body for saved books
                { new: true } // see module 18 for validators usage
            );
        },
        deleteBook: async (parent, args) => 
        {
            return User.findByIdAndDelete(
                { _id: context.user._id },
                { $pull: { savedBooks: { bookId } } },
                { new: true },
            );
        }

    }
};

module.exports = resolvers;