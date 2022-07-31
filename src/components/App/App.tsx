import React from 'react';
import ApolloWrapper from 'src/components/wrappers/ApolloWrapper/ApolloWrapper';
import ToastWrapper from 'src/components/wrappers/toastWrapper/ToastWrapper';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  EditPostPage, PostPage, Posts, Todos,
} from '../pages';
import Layout from '../layout/Layout';

function App() {
  return (
    <ApolloWrapper>
      <ToastWrapper>
        <BrowserRouter basename="zero-blog-page">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="posts" element={<Posts />} />
              <Route path="posts/:id" element={<PostPage />} />
              <Route path="posts/:id/edit" element={<EditPostPage />} />
              <Route path="posts/new" element={<EditPostPage />} />
              <Route path="todos" element={<Todos />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ToastWrapper>
    </ApolloWrapper>
  );
}

export default App;
