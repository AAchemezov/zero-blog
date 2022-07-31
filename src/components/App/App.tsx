import React from 'react';
import ApolloWrapper from 'src/components/ApolloWrapper/ApolloWrapper';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { PostPage, Posts, Todos } from '../pages';
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
              <Route path="posts/:id" element={<PostPage />} />
              <Route path="todos" element={<Todos />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ToastWrapper>
    </ApolloWrapper>
  );
}

export default App;
