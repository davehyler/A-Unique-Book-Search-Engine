import './App.css';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
//See Module 21 Unit 18 for code format below to setup the apollo server and middleware
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
const httpLink = createHttpLink({
	uri: '/graphql',
});
const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem('id_token');
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		}
	}
});
const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

function App() {
	return (
		//Add Apollo Client abover the React Navbar and Outlet sections (update, don't forget to CLOSE the apollo tag)
		<ApolloProvider client={client}> 
			<Navbar />
			<Outlet />
		</ApolloProvider>
	);
}

export default App;
