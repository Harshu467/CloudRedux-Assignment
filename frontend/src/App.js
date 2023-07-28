import { Suspense } from 'react';
import { BasicRoutesConfig, rolesConfig } from './Routes/Route';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import { UserProvider } from './Components/Context/UserContext';

function App() {
  // Check if the user is authenticated and get the user role from the session storage
  
  let isAuthenticated = false;
  let userRole = "";
  

  // Get the appropriate routes based on the user role
  let routes = rolesConfig[userRole];

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Layout>
      <Routes>
        {BasicRoutesConfig.map((route, key) => {
          return route ? <Route key={key} {...route} /> : null;
        })}

        {isAuthenticated ? (
          <Route  element={<Layout />}>
            {routes?.routes.map((route, key) => {
              return route ? <Route key={key} {...route} /> : null;
            })}
          </Route>
        ) : (
          <Route path="/*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
      </Layout>
    </Suspense>
    
  );
}

export default App;
