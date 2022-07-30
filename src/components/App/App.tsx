import React from 'react';
import ApolloWrapper from 'src/components/ApolloWrapper/ApolloWrapper';
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';

import { Todos, Posts } from '../pages';
import Layout from '../layout/Layout';
import ToastWrapper from '../toastWrapper/ToastWrapper';

function App() {
  return (
    <ApolloWrapper>
      <ToastWrapper>
        <BrowserRouter basename="zero-blog-page">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="posts" element={<Posts />} />
              <Route path="todos" element={<Todos />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ToastWrapper>
    </ApolloWrapper>
  );
}

export default App;
