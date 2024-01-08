import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import JobList from './pages/JobList';
import { initFlowbite } from 'flowbite';
import JobDetails from './pages/JobDetails';
import PageNotFound from './components/common/PageNotFound';

const App = () => {
	useEffect(() => {
		initFlowbite();
	}, []);

	return (
		<div className="App">
			<Routes>
				<Route path="" element={<JobList />} />
				<Route path="/details/:jobId" element={<JobDetails />} />
				<Route path="*" element={<PageNotFound isInvalidRoute={true} />} />.
			</Routes>
		</div>
	);
};

export default App;
